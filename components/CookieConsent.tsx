import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cookie, X, Check, Server, Wifi, WifiOff, FileText, Settings } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

// --- Types ---
interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  timestamp: string;
}

// --- IndexedDB Utility for Offline Persistence ---
const DB_NAME = 'hospintel_sys_db';
const STORE_NAME = 'user_preferences';

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
  });
};

const saveToIndexedDB = async (prefs: CookiePreferences) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ key: 'cookie_consent', value: prefs });
  } catch (e) {
    console.warn('[SYS] Failed to write to IndexedDB (Offline Storage)', e);
  }
};

// --- Component ---
export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: true,
    timestamp: new Date().toISOString()
  });

  // Initialization Logic
  useEffect(() => {
    const checkConsent = async () => {
      // 1. Check LocalStorage (Fastest)
      const localConsent = localStorage.getItem('hospintel_cookie_consent');
      
      if (!localConsent) {
        // 2. Check IndexedDB (Offline/Persistent Fallback)
        try {
          const db = await initDB();
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const request = store.get('cookie_consent');
          
          request.onsuccess = () => {
            if (!request.result) {
              // No consent found anywhere, show banner
              // Small delay for UI smoothness
              setTimeout(() => setIsVisible(true), 1500);
            } else {
              setPreferences(request.result.value);
            }
          };
        } catch (e) {
          setIsVisible(true);
        }
      } else {
        setPreferences(JSON.parse(localConsent));
      }
    };

    checkConsent();
  }, []);

  const handleSave = (prefs: CookiePreferences) => {
    const timestampedPrefs = { ...prefs, timestamp: new Date().toISOString() };
    
    // 1. Save to LocalStorage
    localStorage.setItem('hospintel_cookie_consent', JSON.stringify(timestampedPrefs));
    
    // 2. Save to IndexedDB (Offline Support)
    saveToIndexedDB(timestampedPrefs);
    
    // 3. Cloud Sync (If Online)
    if (navigator.onLine) {
      // Mock API call
      console.log('[NET] Syncing consent telemetry to LOS-1 Control Plane...');
    }

    setIsVisible(false);
    setShowModal(false);
    setPreferences(timestampedPrefs);
  };

  const acceptAll = () => handleSave({ necessary: true, functional: true, timestamp: '' });
  const rejectOptional = () => handleSave({ necessary: true, functional: false, timestamp: '' });

  // --- Render Helpers ---
  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    disabled = false 
  }: { checked: boolean; onChange?: () => void; disabled?: boolean }) => (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`
        relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${checked ? 'bg-blue-600 border border-blue-500' : 'bg-[#171717] border border-[#333]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      aria-pressed={checked}
      role="switch"
    >
      <span className="sr-only">Toggle setting</span>
      <span
        className={`
          inline-block w-4 h-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );

  return (
    <>
      {/* --- Bottom Banner --- */}
      <AnimatePresence>
        {isVisible && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 w-full z-[60] border-t border-[#1F1F1F] bg-[#0A0A0A]/95 backdrop-blur-md shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.8)]"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                
                {/* Text Content */}
                <div className="flex items-start gap-4 max-w-2xl">
                  <div className="hidden sm:flex w-10 h-10 rounded bg-[#111] border border-[#262626] items-center justify-center text-[#52525B] shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                      System Telemetry & Storage Protocols
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      We use cookies and local storage to enhance your experience and ensure proper functionality. 
                      By continuing, you agree to our <Link to="/legal/privacy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">Privacy Policy</Link>.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowModal(true)}
                    className="text-xs font-mono border border-[#333] hover:border-[#555]"
                  >
                    <Settings className="w-3 h-3 mr-2" />
                    Manage Preferences
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={rejectOptional}
                    className="text-xs"
                  >
                    Reject Optional
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={acceptAll}
                    className="text-xs min-w-[100px]"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Preferences Modal --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-[#262626] rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#1F1F1F] bg-[#0F0F0F]">
                <div className="flex items-center gap-3">
                  <Cookie className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg font-bold text-white">Storage Preferences</h2>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-[#52525B] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <p className="text-sm text-[#A1A1AA] mb-6">
                  Manage how HospIntel stores data on your local device. 
                  Preferences are synchronized with your institutional profile when connectivity allows.
                </p>

                {/* Necessary Cookies */}
                <div className="flex items-start gap-4 p-4 rounded bg-[#111] border border-[#262626] opacity-70 cursor-not-allowed">
                   <div className="mt-1">
                      <Server className="w-5 h-5 text-[#52525B]" />
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                         <h4 className="text-sm font-bold text-white">Essential Protocols</h4>
                         <span className="text-[10px] font-mono text-blue-400 border border-blue-500/20 bg-blue-500/10 px-1.5 py-0.5 rounded">REQUIRED</span>
                      </div>
                      <p className="text-xs text-[#71717A] leading-relaxed">
                         Strictly necessary for authentication, session security, and the offline-first sync engine. 
                         These cannot be disabled.
                      </p>
                   </div>
                   <ToggleSwitch checked={true} disabled={true} />
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start gap-4 p-4 rounded bg-[#111] border border-[#262626]">
                   <div className="mt-1">
                      <FileText className="w-5 h-5 text-blue-500" />
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                         <h4 className="text-sm font-bold text-white">Functional & Analytics</h4>
                         <span className="text-[10px] font-mono text-[#52525B] border border-[#333] bg-[#171717] px-1.5 py-0.5 rounded">OPTIONAL</span>
                      </div>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                         Allows us to monitor system performance (latency, uptime) and remember UI preferences like dashboard layout.
                      </p>
                   </div>
                   <ToggleSwitch 
                     checked={preferences.functional} 
                     onChange={() => setPreferences(prev => ({ ...prev, functional: !prev.functional }))} 
                   />
                </div>
                
                {/* Sync Status Indicator */}
                <div className="flex items-center gap-2 pt-2">
                   {navigator.onLine ? (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#52525B]">
                         <Wifi className="w-3 h-3 text-green-500" />
                         CLOUD_SYNC_READY
                      </div>
                   ) : (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#52525B]">
                         <WifiOff className="w-3 h-3 text-amber-500" />
                         OFFLINE_MODE (LOCAL_SAVE)
                      </div>
                   )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#1F1F1F] bg-[#0F0F0F] flex justify-end gap-3">
                 <Button variant="ghost" onClick={() => setShowModal(false)} className="text-xs">Cancel</Button>
                 <Button onClick={() => handleSave(preferences)} className="text-xs">Save Preferences</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};