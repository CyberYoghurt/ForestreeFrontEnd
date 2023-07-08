export default {
  data() {
    return {
      formState: false,
    };
  },
  methods: {
    toggleForm() {
      this.formState = this.formState ? false : true;
    },
  },
  computed: {
    isLogged() {
      return this.$store.getters.logged;
    },
  },
};
