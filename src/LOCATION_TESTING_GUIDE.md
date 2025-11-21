# 🧪 Location System Testing Guide

## 🎯 Quick Testing Checklist

এই guide অনুসরণ করে আপনি নিশ্চিত করতে পারবেন যে location system সঠিকভাবে কাজ করছে।

---

## 📍 Test Setup

### Prerequisites:
- ✅ Application running locally or deployed
- ✅ Browser console open (F12 → Console tab)
- ✅ Internet connection active

### Navigation:
1. Navigate to **Maps & Location** page
2. Click on **"Location Picker"** tab
3. Ready to test!

---

## 🧪 Test Case 1: Current Location (Permission Allowed)

### Steps:
1. Click **"বর্তমান অবস্থান"** (Current Location) button
2. Browser will show permission dialog
3. Click **"Allow"** / **"অনুমতি দিন"**

### Expected Results:
```
✅ Loading toast appears: "অবস্থান নির্ণয় করা হচ্ছে..."
✅ Toast changes to success: "অবস্থান নির্বাচিত"
✅ Map moves to your current location
✅ Green marker appears at your location
✅ Address loads automatically
✅ Green badge shows: "অবস্থান নির্বাচিত"
✅ Selected location card displays:
   - Your address
   - Latitude
   - Longitude
```

### Console Output:
```javascript
✓ Google Maps loaded successfully
✓ Location obtained successfully: {lat: 23.xxx, lng: 90.xxx}
✓ Selected location: {lat: 23.xxx, lng: 90.xxx, address: '...'}
```

### Screenshot Verification:
- [ ] Map shows your area
- [ ] Green marker visible
- [ ] Address showing correctly
- [ ] No red errors in console

---

## 🧪 Test Case 2: Current Location (Permission Denied)

### Steps:
1. Click **"বর্তমান অবস্থান"** button
2. Browser shows permission dialog
3. Click **"Block"** / **"ব্লক করুন"**

### Expected Results:
```
✅ Loading toast appears briefly
✅ Error toast appears with message:
   বাংলা: "অবস্থান অ্যাক্সেস অনুমতি দিন। ব্রাউজার সেটিংস থেকে location permission চালু করুন।"
   English: "Please enable location permission in your browser settings"
   
✅ Map stays at default Dhaka location
✅ Manual selection options remain available
✅ No crash or freeze
```

### Console Output:
```javascript
⚠️ User denied geolocation permission
⚠️ Location error: Location permission denied...
```

### Screenshot Verification:
- [ ] Error toast visible
- [ ] Message is clear and helpful
- [ ] App still functional
- [ ] No crash

---

## 🧪 Test Case 3: Address Search

### Steps:
1. Type in search box: **"ধানমন্ডি, ঢাকা"**
2. Press **Enter** or click **Search** button

### Expected Results:
```
✅ "খুঁজছি..." (Searching...) shows on button
✅ Map moves to Dhanmondi area
✅ Green marker placed at location
✅ Success toast: "অবস্থান নির্বাচিত"
✅ Address updates to searched location
✅ Lat/Lng displayed
```

### Test Different Searches:
- [ ] "গুলশান-২, ঢাকা"
- [ ] "Chittagong University"
- [ ] "মিরপুর ১০"
- [ ] "Bashundhara, Dhaka"

### Console Output:
```javascript
Selected location: {lat: 23.746, lng: 90.376, address: 'Dhanmondi, Dhaka'}
```

---

## 🧪 Test Case 4: Map Click Selection

### Steps:
1. Click anywhere on the map

### Expected Results:
```
✅ Green marker jumps to clicked location
✅ Marker has bounce animation
✅ Address starts loading
✅ After 1-2 seconds, address appears
✅ Selected location card updates
✅ Lat/Lng values update
```

### Try Multiple Clicks:
- [ ] Click on different areas
- [ ] Each click updates marker
- [ ] Address updates each time

### Console Output:
```javascript
Selected location: {lat: XX.xxx, lng: YY.yyy, address: 'Loading...'}
Selected location: {lat: XX.xxx, lng: YY.yyy, address: 'Actual Address'}
```

---

## 🧪 Test Case 5: Marker Drag

