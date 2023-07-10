<template>
  <div class="shop">
    <div class="shop__cart">
      <svg
        v-if="counter.length !== 0 && loading === false && error === false"
        class="shop__button-cart"
        @click="toggleCart"
      >
        <use xlink:href="../img/cart.svg#cart"></use>
      </svg>
      <div class="shop__cart-menu" v-if="cartOpen">
        <div
          class="shop__cart-menu-item"
          v-for="(item, index) in cart"
          :key="item.id"
        >
          <img class="shop__cart-image" :src="`${backEndUrl}${item.image}`" />
          <div>{{ item.name }}</div>
          <div>{{ item.quantity }}</div>
          <svg class="shop__cart-delete" @click="deleteFromCart(index)">
            <use xlink:href="../img/delete.svg#delete"></use>
          </svg>
        </div>
        <div class="shop__cart-empty" v-if="cart.length === 0">
          No items in your cart
        </div>
        <router-link to="/check-out/" v-if="total > 0">
          <div class="shop__cart-total">Total: {{ total }}</div>
          <button class="shop__cart-checkout">Checkout</button>
          <div></div>
        </router-link>
      </div>
    </div>
    <svg
      class="shop__control-icon"
      v-if="isAdmin && loading === false && error === false"
      @click="toggleForm"
    >
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
    <transition>
      <shop-form v-if="formState" @add="addToCounter" />
    </transition>
    <div class="shop__error">{{ message }}</div>
    <div class="shop__counter">
      <div v-if="counter.length === 0 && loading === false && error === false">
        No items for sale :C
      </div>
      <div class="shop__item" v-for="item in counter" :key="item.id">
        <div class="shop__item-box1">
          <img class="shop__item-image" :src="`${backEndUrl}${item.image}`" />
          <div class="shop__item-name">{{ item.name }}</div>
          <div class="shop__item-brand">{{ item.brand || 'Brand' }}</div>
          <svg class="shop__item-rating-icon">
            <mask :id="`starMask${item.id}`">
              <rect
                x="0"
                y="0"
                :width="(item.average_rating / 5) * 100"
                height="20"
                fill="white"
              />
              <rect
                :x="(item.average_rating / 5) * 100"
                y="0"
                :width="100 - (item.average_rating / 5) * 100"
                height="20"
                fill="gray"
              />
            </mask>
            <g :mask="`url(#starMask${item.id})`">
              <use
                v-for="n in 5"
                :key="n"
                xlink:href="../img/star.svg#star"
                :x="n * 20 - 20"
                :y="0"
                width="20"
                height="20"
              ></use>
            </g>
          </svg>
        </div>
        <div class="shop__item-box2">
          <div :class="{ shop__discount: item.discount > 0 }">
            ${{ item.price }}
          </div>
          <div v-if="item.discount > 0">
            ${{ item.price - item.price * item.discount }}
          </div>
          <div>
            Quantity available: <br />
            {{ item.quantity }}
          </div>
          <div class="shop__item-quantity">
            <svg
              class="shop__item-quantity-symbol"
              @click="reduceQuantity(item)"
            >
              <use xlink:href="../img/minus.svg#minus"></use>
            </svg>
            <div>{{ item.toAdd || 0 }}</div>
            <svg
              class="shop__item-quantity-symbol"
              @click="increaseQuantity(item)"
            >
              <use xlink:href="../img/plus.svg#plus"></use>
            </svg>
          </div>
          <button @click="addToCart(item)">Add to Cart</button>
        </div>
      </div>
    </div>
    <provider-paginator
      :page="page"
      :number="numberOfPages"
      :next="hasNext"
      :previous="hasPrevious"
      v-if="loading === false && error === false && counter.length !== 0"
    ></provider-paginator>
  </div>
