// Mock API to simulate backend interactions without exposing secrets in UI components

// SHA-256 Hash for "hospintel_secure"
// To change password, generate a new SHA-256 hash and replace this string.
const ADMIN_HASH_SHA256 = "d94943f240507a242d5930335b89799276d497c2377f407767667d7d52673322";

// Replace with your actual Formspree or backend endpoint
const PRODUCTION_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

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
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const inputHash = await hashString(password);
        return inputHash === ADMIN_HASH_SHA256;
    },

    /**
     * Submits form to backend, falling back to local storage if endpoint is not configured
     */
    submitForm: async (endpoint: 'contact' | 'demo', data: any): Promise<{ success: boolean; message: string }> => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const payload = {
            ...data,
            _timestamp: new Date().toISOString(),
            _source: endpoint === 'contact' ? 'CONTACT_FORM' : 'WEB_FORM'
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
                    return { success: true, message: 'Transmission successful.' };
                }
            }
        } catch (e) {
            console.warn("Backend unreachable, falling back to local persistence.");
        }

        // 2. Fallback: Persist to Local Storage (Demo Mode)
        try {
            console.log(`[API] POST /v1/${endpoint} (FALLBACK_MODE)`, payload);
            
            const key = endpoint === 'contact' ? 'hospintel_db_inquiries' : 'hospintel_db_demos';
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            const newRecord = {
                id: crypto.randomUUID(),
                ...payload,
                status: 'NEW'
            };
            localStorage.setItem(key, JSON.stringify([newRecord, ...existing]));
            return { success: true, message: 'Record queued for processing (Local)' };
        } catch (e) {
            return { success: false, message: 'Storage quota exceeded' };
        }
    }
};