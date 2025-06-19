<script setup>
import { getAll } from '@/services/dashboardsService'
import dashboardImage from '@images/cards/dashboard.jpg'
import dashboardCreate from '@images/cards/dashboardsCreate.jpg'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CardInfoClient from './components/CardInfoClient.vue'

const router = useRouter();
const dashboards = ref([]);

const newDashboard = () => {
  router.push({ name: 'dashboard.create' });
}

const getDashboards = async () => {
  try {
    const { data } = await getAll();
    dashboards.value = data;
  } catch (error) {
    console.log(error);
    Swal.fire(
      'Ups',
      "ha ocurrido un error al procesar la solicitud",
      'error'
    )
  }

}

const showDashboard = (id) => {
  router.push({
    name: 'dashboard.edit',
    params: { 'id': id }
  })
}

onMounted(() => {
  getDashboards();
})
</script>

<template>

  <CardInfoClient></CardInfoClient>
  <VRow class="mt-3">
    <VCol cols="12" sm="6" md="4">   
      <VCard title="Dashboard Registradas">
        <VImg :src="dashboardImage" cover />
        <VCardText v-if="!dashboards.length">
          <v-alert text="Sin datos" title="" color="info" icon="$info" variant="tonal"></v-alert>
        </VCardText>
        <VCardText v-else>
          <VList class="card-list">
            <VListItem v-for="(item, index) in dashboards" :key="index">
              <template #prepend>
                <h3 class="text-black">{{ item.name }}</h3>
              </template>
              <template #append>
                <VBtn size="large" variant="plain" color="primary" @click="showDashboard(item.id)">
                  <VIcon icon="bx bx-edit"></VIcon> Editar
                </VBtn>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" sm="6" md="4">
      <VCard>
        <VImg :src="dashboardCreate" />
        <VCardText class="position-relative">
          <div class="d-flex justify-center flex-wrap pt-2">

            <VBtn @click="newDashboard">
              <VIcon icon="bx bx-plus"></VIcon>
              Crear Dashboard
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
