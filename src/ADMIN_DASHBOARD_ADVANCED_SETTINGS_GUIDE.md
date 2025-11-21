# Admin Dashboard Advanced Settings Guide
# এডমিন ড্যাশবোর্ড উন্নত সেটিংস গাইড

## Overview / সংক্ষিপ্ত বিবরণ

AdminDashboard এর Settings section এ এখন ১০টি comprehensive tabs রয়েছে যা platform এর সকল aspects কে নিয়ন্ত্রণ করে।

## Enhanced Settings Features / উন্নত সেটিংস ফিচার

### 1. **General Settings / সাধারণ সেটিংস**
প্ল্যাটফর্মের মূল কনফিগারেশন:
- Platform Fee (শিক্ষকদের জন্য %)
- Teacher Free Period (মাস)
- Teacher Free Credits
- Guardian Free Credits
- Auto-approve Settings
- Maintenance Mode
- Registration Control

**কীভাবে ব্যবহার করবেন:**
1. Settings → General tab এ যান
2. প্রয়োজনীয় মান পরিবর্তন করুন
3. "সেভ করুন" বাটনে ক্লিক করুন

---

### 2. **Email Settings / ইমেইল সেটিংস**
সম্পূর্ণ email notification system configuration:
- SMTP Server Configuration
- SMTP Port & Credentials
- Sender Email & Name
- Enable/Disable Email Notifications
- Test Email Functionality

**উদাহরণ Configuration:**
```
SMTP Server: smtp.gmail.com
SMTP Port: 587
Username: your-email@gmail.com
Sender Email: noreply@talenttutor.com
Sender Name: Talent Tutor
```

**Test Email পাঠানোর পদ্ধতি:**
1. Email settings পূর্ণ করুন
2. "টেস্ট ইমেইল পাঠান" বাটনে ক্লিক করুন
3. Admin email এ test email পাবেন

---

### 3. **SMS Settings / এসএমএস সেটিংস**
Bangladesh এর SMS providers সহ configuration:
- SMS Provider Selection
  - SSL Wireless
  - Reve Systems
  - Bulk SMS BD
  - Twilio
- API Key Management
- Sender ID Configuration
- SMS Balance Monitoring
- Test SMS Functionality

**Supported Providers:**
- ✅ SSL Wireless (বাংলাদেশ)
- ✅ Reve Systems (বাংলাদেশ)
- ✅ Bulk SMS BD (বাংলাদেশ)
- ✅ Twilio (International)

**SMS Balance Tracking:**
- Real-time balance display
- Automatic alerts when balance is low
- Integration with provider APIs

---

### 4. **Notification Settings / নোটিফিকেশন সেটিংস**
Granular control over all notification channels:

**Email Notifications:**
- ✉️ Registration notifications
- ✉️ Approval notifications
- ✉️ Payment notifications

**SMS Notifications:**
- 📱 Registration SMS
- 📱 Approval SMS

**App Notifications:**
- 🔔 Push notifications
- 📲 In-app notifications

**প্রতিটি notification type আলাদাভাবে enable/disable করা যায়।**

---

### 5. **Security Settings / নিরাপত্তা সেটিংস**
Advanced security configuration:
- Two-Factor Authentication (2FA)
- Password Complexity Rules:
  - Low: 6 characters
  - Medium: 8 chars + numbers
  - High: 10 chars + special characters
- Session Timeout (minutes)
- IP Whitelist
- Captcha (Google reCAPTCHA)
- Login Attempt Limits
- Account Lock Duration

**Security Best Practices:**
1. 2FA enable করুন admins এর জন্য
2. Password complexity "High" সেট করুন
3. Session timeout 30 minutes রাখুন
4. Captcha enable করুন
5. Login attempts 5 বা তার কম সেট করুন

---

### 6. **Backup Settings / ব্যাকআপ সেটিংস**
Automated backup system:
- Auto Backup Enable/Disable
- Backup Frequency:
  - Hourly / প্রতি ঘন্টা
  - Daily / প্রতিদিন
  - Weekly / সাপ্তাহিক
  - Monthly / মাসিক
- Backup Locations:
  - Supabase Storage
  - Local Server
  - AWS S3
  - Google Drive
