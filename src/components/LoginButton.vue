<template>
    <q-btn @click="handleLogin" label="Login" />
</template>

<script>

export default {
  methods: {
    handleLogin() {  
      console.log(this.$auth0.isAuthenticated.value);
      this.$auth0.loginWithPopup();
    },
  },
};

</script>