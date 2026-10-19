# Sprout 2.0 - Deployment Guide

> **Host:** Vercel (Primary static host via native GitHub Git Integration; zero secrets or backend required).  
> **Fallback Host:** GitHub Pages (via `.github/workflows/pages.yml`).  
> **Production Branch:** `main` (Ensure CI workflow is green before merging pulls).

---

## 1. Primary Deployment to Vercel (Step-by-Step)

### Step 1: Push Repository to GitHub
Ensure all local commits are pushed to your remote repository on GitHub:
```bash
git push origin main
```

### Step 2: Import Project in Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** $\to$ **Project**.
3. Select and import your Sprout repository.

### Step 3: Configure Project Settings
In the **Configure Project** screen, configure the following settings:
- **Project Name:** `sprout-design-system` (or your preferred name)
- **Framework Preset:** `Other`
- **Root Directory:** Click **Edit** and set to `prototype` *(Critical: This points Vercel to the `/prototype` folder)*
- **Build Command:** Leave EMPTY / Disabled (no build step is needed)
- **Output Directory:** `.` (or leave blank)
- **Install Command:** Leave EMPTY / Disabled (static prototype requires zero dependencies at runtime)

### Step 4: Deploy & Acquire Production URL
1. Click **Deploy**.
2. Deployment completes in approximately 10 to 15 seconds.
3. Copy your live production URL (e.g. `https://sprout-design-system.vercel.app`).
4. Paste this production URL into `README.md` and `SUBMISSION.md`.

---

## 2. Production Verification Checklist

Open your deployed Vercel URL in an **Incognito / Private browser window** to bypass any cached sessions, and test the following:

### A. Mobile Viewport Verification (360px)
1. Open Chrome DevTools (`F12` or `Ctrl+Shift+I`).
2. Toggle Device Toolbar (`Ctrl+Shift+M`) and set dimensions to **360 $\times$ 740** (or select Galaxy S8/S20 or iPhone SE).
3. Verify that the **Risk Disclaimer (13px)** is visible in the first viewport without any scrolling.
4. Verify that the sticky bottom CTA bar never covers the disclaimer or body text.
5. Tap **"Start with ₹100"** $\to$ Verify seamless transition into Onboarding Screen 1.

### B. Desktop Viewport Verification (1280px)
1. Set viewport to **1280 $\times$ 800**.
2. Verify the balanced two-column hero layout and check that no horizontal scrollbar appears.
3. Verify the video walkthrough preview card: Click the poster and confirm that the walkthrough loads without autoplays.
4. Open the native `<details>` FAQ accordions and confirm smooth opening.

### C. Onboarding Simulator & States Verification
1. Navigate to `/app` (or click "Start with ₹100").
2. Verify all five screens via **Next** and **Back** buttons.
3. On Screen 3, click **"हिंदी"** to verify that Hindi Devanagari renders with clean line-height and no clipped characters.
4. In the external **States Switcher**:
   - Click **Wait / Registry** $\to$ Verify Ankur reassured mascot and 45s wait state with no crash panic.
   - Click **OTP Delay** $\to$ Verify WhatsApp/Call fallback options.
   - Click **Human Error** $\to$ Verify non-blaming PAN mismatch message.
   - Click **Offline** $\to$ Verify saved-progress offline notification.

### D. Zero External Network Requests Check
1. Open the **Network** tab in DevTools.
2. Hard reload (`Ctrl+F5`).
3. Filter by `Domain` $\to$ Confirm **100% of requests are from the self-hosted origin**. No requests should reach `fonts.googleapis.com`, `cdnjs.cloudflare.com`, or external tracking servers.

---

## 3. Fallback Host: GitHub Pages (Optional Manual Dispatch)

If GitHub Pages is preferred as an alternative host:
1. Navigate to your repository on GitHub $\to$ **Settings** $\to$ **Pages**.
2. Set **Source** to **GitHub Actions**.
3. Go to **Actions** $\to$ Select **Deploy Prototype to GitHub Pages**.
4. Click **Run workflow** (`workflow_dispatch`).
5. Your prototype will be served at `https://<username>.github.io/<repo>/prototype/`. Because all URLs are strictly relative, the prototype works identically from this subpath.