### Steps:
1. Hover over the green marker
2. Click and hold mouse button
3. Drag to a new location
4. Release mouse button

### Expected Results:
```
✅ Marker moves as you drag
✅ After release, marker bounces
✅ Address starts loading
✅ Map stays centered (may pan slightly)
✅ New address appears
✅ Location info updates
```

### Multiple Drag Test:
- [ ] Drag marker north
- [ ] Drag marker south
- [ ] Drag marker to different areas
- [ ] Each time, address updates

---

## 🧪 Test Case 6: Popular Areas Quick Select

### Steps:
1. Scroll to **"জনপ্রিয় এলাকা"** section
2. Click any area button (e.g., **"ধানমন্ডি"**)

### Expected Results:
```
✅ Map instantly moves to selected area
✅ Marker placed at area center
✅ Success toast: "ধানমন্ডি নির্বাচিত হয়েছে"
✅ Address loads
✅ Location info card updates
```

### Test All Areas:
- [ ] ধানমন্ডি (Dhanmondi)
- [ ] গুলশান (Gulshan)
- [ ] মিরপুর (Mirpur)
- [ ] মোহাম্মদপুর (Mohammadpur)
- [ ] উত্তরা (Uttara)
- [ ] বনানী (Banani)

---

## 🧪 Test Case 7: Timeout Scenario

### Simulate Slow Connection:
1. Open DevTools (F12)
2. Go to **Network** tab
3. Set throttling to **Slow 3G**
4. Click **"বর্তমান অবস্থান"** button
5. Allow permission

### Expected Results:
```
✅ Loading toast shows for up to 10 seconds
✅ If timeout occurs:
   - Error toast appears
   - Message: "বর্তমান অবস্থান পাওয়া যায়নি..."
   - Console: "⚠️ Geolocation request timed out"
✅ Manual options still work
```

---

## 🧪 Test Case 8: Position Unavailable

### Simulate (if possible):
1. Disable GPS/Location Services on device
2. Click **"বর্তমান অবস্থান"**
3. Allow permission

### Expected Results:
```
✅ Error toast appears
✅ Message: "বর্তমান অবস্থান পাওয়া যায়নি..."
✅ Console: "⚠️ Location information is unavailable"
✅ App suggests manual selection
```

---

## 🧪 Test Case 9: Invalid Search

### Steps:
1. Search for: **"xyz123invalid"**
2. Click Search

### Expected Results:
```
✅ Search processes
✅ Error toast: "অবস্থান খুঁজে পাওয়া যায়নি"
✅ Map stays at current position
✅ No crash
✅ Can search again
```

---

## 🧪 Test Case 10: Language Switching

### Steps:
1. Perform any location selection (বাংলা mode)
2. Switch language to English
3. Perform same action

### Expected Results:
```
✅ All UI text changes to English
✅ Error messages in English
✅ Toast notifications in English
✅ Functionality unchanged
✅ Map still works
```

---

## 📊 Browser Compatibility Testing

### Test in Each Browser:

#### Chrome/Chromium:
- [ ] Current location works
- [ ] Permission dialog shows
- [ ] Search works
- [ ] Map interactive
- [ ] No console errors

#### Firefox:
- [ ] All features work
- [ ] Permission prompt appears
- [ ] Marker draggable
- [ ] Address geocoding works

#### Safari (Mac/iOS):
- [ ] Location permission works
- [ ] Map loads correctly
- [ ] Touch gestures work (mobile)
- [ ] No rendering issues

#### Edge:
- [ ] Full functionality
- [ ] No compatibility issues
- [ ] Console clean

---

## 📱 Mobile Testing

### Mobile-Specific Tests:

#### GPS Accuracy:
1. Enable high-accuracy GPS
2. Test current location
3. Should be more accurate than WiFi

#### Touch Gestures:
- [ ] Tap on map selects location
- [ ] Pinch to zoom works
- [ ] Drag marker with finger
- [ ] Smooth animations

#### Responsive UI:
- [ ] Search box fits screen
- [ ] Buttons accessible
- [ ] Map fills viewport
- [ ] Toast notifications visible

---

## 🐛 Error Testing Checklist

### Console Errors to Check:

