# 📊 Font Size Usage Report - Talent Tutor Platform

## 🎨 Font Configuration

### **Fonts Used:**
- **English:** Libre Franklin (Sans-serif) - `--font-english`
- **Bengali:** Noto Serif Bengali (Serif) - `--font-bengali`
- **Font Weights:** 400, 500, 600, 700, 800

---

## 📐 Base Font Size Configuration

### **Root Font Size (Base):**
```css
--font-size: 18px (default)
```

### **Responsive Base Font Sizes by Device:**

| Device Type | Screen Width | Base Font Size |
|------------|--------------|----------------|
| Very Small Phone | ≤320px | **14px** |
| Small Mobile | 320px-360px | **16px** |
| Large Mobile | 360px-600px | **17px** |
| Small Tablet | 600px-768px | **18px** |
| Standard Tablet | 768px-1024px | **18px** |
| Laptop | 1024px-1440px | **18px** |
| Large Laptop (1280-1536px) | 1280px-1536px | **15px** |
| Large Desktop | 1440px+ | **19px** |
| Full HD (1920px+) | 1920px+ | **20px** |
| QHD (2560px+) | 2560px+ | **21px** |
| 4K (3840px+) | 3840px+ | **22px** |

---

## 📏 Typography Size Variables

### **Custom Size Variables (CSS Variables):**

```css
--text-xs: 0.875rem    /* 14px → 15.75px at 18px base */
--text-sm: 1rem        /* 16px → 18px */
--text-base: 1.125rem  /* 18px → 20.25px */
--text-lg: 1.25rem     /* 20px → 22.5px */
--text-xl: 1.5rem      /* 24px → 27px */
--text-2xl: 1.875rem   /* 30px → 33.75px */
--text-3xl: 2.25rem    /* 36px → 40.5px */
--text-4xl: 3rem       /* 48px → 54px */
--text-5xl: 3.75rem    /* 60px → 67.5px */
```

---

## 📱 Heading Sizes by Device Type

### **Mobile (≤600px):**

| Element | Font Size Range | Actual Size | Font Weight | Line Height |
|---------|----------------|-------------|-------------|-------------|
| **h1** | clamp(1.75rem, 5vw, 2rem) | 28-32px | 700 | 1.3 |
| **h2** | clamp(1.375rem, 4vw, 1.625rem) | 22-26px | 600 | 1.4 |
| **h3** | clamp(1.125rem, 3.5vw, 1.375rem) | 18-22px | 600 | 1.5 |
| **h4** | clamp(1rem, 3vw, 1.125rem) | 16-18px | 600 | 1.5 |
| **h5** | clamp(0.875rem, 2.5vw, 1rem) | 14-16px | 500 | 1.6 |
| **h6** | clamp(0.75rem, 2vw, 0.875rem) | 12-14px | 500 | 1.6 |
| **p** | clamp(1rem, 2.5vw, 1.125rem) | 16-18px | 400 | 1.7 |

### **Tablet (601px-1024px):**

| Element | Font Size Range | Actual Size | Font Weight | Line Height |
|---------|----------------|-------------|-------------|-------------|
| **h1** | clamp(2rem, 4vw, 2.5rem) | 32-40px | 700 | 1.3 |
| **h2** | clamp(1.625rem, 3.5vw, 2rem) | 26-32px | 600 | 1.4 |
| **h3** | clamp(1.375rem, 3vw, 1.625rem) | 22-26px | 600 | 1.5 |
| **h4** | clamp(1.125rem, 2.5vw, 1.375rem) | 18-22px | 600 | 1.5 |
| **h5** | clamp(1rem, 2vw, 1.125rem) | 16-18px | 500 | 1.6 |
| **h6** | clamp(0.875rem, 1.5vw, 1rem) | 14-16px | 500 | 1.6 |
| **p** | clamp(1.125rem, 2vw, 1.25rem) | 18-20px | 400 | 1.7 |

### **Desktop/Laptop (≥1025px):**

| Element | Font Size Range | Actual Size | Font Weight | Line Height |
|---------|----------------|-------------|-------------|-------------|
| **h1** | clamp(2.5rem, 3.5vw, 3.5rem) | 40-56px | 700 | 1.2 |
| **h2** | clamp(2rem, 3vw, 2.5rem) | 32-40px | 600 | 1.3 |
| **h3** | clamp(1.625rem, 2.5vw, 2rem) | 26-32px | 600 | 1.4 |
| **h4** | clamp(1.375rem, 2vw, 1.625rem) | 22-26px | 600 | 1.5 |
| **h5** | clamp(1.125rem, 1.5vw, 1.375rem) | 18-22px | 500 | 1.6 |
| **h6** | clamp(1rem, 1.25vw, 1.125rem) | 16-18px | 500 | 1.6 |
| **p** | clamp(1.125rem, 1.5vw, 1.25rem) | 18-20px | 400 | 1.75 |

---

## 🎯 Default Element Typography

### **Without Tailwind Classes:**

| Element | Font Size | Font Weight | Line Height |
|---------|-----------|-------------|-------------|
| **h1** | var(--text-2xl) = 1.875rem | 500 | 1.5 |
| **h2** | var(--text-xl) = 1.5rem | 500 | 1.5 |
| **h3** | var(--text-lg) = 1.25rem | 500 | 1.5 |
| **h4** | var(--text-base) = 1.125rem | 500 | 1.5 |
| **p** | var(--text-base) = 1.125rem | 400 | 1.5 |
| **label** | var(--text-base) = 1.125rem | 500 | 1.5 |
| **button** | var(--text-base) = 1.125rem | 500 | 1.5 |
| **input** | var(--text-base) = 1.125rem | 400 | 1.5 |

