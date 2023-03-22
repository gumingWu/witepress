<script setup lang="ts">
import WPHeader from './components/WPHeader.vue'
</script>

<template>
  <div class="witepress-layout">
    <WPHeader />
    <WContent />
  </div>
</template>

<style scoped>
.witepress-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
