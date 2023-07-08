<template>
  <provider-component resource="machinery"></provider-component>
</template>
<script>
import ProviderComponent from '../components/ProviderComponent.vue';
export default {
  components: {
    ProviderComponent,
  },
  provide() {
    // use function syntax so that we can access `this`
    return {
      resource: 'machinery',
    };
  },
};
</script>
