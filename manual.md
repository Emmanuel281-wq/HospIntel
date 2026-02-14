# HospIntel Enterprise Website - Developer Manual

**Version:** 2.4.0  
**Last Updated:** October 2026  
**Confidentiality:** Internal Use Only

---

## 1. Executive Summary

**HospIntel** is a high-fidelity, production-ready frontend for a hospital operating system. It is designed to market a sophisticated "Offline-First" EMR (Electronic Medical Record) solution to enterprise healthcare providers in Africa.

The website acts as both a **marketing brochure** and a **functional prototype**. It features:
*   **Simulated OS Interface:** The Hero section runs a programmed loop showing the OS handling network failures.
*   **Lead Generation:** Functional "Request Demo" and "Contact" forms that store data locally and trigger email drafts.
*   **Admin Dashboard:** A hidden CRM system to view leads and inquiries without needing a backend database.
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
*   **Routing:** React Router DOM v6 (Client-side routing)
*   **Icons:** Lucide React (Clean, tree-shakeable SVG icons)

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
│   ├── App.tsx             # Main Router. Defines all URL paths (/about, /admin, etc).
│   ├── types.ts            # Global TypeScript interfaces.
│   │
│   ├── components/         # Reusable UI Blocks
│   │   ├── ui/             # Atoms: Button, Container, Badge, LoadingScreen.
│   │   ├── Navbar.tsx      # Top navigation bar (Responsive).
│   │   ├── Footer.tsx      # Bottom site links.
│   │   ├── Hero.tsx        # The main homepage visual (The "OS Simulator").
│   │   ├── CommandPalette.tsx # The Cmd+K search modal.
│   │   ├── Infrastructure.tsx # The mesh network visualization.
│   │   └── ... (Other specific section components)
│   │
│   └── pages/              # Full Page Views
│       ├── Home.tsx        # / (Landing Page)
│       ├── Product.tsx     # /product
│       ├── Admin.tsx       # /admin (The Hidden Dashboard)
│       ├── RequestDemo.tsx # /request-demo (Lead Gen Form)
│       ├── Insights.tsx    # /insights (Blog/Whitepapers)
│       └── ... (Legal, Resources, etc.)
```

---

## 5. Manual Customization Guide

Here is exactly what you need to do in VS Code to modify specific parts of the site.

### A. Changing Text & Content
*   **Homepage:** Edit `src/pages/Home.tsx` to change the order of sections. Edit `src/components/Hero.tsx` to change the main headline "Zero Downtime...".
*   **Product Details:** Edit `src/pages/Product.tsx`. The features are often stored in arrays or distinct functional components within the file.
*   **Blog Posts:** Edit `src/pages/Article.tsx`.
    *   Look for the `const ARTICLES` object.
    *   Add a new key (slug) and object to add a new whitepaper.
    *   The content is written in JSX (HTML-in-JS), so you can use `<p>`, `<h3>`, and `<ul>` tags directly.

### B. Managing the Admin Panel
The site includes a "secret" admin panel to view leads.
1.  **URL:** Go to `/admin` (e.g., `localhost:5173/admin`).
2.  **Password:** The hardcoded password is in `src/pages/Admin.tsx`.
    *   Search for: `if (pass === 'the_snake_to_the_fox')`
    *   **Action:** Change this string to whatever password you prefer.
3.  **Data Storage:**
    *   Data is stored in the browser's **Local Storage**. It persists on *your* specific browser.
    *   If you deploy this, **you** won't see leads submitted by **other** users because there is no cloud database connected in this version.
    *   **Production Fix:** To make this work for real users, you must replace the `localStorage.setItem` calls in `RequestDemo.tsx` and `Contact.tsx` with a `fetch()` call to a backend API (like Supabase, Firebase, or a simple Node.js server).

### C. Updating Navigation
*   **Top Bar:** Edit `src/components/Navbar.tsx`. Look for the `navLinks` array to add/remove menu items.
*   **Footer:** Edit `src/components/Footer.tsx`. It contains hardcoded links organized by columns.

### D. Configuring Emails
Currently, forms use a `mailto:` link to open the user's email client.
*   **File:** `src/pages/RequestDemo.tsx` and `src/pages/Contact.tsx`.
*   **Code:** Look for `window.location.href = mailto:inquiries.hospintel@gmail.com...`
*   **Action:** Change the email address to your actual support email.

### E. The Hero "OS Simulation"
The homepage hero (`src/components/Hero.tsx`) is a complex component that runs a state machine.
*   It cycles through: `OVERVIEW` -> `QUEUE` -> `ADMISSION` -> `OFFLINE` -> `SYNC`.
*   To change the timing, look for `setTimeout` calls inside the `useEffect` hook.
*   To change the "Offline" colors, look for the conditional classes: `isOffline ? 'text-amber-400...'`.

---

## 6. Deployment Guide

Since this is a static site (HTML/JS/CSS), it is incredibly cheap and easy to host.

### Option A: Vercel (Recommended)
1.  Push your code to a GitHub repository.
2.  Go to [Vercel.com](https://vercel.com) and "Add New Project".
3.  Import your repository.
4.  Framework Preset: **Vite**.
5.  Click **Deploy**.
6.  Vercel will automatically rebuild the site whenever you push changes to GitHub.

### Option B: Netlify
1.  Drag and drop the `dist` folder (created after running `npm run build`) into the Netlify dashboard.
2.  **Important for Routing:** Create a file named `_redirects` in the `public/` folder containing:
    ```
    /*    /index.html   200
    ```
    This ensures that refreshing a page like `/product` doesn't give a 404 error.

---

## 7. Troubleshooting Common Issues

### "I see a blank screen after building"
*   Check the `vite.config.ts` (if it exists, otherwise defaults apply). Ensure the `base` path is correct.
*   If hosting in a subdirectory, set `base: '/subdirectory/'`.

### "The icons aren't showing"
*   Ensure `lucide-react` is installed: `npm install lucide-react`.
*   The `ErrorBoundary` component has inline SVGs as a backup if the icon library fails.

### "Admin panel isn't saving data"
*   Ensure you aren't in "Incognito" or "Private" mode, as some browsers clear LocalStorage instantly in those modes.
*   Check the browser console (`F12`) for any "QuotaExceededError".

---

## 8. Development Roadmap (Checklist)

If you are taking this to full production:

- [ ] **Backend:** Connect `RequestDemo.tsx` to a real database (Postgres/Firebase) so you receive leads from users.
- [ ] **Auth:** Replace the simple string comparison in `Admin.tsx` with a real authentication system (Auth0, Clerk, or Supabase Auth).
- [ ] **SEO:** Update `metadata.json` and the `<meta>` tags in `index.html` with your real domain name and descriptions.
- [ ] **Analytics:** Add a Google Analytics or Plausible script to `index.html` `<!-- HEAD -->`.