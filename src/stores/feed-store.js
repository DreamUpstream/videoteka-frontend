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
        if(response.status == 200) {
          this.setMovies(response.data.content);
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
