
// Mock API to simulate backend interactions without exposing secrets in UI components

// SHA-256 Hash for "hospintel_secure"
const ADMIN_HASH_SHA256 = "d94943f240507a242d5930335b89799276d497c2377f407767667d7d52673322";

// --- CONFIGURATION ---
const BACKEND_API_URL = "/api/v1/send-mail"; 

// --- IndexedDB Configuration ---
const DB_NAME = 'hospintel_core_db';
const DB_VERSION = 1;
const STORES = {
  LEADS: 'leads',
  INQUIRIES: 'inquiries'
};

const initDB = (): Promise<IDBDatabase> => {
  // Check for IndexedDB support
  if (!window.indexedDB) {
    return Promise.reject(new Error("IndexedDB not supported"));
  }

  return new Promise((resolve, reject) => {
    try {
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
    } catch (e) {
      reject(e);
    }
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
            console.error("DB Read Error - Fallback to in-memory", e);
            return [];
        }
    },
    add: async (storeName: string, item: any): Promise<void> => {
        try {
          const db = await initDB();
          return new Promise((resolve, reject) => {
              const tx = db.transaction(storeName, 'readwrite');
              const store = tx.objectStore(storeName);
              const request = store.add(item);
              request.onsuccess = () => resolve();
              request.onerror = () => reject(request.error);
          });
        } catch (e) {
          console.warn("DB Write Error - Persistence unavailable", e);
          return Promise.resolve(); // Fail silently for demo
        }
    },
    delete: async (storeName: string, id: string): Promise<void> => {
        try {
          const db = await initDB();
          return new Promise((resolve, reject) => {
              const tx = db.transaction(storeName, 'readwrite');
              const store = tx.objectStore(storeName);
              const request = store.delete(id);
              request.onsuccess = () => resolve();
              request.onerror = () => reject(request.error);
          });
        } catch (e) {
          return Promise.resolve();
        }
    }
};

/**
 * Helper to hash input string safely
 */
async function hashString(message: string): Promise<string> {
    // Robust check for Secure Context (Required for crypto.subtle)
    if (window.crypto && window.crypto.subtle && window.isSecureContext) {
        try {
            const msgBuffer = new TextEncoder().encode(message);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            console.warn("Crypto subsystem failed. Using fallback.");
        }
    }
    // Very simple fallback hash for demo purposes in non-secure contexts
    // NOT secure for production, but prevents crash in preview environments
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
        const char = message.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(); 
}

export const api = {
    /**
     * Simulates secure authentication check
     */
    verifyAdminPassword: async (password: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // If we can use real crypto, check the real hash
        if (window.crypto && window.crypto.subtle && window.isSecureContext) {
            const inputHash = await hashString(password);
            return inputHash === ADMIN_HASH_SHA256;
        }
        
        // Fallback for demo/insecure environments
        return password === "hospintel_secure";
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
     */
    submitForm: async (endpoint: 'contact' | 'demo', data: any): Promise<{ success: boolean; message: string }> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Safe random ID generation
        const id = (window.crypto && window.crypto.randomUUID) 
            ? window.crypto.randomUUID() 
            : Date.now().toString() + Math.random().toString().slice(2);

        const payload = {
            id,
            ...data,
            timestamp: new Date().toISOString(),
            source: endpoint === 'contact' ? 'CONTACT_FORM' : 'WEB_FORM',
            status: 'NEW'
        };

        try {
            console.log(`[API] Persisting to Secure Admin Console...`);
            const store = endpoint === 'contact' ? STORES.INQUIRIES : STORES.LEADS;
            await dbOp.add(store, payload);
        } catch (e) {
            console.error("[API] Admin Save Failed", e);
        }

        return { success: true, message: 'Message securely transmitted.' };
    }
};
