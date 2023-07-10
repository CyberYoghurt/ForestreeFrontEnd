<template>
  <form
    @submit.prevent="handleSubmit"
    class="shop__form"
    v-if="admin && logged"
  >
    <label class="shop__form-label"
      >Name: <input class="shop__form-input" type="text" v-model="name"
    /></label>
    <label class="shop__form-label"
      >Brand: <input class="shop__form-input" type="text" v-model="brand"
    /></label>
    <label class="shop__form-textarea"
      >Description:
      <textarea type="text" cols="60" rows="8" v-model="description" required />
    </label>
    <label class="shop__form-label"
      >Price:
      <input
        class="shop__form-input"
        type="number"
        step="0.01"
        v-model="price"
        required
    /></label>
    <label class="shop__form-label"
      >Quantity:
      <input class="shop__form-input" type="number" v-model="quantity" required
    /></label>
    <label class="shop__form-label"
      >Image: <input class="shop__form-input" type="file" @change="handleImage"
    /></label>
    <button class="shop__form-submit" type="submit">Upload</button>
  </form>
</template>
<script>
import backEndUrl from '../utils/backEndUrl.js';

export default {
  data() {
    return {
      name: '',
      brand: '',
      description: '',
      price: 0,
      quantity: 0,
      image: null,
    };
  },
  methods: {
    async handleSubmit() {
      const data = new FormData();
      data.append('image', this.image);
      data.append('brand', this.brand);
      data.append('description', this.description);
      data.append('name', this.name);
      data.append('price', this.price);
      data.append('quantity', this.quantity);
      const url = `${backEndUrl}server/tool-shop/`;
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + String(this.$store.state.accessToken),
        },
        body: data,
      });
      const item = await response.json();
      this.$emit('add', item);
    },
    handleImage(e) {
      this.image = e.target.files[0];
      if (!this.image.type.startsWith('image/')) {
        return;
      }
    },
  },
  computed: {
    logged() {
      return this.$store.state.logged;
    },
    admin() {
      return this.$store.state.admin;
    },
  },
};
</script>
<style>
.shop__form {
  background-color: rgb(var(--color-8));
  color: rgb(var(--color-2));
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: 80%;
  border-radius: 1rem;
  padding: 1rem;
}
.shop__form-input {
  margin: 1rem 0;
  background-color: rgb(var(--color-1));
  height: 20px;
  max-width: 800px;
}
.shop__form-textarea {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 10px 0 20px 0;
}
.shop__form-submit {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: rgb(var(--color-9));
  color: rgb(var(--color-1));
  border: solid rgb(var(--color-1));
  transition: all 1s;
}
.shop__form .shop__form-submit:hover {
  background-color: rgb(var(--color-1));
  color: rgb(var(--color-9));
}
.shop__form > label {
  width: 95%;
}
.shop__form-label {
  display: flex;
  justify-content: space-around;
  align-content: center;
}
</style>
