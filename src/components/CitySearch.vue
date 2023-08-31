<template>
  <div>
    <input
      v-model="searchInput"
      @input="handleSearchInput"
      placeholder="Search for a city"
    />

    <ul>
      <li v-for="city in searchingCities" :key="city.key">
        {{ city.name }} - {{ city.country }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
const URL_API_GEOCODING =
  'https://geocoding-api.open-meteo.com/v1/search?name=';

export default defineComponent({
  name: 'CitySearch',
  data() {
    return {
      searchInput: '',
      searchingCities: [],
    };
  },
  watch: {
    currentCity(newCity, oldCity) {
      if (newCity !== oldCity) {
        this.fetchWeatherForCity(newCity);
      }
    },
    searchInput(newInput) {
      this.fetchCities(newInput);
    },
  },
  methods: {
    async fetchCities(input) {
      try {
        const response = await this.getCity(input);
        const { results } = response;
        this.searchingCities = this.processCityResults(results);
      } catch (err) {
        console.error(err);
      }
    },
    async getCity(input) {
      const response = await fetch(`${URL_API_GEOCODING}${input}`);
      const json = response.json();
      return json;
    },
    processCityResults(results) {
      if (Array.isArray(results)) {
        return results.map((city) => ({
          key: city.name + city.longitude + city.latitude,
          name: city.name,
          country: city.country,
          longitude: city.longitude,
          latitude: city.latitude,
        }));
      }
      return [];
    },
    handleSearchInput(event) {
      this.searchInput = event.target.value;
    },
  },
});
</script>
