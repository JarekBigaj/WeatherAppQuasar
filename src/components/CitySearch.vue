<template>
  <div class="search-wrapper">
    <q-input
      square
      bottom-slots
      v-model="searchInput"
      @input="handleSearchInput"
      placeholder="Search for a city"
    >
      <template v-slot:prepend>
        <q-icon name="place" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="searchInput = ''" class="cursor-pointer" />
      </template>
    </q-input>
    <q-list bordered class="search-results">
      <q-item
        clickable
        v-ripple
        v-for="city in searchingCities"
        :key="city.key"
        @click="selectCity(city)"
        
      >
        <q-item-section>{{ city.name }} - {{ city.country }}</q-item-section>
      </q-item>
    </q-list>
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
    handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'Enter' && this.searchingCities.length > 0) {
        this.selectCity(this.searchingCities[0]);
      }
    },
    selectCity(city: cityProps) {
      this.$emit('citySelected', city);
      this.searchInput = '';
    },
  },
  mounted() {
    this.$el.querySelector('input')?.addEventListener('keyup', this.handleKeyPress);
  },
});
</script>

<style lang="scss">
.search-results {
  position: absolute;
  top: 3.8em;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.search-wrapper {
  position: relative;
}
</style>
