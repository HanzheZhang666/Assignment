// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

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

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
// use toast service
app.use(ToastService)

// register toast component
app.component('Toast', Toast)

app.mount('#app')
