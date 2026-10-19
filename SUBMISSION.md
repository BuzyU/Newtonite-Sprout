# Sprout 2.0 - Official Submission Details

> **Form-Ready Response Text for Evaluators**

---

### Design Tools Used
HTML5, CSS3 (Vanilla / Custom Properties), Vanilla JavaScript (ES6+), Node.js (v24), Playwright (headless browser test automation & screenshot generation), @axe-core/playwright (WCAG 2.1 AA accessibility auditing), html-validate (semantic markup validation), SVG (custom vector illustrations & geometric mascot poses). No external UI frameworks, CDNs, or third-party web font services were loaded. *(Note: Figma was not used to produce a native proprietary binary file; a complete reproduction specification is documented in `FIGMA_SPEC.md`.)*

---

### Brief Design Approach (188 words)
Sprout 2.0 resolves high onboarding friction (62% KYC drop-off, ~41% pre-KYC leakage) through an honest, connected narrative from website to first investment. The homepage structures a four-step journey whose nomenclature and time estimates match the onboarding stepper identically, establishing zero cognitive rupture. 

To bridge the CEO's demand for Apple-like minimalism with Marketing's desire for an engaging mascot, I designed "Ankur"—a geometric seedling serving as an ambient, reassuring guide. Ankur is strictly prohibited from appearing near risk disclaimers, high-stress errors, or promotional overlays. 

Addressing low-end device constraints (40% on smartphones under ₹10,000 facing 6.2s 4G loads), the prototype is built without JavaScript frameworks or external CDN assets, achieving an 86.6 KB homepage payload. A dedicated "Keep these ready" preparation screen and an animated 45-second wait state directly eradicate the two evidenced customer support complaints ("documents weren't ready" and "thought the app crashed"). 

All color pairs achieve 100% WCAG AA contrast (18/18 pairs verified mathematically), and every screen with investment content displays an unmissable 13px risk disclaimer visible in the first viewport without scrolling.

---

### Figma / Interactive Prototype URL
The interactive prototype is a fully functional, self-contained, responsive coded prototype located in the `/prototype` folder of this repository. When deployed, it runs from root `/prototype` on Vercel or any static host:
- **Local Path:** `./prototype/index.html` (Homepage) and `./prototype/app/index.html` (5-Screen Onboarding Simulator)
- **Live Deployment URL:** `[To be updated upon Vercel deployment; see DEPLOY.md for 60-second setup]`
- **Figma Specification:** See `FIGMA_SPEC.md` for frame dimensions, component token bindings, Auto Layout constraints, and exact UI copy.
