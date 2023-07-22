import delPath from "../utils/delpath";
import { pkgPath, componentPath } from "../utils/paths";
import run from "../utils/run";

import { series, src, dest, parallel } from "gulp";
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";

// 删除hope(dist)
export const removeDist = () => {
  return delPath(`${pkgPath}/hope`);
};

// 打包样式
export const buildStyle = () => {
  return src(`${componentPath}/src/**/**/*.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${componentPath}/hope/lib`))
    .pipe(dest(`${componentPath}/hope/h`));
};

// 打包组件
export const buildComponent = async () => {
  run("pnpm run build", componentPath);
};

export default series(
  async () => removeDist(),
  parallel(
    async () => buildComponent(),
    async () => buildStyle()
  )
);
