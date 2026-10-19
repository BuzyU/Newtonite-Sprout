# Sprout Design System - Typography Specification

## Principles
1. **Zero External Network Dependencies**: Uses robust system humanist serif and sans-serif stacks with full native Devanagari support. Eliminates Google Fonts / CDN blocking, enabling instant zero-latency rendering on 4G networks in India.
2. **Indian Currency Symbol Support**: The rupee symbol (₹, U+20B9) is fully supported across all fallback systems without glyph corruption or box rendering.
3. **Devanagari Metric Compatibility**: Line heights are set between `1.35` and `1.65` to avoid clipping Devanagari upper matras (e.g. `ी`, `े`, `ै`, `ं`) and lower matras (e.g. `ु`, `ू`, `ृ`).
4. **Strict Compliance Size Floor**: All investment disclaimers are set to `13px` (`0.8125rem`), strictly exceeding the regulatory requirement of `12px` minimum.

---

## Font Family Stacks

### 1. Heading Display Stack (Humanist Serif)
Provides a warm, trustworthy, editorial feel that distinguishes Sprout from neon/tech fintechs.
```css
font-family: Charter, "Bitstream Charter", "Sitka Text", Cambria, "Noto Serif Devanagari", serif;
```
- **Windows Fallback:** `Sitka Text` / `Cambria`
- **macOS / iOS Fallback:** `Charter`
- **Android / Linux Fallback:** `Noto Serif Devanagari` / `serif`

### 2. Body & UI Stack (Humanist Sans)
Clean, modern, highly legible at small sizes on budget LCD displays.
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", sans-serif;
```
- **Android Fallback:** `Roboto`, `Noto Sans Devanagari`
- **iOS / macOS Fallback:** `system-ui`, `-apple-system`, `BlinkMacSystemFont`
- **Windows Fallback:** `"Segoe UI"`

### 3. Monospace / Numeric Stack
Used for OTP inputs, step counts, and transaction references.
```css
font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
```

---

## Type Scale

| Token | Size (rem / px) | Line Height | Mobile Size | Desktop Size | Usage |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `--text-h1` | 2.0rem (32px) / 2.75rem (44px) | 1.15 | 32px | 44px | Main Hero Headline |
| `--text-h2` | 1.75rem (28px) / 2.0rem (32px) | 1.25 | 28px | 32px | Section Headings |
| `--text-h3` | 1.5rem (24px) | 1.30 | 24px | 24px | Card Headings, Onboarding Titles |
| `--text-h4` | 1.25rem (20px) | 1.40 | 20px | 20px | Sub-section Headings |
| `--text-body-lead` | 1.125rem (18px) | 1.50 | 18px | 18px | Hero Subtitle, Onboarding Intros |
| `--text-body` | 1.0rem (16px) | 1.55 | 16px | 16px | Standard Paragraphs, Inputs, Buttons |
| `--text-body-sm` | 0.875rem (14px) | 1.50 | 14px | 14px | Helper Text, Secondary Metadata |
| `--text-disclaimer` | 0.8125rem (13px) | 1.50 | 13px | 13px | **Risk Disclaimers (>= 12px mandatory)** |
| `--text-caption` | 0.75rem (12px) | 1.40 | 12px | 12px | Timestamps, Footnotes |

---

## Localisation Expansion Accommodations
Hindi script (Devanagari) typically occupies **25% to 35% more horizontal width** than English for the same semantic meaning. 
Design system protections:
1. All button containers use `min-width: auto; padding: 0.75rem 1.25rem;` rather than fixed pixel widths.
2. Card layouts use flexible flexbox/grid configurations with `flex-wrap: wrap` to prevent string overflow.
3. Form labels sit above inputs rather than inline side-by-side.
