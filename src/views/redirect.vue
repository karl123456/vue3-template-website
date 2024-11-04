<template>
  <div>...</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const { query } = route;

const router = useRouter();
const path = query.path as string;
if (path) {
  router.replace({
    path,
  });
}
</script>

<style scoped lang="scss"></style>
