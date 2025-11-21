# Admin Settings Quick Reference Guide
# এডমিন সেটিংস দ্রুত রেফারেন্স গাইড

## 🚀 Quick Access / দ্রুত প্রবেশ

```
Admin Dashboard → Settings (সেটিংস) → Select Tab
```

---

## 📑 10 Settings Tabs Overview

| # | Tab | Icon | Purpose | Priority |
|---|-----|------|---------|----------|
| 1 | General | 🔧 | Basic platform config | ⭐⭐⭐ |
| 2 | Email | 📧 | Email notifications | ⭐⭐⭐ |
| 3 | SMS | 📱 | SMS notifications | ⭐⭐ |
| 4 | Notifications | 🔔 | Channel preferences | ⭐⭐⭐ |
| 5 | Security | 🔒 | Security rules | ⭐⭐⭐ |
| 6 | Backup | 💾 | Data backup | ⭐⭐⭐ |
| 7 | Appearance | 🎨 | Visual customization | ⭐ |
| 8 | Localization | 🌍 | Language & regional | ⭐⭐ |
| 9 | Features | ⚡ | Advanced features | ⭐⭐ |
| 10 | System | ⚙️ | System config | ⭐⭐⭐ |

---

## ⚡ Common Tasks / সাধারণ কাজ

### 1. Enable Email Notifications
```
Settings → Email → Toggle "Enable Email Notifications" → Save
```

### 2. Setup SMS Provider
```
Settings → SMS → Select Provider → Enter API Key → Enter Sender ID → Save
```

### 3. Enable Auto Backup
```
Settings → Backup → Toggle "Auto Backup" → Select Frequency → Save
```

### 4. Change Platform Colors
```
Settings → Appearance → Pick Colors → Upload Logo → Save
```

### 5. Enable Maintenance Mode
```
Settings → General → Platform Control → Toggle "Maintenance Mode"
```

### 6. Export All Settings
```
Settings → Top Right → "এক্সপোর্ট" Button → Download JSON
```

### 7. Import Settings
```
Settings → Top Right → "ইমপোর্ট" Button → Select JSON File
```

### 8. Enable 2FA
```
Settings → Security → Toggle "Two-Factor Authentication" → Save
```

### 9. Test Email
```
Settings → Email → Configure SMTP → "টেস্ট ইমেইল পাঠান" Button
```

### 10. Create Manual Backup
```
Settings → Backup → "Create Backup" Button
```

---

## 🔑 Essential Settings to Configure First

### Priority 1 (Must Do):
1. ✅ **General Settings**
   - Platform Fee: 10%
   - Teacher Free Period: 6 months
   - Teacher Free Credits: 50
   - Guardian Free Credits: 100

2. ✅ **Email Settings**
   - SMTP Server
   - Credentials
   - Sender Email
   - Test email

3. ✅ **Security Settings**
   - Enable 2FA
   - Password Complexity: High
   - Session Timeout: 30 min
   - Enable Captcha

4. ✅ **Backup Settings**
   - Enable Auto Backup
   - Frequency: Daily
   - Location: Supabase Storage

### Priority 2 (Important):
5. ✅ **SMS Settings** (if using SMS)
6. ✅ **Notification Preferences**
7. ✅ **System Configuration**

### Priority 3 (Optional):
8. ✅ **Appearance Customization**
9. ✅ **Advanced Features Toggles**
10. ✅ **Localization Fine-tuning**

---

## 📧 Email Configuration Examples

### Gmail SMTP:
```
SMTP Server: smtp.gmail.com
SMTP Port: 587
Username: your-email@gmail.com
Password: your-app-password
Sender Email: noreply@talenttutor.com
Sender Name: Talent Tutor
```

### Outlook/Office365:
```
SMTP Server: smtp.office365.com
SMTP Port: 587
Username: your-email@outlook.com
Password: your-password
```

### Custom Domain:
```
SMTP Server: mail.yourdomain.com
SMTP Port: 587 or 465
Username: no-reply@yourdomain.com
Password: your-password
```

---

## 📱 SMS Provider Setup

### SSL Wireless (Bangladesh):
```
Provider: ssl-wireless
API Key: [Get from SSL Wireless]
Sender ID: TALENTTUTOR (11 chars max)
```

### Bulk SMS BD:
```
Provider: bulk-sms-bd
API Key: [Get from Bulk SMS BD]
Sender ID: TALENTTUTOR
```

### Twilio (International):
```
Provider: twilio
API Key: [Your Twilio API Key]
Sender ID: +1234567890
```

---

## 🔒 Security Recommendations

### Password Complexity Levels:

