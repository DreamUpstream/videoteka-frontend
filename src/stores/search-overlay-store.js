import { defineStore } from "pinia";
import { movieStore } from "./movie-store";
import { seriesStore } from "./series-store";

const movStore = movieStore();
const serStore = seriesStore();

export const searchOverlayStore = defineStore("searchOverlay", {
  state: () => ({
    watchables: [],
    error: null,
    loading: null,
  }),

  getters: {
    allWatchables(state) {
      if(state.watchables.length == 0) {
        this.loadWatchables();
      }
      return state.watchables;
    },
    getError(state) {
      return state.error;
    },
    isLoading(state) {
      return state.loading;
    }
  },

  actions: {
    loadWatchables() {
      const movies = movStore.allMovies;
      const series = serStore.allSeries;
      this.setWatchables(movies, series);
    },
    setWatchables(movies, series) {
      const watchables = [].concat(movies).concat(series);
      this.watchables = watchables.sort();
    }
  },

  persist: {
    
  },

  share: {
    enable: true,
    omit: ["watchables", "error", "loading"],
  }
});