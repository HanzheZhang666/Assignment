// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null // Stores the entire user object
  }),
  actions: {
    login(username, password) {
      const users = JSON.parse(localStorage.getItem('users')) || []
      const user = users.find((u) => u.username === username && u.password === password)

      if (user) {
        this.user = user
        return true
      } else {
        return false
      }
    },
    logout() {
      this.user = null
    },
    register(username, password, role, gender = '', age = null, education = '') {
      const users = JSON.parse(localStorage.getItem('users')) || []

      // Check if the username already exists
      const existingUser = users.find((u) => u.username === username)

      if (existingUser) {
        return { success: false, message: 'Username already exists' }
      }

      // Add new user if not exists
      const newUser = { username, password, role, gender, age, education }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      return { success: true, message: 'Registration successful' }
    },
    updateProfile(updatedProfile) {
      const users = JSON.parse(localStorage.getItem('users')) || []
      const userIndex = users.findIndex((u) => u.username === this.user.username)

      if (userIndex !== -1) {
        // Update the user object in local storage and state
        users[userIndex] = { ...users[userIndex], ...updatedProfile }
        localStorage.setItem('users', JSON.stringify(users))

        // Update the store with the updated user object
        this.user = users[userIndex]
      }
    },
    changePassword(newPassword) {
      const users = JSON.parse(localStorage.getItem('users')) || []
      const userIndex = users.findIndex((u) => u.username === this.user.username)

      if (userIndex !== -1) {
        // Update the password in local storage and state
        users[userIndex].password = newPassword
        localStorage.setItem('users', JSON.stringify(users))

        // Update the store with the updated user object
        this.user = users[userIndex]
      }
    }
  }
})
