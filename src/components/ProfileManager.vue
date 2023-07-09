<template>
  <div class="manager">
    <h2>{{ storedUsername }} profile</h2>
    <div>
      <h3>User Data:</h3>
      <h5 v-if="messageProfile">{{ messageProfile }}</h5>
      <form @submit.prevent="submitData">
        <h4 v-if="messageProfile"></h4>

        <label class="manager__label">
          First name
          <input type="text" v-model="firstName" />
        </label>
        <label class="manager__label">
          Last name
          <input type="text" v-model="lastName" />
        </label>
        <label class="manager__label">
          Username
          <input type="text" v-model="username" required />
        </label>
        <label class="manager__label">
          Email
          <input type="text" v-model="email" required />
        </label>
        <button class="manager__button" type="submit">Change</button>
      </form>
    </div>
    <div>
      <h3>Password Change:</h3>
      <h5 v-if="messagePassword">{{ messagePassword }}</h5>
      <form @submit.prevent="changePassword">
        <h4 v-if="passwordError"></h4>
        <label class="manager__label">
          Old Password:
          <input type="password" v-model="oldPassword" required />
        </label>
        <label class="manager__label">
          New Password:
          <input type="password" v-model="password1" required />
        </label>
        <label class="manager__label">
          Confirm Password:
          <input type="password" v-model="password2" required />
        </label>
        <button class="manager__button" type="submit">Change</button>
      </form>
    </div>
    <div>
      <h3>Suppliers:</h3>
      <div class="manager__suppliers">
        <div>
          <h4>Woods</h4>
          <div class="manager__suppliers-list">
            <div class="manager__supplier" v-if="woods.length === 0">
              No woods submitted
            </div>
            <div
              v-for="wood in woods"
              class="manager__supplier"
              :key="wood.name"
            >
              <img
                :src="backEndUrl + wood.image"
                alt="Image of the submited supplier"
                class="manager__supplier-image"
              />
              <h5>{{ wood.name }}</h5>
              <svg
                class="manager__supplier-delete"
                @click="deleteWood(wood.id)"
              >
                <use xlink:href="../img/delete.svg#delete"></use>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <h4>Machineries</h4>
          <div class="manager__suppliers-list">
            <div class="manager__supplier" v-if="machineries.length === 0">
              No machineries submitted
            </div>

            <div
              v-for="machinery in machineries"
              class="manager__supplier"
              :key="machinery.name"
            >
              <img
                :src="backEndUrl + machinery.image"
                alt="Image of the submited supplier"
                class="manager__supplier-image"
              />
              <h5>{{ machinery.name }}</h5>
              <svg
                class="manager__supplier-delete"
                @click="deleteMachinery(machinery.id)"
              >
                <use xlink:href="../img/delete.svg#delete"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import backEndUrl from '../utils/backEndUrl.js';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      oldPassword: '',
      originalUsername: '',
      originalEmail: '',
      originalFirstName: '',
      originalLastName: '',
      password1: '',
      password2: '',
      dataError: null,
      passwordError: null,
      woods: [],
      machineries: [],
    };
  },
  props: ['messagePassword', 'messageProfile'],
  async mounted() {
    const response = await fetch(backEndUrl + 'server/update/', {
      headers: {
        Authorization: 'Bearer ' + String(this.$store.state.accessToken),
      },
    });
    const data = await response.json();
    this.originalUsername = data.userInfo.username;
    this.originalEmail = data.userInfo.email;
    this.originalFirstName = data.userInfo.first_name;
    this.originalLastName = data.userInfo.last_name;
    this.username = data.userInfo.username;
    this.email = data.userInfo.email;
    this.firstName = data.userInfo.first_name;
    this.lastName = data.userInfo.last_name;
    this.woods = data.woods;
    this.machineries = data.machineries;
  },
  computed: {
    storedUsername() {
      return this.$store.state.username;
    },
  },
  methods: {
    async submitData() {
      const response = await fetch(backEndUrl + 'api/changeProfile/', {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + String(this.$store.state.accessToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        }),
      });
      if (response.status === 200) {
        this.$emit('changeMessageProfile', 'Profile updated');
        this.originalFirstName = this.firstName;
        this.originalLastName = this.lastName;
        this.originalUsername = this.username;
        this.originalEmail = this.email;
      } else {
        this.$emit('changeMessageProfile', 'Something went wrong');
        this.firstName = this.originalFirstName;
        this.lastName = this.originalLastName;
        this.username = this.originalUsername;
        this.email = this.originalEmail;
      }
    },
    async changePassword() {
      if (this.password1 !== this.password2) {
        this.$emit('changeMessagePassword', 'Passwords do not match');
        this.password1 = '';
        this.password2 = '';
        return;
      } else if (this.password1 === this.oldPassword) {
        this.$emit(
          'changeMessagePassword',
          'New password cant be the same as the old'
        );
        this.password1 = '';
        this.password2 = '';
        this.oldPassword = '';
        return;
      }
      const response = await fetch(backEndUrl + 'api/changePassword/', {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + String(this.$store.state.accessToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          old: this.oldPassword,
          pass1: this.password1,
          pass2: this.password2,
        }),
      });
      if (response.status === 200) {
        // this.message = 'Password updated';
        this.$emit('changeMessagePassword', 'Password updated');
        this.oldPassword = '';
        this.password1 = '';
        this.password2 = '';
      } else if (response.status === 401) {
        this.$emit('changeMessagePassword', 'Incorrect password');
      }
    },
    async deleteWood(id) {
      await fetch(backEndUrl + 'server/woodInfo/', {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + String(this.$store.state.accessToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
    },
    async deleteMachinery() {},
  },
};
</script>
<style>
.manager h2,
.manager h3 {
  margin: 5px 0;
}
.manager__label {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 600px;
  margin-top: 3px;
}
.manager__label > input {
  height: 20px;
  margin: auto 0;
  width: 400px;
}
.manager__button {
  color: rgb(var(--color-2));
  background-color: rgb(var(--color-8));
  padding: 5px;
  margin-top: 3px;
}
.manager__suppliers {
  display: flex;
  justify-content: space-evenly;
}
.manager__supplier {
  width: 250px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(var(--color-8));
  border-radius: 5px;
  align-items: center;
  padding: 5px;
  color: rgb(var(--color-2));
  box-sizing: border-box;
}

.manager__supplier-image {
  max-width: 50px;
  max-height: 50px;
}
.ma .manager__suppliers-list {
  overflow: scroll;
  height: 150px;
}
.manager__supplier-delete {
  width: 30px;
  height: 30px;
  fill: rgb(var(--color-2));
}
.manager__supplier-delete:hover {
  cursor: pointer;
}
</style>
