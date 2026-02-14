# HospIntel Enterprise System Manual

**Version:** 2.4.0  
**Last Updated:** October 2026  
**Confidentiality:** Internal Use Only

---

## 1. System Overview

**HospIntel** is an offline-first hospital operating system (OS) designed for mission-critical reliability in environments with unstable infrastructure (specifically African healthcare markets). 

Unlike traditional cloud-based Electronic Medical Records (EMRs) that fail when the internet disconnects, HospIntel treats the local device as the primary source of truth. It uses a **Local-First Architecture** where data is stored immediately on the device and synchronized to the cloud only when connectivity is available.

### Key Capabilities
*   **Offline-First:** Read/Write access to patient records with 0ms latency, regardless of internet status.
*   **Mesh Networking:** Nodes can sync with each other over LAN if the central cloud is down.
*   **Zero-Trust Security:** Strict encryption and role-based access control (RBAC).
*   **Command Plane:** A unified dashboard for tracking leads, inquiries, and system health.

---

## 2. Web Design Style & Philosophy

The visual identity of HospIntel is **"Cyber-Industrial Enterprise."** It conveys trust, precision, engineering excellence, and robustness. It avoids "friendly" startup aesthetics in favor of a "military-grade" tool look.

### Core Aesthetic Principles
1.  **Dark Mode Default:** To reduce eye strain in 24/7 clinical environments and save battery on OLED devices.
    *   **Background:** `#050505` (Almost Black)
    *   **Surface:** `#0A0A0A` (Dark Grey) with `#1F1F1F` borders.
2.  **High Data Density:** The UI is designed for professionals who need information quickly. We use mono-spaced fonts for data and compact tables.
3.  **Holographic Accents:** Subtle glowing effects (`box-shadow`, `blur`) on active elements to simulate a heads-up display (HUD).
4.  **Glassmorphism:** `backdrop-filter: blur(20px)` allows content to layer over backgrounds without losing legibility.

### Typography
*   **Primary (Headings/Body):** `Inter` - Clean, legible, modern sans-serif.
*   **Secondary (Data/Labels):** `JetBrains Mono` - Technical, precise, used for timestamps, IDs, and status codes.

### Color Palette
| Color | Hex | Usage |
| :--- | :--- | :--- |
| **Deep Void** | `#050505` | Main background. |
| **Circuit Gray** | `#1F1F1F` | Borders and dividers. |
| **Signal Blue** | `#3B82F6` | Primary actions, active states, healthy nodes. |
| **Alert Amber** | `#F59E0B` | Warnings, mesh mode, degraded sync. |
| **System Green** | `#10B981` | Success, online status, secure. |
| **Crimson** | `#EF4444` | Critical alerts, errors, delete actions. |

---

## 3. Administrative Control Plane (CRM)

The website includes a hidden Administration System for managing incoming leads and contact inquiries. This system replaces the need for a third-party CRM or database like Supabase.

### 3.1 Access
*   **URL:** `https://hospintel.com/#/admin` (or `localhost:5173/#/admin` in dev)
*   **Access Key:** `the_snake_to_the_fox`

> **SECURITY WARNING:** This key allows full access to view and delete sensitive lead data. Do not share this key with unauthorized personnel.

### 3.2 Features
1.  **Data Persistence:** 
    *   All "Request Demo" and "Contact Us" submissions are stored in the browser's `localStorage` under the keys `hospintel_db_demos` and `hospintel_db_inquiries`.
    *   **Note:** This data resides on the *specific device* where the forms were submitted during testing, or simulates a local database in this V1 architecture. In a production environment with a backend, this would fetch from an API. For this V1 static deployment, it acts as a local ledger.
    
2.  **Dashboard:**
    *   **Demo Requests Tab:** View detailed submissions (Org Name, Bed Count, Deployment Type).
    *   **Inquiries Tab:** View general contact messages.
    *   **Search:** Real-time filtering by name, email, or organization.

