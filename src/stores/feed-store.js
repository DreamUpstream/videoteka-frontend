// used by WatchablesFeedPage to retrieve and store featured watchables
// use api.get (from boot/axios.js) for api calls to avoid redundant code

import { defineStore } from "pinia";
import { api } from "boot/axios";

export const feedStore = defineStore("feed", {
  state: () => ({
    movies: [],
    error: null,
    loading: null,
  }),

  getters: {
    getAll(state) {
      return state;
    },
    getById(state, id) {
      return state.movies.find(watchable => watchable.id === id);
    },
    getError(state) {
      return state.error;
    },
    isLoading(state) {
      return state.loading;
    }
  },

  actions: {
    async loadMovies() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("movies");
        if(response.data.success) {
          this.setMovies(response.data.data);
        }
      } catch (error) {
        this.setError(error);
      } finally {
        this.loading = false;
      }
    },
    setMovies(data) {
      this.movies = data;
    },
    setError(error) {
      this.error = error;
    }
  },

  persist: {
    
  },

  share: {
    enable: true,
    omit: ["movies", "error", "loading"],
  },
});
