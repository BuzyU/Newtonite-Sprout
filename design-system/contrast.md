# Sprout Design System - Color Contrast Audit

> **Standard:** WCAG 2.1 Level AA (4.5:1 for normal body text >= 16px and disclaimers >= 12px; 3.0:1 for large text >= 24px and essential UI components).
> Generated automatically via `tools/contrast-check.js` using exact sRGB relative luminance mathematical calculations.

## Computed Contrast Ratios

| Use Case | Foreground | Background | Type | Required | Measured Ratio | WCAG AA | WCAG AAA |
| :--- | :---: | :---: | :--- | :---: | :---: | :---: | :---: |
| Primary Text on Cream Background | `#18221D` | `#FDFBF7` | Body Text (>= 16px) | 4.5:1 | **15.80:1** | PASS | PASS |
| Primary Text on Card White | `#18221D` | `#FFFFFF` | Body Text (>= 16px) | 4.5:1 | **16.33:1** | PASS | PASS |
| Secondary Text on Cream Background | `#3F4E46` | `#FDFBF7` | Body & Lead Text | 4.5:1 | **8.50:1** | PASS | PASS |
| Secondary Text on Card White | `#3F4E46` | `#FFFFFF` | Body & Lead Text | 4.5:1 | **8.78:1** | PASS | PASS |
| Muted Text on Card White | `#55655D` | `#FFFFFF` | Helper / Subtext | 4.5:1 | **6.16:1** | PASS | FAIL |
| Muted Text on Cream Background | `#55655D` | `#FDFBF7` | Helper / Subtext | 4.5:1 | **5.96:1** | PASS | FAIL |
| Primary Button Label on Forest Primary | `#FFFFFF` | `#11382B` | Button Text (Bold 16px) | 4.5:1 | **12.92:1** | PASS | PASS |
| Button Label on Forest Light (Hover) | `#FFFFFF` | `#1B4D3E` | Button Text (Bold 16px) | 4.5:1 | **9.64:1** | PASS | PASS |
| Primary Button Background on Cream Page | `#11382B` | `#FDFBF7` | UI Component Boundary | 3.0:1 | **12.50:1** | PASS | PASS |
| Marigold Dark Text on Card White | `#92400E` | `#FFFFFF` | Accent Text / Badges | 4.5:1 | **7.09:1** | PASS | PASS |
| Marigold Dark Text on Amber Tint Bg | `#92400E` | `#FEF3C7` | Badges / Tags | 4.5:1 | **6.36:1** | PASS | FAIL |
| Success Text on Success Tint Bg | `#166534` | `#F0FDF4` | Status Banner | 4.5:1 | **6.81:1** | PASS | FAIL |
| Success Text on Card White | `#166534` | `#FFFFFF` | Inline Success | 4.5:1 | **7.13:1** | PASS | PASS |
| Warning Text on Warning Tint Bg | `#9C3218` | `#FDF1EE` | Error & Warning Banner | 4.5:1 | **6.58:1** | PASS | FAIL |
| Warning Text on Card White | `#9C3218` | `#FFFFFF` | Inline Error | 4.5:1 | **7.28:1** | PASS | PASS |
| Info Text on Info Tint Bg | `#075985` | `#F0F9FF` | Info Callout | 4.5:1 | **7.09:1** | PASS | PASS |
| Focus Ring Indicator on Cream Bg | `#0D5C3A` | `#FDFBF7` | Focus Outline | 3.0:1 | **7.78:1** | PASS | PASS |
| Primary Text on Subtle Border/Pill | `#18221D` | `#E5DFD7` | Pills & Segmented Controls | 4.5:1 | **12.34:1** | PASS | PASS |

## Contrast Summary

- **Total Pairs Evaluated:** 18
- **WCAG AA Pass Rate:** 18 / 18 (100%)
- **WCAG AAA Compliance:** 13 / 18 (72%)
- **Status:** **ALL PASS**

## Key Decisions & Measured Baselines

1. **Brand Primary on Card White (`#11382B` on `#FFFFFF`): 12.92:1 (WCAG AAA)**
   Deep ink forest green provides exceptional legibility and trust without resorting to harsh pure black (`#000000`) or generic tech-blue gradients.
2. **Primary Body Text on Cream (`#18221D` on `#FDFBF7`): 15.80:1 (WCAG AAA)**
   Warm cream background (`#FDFBF7`) reduces glare and eye fatigue on budget mobile screens under harsh Indian daylight, while dark soot text (`#18221D`) maintains crisp clarity.
3. **Primary Text on Card White (`#18221D` on `#FFFFFF`): 16.33:1 (WCAG AAA)**
   Card white surfaces ensure maximum contrast for critical data inputs.
4. **Secondary Text on Cream (`#3F4E46` on `#FDFBF7`): 8.50:1 (WCAG AAA)**
   Subtitles and roadmap timelines exceed both the 4.5:1 AA standard and 7.0:1 AAA standard.
5. **Marigold Accent (`#92400E` on `#FFFFFF`): 7.09:1 (WCAG AA)**
   For text and interactive icons on light surfaces, deep Amber (`#92400E`) is used, fully passing WCAG AA.
6. **Terracotta Error on Tint (`#9C3218` on `#FDF1EE`): 6.58:1 (WCAG AA)**
   Muted brick terracotta replaces aggressive neon red, communicating errors with human clarity without creating panic.
