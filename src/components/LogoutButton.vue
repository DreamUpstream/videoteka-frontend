<template>
    <q-btn @click="handleLogout" label="Logout" />
</template>

<script>
export default {
  methods: {
    handleLogout() {
      console.log(this.$auth0);
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    },
  },
};
</script>