#### Should NOT See:
- ❌ `Error getting location: {}`
- ❌ `Uncaught TypeError`
- ❌ `Failed to load script`
- ❌ Any red errors (except expected API failures)

#### Should See (when appropriate):
- ✅ `⚠️ User denied geolocation permission` (when denied)
- ✅ `⚠️ Location information is unavailable` (when GPS off)
- ✅ `⚠️ Geolocation request timed out` (on timeout)
- ✅ `✓ Location obtained successfully` (on success)

---

## 📝 Test Report Template

After testing, fill this out:

```markdown
# Location System Test Report

**Date:** _________
**Tester:** _________
**Browser:** _________
**Device:** _________

## Test Results

| Test Case | Status | Notes |
|-----------|--------|-------|
| 1. Permission Allowed | ⬜ Pass / ⬜ Fail | |
| 2. Permission Denied | ⬜ Pass / ⬜ Fail | |
| 3. Address Search | ⬜ Pass / ⬜ Fail | |
| 4. Map Click | ⬜ Pass / ⬜ Fail | |
| 5. Marker Drag | ⬜ Pass / ⬜ Fail | |
| 6. Popular Areas | ⬜ Pass / ⬜ Fail | |
| 7. Timeout | ⬜ Pass / ⬜ Fail / ⬜ N/A | |
| 8. Position Unavailable | ⬜ Pass / ⬜ Fail / ⬜ N/A | |
| 9. Invalid Search | ⬜ Pass / ⬜ Fail | |
| 10. Language Switch | ⬜ Pass / ⬜ Fail | |

## Issues Found
1. 
2. 
3. 

## Screenshots
- [ ] Success scenario
- [ ] Error scenario
- [ ] Mobile view

## Overall Assessment
⬜ Ready for production
⬜ Minor issues
⬜ Major issues

**Notes:**
```

---

## 🎯 Success Criteria

### All Tests Should:
- ✅ Complete without crashes
- ✅ Show appropriate messages
- ✅ Log to console correctly
- ✅ Provide user feedback
- ✅ Work in both languages
- ✅ Gracefully handle errors

### User Experience Should:
- ✅ Be smooth and intuitive
- ✅ Provide clear guidance
- ✅ Offer multiple options
- ✅ Never leave user stuck
- ✅ Feel responsive

---

## 🚨 Red Flags

### Stop Testing If You See:
- 🚨 Application crashes
- 🚨 Infinite loading
- 🚨 Blank screen
- 🚨 Cannot recover from error
- 🚨 Data loss

### Report Immediately If:
- Console shows new unexpected errors
- Permission system breaks
- Map doesn't load at all
- Multiple features fail together

---

## 💡 Testing Tips

### For Best Results:
1. **Clear Cache:** Start with fresh cache
2. **Console Open:** Always keep console visible
3. **Take Notes:** Document unexpected behavior
4. **Screenshot:** Capture errors immediately
5. **Test Variations:** Try different inputs
6. **Multiple Browsers:** Don't test just one
7. **Mobile Too:** Test on actual devices

### Common Pitfalls:
- Don't test without internet
- Don't skip permission scenarios
- Don't forget language switching
- Don't ignore console warnings

---

## ✅ Final Checklist

Before marking as complete:

- [ ] All 10 test cases executed
- [ ] Tested in at least 2 browsers
- [ ] Mobile testing done
- [ ] Console logs verified
- [ ] Error messages checked
- [ ] Language switching tested
- [ ] No critical issues found
- [ ] Documentation reviewed
- [ ] Screenshots taken
- [ ] Test report filled

---

## 📞 Need Help?

### Resources:
- **User Guide:** MAPS_LOCATION_QUICK_GUIDE.md
- **Troubleshooting:** LOCATION_ERROR_FIX_GUIDE.md
- **Technical:** LOCATION_FIX_SUMMARY.md

### If Tests Fail:
1. Check documentation first
2. Verify setup (API key, internet)
3. Try different browser
4. Clear cache and retry
5. Check console for clues

---

<div align="center">

# 🧪 Happy Testing! 🧪

**Remember:** Good testing = Better product!

</div>

---

**Testing Guide Version:** 1.0  
**Last Updated:** November 7, 2025  
**Compatible With:** Location System v1.3.1
