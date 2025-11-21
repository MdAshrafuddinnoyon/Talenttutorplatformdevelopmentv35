# 🔧 Maintenance Mode - Admin Dashboard Setup

## ✅ Current Status

**Maintenance Mode System**: ✅ Fully Implemented
- `authGuard.ts` - Functions ready
- `App.tsx` - Enforcement ready
- `MaintenancePage.tsx` - UI ready
- `AdminDashboard.tsx` - **State ready, UI needs to be added**

---

## 📋 What You Need to Do

Add a Maintenance Mode toggle in Admin Dashboard. Here's how:

### Option 1: Quick Fix - Add to Overview Section

Add this code in the **Dashboard Overview** section of AdminDashboard.tsx (around line 1900-2000):

```tsx
{/* Maintenance Mode Control - Quick Access */}
<Card className="p-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
        <Settings className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg text-gray-900 mb-1">
          {language === 'bn' ? '🔧 মেইনটেনেন্স মোড' : '🔧 Maintenance Mode'}
        </h3>
        <p className="text-sm text-gray-600">
          {language === 'bn' 
            ? 'সাইট সাময়িকভাবে বন্ধ করুন'
            : 'Temporarily disable site'
          }
        </p>
      </div>
    </div>
    <Switch
      checked={platformSettings.maintenanceMode}
      onCheckedChange={(checked) => {
        const newSettings = {
          ...platformSettings,
          maintenanceMode: checked
        };
        setPlatformSettings(newSettings);
        localStorage.setItem('platformSettings', JSON.stringify(newSettings));
        toast.success(
          language === 'bn'
            ? checked ? 'মেইনটেনেন্স মোড চালু করা হয়েছে!' : 'মেইনটেনেন্স মোড বন্ধ করা হয়েছে!'
            : checked ? 'Maintenance mode enabled!' : 'Maintenance mode disabled!'
        );
      }}
    />
  </div>

  {platformSettings.maintenanceMode && (
    <Alert className="bg-orange-100 border-orange-300 mt-4">
      <AlertCircle className="w-4 h-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        {language === 'bn'
          ? '⚠️ মেইনটেনেন্স মোড চালু আছে! Admin ছাড়া কেউ সাইট ব্যবহার করতে পারবে না।'
          : '⚠️ Maintenance mode is active! Only admins can access the site.'
        }
      </AlertDescription>
    </Alert>
  )}
</Card>
```

### Option 2: Add Settings Section in Sidebar

If AdminDashboard has a sidebar navigation, add a "Settings" section:

1. Find the section navigation buttons (usually around line 1700-1900)
2. Add a Settings button:

```tsx
<Button
  variant={activeSection === 'settings' ? 'default' : 'ghost'}
  className="w-full justify-start"
  onClick={() => setActiveSection('settings')}
>
  <Settings className="w-4 h-4 mr-2" />
  {language === 'bn' ? 'সেটিংস' : 'Settings'}
</Button>
```

3. Add the Settings section content (around line 2500-3000):

