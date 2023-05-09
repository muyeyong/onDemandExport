import MyInputVue from './my-input.vue'
import type { App } from 'vue'

MyInputVue.install = function (app: App) {
  app.component(MyInputVue.name, MyInputVue)
}

export default MyInputVue