| Level | Requirements | Example |
|-------|-------------|---------|
| Low | 6+ chars | `tutor1` |
| Medium | 8+ chars + numbers | `tutor123` |
| High | 10+ chars + special | `Tutor@123!` |

**Recommendation: Always use HIGH**

### Session Timeout:
- **Recommended**: 30 minutes
- **High Security**: 15 minutes
- **Low Security**: 60 minutes

### Login Attempts:
- **Recommended**: 5 attempts
- **High Security**: 3 attempts
- **Strict**: Account lock after 3 failed attempts for 30 minutes

---

## 💾 Backup Strategy

### Recommended Backup Schedule:

| Data Type | Frequency | Retention |
|-----------|-----------|-----------|
| Database | Daily | 30 days |
| Files | Daily | 30 days |
| Settings | Weekly | 90 days |
| Full System | Monthly | 1 year |

### Backup Locations:
1. **Primary**: Supabase Storage (automatic)
2. **Secondary**: AWS S3 (weekly manual)
3. **Tertiary**: Local download (monthly)

---

## 🎨 Brand Color Guidelines

### Default Colors:
- **Primary**: `#10B981` (Emerald)
- **Secondary**: `#3B82F6` (Blue)

### Color Picker Tips:
1. Use color picker for visual selection
2. Or enter hex code directly
3. Preview changes before saving
4. Maintain contrast ratios for accessibility

### Recommended Color Combinations:
```
Education Theme:
Primary: #10B981 (Green)
Secondary: #3B82F6 (Blue)

Corporate Theme:
Primary: #6366F1 (Indigo)
Secondary: #8B5CF6 (Purple)

Vibrant Theme:
Primary: #F59E0B (Amber)
Secondary: #EC4899 (Pink)
```

---

## 🌍 Localization Settings

### Bangladesh Configuration:
```
Default Language: বাংলা (bn)
Timezone: Asia/Dhaka (GMT+6)
Date Format: DD/MM/YYYY
Time Format: 24 hour
Currency: BDT
Currency Symbol: ৳
```

### International Configuration:
```
Default Language: English (en)
Timezone: UTC (GMT+0)
Date Format: MM/DD/YYYY
Time Format: 12 hour
Currency: USD
Currency Symbol: $
```

---

## ⚡ Feature Flags

### AI Features:
- ✅ **Enable**: Smart teacher matching, recommendations
- ❌ **Disable**: Manual matching only

### Chat System:
- ✅ **Enable**: Real-time messaging
- ❌ **Disable**: Email communication only

### Video Call:
- ✅ **Enable**: Online classes, video meetings
- ❌ **Disable**: In-person or phone only

### File Sharing:
- ✅ **Enable**: Document upload/download
- ❌ **Disable**: No file sharing
- **Max Size**: 10 MB (recommended)
- **Allowed Types**: `pdf,doc,docx,jpg,png,jpeg`

---

## ⚙️ System Configuration

### Performance Settings:

| Setting | Recommended | Notes |
|---------|-------------|-------|
| Caching | ✅ Enabled | Faster load times |
| Debug Mode | ❌ Disabled | Production only |
| API Rate Limit | 100/min | Adjust based on traffic |
| Max Concurrent Users | 1000 | Increase as needed |
| Performance Monitoring | ✅ Enabled | Track issues |

### When to Enable Debug Mode:
- ✅ Development environment
- ✅ Testing new features
- ✅ Troubleshooting issues
- ❌ Production (never!)

---

## 🚨 Troubleshooting Quick Fixes

### Email Not Sending:
```
1. Check SMTP credentials
2. Verify port (587 for TLS)
3. Enable "Less secure apps" (Gmail)
4. Test with "টেস্ট ইমেইল পাঠান"
5. Check spam folder
```

### SMS Not Working:
```
1. Verify API key
2. Check SMS balance
3. Confirm Sender ID approved
4. Test with "টেস্ট এসএমএস পাঠান"
5. Contact provider support
```

### Settings Not Saving:
```
1. Check internet connection
2. Refresh page
3. Clear browser cache
4. Try different browser
5. Check browser console for errors
```

### Backup Failed:
```
1. Check Supabase connection
2. Verify storage permissions
3. Check available space
4. Try manual backup
5. Contact support
```

---

## 📊 Monitoring & Alerts

### What to Monitor:

| Metric | Check Frequency | Alert Threshold |
|--------|----------------|-----------------|
| SMS Balance | Daily | < 100 messages |
| Server Uptime | Real-time | < 99% |
| Database Size | Weekly | > 80% capacity |
| Backup Status | Daily | Failed backup |
| Error Rate | Real-time | > 1% requests |

