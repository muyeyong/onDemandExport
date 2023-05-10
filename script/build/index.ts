import delPath from "../utils/delpath";
import { pkgPath, componentPath } from "../utils/paths";
import run from "../utils/run";
import fse from 'fs-extra'
import { join } from 'path'

import { series, src, dest, parallel } from "gulp";
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";

// 删除hope(dist)
export const removeDist = () => {
  return delPath(`${componentPath}/hope`);
};

// 打包样式
export const buildStyle = () => {
  return src(`${componentPath}/component/**/*.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(join(componentPath, 'hope', 'lib', 'style'))) // `${componentPath}/hope/lib/style`)
    .pipe(dest(join(componentPath, 'hope', 'h', 'style'))) // ${componentPath}/hope/h/style
};

// 打包组件
export const buildComponent = async () => {
  return run("pnpm run build", componentPath);
};

const copyTypes = () => {
  return new Promise((resolve, reject) => {
    try {
      fse.copySync(join(componentPath, 'hope', 'lib', 'type', 'component'), join(componentPath, 'hope', 'lib', 'style')) // `${componentPath}/hope/lib/type/component`
      fse.removeSync(join(componentPath, 'hope', 'lib', 'style', 'component'))
      resolve(true)
    } catch (error) {
      reject(error)
    }
   
  })
}

const rename = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fse.pathExists(`${componentPath}/hope/lib/style/component`).then( res => {
        console.log('exist', res)
      })
      resolve(true)
    }, 2000)
    
    
  })
}

export default series(
  async () => removeDist(),
  
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  ),
  // async () => copyStyle(),
  // async () => copyTypes(),
  // async () => rename()
);
