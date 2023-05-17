import { store } from "quasar/wrappers";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { PiniaSharedState } from "pinia-shared-state";
import { getCoreSetting } from "src/helpers/config";
import { isReactive, isReadonly, isRef, toRaw } from "vue";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();

  // see https://github.com/prazdevs/pinia-plugin-persistedstate#-factory-function-configuration
  pinia.use(
    createPersistedState({
      storage: window.sessionStorage,
      debug: getCoreSetting("APP_MODE") === "dev",
      serializer: {
        serialize: function (val) {
          let data = {};
          for (let key in val) {
            if (isReadonly(val[key])) {
              continue;
            }

            if (isRef(val[key]) || isReactive(val[key])) {
              data[key] = toRaw(val[key]);
            } else {
              data[key] = val[key];
            }

            if (data[key] === null) {
              delete data[key];
            }
          }

          return JSON.stringify(data);
        },
        deserialize: function (val) {
          return JSON.parse(val);
        },
      },
    })
  );

  // see https://github.com/wobsoriano/pinia-shared-state
  pinia.use(
    PiniaSharedState({
      // Enables the plugin for all stores. Defaults to true.
      enable: false,
      // If set to true this tab tries to immediately recover the shared state from another tab. Defaults to true.
      initialize: true,
      // Enforce a type. One of native, idb, localstorage or node. Defaults to native.
      type: "native",
    })
  );

  return pinia;
});
