import MyButton from './component/myButton'
import MyInput from './component/myInput'
import type { App } from 'vue'


const components = [MyButton, MyInput]

const install = (app: App) => {
    components.forEach((component: any) => {
        app.component(component.name, component)
      })
}

export default {
    install,
    MyButton,
    MyInput
}
export {
    install,
    MyButton,
    MyInput
}