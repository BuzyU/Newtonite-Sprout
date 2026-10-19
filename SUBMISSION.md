# Sprout 2.0 - Official Submission Details

> **Form-Ready Response Text for Evaluators**

---

### Design Tools Used
HTML5, CSS3 (Vanilla / Custom Properties), Vanilla JavaScript (ES6+), Node.js (v24), Playwright (headless browser test automation & screenshot generation), @axe-core/playwright (WCAG 2.1 AA accessibility auditing), html-validate (semantic markup validation), SVG (custom vector illustrations & geometric mascot poses). No external UI frameworks, CDNs, or third-party web font services were loaded. (Figma is not listed as a tool because no native .fig binary file exists in the repo; design tokens and layout specs are codified in `design-system/tokens.json` and `FIGMA_SPEC.md`.)

---

### Brief Design Approach (188 words)
Sprout 2.0 resolves high onboarding friction (62% KYC drop-off, ~41% pre-KYC leakage) through an honest, connected narrative from website to first investment. The homepage structures a four-step journey whose nomenclature and time estimates match the onboarding stepper identically, establishing zero cognitive rupture. 

To bridge the CEO's demand for Apple-like minimalism with Marketing's desire for an engaging mascot, I designed "Ankur"—a geometric seedling serving as an ambient, reassuring guide. Ankur is strictly prohibited from appearing near risk disclaimers, high-stress errors, or promotional overlays. 

Addressing low-end device constraints (40% on smartphones under ₹10,000 [brief baseline, assuming entry-level segment] facing 6.2s 4G loads), the interface is built without JavaScript frameworks or external CDN assets, achieving an 86.8 KB homepage payload (and 109.5 KB onboarding app payload). A dedicated "Keep these ready" preparation screen and an animated wait state [assumed 45-second duration based on typical registry turnaround] directly eradicate the two evidenced customer support complaints ("documents weren't ready" and "thought the app crashed"). 

All color pairs achieve 100% WCAG AA contrast (18/18 pairs verified mathematically), and every screen with investment content displays an unmissable 13px risk disclaimer visible in the first viewport without scrolling.

---

### Interactive Application URL
The final design is a fully functional, self-contained, responsive implementation located in the `/site` folder of this repository. When deployed, it runs from root `/site` on Vercel or any static host:
- **GitHub Repository:** [https://github.com/BuzyU/Newtonite-Sprout](https://github.com/BuzyU/Newtonite-Sprout)
- **Local Path:** `./site/index.html` (Homepage) and `./site/app/index.html` (5-Screen Onboarding App Screens)
- **Live Deployment URL:** `[To be updated upon Vercel deployment; see DEPLOY.md for 60-second setup]`
- **Design Specification:** See `FIGMA_SPEC.md` for frame dimensions, component token bindings, Auto Layout constraints, and exact UI copy.
