// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import primevue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// import toast service and toast component
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

import App from './App.vue'
import router from './router'

// Initialize lecture videos
const initialVideos = [
  {
    id: 1,
    title: 'Mental Health and the Elderly 12 Key Points',
    date: '2024-08-24',
    previewImage: 'https://img.youtube.com/vi/S3T_T15nDBk/hqdefault.jpg',
    videoId: 'S3T_T15nDBk',
    reviews: [
      { user: 'a', rating: 5, comment: 'Excellent lecture!' },
      { user: 'b', rating: 4, comment: 'Good lecture!' }
    ]
  },
  {
    id: 2,
    title: 'Loneliness & Isolation | Aging Matters | NPT Reports',
    date: '2024-08-25',
    previewImage: 'https://img.youtube.com/vi/uDFUqnkm6Ak/hqdefault.jpg',
    videoId: 'uDFUqnkm6Ak',
    reviews: [
      { user: 'a', rating: 5, comment: 'Very helpful!' }
    ]
  },
  {
    id: 3,
    title: 'Mental Health and Psychosocial Support for Seniors',
    date: '2024-08-25',
    previewImage: 'https://img.youtube.com/vi/XaC4WUOSye4/hqdefault.jpg',
    videoId: 'XaC4WUOSye4',
    reviews: [
      { user: 'a', rating: 5, comment: 'Well presented!' },
      { user: 'b', rating: 4, comment: 'Good lecture!' }
    ]
  }
]

localStorage.setItem('videos', JSON.stringify(initialVideos))

// Create vuejs app
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
// use toast service
app.use(ToastService)

// register toast component
app.component('Toast', Toast)

app.mount('#app')
