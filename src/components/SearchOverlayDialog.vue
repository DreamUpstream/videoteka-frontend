<template>
  <q-dialog v-bind:value="show" @input="update">
    <q-card class="bg-grey-10 custom-dialog">
      <q-card-section class="bg-grey-4">
        <div class="row justify-center items-center">
          <q-input
            outlined
            dense
            v-model="searchText"
            placeholder="Search..."
            rounded
            class="q-mr-sm"
          />
          <q-select
            outlined
            dense
            v-model="genre"
            :options="genres"
            color="white"
            placeholder="Genre"
            rounded
            clearable
          />
        </div>
      </q-card-section>
      <q-separator class="bg-black" />
      <q-card-section class="q-gutter-md row wrap justify-start items-start">
        <WatchableBlock
          v-for="watchable in watchables"
          :key="watchable.id"
          :watchable="watchable"
          class="col-12 col-sm-6 col-md-2"
        />
        <div
          v-if="!watchables || watchables.length == 0"
          class="text-white justify-center items-center q-pa-lg"
        >
          No results found.
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style scoped>
.custom-dialog {
  width: 60%;
  max-width: 60%;
}
</style>

<script>
import WatchableBlock from "components/WatchableBlock.vue";
import { useSearchOverlayStore } from "src/stores/search-overlay-store";

export default {
  components: {
    WatchableBlock,
  },
  computed: {
    watchables() {
      return useSearchOverlayStore().watchables;
    },
    genres() {
      return useSearchOverlayStore().genres;
    },
    show: {
      get() {
        return useSearchOverlayStore().show;
      },
      set(value) {
        useSearchOverlayStore().show = value;
      },
    },
    searchText: {
      get() {
        return useSearchOverlayStore().searchText;
      },
      set(value) {
        useSearchOverlayStore().searchText = value;
      },
    },
    genre: {
      get() {
        return useSearchOverlayStore().genre;
      },
      set(value) {
        useSearchOverlayStore().genre = value;
      },
    },
  },
  methods: {
    update(value) {
      this.show = value;
      if (value) {
        useSearchOverlayStore().loadGenres();
      }
    },
    search() {
      useSearchOverlayStore().searchWatchables(this.searchText, this.genre);
    },
  },
  watch: {
    searchText: {
      immediate: true,
      handler: "search",
    },
    genre: {
      immediate: true,
      handler: "search",
    },
  },
  created() {
    useSearchOverlayStore().loadGenres();
    this.search();
  },
};
</script>
