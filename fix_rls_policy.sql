-- 修复 RLS 策略的 SQL 脚本
-- 在 Supabase Dashboard > SQL Editor 中执行此脚本

-- ============================================
-- 步骤 1: 删除所有可能存在的旧策略
-- ============================================
DROP POLICY IF EXISTS "Allow anonymous insert" ON messages;
DROP POLICY IF EXISTS "Allow public read" ON messages;
DROP POLICY IF EXISTS "Enable insert for anon and authenticated users" ON messages;

-- 如果还有其他策略，使用以下命令删除所有策略
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'messages') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON messages';
    END LOOP;
END $$;

-- ============================================
-- 步骤 2: 确保 RLS 已启用
-- ============================================
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 步骤 3: 创建新的插入策略
-- ============================================
CREATE POLICY "Enable insert for anon and authenticated users" 
ON messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- ============================================
-- 步骤 4: 验证策略是否正确创建
-- ============================================
SELECT 
  policyname,
  cmd,
  roles,
  permissive
FROM pg_policies 
WHERE tablename = 'messages';

-- 应该看到一条策略：
-- policyname: "Enable insert for anon and authenticated users"
-- cmd: INSERT
-- roles: {anon,authenticated}

