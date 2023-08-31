<template>
  <q-page class="column justify-start items-stretch content-center">
    <q-card class="my-card col q-gutter-sm q-col-gutter-x-sm content-style">
      <q-card-section class="q-pt-xs">
        <city-search @citySelected="updateCurrentCity" />
      </q-card-section>
      <div><current-weather-component :currentCity="currentCity" /></div>
    </q-card>
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

<style lang="scss">
.content-style {
  overflow: auto;
  margin-top: 3em;
  height: 20em;
  width: 40em;
}
</style>
