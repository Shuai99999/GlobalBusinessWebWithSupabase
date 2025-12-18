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
# 安装前端依赖
cd client && npm install
```

### 配置 Supabase

1. 复制配置文件：
   ```bash
   cd client/src/config
   cp supabaseConfig.js.example supabaseConfig.js
   ```

2. 在 Supabase Dashboard 中获取你的项目信息：
   - 进入 **Project Settings** > **API**
   - 复制 **Project URL** 和 **anon/public key**

3. 编辑 `client/src/config/supabaseConfig.js`，填入你的 Supabase 配置：
   ```javascript
   export const supabaseConfig = {
     url: 'https://your-project.supabase.co',
     anonKey: 'your-anon-key-here'
   }
   ```

### 启动开发服务器

```bash
# 前端 (http://localhost:5173)
cd client && npm run dev
```

**注意**：不再需要启动后端服务器，所有数据操作都通过 Supabase 完成。

### 构建生产版本

```bash
cd client && npm run build
```

## 项目结构

```
├── client/                    # 前端应用
│   ├── src/
│   │   ├── config/
│   │   │   ├── supabaseConfig.js      # Supabase 配置（不提交到 Git）
│   │   │   └── supabaseConfig.js.example  # 配置示例文件
│   │   └── pages/
│   │       └── Contact.jsx    # 联系页面（使用 Supabase）
│   └── ...
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
3. 构建设置：
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`

### 后端（Supabase）

- Supabase 会自动处理后端部署
- 确保在 Supabase Dashboard 中正确配置了 RLS 策略

## 安全说明

⚠️ **重要**：`client/src/config/supabaseConfig.js` 文件包含敏感信息，已被添加到 `.gitignore`，不会被提交到 GitHub。

请确保：
1. 不要将 `supabaseConfig.js` 提交到版本控制
2. 使用 `supabaseConfig.js.example` 作为模板
3. 在生产环境中，可以考虑使用环境变量来存储 Supabase 配置

## 迁移说明

本项目已从 **React + Express + MongoDB** 架构迁移到 **React + Supabase** 架构：

- ✅ 不再需要 Node.js/Express 后端服务器
- ✅ 不再需要 MongoDB 数据库
- ✅ 所有数据操作通过 Supabase 客户端直接完成
- ✅ 简化了部署流程（只需部署前端）
- ✅ 自动获得 Supabase 的安全、认证、实时等功能
