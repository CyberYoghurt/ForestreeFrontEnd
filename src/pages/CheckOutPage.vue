<template>
  <div class="checkout">
    <h2>Checkout Page</h2>
    <div class="checkout__flex">
      <div class="checkout__summary">
        <div class="checkout__cart">
          <div v-for="item in cart" class="checkout__cart-item" :key="item.id">
            <div class="checkout__cart-borderimage">
              <img
                class="checkout__cart-image"
                :src="'http://192.168.100.31:4321' + item.image"
              />
            </div>
            <h4>{{ item.name }}</h4>
            <div>{{ item.brand }}</div>
            <div>
              <div :class="{ checkout__discount: item.discount > 0 }">
                ${{ item.price }}
              </div>
              <div v-if="item.discount > 0">
                ${{ item.price - item.price * item.discount }}
              </div>
            </div>
            <div>{{ item.quantity }}</div>
          </div>
        </div>
        <h3 class="checkout__total">Total: ${{ total }}</h3>
      </div>
      <form id="payment-form" class="checkout__form" @submit.prevent="pay">
        <div id="link-authentication-element">
          <!--Stripe.js injects the Link Authentication Element-->
        </div>
        <div id="payment-element">
          <!--Stripe.js injects the Payment Element-->
        </div>
        <button id="submit" class="checkout__pay">
          <div class="spinner hidden" id="spinner"></div>
          <span id="button-text">Pay now</span>
        </button>
        <div id="payment-message" class="hidden"></div>
      </form>
    </div>
  </div>
</template>
<script>
import { loadStripe } from '@stripe/stripe-js';
import backEndUrl from '../utils/backEndUrl.js';

export default {
  data() {
    return {
      stripe: null,
      emailAddress: '',
      elements: null,
    };
  },
  methods: {
    async pay() {
      const { error } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: 'www.google.com',
          receipt_email: this.emailAddress,
        },
      });
      error;
    },
    async initialize() {
      this.stripe = await loadStripe(
        'pk_test_51MlFqGI12VwHEyX8LZSf7poE4h0AcCIRkQPba7tdPh2S8sDcCwbmvZn0S2yvO0gLi2rWxBpkH9FtHafH6sze22Wl00n76yVKwo'
      );
      let info = JSON.stringify(this.cart);
      const url = `${backEndUrl}server/checkout/`;
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + String(this.$store.state.accessToken),
          'Content-Type': 'application/json',
        },
        body: info,
      });
      const { clientSecret } = await response.json();
      this.clientSecret = clientSecret;

      try {
        const appearance = {
          theme: 'stripe',
        };
        this.elements = this.stripe.elements({ appearance, clientSecret });
        const linkAuthenticationElement = this.elements.create(
          'linkAuthentication',
          { defaultValues: { email: this.loggedEmail } }
        );
        linkAuthenticationElement.mount('#link-authentication-element');
        this.emailAddress = this.loggedEmail;
        linkAuthenticationElement.on('change', (event) => {
          this.emailAddress = event.value.email;
        });

        const paymentElementOptions = {
          layout: 'tabs',
        };
        const paymentElement = this.elements.create(
          'payment',
          paymentElementOptions
        );
        paymentElement.mount('#payment-element');
      } catch (e) {
        e;
      }
    },
    async checkStatus() {
      const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
      );

      if (!clientSecret) {
        return;
      }
      const { paymentIntent } = await this.stripe.retrievePaymentIntent(
        clientSecret
      );

      switch (paymentIntent.status) {
        case 'succeeded':
          break;
        case 'processing':
          break;
        case 'requires_payment_method':
          break;
        default:
          break;
      }
    },
  },
  async mounted() {
    await this.initialize();
    await this.checkStatus();
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.getters.total;
    },
    loggedEmail() {
      return this.$store.state.email;
    },
  },
};
</script>
<style>
.checkout {
  margin-top: 3rem;
}
.checkout__cart-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
}
.checkout__flex {
  display: flex;
}
.checkout__form,
.checkout__summary {
  width: 50%;
  padding: 0 1rem;
}
.checkout__cart-borderimage {
  background-color: rgb(var(--color-3));
  border-radius: 5px;
  width: 60px;
  height: 60px;
}
.checkout__cart-image {
  width: 60px;
  height: 60px;
  border-radius: 20px;
}
.checkout__cart {
  color: rgb(var(--color-3));
  background-color: rgb(var(--color-7));
  padding: 10px;
  border-radius: 1rem;
  font-size: 12px;
}
.checkout__total {
  background-color: rgb(var(--color-2));
  color: rgb(var(--color-8));
  border: dotted rgb(var(--color-8));
  border-radius: 1rem;
  padding: 10px;
  display: inline-block;
  margin-top: 3rem;
}
.checkout__discount {
  text-decoration: line-through;
}
.checkout__pay {
  background-color: rgb(var(--color-9));
  display: block;
  margin: 2rem auto;
  padding: 10px;
  color: rgb(var(--color-1));
}
</style>
