<template>
  <div class="purpose__card">
    <div
      class="purpose__image"
      v-bind:style="{ 'background-image': 'url(' + imgUrl + ')' }"
    >
      <div class="purpose__blur">
        <svg class="purpose__svg">
          <use :xlink:href="completeSvg"></use>
        </svg>

        <span class="purpose__text"> {{ text }}</span>
      </div>
    </div>
  </div>
</template>
<style>
.purpose__card {
  display: block;
  width: 30%;
  height: 30rem;
  overflow: hidden;
  border-radius: 5rem;
}
.purpose__image {
  position: relative;
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  transition: all 1s;
}
.purpose__blur {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  background-color: rgba(var(--color-8), 0.8);
  transition: all 1s;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: rgb(var(--color-1));
}
.purpose__image:hover .purpose__blur {
  opacity: 1;
}
.purpose__card:hover .purpose__image {
  transform: scale(1.2);
}
.purpose__svg {
  fill: rgb(var(--color-2));
  width: 5rem;
  height: 5rem;
}
.purpose__text {
  width: 80%;
  text-align: justify;
}
</style>
<script>
export default {
  props: {
    imgUrl: { type: String },
    svg: { type: String },
    name: { type: String },
    text: { type: String },
  },
  computed: {
    completeSvg() {
      return this.svg + '#' + this.name;
    },
  },
};
</script>
