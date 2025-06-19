<template>
  <VCard>
    <VCardText class="pb-0">
      <div>
        <canvas ref="chartCanvas" style="width: 200%; height: 300px;"></canvas>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup>
import {
  Chart,
  registerables
} from 'chart.js';
import { nextTick, onMounted, ref, watch } from 'vue';
const props = defineProps(['dataTotalSales']);
const dataTotalSales = computed(() => props.dataTotalSales);

Chart.register(...registerables)

const chartCanvas = ref(null)
let chartInstance = null

const generateGraph = () => {

  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = dataTotalSales.value.labels;
  const data = dataTotalSales.value.totals;

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Ventas',
          data: data,
          backgroundColor: '#42A5F5',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Gráfico de Ventas',
        },
      },
    },
  })
}

onMounted(() => {
  if (chartCanvas.value) {
    generateGraph();
  }
})

watch(
  dataTotalSales,
  async (newValue) => {
    if (newValue && newValue.labels?.length) {
      await nextTick();
      if (chartCanvas.value) {
        generateGraph();
      }
    }
  },
  { immediate: true }
);
</script>
