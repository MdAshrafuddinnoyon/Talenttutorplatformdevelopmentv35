# Design Consistency & Multi-Language Implementation Plan

## ✅ Completed Items

### Font System
- ✅ Libre Franklin added as English font
- ✅ Noto Serif Bengali retained for Bengali
- ✅ Responsive typography implemented with clamp()

### Multi-Language Support Status
- ✅ TeacherDashboard - Has multi-language
- ✅ GuardianDashboard - Has multi-language  
- ✅ StudentDashboard - Has multi-language
- ✅ DonorDashboard - Has multi-language
- ❌ AdminDashboard - **NEEDS multi-language**

### Color Palette (Established)
```css
--color-primary-teal: #10B981      /* Primary green/teal */
--color-primary-teal-dark: #059669 /* Primary dark */
--color-secondary-cyan: #06B6D4    /* Secondary accent */
--color-success: #10B981           /* Success states */
--color-emerald: #10B981           /* Emerald for verified */
--color-rose: #F43F5E              /* Donation/urgent */
--color-amber: #F59E0B             /* Featured/premium */
--color-blue: #3B82F6              /* Information */
```

## 🔄 To Do - High Priority

### 1. AdminDashboard Multi-Language
- Add content object with bn/en translations
- Update all UI text to use content[language]
- Ensure sidebar menu uses translations
- Add language switcher in header

### 2. Responsive Typography Verification
- Verify all pages follow new responsive typography
- Check mobile (≤600px), tablet (601-1024px), desktop (≥1025px)
- Ensure line-height: 1.5-1.8 everywhere

### 3. Design Consistency Across Pages
Pages to check for consistency:
- HomePage
- FindTeachersPage
- BrowseTuitionsPage
- DonationPage
- DonationLibrary
- BlogPage
- All profile pages

### 4. Common Design Patterns to Enforce

#### Hero Sections
- Consistent gradient: `bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600`
- White text for hero
- Consistent padding and spacing

#### Card Styles
- Use Card component from shadcn
- Consistent shadow and border-radius
- Hover effects: hover-lift class

#### Buttons
- Primary: btn-primary (teal gradient)
- Secondary: btn-secondary (white with teal border)
- Consistent height and padding
- Icons on left side

#### Badges
- Featured: badge-featured (amber)
- Urgent: badge-urgent (rose)
- Verified: badge-verified (emerald)
- Success: badge-success (teal)

## 📱 Responsive Design Checklist

### Breakpoints (Already Implemented)
- Mobile: ≤600px
- Tablet: 601-1024px
- Desktop: ≥1025px

### Typography Sizes (Already Implemented)
#### Mobile (≤600px)
- h1: 28-32px (clamp(1.75rem, 5vw, 2rem))
- h2: 22-26px (clamp(1.375rem, 4vw, 1.625rem))
- h3: 18-22px (clamp(1.125rem, 3.5vw, 1.375rem))
- p: 16-18px (clamp(1rem, 2.5vw, 1.125rem))

#### Tablet (601-1024px)
- h1: 32-40px (clamp(2rem, 4vw, 2.5rem))
- h2: 26-32px (clamp(1.625rem, 3.5vw, 2rem))
- h3: 22-26px (clamp(1.375rem, 3vw, 1.625rem))
- p: 18-20px (clamp(1.125rem, 2vw, 1.25rem))

#### Desktop (≥1025px)
- h1: 40-56px (clamp(2.5rem, 3.5vw, 3.5rem))
- h2: 32-40px (clamp(2rem, 3vw, 2.5rem))
- h3: 26-32px (clamp(1.625rem, 2.5vw, 2rem))
- p: 18-20px (clamp(1.125rem, 1.5vw, 1.25rem))

## 🎨 Upcoming Tasks

1. Add multi-language to AdminDashboard
2. Verify all pages use consistent color palette
3. Check all hero sections for consistency
4. Standardize all card designs
5. Ensure all buttons follow design system
6. Test responsive design on all breakpoints
7. Verify line-height is 1.5-1.8 everywhere
8. Check font-weight consistency (bold for headers, medium for body)

## 📝 Notes
- All functions must remain intact
- No breaking changes to existing functionality
- Mobile-first approach
- Accessibility (contrast ratio) must be maintained
