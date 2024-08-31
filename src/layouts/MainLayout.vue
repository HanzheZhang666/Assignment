<script setup>
import MainHeader from '@/components/MainHeader.vue'
import Footer from '@/components/Footer.vue'
</script>
<template>
  <MainHeader />

  <main>
    <router-view></router-view>
  </main>

  <Footer></Footer>
</template>

<style></style>
