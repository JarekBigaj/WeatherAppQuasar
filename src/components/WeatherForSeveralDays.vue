<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row justify-center">
    <q-card flat bordered v-for="(time,index) in dailyWeather.time" :key="index" style="width: 17em;">
      <q-card-section>
        <div class="text-caption text-center"><label class="text-h5">{{ time }}</label></div>
        <q-separator/>
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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { cityProps } from './models';
import { date } from 'quasar';

export default defineComponent({
  name: 'WeatherForSeveralDays',
  data(){
    return{
      dailyWeather:{
        time:[],
        weatherCode:[],
        temperatureMax:[],
        temperatureMin:[],
        windSpeed:[],
        windDirection:[],
      }
    }
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
        this.fetchWeatherForSeveralDays(newCity,3);
      }
    },
  },
  mounted() {
    this.fetchWeatherForSeveralDays(this.currentCity,3);
  },
  methods: {
    async fetchWeatherForSeveralDays(city:cityProps,numberOfDays:number){
      try{
        const response =await this.getWeatherForSeveralDays(city,numberOfDays);
        const {daily} = response;
        this.dailyWeather = {
          time: daily.time ,
          weatherCode: daily.weathercode,
          temperatureMax: daily.temperature_2m_max,
          temperatureMin: daily.temperature_2m_min,
          windSpeed: daily.windspeed_10m_max,
          windDirection: daily.winddirection_10m_dominant,
        }
        console.log(this.dailyWeather.time)
      }catch(err){
        console.error(err);
      }
    },
    async getWeatherForSeveralDays(city: cityProps,numberOfDays:number) {
      const { latitude, longitude } = city;
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=GMT&forecast_days=3`
      );
      const json = response.json();
      return json;
    },
  }
});
</script>
