<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('user') // Default to user role
const userStore = useUserStore()
const toast = useToast()
const router = useRouter()

const useFirebaseAuth = ref(false)
const auth = getAuth()

const errors = ref({
  username: null,
  email: null,
  password: null,
  confirmPassword: null
})

const handleRegister = () => {
  if (useFirebaseAuth.value) {
    console.log('Register with Firebase email')
    if (errors.value.email || errors.value.password || errors.value.confirmPassword) {
      return
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        // Use the register function from userStore to register the user with additional attributes
        userStore
          .register(email.value, password.value, role.value)
          .then((result) => {
            if (result.success) {
              toast.add({
                severity: 'success',
                summary: 'Firebase Register successful!',
                life: 3000
              })
              router.push({ name: 'login' })
            } else {
              toast.add({
                severity: 'error',
                summary: result.message || 'Registration failed',
                life: 3000
              })
            }
          })
          .catch((error) => {
            toast.add({ severity: 'error', summary: error.message, life: 3000 })
          })
      })
      .catch((error) => {
        toast.add({ severity: 'error', summary: error.message, life: 3000 })
      })
  } else {
    if (errors.value.username || errors.value.password || errors.value.confirmPassword) {
      return
    }

    // Use the register function from userStore to register the user for local authentication without Firebase
    userStore
      .register(username.value, password.value, role.value)
      .then((result) => {
        if (result.success) {
          toast.add({ severity: 'success', summary: result.message, life: 3000 })
          router.push({ name: 'login' })
        } else {
          toast.add({
            severity: 'error',
            summary: result.message || 'Registration failed',
            life: 3000
          })
        }
      })
      .catch((error) => {
        toast.add({ severity: 'error', summary: error.message, life: 3000 })
      })
  }
}

const validateName = (blur) => {
  if (username.value.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    if (blur) errors.value.email = 'Please enter a valid email address'
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  if (password.value.length < 6) {
    if (blur) errors.value.password = 'Password must be at least 6 character and numbers'
  } else {
    const containsCharacter = /[a-zA-Z]/.test(password.value)
    const containsNumber = /\d/.test(password.value)
    if (!containsCharacter || !containsNumber) {
      if (blur) errors.value.password = 'Password must contain at least one letter and one number'
    } else {
      errors.value.password = null
    }
  }
}

const validateConfirmPassword = (blur) => {
  if (password.value !== confirmPassword.value) {
    if (blur) errors.value.confirmPassword = 'Password does not match'
  } else {
    errors.value.confirmPassword = null
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <h2 class="mb-4 text-center">Registration Form</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <input type="checkbox" id="useFirebaseAuth" v-model="useFirebaseAuth" />
            <label for="useFirebaseAuth">Register with Firebase</label>
          </div>

          <div v-if="useFirebaseAuth" class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              @blur="() => validateEmail(true)"
              @input="() => validateEmail(false)"
              required
            />
            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
          </div>

          <div v-else class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
              required
            />
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
              required
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="confirmPassword"
              @blur="() => validateConfirmPassword(true)"
              @input="() => validateConfirmPassword(false)"
              required
            />
            <div v-if="errors.confirmPassword" class="text-danger">
              {{ errors.confirmPassword }}
            </div>
          </div>
          <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="roleUser"
                  value="user"
                  v-model="role"
                />
                <label class="form-check-label" for="roleUser">User</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="roleAdmin"
                  value="admin"
                  v-model="role"
                />
                <label class="form-check-label" for="roleAdmin">Admin</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="roleConsultant"
                  value="consultant"
                  v-model="role"
                />
                <label class="form-check-label" for="roleConsultant">Consultant</label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>
        <div class="mt-3 text-center">
          <span>Already have an account? </span>
          <router-link to="/login" class="text-decoration-none"> Login </router-link>
        </div>
        <Toast></Toast>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
