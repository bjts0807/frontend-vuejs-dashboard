<script setup>
import { createDashboard } from '@/services/dashboardsService';
import { getDataInfoSale, getDataProducts, getDataSales } from '@/services/dataClientsService';
import { useAppStore, useDashboardStore } from '@/store';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { GridItem, GridLayout } from "vue-grid-layout-v3";
import CardInfoSale from './components/CardInfoSale.vue';
import CardProducts from './components/CardProducts.vue';
import CradGraphSaleTotal from './components/CradGraphSaleTotal.vue';

import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const dataInfoSale = ref({});
const dataProducts = ref([]);
const dataTotalSales = ref([]);

const appStore = useAppStore();
const name = ref('');

const rules = {
    name: { required }
}

const v$ = useVuelidate(rules, { name })


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

const save = async () => {
  try {
    if (!await v$.value.$validate()) {
      return;
    }

    appStore.showLoadingOverlay();
    let data = {
      name: name.value,
      data: layout.value
    }
    await createDashboard(data);
    appStore.hideLoadingOverlay();

    Swal.fire(
      '',
      'Datos Guardados',
      'success'
    );

    const dashboardStore = useDashboardStore();
    dashboardStore.getDashboardsClient();

    name.value='';

  } catch (e) {
    console.log(e);
    appStore.hideLoadingOverlay();
    Swal.fire(
      'Ups',
      'Error al procesar la solicitud',
      'error'
    );
  }
}

const layout = ref([
  { x: 0, y: 0, w: 4, h: 2.2, i: 'info' },
  { x: 4, y: 0, w: 4, h: 4, i: 'products' },
  { x: 8, y: 0, w: 4, h: 4, i: 'totalSalesGraph' },
]);

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

onMounted(async () => {
  await getInfoSale();
  await getListProducts();
  await getSales();
});
</script>
<template>
  <main>
    <VCard color="white">
      <VCardText class="d-flex align-center pb-2">
        <VCol cols="6" md="3">
          <VTextField v-model="name" :error="v$.name.$error" label="Nombre del Dashboard" placeholder="name" />
        </VCol>
        <VCol cols="12" md="6" class="d-flex gap-2">
          <VBtn type="button" @click="save">
            <VIcon icon="bx bx-save"></VIcon>
            Guardar
          </VBtn>
        </VCol>
      </VCardText>
    </VCard>

    <VCol>
      <GridLayout v-model:layout="layout" :col-num="12" :row-height="90" :is-draggable="true" :is-resizable="true"
        :vertical-compact="true" :use-css-transforms="true" :margin="[10, 10]">
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

<style scoped>
.v-card {
  cursor: move;
  user-select: none;
}
</style>
