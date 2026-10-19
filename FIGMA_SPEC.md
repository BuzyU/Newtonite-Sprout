# Sprout 2.0 - Figma Design System & Frame Specification

> **Note on Tooling:** A native `.fig` binary file cannot be generated headlessly without proprietary Figma desktop software or active authenticated user account credentials. This document provides the complete, production-grade Figma specification—including token hierarchy, component component-property variants, frame dimensions, Auto Layout rules, constraints, and exact UI copy—enabling 1-to-1 recreation in Figma.

---

## 1. Global Tokens & Styles Setup

### A. Color Styles (Figma Local Variables / Styles)

| Style Name | Value | Purpose |
| :--- | :---: | :--- |
| `Color/Brand/Forest-Primary` | `#11382B` | Core brand color; Primary CTAs, main headings |
| `Color/Brand/Forest-Light` | `#1B4D3E` | Button hover and pressed states |
| `Color/Brand/Forest-Deep` | `#0A241B` | Active pressed borders, status bar notch |
| `Color/Brand/Cream-Bg` | `#FDFBF7` | Canvas background; reduced glare for low-end screens |
| `Color/Brand/Cream-Surface` | `#F6F1EA` | Secondary surface, card inner containers |
| `Color/Brand/Surface-White` | `#FFFFFF` | Card surfaces, modal sheets |
| `Color/Accent/Marigold` | `#D97706` | Brand warm accent, badges, cheek blush |
| `Color/Accent/Marigold-Dark` | `#92400E` | High-contrast accent text on white/cream (5.2:1) |
| `Color/Accent/Marigold-Subtle`| `#FEF3C7` | Tag backgrounds, referral strip |
| `Color/Text/Primary` | `#18221D` | Main body copy, form labels (15.8:1) |
| `Color/Text/Secondary` | `#3F4E46` | Subtitles, descriptions, disclaimers (8.5:1) |
| `Color/Text/Muted` | `#55655D` | Footnotes, helper text, captions (6.0:1) |
| `Color/Border/Subtle` | `#E5DFD7` | Card borders, dividers |
| `Color/Border/Default` | `#D1C9BE` | Input outlines, inactive buttons |
| `Color/Border/Strong` | `#8B9890` | Stepper inactive pills, phone bezel |
| `Color/Feedback/Success-Text` | `#166534` | Verification completed text |
| `Color/Feedback/Success-Bg` | `#F0FDF4` | Success banner fill |
| `Color/Feedback/Warning-Text` | `#9C3218` | Human error text, compliance alerts |
| `Color/Feedback/Warning-Bg` | `#FDF1EE` | Error banner fill |

---

### B. Typography Styles

| Text Style | Font Family | Size | Line Height | Weight | Letter Spacing |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `Heading/H1-Desktop` | Charter, serif | 44px | 52px (118%) | Bold (700) | -0.02em |
| `Heading/H1-Mobile` | Charter, serif | 32px | 38px (118%) | Bold (700) | -0.02em |
| `Heading/H2` | Charter, serif | 28px | 35px (125%) | Bold (700) | -0.01em |
| `Heading/H3` | Charter, serif | 24px | 31px (130%) | SemiBold (600) | 0 |
| `Heading/H4` | Charter, serif | 20px | 28px (140%) | SemiBold (600) | 0 |
| `Body/Lead` | Inter / SF Pro / Roboto | 18px | 27px (150%) | Regular (400) | 0 |
| `Body/Default` | Inter / SF Pro / Roboto | 16px | 25px (155%) | Regular (400) | 0 |
| `Body/Default-Bold` | Inter / SF Pro / Roboto | 16px | 25px (155%) | SemiBold (600) | 0 |
| `Body/Small` | Inter / SF Pro / Roboto | 14px | 21px (150%) | Medium (500) | 0 |
| `Body/Disclaimer` | Inter / SF Pro / Roboto | **13px** | **20px (150%)** | Regular (400) | 0 |
| `Caption/Tiny` | Inter / SF Pro / Roboto | 12px | 17px (140%) | SemiBold (600) | +0.02em |

---

## 2. Core Reusable Component Library

### 1. Primary Action Button (`Component/Button/Primary`)
- **Auto Layout:** Horizontal, Hug contents (or Fill container on mobile).
- **Padding:** Top/Bottom 14px, Left/Right 28px.
- **Corner Radius:** 9999px (Full pill).
- **Fill:** `Color/Brand/Forest-Primary`.
- **Text:** `Body/Default-Bold`, Fill: `Color/Brand/Surface-White`.
- **Minimum Touch Target:** Height $\ge 44\text{px}$.

