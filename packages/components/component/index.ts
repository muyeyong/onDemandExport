import MyButton from './myButton'
import MyInput from './myInput'
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