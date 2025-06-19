<script setup>
//import UpgradeToPro from '@/components/UpgradeToPro.vue';
import LoadingComponent from './components/LoadingComponent.vue';
</script>

<template>
  <VApp>
    <RouterView />
    <LoadingComponent></LoadingComponent>
  </VApp>
</template>
