-- Talent Tutor Database Table Initialization
-- Run this SQL in your Supabase Dashboard: https://supabase.com/dashboard/project/wkdksiagjwrrocpqkbnh/sql/new

-- Create the main KV store table
CREATE TABLE IF NOT EXISTS public.kv_store_5b21d3ea (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- Add performance index
CREATE INDEX IF NOT EXISTS idx_kv_store_5b21d3ea_key 
ON public.kv_store_5b21d3ea(key);

-- Enable Row Level Security
ALTER TABLE public.kv_store_5b21d3ea ENABLE ROW LEVEL SECURITY;

-- Create security policy for service role
DROP POLICY IF EXISTS "Service role full access" ON public.kv_store_5b21d3ea;
CREATE POLICY "Service role full access" 
ON public.kv_store_5b21d3ea
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Grant necessary permissions
GRANT ALL ON public.kv_store_5b21d3ea TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kv_store_5b21d3ea TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kv_store_5b21d3ea TO authenticated;

-- Success message
SELECT 'Table kv_store_5b21d3ea created successfully! ✅' AS status;
