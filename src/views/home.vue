<template>
  <div class="container">

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const toPage = () => {
  router.push({ name: 'Index' });
};
</script>

<style lang="scss" scoped>

</style>
