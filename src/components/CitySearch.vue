<template>
  <div>
    <input
      v-model="searchInput"
      @input="handleSearchInput"
      placeholder="Search for a city"
    />

    <ul>
      <li
        v-for="city in searchingCities"
        :key="city.key"
        @click="selectCity(city)"
      >
        {{ city.name }} - {{ city.country }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { cityProps } from './models';
const URL_API_GEOCODING =
  'https://geocoding-api.open-meteo.com/v1/search?name=';

export default defineComponent({
  name: 'CitySearch',
  data() {
    return {
      searchInput: '',
      searchingCities: [] as cityProps[],
    };
  },
  watch: {
    searchInput(newInput) {
      this.fetchCities(newInput);
    },
  },
  methods: {
    async fetchCities(input: string) {
      try {
        const response = await this.getCity(input);
        const { results } = response;
        this.searchingCities = this.processCityResults(results);
      } catch (err) {
        console.error(err);
      }
    },
    async getCity(input: string) {
      const response = await fetch(`${URL_API_GEOCODING}${input}`);
      const json = response.json();
      return json;
    },
    processCityResults(results: cityProps[]) {
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
    handleSearchInput(event: Event) {
      this.searchInput = (event.target as HTMLInputElement).value;
    },
    selectCity(city: cityProps) {
      this.$emit('citySelected', city); // Emituj zdarzenie, aby przekazać wybrane miasto do komponentu nadrzędnego
    },
  },
});
</script>
