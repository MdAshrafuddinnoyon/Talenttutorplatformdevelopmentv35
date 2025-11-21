# Talent Tutor Design System Guide

## 🎨 Typography System

### Font Families
```css
--font-bengali: 'Noto Serif Bengali', serif;
--font-english: 'Libre Franklin', sans-serif;
```

### Responsive Font Sizes

#### Mobile (≤600px)
- **h1**: 28-32px → `clamp(1.75rem, 5vw, 2rem)` | Line-height: 1.3 | Weight: 700
- **h2**: 22-26px → `clamp(1.375rem, 4vw, 1.625rem)` | Line-height: 1.4 | Weight: 600
- **h3**: 18-22px → `clamp(1.125rem, 3.5vw, 1.375rem)` | Line-height: 1.5 | Weight: 600
- **h4**: 16-18px → `clamp(1rem, 3vw, 1.125rem)` | Line-height: 1.5 | Weight: 600
- **h5**: 14-16px → `clamp(0.875rem, 2.5vw, 1rem)` | Line-height: 1.6 | Weight: 500
- **h6**: 12-14px → `clamp(0.75rem, 2vw, 0.875rem)` | Line-height: 1.6 | Weight: 500
- **p**: 16-18px → `clamp(1rem, 2.5vw, 1.125rem)` | Line-height: 1.7

#### Tablet (601-1024px)
- **h1**: 32-40px → `clamp(2rem, 4vw, 2.5rem)` | Line-height: 1.3 | Weight: 700
- **h2**: 26-32px → `clamp(1.625rem, 3.5vw, 2rem)` | Line-height: 1.4 | Weight: 600
- **h3**: 22-26px → `clamp(1.375rem, 3vw, 1.625rem)` | Line-height: 1.5 | Weight: 600
- **h4**: 18-22px → `clamp(1.125rem, 2.5vw, 1.375rem)` | Line-height: 1.5 | Weight: 600
- **h5**: 16-18px → `clamp(1rem, 2vw, 1.125rem)` | Line-height: 1.6 | Weight: 500
- **h6**: 14-16px → `clamp(0.875rem, 1.5vw, 1rem)` | Line-height: 1.6 | Weight: 500
- **p**: 18-20px → `clamp(1.125rem, 2vw, 1.25rem)` | Line-height: 1.7

#### Desktop (≥1025px)
- **h1**: 40-56px → `clamp(2.5rem, 3.5vw, 3.5rem)` | Line-height: 1.2 | Weight: 700
- **h2**: 32-40px → `clamp(2rem, 3vw, 2.5rem)` | Line-height: 1.3 | Weight: 600
- **h3**: 26-32px → `clamp(1.625rem, 2.5vw, 2rem)` | Line-height: 1.4 | Weight: 600
- **h4**: 22-26px → `clamp(1.375rem, 2vw, 1.625rem)` | Line-height: 1.5 | Weight: 600
- **h5**: 18-22px → `clamp(1.125rem, 1.5vw, 1.375rem)` | Line-height: 1.6 | Weight: 500
- **h6**: 16-18px → `clamp(1rem, 1.25vw, 1.125rem)` | Line-height: 1.6 | Weight: 500
- **p**: 18-20px → `clamp(1.125rem, 1.5vw, 1.25rem)` | Line-height: 1.75

## 🎨 Color Palette

### Primary Colors
```css
--color-primary-teal: #10B981       /* Main brand color */
--color-primary-teal-dark: #059669  /* Hover states, dark mode */
```

### Secondary Colors
```css
--color-secondary-cyan: #06B6D4     /* Accent color */
--color-success: #10B981            /* Success states */
--color-emerald: #10B981            /* Verified badges */
```

### Semantic Colors
```css
--color-rose: #F43F5E              /* Donation, urgent, alerts */
--color-amber: #F59E0B             /* Featured, premium */
--color-blue: #3B82F6              /* Information */
```

