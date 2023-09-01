<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      grid
      title="Weather"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-header
    >
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { cityProps } from './models';
import { QTableColumn } from 'quasar';

interface Rows {
  name: string;
  temperature: string;
}

export default defineComponent({
  name: 'WeatherForSeveralDays',
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
  setup(props) {
    const currentCityName = ref(props.currentCity.name);
    const columns = ref<Array<QTableColumn>>([
      {
        name: 'desc',
        required: true,
        label: currentCityName.value,
        align: 'left',
        field: (row: Rows) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'temperature',
        align: 'center',
        label: 'Temperature',
        field: 'temperature',
        sortable: true,
      },
    ]);

    const rows = ref([
      {
        name: 'Temperature',
        temperature: '29',
      },
    ]);

    return {
      columns,
      rows,
    };
  },
});
</script>
