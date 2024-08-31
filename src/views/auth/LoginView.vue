<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'


const username = ref('')
const password = ref('')
const userStore = useUserStore()
const toast = useToast()
const router = useRouter()

const handleLogin = () => {
  if (userStore.login(username.value, password.value)) {
    toast.add({ severity: 'success', summary: 'Login Successful', life: 3000 })
    router.push({ name: 'home' })
    // Redirect based on role
    // switch (userStore.role) {
    //   case 'admin':
    //     // Redirect to admin dashboard
    //     break
    //   case 'consultant':
    //     // Redirect to consultant page
    //     break
    //   case 'user':
    //     // Redirect to user page
    //     break
    // }
  } else {
    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: 'Invalid credentials',
      life: 3000
    })
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <h2 class="mb-4 text-center">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <div class="mt-3 text-center">
          <span>Don't have an account? </span>
          <router-link to="/register" class="text-decoration-none"> Register here </router-link>
        </div>
        <Toast></Toast>
      </div>
    </div>
  </div>
</template>