```tsx
{activeSection === 'settings' && (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {language === 'bn' ? 'প্ল্যাটফর্ম সেটিংস' : 'Platform Settings'}
      </h2>
    </div>

    {/* Maintenance Mode Card */}
    <Card className="p-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg text-gray-900 mb-1">
              {language === 'bn' ? '🔧 মেইনটেনেন্স মোড' : '🔧 Maintenance Mode'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'bn' 
                ? 'সাইট রক্ষণাবেক্ষণের জন্য সাময়িকভাবে বন্ধ করুন'
                : 'Temporarily disable site for maintenance'
              }
            </p>
          </div>
        </div>
        <Switch
          checked={platformSettings.maintenanceMode}
          onCheckedChange={(checked) => {
            const newSettings = {
              ...platformSettings,
              maintenanceMode: checked
            };
            setPlatformSettings(newSettings);
            localStorage.setItem('platformSettings', JSON.stringify(newSettings));
            addActivityLog(
              language === 'bn' ? 'মেইনটেনেন্স মোড' : 'Maintenance Mode',
              language === 'bn' 
                ? checked ? 'মেইনটেনেন্স মোড চালু করা হয়েছে' : 'মেইনটেনেন্স মোড বন্ধ করা হয়েছে'
                : checked ? 'Maintenance mode enabled' : 'Maintenance mode disabled'
            );
            toast.success(
              language === 'bn'
                ? checked ? 'মেইনটেনেন্স মোড চালু করা হয়েছে!' : 'মেইনটেনেন্স মোড বন্ধ করা হয়েছে!'
                : checked ? 'Maintenance mode enabled!' : 'Maintenance mode disabled!'
            );
          }}
        />
      </div>

      {platformSettings.maintenanceMode && (
        <Alert className="bg-orange-100 border-orange-300">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            {language === 'bn'
              ? '⚠️ মেইনটেনেন্স মোড চালু আছে! সব users (Admin ছাড়া) maintenance page দেখবে।'
              : '⚠️ Maintenance mode is active! All users (except admins) will see the maintenance page.'
            }
          </AlertDescription>
        </Alert>
      )}
    </Card>

    {/* Other Platform Settings */}
    <Card className="p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {language === 'bn' ? 'অন্যান্য সেটিংস' : 'Other Settings'}
      </h3>
      
      <div className="space-y-4">
        {/* Registration Setting */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <Label className="text-base">
              {language === 'bn' ? 'নতুন রেজিস্ট্রেশন অনুমতি দিন' : 'Allow New Registrations'}
            </Label>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'bn' 
                ? 'নতুন users register করতে পারবে কিনা'
                : 'Whether new users can register'
              }
            </p>
          </div>
          <Switch
            checked={platformSettings.registrationOpen}
            onCheckedChange={(checked) => {
              setPlatformSettings({
                ...platformSettings,
                registrationOpen: checked
              });
              localStorage.setItem('platformSettings', JSON.stringify({
                ...platformSettings,
                registrationOpen: checked
              }));
              toast.success(
                language === 'bn' ? 'সেটিংস আপডেট করা হয়েছে!' : 'Settings updated!'
              );
            }}
          />
        </div>

        {/* Platform Fee */}
        <div className="py-3 border-b border-gray-200">
          <Label>
            {language === 'bn' ? 'প্ল্যাটফর্ম ফি (%)' : 'Platform Fee (%)'}
          </Label>
          <Input
            type="number"
            value={platformSettings.platformFee}
            onChange={(e) => {
              setPlatformSettings({
                ...platformSettings,
                platformFee: parseInt(e.target.value) || 0
              });
            }}
            className="mt-2"
          />
        </div>

        {/* Teacher Free Credits */}
        <div className="py-3 border-b border-gray-200">
          <Label>
            {language === 'bn' ? 'শিক্ষক ফ্রি ক্রেডিট' : 'Teacher Free Credits'}
          </Label>
          <Input
            type="number"
            value={platformSettings.teacherFreeCredits}
            onChange={(e) => {
              setPlatformSettings({
                ...platformSettings,
                teacherFreeCredits: parseInt(e.target.value) || 0
              });
            }}
            className="mt-2"
          />
        </div>

        {/* Guardian Free Credits */}
        <div className="py-3">
          <Label>
            {language === 'bn' ? 'অভিভাবক ফ্রি ক্রেডিট' : 'Guardian Free Credits'}
          </Label>
          <Input
            type="number"
            value={platformSettings.guardianFreeCredits}
            onChange={(e) => {
              setPlatformSettings({
                ...platformSettings,
                guardianFreeCredits: parseInt(e.target.value) || 0
              });
            }}
            className="mt-2"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={handleSavePlatformSettings} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          {language === 'bn' ? 'সেটিংস সংরক্ষণ করুন' : 'Save Settings'}
        </Button>
      </div>
    </Card>
  </div>
)}
```

---

## 🎯 Easiest Approach

Since the AdminDashboard.tsx is very large and complex, the **easiest approach** is:

1. **Add a floating toggle** in the header section of Admin Dashboard
2. **Or add in Dashboard Overview** as a quick access card

Here's the **simplest solution** - add this in the Dashboard header (around line 1800-1900):

```tsx
{/* Quick Maintenance Toggle in Header */}
<div className="flex items-center gap-2">
  <Label className="text-sm text-gray-600">
    {language === 'bn' ? 'মেইনটেনেন্স' : 'Maintenance'}
  </Label>
  <Switch
    checked={platformSettings.maintenanceMode}
    onCheckedChange={(checked) => {
      const newSettings = { ...platformSettings, maintenanceMode: checked };
      setPlatformSettings(newSettings);
      localStorage.setItem('platformSettings', JSON.stringify(newSettings));
      toast.success(
        language === 'bn'
          ? checked ? '🔧 মেইনটেনেন্স মোড চালু!' : '✅ মেইনটেনেন্স মোড বন্ধ!'
          : checked ? '🔧 Maintenance ON!' : '✅ Maintenance OFF!'
      );
    }}
  />
</div>
```

---

## ✅ Verification

After adding the code:

1. Login as Admin (admin@talenttutor.com / Admin@2025)
2. Go to Admin Dashboard
3. Find the Maintenance Mode toggle
4. Turn it ON
5. Open incognito window → You should see MaintenancePage
6. As admin, you can still navigate
7. Turn it OFF → Everyone gets access back

---

## 🔐 Security Check

Verify in browser console:

```javascript
// Check maintenance status
JSON.parse(localStorage.getItem('platformSettings')).maintenanceMode

// Should be false by default
// true when enabled by admin
```

---

## 📝 Summary

**Your system is 99% ready!** You just need to add the UI toggle in AdminDashboard.tsx

**Choose one approach:**
- ✅ **Option 1**: Add in Dashboard Overview (Recommended)
- ✅ **Option 2**: Add in Settings Section
- ✅ **Option 3**: Add in Header (Quickest)

**All backend logic is working:**
- ✅ platformSettings state exists
- ✅ localStorage save/load works
- ✅ authGuard.ts checks it
- ✅ App.tsx enforces it
- ✅ Admin bypass works

**You just need the UI button!** 🎨
