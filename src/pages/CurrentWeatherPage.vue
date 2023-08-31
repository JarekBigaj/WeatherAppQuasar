<template>
  <q-page>
    <p>WeatherPage</p>
    <city-search />
    <current-weather-component current-city="Warsaw" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CurrentWeatherComponent from '../components/CurrentWeatherComponent.vue';
import CitySearch from 'src/components/CitySearch.vue';

export default defineComponent({
  name: 'CurrentWeatherPage',
  components: { CurrentWeatherComponent, CitySearch },
});
</script>