3.  **Data Management:**
    *   **Delete:** Remove processed records (Permanent action).
    *   **CSV Export:** Download the entire dataset to a `.csv` file for import into Excel or Google Sheets.

4.  **Email Integration:**
    *   Submitting a form *also* triggers the user's default email client (`mailto:`) with a pre-formatted draft sent to `inquiries.hospintel@gmail.com`. This ensures redundancy: data is saved locally *and* sent via email.

---

## 4. User Manual (Public Site)

### 4.1 Navigation
*   **Command Palette:** Press `Cmd + K` (Mac) or `Ctrl + K` (Windows) to open the global search. You can navigate to any page or trigger actions like "Request Demo" instantly.
*   **Scroll-to-Top:** A floating arrow appears after scrolling down to quickly return to the hero section.

### 4.2 Requesting a Demo (`/request-demo`)
*   **Purpose:** For hospital administrators to schedule a technical evaluation.
*   **Process:**
    1.  Fill out organization details (Beds, Facilities).
    2.  Select deployment type (Cloud vs. On-Premise).
    3.  Click "Schedule Demonstration".
    4.  The system saves the data to the Admin ledger.
    5.  The system opens an email draft for the user to send.

### 4.3 Engineering Journal (`/insights`)
*   Contains technical whitepapers explaining the system architecture (CAP Theorem, Merkle Trees).
*   Designed to build trust with CTOs and System Architects.

---

## 5. Developer Manual & Maintenance

### 5.1 Technology Stack
*   **Framework:** React 18 (TypeScript)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS + Framer Motion (Animations)
*   **Icons:** Lucide React
*   **Routing:** React Router DOM (HashRouter used for easier static hosting).

### 5.2 Folder Structure
```
/
├── components/         # Reusable UI widgets
│   ├── ui/             # Atomic components (Button, Container, Badge)
│   ├── Navbar.tsx      # Top navigation
│   ├── Hero.tsx        # Homepage landing visual
│   ├── Infrastructure.tsx # Network topology visual
│   └── ...
├── pages/              # Route views
│   ├── Home.tsx
│   ├── Product.tsx
│   ├── Admin.tsx       # CRM Dashboard
│   └── ...
├── App.tsx             # Main router configuration
├── main.tsx            # Entry point
└── index.html          # HTML Shell
```

### 5.3 Key Components Explained
*   **`Infrastructure.tsx`**: Contains the visual node graph simulation. It uses SVG and Framer Motion to draw lines between nodes. It simulates "Offline Mode" via state to demonstrate the mesh capability.
*   **`Admin.tsx`**: The CRM logic. It reads/writes to `localStorage`. If you migrate to a real backend later, replace the `localStorage` calls here with `fetch()` calls to your API.
*   **`ErrorBoundary.tsx`**: Wraps the app to catch crashes (e.g., rendering errors) and displays a "Red Screen of Death" with a technical stack trace, fitting the engineering theme.

### 5.4 Installation & Running
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start Development Server:**
    ```bash
    npm run dev
    ```
3.  **Build for Production:**
    ```bash
    npm run build
    ```
    This generates a `dist/` folder containing static HTML/JS/CSS files.

### 5.5 Deployment
This project is static-export ready. You can deploy the `dist/` folder to:
*   **Vercel / Netlify:** Drag and drop the folder or connect Git repository.
*   **GitHub Pages:** Push to a `gh-pages` branch.
*   **Apache/Nginx:** Upload files to `/var/www/html`.

---

## 6. Future Roadmap (V2 Considerations)

While V1 is fully functional as a high-fidelity prototype and lead generation tool, V2 should consider:
1.  **Backend Integration:** Connect `Admin.tsx` to a real PostgreSQL database (Supabase/Firebase) so leads are shared across devices, rather than stored in the user's specific browser.
2.  **Auth Provider:** Replace the hardcoded admin key with JWT-based authentication.
3.  **CMS:** Move the blog posts in `Article.tsx` to a Headless CMS (Sanity.io) for easier editing without code changes.

---

**End of Manual**
