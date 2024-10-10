// stores/user.js
import { defineStore } from 'pinia'
import axios from 'axios'

const CLOUD_FUNCTION_URL = 'https://us-central1-week7-hanzhe.cloudfunctions.net'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null // Stores the entire user object
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${CLOUD_FUNCTION_URL}/login`, { username, password })

        if (response.data.success) {
          this.user = response.data.user
          return { success: true, message: 'Login successful' }
        } else {
          return { success: false, message: 'Invalid username or password' }
        }
      } catch (error) {
        console.error('Error during login:', error)
        return { success: false, message: 'Error during login' }
      }
    },
    // login(username, password) {
    //   const users = JSON.parse(localStorage.getItem('users')) || []
    //   const user = users.find((u) => u.username === username && u.password === password)

    //   if (user) {
    //     this.user = user
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    logout() {
      this.user = null
    },

    async register(username, password, role, gender = '', age = null, education = '') {
      try {
        const response = await axios.post(`${CLOUD_FUNCTION_URL}/addUser`, {
          username,
          password,
          role,
          gender,
          age,
          education
        })

        if (response.status === 200) {
          return { success: true, message: 'Registration successful' }
        } else {
          return { success: false, message: 'Error during registration' }
        }
      } catch (error) {
        console.error('Error during registration:', error)
        return { success: false, message: 'Registration failed' }
      }
    },
    // register(username, password, role, gender = '', age = null, education = '') {
    //   const users = JSON.parse(localStorage.getItem('users')) || []

    //   // Check if the username already exists
    //   const existingUser = users.find((u) => u.username === username)

    //   if (existingUser) {
    //     return { success: false, message: 'Username already exists' }
    //   }

    //   // Add new user if not exists
    //   const newUser = { username, password, role, gender, age, education }
    //   users.push(newUser)
    //   localStorage.setItem('users', JSON.stringify(users))

    //   return { success: true, message: 'Registration successful' }
    // },
    async updateProfile(updatedProfile) {
      try {
        const response = await axios.post(
          'https://us-central1-week7-hanzhe.cloudfunctions.net/updateUserProfile',
          {
            username: this.user.username,
            updatedProfile
          }
        )

        if (response.status === 200) {
          // Update the store with the updated user object
          this.user = { ...this.user, ...updatedProfile }
          console.log('User profile updated successfully')
        } else {
          console.error('Failed to update user profile')
        }
      } catch (error) {
        console.error('Error updating user profile:', error)
      }
    },
    // updateProfile(updatedProfile) {
    //   const users = JSON.parse(localStorage.getItem('users')) || []
    //   const userIndex = users.findIndex((u) => u.username === this.user.username)

    //   if (userIndex !== -1) {
    //     // Update the user object in local storage and state
    //     users[userIndex] = { ...users[userIndex], ...updatedProfile }
    //     localStorage.setItem('users', JSON.stringify(users))

    //     // Update the store with the updated user object
    //     this.user = users[userIndex]
    //   }
    // },
    async changePassword(newPassword) {
      try {
        const response = await axios.post(
          'https://us-central1-week7-hanzhe.cloudfunctions.net/changeUserPassword',
          {
            username: this.user.username,
            newPassword
          }
        )

        if (response.status === 200) {
          // Update the store with the updated user password
          this.user.password = newPassword
          console.log('Password changed successfully')
        } else {
          console.error('Failed to change password')
        }
      } catch (error) {
        console.error('Error changing password:', error)
      }
    }
    // changePassword(newPassword) {
    //   const users = JSON.parse(localStorage.getItem('users')) || []
    //   const userIndex = users.findIndex((u) => u.username === this.user.username)

    //   if (userIndex !== -1) {
    //     // Update the password in local storage and state
    //     users[userIndex].password = newPassword
    //     localStorage.setItem('users', JSON.stringify(users))

    //     // Update the store with the updated user object
    //     this.user = users[userIndex]
    //   }
    // }
  }
})
