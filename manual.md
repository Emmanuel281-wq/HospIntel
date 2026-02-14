# HospIntel Enterprise Website - Developer Manual

**Version:** 2.4.1 (Stable)
**Last Updated:** October 2026
**Confidentiality:** Internal Use Only

---

## 1. Executive Summary

**HospIntel** is a high-fidelity, production-ready frontend for a hospital operating system. It is designed to market a sophisticated "Offline-First" EMR (Electronic Medical Record) solution to enterprise healthcare providers in Africa.

The website acts as both a **marketing brochure** and a **functional prototype**. It features:
*   **Simulated OS Interface:** The Hero section runs a programmed loop showing the OS handling network failures.
*   **Network Topology Simulator:** An interactive visualizer (`Infrastructure.tsx`) that demonstrates mesh failover logic in real-time.
*   **Lead Generation:** Functional "Request Demo" and "Contact" forms that attempt a backend submission and fallback to local storage.
*   **Admin Dashboard:** A secured CRM system to view leads and inquiries.

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

## 3. Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
1.  **Install Node.js:** Download and install the LTS version from [nodejs.org](https://nodejs.org/).
2.  **VS Code:** We recommend Visual Studio Code.

### Installation
1.  Open the project folder in VS Code.
2.  Run the installation command:
    ```bash
    npm install
    ```

### Running Development Server
To start the app in development mode:
```bash
npm run dev
```

### Building for Production
To create the optimized files for deployment:
```bash
npm run build
```

---

## 4. Feature Documentation

### A. Network Topology Simulator (`components/Infrastructure.tsx`)
This component visually demonstrates the core value proposition: **Mesh Networking**.
*   **Modes:**
    *   **Auto Loop:** Cycles between Online and Offline every 6 seconds.
    *   **Manual:** Allows the user to click "Power" (Simulate Outage) or "Refresh" (Restore Connection).
*   **Visuals:**
    *   **Blue Pulse:** Indicates Cloud connection.
    *   **Amber Pulse:** Indicates Mesh fallback (peer-to-peer).
    *   **Green Pulse:** Indicates Active Sync (Data transfer).

### B. Admin Panel
*   **URL:** `/#/admin`
*   **Default Password:** `hospintel_secure`
*   **Security:** Uses SHA-256 hashing. To change the password, generate a new hash and update `ADMIN_HASH_SHA256` in `src/utils/mockApi.ts`.

### C. Offline Form Handling
The `mockApi.ts` utility handles form submissions.
1.  It attempts to POST to the configured endpoint (e.g., Formspree).
2.  If the network fails or the endpoint is down, it catches the error.
3.  It saves the form data to `localStorage` ('hospintel_db_demos').
4.  This ensures no lead is ever lost during a demo.

---

## 5. Deployment Guide

Since this is a static site (HTML/JS/CSS), it is incredibly cheap and easy to host.

### Option A: Vercel / Netlify (Recommended)
1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel or Netlify.
3.  **Framework Preset:** Vite.
4.  **Deploy.**

*Note: We use `HashRouter` to prevent 404 errors on refresh when hosting on static buckets (S3, Netlify).*
