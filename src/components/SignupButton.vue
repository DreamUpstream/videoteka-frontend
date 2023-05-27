<template>
    <q-btn @click="handleSignUp" label="Sign Up" style="text-decoration-line: underline;" />
</template>

<script>
export default {
  methods: {
    handleSignUp() {
      this.$auth0.loginWithRedirect({
        authorizationParams: {
          screen_hint: "signup",
        },
      });
    },
  },
};
</script>
