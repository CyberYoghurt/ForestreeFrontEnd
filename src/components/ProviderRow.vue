<template>
  <tr>
    <td class="provider__centered">
      <img class="provider__img" :src="image" />
    </td>
    <td>
      <router-link class="provider__link" :to="link">{{
        this.provider.name
      }}</router-link>
    </td>
    <td>{{ this.provider.location }}</td>
    <td>{{ this.provider.owner.username }}</td>
  </tr>
</template>
<script>
export default {
  computed: {
    link() {
      return {
        path: '/' + this.resource + '-suppliers' + '/' + this.provider.id,
        query: { page: this.page },
      };
    },
    image() {
      return backEndUrl + this.provider.image;
    },
  },
  mounted() {},
  props: {
    provider: {
      type: Object,
      default: () => {
        return {};
      },
    },
    page: {
      type: String,
    },
    resource: {
      type: String,
    },
  },
};
</script>
