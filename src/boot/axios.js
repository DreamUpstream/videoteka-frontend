import { boot } from "quasar/wrappers";
import axios from "axios";
import { auth0 } from "./auth0";
import { getCoreSetting } from "src/helpers/config";
import { ServerValidationError } from "src/errors/ServerValidationError";
import { Quasar } from "quasar";

// noinspection AllyPlainJsInspection
const api = axios.create({
  baseURL: getCoreSetting("API_URL"),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": Quasar.lang.getLocale() + ", en;0.5",
    Lang: Quasar.lang.getLocale(),
  },
});

export default boot(({ app, router, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  api.interceptors.request.use(
    async (config) => {
      await auth0.getAccessTokenSilently().then(token => {
        if(token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
      });
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  api.interceptors.response.use(null, (error) => {
    // you can set preventErrorHandling in request config to true
    // so there will be no automatic error handling for selected ajax request
    // works only for non 401 errors
    const preventErrorHandling =
      error.config && error.config.preventErrorHandling;

    if (error.response) {
      if (error.response?.data?.errors) {
        throw new ServerValidationError(error.response.data.errors);
      }

      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        router.push('error');
      } else if (
        error.response.status !== 400 &&
        error.response.status !== 422 &&
        !preventErrorHandling
      ) {
        // redirect to a generic page if it's not a 400 error
        router.push({
          name: "error",
          params: {
            code: error.response.status,
          },
        });
      }
    } else if (error.request && !preventErrorHandling) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      router.push({
        name: "error",
        params: {
          code: 500,
        },
      });
    } else if (preventErrorHandling) {
      return Promise.reject(error);
    } else {
      //TODO allow for each component to decide what to do in this situation, currently all invalid requests push an error page. even canceled requests.
      // router.push({
      //   name: 'error',
      //   params: {
      //     error
      //   }
      // });
    }

    return Promise.reject(error);
  });

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
