<template>
  <q-page>
    <p>WeatherPage</p>
    <city-search @citySelected="updateCurrentCity" />
    <current-weather-component :currentCity="currentCity" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CurrentWeatherComponent from '../components/CurrentWeatherComponent.vue';
import CitySearch from 'src/components/CitySearch.vue';
import { cityProps } from 'src/components/models';

export default defineComponent({
  name: 'CurrentWeatherPage',
  components: { CurrentWeatherComponent, CitySearch },
  data() {
    return {
      currentCity: {
        key: 'Warsaw52.23',
        name: 'Warsaw',
        country: 'Poland',
        longitude: 21.01,
        latitude: 52.23,
      }, // Inicjalizuj currentCity wartością domyślną
    };
  },
  methods: {
    updateCurrentCity(city: cityProps) {
      this.currentCity = city; // Aktualizuj currentCity na podstawie wybranej wartości
    },
  },
});
</script>
