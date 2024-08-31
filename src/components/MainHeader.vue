<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const isLoggedIn = computed(() => !!userStore.user)

const isActive = (path) => {
  return route.path === path
}

const goToLogin = () => {
  router.push('/login')
}

const goToSignUp = () => {
  router.push('/register')
}

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <a
        href="/"
        class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
      >
        <img src="../assets/images/logo.png" style="height: 50px;">
      </a>

      <ul class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" :class="['nav-link px-2', { active: isActive('/') }]">Home</a></li>
        <li>
          <a href="/consult" :class="['nav-link px-2', { active: isActive('/consult') }]"
            >Consult</a
          >
        </li>
        <li>
          <a href="/resources" :class="['nav-link px-2', { active: isActive('/resources') }]"
            >Resources</a
          >
        </li>
        <li>
          <a href="/community" :class="['nav-link px-2', { active: isActive('/community') }]"
            >Community</a
          >
        </li>
        <li>
          <a href="/profile" :class="['nav-link px-2', { active: isActive('/profile') }]"
            >Profile</a
          >
        </li>
        <li>
          <a href="/about" :class="['nav-link px-2', { active: isActive('/about') }]">About</a>
        </li>
        <li>
          <a href="/help" :class="['nav-link px-2', { active: isActive('/help') }]"
            >Help & Support</a
          >
        </li>
      </ul>

      <div class="col-md-3 text-end">
        <button
          v-if="!isLoggedIn"
          type="button"
          class="btn btn-outline-primary me-2"
          @click="goToLogin"
        >
          Login
        </button>
        <button v-if="!isLoggedIn" type="button" class="btn btn-primary" @click="goToSignUp">
          Sign-up
        </button>
        <button v-if="isLoggedIn" type="button" class="btn btn-danger" @click="logout">
          Logout
        </button>
      </div>
    </header>
  </div>
</template>

<style scoped>
.nav-link.active {
  color: #0d6efd;
  background-color: #e9ecef;
}
</style>