- Last Backup Timestamp
- Manual Backup Creation
- Backup Restore
- Backup Download

**Backup Operations:**
```
Create Backup → তাৎক্ষণিক backup তৈরি করে
Restore Backup → পূর্বের backup পুনরুদ্ধার করে
Download Backup → Local device এ download করে
```

---

### 7. **Appearance Settings / চেহারা সেটিংস**
Platform visual customization:
- Primary Color Picker (Hex color)
- Secondary Color Picker
- Logo Upload
- Favicon Upload
- Dark Mode Toggle
- Compact View Toggle

**Color Selection:**
- Visual color picker
- Hex code input
- Real-time preview
- Default: Primary #10B981, Secondary #3B82F6

---

### 8. **Localization Settings / স্থানীয়করণ সেটিংস**
Multi-language and regional configuration:
- Default Language (বাংলা/English)
- Supported Languages
- Date Format:
  - DD/MM/YYYY
  - MM/DD/YYYY
  - YYYY-MM-DD
- Time Format (12h/24h)
- Timezone (Asia/Dhaka default)
- Currency (BDT/USD/EUR)
- Currency Symbol (৳/$/@)

**Bangladesh Configuration:**
```
Language: বাংলা (bn)
Timezone: Asia/Dhaka (GMT+6)
Date Format: DD/MM/YYYY
Time Format: 24h
Currency: BDT
Symbol: ৳
```

---

### 9. **Advanced Features / উন্নত ফিচার**
Feature flags for advanced functionalities:
- 🤖 AI Features (Teacher matching, recommendations)
- 💬 Chat System (Real-time messaging)
- 📹 Video Call (Online classes)
- 📎 File Sharing (Documents, materials)
- Maximum File Size (MB)
- Allowed File Types (pdf, doc, jpg, etc.)

**File Upload Configuration:**
```
Max File Size: 10 MB (customizable)
Allowed Types: pdf,doc,docx,jpg,png,jpeg
```

**Feature Toggles:**
- Enable/disable করা যায় যেকোনো সময়
- No code deployment required
- Instant effect

---

### 10. **System Configuration / সিস্টেম কনফিগারেশন**
Low-level system settings:
- Caching Enabled (Performance boost)
- Debug Mode (Development only)
- API Rate Limit (requests per minute)
- Max Concurrent Users
- Performance Monitoring

**System Information Display:**
- Server Status (🟢 Online)
- Uptime Percentage
- Database Connection Status
- Storage Usage (GB)

**Performance Settings:**
```
Caching: Enabled (recommended)
Debug Mode: Disabled (production)
API Rate Limit: 100 requests/min
Max Users: 1000 concurrent
```

---

## Import/Export Functionality

### Settings Export / সেটিংস এক্সপোর্ট
**কীভাবে করবেন:**
1. Settings page এ যান
2. "এক্সপোর্ট" বাটনে ক্লিক করুন
3. JSON file download হবে

**Export করা Data:**
- সকল 10 tabs এর settings
- Timestamp included
- Human-readable JSON format

### Settings Import / সেটিংস ইমপোর্ট
**কীভাবে করবেন:**
1. Settings page এ যান
2. "ইমপোর্ট" বাটনে ক্লিক করুন
3. Previously exported JSON file select করুন
4. সকল settings automatically apply হবে

**Use Cases:**
- Backup/restore configurations
- Clone settings to another environment
- Share configuration between admins
- Quick setup for testing

---

## Activity Logging / কার্যকলাপ লগিং

প্রতিটি settings change automatically log হয়:
```javascript
Activity Log Entry:
- Action: "Settings Updated"
- User: "Admin"
- Details: "ইমেইল সেটিংস আপডেট করা হয়েছে"
- Timestamp: "এখনই"
```

**Activity Logs দেখার জন্য:**
Settings → Activity Logs tab

---

## Translation System / অনুবাদ ব্যবস্থা

সকল UI text translation system এ integrated:
- Bangla (বাংলা) ✅
- English ✅
- Dynamic language switching
- Font support:
  - Noto Serif Bengali (বাংলা)
  - Libre Franklin (English)

