<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const username = ref('')
const password = ref('')
const email = ref('')
const useFirebaseAuth = ref(false)
const userStore = useUserStore()
const toast = useToast()
const router = useRouter()
const auth = getAuth()

onMounted(() => {})

const handleLogin = () => {
  if (useFirebaseAuth.value) {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        // After firebase auth login, also check firestore login to get user info
        userStore
          .login(email.value, password.value)
          .then((response) => {
            if (response.success) {
              toast.add({ severity: 'success', summary: 'Login Successful', life: 3000 })

              // Redirect based on role
              switch (userStore.user.role) {
                case 'admin':
                  // Redirect to admin dashboard
                  router.push({ name: 'dashboard' })
                  break
                case 'consultant':
                  // Redirect to consultant page
                  router.push({ name: 'consult' })
                  break
                case 'user':
                  // Redirect to user page
                  router.push({ name: 'home' })
                  break
              }
            } else {
              toast.add({
                severity: 'error',
                summary: 'Login Failed',
                detail: 'Invalid credentials',
                life: 3000
              })
            }
          })
          .catch((error) => {
            console.error('Error during login:', error)
            toast.add({
              severity: 'error',
              summary: 'Login Failed',
              detail: 'An error occurred while trying to log in',
              life: 3000
            })
          })
      })
      .catch((error) => {
        toast.add({
          severity: 'error',
          summary: 'Firebase Login Failed',
          detail: error.message,
          life: 3000
        })
      })
  } else {
    userStore
      .login(username.value, password.value)
      .then((response) => {
        if (response.success) {
          toast.add({ severity: 'success', summary: 'Login Successful', life: 3000 })

          // Redirect based on role
          switch (userStore.user.role) {
            case 'admin':
              // Redirect to admin dashboard
              router.push({ name: 'dashboard' })
              break
            case 'consultant':
              // Redirect to consultant page
              router.push({ name: 'consult' })
              break
            case 'user':
              // Redirect to user page
              router.push({ name: 'home' })
              break
          }
        } else {
          toast.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid credentials',
            life: 3000
          })
        }
      })
      .catch((error) => {
        console.error('Error during login:', error)
        toast.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'An error occurred while trying to log in',
          life: 3000
        })
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
          <!-- Checkbox to switch between local and Firebase login -->
          <div class="form-check mb-3">
            <input
              class="form-check-input"
              type="checkbox"
              id="useFirebaseAuth"
              v-model="useFirebaseAuth"
            />
            <label class="form-check-label" for="useFirebaseAuth">
              Use Firebase Authentication
            </label>
          </div>

          <!-- Local login fields -->
          <div v-if="!useFirebaseAuth">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="username" required />
            </div>
          </div>

          <!-- Firebase login fields -->
          <div v-if="useFirebaseAuth">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="email" required />
            </div>
          </div>

          <!-- <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" required />
          </div> -->
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
