<template>
  <section class="mission__flex">
    <div class="mission__background">
      <div class="mission__first">
        <h3 class="mission__title">Our resposability</h3>
      </div>
      <div class="mission__second">
        Our compromisse is with our most important partner, the earth. We ensure
        that all our partners have eco-friendly policies. A part of the profit
        goes to the funding of reforestation campaigns and much more.
      </div>
    </div>
  </section>
</template>
<style>
.mission__flex {
  margin: 5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.mission__background {
  border-radius: 1rem;
  background: rgb(var(--color-8));
  color: rgb(var(--color-2));
  width: 60%;
  max-width: 600px;
}
.mission__first {
  background: rgb(var(--color-3));
}
.mission__second {
  padding: 2rem;
}
.mission__title {
  padding: 1rem;
  color: rgb(var(--color-9));
}
</style>
