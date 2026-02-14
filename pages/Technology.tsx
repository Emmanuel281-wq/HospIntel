import React from 'react';
import { Container } from '../components/ui/Container';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  WifiOff, GitMerge, Zap, Database, Globe, 
  Cpu, Network, Code, Server, 
  Activity, ArrowRight
} from 'lucide-react';

const TechCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 rounded-xl bg-[#0A0A0A]/50 backdrop-blur-sm border border-[#1F1F1F] hover:border-[#333] group transition-all duration-300 hover:bg-[#0A0A0A]"
  >
     <div className="w-12 h-12 rounded-lg bg-[#111] border border-[#262626] flex items-center justify-center text-[#52525B] group-hover:text-blue-500 group-hover:border-blue-500/20 mb-6 transition-all shadow-sm">
        <Icon className="w-6 h-6" />
     </div>
     <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
     <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
  </motion.div>
);

const CodeBlock = () => (
  <div className="rounded-lg bg-[#080808] border border-[#1F1F1F] p-4 font-mono text-[10px] md:text-xs leading-relaxed overflow-x-auto shadow-inner">
    <div className="text-[#52525B] mb-2 select-none"># Sync Protocol Definition (v2.4)</div>
    <div className="text-purple-400">type</div> <div className="text-yellow-200 inline">SyncState</div> <div className="text-white inline">=</div> <div className="text-white inline">{`{`}</div>
    <div className="pl-4 text-[#A1A1AA]">
      <div>vector_clock: <span className="text-blue-400">Map&lt;NodeID, number&gt;</span>;</div>
      <div>merkle_root: <span className="text-blue-400">Hash</span>;</div>
      <div>pending_ops: <span className="text-blue-400">Operation[]</span>;</div>
      <div>last_gossip: <span className="text-blue-400">Timestamp</span>;</div>
    </div>
    <div className="text-white">{`}`}</div>
    <br/>
    <div className="text-blue-400">async function</div> <div className="text-yellow-200 inline">reconcile</div><div className="text-white inline">(peer: Node) {`{`}</div>
    <div className="pl-4 text-[#A1A1AA]">
      <div className="text-[#52525B]">// Hybrid Logical Clock resolution</div>
      <div>const delta = calculateDelta(local.state, peer.state);</div>
      <div>await apply(delta, <span className="text-orange-400">Strategy.LWW</span>);</div>
    </div>
    <div className="text-white">{`}`}</div>
  </div>
);

