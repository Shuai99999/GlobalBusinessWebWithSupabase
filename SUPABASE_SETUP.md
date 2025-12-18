# Supabase 数据库设置指南

本文档说明如何在 Supabase 中设置留言功能所需的数据库表。

## 1. 创建数据库表

在 Supabase Dashboard 中，进入 SQL Editor，执行以下 SQL 语句创建 `messages` 表：

```sql
-- 创建 messages 表
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);

-- 添加注释
COMMENT ON TABLE messages IS '用户留言表';
COMMENT ON COLUMN messages.name IS '用户姓名';
COMMENT ON COLUMN messages.email IS '用户邮箱';
COMMENT ON COLUMN messages.phone IS '用户电话（可选）';
COMMENT ON COLUMN messages.message IS '留言内容';
COMMENT ON COLUMN messages.created_at IS '创建时间';
```

## 2. 设置 Row Level Security (RLS)

为了安全，我们需要设置 RLS 策略：

### 2.1 启用 RLS

```sql
-- 启用 Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
```

### 2.2 创建插入策略（允许匿名用户插入）

```sql
-- 允许任何人（包括匿名用户）插入留言
CREATE POLICY "Allow anonymous insert" ON messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

### 2.3 查询策略（不需要）

**注意**：当前实现不需要查询策略。留言只能从 Supabase Dashboard 查看，前端代码已移除防重复提交的数据库查询功能，只保留前端的防重复提交保护（防止用户快速连续点击提交按钮）。

## 3. 配置 Supabase 客户端

1. 在 Supabase Dashboard 中，进入 **Project Settings** > **API**
2. 复制 **Project URL** 和 **anon/public key**
3. 在项目根目录的 `src/config/` 目录下，复制 `supabaseConfig.js.example` 为 `supabaseConfig.js`
4. 将复制的 URL 和 key 填入 `supabaseConfig.js`

```javascript
export const supabaseConfig = {
  url: 'https://your-project.supabase.co',  // 替换为你的 Project URL
  anonKey: 'your-anon-key-here'              // 替换为你的 anon key
}
```

## 4. 验证设置

完成以上步骤后，你的留言功能应该可以正常工作了。用户提交留言时，数据会直接保存到 Supabase 数据库中。

## 5. 查看留言

你可以在 Supabase Dashboard 的 **Table Editor** 中查看所有留言记录。

## 6. 故障排除

### 错误：new row violates row-level security policy for table "messages"

如果遇到此错误，说明 RLS 策略没有正确配置。请执行以下 SQL 修复：

```sql
-- 步骤 1: 删除可能存在的旧策略（如果存在）
DROP POLICY IF EXISTS "Allow anonymous insert" ON messages;
DROP POLICY IF EXISTS "Allow public read" ON messages;

-- 步骤 2: 确保 RLS 已启用
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 步骤 3: 重新创建插入策略（允许匿名用户插入）
CREATE POLICY "Allow anonymous insert" ON messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 注意：不需要创建查询策略，前端代码已移除数据库查询功能
```

**重要提示**：
- 确保策略名称是唯一的，如果提示策略已存在，先执行 `DROP POLICY` 删除旧策略
- 策略必须同时允许 `anon`（匿名用户）和 `authenticated`（已认证用户）
- `WITH CHECK (true)` 表示允许插入任何数据（根据你的业务需求可以添加验证条件）

### 验证策略是否正确创建

执行以下 SQL 查询，检查策略是否存在：

```sql
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'messages';
```

你应该看到至少两条策略：
1. `Allow anonymous insert` - 用于插入数据
2. `Allow public read` - 用于查询数据（防重复提交需要）

