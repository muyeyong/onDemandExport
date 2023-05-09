import MyButtonVue from './my-button.vue'
import type { App } from 'vue'

MyButtonVue.install = function (app: App) {
  app.component(MyButtonVue.name, MyButtonVue)
}

export default MyButtonVue