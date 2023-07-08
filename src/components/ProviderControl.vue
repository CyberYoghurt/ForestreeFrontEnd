<template>
  <div class="provider__control" @click="$emit('toggleForm')">
    <svg class="provider__control-icon">
      <transition>
        <use v-if="formState === false" xlink:href="../img/new.svg#new"></use>
      </transition>
      <transition>
        <use
          v-if="formState === true"
          xlink:href="../img/cancel.svg#cancel"
        ></use>
      </transition>
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    formState: Boolean,
  },
};
</script>
