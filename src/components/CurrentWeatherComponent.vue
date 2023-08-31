<template>
  <div>
    <p>Temperature: {{ currentWeather.temperature }}</p>
    <p>Wind Direction: {{ currentWeather.winddirection }}</p>
    <p>Wind Speed: {{ currentWeather.windspeed }}</p>
    <p>Weather Code: {{ currentWeather.weatherCode }}</p>
  </div>
</template>

<script>
import { defineComponent, watch } from 'vue';
const URL_WEATHER = 'https://api.open-meteo.com/v1/forecast?';
const URL_PARAMS_CURRENT_WEATHER = 'current_weather=true';
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
  props: {
    currentCity: {
      type: String,
      default: 'Warsaw',
    },
  },
  mounted() {
    this.fetchWeatherForCity(this.currentCity);
  },
  watch: {
    currentCity(newCity, oldCity) {
      if (newCity !== oldCity) {
        this.fetchWeatherForCity(newCity);
      }
    },
  },
  methods: {
    async fetchWeatherForCity(city) {
      try {
        const response = await this.getWeather(city);
        console.log({ response });
        const { current_weather } = response;
        console.log({ current_weather });
        this.currentWeather = {
          temperature: current_weather.temperature,
          winddirection: current_weather.winddirection,
          windspeed: current_weather.windspeed,
          weatherCode: current_weather.weathercode,
        };
      } catch (err) {
        console.error(err);
      }
    },
    async getWeather(city) {
      const { latitude, longitude } = { latitude: 52.52, longitude: 13.41 };
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const json = response.json();
      return json;
    },
  },
});
</script>
