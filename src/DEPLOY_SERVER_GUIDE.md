# 🚀 Server Deployment Guide

## Quick Deploy to Supabase

### Prerequisites

1. **Supabase CLI** installed
2. **Project linked** to your Supabase account
3. **Database table** `kv_store_5b21d3ea` created

### Deploy Commands

```bash
# 1. Install Supabase CLI (if not installed)
npm install -g supabase

# 2. Login to Supabase
supabase login

# 3. Link to your project
supabase link --project-ref wkdksiagjwrrocpqkbnh

# 4. Deploy the edge function
supabase functions deploy server --no-verify-jwt

# 5. Verify deployment
curl https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/health
```

### Expected Output

```json
{
  "status": "ok",
  "message": "Talent Tutor Server is running",
  "timestamp": "2025-11-08T...",
  "version": "1.0.0"
}
```

## Alternative: Deploy via Supabase Dashboard

If you don't have CLI access, you can deploy via the dashboard:

1. Go to: https://supabase.com/dashboard/project/wkdksiagjwrrocpqkbnh/functions
2. Click "Deploy new function"
3. Select your function code from `/supabase/functions/server/`
4. Name it "server"
5. Deploy

## Post-Deployment Steps

### 1. Initialize Demo Data

```bash
curl -X POST \
  https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/init-demo-data \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZGtzaWFnandycm9jcHFrYm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MTkwMzcsImV4cCI6MjA3ODA5NTAzN30.XJSvM3RJH0KlVkA0HmqZDwDQytdxu1pxJd1SVLgxS_Q" \
  -H "Content-Type: application/json"
```

### 2. Test Login

```bash
curl -X POST \
  https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/auth/login \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZGtzaWFnandycm9jcHFrYm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MTkwMzcsImV4cCI6MjA3ODA5NTAzN30.XJSvM3RJH0KlVkA0HmqZDwDQytdxu1pxJd1SVLgxS_Q" \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrPhone": "admin@talenttutor.com",
    "password": "Admin@2025"
  }'
```

### 3. Verify All Routes

```bash
# Health check
curl https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/health

# Root endpoint
curl https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/

# Get all users
curl https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/users \
  -H "Authorization: Bearer YOUR_KEY"
```

## Troubleshooting

### Error: "Failed to deploy"

**Solution**: Check if you have the correct permissions
```bash
supabase logout
supabase login
supabase link --project-ref wkdksiagjwrrocpqkbnh
```

### Error: "Function not found"

**Solution**: Ensure function name is exactly "server"
```bash
supabase functions list
```

### Error: "CORS policy"

**Solution**: Redeploy with CORS configuration
```bash
supabase functions deploy server --no-verify-jwt
```

## Monitoring

### View Logs

```bash
# Real-time logs
supabase functions logs server

# Or via dashboard:
# https://supabase.com/dashboard/project/wkdksiagjwrrocpqkbnh/logs/edge-functions
```

### Check Function Status

Dashboard: https://supabase.com/dashboard/project/wkdksiagjwrrocpqkbnh/functions

Should show:
- ✅ Function: server
- ✅ Status: Active
- ✅ Invocations: Count increasing

## Environment Variables

The function automatically gets these from Supabase:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `SUPABASE_DB_URL`

No manual configuration needed!

## Testing via UI

1. Navigate to: `/login-testing`
2. Click "Run Diagnostics" - all tests should pass
3. Click "Seed Demo Accounts" - creates 6 demo users
4. Click "Test Login" with admin credentials
5. Should see success message

## Support

If deployment fails:
1. Check function logs
2. Verify database table exists
3. Ensure project is linked
4. Try redeploying

---

**Last Updated**: 2025-11-08
**Status**: Ready to deploy 🚀
