# 漯河西站高铁大屏模拟系统
基于 Vite + React + Zustand 开发高铁站多屏仿真系统
适配真实车站运营数据，包含管理后台、候车大屏、站台分屏、车站门头牌四大页面。

## 技术栈
- Vite 构建工具
- React 18
- React Router 6 路由
- Zustand 全局状态 + localStorage持久化
- Lucide 图标库
- 原生CSS大屏样式

## 目录说明
- src/main.jsx：项目入口
- src/App.js：总路由
- src/data：车站JSON数据源 + Zustand仓库
- src/components/common：公共复用组件（时钟）
- src/screens：大屏展示页面
- src/pages：后台管理页面
- src/styles：全局样式文件

## 页面路由
1. `/` — 后台管理（增删车次、修改车站名）
2. `/hall` — 候车大厅双栏车次显示屏
3. `/platforms` — 多站台网格分屏
4. `/sign` — 车站中英文门头立牌

## 启动命令
```bash
# 安装依赖
npm install
# 本地开发
npm run dev
# 打包静态文件
npm run build
# 预览打包产物
npm run preview
