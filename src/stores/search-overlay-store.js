import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useSearchOverlayStore = defineStore("searchOverlay", {
  state: () => ({
    watchables: [],
    genres: [],
    error: null,
    loading: null,
  }),

  actions: {
    async loadGenres() {
      // api get genres:
      const response = await api.get("genres");
      if (response.status == 200) {
        let genres = response.data.content;
        // transform genres to the format that q-select expects:
        this.genres = genres.map((genre) => ({
          label: genre.name,
          value: genre.id,
        }));
      } else {
        this.error = response.data;
      }
    },

    async searchWatchables(title, genre) {
      this.loading = true;
      this.error = null;
      if (!genre) {
        genre = { value: null };
      }
      if (!title) {
        title = "";
      }
      try {
        const responseMovies = await api.get("movies", {
          params: { title, genreIds: genre.value },
        });
        if (responseMovies.status == 200) {
          const watchables = [...responseMovies.data.content];
          // for each watchable, set watchable.to to movie/{watchable.id} or series/{watchable.id}:
          this.watchables = watchables.map((watchable) => {
            return {
              ...watchable,
              to: `movie/${watchable.id}`,
            };
          });
          // for each watchable, set watchable.thumbnailId to watchable.video.thumbnailId:
          this.watchables = this.watchables.map((watchable) => {
            return {
              ...watchable,
              thumbnailId: watchable.video.thumbnailId,
            };
          });

          const responseSeries = await api.get("series", {
            params: { title, genreIds: genre.id },
          });
          let series = [...responseSeries.data.content];
          // append series to watchables (this one overwrites)
          series = series.map((watchable) => {
            return {
              ...watchable,
              to: `series/${watchable.id}`,
            };
          });
          this.watchables = [...this.watchables, ...series];
          // filter out duplicates:
          this.watchables = this.watchables.filter(
            (watchable, index, self) =>
              index === self.findIndex((t) => t.id === watchable.id)
          );
        } else {
          this.error = responseMovies.data;
        }
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
  },
});
