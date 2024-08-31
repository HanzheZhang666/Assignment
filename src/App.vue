<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import PlainLayout from '@/layouts/PlainLayout.vue'

const route = useRoute()

// Compute layout based on route metadata
const layout = computed(() => {
  return route.meta.layout === 'plain' ? PlainLayout : MainLayout
})
</script>

<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<style></style>