### Gradients
```css
/* Hero Sections */
.hero-gradient {
  background: linear-gradient(to right, #10B981, #059669, #06B6D4);
}

/* Primary Gradient */
.gradient-primary {
  background: linear-gradient(to right, #10B981, #059669);
}

/* Teal Background Gradients */
.bg-gradient-teal {
  background: linear-gradient(to bottom right, #f0fdfa, #ccfbf1, #99f6e4);
}
```

## 🎨 Button Styles

### Primary Button
```jsx
className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white hover:from-[#059669] hover:to-[#047857] transition-all duration-300"
```
Or use utility class:
```jsx
className="btn-primary"
```

### Secondary Button
```jsx
className="bg-white text-[#10B981] border-2 border-[#10B981] hover:bg-[#10B981] hover:text-white transition-all duration-300"
```
Or use utility class:
```jsx
className="btn-secondary"
```

### Apply/Submit Button
```jsx
className="bg-[#10B981] text-white hover:bg-[#059669] transition-all duration-300"
```
Or use utility class:
```jsx
className="btn-apply"
```

### View Profile Button
```jsx
className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white hover:opacity-90 transition-all duration-300"
```
Or use utility class:
```jsx
className="btn-view-profile"
```

## 🎨 Badge Styles

### Featured Badge
```jsx
className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white"
```
Or use utility class:
```jsx
className="badge-featured"
```

### Urgent Badge
```jsx
className="bg-gradient-to-r from-rose-500 to-rose-600 text-white"
```
Or use utility class:
```jsx
className="badge-urgent"
```

### Verified Badge
```jsx
className="border-emerald-500 text-emerald-700 bg-emerald-50"
```
Or use utility class:
```jsx
className="badge-verified"
```

### Success Badge
```jsx
className="bg-[#10B981] text-white"
```
Or use utility class:
```jsx
className="badge-success"
```

## 🎨 Card Styles

### Standard Card
```jsx
<Card className="hover:shadow-lg transition-shadow duration-300">
  {/* Content */}
</Card>
```

### Card with Hover Lift
```jsx
<Card className="hover-lift">
  {/* Content */}
</Card>
```

### Featured Card
```jsx
<Card className="border-2 border-amber-400 shadow-amber-100 shadow-lg">
  {/* Content */}
</Card>
```

## 🎨 Hero Section Patterns

### Standard Hero
```jsx
<div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white py-12 md:py-16 lg:py-20">
  <div className="container mx-auto px-4">
    <h1 className="text-white mb-4">{title}</h1>
    <p className="text-teal-50 mb-6">{subtitle}</p>
  </div>
</div>
```

### Hero with Search
```jsx
<div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white py-16">
  <div className="container mx-auto px-4 max-w-4xl">
    <h1 className="text-white mb-6 text-center">{title}</h1>
    <div className="bg-white rounded-lg shadow-xl p-2">
      {/* Search component */}
    </div>
  </div>
</div>
```

## 🎨 Section Patterns

### Section Header
```jsx
<div className="text-center mb-12">
  <h2 className="text-gray-900 mb-4">{title}</h2>
  <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
</div>
```

### Section with Gradient Background
```jsx
<div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-16">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</div>
```

## 🎨 Link Styles

### View More Links
```jsx
className="text-[#10B981] hover:text-[#059669] font-medium transition-colors duration-200"
```
Or use utility class:
```jsx
className="link-view-more"
```

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 600px) { }

/* Tablet */
@media (min-width: 601px) and (max-width: 1024px) { }

/* Desktop/Laptop */
@media (min-width: 1025px) { }
```

## 🎨 Spacing System

### Container Padding
- Mobile: `px-4` (1rem)
- Tablet: `px-6` (1.5rem)
- Desktop: `px-8` (2rem)

### Section Padding
- Mobile: `py-8` (2rem)
- Tablet: `py-12` (3rem)
- Desktop: `py-16` (4rem)

### Card Padding
- Standard: `p-6` (1.5rem)
- Compact: `p-4` (1rem)
- Spacious: `p-8` (2rem)

## 🎨 Animation Utilities

### Hover Lift Effect
```jsx
<div className="hover-lift">
  {/* Content lifts on hover */}
