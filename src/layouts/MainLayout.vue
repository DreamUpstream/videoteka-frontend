<template>
  <q-layout view="hHh lpR fff" class="bg-grey-10 text-white">
    <q-header reveal elevated class="bg-black text-white" height-hint="98">
      <q-toolbar class="header-toolbar">
        <div class="logo-container">
          <q-avatar>
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/017/074/original/social-media-live-icon-live-streaming-graphic-free-png.png"
            />
          </q-avatar>
          <span class="logo-text">Video Hub</span>
        </div>
        <div class="tabs-container">
          <q-tabs align="left">
            <q-route-tab to="/movies" label="Movies" />
            <q-route-tab to="/series" label="Series" />
            <q-route-tab to="/about" label="About" />
          </q-tabs>
        </div>
        <div class="search-container">
          <!-- search button -->
          <q-btn
            flat
            icon="search"
            class="outlined-white q-mr-sm netflix-search-button"
            label="Search"
            @click="showSearchDialog = true"
          />
        </div>
        <LogoutButton />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-black text-white">
      <q-toolbar> VideoHub 2023 All rights reserved. </q-toolbar>
    </q-footer>
  </q-layout>
  <SearchOverlayDialog
    v-model="showSearchDialog"
    :watchables="watchables"
    @update:show="showSearchDialog = $event"
  />
</template>

<style>
.outlined-white {
  color: white;
  border: 1px solid white;
}

.netflix-search-button {
  background-color: transparent;
  padding: 5px 15px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.netflix-search-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.netflix-search-button:active {
  background-color: rgba(255, 255, 255, 0.2);
}

.header-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-text {
  margin-left: 8px;
  font-size: 18px;
}

.tabs-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.search-container {
  display: flex;
  align-items: center;
}
</style>

<script>
import { defineComponent } from "vue";
import SearchOverlayDialog from "components/SearchOverlayDialog.vue";
import LogoutButton from "components/LogoutButton.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    SearchOverlayDialog,
    LogoutButton,
  },
  data() {
    return {
      showSearchDialog: false,
    };
  },
});
</script>
