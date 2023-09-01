<template>
  <q-page class="">
    <div class="q-pa-md justify-center row">
      <div class="q-gutter-y-md fit content-style">
        <q-card>
          <q-card-section class="q-pt-xs">
            <city-search @citySelected="updateCurrentCity" />
          </q-card-section>

          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ currentCity.name }}
            </div>
          </q-card-section>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="current">
              <current-weather-component :currentCity="currentCity" />
            </q-tab-panel>

            <q-tab-panel name="three_days"> </q-tab-panel>

            <q-tab-panel name="seven_days"> </q-tab-panel>
          </q-tab-panels>

          <q-separator />

          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="current" label="Current" />
            <q-tab name="three_days" label="For 3 Days" />
            <q-tab name="seven_days" label="For 7 Days" />
          </q-tabs>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CurrentWeatherComponent from '../components/CurrentWeatherComponent.vue';
import CitySearch from 'src/components/CitySearch.vue';
import { cityProps } from 'src/components/models';

export default defineComponent({
  name: 'CurrentWeatherPage',
  components: { CurrentWeatherComponent, CitySearch },
  setup() {
    return {
      tab: ref('current'),
    };
  },
  data() {
    return {
      currentCity: {
        key: 'Warsaw52.23',
        name: 'Warsaw',
        country: 'Poland',
        longitude: 21.01,
        latitude: 52.23,
      },
    };
  },
  methods: {
    updateCurrentCity(city: cityProps) {
      this.currentCity = city;
    },
  },
});
</script>

<style lang="scss">
.content-style {
  max-width: 60em;
  min-width: 30em;
}

/* Warunkowe style CSS z użyciem @media */
@media (max-width: 600px) {
  .content-style {
    min-width: initial; /* Usuwa min-width poniżej 600px */
  }
}
</style>
