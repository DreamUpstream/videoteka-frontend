import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useSingleSeriesStore = defineStore("single-series", {
  state: () => ({
    serie: {},
    error: null,
    loading: null,
  }),

  actions: {
    async loadSerie(id) {
      this.loading = true;
      this.error = null;
      try {
        // const response = await api.get("series");, but we need to get a single serie by id
        const response = await api.get(`series/${id}`, {
          params: {
            size: 100,
          },
        });
        if (response.status == 200) {
          this.setSerie(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    setSerie(serieDto) {
      serieDto.seasons.forEach((season) => {
        season.episodes.forEach((episode) => {
          episode.watchable = {
            thumbnailId: episode.video.thumbnailId,
            to: `/episode/${episode.id}`,
            title: episode.title,
            description: episode.description,
            releaseDate: episode.releaseDate,
          };
        });
      });
      this.serie = serieDto;
    },
  },
});
