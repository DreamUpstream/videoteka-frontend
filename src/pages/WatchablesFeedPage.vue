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
import { feedStore } from "src/stores/feed-store";

const store = feedStore();

export default {
  components: {
    WatchableBlock,
  },
  props: ["title", "to"],
  data() {
    return {
      // TEST DATA. SHOULD BE REPLACED WITH REAL DATA FROM BACKEND
      // watchables: [
      //   {
      //     id: 1,
      //     title: "The Witcher",
      //     rating: 9,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
      //     year: 2019,
      //   },
      //   {
      //     id: 2,
      //     title: "Stranger Things",
      //     rating: 8.5,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BMDRjYWI5NTMtZTYzZC00NTg4LWI3NjMtNmI3MTdhMWQ5MGJlXkEyXkFqcGdeQXVyNTg4MDc4Mg@@._V1_FMjpg_UX1000_.jpg",
      //     year: 2016,
      //   },
      //   {
      //     id: 3,
      //     title: "The Mandalorian",
      //     rating: 8.7,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      //     year: 2019,
      //   },
      //   {
      //     id: 4,
      //     title: "The Witcher",
      //     rating: 9,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
      //     year: 2019,
      //   },
      //   {
      //     id: 5,
      //     title: "Stranger Things",
      //     rating: 8.5,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BMDRjYWI5NTMtZTYzZC00NTg4LWI3NjMtNmI3MTdhMWQ5MGJlXkEyXkFqcGdeQXVyNTg4MDc4Mg@@._V1_FMjpg_UX1000_.jpg",
      //     year: 2016,
      //   },
      //   {
      //     id: 6,
      //     title: "The Mandalorian",
      //     rating: 8.7,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      //     year: 2019,
      //   },
      //   {
      //     id: 7,
      //     title: "The Witcher",
      //     rating: 9,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
      //     year: 2019,
      //   },
      //   {
      //     id: 8,
      //     title: "Stranger Things",
      //     rating: 8.5,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BMDRjYWI5NTMtZTYzZC00NTg4LWI3NjMtNmI3MTdhMWQ5MGJlXkEyXkFqcGdeQXVyNTg4MDc4Mg@@._V1_FMjpg_UX1000_.jpg",
      //     year: 2016,
      //   },
      //   {
      //     id: 9,
      //     title: "The Mandalorian",
      //     rating: 8.7,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      //     year: 2019,
      //   },
      //   {
      //     id: 10,
      //     title: "The Witcher",
      //     rating: 9,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
      //     year: 2019,
      //   },
      //   {
      //     id: 11,
      //     title: "Stranger Things",
      //     rating: 8.5,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BMDRjYWI5NTMtZTYzZC00NTg4LWI3NjMtNmI3MTdhMWQ5MGJlXkEyXkFqcGdeQXVyNTg4MDc4Mg@@._V1_FMjpg_UX1000_.jpg",
      //     year: 2016,
      //   },
      //   {
      //     id: 12,
      //     title: "The Mandalorian",
      //     rating: 8.7,
      //     image:
      //       "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      //     year: 2019,
      //   },
      // ],
    };
  },
  computed: {
    watchables: () => store.getAll.movies,
  },
  async mounted() {
    await store.loadMovies();
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
