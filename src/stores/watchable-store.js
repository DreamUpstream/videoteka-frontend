import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useWatchableStore = defineStore("watchable", {
  state: () => ({
    watchable: {},
    error: null,
    loading: null,
  }),

  actions: {
    async loadWatchable(mode, id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`${mode}/${id}`);
        if (response.status == 200) {
          this.setWatchable(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    setWatchable(watchableDto) {
      this.watchable = {
        ...watchableDto,
        videoUrl: watchableDto.video.contentId,
      };
    },
  },
});
