<template>
  <div class="main-content bg-main-red">
    <div class="index-list">
      <div class="index-item" @click="toPage('GridIndex')" v-tap>
        <div class="index-icon grid"></div>
        <div class="index-text">综合治理“微”网格</div>
      </div>
      <div class="index-item" @click="toPage('ServiceIndex')" v-tap>
        <div class="index-icon service"></div>
        <div class="index-text">与民携手“心”服务</div>
      </div>
      <div class="index-item" @click="toPage('FunctionIndex')" v-tap>
        <div class="index-icon function"></div>
        <div class="index-text">功能辐射“辅”阵地</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toPage = (name: string) => {
  router.push({ name });
};
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.index-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.index-item {
  text-align: center;

  &.pointer-over {
    opacity: 0.85;
  }

  &.pointer-down {
    transform: scale(0.95);
  }
  .index-text {
    font-size: 24px;
  }
}

.index-icon {
  display: block;
  width: 192px;
  height: 192px;
  margin: 0 auto;
  margin-bottom: 30px;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 6px 12px 12px rgba(45, 0, 0, 0.2);
  border-radius: 29px;
  &.grid {
    background-image: url(../assets/icon-grid.png);
  }
  &.service {
    background-image: url(../assets/icon-service.png);
  }
  &.function {
    background-image: url(../assets/icon-function.png);
  }
}
</style>
