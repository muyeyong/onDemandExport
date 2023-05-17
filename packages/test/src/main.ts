import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//TODO 为什么浏览器报错  not provide an export named 'default' https://stackoverflow.com/questions/71022803/the-requested-module-does-not-provide-an-export-named-default-error-but


// import MyComponents from '@XY/components'
// import '@XY/components/hope/h/lib/style.css'

// import { MyButton } from '@XY/components'
// import '@XY/components/hope/style/myButton/button.css'

import './assets/main.css'

const app = createApp(App)

app.use(router)

// app.use(MyButton)

app.mount('#app')
