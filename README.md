# Auritan Inter - 国际贸易公司门户网站

基于 React + Supabase 的现代化全栈应用

## 技术栈

- **前端**: React 18 + Vite + Tailwind CSS
- **后端**: Supabase (BaaS - Backend as a Service)
- **部署**: Netlify (前端) + Supabase Cloud (后端)

## 快速开始

### 前置要求

1. 创建 Supabase 项目（访问 [supabase.com](https://supabase.com)）
2. 按照 `SUPABASE_SETUP.md` 中的说明设置数据库表

### 安装依赖

```bash
# 安装依赖
npm install
```

### 配置 Supabase

#### 方式一：使用环境变量（推荐，用于生产环境）

1. 在 Supabase Dashboard 中获取你的项目信息：
   - 进入 **Project Settings** > **API**
   - 复制 **Project URL** 和 **anon/public key**

2. 在 Netlify 中设置环境变量：
   - 进入 **Site settings** → **Environment variables**
   - 添加以下环境变量：
     - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
     - `VITE_SUPABASE_ANON_KEY` = `your-anon-key-here`

#### 方式二：本地开发使用 .env.local 文件

1. 在项目根目录创建 `.env.local` 文件：
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. 重启开发服务器使环境变量生效

### 启动开发服务器

```bash
# 启动开发服务器 (http://localhost:5173)
npm run dev
```

**注意**：不再需要启动后端服务器，所有数据操作都通过 Supabase 完成。

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
├── src/                       # 源代码目录
│   ├── config/
│   │   ├── supabaseConfig.js      # Supabase 配置（不提交到 Git）
│   │   └── supabaseConfig.js.example  # 配置示例文件
│   ├── pages/
│   │   └── Contact.jsx        # 联系页面（使用 Supabase）
│   ├── components/            # React 组件
│   ├── context/               # React Context
│   ├── hooks/                 # 自定义 Hooks
│   └── ...
├── public/                    # 静态资源
├── server/                    # ⚠️ 已废弃：原 Express 后端（保留用于参考）
└── SUPABASE_SETUP.md          # Supabase 数据库设置指南
```

## 主要功能

- 产品展示和分类筛选
- 公司介绍和资质证书
- 新闻动态
- 联系表单（留言保存到 Supabase）

## 数据库设置

请参考 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 了解如何：
- 创建数据库表
- 设置 Row Level Security (RLS) 策略
- 配置 Supabase 客户端

## 部署

### 前端部署（Netlify）

1. 将项目推送到 GitHub
2. 在 Netlify 中连接 GitHub 仓库
3. **重要**：在 Netlify Dashboard 中设置环境变量：
   - 进入 **Site settings** → **Environment variables**
   - 添加 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`
4. 构建设置（已在 `netlify.toml` 中配置）：
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

### 后端（Supabase）

- Supabase 会自动处理后端部署
- 确保在 Supabase Dashboard 中正确配置了 RLS 策略

## 安全说明

⚠️ **重要**：Supabase 配置信息包含敏感数据，请妥善保管。

**安全提示**：
1. ✅ 使用环境变量存储配置（推荐方式）
2. ✅ `.env.local` 文件已被添加到 `.gitignore`，不会被提交到 GitHub
3. ⚠️ 不要在代码中硬编码 Supabase URL 和 Key
4. ⚠️ 不要将包含真实配置的文件提交到版本控制

## 迁移说明

本项目已从 **React + Express + MongoDB** 架构迁移到 **React + Supabase** 架构：

- ✅ 不再需要 Node.js/Express 后端服务器
- ✅ 不再需要 MongoDB 数据库
- ✅ 所有数据操作通过 Supabase 客户端直接完成
- ✅ 简化了部署流程（只需部署前端）
- ✅ 自动获得 Supabase 的安全、认证、实时等功能
