import fs from "fs";
import { resolve } from "path";
import { pkgPath } from "../utils/paths";

const stayFile = ['package.json', 'README.md'];

const delPath = async (path: string) => {
  let files: string[] = [];
  
  // 目标存在
  if (fs.existsSync(path)) {
    // 读取目录
    files = fs.readdirSync(path);

    files.forEach(async file => {
      const currentPath = resolve(path, file);

      // 统计当前文件是否目录
      if (fs.statSync(currentPath).isDirectory()) {
        // recurse
        await delPath(currentPath);
      } else {
        // delete file
        if (!stayFile.includes(file)) {
          fs.unlinkSync(currentPath)
        }
      }
    });

    if (path !== `${pkgPath}/hope`) fs.rmdirSync(path);
  }
};


export default delPath;