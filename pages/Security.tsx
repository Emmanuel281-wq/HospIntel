import React from 'react';
import { Container } from '../components/ui/Container';
import { ShieldCheck, Lock, Server, FileCheck, EyeOff, Key, AlertTriangle, Fingerprint, Scan, Shield, Activity } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SecurityMetric = ({ label, value, status }: any) => (
  <div className="p-4 rounded bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#1F1F1F] flex items-center justify-between shadow-sm">
    <div>
      <div className="text-[10px] font-mono text-[#52525B] uppercase mb-1">{label}</div>
      <div className="text-lg font-mono text-white">{value}</div>
    </div>
    <div className={`w-2 h-2 rounded-full ${status === 'good' ? 'bg-blue-500' : 'bg-amber-500'} animate-pulse`} />
  </div>
);

export const Security: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Dashboard Animation Values
  const rotateX = useTransform(scrollY, [0, 500], [0, 5]);
  const y = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.98]);

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-900/5 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-24 relative">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F0F0F] border border-[#262626] text-blue-500 text-[10px] font-mono uppercase tracking-widest mb-6"
           >
             <Shield className="w-3 h-3" />
             <span>Zero Trust Architecture</span>
           </motion.div>
           
           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
             Defense in <br/><span className="text-[#333]">Depth.</span>
           </h1>
           
           <p className="text-xl text-[#A1A1AA] max-w-2xl leading-relaxed">
             Security is not a wrapper; it is the architecture. Every node is an island of verification. 
             Every request is mutually authenticated. Every byte is encrypted.
           </p>
        </div>

        {/* Live Monitor Visualization */}
        <div className="mb-32">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Threat Map with Dashboard Styling */}
              <motion.div 
                style={{ rotateX, y, opacity, scale }}
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-2 relative perspective-[2000px] group"
              >
                 {/* Holographic Glow */}
                 <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/10 via-hosp-gold/5 to-transparent blur-3xl opacity-40 rounded-[2rem] group-hover:opacity-60 transition-opacity duration-700"></div>
                 
                 {/* Main Interface Frame */}
                 <div className="rounded-xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative ring-1 ring-white/5 p-1 h-full min-h-[350px]">
                    <div className="bg-[#050505] rounded-lg p-6 h-full relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6 relative z-10">
                           <h3 className="text-sm font-bold text-white flex items-center gap-2">
                              <Activity className="w-4 h-4 text-blue-500" />
                              LIVE_THREAT_MONITOR
                           </h3>
                           <span className="text-[10px] font-mono text-[#52525B]">REGION: GLOBAL</span>
                        </div>
                        
                        {/* Simulated Graph Lines */}
                        <div className="absolute inset-0 flex items-end justify-between px-6 pb-0 opacity-20 pointer-events-none">
                           {[40, 60, 35, 70, 50, 80, 45, 60, 75, 50].map((h, i) => (
                              <div key={i} className="w-full mx-1 bg-blue-500 transition-all duration-1000" style={{ height: `${h}%` }}></div>
                           ))}
                        </div>
                        
                        {/* Data Overlay */}
                        <div className="grid grid-cols-2 gap-8 relative z-10 mt-12">
                           <div>
                              <div className="text-[10px] text-[#52525B] mb-1">INTRUSION ATTEMPTS (24H)</div>
                              <div className="text-3xl font-mono text-white">0</div>
                           </div>
                           <div>
                              <div className="text-[10px] text-[#52525B] mb-1">AUTH SUCCESS RATE</div>
                              <div className="text-3xl font-mono text-white">99.99%</div>
                           </div>
                        </div>
                    </div>
                 </div>
              </motion.div>

              {/* Status Sidebars */}
              <div className="space-y-4">
                 <SecurityMetric label="ENCRYPTION" value="AES-256-GCM" status="good" />
                 <SecurityMetric label="TLS VERSION" value="1.3 (STRICT)" status="good" />
                 <SecurityMetric label="KEY ROTATION" value="24H AUTO" status="good" />
                 <SecurityMetric label="AUDIT LOG" value="IMMUTABLE" status="good" />
              </div>
           </div>
        </div>

        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-12 mb-32 border-t border-[#1F1F1F] pt-16">
           <div>
              <div className="w-10 h-10 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-white mb-6">
                 <Fingerprint className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Identity & Access</h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
                 Strict Role-Based Access Control (RBAC) enforced at the object level. Multi-factor authentication is mandatory for all clinical workflows.
              </p>
              <ul className="text-sm text-[#71717A] space-y-2 font-mono">
                 <li>• FIDO2 Hardware Support</li>
                 <li>• Biometric Session Lock</li>
                 <li>• Just-in-Time Provisioning</li>
              </ul>
           </div>

           <div>
              <div className="w-10 h-10 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-white mb-6">
                 <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Data Encryption</h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
                 Data is encrypted before it leaves the device. We use end-to-end encryption for synchronization, ensuring not even the transport layer can see patient data.
              </p>
              <ul className="text-sm text-[#71717A] space-y-2 font-mono">
                 <li>• Client-Side Encryption</li>
                 <li>• Per-Tenant Key Management</li>
                 <li>• Zero-Knowledge Architecture</li>
              </ul>
           </div>

           <div>
              <div className="w-10 h-10 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-white mb-6">
                 <Scan className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Threat Detection</h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
                 Anomalous behavior detection runs locally on each node. Unusual access patterns trigger immediate lockouts and alerts to the central security operations center.
              </p>
              <ul className="text-sm text-[#71717A] space-y-2 font-mono">
                 <li>• Heuristic Analysis</li>
                 <li>• Device Fingerprinting</li>
                 <li>• Automated Containment</li>
              </ul>
           </div>
        </div>

        {/* Compliance Strip */}
        <div className="bg-[#0A0A0A]/50 backdrop-blur-sm border border-[#1F1F1F] rounded-xl p-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                 <h3 className="text-lg font-bold text-white mb-1">Compliance Standards</h3>
                 <p className="text-sm text-[#71717A]">Engineered to align with global healthcare data standards.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                 {['HIPAA', 'SOC 2', 'GDPR', 'HITECH', 'ISO 27001'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded bg-[#111] border border-[#262626] text-xs font-mono text-[#A1A1AA] hover:text-white hover:border-[#404040] transition-colors cursor-default">
                       {tag}_READY
                    </span>
                 ))}
              </div>
           </div>
        </div>
      </Container>
    </div>
  );
};