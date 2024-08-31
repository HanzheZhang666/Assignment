import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      role: ''
    }
  },
  actions: {
    login(username, password) {
      const users = JSON.parse(localStorage.getItem('users')) || []
      const user = users.find((u) => u.username === username && u.password === password)

      if (user) {
        this.user = user.username
        this.role = user.role
        return true
      } else {
        return false
      }
    },
    logout() {
      this.user = null
      this.role = ''
    },
    register(username, password, role) {
      const users = JSON.parse(localStorage.getItem('users')) || []

      // Check if the username already exists
      const existingUser = users.find((u) => u.username === username)

      if (existingUser) {
        return { success: false, message: 'Username already exists' }
      }

      // Add new user if not exists
      users.push({ username, password, role })
      localStorage.setItem('users', JSON.stringify(users))

      return { success: true, message: 'Registration successful' }
    }
  }
})
