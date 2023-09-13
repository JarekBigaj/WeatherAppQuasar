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
        v-for="(city,index) in searchingCities"
        :key="city.key"
        @click="selectCity(city)"
        :class="{ 'selected-city': index === selectedCityIndex }"
      >
        <q-item-section>{{ city.name }} - {{ city.country }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { cityProps } from './models';

const URL_API_GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search?name=';

const emits = defineEmits(['citySelected']);

const searchInput = ref('');
const searchingCities = ref([] as cityProps[]);
const selectedCityIndex = ref(0);

const fetchCities = async (input: string) => {
  try {
    const response = await getCity(input);
    const { results } = response;
    searchingCities.value = processCityResults(results);
  } catch (err) {
    console.error(err);
  }
};

const getCity = async (input: string) => {
  const response = await fetch(`${URL_API_GEOCODING}${input}`);
  const json = await response.json();
  return json;
};

const processCityResults = (results: cityProps[]) => {
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
};

const handleSearchInput = (event: Event) => {
  searchInput.value = (event.target as HTMLInputElement).value;
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && searchingCities.value.length > 0) {
    selectCity(searchingCities.value[selectedCityIndex.value < 0 ? 0 : selectedCityIndex.value]);
  }
  if (event.key === 'ArrowDown') {
    if (selectedCityIndex.value < searchingCities.value.length - 1) {
      selectedCityIndex.value++;
    }
  }
  if (event.key === 'ArrowUp') {
    if (selectedCityIndex.value > 0) {
      selectedCityIndex.value--;
    }
  }
};

const selectCity = (city: cityProps) => {
  // emit('citySelected', city);
  emits('citySelected',city);
  searchInput.value = '';
  selectedCityIndex.value = 0;
};

watch(searchInput, fetchCities);

onMounted(() => {
  const inputElement = document.querySelector('input');
  if (inputElement) {
    inputElement.addEventListener('keyup', handleKeyPress);
  }
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
.selected-city {
  background-color: #e6f7ff;
}
</style>
