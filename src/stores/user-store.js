import { defineStore } from "pinia";
import { api } from "boot/axios";

// TODO - this is only example. rewrite this to work with Auth0 (probably use its plugin)
// maybe rewrite using the new pinia composition api
// optional - storing favorite movies, history etc
export const userStore = defineStore("user", {
  state: () => ({
    token: null,
    loading: null,
    error: null,
    userId: null,
  }),

  getters: {
    getIsLoading(state) {
      return state.loading;
    },
    getToken(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!(state.token && !state.error);
    },
    getError(state) {
      return state.error;
    },
  },

  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const body = { email, password };
        const response = await api.post("auth/login", body);
        if (response.data.success === true) {
          this.setToken(response.data.data.token);
          this.setProfile(response.data.data.user);
        }
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },

    async logout(noWarn = false) {
      if (this.profile !== null) {
        try {
          await api.get("auth/logout", {
            preventErrorHandling: true,
          });
        } catch (e) {
          if (noWarn) {
            console.error(e);
          }
        }
      }
      this.token = null;
      this.userId = null;
      this.error = null;
    },
    setToken(token) {
      this.token = token;
    },
    setResetMessage(message) {
      this.resetSuccess = message;
    },
  },

  persist: [
    {
      paths: ["token", "userId"],
      key: "session",
      storage: window.localStorage,
    },
    {
      paths: ["error"],
      key: "session-data",
      storage: window.sessionStorage,
    },
  ],

  share: {
    enable: true,
    omit: ["token", "userId", "loading", "error"],
  },
});
