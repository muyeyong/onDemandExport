import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//TODO 为什么浏览器报错  not provide an export named 'default' https://stackoverflow.com/questions/71022803/the-requested-module-does-not-provide-an-export-named-default-error-but
import MyComponents from '@XY/components'
// import 'on-demandexport-components/lib/style.css'

console.log('233')



import './assets/main.css'

const app = createApp(App)

app.use(router)

app.use(MyComponents)

app.mount('#app')
