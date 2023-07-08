<template>
  <button class="sessions__function" @click="toggleFunction">
    {{ text }}
  </button>
  <div class="session__message" v-if="message">{{ message }}</div>
  <transition mode="out-in">
    <form-sign-up @toggleForm="toggleFunction" v-if="isSignUpForm === true" />
    <form-log-in v-else />
  </transition>
</template>
<script>
import FormSignUp from './FormSignUp.vue';
import FormLogIn from './FormLogIn.vue';
export default {
  components: { FormSignUp, FormLogIn },
  data() {
    return {
      isSignUpForm: true,
    };
  },
  methods: {
    toggleFunction() {
      this.$store.state.message = '';
      this.isSignUpForm = !this.isSignUpForm;
    },
  },
  computed: {
    text() {
      const text = this.isSignUpForm
        ? 'Already have an account?'
        : 'Create an account';
      return text;
    },
    message() {
      return this.$store.state.message;
    },
  },
};
</script>
<style>
.session__message {
  background-color: rgb(var(--color-8));
  color: rgb(var(--color-2));
  border-radius: 1rem;
  margin: 1rem;
  padding: 1rem;
}
</style>