---

## 🛠️ Utility Classes for Responsive Text

### **Responsive Text Classes:**

```css
.text-responsive-xs     /* clamp(0.75rem, 2vw, 0.875rem) = 12-14px */
.text-responsive-sm     /* clamp(0.875rem, 2.5vw, 1rem) = 14-16px */
.text-responsive-base   /* clamp(1rem, 3vw, 1.125rem) = 16-18px */
.text-responsive-lg     /* clamp(1.125rem, 3.5vw, 1.5rem) = 18-24px */
.text-responsive-xl     /* clamp(1.25rem, 4vw, 2rem) = 20-32px */
.text-responsive-2xl    /* clamp(1.5rem, 5vw, 3rem) = 24-48px */
.text-responsive-3xl    /* clamp(1.875rem, 6vw, 4rem) = 30-64px */
```

---

## 📋 Component-Specific Usage

### **Section Titles:**
```css
.section-title h2 {
  font-size: var(--text-2xl);  /* 1.875rem = 33.75px at 18px base */
  font-weight: var(--font-weight-medium);  /* 500 */
  line-height: 1.4;
}
```

### **Section Descriptions:**
```css
.section-description p {
  font-size: var(--text-base);  /* 1.125rem = 20.25px at 18px base */
  line-height: 1.6;
}
```

### **Mobile Specific:**
```css
.mobile-text-sm {
  font-size: 0.875rem !important;  /* 14px */
}
```

---

## 🎨 Special Contexts

### **Buttons on Mobile:**
- **Minimum Height:** 44px
- **Minimum Width:** 44px
- **Font Size:** var(--text-base) = 1.125rem

### **Laptop Specific (1280-1536px):**
- **Base Font Size:** 15px (instead of 18px)
- This is optimized for 14-15 inch laptops (1366x768, 1440x900)

---

## 📊 Where Each Size is Used

### **--text-xs (14px → 15.75px):**
- Small badges
- Footnotes
- Tiny labels
- Micro text

### **--text-sm (16px → 18px):**
- Small buttons
- Secondary text
- Form helper text
- Captions

### **--text-base (18px → 20.25px):**
- **Primary usage:**
  - Body paragraphs (p)
  - Form labels
  - Buttons
  - Input fields
  - Navigation links
- **Default for most content**

### **--text-lg (20px → 22.5px):**
- Subheadings (h3)
- Card titles
- Emphasized text
- Large buttons

### **--text-xl (24px → 27px):**
- Section subheadings (h2)
- Feature titles
- Important callouts

### **--text-2xl (30px → 33.75px):**
- Main section headings (h1)
- Page titles
- Hero section headings

### **--text-3xl (36px → 40.5px):**
- Large hero titles
- Landing page headings
- Special emphasis titles

### **--text-4xl (48px → 54px):**
- Extra large hero titles
- Homepage main heading
- Marketing headlines

### **--text-5xl (60px → 67.5px):**
- Mega hero titles
- Special landing pages
- Ultra large displays

---

## 🔍 Font Weight Usage

| Weight | Variable | Usage |
|--------|----------|-------|
| **400** | --font-weight-normal | Body text, paragraphs, inputs |
| **500** | --font-weight-medium | Headings, buttons, labels, emphasis |
| **600** | - | Strong headings (h2, h3, h4 on mobile/tablet) |
| **700** | - | Main titles (h1 on all devices) |
| **800** | - | Extra bold emphasis (rarely used) |

---

## 💡 Important Notes

1. **Dynamic Scaling:** All sizes scale based on the base font size (18px default)
2. **Responsive:** Font sizes automatically adjust across all device types
3. **Clamp Function:** Ensures fluid typography between min and max values
4. **Language Support:** Both Bengali (Noto Serif Bengali) and English (Libre Franklin) fonts
5. **No Tailwind Override:** Unless user specifically requests, base typography applies

---

## 🎯 Best Practices

### **When to Use Each Size:**

1. **Hero Sections:** text-4xl or text-5xl
2. **Page Titles:** text-2xl or text-3xl
3. **Section Headings:** text-xl or text-2xl
4. **Card Titles:** text-lg or text-xl
5. **Body Content:** text-base (default)
6. **Secondary Info:** text-sm
7. **Fine Print:** text-xs

### **Responsive Strategy:**
- Start with base size
- Use clamp() for fluid scaling
- Add breakpoint-specific overrides if needed
- Test on multiple devices

---

## 📱 Device-Specific Container Widths

| Device | Max Width | Padding |
|--------|-----------|---------|
| Mobile (320-600px) | 100% | 0.5-0.75rem |
| Tablet (600-1024px) | 100% | 0.75-1rem |
| Laptop (1024-1440px) | 100% | 1.25-2rem |
| Desktop (1440-1920px) | 1280px | 2rem |
| Full HD (1920px+) | 1536-1800px | 2rem |
| QHD (2560px+) | 2400px | 3rem |
| 4K (3840px+) | 3600px | 4rem |

---

## ✅ Summary

Your Talent Tutor platform uses:
- **9 custom font size variables** (xs to 5xl)
- **Responsive base font** from 14px to 22px
- **6 heading levels** with device-specific sizing
- **Both Bengali and English fonts** with proper weights
- **Fluid typography** using clamp() for smooth scaling
- **Complete responsive system** for all device types

All font sizes are carefully calibrated for **optimal readability** across mobile, tablet, and desktop devices while maintaining **consistent visual hierarchy**.
