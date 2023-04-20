import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//TODO 为什么浏览器报错  not provide an export named 'default' (a
import MyComponents from 'on-demandexport-components'


import './assets/main.css'

const app = createApp(App)

app.use(router)
// app.use(MyComponents)

app.mount('#app')
