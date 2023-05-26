<template>
  <q-dialog v-bind:value="show" @input="close">
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
          />
          <q-select
            outlined
            dense
            v-model="genre"
            :options="genres"
            color="white"
            placeholder="Genre"
            rounded
          />
          <q-select
            outlined
            dense
            v-model="rating"
            :options="ratings"
            placeholder="Rating"
            rounded
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
    const year = ref("2019");
    const genre = ref("Comedy");
    const rating = ref("8.7");

    const years = ref([]); // Will be replaced with actual data
    const genres = ref([]); // Will be replaced with actual data
    const ratings = ref([]); // Will be replaced with actual data

    const filteredWatchables = computed(() => {
      // IF WE WANT TO FILTER IN FRONTEND
      //   return props.watchables.filter((watchable) => {
      //     return (
      //       (searchText.value === "" ||
      //         watchable.title
      //           .toLowerCase()
      //           .includes(searchText.value.toLowerCase())) &&
      //       (year.value === "" || watchable.year === year.value) &&
      //       (genre.value === "" || watchable.genre === genre.value) &&
      //       (rating.value === "" || watchable.rating === rating.value)
      //     );
      //   });
      return props.watchables;
    });

    return {
      searchText,
      year,
      genre,
      rating,
      years,
      genres,
      ratings,
      filteredWatchables,
      close: (newVal) => {
        emit("update:show", newVal);
      },
    };
  },
});
</script>
