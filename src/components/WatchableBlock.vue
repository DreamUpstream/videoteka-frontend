<template>
  <router-link :to="watchable.to" class="watchable-block">
    <q-img
      :src="
        accessToken
          ? `${apiUrl}/files/${watchable.thumbnailId}?access_token=${accessToken}`
          : ''
      "
      alt="Watchable Image"
    />
    <div class="watchable-info">
      <div class="watchable-details">
        <span class="watchable-title">{{ watchable.title }}</span>
        <span class="watchable-year" v-if="watchable.releaseDate"
          >({{ new Date(watchable.releaseDate).getFullYear() }})</span
        >
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.watchable-block {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  background-color: #000000;
  color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}

.watchable-block img {
  width: 100%;
  height: auto;
}

.watchable-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
}

.watchable-details {
  display: flex;
  align-items: center;
  gap: 5px;
}

.watchable-title {
  text-decoration: none;
}

.watchable-year {
  font-size: 0.9em;
  color: #ffffff;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
}

.star-icon {
  color: yellow;
}
</style>

<script>
import { auth0 } from "src/boot/auth0";

export default {
  computed: {
    apiUrl: () => process.env.API_URL,
  },
  data() {
    return {
      accessToken: "",
    };
  },
  props: ["watchable", "to"],
  async mounted() {
    this.accessToken = await auth0.getAccessTokenSilently();
  },
};
</script>
