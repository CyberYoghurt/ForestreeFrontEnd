<template>
  <div class="purpose">
    <purpose-card
      :imgUrl="imgHarvester"
      :svg="leaf"
      :text="text1"
      name="leaf"
    ></purpose-card>
    <purpose-card
      :imgUrl="imgProcess"
      :svg="earth"
      :text="text2"
      name="earth"
    ></purpose-card>
    <purpose-card
      :imgUrl="design"
      :svg="pen"
      :text="text3"
      name="pen"
    ></purpose-card>
  </div>
</template>
<style>
.purpose {
  display: flex;
  margin: 5rem 0;
  flex-direction: row;
  justify-content: space-around;
  background-color: rgb(var(--color-2));
  padding: 5rem 0;
}
</style>
<script>
import PurposeCard from './PurposeCard.vue';
import imgHarvester from '../img/harvester.jpg';
import imgProcess from '../img/process.jpg';
import design from '../img/design.jpg';
import leaf from '../img/leaf.svg';
import earth from '../img/earth.svg';
import pen from '../img/pen.svg';
export default {
  data() {
    return {
      imgHarvester,
      imgProcess,
      design,
      leaf,
      earth,
      pen,
      text1: `Check the community announced wood suppliers, 
      these suppliers are verified to have eco-friendly policies`,
      text2: `All the machinery providers follow  guidelines and
       have reduced carbon footprint by using green energies`,
      text3: `Check the store for useful tools that has been thought for
       woodworkers and designers. A larger variety of products will come soon`,
    };
  },
  components: {
    PurposeCard,
  },
};
</script>
