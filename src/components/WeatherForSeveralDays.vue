<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row justify-center">
      <q-card flat bordered v-for="(time, index) in dailyWeather.time" :key="index" style="width: 17em;">
        <q-card-section>
          <div class="text-caption text-center"><label class="text-h5">{{ time }}</label></div>
          <q-separator />
          <div class="text-caption">{{ dailyWeather.weatherCode[index] }}</div>
          <div class="text-caption">Temperature Max : {{ dailyWeather.temperatureMax[index] }}</div>
          <div class="text-caption">Temperature Min :{{ dailyWeather.temperatureMin[index] }}</div>
          <div class="text-caption">{{ dailyWeather.windDirection[index] }}</div>
          <div class="text-caption">{{ dailyWeather.windSpeed[index] }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { cityProps } from './models';

const dailyWeather = ref({
  time: [] as string[],
  weatherCode: [] as string[],
  temperatureMax: [] as number[],
  temperatureMin: [] as number[],
  windSpeed: [] as number[],
  windDirection: [] as string[],
});

const fetchWeatherForSeveralDays = async (city: cityProps, numberOfDays: number) => {
  try {
    const response = await getWeatherForSeveralDays(city, numberOfDays);
    const { daily } = response;
    dailyWeather.value = {
      time: daily.time,
      weatherCode: daily.weathercode,
      temperatureMax: daily.temperature_2m_max,
      temperatureMin: daily.temperature_2m_min,
      windSpeed: daily.windspeed_10m_max,
      windDirection: daily.winddirection_10m_dominant,
    };
  } catch (err) {
    console.error(err);
  }
};

const getWeatherForSeveralDays = async (city: cityProps, numberOfDays: number) => {
  const { latitude, longitude } = city;
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=GMT&forecast_days=${numberOfDays}`
  );
  const json = await response.json();
  return json;
};

const props = defineProps({
  currentCity: {
    type: Object as () => cityProps,
    default: () => ({
      key: 'Warsaw52.23',
      name: 'Warsaw',
      country: 'Poland',
      longitude: 21.01,
      latitude: 52.23,
    }),
  },
  days: {
    type: Number,
    default: 3,
  },
});

onMounted(() => {
  fetchWeatherForSeveralDays(props.currentCity, props.days);
});

watch(() => props.currentCity, (newCity, oldCity) => {
  if (newCity !== oldCity) {
    fetchWeatherForSeveralDays(newCity, props.days);
  }
});
</script>
