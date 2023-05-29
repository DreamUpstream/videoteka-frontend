import { defineStore } from "pinia";
import { api } from "boot/axios";

export const seriesStore = defineStore("series", {
  state: () => ({
    series: [],
    error: null,
    loading: null,
  }),

  getters: {
    allSeries(state) {
      if(state.series.length == 0 ) {
        this.loadSeries()
      }
      return state.series;
    },
    getById(state, id) {
      return state.series.find(watchable => watchable.id === id);
    },
    getError(state) {
      return state.error;
    },
    isLoading(state) {
      return state.loading;
    }
  },

  actions: {
    async loadSeries() {
      if(this.$state.series.length == 0) {
        this.loading = true;
        this.error = null;
        try {
          const response = await api.get("series");
          if(response.status == 200) {
            this.setSeries(response.data.content);
          }
        } catch (error) {
          this.setError(error);
        } finally {
          this.loading = false;
        }
      }
    },
    setSeries(data) {
      this.series = data;
    },
    setError(error) {
      this.error = error;
    }
  },

  persist: {
    
  },

  share: {
    enable: true,
    omit: ["series", "error", "loading"],
  },
});
