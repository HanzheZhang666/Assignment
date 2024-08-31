<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const isLoggedIn = computed(() => !!userStore.user)

const isActive = (path) => {
  return route.path.includes(path)
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
  <!-- header source https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <a
        href="/"
        class="d-flex align-items-center col-md-auto mb-2 mb-md-0 text-dark text-decoration-none"
      >
        <!-- logo image source https://elderwelladultday.com/ -->
        <img src="../assets/images/logo.png" style="height: 50px" />
      </a>

      <ul class="nav nav-pills col-12 col-md-8 mb-2 justify-content-center mb-md-0">
        <li>
          <router-link to="/" :class="['nav-link px-2', { active: isActive('home') }]">
            Home
          </router-link>
        </li>
        <!-- Resources -->
        <li class="nav-item dropdown">
          <a
            :class="['nav-link dropdown-toggle px-2 ', { active: isActive('resources') }]"
            href="#"
            id="resourcesDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Resources
          </a>
          <ul class="dropdown-menu" aria-labelledby="resourcesDropdown">
            <li>
              <router-link class="dropdown-item" to="/resources/articles">Articles</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/resources/lectures"
                >Online Lectures</router-link
              >
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/community" :class="['nav-link px-2', { active: isActive('community') }]">
            Community
          </router-link>
        </li>
        <li>
          <router-link to="/consult" :class="['nav-link px-2', { active: isActive('consult') }]">
            Consult
          </router-link>
        </li>
        <li>
          <router-link to="#" :class="['nav-link px-2', { active: isActive('profile') }]">
            Profile
          </router-link>
        </li>
        <!-- About -->
        <li class="nav-item dropdown">
          <a
            :class="['nav-link dropdown-toggle px-2 ', { active: isActive('about') }]"
            href="#"
            id="aboutDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            About
          </a>
          <ul class="dropdown-menu" aria-labelledby="aboutDropdown">
            <li>
              <router-link class="dropdown-item" to="/about/team-introduction"
                >Team Introduction</router-link
              >
            </li>
            <li>
              <router-link class="dropdown-item" to="/about/private-policy"
                >Private Policy</router-link
              >
            </li>
          </ul>
        </li>
        <!-- Help & Support -->
        <li class="nav-item dropdown">
          <a
            :class="['nav-link dropdown-toggle px-2 ', { active: isActive('help') }]"
            href="#"
            id="helpDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Help & Support
          </a>
          <ul class="dropdown-menu" aria-labelledby="helpDropdown">
            <li>
              <router-link class="dropdown-item" to="/help/userguide"
                >User Guide</router-link
              >
            </li>
            <li>
              <router-link class="dropdown-item" to="/help/contactus">Contact us</router-link>
            </li>
          </ul>
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
