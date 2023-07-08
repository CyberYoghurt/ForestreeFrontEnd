<template>
  <session-controls />
  <drop-down />
  <div class="content">
    <router-view></router-view>
  </div>
  <footer-section></footer-section>
</template>

<script>
import DropDown from './components/DropDown';
import SessionControls from './components/SessionManagement.vue';
import FooterSection from './components/FooterSection.vue';

export default {
  components: { SessionControls, DropDown, FooterSection },
  async beforeMount() {
    const access = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    if (access && refresh) {
      //login with stored token only if backend is online
      await this.$store.dispatch({
        type: 'logInWithToken',
        access,
      });
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@200;400;600;800&display=swap');

h2 {
  font-weight: 600;
}
h3 {
  font-weight: 400;
}
body {
  font-family: 'Unbounded', cursive;
  color: rgb(var(--color-8));
  background: linear-gradient(
    to bottom,
    rgb(var(--color-1)) 80%,
    rgb(var(--color-3)) 100%
  );
  font-weight: 200;
  margin: 0;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

a {
  text-decoration: none;
  color: inherit;
}
input {
  border-style: none;
  border-radius: 1rem;
  width: 30rem;
  color: rgb(var(--color-9));
  text-align: center;
  background-color: rgb(var(--color-1));
}
textarea {
  border-radius: 1rem;
  border-style: none;
  resize: none;
  color: rgb(var(--color-9));
  text-align: center;
}
input:focus,
textarea:focus {
  outline: dashed 2px rgb(var(--color-9));
}
button {
  font-family: 'Unbounded', cursive;
  color: rgb(var(--color-8));
  border: none;
  background-color: rgb(var(--color-3));
  border-radius: 5px;
}
button:hover {
  cursor: pointer;
}
.content {
  padding-top: 5rem;
}

:root {
  --color-9: 52, 78, 65;
  --color-8: 55, 84, 65;
  --color-7: 58, 90, 64;
  --color-6: 73, 110, 76;
  --color-5: 88, 129, 87;
  --color-4: 126, 153, 113;
  --color-3: 163, 177, 138;
  --color-2: 191, 196, 172;
  --color-1: 218, 215, 205;
}
</style>
