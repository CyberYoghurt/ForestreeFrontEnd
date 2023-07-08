<template>
  <div class="view">
    <div class="view__flex1">
      <h2>{{ name }}</h2>
      <div>
        <svg class="view__svg" @click="openChat">
          <use xlink:href="../img/message.svg#message"></use>
        </svg>
        <svg class="view__svg" @click="closeView">
          <use xlink:href="../img/delete.svg#delete"></use>
        </svg>
      </div>
    </div>

    <div class="view__flex1">
      <img class="view__image" :src="image" alt="image of the provider" />
      <div>
        <div>
          <h4 class="view__h4">Username:</h4>
          {{ username }}
        </div>
        <div>
          <h4 class="view__h4">Owner:</h4>
          {{ owner }}
        </div>
        <div>
          <h4 class="view__h4">Telephone:</h4>
          {{ telephone }}
        </div>
        <div>
          <h4 class="view__h4">E-mail:</h4>
          {{ email }}
        </div>
      </div>
    </div>
    <div class="view__location">
      <h3>Location:</h3>
      <div class="view__map view__flex2">
        <div id="map2"></div>
        <div>{{ address }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Mark from '../img/marker-icon-2x.png';
import backEndUrl from '../utils/backEndUrl.js';

export default {
  data() {
    return {
      name: '',
      username: '',
      owner: '',
      telephone: '',
      email: '',
      address: '',
      image: '',
      page: '',
      ownerId: 0,
    };
  },
  props: ['supplierId'],
  async mounted() {
    this.page = this.$route.query.page;
    const url = `${backEndUrl}server/${this.resource}Info/?`;
    const response = await fetch(
      url + new URLSearchParams({ id: this.supplierId })
    );
    const data = await response.json();
    data;
    this.name = data.name;
    this.username = data.owner.username;
    this.owner = 'Anonymus' || data.owner.fist_name + data.owner.last_name;
    this.email = data.owner.email;
    this.ownerId = data.owner.id;
    this.address = data.address;
    this.telephone = data.telephone;
    this.image = `http://192.168.100.31:4321/` + data.image;
    this.map = L.map('map2').setView([data.latitude, data.longitude], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const icon = L.icon({
      iconUrl: Mark,
      iconSize: [25, 41], // size of the icon
      iconAnchor: [13, 41], // point of the icon which will correspond to marker's location
    });

    L.marker([data.latitude, data.longitude], {
      icon: icon,
    }).addTo(this.map);
  },
  methods: {
    closeView() {
      this.$router.push({
        path: '/' + this.resource + '-suppliers',
        query: { page: this.page },
      });
    },
    async openChat() {
      const response = await fetch(backEndUrl + 'server/chat-info/', {
        method: 'POST',

        headers: {
          Authorization: 'Bearer ' + String(this.$store.state.accessToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ownerId: this.ownerId,
        }),
      });
      const data = await response.json();
      this.$store.state.activeChat = data.name;
      this.$router.push({
        name: 'Contact',
      });
    },
  },
  created() {},
  inject: ['resource'],
};
</script>
<style>
.view {
  background-color: rgb(var(--color-6));
  color: rgb(var(--color-2));
  width: 80%;
  margin: 0 auto 5rem auto;
  border-radius: 1rem;
  padding: 1rem;
}
.view__image {
  max-width: 400px;
  max-height: 400px;
}
.view__flex1 {
  display: flex;
  justify-content: space-between;
  text-align: end;
  padding: 0 3rem;
  margin: 1rem 0;
  align-items: center;
}
.view__flex2 {
  display: flex;
  justify-content: space-between;
  text-align: end;
  align-items: center;
}
.view__map > #map2 {
  width: 500px;
  height: 300px;
}
.view__svg {
  fill: rgb(var(--color-1));
  width: 40px;
  height: 40px;
  margin: 0 1rem;
  border-radius: 50%;
  background-color: rgb(var(--color-9));
  border: solid rgb(var(--color-2));
}
.view__svg:hover {
  cursor: pointer;
}
.view__location {
  margin: 1rem 0;
  padding: 0 3rem;
}
</style>
