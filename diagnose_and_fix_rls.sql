-- 完整的 RLS 策略诊断和修复脚本
-- 在 Supabase Dashboard > SQL Editor 中执行此脚本

-- ============================================
-- 步骤 1: 诊断 - 查看当前状态
-- ============================================
-- 检查表是否存在
SELECT 
  table_name,
  row_security
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name = 'messages';

-- 检查当前所有策略
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'messages';

-- ============================================
-- 步骤 2: 清理 - 删除所有旧策略
-- ============================================
DROP POLICY IF EXISTS "Allow anonymous insert" ON messages;
DROP POLICY IF EXISTS "Allow public read" ON messages;
DROP POLICY IF EXISTS "Enable insert for anon users" ON messages;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON messages;
-- 删除任何其他可能存在的策略
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'messages') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON messages';
    END LOOP;
END $$;

-- ============================================
-- 步骤 3: 确保 RLS 已启用
-- ============================================
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 步骤 4: 创建新的插入策略
-- ============================================
-- 方式 1: 使用 permissive 策略（推荐）
CREATE POLICY "Enable insert for anon and authenticated users" 
ON messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- ============================================
-- 步骤 5: 验证策略
-- ============================================
SELECT 
  policyname,
  cmd,
  roles,
  permissive,
  with_check
FROM pg_policies 
WHERE tablename = 'messages';

-- 应该看到一条策略：
-- policyname: "Enable insert for anon and authenticated users"
-- cmd: INSERT
-- roles: {anon,authenticated}

