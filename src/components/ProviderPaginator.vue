<template>
  <div class="provider__paginator">
    <router-link :to="previousLink">
      <div v-if="previous === true">
        <svg class="provider__arrows">
          <use xlink:href="../img/left.svg#left"></use>
        </svg>
      </div>
    </router-link>
    <div
      v-for="index in number"
      :key="index"
      @click="goToPage(index)"
      class="provider__page"
    >
      <div class="provider__page-button"></div>
      <div>{{ index }}</div>
    </div>
    <router-link :to="nextLink">
      <div v-if="next === true">
        <svg class="provider__arrows">
          <use xlink:href="../img/right.svg#right"></use>
        </svg>
      </div>
    </router-link>
  </div>
</template>
<script>
// import Back from '../img/left.svg'
// import Forward from '../img/right.svg'
export default {
  props: ['page', 'number', 'next', 'previous'],
  computed: {
    nextLink() {
      return {
        query: { page: +this.page + 1 },
      };
    },
    previousLink() {
      return {
        query: { page: +this.page - 1 },
      };
    },
  },
  methods: {
    goToPage(value) {
      this.$router.push({ query: { page: value } });
    },
  },
  mounted() {},
};
</script>
<style>
.provider__paginator {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
}
.provider__arrows {
  fill: rgb(var(--color-7));
  width: 3rem;
  height: 3rem;
}
.provider__page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.provider__page-button {
  width: 1rem;
  height: 1rem;
  background-color: rgb(var(--color-7));
  border-radius: 2px;
}
</style>
