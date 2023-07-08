<template>
  <form @submit.prevent="submitFormLogIn" class="form session">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" v-model="username" />
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" v-model="password" />
    <button class="form__button">Log In</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  inject: ['toggle'],
  methods: {
    async submitFormLogIn() {
      const log = await this.$store.dispatch({
        type: 'logIn',
        username: this.username,
        password: this.password,
      });
      if (log === true) {
        this.toggle();
        this.username = '';
        this.password = '';
      }
    },
  },
};
</script>
