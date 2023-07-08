<template>
  <div class="card__container">
    <slot> </slot>
  </div>
</template>
<style>
.card__container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: 15rem;
}
</style>
