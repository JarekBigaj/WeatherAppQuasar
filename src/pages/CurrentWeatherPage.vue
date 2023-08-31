<template>
  <q-page>
    <p>WeatherPage</p>
    <current-weather-component current-city="Warsaw" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CurrentWeatherComponent from '../components/CurrentWeatherComponent.vue';

export default defineComponent({
  name: 'CurrentWeatherPage',
  components: { CurrentWeatherComponent },
});
</script>
