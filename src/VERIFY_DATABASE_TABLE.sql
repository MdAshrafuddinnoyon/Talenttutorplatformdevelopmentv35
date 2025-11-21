-- ════════════════════════════════════════════════════════════════════════════════
-- Verify Database Table for Talent Tutor
-- Run this in Supabase SQL Editor to check if table exists
-- ════════════════════════════════════════════════════════════════════════════════

-- Check if table exists
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename = 'kv_store_5b21d3ea'
    ) 
    THEN '✅ Table EXISTS'
    ELSE '❌ Table DOES NOT EXIST'
  END AS table_status;

-- If table exists, show its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'kv_store_5b21d3ea'
ORDER BY ordinal_position;

-- If table exists, show row count
SELECT 
  'Total rows: ' || COUNT(*)::text AS row_count
FROM public.kv_store_5b21d3ea;

-- Check RLS status
SELECT 
  tablename, 
  rowsecurity AS rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'kv_store_5b21d3ea';

-- Check policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'kv_store_5b21d3ea';