### 2. Regulatory Risk Disclaimer (`Component/Compliance/DisclaimerBox`)
- **Auto Layout:** Horizontal, Fill container width.
- **Padding:** 12px 14px.
- **Corner Radius:** 8px.
- **Fill:** `Color/Brand/Surface-White`.
- **Stroke:** Left border 3px solid `Color/Brand/Forest-Primary`; others 1px solid `Color/Border/Subtle`.
- **Icon:** `shield.svg`, 16x16px, Fill: `Color/Text/Muted`.
- **Text:** `Body/Disclaimer` (13px), Fill: `Color/Text/Secondary`.

### 3. Stepper Progress Pill (`Component/Stepper/Indicator`)
- **Auto Layout:** Horizontal, Gap: 6px, Alignment: Center.
- **Variant 1 (Active):** Width: 28px, Height: 4px, Radius: 2px, Fill: `Color/Brand/Forest-Primary`.
- **Variant 2 (Completed):** Width: 18px, Height: 4px, Radius: 2px, Fill: `Color/Feedback/Success-Text`.
- **Variant 3 (Default):** Width: 18px, Height: 4px, Radius: 2px, Fill: `Color/Border/Default`.
- **Label:** `Caption/Tiny`, Fill: `Color/Text/Secondary`, Content: `"1/5"`.

### 4. Selection Radio Card (`Component/Card/GoalRadio`)
- **Auto Layout:** Horizontal, Fill container width, Gap: 12px, Padding: 14px 16px.
- **Corner Radius:** 12px.
- **Default State:** Fill: `Color/Brand/Surface-White`, Stroke: 1.5px solid `Color/Border/Default`.
- **Selected State:** Fill: `#F0F6F2`, Stroke: 1.5px solid `Color/Brand/Forest-Primary`.
- **Radio Indicator:** 18x18px circle with 8px inner dot when active.

### 5. Ankur Mascot Component (`Component/Mascot/Ankur`)
- **Component Properties:**
  - `pose`: `Neutral` | `Waving` | `Thinking` | `Checklist` | `Reassured` | `Celebrating`
  - `size`: `Small` (32px) | `Medium` (64px) | `Large` (88px)
- **Vectors:** Direct SVG paste from `assets/mascot/*.svg`.

---

## 3. Screen Frames & Layout Specifications

### FRAME 1: Homepage - Mobile Viewport
- **Frame Dimensions:** `360px` width $\times$ `2400px` height (Clip content: Off).
- **Background:** `Color/Brand/Cream-Bg`.
- **Layout Hierarchy (Vertical Auto Layout, Gap: 0):**
  1. **Sticky Header:** Width: Fill, Height: 56px, Padding: 12px 16px, Space-between. Contains Logo (130x32px) and Language Toggle button.
  2. **Hero Section (First Viewport - 740px height):**
     - Padding: 20px 16px 16px.
     - Top Badge: Ankur Waving (44x44px) + "Hi, I'm Ankur. Welcome to Sprout" pill.
     - Title: "Start small. Learn as you grow." (`Heading/H1-Mobile`, 32px).
     - Subline: "Invest your first ₹100 in diversified funds. No minimum lock-ins, no complicated jargon."
     - CTAs: Primary Button ("Start with ₹100") + Secondary Link ("How Sprout works ↓").
     - **Mandatory Disclaimer Box:** Pinned inside the first 740px viewport. Copy: *"Investments in mutual funds and securities are subject to market risks and can lose value. Past performance is not an indicator of future returns. [verify with Compliance]"*
  3. **Section 2: Reassurance Grid:** Vertical stack, Gap: 16px, 3 cards with SVGs (`start-tiny.svg`, `see-what-you-own.svg`, `help-in-language.svg`).
  4. **Section 3: Vertical Journey Stepper:** 4 step cards connected by 2px vertical guide stroke (`#BAC2BA`). Time tags: `~1 min`, `~2 mins`, `~3 mins`, `~1 min`.
  5. **Section 4: Illustrative Example:** Card with breakdown rows (Nifty 50: ₹50, Bonds: ₹30, Growth: ₹20) + Video preview poster card.
  6. **Section 5: Trust Credentials:** 3 placeholder rows with Shield/Lock/Building icons.
  7. **Section 6: FAQ Accordion:** 4 `<details>` style card rows with chevron icons.
  8. **Section 7: Final CTA & Footer:** Dark green box + Quiet referral strip + Full disclaimer + Assignment notice.
  9. **Sticky Bottom Mobile Bar:** Position: Fixed bottom, Padding: 12px 16px 24px, Fill: `Color/Brand/Cream-Bg` 98% opacity.

---

