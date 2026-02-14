# HospIntel Enterprise Website - Developer Manual

**Version:** 2.4.1 (Stable)
**Last Updated:** October 2026
**Confidentiality:** Internal Use Only

---

## 1. Executive Summary

**HospIntel** is a high-fidelity, production-ready frontend for a hospital operating system. It is designed to market a sophisticated "Offline-First" EMR (Electronic Medical Record) solution to enterprise healthcare providers in Africa.

The website acts as both a **marketing brochure** and a **functional prototype**. It features:
*   **Simulated OS Interface:** The Hero section runs a programmed loop showing the OS handling network failures.
*   **Lead Generation:** Functional "Request Demo" and "Contact" forms that attempt a backend submission and fallback to local storage.
*   **Admin Dashboard:** A secured CRM system to view leads and inquiries.
*   **Technical Documentation:** A "Resources" section that reads like real software documentation to build trust with CTOs.

---

## 2. Technical Stack

This project is built as a **Single Page Application (SPA)**. It generates static HTML/JS/CSS that can be hosted anywhere.

*   **Runtime:** Node.js (v18+)
*   **Framework:** React 18 (Functional Components + Hooks)
*   **Language:** TypeScript (Strict typing for robustness)
*   **Build Tool:** Vite (Fast HMR and optimized production builds)
*   **Styling:** Tailwind CSS (Utility-first styling)
*   **Animations:** Framer Motion (Complex transitions, layout animations)
*   **Routing:** React Router DOM v6 (Using `HashRouter` for universal compatibility)
*   **Icons:** Lucide React (Clean, tree-shakeable SVG icons)
*   **Security:** SHA-256 Client-Side Hashing for Admin Auth

---

## 3. Getting Started in VS Code

Follow these steps to set up the project locally on your machine.

### Prerequisites
1.  **Install Node.js:** Download and install the LTS version from [nodejs.org](https://nodejs.org/).
2.  **VS Code:** We recommend Visual Studio Code with the **ESLint** and **Prettier** extensions installed.

### Installation
1.  Open the project folder in VS Code.
2.  Open the integrated terminal (`Ctrl + ~` or `View > Terminal`).
3.  Run the installation command to download dependencies:
    ```bash
    npm install
    ```

### Running Development Server
To start the app in development mode (with hot-reloading):
```bash
npm run dev
```
*   Click the link shown in the terminal (usually `http://localhost:5173/`).
*   Any changes you make to files will instantly reflect in the browser.

### Building for Production
To create the optimized files for deployment:
```bash
npm run build
```
*   This creates a `dist/` folder.
*   You can preview the build locally with `npm run preview`.

---

## 4. Project Structure (File Map)

```text
/
├── index.html              # Entry HTML. Global CSS variables & fonts are here.
├── src/
│   ├── main.tsx            # Entry JS. Mounts React to the DOM.
│   ├── App.tsx             # Main Router. Uses HashRouter (#/about).
│   ├── utils/
│   │   └── mockApi.ts      # Simulates backend logic (Auth Hashing, Form Submission).
│   ├── data/
│   │   └── content.tsx     # Centralized content for Articles/Blog.
│   ├── components/         # Reusable UI Blocks
│   │   ├── ui/             # Atoms: Button, Container, Badge, LoadingScreen.
│   │   ├── Navbar.tsx      # Top navigation bar.
│   │   ├── Hero.tsx        # The main homepage visual (The "OS Simulator").
│   │   └── ... 
│   │
│   └── pages/              # Full Page Views
│       ├── Home.tsx        # / (Landing Page)
│       ├── Product.tsx     # /product
│       ├── Admin.tsx       # /admin (The Hidden Dashboard)
│       ├── Insights.tsx    # /insights (Blog/Whitepapers)
│       └── ... 
```

---

## 5. Manual Customization Guide

Here is exactly what you need to do in VS Code to modify specific parts of the site.

### A. Changing Text & Content
*   **Homepage:** Edit `src/pages/Home.tsx` to change the order of sections.
*   **Blog Posts/Whitepapers:** Edit `src/data/content.tsx`.
    *   This file contains the `ARTICLES` object.
    *   Add a new key (slug) and object to add a new whitepaper. The content is written in JSX.

### B. Managing the Admin Panel (Security Update)
The site includes a "secret" admin panel to view leads.
1.  **URL:** Go to `/#/admin` (e.g., `localhost:5173/#/admin`).
2.  **Default Password:** `hospintel_secure`
3.  **Changing the Password:**
    *   Go to `src/utils/mockApi.ts`.
    *   We use **SHA-256 Hashing** so the password is not visible in the source code.
    *   To set a new password, you must generate the SHA-256 hash of your desired password (use an online tool or the browser console) and update the `ADMIN_HASH_SHA256` constant.

### C. Configuring Forms (Production Mode)
The `RequestDemo.tsx` and `Contact.tsx` pages submit data via `src/utils/mockApi.ts`.
*   **Current Behavior:** It simulates a network delay and saves the data to the browser's `localStorage` (Demo Mode).
*   **Production Setup:**
    1.  Open `src/utils/mockApi.ts`.
    2.  Find `const PRODUCTION_ENDPOINT`.
    3.  Replace the placeholder URL with your actual Formspree, Zapier, or backend API endpoint.
    4.  The code automatically attempts to `POST` to this endpoint. If it fails (or isn't configured), it safely falls back to Local Storage so the demo never breaks.

### D. The Hero "OS Simulation"
The homepage hero (`src/components/Hero.tsx`) is a complex component that runs a state machine.
*   It cycles through: `OVERVIEW` -> `QUEUE` -> `ADMISSION` -> `OFFLINE` -> `SYNC`.
*   We have optimized the blur effects (`backdrop-blur-md` instead of `xl`) to ensure smooth framerates on lower-end devices.

---

## 6. Deployment Guide

Since this is a static site (HTML/JS/CSS), it is incredibly cheap and easy to host.

### Option A: Vercel / Netlify (Recommended)
1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel or Netlify.
3.  **Framework Preset:** Vite.
4.  **Deploy.**

*Note: We are now using `HashRouter` (URLs look like `domain.com/#/about`). This eliminates "404 Not Found" errors on page refresh that commonly occur with static hosting, making deployment zero-config.*

---

## 7. Troubleshooting Common Issues

### "The screen is blank"
*   This usually happens due to Routing issues. We have switched to `HashRouter` in `App.tsx` to fix this across all environments. Ensure you are running `npm run dev` or serving the `dist` folder correctly.

### "I can't scroll on mobile"
*   Check `components/Navbar.tsx`. The mobile menu locks the body scroll when open. Ensure `setMobileMenuOpen(false)` is called when a link is clicked (this is already implemented).

### "Admin panel isn't saving data"
*   Ensure you aren't in "Incognito" or "Private" mode, as some browsers clear `localStorage` instantly or block it entirely.
*   Check the browser console (`F12`) for any "QuotaExceededError".

---

## 8. Development Roadmap (Checklist)

- [x] **Routing:** Switched to HashRouter for stability.
- [x] **Security:** Implemented SHA-256 Hashing for Admin Auth.
- [x] **Performance:** Reduced z-index complexity and blur intensity.
- [x] **Data:** Centralized content management.
- [ ] **Backend:** Connect `mockApi.ts` to a real database (Postgres/Firebase).
- [ ] **Analytics:** Add a Google Analytics or Plausible script to `index.html`.
