<template>
  <provider-component resource="wood"></provider-component>
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
      resource: 'wood',
    };
  },
};
</script>