### Activity Logs:
- Check daily for unusual activity
- Review weekly for patterns
- Export monthly for records
- Location: Settings → Activity Logs tab

---

## 🔐 Security Checklist

### Daily:
- [ ] Review activity logs
- [ ] Check failed login attempts
- [ ] Monitor system alerts

### Weekly:
- [ ] Review user access
- [ ] Check security settings
- [ ] Verify backup status

### Monthly:
- [ ] Update passwords
- [ ] Audit user permissions
- [ ] Review security policies
- [ ] Test disaster recovery

### Quarterly:
- [ ] Full security audit
- [ ] Update documentation
- [ ] Train admin staff
- [ ] Review compliance

---

## 📱 Mobile Admin Tips

### Using Settings on Mobile:
1. Tabs will scroll horizontally
2. Use portrait mode for forms
3. Landscape for data tables
4. Touch targets are optimized
5. All features accessible

### Mobile Shortcuts:
- **Swipe**: Navigate tabs
- **Long press**: Quick actions
- **Pull down**: Refresh data
- **Pinch**: Zoom tables (if needed)

---

## 🆘 Emergency Procedures

### If Platform Goes Down:
1. Enable Maintenance Mode
2. Check System Configuration tab
3. Review error logs
4. Contact tech support
5. Use backup if needed

### If Settings Are Lost:
1. Use Import function
2. Load from last export
3. Restore from backup
4. Reconfigure manually
5. Document changes

### If Hacked/Compromised:
1. **Immediately** disable all access
2. Change all passwords
3. Enable 2FA
4. Review activity logs
5. Contact security team
6. Restore from clean backup

---

## 💡 Pro Tips

### Best Practices:
1. ✅ Export settings weekly
2. ✅ Test before production changes
3. ✅ Document all major changes
4. ✅ Keep activity logs
5. ✅ Regular security audits

### Efficiency Tips:
1. Use keyboard shortcuts
2. Bookmark Settings page
3. Use browser autofill for repeated inputs
4. Set reminders for regular tasks
5. Create settings templates (export/import)

### Avoid Common Mistakes:
1. ❌ Don't disable backups
2. ❌ Don't use weak passwords
3. ❌ Don't ignore security warnings
4. ❌ Don't forget to test email/SMS
5. ❌ Don't skip activity log review

---

## 📞 Support Contacts

### Technical Issues:
- 📧 Email: support@talenttutor.com
- 📱 Phone: +880 1234-567890
- 💬 Chat: Available in dashboard
- 🎫 Ticket: Support System page

### Emergency Contact:
- 🚨 24/7 Hotline: +880 1234-567890
- 📧 Emergency Email: emergency@talenttutor.com

---

## 📚 Additional Resources

### Documentation:
- 📖 Full Guide: `/ADMIN_DASHBOARD_ADVANCED_SETTINGS_GUIDE.md`
- 📖 Summary: `/ADMIN_SETTINGS_ENHANCEMENT_SUMMARY.md`
- 📖 API Docs: `/API_DOCUMENTATION.md`
- 📖 Developer Guide: `/DEVELOPER_GUIDE.md`

### Video Tutorials:
- 🎥 Settings Overview (Coming soon)
- 🎥 Email Configuration (Coming soon)
- 🎥 Security Best Practices (Coming soon)

---

## ✅ Daily Admin Checklist

### Morning Routine:
- [ ] Check system status
- [ ] Review overnight alerts
- [ ] Check SMS balance
- [ ] Review new registrations
- [ ] Check backup status

### Throughout Day:
- [ ] Monitor activity logs
- [ ] Respond to tickets
- [ ] Process approvals
- [ ] Check notifications

### Evening Routine:
- [ ] Review day's activity
- [ ] Export settings (if changed)
- [ ] Check scheduled tasks
- [ ] Plan next day
- [ ] Log out securely

---

## 🎯 Quick Command Reference

### Keyboard Shortcuts (Coming Soon):
```
Ctrl/Cmd + S  : Save current settings
Ctrl/Cmd + E  : Export settings
Ctrl/Cmd + I  : Import settings
Ctrl/Cmd + T  : Test feature
Ctrl/Cmd + L  : View activity logs
```

---

## 📝 Notes Section

### Use this space for your custom notes:

```
Date: ___________

Custom Settings:
- 
- 
- 

Important Contacts:
- 
- 

Backup Schedule:
- 

Todo:
- 
- 
- 
```

---

**এই quick reference guide সবসময় হাতের কাছে রাখুন! 📌**

*Version: 1.0 | Last Updated: November 10, 2025*