</div>
```

### Fade In Animation
```jsx
<div className="animate-fade-in">
  {/* Fades in */}
</div>
```

### Slide Up Animation
```jsx
<div className="animate-slide-up">
  {/* Slides up */}
</div>
```

## 🎨 Multi-Language Support

### Language-Specific Fonts
```jsx
<p className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : 'font-[Libre_Franklin]'}>
  {text}
</p>
```

### Content Object Pattern
```jsx
const content = {
  bn: {
    title: 'শিরোনাম',
    subtitle: 'উপশিরোনাম',
    // ... more translations
  },
  en: {
    title: 'Title',
    subtitle: 'Subtitle',
    // ... more translations
  }
};

// Usage
const t = content[language];
<h1>{t.title}</h1>
```

## 🎨 Icon Usage

### Icon with Text
```jsx
<div className="flex items-center gap-2">
  <IconComponent className="w-5 h-5 text-gray-600" />
  <span>Text</span>
</div>
```

### Icon Button
```jsx
<Button className="gap-2">
  <IconComponent className="w-4 h-4" />
  Button Text
</Button>
```

## ✅ Consistency Checklist

When creating or updating pages, ensure:

1. ✅ Hero sections use `bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600`
2. ✅ Primary buttons use `.btn-primary` or teal gradient
3. ✅ Cards use `.hover-lift` or `.hover:shadow-lg`
4. ✅ Badges use appropriate semantic colors (featured=amber, urgent=rose, verified=emerald)
5. ✅ Typography follows responsive sizing guidelines
6. ✅ Line-height is between 1.5-1.8
7. ✅ Container padding is responsive
8. ✅ Multi-language content object exists
9. ✅ Icons are from lucide-react
10. ✅ Color palette is consistent with design system

## 🎨 Dashboard Design Pattern

### Sidebar
```jsx
<div className="bg-white border-r border-gray-200 h-full">
  {/* Logo */}
  <div className="p-6 border-b">
    <TalentTutorLogo />
  </div>
  
  {/* Navigation */}
  <nav className="p-4 space-y-2">
    {menuItems.map(item => (
      <button className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
        ${active ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'}
      `}>
        <Icon className="w-5 h-5" />
        <span>{item.label}</span>
      </button>
    ))}
  </nav>
</div>
```

### Dashboard Header
```jsx
<div className="bg-white border-b border-gray-200 px-6 py-4">
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-gray-900">{t.welcome}, {userName}</h1>
    </div>
    <div className="flex items-center gap-4">
      {/* Actions */}
    </div>
  </div>
</div>
```

## 📝 Best Practices

1. **Always use utility classes** from globals.css when available
2. **Keep consistent spacing** across similar components
3. **Use semantic colors** - teal for primary, amber for featured, rose for urgent
4. **Implement hover states** for all interactive elements
5. **Ensure responsive design** on all breakpoints
6. **Test with both Bengali and English** content
7. **Maintain accessibility** with proper contrast ratios
8. **Use Motion/Framer Motion** for animations when needed
9. **Keep line-height** between 1.5-1.8 for readability
10. **Follow mobile-first** approach

## 🚀 Quick Reference

### Colors
- Primary: `#10B981`
- Dark: `#059669`
- Accent: `#06B6D4`
- Featured: `#F59E0B`
- Urgent: `#F43F5E`
- Info: `#3B82F6`

### Fonts
- Bengali: Noto Serif Bengali
- English: Libre Franklin

### Breakpoints
- Mobile: ≤600px
- Tablet: 601-1024px
- Desktop: ≥1025px

### Line Heights
- Headings: 1.2-1.5
- Body: 1.5-1.8

This design system ensures consistency across all pages and components of the Talent Tutor platform.