</template>
<script>
import ShopForm from '../components/ShopForm.vue';
import ProviderPaginator from '../components/ProviderPaginator.vue';
import backEndUrl from '../utils/backEndUrl';
export default {
  data() {
    return {
      counter: [],
      page: null,
      hasNext: false,
      hasPrevious: false,
      numberOfPages: 1,
      cartOpen: false,
      formState: false,
      error: false,
      loading: false,
      message: '',
    };
  },
  components: { ShopForm, ProviderPaginator },
  async mounted() {
    this.setPage();
    console.log(backEndUrl);
  },
  methods: {
    async setPage() {
      console.log(backEndUrl);
      this.page = this.$route.query.page;
      try {
        const url = `${backEndUrl}server/tool-shop/?`;
        this.loading = true;
        let response = await fetch(
          url + new URLSearchParams({ page: this.page }),
          {
            method: 'GET',
          }
        );
        console.log(response);
        if (response.status === 404) {
          this.error = true;
          throw new Error('Page not found');
        }
        const data = await response.json();
        this.hasNext = data.hasNext;
        this.hasPrevious = data.hasPrevious;
        this.numberOfPages = data.numberOfPages;
        this.counter = data.products;
      } catch (e) {
        this.error = true;
        this.message = e;
      } finally {
        this.loading = false;
      }
    },
    toggleCart() {
      this.cartOpen = !this.cartOpen;
    },
    increaseQuantity(item) {
      if (!item.toAdd) {
        item.toAdd = 1;
      } else {
        item.toAdd++;
      }
    },
    reduceQuantity(item) {
      if (item.toAdd === 0 || item.toAdd === undefined) return;
      else item.toAdd--;
    },
    addToCart(item) {
      // Return if quantity to add is 0
      if (!(item.quantity >= 1)) return;

      //Checking if item is already in the cart
      if (this.cart.some((itemOnCart) => itemOnCart.id === item.id)) {
        this.cart.forEach((itemOnCart) => {
          if (itemOnCart.id === item.id) {
            itemOnCart.quantity += item.toAdd;
            item.toAdd = 0;
          }
        });
        return;
      }
      this.cart.push({ ...item, quantity: item.toAdd });
      item.toAdd = 0;
    },
    deleteFromCart(index) {
      this.cart.splice(index, 1);
    },
    toggleForm() {
      this.formState = !this.formState;
    },
    addToCounter(item) {
      this.counter.pop();
      this.counter.unshift(item);
      this.formState = false;
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.admin;
    },
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.getters.total;
    },
  },
  watch: {
    async $route() {
      this.setPage();
    },
  },
};
</script>
<style>
.shop {
  margin-top: 3rem;
}
.shop button {
  font-size: 12px;
  transition: 1s all;
}
.shop button:hover {
  background-color: rgb(var(--color-7));
  color: rgb(var(--color-3));
}

.shop__counter {
  margin-top: 6rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100vw;
}
.shop__item {
  text-align: center;
  width: 240px;
  height: 20%;
  margin-right: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  padding: 5px;
  border: dotted rgb(var(--color-9));
  display: flex;
  justify-content: space-around;
}

.shop__item-rating {
  display: flex;
  width: 100px;
}
.shop__item-rating-icon {
  fill: rgb(var(--color-1));
  width: 100px;
  height: 20px;
  margin: 5px 0px;
}
.shop__item-image {
  display: inline;
  max-height: 4rem;
  max-width: 4rem;
  margin: 0 auto;
  margin-bottom: 5px;
}
.shop__item-box1 {
  display: flex;
  font-size: 14px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  background-color: rgb(var(--color-8));
  color: rgb(var(--color-2));
  border-radius: 5px;
  width: 6rem;
  margin-right: 5px;
  min-height: 7rem;
}
.shop__discount {
  text-decoration: line-through;
}
.shop__cart {
  position: absolute;
  top: 6rem;
  left: 3rem;
  width: 20rem;
}
.shop__button-cart {
  fill: rgb(var(--color-9));
  width: 3rem;
  height: 3rem;
  position: relative;
  margin: 0 250px 0 auto;
  display: block;
  background-color: rgb(var(--color-3));
  border-radius: 50%;
  padding: 5px;
  border: solid rgb(var(--color-9));
}
.shop__cart-menu {
  background-color: rgb(var(--color-2));
  border-radius: 1rem;
  border: solid rgb(var(--color-9));
}
.shop__cart-menu > * {
  margin: 5px 0;
  padding: 0 5px;
}
.shop__item-quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(var(--color-3));
  border-radius: 5px;
}
.shop__item-quantity-symbol {
  width: 12px;
  height: 12px;
  fill: rgb(var(--color-8));
}
.shop__cart-menu-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(var(--color-9));
  color: rgb(var(--color-2));
  padding: 10px 0;
}
.shop__cart-image {
  width: 20px;
}
.shop__cart-delete {
  fill: rgb(var(--color-1));
  width: 12px;
  height: 12px;
}
.shop__cart-checkout {
  display: block;
  width: 100px;
  margin: 0 auto;
  margin-top: 10px;
}
.shop__cart-menu .shop__cart-checkout {
  font-size: 16px;
}

.shop__cart-total,
.shop__cart-empty {
  text-align: center;
  font-weight: 800;
}
.shop__control-icon {
  display: block;
  margin: 0 auto;
  fill: rgb(var(--color-6));
  width: 3rem;
  height: 3rem;
}
.shop__error {
  width: 300px;
  margin: 0 auto;
}
</style>
