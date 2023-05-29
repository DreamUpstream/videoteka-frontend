<template>
  <q-dialog v-bind:value="show" @input="update">
    <q-card class="bg-grey-10 custom-dialog">
      <q-card-section class="bg-grey-4">
        <div class="row justify-around items-center">
          <q-input
            outlined
            dense
            v-model="searchText"
            placeholder="Search..."
            rounded
          />
          <q-select
            outlined
            dense
            v-model="year"
            :options="years"
            rounded
            placeholder="Year"
            clearable
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
          v-for="watchable in filteredWatchables"
          :key="watchable.id"
          :watchable="watchable"
          :to="watchable.id"
          class="col-12 col-sm-6 col-md-2"
        />
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
import { defineComponent, ref, computed } from "vue";
import WatchableBlock from "./WatchableBlock";

export default defineComponent({
  components: { WatchableBlock },
  props: ["show", "watchables"],
  emits: ["update:show"],
  watch: {
    show(newVal) {
      this.$emit("update:show", newVal);
    },
  },
  setup(props, { emit }) {
    const searchText = ref("");
    const year = ref("");
    const genre = ref("");

    const years = ref(["2022", "2023", "2021", "2022"]); // Will be replaced with actual data
    const genres = ref(["Comedy", "Fantasy", "Documentary", "Thriller"]); // Will be replaced with actual data

    const filteredWatchables = computed(() => {
        return props.watchables.filter((watchable) => {
          return (
            (searchText.value === "" || searchText.value == null ||
              watchable.title
                .toLowerCase()
                .includes(searchText.value.toLowerCase())) &&
            (year.value === "" || year.value == null || (new Date(watchable.releaseDate)).getFullYear() == year.value) &&
            (genre.value === "" || genre.value == null || watchable.genres.includes(genre.value))
          );
        });
    });

    return {
      searchText,
      year,
      genre,
      years,
      genres,
      filteredWatchables,
      close: (newVal) => {
        emit("update:show", newVal);
      },
    };
  },
});
</script>
