<script setup>
const props = defineProps(['dataInfoSale']);
const dataInfoSale = computed(() => props.dataInfoSale);
</script>

<template>
  
  <VCard color="white">
    <VCardText class="d-flex align-center pb-4">
      <VIcon size="x-large" icon="bx bx-wallet" color="success" />
      <VSpacer />
    </VCardText>

    <VCardText>
      <p class="mb-1">
        {{ dataInfoSale.title }}
      </p>
      <h5 class="text-h5 text-no-wrap mb-3 text-primary">
        {{ dataInfoSale.value }}
      </h5>
      <h5 class="text-h5 text-no-wrap mb-3 text-success">
        {{ dataInfoSale.percentage }}
      </h5>
    </VCardText>
  </VCard>
</template>
