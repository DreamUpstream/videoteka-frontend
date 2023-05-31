<template>
  <div class="single-series-page" v-if="serie">
    <div class="page-title">{{ serie.title }}</div>
    <div class="season-selector">
      <div
        class="season-item"
        v-for="season in serie.seasons"
        :key="season.id"
        @click="loadSeason(season.id)"
        :class="{ 'season-selected': selectedSeason === season.id }"
      >
        {{ season.title }}
      </div>
    </div>
    <div class="episodes row q-pa-sm">
      <WatchableBlock
        v-for="episode in episodes"
        :key="episode.id"
        :watchable="episode.watchable"
        class="col-12 col-sm-6 col-md-2 q-ma-sm"
      />
      <div class="no-episodes" v-if="episodes.length == 0">
        No episodes found.
      </div>
    </div>
    <div class="description-block">
      <div class="description-text">{{ seasonDescription }}</div>
    </div>
  </div>
</template>

<script>
import WatchableBlock from "components/WatchableBlock.vue";
import { useSingleSeriesStore } from "src/stores/single-series-store";
import { mapState, mapActions } from "pinia";

export default {
  components: {
    WatchableBlock,
  },
  computed: {
    ...mapState(useSingleSeriesStore, ["serie"]),
    episodes() {
      return (
        this.serie?.seasons?.find((s) => s.id === this.selectedSeason)
          ?.episodes || []
      );
    },
    seasonDescription() {
      return (
        this.serie?.seasons?.find((s) => s.id === this.selectedSeason)
          ?.description || ""
      );
    },
  },
  data() {
    return {
      selectedSeason: null,
    };
  },
  methods: {
    ...mapActions(useSingleSeriesStore, ["loadSerie"]),
    loadSeason(seasonId) {
      this.selectedSeason = seasonId;
    },
  },
  async mounted() {
    const serieId = this.$route.params.id;
    await this.loadSerie(serieId);
    this.selectedSeason = this.serie?.seasons[0]?.id || null;
  },
};
</script>

<style scoped>
.no-episodes {
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  margin-top: 20px;
}
.single-series-page {
  padding: 10px;
  color: #fff;
}

.page-title {
  font-size: 24px;
  margin: 10px;
  margin-left: 20px;
}

.season-selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: #000;
  padding: 10px;
  border-radius: 5px;
  font-size: 1em;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
}

.season-item {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
}

.season-selected {
  background-color: #e50914;
}

.episodes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.description-block {
  background-color: #dedede;
  color: #000000;
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
