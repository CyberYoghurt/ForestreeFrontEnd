<template>
  <form @submit.prevent="submitFormSignUp" class="form session">
    <label for="username">Username:</label>
    <input type="text" id="username" name="nick" v-model="username" required />
    <label for="firstname">First name:</label>
    <input
      type="text"
      id="firstname"
      name="firstname"
      v-model="firstname"
      required
    />
    <label for="lastname">Last name:</label>
    <input
      type="text"
      id="lastname"
      name="lastname"
      v-model="lastname"
      required
    />
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" v-model="email" required />
    <label for="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      v-model="password"
      required
    />
    <label for="password2">Confirm Password:</label>
    <input
      type="password"
      id="password2"
      name="password2"
      v-model="password2"
    />
    <button class="form__button">Sign Up</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
    };
  },
  methods: {
    async submitFormSignUp() {
      const sign = await this.$store.dispatch({
        type: 'signUp',
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        password2: this.password2,
      });
      if (sign === true) {

        this.$emit('toggleForm');
      }
    },
  },
};
</script>
<style>
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  background-color: rgb(var(--color-3));
  padding: 10px;
  border: 3px double rgb(var(--color-5));
  border-radius: 10px;
  text-align: center;
}
.form__error {
  margin-top: 3rem;
}
.session label {
  text-transform: capitalize;
}
.session input {
  margin-bottom: 10px;
  color: rgb(var(--color-8));
  background-color: rgb(var(--color-1));
}
.session input:last-child {
  margin-bottom: 5px;
}
.form__button {
  padding: 10px;
  width: 5rem;
  background-color: rgb(var(--color-4));
  border: 2px double rgb(var(--color-3));
  border-radius: 5px;
  transition: 1s all;
}
.form__button:hover {
  background-color: rgb(var(--color-6));
  color: rgb(var(--color-3));
}
</style>
