<template>
  <div>
    <p>Temperature: {{ currentWeather.temperature }}</p>
    <p>Wind Direction: {{ currentWeather.winddirection }}</p>
    <p>Wind Speed: {{ currentWeather.windspeed }}</p>
    <p>Weather Code: {{ currentWeather.weatherCode }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CurrentWeatherComponent',
  data() {
    return {
      currentWeather: {
        temperature: 0,
        winddirection: 0,
        windspeed: 0,
        weatherCode: 0,
      },
    };
  },
});
</script>
