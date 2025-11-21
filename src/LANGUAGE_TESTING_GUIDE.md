# 🧪 Multi-Language System - Testing Guide

## Complete Testing Checklist for English/Bengali Language System

---

## 🎯 Pre-Testing Setup

### Clear Browser State
```javascript
// Open browser console (F12) and run:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

This ensures you're testing from a clean state.

---

## ✅ Test Cases

### Test 1: Default Language on First Visit

**Steps:**
1. Clear browser storage (see above)
2. Visit the Talent Tutor website
3. Observe the initial language

**Expected Result:**
- ✅ Website loads in **English**
- ✅ Logo text is "Talent Tutor"
- ✅ Navigation menu is in English (Home, Find Teachers, etc.)
- ✅ All buttons and text are in English
- ✅ Font is Libre Franklin (sans-serif, professional)

**Pass Criteria:** All content is in English on first load

---

### Test 2: Header Language Switcher

**Steps:**
1. Load website (should be in English)
2. Look for 🌐 globe icon in header (top right area)
3. Click the globe icon
4. Select "বাংলা" from dropdown

**Expected Result:**
- ✅ Dropdown opens showing:
  - English (with native name "English")
  - বাংলা (with native name "বাংলা")
- ✅ After selecting বাংলা:
  - All text immediately changes to Bengali
  - Font changes to Noto Serif Bengali (serif style)
  - Header navigation shows: হোম, শিক্ষক খুঁজুন, etc.
  - Globe icon now shows "বাংলা" or "বাং"

**Pass Criteria:** Language switches instantly with visual feedback

---

### Test 3: Settings Page Language Selector

**Steps:**
1. Navigate to Settings page (Settings → Preferences)
2. Look for "Language Preference" or "ভাষা" section
3. Observe the language cards
4. Click on a language card (English or বাংলা)

**Expected Result:**
- ✅ Two beautiful cards displayed:
  - **English Card**: 
    - Shows "English" and native name
    - Has visual indicator if selected
    - Libre Franklin font preview
  - **বাংলা Card**:
    - Shows "Bengali" and "বাংলা"
    - Has visual indicator if selected
    - Noto Serif Bengali font preview
- ✅ Selected card has green gradient background
- ✅ Clicking switches entire website language
- ✅ Help text shows below in selected language

**Pass Criteria:** Settings page provides full language control

---

### Test 4: Language Persistence

**Steps:**
1. Select English language
2. Refresh the page (F5)
3. Close and reopen browser
4. Visit website again

**Expected Result:**
- ✅ Website remembers English selection
- ✅ Loads in English after refresh
- ✅ Loads in English after browser restart

**Then:**
5. Switch to বাংলা
6. Refresh page
7. Close and reopen browser

**Expected Result:**
- ✅ Website remembers Bengali selection
- ✅ Loads in Bengali after refresh
- ✅ Loads in Bengali after browser restart

**Pass Criteria:** Language choice persists across sessions

---

### Test 5: Font Switching

**Steps:**
1. Load website in English
2. Inspect any text element (right-click → Inspect)
3. Check computed font-family in browser DevTools
4. Switch to বাংলা
5. Check font-family again

**Expected Result:**
- ✅ **English Mode:**
  - Font: "Libre Franklin", sans-serif
  - Professional, clean appearance
  - Good readability
- ✅ **Bengali Mode:**
  - Font: "Noto Serif Bengali", serif
  - Traditional Bengali script appearance
  - Excellent Bengali readability
  - Proper Bengali character rendering

**Pass Criteria:** Fonts switch correctly and render beautifully

---

### Test 6: Mobile Responsiveness

**Steps:**
1. Open website on mobile device (or use DevTools mobile view)
2. Observe language switcher in mobile menu
3. Test language switching
4. Check font rendering

**Expected Result:**
- ✅ Globe icon visible on mobile
- ✅ Language dropdown accessible
- ✅ Easy to tap and select language
- ✅ Text remains readable
- ✅ Fonts render properly on mobile

**Pass Criteria:** Works perfectly on mobile devices

---

### Test 7: All Settings Translations

**Steps:**
1. Go to Settings page
2. Switch between English and Bengali
3. Check all tabs: Account, Notifications, Privacy, Security, Preferences

**Expected Result:**
- ✅ All tab names translate
- ✅ All labels translate
- ✅ All buttons translate
- ✅ All help text translates
- ✅ All placeholder text translates
- ✅ Success/error messages translate

**Pass Criteria:** Complete translation coverage in Settings

---

### Test 8: Navigation and Common Elements

**Steps:**
1. Test language switching on:
   - Header navigation
   - Footer links
   - Dashboard sidebar
   - Notification messages
   - Button labels
   - Form labels

**Expected Result:**
- ✅ All common UI elements translate
- ✅ Consistent terminology across pages
- ✅ No untranslated text visible
- ✅ Proper grammar in both languages

**Pass Criteria:** Consistent translations everywhere

---

### Test 9: Dashboard Translation

**Steps:**
1. Login as any user type
2. Access dashboard
3. Switch language
4. Check all dashboard elements

**Expected Result:**
- ✅ Dashboard title translates
- ✅ Menu items translate
- ✅ Stats and numbers display correctly
- ✅ Action buttons translate
- ✅ Chart labels translate (if any)

**Pass Criteria:** Full dashboard translation

---

### Test 10: Error Handling

**Steps:**
1. Test various scenarios:
   - Invalid localStorage value
   - Corrupted language preference
   - Missing translation keys

**Expected Result:**
- ✅ System gracefully falls back to English
- ✅ No console errors
- ✅ User can still switch language manually
- ✅ System self-heals and continues working

**Pass Criteria:** Robust error handling

---

## 🎨 Visual Quality Checks

### English Mode Checklist
- [ ] Text is crisp and readable
- [ ] Libre Franklin font loads properly
- [ ] Line heights are appropriate
- [ ] Letter spacing is correct
- [ ] All text is properly aligned
- [ ] No font rendering issues

### Bengali Mode Checklist
- [ ] Bengali text renders perfectly
- [ ] Noto Serif Bengali font loads properly
- [ ] All Bengali characters display correctly
- [ ] No character overlap or spacing issues
- [ ] Matras (vowel marks) render properly
- [ ] Conjunct characters display correctly
- [ ] Line heights accommodate Bengali text
- [ ] Text is highly readable

---

## 🐛 Common Issues to Check

### Issue 1: Language Not Persisting
**Check:**
```javascript
// In browser console
localStorage.getItem('app_language')
// Should return 'en' or 'bn'
```

**Fix:** Verify App.tsx useEffect is setting localStorage

---

### Issue 2: Font Not Switching
**Check:**
```javascript
// In browser console
document.documentElement.lang
document.body.lang
// Should return 'en' or 'bn'
```

**Fix:** Verify HTML lang attribute is being set

---

### Issue 3: Missing Translations
**Check:** Look for English text when Bengali is selected (or vice versa)

**Fix:** Add missing keys to `/utils/translations.ts`

---

### Issue 4: Layout Breaking
**Check:** Bengali text might be longer than English

**Fix:** Ensure flexible layouts with proper wrapping

---

## 📊 Test Results Template

```
=== Multi-Language Testing Results ===

