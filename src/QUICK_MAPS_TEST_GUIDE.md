# 🗺️ Quick Google Maps Testing Guide

**API Key**: AIzaSyAJiRPxTVsYUSOcZITAdwJCHnXecH-x79Y  
**Status**: ✅ Updated and Ready to Test

---

## 🚀 Quick Test (5 Minutes)

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Test Maps Demo Page
1. Open browser: `http://localhost:5173`
2. Navigate to: **Maps & Location** (from main menu)
3. Or directly: `http://localhost:5173/maps-location`

### Step 3: Visual Checks ✓
Look for these on the page:

✅ **Interactive Map** displays (not gray box)  
✅ **Teacher markers** show on map (blue pins)  
✅ **Tuition markers** show on map (red pins)  
✅ **Location picker** button works  
✅ **No errors** in browser console (F12)

### Step 4: Test Features
1. **Click "Pick Location" button**
   - Map dialog opens
   - Can click on map to select location
   - Address appears
   
2. **Search for Location**
   - Type "Dhanmondi, Dhaka"
   - Autocomplete suggestions appear
   - Map moves to location

3. **Distance Calculation**
   - Select a location
   - See distances to nearby teachers
   - Distances shown in km

---

## 🔍 Browser Console Check

**Open Console**: Press `F12` → Console tab

### ✅ Expected Messages (Good):
```
✅ "Google Maps loaded successfully"
✅ No red error messages
```

### ❌ Error Messages (Bad):
If you see these, follow the fix:

**Error 1**: `InvalidKeyMapError`
```
Problem: API key is wrong or not enabled
Fix: Check Google Cloud Console → Enable Maps JavaScript API
```

**Error 2**: `ApiNotActivatedMapError`
```
Problem: Required API not enabled
Fix: Enable these APIs in Google Cloud Console:
  - Maps JavaScript API
  - Places API
  - Geocoding API
```

**Error 3**: `RefererNotAllowedMapError`
```
Problem: Domain not whitelisted
Fix: Add to API restrictions:
  - http://localhost:5173/*
  - http://localhost:*
```

---

## 🧪 Feature-by-Feature Testing

### Test 1: Interactive Map Display
**Location**: `/maps-location`

✅ Map loads and displays Dhaka area  
✅ Can zoom in/out  
✅ Can drag/pan the map  
✅ Teacher markers visible  
✅ Tuition markers visible  

---

### Test 2: Location Picker
**Location**: `/maps-location` → Click "Pick Location"

✅ Dialog opens with map  
✅ Can click on map to select  
✅ Selected location shows coordinates  
✅ Can search for places  
✅ Autocomplete works  

---

### Test 3: Teacher Finder Map
**Location**: `/find-teachers` → Click map view

✅ Shows all teachers on map  
✅ Can filter by location  
✅ Clicking marker shows teacher info  
✅ Distance from your location shown  

---

### Test 4: Distance Calculation
**Test Code** (paste in browser console):

```javascript
import { calculateDistance } from './utils/googleMapsConfig';

// Distance between Dhanmondi and Gulshan
const distance = calculateDistance(
  23.7465, 90.3763,  // Dhanmondi
  23.7925, 90.4078   // Gulshan
);

console.log('Distance:', distance, 'km');
// Expected: ~5.5 km
```

✅ Distance calculated correctly  
✅ No errors in console  

---

### Test 5: Geocoding (Address to Coordinates)
**Test Code**:

```javascript
import { geocodeAddress } from './utils/googleMapsConfig';

geocodeAddress('Dhanmondi, Dhaka, Bangladesh')
  .then(location => {
    console.log('Found:', location);
    // Expected: { lat: ~23.74, lng: ~90.37, address: "..." }
  });
```

✅ Returns coordinates  
✅ Address is formatted correctly  

---

### Test 6: Reverse Geocoding (Coordinates to Address)
**Test Code**:

```javascript
import { reverseGeocode } from './utils/googleMapsConfig';

reverseGeocode(23.7465, 90.3763)
  .then(address => {
    console.log('Address:', address);
    // Expected: "Dhanmondi, Dhaka, Bangladesh"
  });
```

✅ Returns address string  
✅ Address is readable  

---

## 📱 Test on Different Devices

### Desktop Browser (Chrome/Firefox/Safari)
- [ ] Map loads correctly
- [ ] All interactions work
- [ ] No performance issues

### Tablet (iPad/Android)
- [ ] Map is responsive
- [ ] Touch gestures work
- [ ] Location picker usable

### Mobile Phone
- [ ] Map displays well
- [ ] Can zoom with pinch
- [ ] Buttons are clickable

---

