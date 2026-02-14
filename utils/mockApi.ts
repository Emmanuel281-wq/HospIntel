// Mock API to simulate backend interactions without exposing secrets in UI components

// SHA-256 Hash for "hospintel_secure"
const ADMIN_HASH_SHA256 = "d94943f240507a242d5930335b89799276d497c2377f407767667d7d52673322";

// Replace with your actual Formspree or backend endpoint
const PRODUCTION_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

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
     * Submits form to backend, falling back to IndexedDB if endpoint is not configured
     */
    submitForm: async (endpoint: 'contact' | 'demo', data: any): Promise<{ success: boolean; message: string }> => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const payload = {
            id: crypto.randomUUID(),
            ...data,
            timestamp: new Date().toISOString(),
            source: endpoint === 'contact' ? 'CONTACT_FORM' : 'WEB_FORM',
            status: 'NEW'
        };

        // 1. Try Production Endpoint (Formspree/API)
        try {
            if (PRODUCTION_ENDPOINT !== "https://formspree.io/f/YOUR_FORM_ID") {
                const response = await fetch(PRODUCTION_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (response.ok) {
                    // Even if sent to cloud, we might want to keep a local copy or just return success
                    return { success: true, message: 'Transmission successful.' };
                }
            }
        } catch (e) {
            console.warn("Backend unreachable, switching to offline persistence.");
        }

        // 2. Fallback: Persist to IndexedDB
        try {
            console.log(`[API] POST /v1/${endpoint} (INDEXED_DB)`, payload);
            const store = endpoint === 'contact' ? STORES.INQUIRIES : STORES.LEADS;
            await dbOp.add(store, payload);
            return { success: true, message: 'Record queued for processing (Local DB)' };
        } catch (e) {
            return { success: false, message: 'Storage quota exceeded' };
        }
    }
};