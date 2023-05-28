<template>
    <q-btn @click="handleLogin" label="Login" />
</template>

<script>

export default {
  methods: {
    handleLogin() {  
      this.$auth0.loginWithPopup();
    },
  },
};

</script>