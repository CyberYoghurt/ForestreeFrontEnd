<template>
  <nav class="nav">
    <div class="dropdown">
      <ul class="menu">
        <li class="menu__link">
          <router-link to="/">
            <svg class="menu__home">
              <use xlink:href="../img/forestree.svg#forestree"></use>
            </svg>
          </router-link>
        </li>
        <li class="menu__link">
          <a class="menu__ref" @click.prevent href=""><h2>Business</h2></a>
          <div class="submenu">
            <card-container>
              <card-view
                label="Wood Suppliers"
                source="wood-suppliers"
                image="https://wood-source.com/wp-content/uploads/2022/09/Warehouse.png"
              >
              </card-view>
              <card-view
                label="Machinery Vendors"
                source="machinery-suppliers"
                image="https://upload.wikimedia.org/wikipedia/commons/a/a3/TJ_harvesteri.jpg"
              >
              </card-view>
            </card-container>
          </div>
        </li>
        <li class="menu__link">
          <router-link to="/tool-shop/?page=1"><h2>Shop</h2></router-link>
          <div class="submenu"></div>
        </li>
        <li class="menu__link">
          <router-link to="/contact/">
            <h2>Contact</h2>
          </router-link>
          <div class="submenu"></div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<style>
.dropdown {
  width: 100%;
}
.submenu {
  position: absolute;
  background-color: rgb(var(--color-8));
  display: none;
  top: 40px;
  left: 0px;
  width: 100%;
  z-index: 10;
  position: absolute;
}
nav li:hover .submenu {
  display: block;
  border-radius: 0 0 1rem 1rem;
  color: rgb(var(--color-1));
}
.menu {
  padding: 0;
  position: absolute;
  width: 100%;
  top: 0px;
  height: 40px;
  left: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(var(--color-3));
  margin-top: 0px;
  box-shadow: 0px 2px 2px 1px rgb(var(--color-8));
}
.menu__link {
  list-style: none;
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.menu__link:hover {
  color: rgb(var(--color-1));
  background: rgb(var(--color-8));
}
.menu__link:hover .menu__home {
  fill: rgb(var(--color-1));
}
.menu__ref {
  text-decoration: none;
}
.menu__ref:visited,
.menu__ref:active {
  color: inherit;
}
.menu__home {
  fill: rgb(var(--color-9));
  padding: 3px 0;
  height: 2rem;
  display: flex;
  justify-content: center;
}
.menu__link > a {
  display: flex;
  justify-content: center;
}
</style>
