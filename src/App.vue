<template>
  <RouterView />
  <div class="app-loading" v-show="layout.loading">进度条</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, ref, computed } from 'vue';
import { RouterView } from 'vue-router';

import { useLayoutStore } from '@/stores/layout';

const layout = useLayoutStore();

</script>

<style lang="scss">
.app-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