Date: ___________
Tester: ___________
Browser: ___________

Test 1 - Default Language: [ PASS / FAIL ]
Test 2 - Header Switcher:  [ PASS / FAIL ]
Test 3 - Settings Page:    [ PASS / FAIL ]
Test 4 - Persistence:      [ PASS / FAIL ]
Test 5 - Font Switching:   [ PASS / FAIL ]
Test 6 - Mobile:          [ PASS / FAIL ]
Test 7 - Settings Trans:   [ PASS / FAIL ]
Test 8 - Navigation:       [ PASS / FAIL ]
Test 9 - Dashboard:        [ PASS / FAIL ]
Test 10 - Error Handling:  [ PASS / FAIL ]

Visual Quality:
- English Mode: [ PASS / FAIL ]
- Bengali Mode: [ PASS / FAIL ]

Overall Status: [ APPROVED / NEEDS FIXES ]

Notes:
_________________________________
_________________________________
```

---

## 🎯 Automated Testing (Optional)

### Jest Test Example
```javascript
describe('Language System', () => {
  test('should default to English', () => {
    localStorage.clear();
    // Test implementation
    expect(getLanguage()).toBe('en');
  });

  test('should persist language choice', () => {
    setLanguage('bn');
    expect(localStorage.getItem('app_language')).toBe('bn');
  });
});
```

---

## 🎉 Sign-Off Checklist

Before considering the system production-ready:

- [ ] All 10 test cases pass
- [ ] Visual quality is excellent in both languages
- [ ] No console errors during language switching
- [ ] Performance is smooth (no lag during switch)
- [ ] Works on Chrome, Firefox, Safari
- [ ] Works on mobile devices
- [ ] localStorage persistence verified
- [ ] Font rendering perfect in both languages
- [ ] Documentation is complete
- [ ] All team members trained

---

## 📞 Report Issues

If you find any issues:
1. Document the exact steps to reproduce
2. Include browser/device information
3. Take screenshots if visual issue
4. Check browser console for errors
5. Verify localStorage state
6. Test in incognito/private mode

---

**Last Updated:** November 2025
**Version:** 1.0.0
**Status:** Ready for Testing
