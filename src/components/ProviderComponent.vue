<template>
  <div class="provider">
    <provider-control
      v-if="isLogged"
      :formState="formState"
      @toggleForm="toggleForm"
    ></provider-control>
    <provider-form
      @add="setPage"
      v-if="formState === true"
      :resource="resource"
    ></provider-form>
    <router-view></router-view>
    <div v-if="loading === false && error === true" class="provider__error">
      {{ message }}
    </div>
    <div v-if="loading === false && error === false">
      <table class="provider__table">
        <thead class="provider__head">
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Submited By</th>
        </thead>
        <tbody class="provider__body">
          <td v-if="providers.length === 0" colspan="4">
            No providers submitted yet
          </td>
          <provider-row
            v-for="provider in providers"
            :provider="provider"
            :key="provider.name"
            :page="page"
            :resource="resource"
          ></provider-row>
        </tbody>
      </table>
      <provider-paginator
        :page="page"
        :number="numberOfPages"
        :next="hasNext"
        :previous="hasPrevious"
      ></provider-paginator>
    </div>
  </div>
</template>
<script>
import openForm from '../mixins/openForm';
import ProviderRow from '../components/ProviderRow.vue';
import ProviderControl from '../components/ProviderControl.vue';
import ProviderPaginator from '../components/ProviderPaginator.vue';
import backEndUrl from '../utils/backEndUrl.js';

export default {
  data() {
    return {
      providers: [],
      hasNext: false,
      hasPrevious: false,
      page: null,
      numberOfPages: 1,
      loading: true,
      error: false,
      message: '',
    };
  },
  components: { ProviderRow, ProviderControl, ProviderPaginator },
  mixins: [openForm],
  props: {
    resource: String,
  },
  computed: {
    isLogged() {
      return this.$store.state.logged;
    },
  },
  methods: {
    async setPage() {
      this.formState = false;
      this.page = this.$route.query.page;
      try {
        const url = `${backEndUrl}server/${this.resource}/?`;
        let response = await fetch(
          url + new URLSearchParams({ page: this.page }),
          {
            method: 'GET',
          }
        );
        if (response.status === 404) {
          throw new Error('Page not found');
        }
        const data = await response.json();
        this.providers = data.providers;
        this.hasNext = data.hasNext;
        this.hasPrevious = data.hasPrevious;
        this.numberOfPages = data.numberOfPages;
      } catch (e) {
        this.error = true;
        this.message = e;
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    async $route() {
      this.setPage();
    },
  },
  async created() {
    if (this.$route.query.page === undefined) {
      this.$router.push({ query: { page: 1 } });
      return;
    }
    this.setPage();
  },
};
</script>
<style>
.provider__table {
  text-align: center;
  border: dashed rgb(var(--color-9));
  border-radius: 1rem;
  width: 95%;
  margin: 1rem auto;
}
.provider__head {
  background-color: rgb(var(--color-3));
}
.provider__body {
  background-color: rgb(var(--color-2));
}
.provider__img {
  max-width: 300px;
  max-height: 180px;
  margin: 10px;
}
.provider__centered {
  display: flex;
  justify-content: center;
}
.provider__link {
  color: rgb(var(--color-3));
  border: dashed rgb(var(--color-3));
  background-color: rgb(var(--color-9));
  border-radius: 1rem;
  padding: 5px;
  transition: 1s all;
}
.provider__link:hover {
  color: rgb(var(--color-9));
  border: dashed rgb(var(--color-8));
  background-color: rgb(var(--color-1));
}
.provider__control {
  display: flex;
  justify-content: center;
}
.provider__control-icon {
  fill: rgb(var(--color-6));
  width: 3rem;
  height: 3rem;
  margin: 1rem;
}
.provider__control-icon:hover {
  cursor: pointer;
}
.provider__error {
  text-align: center;
}
</style>
