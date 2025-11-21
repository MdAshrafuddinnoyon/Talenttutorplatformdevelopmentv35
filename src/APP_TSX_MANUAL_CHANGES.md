# App.tsx Manual Changes Required

## 🔧 Changes Needed

### 1. Add Import Statement (Line 62-63)
After line 62:
```typescript
import { AdminTestingPage } from "./pages/AdminTestingPage";
```

Add this new line:
```typescript
import { AllSubjectsPage } from "./pages/AllSubjectsPage";
```

### 2. Add to Page Type (Line 81-82)
After line 81:
```typescript
  | "find-teachers"
```

Add this new line:
```typescript
  | "all-subjects"
```

### 3. Add Route Case (After line 550)
After the `find-teachers` case block (around line 550), add:

```typescript
      case "all-subjects":
        return (
          <AllSubjectsPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
          />
        );
```

## 📝 Complete Example

### Before (Line 534-551):
```typescript
      case "find-teachers":
        return (
          <FindTeachersPage
            language={language}
            setLanguage={setLanguage}
            setPage={navigateToPage}
            announcement={announcement}
            userRole={userType}
            currentUser={currentUser as any}
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onSelectTeacher={(teacherId) => {
              setSelectedTeacherId(teacherId);
              setCurrentPage("teacher-profile-view");
            }}
          />
        );
      case "about":
```

### After:
```typescript
      case "find-teachers":
        return (
          <FindTeachersPage
            language={language}
            setLanguage={setLanguage}
            setPage={navigateToPage}
            announcement={announcement}
            userRole={userType}
            currentUser={currentUser as any}
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onSelectTeacher={(teacherId) => {
              setSelectedTeacherId(teacherId);
              setCurrentPage("teacher-profile-view");
            }}
          />
        );
      case "all-subjects":
        return (
          <AllSubjectsPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
          />
        );
      case "about":
```

## ✅ Verification

After making these changes:
1. Check that there are no TypeScript errors
2. Navigate to HomePage
3. Click "সব বিষয় দেখুন" button
4. Verify AllSubjectsPage loads correctly

---
**Status**: Manual implementation required
**Priority**: High
**Estimated Time**: 2-3 minutes
