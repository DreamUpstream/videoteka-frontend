<template>
  <div class="watchable-list-page">
    <div class="feed-title">{{ title }}</div>
    <div class="watchable-blocks row q-pa-sm">
      <WatchableBlock
        v-for="watchable in watchables"
        :key="watchable.id"
        :watchable="watchable"
        :to="watchable.to"
        class="col-12 col-sm-6 col-md-2 q-ma-sm"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import WatchableBlock from "components/WatchableBlock.vue";
import { useRoute } from "vue-router";
import { useFeedStore } from "src/stores/feed-store";
import { watch } from "vue";
import { mapState, mapActions } from "pinia";

export default {
  components: {
    WatchableBlock,
  },
  computed: {
    ...mapState(useFeedStore, ["watchables"]),
  },
  methods: {
    ...mapActions(useFeedStore, ["loadWatchables"]),
  },
  watch: {
    $route: {
      handler: function (route) {
        if (route.name == "movies" || route.name == "series") {
          if (route.name == "movies") {
            this.title = "Movies";
            this.loadWatchables("movies");
          } else {
            this.title = "Series";
            this.loadWatchables("series");
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.watchable-list-page {
  padding: 10px;
  color: #fff;
}

.feed-title {
  font-size: 24px;
  margin: 10px;
  margin-left: 20px;
}

.watchable-blocks {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
