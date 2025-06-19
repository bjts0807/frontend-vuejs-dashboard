<script setup>
import { show } from '@/services/dashboardsService';
import { getDataInfoSale, getDataProducts, getDataSales } from '@/services/dataClientsService';
import { useAppStore } from '@/store';
import Swal from 'sweetalert2';
import { onMounted, ref, watch } from 'vue';
import { GridItem, GridLayout } from "vue-grid-layout-v3";
import CardInfoSale from './components/CardInfoSale.vue';
import CardProducts from './components/CardProducts.vue';
import CradGraphSaleTotal from './components/CradGraphSaleTotal.vue';

const dataInfoSale = ref({});
const dataProducts = ref([]);
const dataTotalSales = ref([]);

const appStore = useAppStore();
const route = useRoute();

const name = ref('');
const id = ref('');

const getInfoSale = async () => {
  const { data } = await getDataInfoSale();
  dataInfoSale.value = data;
}

const getListProducts = async () => {
  const { data } = await getDataProducts();
  dataProducts.value = data;
}

const getSales = async () => {
  const { data } = await getDataSales();
  dataTotalSales.value = data;
}

const layout = ref([]);

const getComponent = (id) => {
  switch (id) {
    case 'info':
      return CardInfoSale;
    case 'products':
      return CardProducts;
    case 'totalSalesGraph':
      return CradGraphSaleTotal;
    default:
      return null;
  }
};

const showDashboard = async () => {
  try {
    appStore.showLoadingOverlay();

    const { data } = await show(id.value);
    name.value = data.name;
    layout.value = data.data;

    appStore.hideLoadingOverlay();
  } catch (error) {
    console.log(error);
    Swal.fire(
      'Ups',
      'Ha ocurrido un error al procesar la solicitud',
      'error'
    )
    appStore.hideLoadingOverlay();
  }
}

watch(
  () => route.params.id,
  newId => {
    id.value = newId
    showDashboard()
  }
)

onMounted(async () => {
  id.value = route.params.id;
  await getInfoSale();
  await getListProducts();
  await getSales();
  await showDashboard();
});
</script>
<template>
  <main>
    <h3>{{ name }}</h3>
    <VCol class="p-4">
      <GridLayout v-model:layout="layout" :col-num="12" :row-height="90" :is-draggable="false" :is-resizable="false"
        :vertical-compact="true" :use-css-transforms="false" :margin="[10, 10]">
        <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
          <div style="height: 100%">
            <component :is="getComponent(item.i)" :data-info-sale="dataInfoSale" :data-products="dataProducts"
              :data-total-sales="dataTotalSales" />
          </div>
        </GridItem>
      </GridLayout>
    </VCol>
  </main>
</template>
