import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useFeedStore = defineStore("feed", {
  state: () => ({
    watchables: [],
    error: null,
    loading: null,
  }),

  actions: {
    async loadWatchables(mode = "movies") {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(mode, {
          params: {
            size: 100,
          },
        });
        if (response.status == 200) {
          this.setWatchables(response.data.content, mode);
        }
      } catch (error) {
        console.log(error);
        this.setError(error);
      } finally {
        this.loading = false;
      }
    },

    setWatchables(watchableDto, mode) {
      // if mode movies, set each watchable.to movie/{watchable.id}, else set each watchable.to series/{watchable.id}
      // also, set watchable.type to mode
      // also, set watchable.thumbnaildId if movie take from video.thumbnailId, else just set to watchable.thumbnailId
      // rest of the fields are the same
      this.watchables = watchableDto.map((watchable) => {
        if (mode == "movies") {
          return {
            ...watchable,
            to: `movie/${watchable.id}`,
            type: mode,
            thumbnailId: watchable.video.thumbnailId,
          };
        } else {
          return {
            ...watchable,
            to: `series/${watchable.id}`,
            type: mode,
          };
        }
      });
    },
  },
});