export const Technology: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Dashboard Animation Values
  const rotateX = useTransform(scrollY, [0, 500], [0, 5]);
  const y = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.98]);

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-blue-950/20 rounded-full blur-[150px] pointer-events-none" />
      
      <Container className="relative z-10">
         {/* Hero Header */}
         <div className="max-w-4xl mb-24">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-2 mb-6"
            >
               <span className="w-2 h-2 rounded-full bg-blue-500"></span>
               <span className="text-xs font-mono text-blue-500 uppercase tracking-widest">Distributed Systems Engineering</span>
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-8"
            >
               The Resilient <br/>
               <span className="text-[#333]">Hybrid Model.</span>
            </motion.h1>
            
            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl"
            >
               HospIntel fortifies the traditional cloud model. We utilize local caching as an automatic failover mechanism, 
               enabling instant reads/writes during outages and background synchronization that respects the laws of physics.
            </motion.p>
         </div>

         {/* Architecture Visualization */}
         <div className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
            <motion.div
              style={{ rotateX, y, opacity, scale }}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative perspective-[2000px] group"
            >
               {/* Holographic Glow */}
               <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/10 via-hosp-gold/5 to-transparent blur-3xl opacity-40 rounded-[2rem] group-hover:opacity-60 transition-opacity duration-700"></div>
               
               {/* Main Interface Frame */}
               <div className="rounded-xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative ring-1 ring-white/5 p-1">
                  <div className="rounded-lg bg-[#050505] border border-[#1F1F1F] p-6 relative overflow-hidden">
                     <div className="flex justify-between items-center mb-6 border-b border-[#1F1F1F] pb-4">
                        <div className="flex items-center gap-2">
                           <Activity className="w-4 h-4 text-blue-500" />
                           <span className="text-xs font-mono text-white">SYNC_ENGINE_STATUS</span>
                        </div>
                        <div className="flex gap-1">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#333]"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-[#333]"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-[#333]"></div>
                        </div>
                     </div>
                     <CodeBlock />
                  </div>
               </div>
            </motion.div>

            <div>
               <h3 className="text-2xl font-bold text-white mb-6">Conflict-Free Resolution</h3>
               <p className="text-[#A1A1AA] mb-8 leading-relaxed">
                  Traditional databases lock rows. HospIntel uses Conflict-free Replicated Data Types (CRDTs) to allow concurrent edits from multiple disconnected nurses or doctors. When connectivity is restored, the mathematical properties of the data structure ensure a consistent state without manual merging.
               </p>
               
               <div className="space-y-4">
                  {[
                     { label: "Hybrid Logical Clocks", desc: "For causality tracking across distributed nodes." },
                     { label: "Merkle Trees", desc: "Efficient delta calculation to minimize bandwidth." },
                     { label: "Gossip Protocol", desc: "Epidemic broadcast for rapid mesh propagation." }
                  ].map((item, i) => (
                     <div key={i} className="flex gap-4 p-4 rounded bg-[#0F0F0F] border border-[#1F1F1F]">
                        <div className="mt-1">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        </div>
                        <div>
                           <div className="text-sm font-bold text-white mb-1">{item.label}</div>
                           <div className="text-xs text-[#71717A]">{item.desc}</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Technical Grid */}
         <div className="mb-32">
            <div className="flex items-center justify-between mb-12 border-b border-[#1F1F1F] pb-6">
               <h2 className="text-3xl font-bold text-white">Core Stack</h2>
               <div className="font-mono text-xs text-[#52525B]">Architecture v2.4.0</div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
               <TechCard 
                  delay={0.1}
                  icon={WifiOff}
                  title="Adaptive Edge Core"
                  desc="Applications utilize a local SQLite cache. The UI never blocks on network requests, ensuring instant responsiveness regardless of uplink status."
               />
               <TechCard 
                  delay={0.2}
                  icon={GitMerge}
                  title="Automated Merging"
                  desc="Our custom sync engine handles thousands of concurrent object mutations per second, resolving conflicts deterministically at the edge."
               />
               <TechCard 
                  delay={0.3}
                  icon={Cpu}
                  title="Edge Computation"
                  desc="Critical logic—triage scoring, drug interaction checks—runs on the client device. No server round-trip required for decision support."
               />
               <TechCard 
                  delay={0.4}
                  icon={Database}
                  title="Data Locality"
                  desc="Patient records are intelligently prefetched based on department shifts. Your data is physically present where it is needed."
               />
               <TechCard 
                  delay={0.5}
                  icon={Network}
                  title="Mesh Networking"
                  desc="In catastrophic failures, devices fallback to peer-to-peer syncing over LAN or Bluetooth Low Energy to maintain operational continuity."
               />
               <TechCard 
                  delay={0.6}
                  icon={Globe}
                  title="Global Replication"
                  desc="Multi-region active-active deployment ensures that data is durable and available even if an entire availability zone goes dark."
               />
            </div>
         </div>

         {/* Protocol Support */}
         <div className="bg-[#0A0A0A]/50 backdrop-blur-sm border border-[#1F1F1F] rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <Server className="w-64 h-64" />
            </div>
            
            <div className="relative z-10">
               <h2 className="text-3xl font-bold text-white mb-8">Interoperability Standards</h2>
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                     { std: "FHIR R4", desc: "Native Resource Support" },
                     { std: "HL7 v2/v3", desc: "Legacy Bridge Adapter" },
                     { std: "DICOMweb", desc: "Imaging Integration" },
                     { std: "SMART on FHIR", desc: "App Platform" }
                  ].map((p, i) => (
                     <div key={i} className="border-t border-[#262626] pt-4">
                        <div className="text-lg font-mono font-bold text-white mb-2">{p.std}</div>
                        <div className="text-sm text-[#71717A]">{p.desc}</div>
                     </div>
                  ))}
               </div>
               
               <div className="mt-12 flex items-center gap-2 text-sm text-[#52525B]">
                  <ArrowRight className="w-4 h-4" />
                  Full API documentation available in the Developer Portal
               </div>
            </div>
         </div>

      </Container>
    </div>
  );
};