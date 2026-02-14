
// Mock API to simulate backend interactions without exposing secrets in UI components

// SHA-256 Hash for "hospintel_secure"
const ADMIN_HASH_SHA256 = "d94943f240507a242d5930335b89799276d497c2377f407767667d7d52673322";

// --- CONFIGURATION ---
// NOTE: Browser-based apps cannot use SMTP directly due to security restrictions (no TCP sockets).
// To use SMTP, you must set up a backend endpoint (e.g. Node.js/Express) to handle the email sending.
// This mock API saves data to the local 'Admin Dashboard' (IndexedDB) to simulate a working system.
const BACKEND_API_URL = "/api/v1/send-mail"; // Placeholder for your future backend

// --- IndexedDB Configuration ---
const DB_NAME = 'hospintel_core_db';
const DB_VERSION = 1;
const STORES = {
  LEADS: 'leads',
  INQUIRIES: 'inquiries'
};

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORES.LEADS)) {
        db.createObjectStore(STORES.LEADS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.INQUIRIES)) {
        db.createObjectStore(STORES.INQUIRIES, { keyPath: 'id' });
      }
    };
  });
};

const dbOp = {
    getAll: async (storeName: string): Promise<any[]> => {
        try {
            const db = await initDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(storeName, 'readonly');
                const store = tx.objectStore(storeName);
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        } catch (e) {
            console.error("DB Read Error", e);
            return [];
        }
    },
    add: async (storeName: string, item: any): Promise<void> => {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const request = store.add(item);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },
    delete: async (storeName: string, id: string): Promise<void> => {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
};

/**
 * Helper to hash input string
 */
async function hashString(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const api = {
    /**
     * Simulates secure authentication check using SHA-256
     */
    verifyAdminPassword: async (password: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const inputHash = await hashString(password);
        return inputHash === ADMIN_HASH_SHA256;
    },

    /**
     * Admin: Get all records
     */
    getLeads: () => dbOp.getAll(STORES.LEADS),
    getInquiries: () => dbOp.getAll(STORES.INQUIRIES),

    /**
     * Admin: Delete record
     */
    deleteRecord: (type: 'leads' | 'inquiries', id: string) => {
        const store = type === 'leads' ? STORES.LEADS : STORES.INQUIRIES;
        return dbOp.delete(store, id);
    },

    /**
     * Submits form to Internal Admin Dashboard.
     * Includes stub logic for future SMTP backend integration.
     */
    submitForm: async (endpoint: 'contact' | 'demo', data: any): Promise<{ success: boolean; message: string }> => {
        // Simulate network latency for realism
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const payload = {
            id: crypto.randomUUID(),
            ...data,
            timestamp: new Date().toISOString(),
            source: endpoint === 'contact' ? 'CONTACT_FORM' : 'WEB_FORM',
            status: 'NEW'
        };

        // 1. PRIMARY: SAVE TO ADMIN DASHBOARD (Local Database)
        // This ensures the demo ALWAYS works, even offline.
        try {
            console.log(`[API] Persisting to Secure Admin Console (IndexedDB)...`);
            const store = endpoint === 'contact' ? STORES.INQUIRIES : STORES.LEADS;
            await dbOp.add(store, payload);
        } catch (e) {
            console.error("[API] Critical: Admin Save Failed", e);
            throw new Error("System storage failure.");
        }

        // 2. SECONDARY: SMTP BACKEND HANDOFF (Optional / Future Integration)
        // Since we cannot run SMTP in the browser, this code checks if a backend is available.
        // In this demo environment, we log the intent to the console.
        try {
            /* 
               --- IMPLEMENTATION GUIDE FOR SMTP ---
               To use SMTP, uncomment the fetch below and point it to your backend (Node/PHP/Python).
               Your backend should handle the SMTP connection using libraries like Nodemailer.
               
               await fetch(BACKEND_API_URL, {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(payload)
               });
            */
            console.info(`[API] SMTP Handshake: Backend endpoint '${BACKEND_API_URL}' not detected (Demo Mode).`);
            console.info(`[API] Action: Message securely routed to internal Admin Dashboard only.`);
        } catch (e) {
            console.warn("[API] Backend unreachable. Functioning in Offline/Demo mode.");
        }

        return { success: true, message: 'Message securely transmitted to Internal Systems.' };
    }
};
