import React from 'react';
import { Container } from '../components/ui/Container';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, Users, Activity, Database, 
  Settings, Layers, Network, Lock, 
  FileJson, Zap, ArrowRight, LayoutTemplate,
  GitBranch, Server, Terminal, Cpu
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// Technical Badge Component
const TechBadge = ({ children }: { children?: React.ReactNode }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/10 border border-blue-500/20 text-blue-400 tracking-tight">
    {children}
  </span>
);

const FeatureRow = ({ title, desc, icon: Icon, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-start gap-4 p-6 border-b border-[#1F1F1F] hover:bg-white/[0.02] transition-colors group"
  >
    <div className="mt-1 w-8 h-8 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-[#52525B] group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all shadow-sm">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <h3 className="text-base font-medium text-[#EDEDED] mb-1 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-sm text-[#D4D4D8] leading-relaxed max-w-xl">{desc}</p>
    </div>
  </motion.div>
);

export const Product: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Dashboard Animation Values
  const rotateX = useTransform(scrollY, [0, 500], [0, 5]);
  const y = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.98]);

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Header Section */}
        <div className="mb-32 border-b border-[#1F1F1F] pb-20">
          <div className="flex flex-col lg:flex-row gap-20 items-end">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F0F0F] border border-[#262626] text-blue-500 text-[10px] font-mono uppercase tracking-widest mb-8"
              >
                <Layers className="w-3 h-3" />
                <span>System Architecture v2.4</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-8 leading-tight"
              >
                Precision Engineering for <span className="text-[#333]">Clinical Scale.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-[#E4E4E7] leading-relaxed max-w-xl font-light"
              >
                HospIntel is a modular operating system designed to handle the complexity of modern hospital environments without the fragility of legacy cloud software.
              </motion.p>
            </div>

            {/* Architecture Abstract Visual */}
            <motion.div 
              style={{ rotateX, y, opacity, scale }}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full relative perspective-[2000px] group"
            >
              {/* Holographic Glow */}
              <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/10 via-hosp-gold/5 to-transparent blur-3xl opacity-40 rounded-[2rem] group-hover:opacity-60 transition-opacity duration-700"></div>

              {/* Main Interface Frame */}
              <div className="relative rounded-xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/5 p-6">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 p-4 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#262626]" />
                  <div className="w-2 h-2 rounded-full bg-[#262626]" />
                </div>

                {/* Stack Visualization */}
                <div className="space-y-2 relative z-10 font-mono text-xs">
                  {/* Layer 1 */}
                  <div className="p-4 rounded border border-[#333] bg-[#0F0F0F] flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <LayoutTemplate className="w-4 h-4 text-blue-400" />
                      <span className="text-[#EDEDED]">Interface Layer</span>
                    </div>
                    <span className="text-[#71717A]">React / Optimistic UI</span>
                  </div>
                  
                  {/* Connection */}
                  <div className="h-4 w-px bg-[#333] mx-auto relative">
                     <div className="absolute top-0 left-0 w-full h-full bg-blue-500/50 blur-[1px] animate-pulse"></div>
                  </div>

                  {/* Layer 2 */}
                  <div className="p-4 rounded border border-[#333] bg-[#0F0F0F] flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <span className="text-[#EDEDED]">Sync Engine</span>
                    </div>
                    <span className="text-[#71717A]">CRDT / WebSocket</span>
                  </div>

                  {/* Connection */}
                  <div className="h-4 w-px bg-[#333] mx-auto relative">
                     <div className="absolute top-0 left-0 w-full h-full bg-blue-500/50 blur-[1px] animate-pulse"></div>
                  </div>

                  {/* Layer 3 */}
                  <div className="p-4 rounded border border-[#333] bg-[#0F0F0F] flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Database className="w-4 h-4 text-blue-400" />
                      <span className="text-[#EDEDED]">Local Persistence</span>
                    </div>
                    <span className="text-[#71717A]">SQLite / WASM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Core Modules Grid (Bento Style) */}
        <div className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-white">Core Modules</h2>
            <div className="hidden md:flex gap-2">
              <TechBadge>TSX</TechBadge>
              <TechBadge>RUST</TechBadge>
              <TechBadge>SQLITE</TechBadge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[minmax(180px,auto)] gap-4">
            
            {/* Large Feature: Patient Index */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="md:col-span-6 lg:col-span-8 row-span-2 p-8 rounded-xl bg-[#0A0A0A]/50 backdrop-blur-sm border border-[#1F1F1F] hover:border-[#333] transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s] duration-[1500ms] group-hover:bg-[position:200%_0,0_0]" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-blue-500 mb-6">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Patient Index & Master Record</h3>
                <p className="text-[#D4D4D8] text-lg mb-8 max-w-lg">
                  A unified, eventually-consistent patient registry that resolves duplicates automatically. 
                  Access millions of records in sub-10ms via local indexing.
                </p>
                
                <div className="mt-auto grid grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-[#111] border border-[#262626]">
                    <div className="text-[10px] font-mono text-[#52525B] uppercase mb-1">Index Speed</div>
                    <div className="text-xl font-mono text-white">4ms</div>
                  </div>
                  <div className="p-3 rounded bg-[#111] border border-[#262626]">
                    <div className="text-[10px] font-mono text-[#52525B] uppercase mb-1">Records</div>
                    <div className="text-xl font-mono text-white">∞</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Triage */}
            <motion.div className="md:col-span-3 lg:col-span-4 p-6 rounded-xl bg-[#0A0A0A]/50 backdrop-blur-sm border border-[#1F1F1F] hover:border-[#333] transition-all group">
              <div className="flex justify-between items-start mb-4">
                <Activity className="w-6 h-6 text-blue-500" />
                <TechBadge>ALGORITHM</TechBadge>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Clinical Triage</h3>
              <p className="text-sm text-[#D4D4D8]">
                Logic-gated workflows for emergency intake. Prioritizes patients based on vitals and resource availability.
              </p>
            </motion.div>

            {/* Security */}
            <motion.div className="md:col-span-3 lg:col-span-4 p-6 rounded-xl bg-[#0A0A0A]/50 backdrop-blur-sm border border-[#1F1F1F] hover:border-[#333] transition-all group">
              <div className="flex justify-between items-start mb-4">
                <Lock className="w-6 h-6 text-blue-500" />
                <TechBadge>AES-256</TechBadge>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Role-Based Access</h3>
              <p className="text-sm text-[#D4D4D8]">
                Granular permission sets tied to cryptographic keys. Session handling works completely offline.
              </p>
            </motion.div>

            {/* Inventory */}
            <motion.div className="md:col-span-3 lg:col-span-4 p-6 rounded-xl bg-[#0A0A0A]/50 backdrop-blur-sm border border-[#1F1F1F] hover:border-[#333] transition-all group">
              <div className="flex justify-between items-start mb-4">
                <Database className="w-6 h-6 text-blue-500" />
                <TechBadge>REAL-TIME</TechBadge>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Resource Inventory</h3>
              <p className="text-sm text-[#D4D4D8]">
                Track beds, ventilators, and medication stock with optimistic updates that sync in background.
              </p>
            </motion.div>

            {/* Audit */}
            <motion.div className="md:col-span-3 lg:col-span-4 p-6 rounded-xl bg-[#0A0A0A]/50 backdrop-blur-sm border border-[#1F1F1F] hover:border-[#333] transition-all group">
              <div className="flex justify-between items-start mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
                <TechBadge>IMMUTABLE</TechBadge>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Compliance & Audit</h3>
              <p className="text-sm text-[#D4D4D8]">
                Every action is signed and appended to a tamper-proof local log before upstream synchronization.
              </p>
            </motion.div>
            
            {/* Developer Experience / API - Full Width */}
            <motion.div className="md:col-span-6 lg:col-span-4 p-6 rounded-xl bg-[#0F0F0F] border border-[#262626] relative overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-4 border-b border-[#262626] pb-2">
                <Terminal className="w-4 h-4 text-[#71717A]" />
                <span className="text-xs font-mono text-[#71717A]">api_preview.ts</span>
              </div>
              <div className="font-mono text-[10px] leading-relaxed text-blue-300">
                <span className="text-hosp-gold">interface</span> <span className="text-blue-200">Patient</span> {'{'}
                <br/>&nbsp;&nbsp;id: <span className="text-blue-400">string</span>;
                <br/>&nbsp;&nbsp;vitals: <span className="text-blue-400">VitalsGraph</span>;
                <br/>&nbsp;&nbsp;status: <span className="text-blue-400">'TRIAGE'</span> | <span className="text-blue-400">'ADMITTED'</span>;
                <br/>&nbsp;&nbsp;syncState: <span className="text-blue-400">SyncMetadata</span>;
                <br/>{'}'}
              </div>
              <div className="mt-auto pt-4">
                <h3 className="text-sm font-semibold text-white">Typed API</h3>
                <p className="text-xs text-[#71717A]">Full TypeScript support out of the box.</p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Detailed Features List */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
             <h2 className="text-3xl font-bold text-white mb-8">Platform Capabilities</h2>
             <div className="border-t border-[#1F1F1F]">
               <FeatureRow 
                 delay={0.1}
                 title="Distributed Sync"
                 desc="Conflict resolution is handled automatically using Hybrid Logical Clocks (HLC). No manual merging required."
                 icon={GitBranch}
               />
               <FeatureRow 
                 delay={0.2}
                 title="Interoperability"
                 desc="Native FHIR R4 support ensures seamless integration with existing EMRs (Epic, Cerner) via our bridge utility."
                 icon={Network}
               />
               <FeatureRow 
                 delay={0.3}
                 title="Self-Healing Nodes"
                 desc="If a node is corrupted, it automatically rebuilds its state from the nearest healthy peer or upstream server."
                 icon={Server}
               />
               <FeatureRow 
                 delay={0.4}
                 title="JSON-RPC Interface"
                 desc="Full programmatic access to all system functions via a secured local loopback interface."
                 icon={FileJson}
               />
             </div>
          </div>
          
          <div className="relative">
             <div className="sticky top-32">
                <div className="p-8 rounded-2xl bg-[#0A0A0A]/80 backdrop-blur-md border border-[#1F1F1F] relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-20">
                      <Settings className="w-40 h-40 text-[#52525B] animate-[spin_60s_linear_infinite]" />
                   </div>
                   
                   <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Integration Ready</h3>
                   <p className="text-[#A1A1AA] mb-8 relative z-10 leading-relaxed">
                      HospIntel isn't a walled garden. It connects to your existing infrastructure through standard protocols.
                   </p>
                   
                   <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between p-4 rounded bg-[#111] border border-[#262626]">
                         <span className="text-sm font-mono text-[#A1A1AA]">HL7 / FHIR Bridge</span>
                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded bg-[#111] border border-[#262626]">
                         <span className="text-sm font-mono text-[#A1A1AA]">DICOM Viewer</span>
                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded bg-[#111] border border-[#262626]">
                         <span className="text-sm font-mono text-[#A1A1AA]">Billing (X12)</span>
                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                   </div>

                   <div className="mt-8 pt-8 border-t border-[#262626]">
                      <Button className="w-full justify-between group">
                         View Developer Docs
                         <ArrowRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-white transition-colors" />
                      </Button>
                   </div>
                </div>
             </div>
          </div>
        </div>

      </Container>
    </div>
  );
};