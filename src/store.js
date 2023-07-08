import { createStore } from 'vuex';
import jwt from 'jwt-decode';
import backEndUrl from './utils/backEndUrl.js';

export const store = createStore({
  state() {
    return {
      logged: false,
      admin: false,
      username: '',
      email: '',
      accessToken: '',
      refreshToken: '',
      message: '',
      cart: [],
      activeChat: null,
    };
  },
  mutations: {
    logOut(state) {
      state.logged = false;
      state.admin = false;
      state.username = '';
      state.accessToken = '';
      state.refreshToken = '';
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
    },
    clearMessage(state) {
      state.message = '';
    },
  },
  actions: {
    //for async
    // async signUp(_, payload) {},
    async logIn(context, payload) {
      context.state.message = '';
      try {
        console.log('Debugging fetchs', backEndUrl);
        const response = await fetch(backEndUrl + 'api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: payload.username,
            password: payload.password,
          }),
        });
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          context.state.accessToken = data.access;
          context.state.refreshToken = data.refresh;
          context.state.username = jwt(data.access).username;
          context.state.admin = jwt(data.access).isAdmin;
          context.state.email = jwt(data.access).email;
          context.state.logged = true;
          context.state.message = '';

          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);

          return true;
        } else {
          const data = await response.json();
          throw Error(data.detail);
        }
      } catch (e) {
        context.state.message = e || 'Server error';
        return false;
      }
    },
    async signUp(context, payload) {
      const response = await fetch(backEndUrl + 'api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: payload.username,
          password: payload.password,
          password2: payload.password2,
          email: payload.email,
          first_name: payload.firstname,
          last_name: payload.lastname,
        }),
      });
      if (response.status === 201) {
        context.state.message = 'Account created';
        return true;
      } else {
        const data = await response.json();
        let message = 'Sign Up went wrong. \n';
        data.password && message + data.password;
        if (data.password) {
          message += 'Password: ';
          data.password.forEach((e) => {
            message += e;
          });
          message += '\n';
        }
        if (data.username) {
          message += 'Username: ';
          data.username.forEach((e) => {
            message += e;
          });
          message += '\n';
        }
        if (data.email) {
          message += 'Email: ';
          data.email.forEach((e) => {
            message += e;
          });
        }
        context.state.message = message;
      }
    },
    async logInWithToken(context, payload) {
      const response = await fetch(backEndUrl + 'server/check/', {
        headers: {
          Authorization: 'Bearer ' + String(payload.access),
        },
      });
      if (response.status === 200) {
        context.state.logged = true;
        context.state.username = jwt(payload.access).username;
        context.state.accessToken = payload.access;
        context.state.refreshToken = payload.refresh;
        context.state.admin = jwt(payload.access).isAdmin;
        context.state.email = jwt(payload.access).email;
        return true;
      }
    },
  },
  getters: {
    total(state) {
      let total;
      total = 0;
      state.cart.forEach((item) => {
        total += (+item.price - +item.price * +item.discount) * +item.quantity;
      });
      return (Math.round(total * 100) / 100).toFixed(2);
    },
  },
});
