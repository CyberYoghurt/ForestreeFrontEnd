<template>
  <hero-banner></hero-banner>
  <mission-text></mission-text>
  <purpose-section></purpose-section>
</template>
<script>
import MissionText from '../components/MissionText.vue';
import HeroBanner from '../components/HeroBanner.vue';
import PurposeSection from '../components/PurposeSection.vue';
export default {
  components: {
    MissionText,
    HeroBanner,
    PurposeSection,
  },
};
</script>
<style></style>
