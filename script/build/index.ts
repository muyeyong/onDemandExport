import delPath from "../utils/delpath";
import { pkgPath, componentPath } from "../utils/paths";
import run from "../utils/run";
import fse from 'fs-extra'

import { series, src, dest, parallel } from "gulp";
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";

// 删除hope(dist)
export const removeDist = () => {
  return delPath(`${componentPath}/hope`);
};

// 打包样式
export const buildStyle = () => {
  return src(`${componentPath}/src/**/**/*.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${componentPath}/hope/lib/style`))
    .pipe(dest(`${componentPath}/hope/h/style`))
};

// 打包组件
export const buildComponent = async () => {
  return run("pnpm run build", componentPath);
};

const copyTypes = () => {
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      console.log('1')
      resolve(true)
    }, 2000)
  })
}

const copyStyle = () => {
  return new Promise((resolve, reject) => {
    try {
      fse.copySync(`${componentPath}/hope/lib/style/component`, `${componentPath}/hope/lib/style`)
      fse.removeSync(`${componentPath}/hope/lib/style/component`)
      fse.copySync(`${componentPath}/hope/h/style/component`, `${componentPath}/hope/h/style`)
      fse.removeSync(`${componentPath}/hope/h/style/component`)
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
  async () => copyStyle(),
  // async () => copyTypes(),
  // async () => rename()
);
