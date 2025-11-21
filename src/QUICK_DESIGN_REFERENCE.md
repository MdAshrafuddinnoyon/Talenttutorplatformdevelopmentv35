# Quick Design Reference Card

## 🎨 Colors (Copy-Paste Ready)

```jsx
// Primary Teal
className="bg-[#10B981] text-white"
className="text-[#10B981]"
className="border-[#10B981]"

// Dark Teal (Hover)
className="hover:bg-[#059669]"

// Gradients
className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600"
className="bg-gradient-to-r from-[#10B981] to-[#059669]"
className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50"
```

## 🔘 Buttons

```jsx
// Primary
<Button className="btn-primary">Text</Button>
<Button className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white hover:from-[#059669] hover:to-[#047857]">Text</Button>

// Secondary  
<Button className="btn-secondary">Text</Button>
<Button className="bg-white text-[#10B981] border-2 border-[#10B981] hover:bg-[#10B981] hover:text-white">Text</Button>

// With Icon
<Button className="btn-primary gap-2">
  <Icon className="w-4 h-4" />
  Text
</Button>
```

## 🏷️ Badges

```jsx
// Featured (Amber)
<Badge className="badge-featured">Featured</Badge>
<Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">Featured</Badge>

// Urgent (Rose)
<Badge className="badge-urgent">Urgent</Badge>
<Badge className="bg-gradient-to-r from-rose-500 to-rose-600 text-white">Urgent</Badge>

// Verified (Emerald)
<Badge className="badge-verified">Verified</Badge>
<Badge className="border-emerald-500 text-emerald-700 bg-emerald-50">Verified</Badge>

// Success (Teal)
<Badge className="badge-success">Success</Badge>
<Badge className="bg-[#10B981] text-white">Success</Badge>
```

## 📦 Cards

```jsx
// Standard
<Card className="hover:shadow-lg transition-shadow duration-300">
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
</Card>

// With Hover Lift
<Card className="hover-lift">
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
</Card>

// Featured Card
<Card className="border-2 border-amber-400 shadow-amber-100 shadow-lg">
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
</Card>
```

## 🎭 Hero Sections

```jsx
// Standard Hero
<div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white py-12 md:py-16 lg:py-20">
  <div className="container mx-auto px-4">
    <h1 className="text-white mb-4">{title}</h1>
    <p className="text-teal-50 mb-6">{subtitle}</p>
  </div>
</div>

// With Search
<div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white py-16">
  <div className="container mx-auto px-4 max-w-4xl">
    <h1 className="text-white mb-6 text-center">{title}</h1>
    <div className="bg-white rounded-lg shadow-xl p-4">
      {/* Search component */}
    </div>
  </div>
</div>
```

## 📝 Typography

```jsx
// Headings (auto responsive)
<h1>{text}</h1>  // 40-56px desktop, 28-32px mobile
<h2>{text}</h2>  // 32-40px desktop, 22-26px mobile
<h3>{text}</h3>  // 26-32px desktop, 18-22px mobile

// With Language Font
<h1 className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : 'font-[Libre_Franklin]'}>
  {text}
</h1>

// Paragraph
<p className="text-gray-600 leading-relaxed">{text}</p>
```

## 🔗 Links

```jsx
// View More Link
<a className="link-view-more">View More →</a>
<a className="text-[#10B981] hover:text-[#059669] font-medium transition-colors">
  View More →
</a>
```

## 📱 Responsive

```jsx
// Container
<div className="container mx-auto px-4">
  {/* Auto responsive padding */}
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>

// Responsive Text Size
<p className="text-sm md:text-base lg:text-lg">
  {/* Scales with screen */}
</p>

// Hide on Mobile
<div className="hidden md:block">
  {/* Desktop only */}
</div>

// Show on Mobile Only
<div className="block md:hidden">
  {/* Mobile only */}
</div>
```

## 🎨 Backgrounds

```jsx
// Gradient Background
<div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
  {/* Light gradient */}
</div>

// Solid
<div className="bg-white">
  {/* White */}
</div>

<div className="bg-gray-50">
  {/* Light gray */}
</div>
```

## ✨ Animations

```jsx
// Hover Lift
<div className="hover-lift">
  {/* Lifts on hover */}
</div>

// Fade In
<div className="animate-fade-in">
  {/* Fades in */}
</div>

// Slide Up
<div className="animate-slide-up">
  {/* Slides up */}
</div>

// Custom Transition
<div className="transition-all duration-300 hover:scale-105">
  {/* Smooth scale */}
</div>
```

## 🌐 Multi-Language

```jsx
// Content Object
const content = {
  bn: {
    title: 'শিরোনাম',
    button: 'বাটন',
  },
  en: {
    title: 'Title',
    button: 'Button',
  }
};

// Usage
export function Component({ language }) {
  const t = content[language];
  
  return (
    <div>
      <h1>{t.title}</h1>
      <Button>{t.button}</Button>
    </div>
  );
}
```

## 📏 Spacing

```jsx
// Padding
className="p-4"    // 1rem
className="p-6"    // 1.5rem
className="p-8"    // 2rem
className="px-4 py-8"  // Horizontal 1rem, Vertical 2rem

// Margin
className="mb-4"   // Bottom 1rem
className="mt-8"   // Top 2rem
className="mx-auto" // Center horizontal

// Gap (Flexbox/Grid)
className="gap-4"  // 1rem gap
className="gap-6"  // 1.5rem gap
```

## 🎯 Common Patterns

```jsx
// Section Header
<div className="text-center mb-12">
  <h2 className="text-gray-900 mb-4">{title}</h2>
  <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
</div>

// Icon with Text
<div className="flex items-center gap-2">
  <Icon className="w-5 h-5 text-gray-600" />
  <span>{text}</span>
</div>

// Status Badge
<div className="flex items-center gap-2">
  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
  <span className="text-sm text-gray-600">Active</span>
</div>

// Card Header
<div className="flex items-center justify-between mb-4">
  <h3>{title}</h3>
  <Badge className="badge-featured">New</Badge>
</div>
```

## 🚀 Quick Start Template

```jsx
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const content = {
  bn: {
    title: 'শিরোনাম',
    subtitle: 'উপশিরোনাম',
    button: 'বাটন',
  },
  en: {
    title: 'Title',
    subtitle: 'Subtitle',
    button: 'Button',
  }
};

export function NewPage({ language, setLanguage, setPage, announcement, onLogin }) {
  const t = content[language];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        setPage={setPage}
        announcement={announcement}
        onLogin={onLogin}
      />
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-white mb-4">{t.title}</h1>
          <p className="text-teal-50 mb-6">{t.subtitle}</p>
          <Button className="btn-primary">{t.button}</Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards */}
        </div>
      </div>
      
      <Footer language={language} setPage={setPage} />
    </div>
  );
}
```

## 📋 Checklist for New Components

- [ ] Multi-language content object created
- [ ] Uses teal color palette (#10B981)
- [ ] Hero section uses teal gradient
- [ ] Buttons use .btn-primary or .btn-secondary
- [ ] Cards have hover effects
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Line-height 1.5-1.8
- [ ] Icons from lucide-react
- [ ] Proper spacing and padding
- [ ] Header and Footer included
- [ ] onLogin prop passed to Header

---

**Keep this reference handy for quick copy-paste while developing!**
