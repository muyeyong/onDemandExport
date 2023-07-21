import MyOther from './my-other.vue'
import type { App } from 'vue'

MyOther.install = function (app: App) {
  app.component(MyOther.name, MyOther)
}

export default MyOther

export {
  MyOther 
}