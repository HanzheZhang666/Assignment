<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'primevue/usetoast'

const userStore = useUserStore()
const toast = useToast()

const user = computed(() => userStore.user)

const newPassword = ref('')
const confirmPassword = ref('')

const errors = ref({
  password: null,
  confirmPassword: null
})

// const updateProfile = () => {
//   userStore.updateProfile({
//     gender: user.value.gender,
//     age: user.value.age,
//     education: user.value.education
//   })
//   toast.add({ severity: 'success', summary: 'Profile updated successfully!', life: 3000 })
// }
const updateProfile = async () => {
  try {
    await userStore.updateProfile({
      gender: user.value.gender,
      age: user.value.age,
      education: user.value.education
    })
    toast.add({ severity: 'success', summary: 'Profile updated successfully!', life: 3000 })
  } catch (error) {
    console.error('Error updating profile:', error)
    toast.add({
      severity: 'error',
      summary: 'Failed to update profile. Please try again.',
      life: 3000
    })
  }
}

// const changeUserPassword = () => {
//   if (errors.value.password || errors.value.confirmPassword) {
//     return
//   }
//   if (newPassword.value) {
//     userStore.changePassword(newPassword.value)
//     toast.add({ severity: 'success', summary: 'Password changed successfully!', life: 3000 })
//     newPassword.value = ''
//     confirmPassword.value = ''
//   } else {
//     toast.add({ severity: 'error', summary: 'Please enter a new password.', life: 3000 })
//   }
// }
const changeUserPassword = async () => {
  if (errors.value.password || errors.value.confirmPassword) {
    return
  }

  if (newPassword.value) {
    try {
      await userStore.changePassword(newPassword.value)
      toast.add({ severity: 'success', summary: 'Password changed successfully!', life: 3000 })
      newPassword.value = ''
      confirmPassword.value = ''
    } catch (error) {
      console.error('Error changing password:', error)
      toast.add({
        severity: 'error',
        summary: 'Failed to change password. Please try again.',
        life: 3000
      })
    }
  } else {
    toast.add({ severity: 'error', summary: 'Please enter a new password.', life: 3000 })
  }
}

const validatePassword = (blur) => {
  if (newPassword.value.length < 6) {
    if (blur) errors.value.password = 'Password must be at least 6 character and numbers'
  } else {
    const containsCharacter = /[a-zA-Z]/.test(newPassword.value)
    const containsNumber = /\d/.test(newPassword.value)
    if (!containsCharacter || !containsNumber) {
      if (blur) errors.value.password = 'Password must contain at least one letter and one number'
    } else {
      errors.value.password = null
    }
  }
}

const validateConfirmPassword = (blur) => {
  if (newPassword.value !== confirmPassword.value) {
    if (blur) errors.value.confirmPassword = 'Password does not match'
  } else {
    errors.value.confirmPassword = null
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2>Profile</h2>
    <form @submit.prevent="updateProfile">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" v-model="user.username" disabled />
      </div>

      <div class="mb-3">
        <label for="role" class="form-label">Role</label>
        <input type="text" class="form-control" id="role" v-model="user.role" disabled />
      </div>

      <div class="mb-3">
        <label for="gender" class="form-label">Gender</label>
        <select class="form-select" v-model="user.gender">
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="age" class="form-label">Age</label>
        <input type="number" class="form-control" id="age" v-model.number="user.age" min="0" />
      </div>

      <div class="mb-3">
        <label for="education" class="form-label">Education</label>
        <input type="text" class="form-control" id="education" v-model="user.education" />
      </div>

      <button type="submit" class="btn btn-primary">Update Profile</button>
    </form>

    <h3 class="mt-5">Change Password</h3>
    <form @submit.prevent="changeUserPassword">
      <div class="mb-3">
        <label for="newPassword" class="form-label">New Password</label>
        <input
          type="password"
          class="form-control"
          id="newPassword"
          @blur="() => validatePassword(true)"
          @input="() => validatePassword(false)"
          v-model="newPassword"
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
          @blur="() => validateConfirmPassword(true)"
          @input="() => validateConfirmPassword(false)"
          v-model="confirmPassword"
          required
        />
        <div v-if="errors.confirmPassword" class="text-danger">
          {{ errors.confirmPassword }}
        </div>
      </div>
      <button type="submit" class="btn btn-danger">Change Password</button>
    </form>
    <Toast></Toast>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
