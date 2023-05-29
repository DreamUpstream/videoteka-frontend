<template>
  <div class="watchable-list-page">
    <div class="feed-title">{{ title }}</div>
    <div class="watchable-blocks row q-col-gutter-lg">
      <WatchableBlock
        v-for="watchable in watchables"
        :key="watchable.id"
        :watchable="watchable"
        :to="watchable.id"
        class="col-12 col-sm-6 col-md-2"
      />
    </div>
  </div>
</template>

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
  padding: 20px;
  margin: 5px;
  justify-content: space-around;
}
</style>

<script>
import WatchableBlock from "components/WatchableBlock.vue";
import { seriesStore } from "src/stores/series-store";

const store = seriesStore();

export default {
  components: {
    WatchableBlock,
  },
  props: ["title", "to"],
  data() {
    return {

    };
  },
  computed: {
    watchables: () => store.allSeries,
  },
  async mounted() {
    await store.loadSeries();
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
  justify-content: space-between;
}
</style>
