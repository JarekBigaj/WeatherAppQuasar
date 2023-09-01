<template>
  <div class="justify-center items-stretch row">
    <div class="row q-gutter-md self-center" align="justify">
      <div class="text-h3 q-mt-sm q-mb-xs self-center q-mr-xl">
        {{ currentWeather.temperature }} ℃
      </div>
      <div class="row">
        <div class="col">
          <div class="wind-direction">
            <p className="sr-only">{{ currentWeather.winddirection }}</p>
            <span
              className="wind-arrow"
              :style="{
                '--wind-direction': currentWeather.winddirection + 'deg',
              }"
            ></span>
          </div>
        </div>
        <div class="self-center text-h5 q-ml-md">
          {{ currentWeather.windspeed }} km/h
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { cityProps } from './models';

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
      type: Object as () => cityProps,
      default: () => ({
        key: 'Warsaw52.23',
        name: 'Warsaw',
        country: 'Poland',
        longitude: 21.01,
        latitude: 52.23,
      }),
    },
  },
  watch: {
    currentCity(newCity, oldCity) {
      if (newCity !== oldCity) {
        this.fetchWeatherForCity(newCity);
        console.log({ newCity });
        console.log({ oldCity });
      }
    },
  },
  mounted() {
    this.fetchWeatherForCity(this.currentCity);
  },
  methods: {
    async fetchWeatherForCity(city: cityProps) {
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
        console.log(this.currentWeather.winddirection);
      } catch (err) {
        console.error(err);
      }
    },
    async getWeather(city: cityProps) {
      const { latitude, longitude } = city;
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const json = response.json();
      return json;
    },
  },
});
</script>

<style lang="scss">
.wind-direction {
  --size: 6rem;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: blue;
  display: grid;
  place-items: center;
}

.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.wind-arrow {
  --size: 1rem;
  --wind-direction: 0deg;
  height: calc(var(--size) * 3);
  width: var(--size);
  background-color: white;
  clip-path: polygon(50% 0, 0% 100%, 100% 100%);
  transform: translateY(-50%) rotate(var(--wind-direction));
  transform-origin: bottom center;
  transition: transform 500ms ease;
}
</style>
