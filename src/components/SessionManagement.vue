<template>
  <div class="sessions">
    <input
      type="checkbox"
      class="sessions__checkbox"
      id="sessions-toggle"
      ref="control"
    />
    <label
      for="sessions-toggle"
      class="sessions__button sessions__button-1"
      @click.prevent="clickSession"
    >
      <svg class="session__icon">
        <transition>
          <use
            v-if="isLogged === false"
            xlink:href="../img/login.svg#log-in"
          ></use>
        </transition>
        <transition>
          <use
            v-if="isLogged === true"
            xlink:href="../img/logout.svg#log-out"
          ></use>
        </transition>
      </svg>
    </label>
    <label
      class="sessions__button sessions__button-2"
      @click.prevent="manageProfile"
      v-if="isLogged === true"
    >
      <svg class="session__icon">
        <use xlink:href="../img/user.svg#user"></use>
      </svg>
    </label>
    <div class="sessions__background"></div>
    <div class="sessions__nav">
      <session-control v-if="isForm === true" />
      <profile-manager
        v-if="isForm === false"
        @changeMessagePassword="changeMessagePassword"
        :messagePassword="messagePassword"
        @changeMessageProfile="changeMessageProfile"
        :messageProfile="messageProfile"
      />
    </div>
  </div>
</template>

<script>
import ProfileManager from './ProfileManager.vue';
import SessionControl from './SessionControl.vue';
export default {
  components: {
    ProfileManager,
    SessionControl,
  },
  data() {
    return {
      isForm: true,
      messagePassword: '',
      messageProfile: '',
    };
  },
  computed: {
    isLogged() {
      return this.$store.state.logged;
    },
  },
  methods: {
    clickSession() {
      if (this.isLogged) {
        this.$store.commit('logOut');
        this.isForm = true;

        return;
      }
      this.isForm = true;
      this.toggleNav();
    },
    toggleNav() {
      //clear message  when sessions manager is closed
      this.$store.commit('clearMessage');
      this.$refs.control.checked = !this.$refs.control.checked;
    },
    manageProfile() {
      //if profile management is active, use session controls when closed
      this.isForm = false;
      this.messagePassword = '';
      this.messageProfile = '';
      this.toggleNav();
    },
    changeMessagePassword(m) {
      this.messagePassword = m;
    },
    changeMessageProfile(m) {
      this.messageProfile = m;
    },
  },
  provide() {
    return {
      toggle: this.toggleNav,
    };
  },
};
</script>

<style>
.sessions {
  position: absolute;
}
.sessions__checkbox {
  display: none;
}
.sessions__function {
  text-align: center;
  background-color: rgb(var(--color-2));
  width: 10rem;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px double rgb(var(--color-3));
  border-radius: 5px;
  box-shadow: 0px 2px 2px 2px rgb(var(--color-9));
  transition: all 1s;
}
.sessions__function:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 2px 2px rgb(var(--color-8));
}
.sessions__function:active {
  transform: translateY(-1px);
  box-shadow: 0px 4px 2px 2px rgb(var(--color-8));
}
.sessions__button {
  background-color: rgb(var(--color-9));
  height: 3rem;
  width: 3rem;
  position: fixed;
  border-radius: 50%;
  z-index: 1200;
  cursor: pointer;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px 2px rgb(var(--color-4));
}
.sessions__button-1 {
  top: 3rem;
  right: 3rem;
}
.sessions__button-2 {
  top: 3rem;
  right: 8rem;
}
.sessions__background {
  height: 8rem;
  width: 10rem;
  border-radius: 50%;
  position: fixed;
  top: -15%;
  right: 50%;
  background-image: radial-gradient(rgb(var(--color-1)), rgb(var(--color-8)));
  transition: all 2s;
  transform: translate(50%, -50%);
  z-index: 1100;
}
.sessions__nav {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  opacity: 0;
  position: fixed;
  transform: translate(50%, -50%);
  top: -100%;
  right: 50%;
  transition: all 2s;
  z-index: 1200;
}
.sessions__list {
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
}
.sessions__link:link,
.sessions__link:visited {
  text-decoration: none;
}
.sessions__checkbox:checked ~ .sessions__background {
  transform: translate(50%, -50%) scale(20);
}
.sessions__checkbox:checked ~ .sessions__nav {
  top: 18rem;
  opacity: 1;
  transform: translate(50%, -50%);
}
.session__icon {
  fill: rgb(var(--color-1));
  width: 80%;
  height: 80%;
}
.v-enter-from {
  opacity: 0;
}
.v-enter-active {
  transition: all 1s;
}
.v-enter-to {
  opacity: 1;
}
.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 1s;
}
.v-leave-to {
  opacity: 0;
}
</style>
