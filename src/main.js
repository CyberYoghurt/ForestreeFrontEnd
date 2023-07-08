import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import CardView from './components/CardView';
import CardContainer from './components/CardContainer';
import ProviderForm from './components/ProviderForm';
import ProviderView from './components/ProviderView';

import LandingPage from './pages/LandingPage';
import WoodPage from './pages/WoodPage';
import MachineryPage from './pages/MachineryPage';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';
import CheckOutPage from './pages/CheckOutPage';
import SuccessPage from './pages/SuccessPage';

import { store } from './store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'Home',
      alias: '',
      component: LandingPage,
    },
    {
      path: '/machinery-suppliers/',
      name: 'MachinerySuppliers',
      component: MachineryPage,
      children: [{ path: ':supplierId', component: ProviderView, props: true }],
    },
    {
      path: '/wood-suppliers/',
      name: 'WoodSuppliers',
      component: WoodPage,
      children: [{ path: ':supplierId', component: ProviderView, props: true }],
    },
    {
      path: '/contact/',  
      name: 'Contact',
      component: ContactPage,
      props: true,
    },
    {
      path: '/tool-shop/',
      component: ShopPage,
    },
    {
      path: '/check-out/',
      component: CheckOutPage,
      beforeEnter(to, from, next) {
        if (store.state.logged) {
          next();
        } else {
          next({ name: 'Home' });
        }
      },
    },
    {
      path: '/success',
      component: SuccessPage,
    },
  ],
  linkActiveClass: 'active',
});

const app = createApp(App);

app.component('card-view', CardView);
app.component('card-container', CardContainer);
app.component('provider-form', ProviderForm);
app.component('provider-view', ProviderView);

app.use(store);
app.use(router);

router.isReady().then(() => {
  app.mount('#app');
});
