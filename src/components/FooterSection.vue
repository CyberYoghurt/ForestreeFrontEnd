<template>
  <footer class="footer">
    <div class="footer__flex">
      <div class="footer__text">
        Forestree Demo Project done by
        <a class="footer__link" href="https://www.linkedin.com/in/robertcrdev/">
          Robert CR</a
        >
      </div>
      <svg class="footer__logo">
        <use xlink:href="../img/forestree.svg#forestree"></use>
      </svg>
    </div>
    <div class="footer__purpose">
      This website is not a commercial production ready business <br />
      It serves demonstrative purposes only
    </div>
  </footer>
</template>
<style>
.footer {
  width: 100vw;
  background-color: rgb(var(--color-7));
  color: rgb(var(--color-2));
  padding: 3rem;
  box-sizing: border-box;
  position: relative;
}
.footer__flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.footer__link {
  color: rgb(var(--color-1));
  text-decoration: underline;
  transition: all 1s;
  display: inline-block;
}
.footer__link:hover {
  transform: rotate(10deg) scale(1.2);
}
.footer__logo {
  fill: rgb(var(--color-1));
  width: 4rem;
  height: 4rem;
  transition: all 1s;
}
.footer__logo:hover {
  transform: scale(2);
}
.footer__text {
  display: inline-block;
}
.footer__text::before {
  display: block;
  content: '';
  width: 100%;
  height: 5px;
  background-color: rgb(var(--color-1));
  border-radius: 3px;
  margin: 10px 0;
}
.footer__purpose {
  margin: 3rem auto 1rem auto;
  width: 60%;
  color: rgb(var(--color-3));
  text-align: center;
  font-size: 12px;
}
</style>