### FRAME 2: Homepage - Desktop Viewport
- **Frame Dimensions:** `1280px` width $\times$ `3200px` height.
- **Grid Layout:** 12-column grid, max-width 1200px, 72px columns, 24px gutters, center-aligned.
- **Key Differences from Mobile:**
  - 2-Column Hero layout: Left column (copy + CTAs + disclaimer, 600px width), Right column (interactive portfolio preview card, 340px width).
  - Reassurance Cards: 3-column horizontal grid (`grid-template-columns: repeat(3, 1fr)`).
  - Trust Credentials: 3-column horizontal grid.
  - Sticky mobile CTA hidden.

---

### FRAME 3: Onboarding Screen 1 - Welcome (360x800)
- **Frame Dimensions:** `360px` width $\times$ `800px` height.
- **Top Bar:** Back button (hidden), Stepper (1/5 active), Lang Toggle.
- **Header Block:** Ankur Waving mascot (64x64px), Title: *"Hi, I'm Ankur"*, Subtitle: *"I'm your guide at Sprout. We help you take your very first step in investing, starting with just ₹100."*
- **Content Card:** Ordered list of 4 steps + Time estimate badge (`Total time: about 7 minutes`).
- **First Viewport Disclaimer:** *"Investments can lose value. No minimum lock-in. [verify with Compliance]"*.
- **Bottom Action:** Primary Button *"Get Started"*.

---

### FRAME 4: Onboarding Screen 2 - Intent (360x800)
- **Top Bar:** Back button (visible), Stepper (2/5 active).
- **Header Block:** Ankur Thinking mascot (64x64px), Title: *"What brings you here?"*, Subtitle: *"Pick the option closest to your mind right now. You can change this anytime."*
- **4 Radio Cards:**
  1. Building a rainy day fund
  2. Learning how investing works
  3. Saving for a specific goal
  4. I'm just curious
- **Reassurance Strip:** *"It is completely normal to feel unsure when starting. We take things one step at a time."*
- **Bottom Action:** Primary Button *"Continue"*.

---

### FRAME 5: Onboarding Screen 3 - Keep These Ready (360x800)
- **Top Bar:** Back button, Stepper (3/5 active), Hindi toggle.
- **Header Block:** Ankur Checklist mascot (64x64px), Title: *"Keep these ready"*, Subtitle: *"Identity verification is mandated by financial regulations. Having these three items nearby makes the process smooth."*
- **Badge:** *"Takes about 5 minutes"*.
- **3 Checklist Items:**
  1. *PAN Card* (Tax folio mandate)
  2. *Mobile linked to Aadhaar* (UIDAI OTP verification)
  3. *Bank Account Details* (Account number + IFSC)
- **Bottom Actions:**
  - Primary Button: *"I have them ready"*
  - Secondary Button: *"Remind me later"* (Triggers notification permission drawer).

---

### FRAME 6: Onboarding Screen 4 - Verification & Wait State (360x800)
- **Top Bar:** Back button, Stepper (4/5 active).
- **Sub-stepper:** 1. Phone & OTP (✓), 2. PAN Details (Active), 3. Aadhaar e-KYC.
- **Variant A (Default Input):**
  - Consent Card: *"Why we collect this information... 256-bit security... [verify with Compliance/Legal]"* + Consent Checkbox.
  - Form Input: Label: *"PAN Number"*, Placeholder: `"e.g. ABCDE1234F"`.
  - Button: *"Verify & Continue"*.
- **Variant B (45s In-Progress Wait State):**
  - Mascot: Ankur Reassured (88x88px with gentle pulse halo).
  - Title: *"Checking official records..."*
  - Progress bar (65% fill).
  - Reassurance Note: *"You do not need to stare at this screen. If the agency registry is slow, we will save your progress and notify you via SMS when complete."*
- **Variant C (OTP Delay):** Shows resend timer and WhatsApp/Call options.
- **Variant D (Error State):** Human-friendly non-blaming warning banner.

---

### FRAME 7: Onboarding Screen 5 - First ₹100 & Celebration (360x800)
- **Top Bar:** Back button, Stepper (5/5 active).
- **Variant A (Order Entry):**
  - Mascot: Ankur Celebrating (64x64px).
  - Title: *"Your first ₹100"*.
  - Amount Grid: `₹100` (selected), `₹250`, `₹500`, plus custom input.
  - Risk Warning: *"Market investments fluctuate... [verify with Compliance]"*.
  - Disclaimer Box: Visible in viewport.
  - Button: *"Confirm and Invest ₹100"*.
- **Variant B (Restrained Celebration):**
  - Botanical sprout growth illustration.
  - Heading: *"Your first step is taken"*.
  - Details Card: *"Your order for ₹100 is scheduled for the upcoming market cycle. Units will reflect in 2 business days."*
  - Referral Strip: *"Know someone curious about investing? Share a ₹100 learning credit with a friend."*
