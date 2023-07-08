<template>
  <div class="hero">
    <img class="hero__image" src="../img/heroTree.png" />
    <h2 class="hero__text">
      Advertise your business, services, products while taking care of the
      planet
    </h2>
  </div>
</template>
<style>
.hero {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.hero__container {
  width: 80%;
}
.hero__image {
  width: 40%;
}
.hero__text {
  font-size: 30px;
  width: 40%;
  background: -webkit-linear-gradient(rgb(var(--color-5)), rgb(var(--color-8)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 1s;
}
.hero__text:hover {
  transform: scale(1.05);
}
</style>
