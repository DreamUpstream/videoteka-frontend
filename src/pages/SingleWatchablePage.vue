<template>
  <div class="watchable-page">
    <div class="page-title">{{ watchable.title }}</div>
    <q-media-player
      type="video"
      v-if="watchable.videoUrl"
      class="media-player"
      dense
      radius="1rem"
      :sources="[
        {
          src: accessToken
            ? `${apiUrl}/files/${watchable.videoUrl}?access_token=${accessToken}`
            : '',
        },
      ]"
    />
    <div class="description-block">
      <div class="description-text">{{ watchable.description }}</div>
      <div class="description-footer col-6">
        <!-- genres -->
        <span
          class="description-genres q-mr-sm"
          v-for="genre in watchable.genres"
          :key="genre.id"
        >
          {{ genre.name }}
        </span>
        <span class="description-year">
          ({{ new Date(watchable.releaseDate).getFullYear() }})</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.watchable-page {
  padding: 10px;
  color: #fff;
}

.description-year {
  margin-left: 10px;
  font-size: 1.5em;
  color: #a30000;
}

.description-genres {
  /* fancy netflix look: */
  background-color: #e50914;
  padding: 5px;
  border-radius: 5px;
  font-size: 1em;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 5px;
}

.page-title {
  font-size: 24px;
  margin: 10px;
  margin-left: 20px;
  text-align: left;

  width: 80%;
  margin: 20px auto;
}

.media-player {
  width: 80%;
  margin: 20px auto;
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

.description-footer {
  display: flex;
  margin-top: 10px;
  justify-content: center;
}
</style>
<script>
import { onMounted, ref } from "vue";
import WatchableBlock from "components/WatchableBlock.vue";
import { useRoute } from "vue-router";
import { useWatchableStore } from "src/stores/watchable-store";
import { watch } from "vue";
import { mapState, mapActions } from "pinia";
import { auth0 } from "src/boot/auth0"; // Import auth0

export default {
  computed: {
    ...mapState(useWatchableStore, ["watchable"]),
    apiUrl: () => process.env.API_URL, // Add computed apiUrl
  },
  data() {
    return {
      accessToken: "",
    };
  },
  methods: {
    ...mapActions(useWatchableStore, ["loadWatchable"]),
  },
  async mounted() {
    this.accessToken = await auth0.getAccessTokenSilently(); // Get accessToken
  },
  watch: {
    $route: {
      handler: function (route) {
        if (route.name == "movie" || route.name == "episode") {
          if (route.name == "movie") {
            this.loadWatchable("movies", route.params.id);
          } else {
            this.loadWatchable("episodes", route.params.id);
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
