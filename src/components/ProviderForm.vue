<template>
  <form class="form__provider" @submit.prevent="handleSubmit" v-if="loggedIn">
    <div class="provider__name">
      <label for="provider-name">Name of the store</label>
      <input type="text" class="" id="provider-name" v-model="name" required />
    </div>
    <div class="provider__telephone">
      <label for="provider-telephone">Telephone</label>
      <input
        type="number"
        v-model="telephone"
        id="provider-telephone"
        required
      />
    </div>
    <div class="provider__image">
      <label for="provider-image">Image</label>
      <div class="provider__image-field">
        <div class="provider__image-display">
          <div id="image" ref="displayed"></div>
          <button
            class="provider__remove-btn"
            type="button"
            @click="removeImage"
          >
            <svg class="provider__remove-svg">
              <use xlink:href="../img/delete.svg#delete"></use>
            </svg>
          </button>
        </div>
        <input
          type="file"
          class="provider__image-input"
          id="provider-image"
          @change="handleImage"
          ref="input"
          required
        />
      </div>
    </div>
    <div class="provider__location">
      <div>Location</div>
      <div class="provider__map">
        <div id="map"></div>
        <div class="provider__location-info">
          <label for="provider-direction">Address</label>
          <textarea
            class="provider__location-text"
            id="provider-direction"
            rows="3"
            cols="100"
            disabled
            v-model="address"
            placeholder="Click on the map to point the location of your business"
            required
          />
          <label for="provider-lat">Latitude</label>
          <input type="text" v-model="lat" id="provider-lat" disabled />
          <label for="provider-lng">Longitude</label>
          <input type="text" v-model="lng" id="provider-lng" disabled />
        </div>
      </div>
    </div>
    <button class="provider__submit" type="submit">Submit</button>
  </form>
</template>
<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Mark from '../img/marker-icon-2x.png';
import backEndUrl from '../utils/backEndUrl.js';

export default {
  data() {
    return {
      map: null,
      name: null,
      lat: null,
      lng: null,
      telephone: null,
      image: null,
      address: '',
      location: '',
      marker: null,
    };
  },
  mounted() {
    this.map = L.map('map').setView([46.05, 11.05], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.map.on('click', this.onMapClick);
  },
  onBeforeMount() {
    if (this.map) {
      this.map.remove();
    }
  },
  props: ['resource'],
  methods: {
    async onMapClick(e) {
      this.address = '';
      this.location = '';
      if (this.marker) this.map.removeLayer(this.marker);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
      );
      const data = await response.json();
      this.address = data.display_name;
      const geoReversedLocation = [
        data.address.country,
        data.address.region,
        data.address.state,
      ];
      geoReversedLocation.forEach((d) => {
        if (typeof d === 'string') {
          this.location += d;
          this.location += '. ';
        }
      });
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;

      const icon = L.icon({
        iconUrl: Mark,
        iconSize: [25, 41], // size of the icon
        iconAnchor: [13, 41], // point of the icon which will correspond to marker's location
      });

      this.marker = L.marker([this.lat, this.lng], {
        icon: icon,
      }).addTo(this.map);
    },
    handleImage(e) {
      this.$refs.displayed.innerHTML = '';
      this.removeImage;
      this.image = e.target.files[0];
      if (!this.image.type.startsWith('image/')) {
        return;
      }
      const img = document.createElement('img');
      img.classList.add('provider__image-displayed');
      img.file = this.image;
      this.$refs.displayed.appendChild(img);
      const reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (e) {
          aImg.src = e.target.result;
        };
      })(img);
      reader.readAsDataURL(this.image);
    },
    removeImage() {
      this.$refs.input.value = '';
      this.$refs.displayed.innerHTML = '';
    },
    async handleSubmit() {
      const url = `${backEndUrl}server/${this.resource}/`;
      const data = new FormData();
      data.append('image', this.image);
      data.append('name', this.name);
      data.append('latitude', parseFloat(this.lat));
      data.append('longitude', parseFloat(this.lng));
      data.append('telephone', parseInt(this.telephone));
      data.append('address', this.address);
      data.append('location', this.location);
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + String(this.$store.state.accessToken),
        },
        body: data,
      });
      if (response.status === 200) {
        if (this.$route.query.page !== '1') {
          this.$router.push({ query: { page: 1 } });
          return;
        }
        this.$emit('add');
      }
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.logged;
    },
  },
};
</script>
<style>
.form__provider {
  display: grid;
  width: 100%;
  grid-template-rows: 150px 150px 400px 150px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  margin-bottom: 3rem;
}
.form__provider input {
  width: 20rem;
}
.form__provider input,
.form__provider textarea {
  background-color: rgb(var(--color-1));
}
.form__provider > div {
  border: dashed 2px rgb(var(--color-5));
  border-radius: 1rem;
  padding: 5px;
  background-color: rgb(var(--color-2));
}
.provider__name {
  grid-row: 1/2;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.provider__telephone {
  grid-row: 2/3;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.provider__image {
  grid-row: 1/3;
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.provider__image-displayed {
  max-width: 100%;
  max-height: 100%;
}
.provider__remove-svg {
  width: 3rem;
  height: 3rem;
  fill: rgb(var(--color-8));
  transition: 1s all;
  border-radius: 1rem;
}
.provider__remove-svg:hover {
  fill: rgb(var(--color-2));
  background-color: rgb(var(--color-8));
}
.provider__remove-btn {
  border: none;
  background-color: transparent;
}
.provider__location {
  grid-row: 3/4;
  grid-column: 1/3;
  width: 100%;
  text-align: center;
}
.provider__map {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.provider__location-text {
  width: 15rem;
  height: 10rem;
}
.provider__location-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 350px;
}
.provider__location-info input {
  width: 15rem;
}
.provider__image-field {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.provider__image-field .provider__image-input {
  width: 10rem;
}
.provider__image-display {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.provider__image-input {
  width: 10rem;
  height: 5rem;
}
.provider__submit {
  grid-row: 4/5;
  grid-column: 1/3;
  background-color: rgb(var(--color-7));
  color: rgb(var(--color-2));
  border-radius: 1rem;
  border: none;
  padding: 1rem;
}
#image {
  background-color: rgb(var(--color-4));
  border-radius: 1rem;
  height: 200px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.provider__map > #map {
  height: 350px;
  width: 600px;
}
</style>
