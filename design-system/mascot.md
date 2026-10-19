# Sprout Mascot Specification: "Ankur" (अंकुर)

> **Concept:** Ankur (Hindi for "sprout") is a restrained geometric seedling that serves as a quiet, respectful companion throughout the investor's first journey. He is not a loud, cartoonish influencer; he represents patient, grounded financial growth.

---

## 1. Anatomy & Visual Construction
- **Seed Base:** Smooth pebble/seed mound in Deep Forest Green (`#11382B`), symbolising strong roots and stability.
- **Stem:** Short, sturdy vertical stalk (`#11382B`).
- **Cotyledon Leaf Pair:** Dual rounded teardrop leaves:
  - Left Leaf: Deep Sprout Green (`#2E7D32`)
  - Right Leaf: Soft Sprout Green (`#4CAF50`)
- **Facial Features:** Minimalist dot eyes (`#FDFBF7`), subtle marigold blush (`#D97706`), and a gentle line mouth. Expressions are achieved exclusively through leaf posture, eye curvature, and gentle body tilt.
- **Format:** Pure inline SVG with named groups (`#leaf-left`, `#leaf-right`, `#stem`, `#face`), strictly under 4 KB per pose.

---

## 2. Mascot Poses & Emotional Alignment

| Pose File | Emotional State | Journey Context | Role & Behavior |
| :--- | :--- | :--- | :--- |
| `ankur-neutral.svg` | Grounded, calm | Navigation, static headers | Default resting state; balanced leaves. |
| `ankur-waving.svg` | Welcoming, polite | Hero section, Screen 1 (Welcome) | Friendly greeting; waves leaf once then rests. |
| `ankur-thinking.svg` | Inquisitive, reflective | Screen 2 ("What brings you here?") | Validates contemplation; head tilted slightly. |
| `ankur-checklist.svg` | Prepared, organized | Screen 3 ("Keep these ready") | Holds lightweight checklist; sets expectations. |
| `ankur-reassured.svg` | Patient, steady | Screen 4 (Wait states / Registry check) | Gentle breathing halo; reassures app did not crash. |
| `ankur-celebrating.svg` | Cheerful, humble | Screen 5 (First ₹100 complete) | Subtle perky hop; golden leaf flourish; no confetti. |
| `favicon.svg` | Distinct, recognizable | Browser tab & app icon | 24x24 geometric leaf mark. |

---

## 3. Strict Usage Rules

### Where Ankur MUST Appear:
1. **Hero Header (Homepage):** Small (~64-72px) beside the welcoming headline to set a warm, human tone.
2. **Onboarding Intro (Screen 1):** Accompanying the introductory text ("Hi, I'm Ankur").
3. **Verification Wait State (Screen 4):** Prominently placed (~80px) with a gentle CSS pulse animation to signal active background processing so first-time users know the app hasn't frozen.
4. **First Investment Completion (Screen 5):** Providing a modest, respectful moment of acknowledgment (~80px).

### Where Ankur MUST NEVER Appear:
1. **Next to Risk Warnings or Disclaimers:** Ankur must NEVER be placed beside, behind, or above legal disclaimers. Smiling mascots near risk text trivialize market volatility and mislead users.
2. **On User Input Error States:** When a PAN or OTP validation fails, Ankur must NEVER look angry, disappointed, or mock the user. Error messages must remain objective, helpful, and free of judgmental character art.
3. **Floating Over Financial Inputs:** Ankur must never obstruct numeric input fields or investment calculators.
4. **Never as an Animated Pop-up:** Ankur must never appear unexpectedly in a modal, floating overlay, or high-pressure countdown timer.

---

## 4. Size & Scale Guidelines
- **Small / Inline Header:** `24px` to `32px` (e.g. navigation bar, badges).
- **Medium / Content Companion:** `64px` to `80px` (e.g. hero section, onboarding card headers).
- **Large / Central Wait State:** `96px` maximum (e.g. KYC processing screen).
- **Favicon:** Exactly `24px x 24px`.

---

## 5. Motion Principles (CSS-Only)
- **Subtle Idle Sway:** 3-second cycle, maximum ±2.5-degree rotation.
- **Leaf Wave:** 1.5-second easing wave on initial viewport entrance; never loops infinitely to prevent distraction.
- **Wait Pulse:** 2-second ease-in-out breathing rhythm on the background circle.
- **Reduced Motion:** When `prefers-reduced-motion: reduce` is detected, all animations are completely disabled (`animation: none;`), displaying the static neutral or reassured vector.
