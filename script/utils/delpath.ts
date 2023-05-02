import fs from "fs";
import { resolve } from "path";
import { pkgPath } from "../utils/paths";

async function deleteFolderRecursive(path: string, ignoredFiles: string[] = []) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(async file => {
            const curPath = resolve(path, file);
            if (fs.statSync(curPath).isDirectory()) { // 目录
              if (!ignoredFiles.includes(curPath)) { // 不在忽略列表中
                if (file != 'node_modules') await deleteFolderRecursive(curPath); // 递归删除子目录
              }
              // 删除空目录（或子目录已被删除的目录）
              if (fs.readdirSync(curPath).length === 0 ) { 
                fs.existsSync(curPath) && fs.rmdirSync(curPath);
              }
            } else { // 文件
              if (!ignoredFiles.includes(curPath)) { // 不在忽略列表中
                fs.unlinkSync(curPath); // 删除文件
              }
            }
        });
      
        if (path !== `${pkgPath}/hope`) fs.rmdirSync(path);
    }
}

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