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
        <template v-if="!isAuthenticated">
          <LoginButton />
          <SignupButton />
        </template>
        <template v-if="isAuthenticated">
          <LogoutButton />
        </template>
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
import { defineComponent, ref } from "vue";
import SearchOverlayDialog from "components/SearchOverlayDialog.vue";
import LoginButton from "components/LoginButton.vue"
import SignupButton from "components/SignupButton.vue";
import LogoutButton from "components/LogoutButton.vue";
import { auth0 } from "boot/auth0";

export default defineComponent({
  name: "MainLayout",
  components: {
    SearchOverlayDialog,
    SignupButton,
    LoginButton,
    LogoutButton
  },
  // Buttons doesn't update after auth0 actions
  computed: {
    isAuthenticated: () => auth0.isAuthenticated 
  },
  data() {
    return {
      // TEST DATA. SHOULD BE REPLACED WITH REAL DATA FROM BACKEND
      watchables: [
        {
          id: 1,
          title: "The Witcher",
          rating: 9,
          image:
            "https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
          year: 2019,
        },
        {
          id: 2,
          title: "Stranger Things",
          rating: 8.5,
          image:
            "https://m.media-amazon.com/images/M/MV5BMDRjYWI5NTMtZTYzZC00NTg4LWI3NjMtNmI3MTdhMWQ5MGJlXkEyXkFqcGdeQXVyNTg4MDc4Mg@@._V1_FMjpg_UX1000_.jpg",
          year: 2016,
        },
        {
          id: 3,
          title: "The Mandalorian",
          rating: 8.7,
          image:
            "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
          year: 2019,
        },
        {
          id: 4,
          title: "The Witcher",
          rating: 9,
          image:
            "https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
          year: 2019,
        },
        {
          id: 5,
          title: "Stranger Things",
          rating: 8.5,
          image:
            "https://m.media-amazon.com/images/M/MV5BMDRjYWI5NTMtZTYzZC00NTg4LWI3NjMtNmI3MTdhMWQ5MGJlXkEyXkFqcGdeQXVyNTg4MDc4Mg@@._V1_FMjpg_UX1000_.jpg",
          year: 2016,
        },
        {
          id: 6,
          title: "The Mandalorian",
          rating: 8.7,
          image:
            "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
          year: 2019,
        },
        {
          id: 7,
          title: "The Witcher",
          rating: 9,
          image:
            "https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
          year: 2019,
        },
      ],
      showSearchDialog: false,
    };
  },
});
</script>
