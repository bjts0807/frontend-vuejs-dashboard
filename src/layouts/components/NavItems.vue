<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';
import { useDashboardStore } from '@/store';
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
import { onMounted } from 'vue';


const dashboardStore = useDashboardStore();
onMounted(() => {
  dashboardStore.getDashboardsClient();
});

</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      badgeContent: dashboardStore.dashboards.length,
      badgeClass: 'bg-error',
      icon: 'bx-home-smile',
    }"
  >
    <VerticalNavLink v-for="dashboard in dashboardStore.dashboards" :key="dashboard.id"
      :item="{
        title: dashboard.name,
        to: `/dashboard/show/${dashboard.id}`,
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Configuraciones',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Mi panel',
      icon: 'bx-cog',
      to: '/dashboard/configurations',
    }"
  />
</template>