**Translation Keys Added:**
```javascript
t.emailSettings, t.smsSettings, t.securitySettings,
t.backupSettings, t.appearanceSettings, t.localizationSettings,
t.advancedFeatures, t.systemConfiguration
... এবং আরও 100+ keys
```

---

## Best Practices / সেরা অনুশীলন

### 🔒 Security
1. Regular backup schedule maintain করুন
2. 2FA enable করুন admins এর জন্য
3. Strong password policy enforce করুন
4. Session timeout reasonable রাখুন
5. Debug mode production এ off রাখুন

### 📧 Email/SMS
1. Test email/SMS পাঠিয়ে verify করুন
2. SMS balance monitor করুন
3. Notification preferences carefully সেট করুন
4. Sender email verified রাখুন

### ⚙️ System
1. Caching enable রাখুন performance এর জন্য
2. API rate limit appropriate সেট করুন
3. Regular performance monitoring করুন
4. Database optimization চালু রাখুন

### 💾 Backup
1. Auto backup enable করুন
2. Daily frequency recommend করা হয়
3. Multiple backup locations use করুন
4. Regular restore test করুন

### 🎨 Appearance
1. Brand colors maintain করুন
2. Dark mode test করুন
3. Logo high resolution রাখুন
4. Responsive design verify করুন

---

## Troubleshooting / সমস্যা সমাধান

### Email Not Sending
1. SMTP credentials verify করুন
2. Port number check করুন (587 for TLS, 465 for SSL)
3. "Less secure apps" allow করুন (Gmail এর জন্য)
4. Test email পাঠিয়ে check করুন

### SMS Not Working
1. API key verify করুন
2. SMS balance check করুন
3. Sender ID approved কিনা check করুন
4. Provider documentation দেখুন

### Settings Not Saving
1. Browser console check করুন
2. Network connection verify করুন
3. Supabase connection check করুন
4. Try different browser

### Performance Issues
1. Caching enable করুন
2. API rate limit increase করুন
3. Database optimization চালান
4. Server resources check করুন

---

## API Integration

Settings গুলো backend API এর সাথে integrated:

### Save Settings API:
```typescript
POST /api/admin/settings
Body: {
  type: 'email' | 'sms' | 'security' | etc.,
  settings: {...}
}
```

### Load Settings API:
```typescript
GET /api/admin/settings/:type
Response: { settings: {...} }
```

---

## Database Schema

Settings database table structure:

```sql
CREATE TABLE platform_settings (
  id UUID PRIMARY KEY,
  setting_type VARCHAR(50),
  setting_key VARCHAR(100),
  setting_value JSONB,
  updated_by UUID,
  updated_at TIMESTAMP,
  UNIQUE(setting_type, setting_key)
);
```

---

## Future Enhancements / ভবিষ্যত উন্নতি

### Planned Features:
- ✨ Settings versioning & rollback
- ✨ Role-based settings access control
- ✨ Settings validation rules
- ✨ Settings templates
- ✨ Audit trail for all changes
- ✨ Scheduled settings changes
- ✨ A/B testing configuration
- ✨ Multi-tenant settings isolation

---

## Support & Documentation

### Resources:
- 📚 Main Documentation: `/README.md`
- 📚 API Documentation: `/API_DOCUMENTATION.md`
- 📚 Developer Guide: `/DEVELOPER_GUIDE.md`
- 📚 Bengali Guide: `/README_BN.md`

### Need Help?
- 🎫 Create a support ticket
- 💬 Contact admin support
- 📧 Email: support@talenttutor.com

---

## Summary / সংক্ষিপ্তসার

**Enhanced Settings System Includes:**
✅ 10 comprehensive settings tabs
✅ 100+ translation keys
✅ Import/Export functionality
✅ Activity logging
✅ Real-time validation
✅ Test functionality for critical features
✅ Full Bangla/English support
✅ Responsive design
✅ Dynamic configuration
✅ No hardcoded values
✅ Database integration ready
✅ Security best practices
✅ Comprehensive documentation

**Settings আপডেট সম্পূর্ণ এবং production-ready! 🎉**

---

*Last Updated: November 10, 2025*
*Version: 2.0.0*
