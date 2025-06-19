<script setup>
import { show, updateDashboard } from '@/services/dashboardsService';
import { getDataInfoSale, getDataProducts, getDataSales } from '@/services/dataClientsService';
import { useAppStore, useDashboardStore } from '@/store';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
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


const save = async () => {
  try {
    if (!await v$.value.$validate()) {
      return;
    }
    appStore.showLoadingOverlay();
    let data = {
      id: id.value,
      name: name.value,
      data: layout.value
    }
    await updateDashboard(id.value, data);
    appStore.hideLoadingOverlay();
    const dashboardStore = useDashboardStore();
    dashboardStore.getDashboardsClient();
    Swal.fire(
      '',
      'Datos Guardados',
      'success'
    );
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
    <VCard color="white" :title="name">
      <VCardText class="d-flex align-center pb-2">
        <VCol cols="6" md="3">
          <VTextField v-model="name" :error="v$.name.$error" label="Nombre del Dashboard" placeholder="name" />
        </VCol>
        <VCol cols="12" md="6" class="d-flex gap-2">
          <VBtn type="button" @click="save">
            <VIcon icon="bx bx-refresh"></VIcon>
            Actualizar
          </VBtn>
        </VCol>
      </VCardText>
    </VCard>
    <VCol class="p-4">
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