## ⚙️ Google Cloud Console Setup

### ⚠️ CRITICAL: Before Testing

**You MUST enable these APIs**:

1. **Go to**: https://console.cloud.google.com/
2. **Select**: Your project
3. **Enable** these APIs:

#### Required APIs:
- ✅ **Maps JavaScript API**
  - https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
  
- ✅ **Places API**
  - https://console.cloud.google.com/apis/library/places-backend.googleapis.com
  
- ✅ **Geocoding API**
  - https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com

#### How to Enable:
```
1. Click the API name link above
2. Click "Enable" button
3. Wait 30 seconds
4. Refresh your app
```

---

## 🔒 Setup API Restrictions (Recommended)

### 1. Application Restrictions
**Go to**: Cloud Console → Credentials → Your API Key → Edit

**HTTP Referrers (websites)**:
```
http://localhost:5173/*
http://localhost:*
https://talenttutor.com/*
https://*.talenttutor.com/*
```

### 2. API Restrictions
**Restrict key to these APIs only**:
- Maps JavaScript API
- Places API
- Geocoding API
- Distance Matrix API

### 3. Save Changes
Click "Save" at the bottom

---

## 💰 Check Your Quota

### View API Usage:
1. Go to: Cloud Console → APIs & Services → Dashboard
2. View usage for today
3. Check if you're within free tier

### Free Tier Limits:
- **$200 credit/month** = FREE
- **28,000 map loads/month** = FREE
- **40,000 geocoding requests/month** = FREE

### Set Up Billing Alert:
1. Go to: Billing → Budgets & alerts
2. Create alert at $10, $50, $100
3. Get email notification

---

## 🐛 Troubleshooting

### Problem: Map shows gray box
**Fix**:
1. Check console for errors
2. Verify API key is correct
3. Enable Maps JavaScript API
4. Wait 1-2 minutes after enabling

### Problem: Search not working
**Fix**:
1. Enable Places API
2. Check internet connection
3. Verify API restrictions allow localhost

### Problem: Markers not showing
**Fix**:
1. Check mock data in googleMapsConfig.ts
2. Verify coordinates are valid
3. Check zoom level (should be 11-13)

### Problem: Distance always 0
**Fix**:
1. Verify coordinates are numbers, not strings
2. Check calculateDistance function
3. Test with known locations

---

## ✅ Success Checklist

After testing, you should have:

- [x] ✅ Map loads on `/maps-location`
- [x] ✅ Location picker works
- [x] ✅ Teacher markers visible
- [x] ✅ Distance calculations work
- [x] ✅ Search/autocomplete works
- [x] ✅ No console errors
- [ ] 🔲 APIs enabled in Cloud Console
- [ ] 🔲 API restrictions set up
- [ ] 🔲 Billing account connected
- [ ] 🔲 Usage alerts configured

---

## 📊 Monitor Your Usage

### Daily Check:
```bash
# Check API usage
1. Go to: Cloud Console → APIs & Services → Dashboard
2. Look at "Requests today" for each API
3. Estimate monthly cost
```

### Weekly Check:
```bash
1. Review usage trends
2. Check for unusual spikes
3. Verify costs are within budget
```

---

## 🎯 Next Steps After Testing

### If Everything Works ✅:
1. ✅ Commit changes to git
2. ✅ Deploy to staging environment
3. ✅ Test on production domain
4. ✅ Set up production API restrictions
5. ✅ Monitor usage for first week

### If Something Fails ❌:
1. Check error message in console
2. Verify API is enabled
3. Check API key restrictions
4. Review this troubleshooting guide
5. Check `/GOOGLE_MAPS_API_KEY_UPDATED.md`

---

## 📞 Get Help

### Documentation:
- `/GOOGLE_MAPS_API_KEY_UPDATED.md` - Full update details
- `/GOOGLE_MAPS_IMPLEMENTATION.md` - Implementation guide
- `/BANGLADESH_LOCATION_SYSTEM_IMPLEMENTATION_COMPLETE.md` - Locations

### Google Support:
- [Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript)
- [Troubleshooting Guide](https://developers.google.com/maps/documentation/javascript/error-messages)
- [Community Forum](https://groups.google.com/g/google-maps-js-api-v3)

---

## 🎉 Quick Start Command

**Test everything in 30 seconds**:

```bash
# 1. Start dev server
npm run dev

# 2. Open in browser
# http://localhost:5173/maps-location

# 3. Check console (F12)
# Should see: "Google Maps loaded successfully"

# 4. Test location picker
# Click "Pick Location" button

# 5. Done! ✅
```

---

**Happy Testing! 🗺️✨**

**Last Updated**: November 6, 2025
