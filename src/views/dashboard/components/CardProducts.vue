<script setup>

const props = defineProps(['dataProducts']);
const dataProducts = computed(() => props.dataProducts);

</script>

<template>
  <VCard title="Productos mas vendidos">
    <VCardText>
      <VList class="card-list">
        <VListItem
        v-for="(item,index) in dataProducts" :key="index"
        >
          <template #prepend>
            <VIcon
              rounded
              variant="tonal"
              :color="item.color"
              :icon="item.icon"
              size="40"
            />
          </template>

          <VListItemSubtitle>
            <span class="text-primary">{{ item.name }}</span>
          </VListItemSubtitle>
        
          <template #append>
            <VListItemAction>
              <span class="me-2 text-success">{{ item.total }}</span>
              <span class="text-disabled">Unds</span>
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </Vcard>
</template>
