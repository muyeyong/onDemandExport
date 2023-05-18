# 基于vue3和vite按需导入的组件库

## 运行

+ 安装依赖

```js
// 运行目录是项目根目录
pnpm i
```



+ 打包组件库

```js
// 运行目录是项目根目录
pnpm run build
```

+ 看效果

```js
// 进入packageas/test 目录
pnpm run dev
```

## 简介

用pnpm做包管理，`packages`下面有两个项目`components`是组件库，`test`是测试库，引入了组件库，利用`unplugin-vue-components`可以自动对用到的组件进行导入。