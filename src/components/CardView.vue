<template>
  <div class="card">
    <router-link :to="`/${this.source}/?page=1`" class="card__flex">
      <div>{{ label }}</div>
      <img class="card__image" v-bind:src="image" v-bind:alt="label" />
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Tree',
    },
    image: {
      type: String,
      default:
        'https://www.collinsdictionary.com/images/full/tree_267376982.jpg',
    },
    source: {
      type: String,
      default: 'providers',
    },
  },
};
</script>
<style>
.card {
  width: 25%;
}
.card__image {
  max-width: 90%;
  max-height: 100%;
}
.card__flex {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.active {
  text-decoration: none;
  color: rgb(var(--color-1));
}
.active > svg {
  fill: rgb(var(--color-1));
}
</style>
