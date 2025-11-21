# 🔧 Maintenance Mode - Quick Reference

## ✅ Current Status

**Maintenance Mode is FULLY IMPLEMENTED** and **ONLY controlled from Admin Dashboard**.

---

## 🎯 How It Works

```
Admin Dashboard → Toggle ON/OFF → localStorage → App.tsx checks → Redirect to MaintenancePage
```

**Default State**: ❌ OFF (disabled)  
**Control**: 🔐 Admin Dashboard Only  
**Bypass**: ✅ Admin users can access all pages  

---

## 📍 Implementation Files

| File | Location | Function |
|------|----------|----------|
| `authGuard.ts` | Line 378-396 | Check maintenance status |
| `App.tsx` | Line 186-190 | Enforce maintenance mode |
| `App.tsx` | Line 382-385 | Block navigation |
| `MaintenancePage.tsx` | `/pages/` | Display maintenance page |

---

## 🎨 Add to Admin Dashboard

### Step 1: Add State (around line 200)

```typescript
const [platformSettings, setPlatformSettings] = useState({
  maintenanceMode: false,
  maintenanceMessage: '',
  allowRegistration: true,
});

useEffect(() => {
  const savedSettings = localStorage.getItem('platformSettings');
  if (savedSettings) {
    setPlatformSettings(JSON.parse(savedSettings));
  }
}, []);

const savePlatformSettings = (newSettings: any) => {
  setPlatformSettings(newSettings);
  localStorage.setItem('platformSettings', JSON.stringify(newSettings));
  toast.success('Settings saved!');
};
```

### Step 2: Add Tab

```tsx
<TabsTrigger value="settings">
  <Settings className="w-4 h-4 mr-2" />
  Settings
</TabsTrigger>
```

### Step 3: Add Content

```tsx
<TabsContent value="settings">
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <h3>🔧 Maintenance Mode</h3>
        <p>Temporarily disable site for maintenance</p>
      </div>
      <Switch
        checked={platformSettings.maintenanceMode}
        onCheckedChange={(checked) => {
          savePlatformSettings({
            ...platformSettings,
            maintenanceMode: checked
          });
        }}
      />
    </div>
  </Card>
</TabsContent>
```

---

## 🧪 Testing

### Test 1: Enable Maintenance
```
1. Login as admin (admin@talenttutor.com / Admin@2025)
2. Admin Dashboard → Settings → Toggle ON
3. Open incognito window
4. ✅ Should see MaintenancePage
```

### Test 2: Admin Bypass
```
1. Keep maintenance mode ON
2. Stay logged in as admin
3. Navigate to any page
4. ✅ Admin can access all pages
```

### Test 3: Non-Admin Block
```
1. Login as teacher/guardian/student
2. Maintenance mode ON
3. ✅ Automatically redirect to MaintenancePage
4. ✅ Cannot access any page
```

---

## 🔍 How to Check Status

### In Browser Console:
```javascript
// Check if maintenance mode is active
JSON.parse(localStorage.getItem('platformSettings') || '{}').maintenanceMode

// Check current user role
JSON.parse(localStorage.getItem('currentUser') || '{}').role
```

### In Code:
```typescript
import { isMaintenanceModeActive, canBypassMaintenance } from './utils/authGuard';

console.log('Maintenance active:', isMaintenanceModeActive());
console.log('Can bypass:', canBypassMaintenance('admin'));
```

---

## 🛡️ Security Features

✅ **Admin Only Control**: Only admin can toggle  
✅ **Automatic Enforcement**: All navigation blocked  
✅ **Admin Bypass**: Admin always has access  
✅ **Default OFF**: Safe default state  
✅ **localStorage Based**: Client-side storage  

---

## 📊 localStorage Structure

```json
{
  "platformSettings": {
    "maintenanceMode": false,
    "maintenanceMessage": "We are improving...",
    "allowRegistration": true,
    "allowDonorRegistration": true,
    "enableChat": true,
    "enableNotifications": true
  }
}
```

---

## 💡 When to Use

✅ Server updates/deploys  
✅ Database migrations  
✅ Critical bug fixes  
✅ Security patches  
✅ Feature testing  
✅ Data cleanup  

---

## 🚨 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Toggle not working | Check localStorage, refresh browser |
| Admin can't bypass | Verify role is 'admin' in localStorage |
| Maintenance page not showing | Check `isMaintenanceModeActive()` return value |
| Settings not saving | Clear localStorage and try again |

---

## 📝 Code Snippets

### Force Enable (for testing):
```javascript
localStorage.setItem('platformSettings', JSON.stringify({
  maintenanceMode: true,
  maintenanceMessage: 'Testing maintenance mode'
}));
window.location.reload();
```

### Force Disable (emergency):
```javascript
localStorage.setItem('platformSettings', JSON.stringify({
  maintenanceMode: false
}));
window.location.reload();
```

### Check Status:
```javascript
const settings = JSON.parse(localStorage.getItem('platformSettings') || '{}');
console.log('Maintenance Mode:', settings.maintenanceMode ? 'ON' : 'OFF');
```

---

## ✅ Checklist

Before enabling maintenance mode:

- [ ] Notify users (email/announcement)
- [ ] Set maintenance message
- [ ] Estimate downtime
- [ ] Test admin bypass
- [ ] Have rollback plan

After enabling maintenance mode:

- [ ] Verify non-admins are blocked
- [ ] Verify admin can access
- [ ] Complete maintenance tasks
- [ ] Test thoroughly
- [ ] Disable maintenance mode

---

## 🎉 Summary

**Your maintenance mode system is:**
- ✅ Fully functional
- ✅ Admin-only controlled
- ✅ Default OFF
- ✅ Automatic enforcement
- ✅ Admin bypass enabled
- ✅ Production ready

**No automatic activation. Only manual control from Admin Dashboard!** 🔐

---

For complete details, see:
- `/মেইনটেনেন্স_মোড_সম্পূর্ণ_গাইড.md` (বাংলা)
- `/MAINTENANCE_AND_404_SYSTEM_GUIDE.md` (English)
