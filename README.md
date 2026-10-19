# Newtonite-Sprout
### Sprout 2.0 - Product Design & Engineering Submission

> **A connected, accessible micro-investing journey for first-time investors in India (starting with ₹100).**  
> Built as a zero-framework, fully functional, responsive coded prototype with complete design tokens, a 14-section strategic case study, automated CI quality checks, and production deployment configuration.

---

## 1. Submission Checklist

| Deliverable Item | Primary File / Artifact | Evidence / Screenshot Path |
| :--- | :--- | :--- |
| **Mobile Homepage (360px)** | [`prototype/index.html`](prototype/index.html) | [`screens/homepage-mobile-360.png`](screens/homepage-mobile-360.png) |
| **Desktop Homepage (1280px)** | [`prototype/index.html`](prototype/index.html) | [`screens/homepage-desktop-1280.png`](screens/homepage-desktop-1280.png) |
| **Onboarding Screen 1: Welcome** | [`prototype/app/index.html?screen=1`](prototype/app/index.html) | [`screens/app-screen-1-welcome.png`](screens/app-screen-1-welcome.png) |
| **Onboarding Screen 2: Intent** | [`prototype/app/index.html?screen=2`](prototype/app/index.html) | [`screens/app-screen-2-goals.png`](screens/app-screen-2-goals.png) |
| **Onboarding Screen 3: Keep Ready** | [`prototype/app/index.html?screen=3`](prototype/app/index.html) | [`screens/app-screen-3-keep-ready-en.png`](screens/app-screen-3-keep-ready-en.png) |
| **Onboarding Screen 4: Verification** | [`prototype/app/index.html?screen=4`](prototype/app/index.html) | [`screens/app-screen-4-verification-default.png`](screens/app-screen-4-verification-default.png) |
| **Onboarding Screen 5: First ₹100** | [`prototype/app/index.html?screen=5`](prototype/app/index.html) | [`screens/app-screen-5-first-100.png`](screens/app-screen-5-first-100.png) |
| **Connected Journey & Stepper** | [`case-study/CASE_STUDY.md`](case-study/CASE_STUDY.md#6-end-to-end-user-journey-map) | [`case-study/journey-map.svg`](case-study/journey-map.svg) |
| **Edge States (Wait, OTP, Error, Offline)** | [`prototype/app/index.html`](prototype/app/index.html) | [`screens/app-screen-4-wait-state.png`](screens/app-screen-4-wait-state.png) |
| **Accessibility (WCAG AA Contrast)** | [`design-system/contrast.md`](design-system/contrast.md) | `tools/contrast-check.js` (18/18 PASS) |
| **Automated a11y Audit (Axe-Core)** | [`tools/a11y-check.js`](tools/a11y-check.js) | 0 violations across mobile and desktop |
| **Low-End Performance Budget** | [`design-system/performance.md`](design-system/performance.md) | `tools/weight-check.js` (86.6 KB measured) |
| **Localisation (Hindi Demo)** | [`prototype/app/index.html?screen=3&lang=hi`](prototype/app/index.html) | [`screens/app-screen-3-keep-ready-hi.png`](screens/app-screen-3-keep-ready-hi.png) |
| **Case Study (Markdown & PDF Export)** | [`case-study/CASE_STUDY.md`](case-study/CASE_STUDY.md) | [`case-study/case-study.pdf`](case-study/case-study.pdf) |
| **Figma Rebuild Specification** | [`FIGMA_SPEC.md`](FIGMA_SPEC.md) | Native `.fig` requires desktop; spec provided |
| **60-Second Reviewer Board** | [`overview.html`](overview.html) | Static visual showcase board |

> **Live Deployment Note:** To preserve strict honesty, no live URL is claimed until deployment is executed on your Vercel account. Follow the 60-second steps in [`DEPLOY.md`](DEPLOY.md) to import the repo and set root directory to `prototype`.

---

## 2. What It Is & Core Value

Sprout is a mobile-first micro-investing platform tailored for first-time retail investors in India. It addresses the critical friction points in the initial funnel:
- **Reconciled Drop-off:** Of 40,000 downloads, **~41% (16,300 users) never reached KYC**, and **14,700 dropped mid-verification**.
- **Evidence-Based Design:** Replaces blind forms with a dedicated **"Keep these ready"** preparation step and an **honest 45-second wait state**, directly targeting Customer Support's two biggest complaints.
- **Low-End Hardware Respect:** Engineered without JavaScript frameworks to deliver an **86.6 KB total homepage payload** that loads in &lt; 1 second on ₹7,500 budget smartphones over 4G.
- **Zero-Scroll Regulatory Compliance:** Guarantees that every page with investment content displays an unmissable **13px risk disclaimer** visible in the first viewport without scrolling.

---

## 3. How to Open & Run Locally

The prototype uses **plain HTML5, CSS3, and vanilla JavaScript** with zero build steps and zero CDN requests. All internal links are strictly relative.

### Option A: Direct Browser Opening (No Server Needed)
Simply open the local files directly in any web browser:
- Homepage: Open `prototype/index.html`
- Onboarding Simulator: Open `prototype/app/index.html`
- Reviewer Board: Open `overview.html`

### Option B: Local Static Server (Recommended)
To run automated quality audits or test over local HTTP:
```bash
# 1. Install dev dependencies (Playwright, Axe, Html-validate)
npm install

# 2. Run all quality and compliance checks
npm test

# 3. Serve prototype at a subpath to test relative URL resilience
npx serve .
# Open: http://localhost:3000/prototype/
```

---

## 4. 90-Second Walkthrough Script (For Reviewers)

1. **[0:00 - 0:15] Open Homepage (`prototype/index.html`):**
   - Notice the warm cream background (`#FDFBF7`) and deep forest green palette (`#11382B`), avoiding generic fintech blue gradients.
   - Look at the first viewport: Ankur waves hello in a 44px badge, the headline *"Start small. Learn as you grow"* requires zero financial vocabulary, and the **13px Risk Disclaimer** is immediately visible above the fold without scrolling.
2. **[0:15 - 0:30] Scroll Through the Roadmap:**
   - Review Section 3 ("Your first ₹100, step by step"): Note the 4 steps and time estimates.
   - Click the click-to-load video preview in Section 4: Notice that no heavy video data streams automatically.
   - Click the primary CTA **"Start with ₹100"** (or the mobile sticky bar).
3. **[0:30 - 0:50] Experience Onboarding Screens 1 to 3 (`prototype/app/index.html`):**
   - **Screen 1 (Welcome):** The 4 steps match the homepage roadmap identically with an explicit 7-minute expectation.
   - Click **"Get Started"** $\to$ **Screen 2 (Intent):** Select *"I'm just curious"*; read the reassuring note that hesitation is normal.
   - Click **"Continue"** $\to$ **Screen 3 (Document Prep):** See the 3 items (PAN, Aadhaar, Bank) with reasons why each is legally mandated. Click **"Remind me later"** to see how notification permission is respectfully deferred.
4. **[0:50 - 1:10] Test Localisation & KYC Edge States (Screen 4):**
   - On Screen 3, click **"हिंदी"** in the top navigation: Confirm that the entire interface shifts to natural, conversational Hindi with no broken layouts.
   - Click **"मेरे पास सब तैयार है"** (or Next) to reach **Screen 4 (Verification)**.
   - In the **States Switcher** outside the phone frame, click **"Wait / Registry"**: Experience the 45-second wait state with Ankur's reassuring breathing halo and the explicit message: *"You do not need to stare at this screen; we'll notify you."*
   - Click **"OTP Delay"** and **"Human Error"** to inspect non-blaming recovery paths.
5. **[1:10 - 1:30] Complete First Investment (Screen 5):**
   - Click **"Screen 5"** in the jumper: Note the pre-selected ₹100 default and clear market risk statement.
   - Click **"Confirm and Invest ₹100"**: Observe the restrained botanical sprout growth animation (no cheap gambling confetti) followed by the quiet referral credit.

---

## 5. Repository & Folder Map

```
├── .github/
│   ├── dependabot.yml              # Dependabot config for npm and github-actions
│   └── workflows/
│       ├── ci.yml                  # CI on push/PR (Node 24, checkout@v6, setup-node@v6, npm test)
│       └── pages.yml               # Manual workflow_dispatch deploying /prototype to GitHub Pages
├── assets/
│   ├── logo.svg                    # Sprout brand logo
│   ├── favicon.svg                 # 24x24 geometric leaf favicon
│   ├── icons/                      # 14 custom SVG icons (shield, rupee, clock, etc.)
│   ├── illustrations/              # 4 custom SVG spot illustrations (start-tiny, video-poster)
│   └── mascot/                     # Ankur mascot poses (neutral, waving, thinking, checklist, etc.)
├── case-study/
│   ├── CASE_STUDY.md               # 14-section strategic case study (first-person, human)
│   ├── case-study.pdf              # Generated executive PDF export (145 KB)
│   ├── journey-map.svg             # End-to-end journey and emotional curve diagram
│   ├── personas.svg                # 3 user personas labelled as assumptions
│   ├── wireframes-homepage.svg     # Low-fi vs hi-fi homepage wireframes
│   ├── wireframes-onboarding.svg   # Low-fi 5-screen onboarding wireframes
│   └── deep-link-continuity.svg    # Deferred deep link architecture diagram
├── design-system/
│   ├── tokens.css                  # CSS custom properties (colors, typography, spacing, shadows)
│   ├── tokens.json                 # Machine-readable design tokens
│   ├── typography.md               # Font stack specifications & Devanagari rules
│   ├── mascot.md                   # Ankur usage sheet & negative constraints
│   ├── contrast.md                 # Contrast audit report (18/18 pairs verified)
│   └── performance.md              # Measured payload weights & Core Web Vitals
├── screens/                        # 17 Headless PNG screenshots generated via Playwright
├── prototype/                      # Standalone, zero-framework production web code
│   ├── index.html                  # Homepage (responsive 320px to 1280px)
│   ├── vercel.json                 # Vercel deployment headers and cleanUrls
│   ├── app/
│   │   └── index.html              # 5-screen onboarding simulator (360x800 phone frame)
│   ├── css/                        # reset.css, tokens.css, homepage.css, app.css
│   ├── js/                         # strings.js (en/hi dictionary), homepage.js, app.js
│   ├── locales/                    # en.json, hi.json (structured translation keys)
│   └── assets/                     # Self-contained assets mirror for direct deployment
├── tools/                          # Node.js automated verification test suite
│   ├── copy-lint.js                # Regex compliance scanner for banned claims & font floor
│   ├── contrast-check.js           # Mathematical sRGB luminance contrast calculator
│   ├── weight-check.js             # Asset payload and budget calculation script
│   ├── html-validate-check.js      # Semantic HTML and landmark audit
│   ├── a11y-check.js               # Axe-core automated WCAG AA audit
│   ├── screenshots.js              # Headless Playwright screenshot generator
│   ├── export-pdf.js               # Playwright PDF exporter for case study
│   └── test-runner.js              # Master test suite runner (npm test)
├── DEPLOY.md                       # Exact deployment instructions for Vercel and GitHub Pages
├── FIGMA_SPEC.md                   # Figma token styles, Auto Layout specs, and UI copy
├── overview.html                   # 60-second static visual reviewer showcase board
├── SUBMISSION.md                   # Form-ready submission answers
└── package.json                    # Project configuration and npm scripts
```

---

## 6. What Could Not Be Verified ("Not Verified")

In accordance with strict honesty rules, the following items cannot be independently verified with our automated tooling and are explicitly documented:
1. **Unsegmented Bounce Rate (78%):** Contaminated by an active paid ad campaign during the measurement period. Organic baseline bounce rate is unverified until analytics segmentation by UTM source is deployed.
2. **Exact Pre-KYC vs KYC Split:** The figure that ~41% of users leaked before reaching KYC is a mathematical inference ($9,000 / 0.38 \approx 23,700$ starters) based on reported aggregate numbers. Step-level drop-offs must be confirmed with event telemetry.
3. **Hindi Market Share ("Many"):** The exact percentage of target users requiring Hindi or regional dialects is unquantified in the initial brief.
4. **User Fear Drivers:** The survey finding that 65% find investing scary reflects survivorship bias (existing users only). Churned user root causes remain unverified until 5-8 exit interviews are held.
5. **Regulatory Placeholders:** The following items are placeholders requiring formal Compliance sign-off before public launch:
   - `[verify with Compliance: Registered with SEBI as Mutual Fund Distributor ARN-XXXXX]`
   - `[verify with Compliance: Bank-grade 256-bit encryption for all identity documents]`
   - `[verify with Compliance: Regulated depository partner for automated clearing]`
   - `[verify with Compliance: Exact risk disclaimer text and statutory notice placements]`
   - `[verify with Legal: Aadhaar e-KYC consent language and privacy notice URL]`
