<template>
  <div v-if="showLoadingOverlay" class="loading-overlay">->
      <span class="loader">
      </span>
  </div>
</template>
<script setup>
import { useAppStore } from "@/store";
import { computed } from "vue";
const appStore = useAppStore();
const showLoadingOverlay = computed(() => {
  return appStore.loadingOverlay
});
</script>
<style>
.loader {
  width: 70px;
  height: 70px;
  border: 3px dotted #FFF;
  border-style: solid solid dotted dotted;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px dotted #696CFF;
  border-style: solid solid dotted;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: rotationBack 1s linear infinite;
  transform-origin: center center;
}

@keyframes rotation {
  0% {
      transform: rotate(0deg);
  }

  100% {
      transform: rotate(360deg);
  }
}

@keyframes rotationBack {
  0% {
      transform: rotate(0deg);
  }

  100% {
      transform: rotate(-360deg);
  }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>
