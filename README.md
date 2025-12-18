# Auritan Inter - 国际贸易公司门户网站

基于 React + Express 的现代化全栈应用

## 技术栈

- **前端**: React 18 + Vite + Tailwind CSS
- **后端**: Node.js + Express + MongoDB
- **部署**: Railway (后端) + Netlify (前端)

## 快速开始

### 安装依赖

```bash
# 安装所有依赖
cd client && npm install
cd ../server && npm install
```

### 启动开发服务器

```bash
# 前端 (http://localhost:5173)
cd client && npm run dev

# 后端 (http://localhost:3001)
cd server && npm run dev
```

### 构建生产版本

```bash
cd client && npm run build
```

## 项目结构

```
├── client/          # 前端应用
├── server/          # 后端服务
│   ├── config/      # 配置文件（数据库连接等）
│   └── models/      # 数据模型
```

## 主要功能

- 产品展示和分类筛选
- 公司介绍和资质证书
- 新闻动态
- 联系表单（留言保存到 MongoDB）

## API

- `POST /api/contact` - 提交留言表单
- `GET /api/messages` - 获取所有留言
- `GET /api/messages/:id` - 获取单个留言
- `GET /api/health` - 健康检查

## Railway 部署配置

### MongoDB 环境变量设置

在 Railway Dashboard → Variables 中添加：

**方式一（推荐）：使用完整 URI**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?appName=AppName
```

**方式二：使用分段配置**
```
MONGODB_USERNAME=username
MONGODB_PASSWORD=password
MONGODB_CLUSTER=cluster.mongodb.net
MONGODB_DATABASE=database
MONGODB_APP_NAME=AppName
```

### 其他环境变量

```
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.com
```
