import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MyComponent from '../dist/index'
import '../dist/styles.css'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(MyComponent)

app.mount('#app')
