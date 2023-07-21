import type { ComponentResolver, SideEffectsInfo } from "unplugin-vue-components/types"

const getSideEffects = (compName: string): SideEffectsInfo => {
    const packageName = '@XY/components'
    const styleDir = compName.slice(0,1).toLocaleLowerCase() + compName.slice(1)
    const styleName = compName.replace('My', '').toLocaleLowerCase() + '.css'
    return `${packageName}/hope/style/${styleDir}/${styleName}`
}

export default function MyComponentResolve(): ComponentResolver{
    return {
        type: 'component',
        resolve: (name: string) => {
            if (name.startsWith('My')) {
                const importName = name
                const path = `@XY/components/hope/es/${importName}`
                return {
                    name: importName+'Vue',
                    from: path,
                    sideEffects: getSideEffects(importName)
                }
            }
        }
    }
}