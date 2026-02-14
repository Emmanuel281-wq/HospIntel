import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Activity, Users, Clock, ArrowUpRight, Wifi, WifiOff, AlertTriangle, ShieldCheck, UserPlus, Cloud, RefreshCw } from 'lucide-react';
import { Container } from './ui/Container';
import { useNavigate } from 'react-router-dom';

// Dashboard Simulation States
type DashboardPhase = 'OVERVIEW' | 'QUEUE' | 'ADMISSION' | 'OFFLINE' | 'SYNC';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [phase, setPhase] = useState<DashboardPhase>('OVERVIEW');
  const navigate = useNavigate();
  
  // Simulation Loop
  useEffect(() => {
    const cycle = async () => {
      // 1. Overview (Start)
      setPhase('OVERVIEW');
      await new Promise(r => setTimeout(r, 5000));

      // 2. Queue View
      setPhase('QUEUE');
      await new Promise(r => setTimeout(r, 4000));
      
      // 3. Admission View
      setPhase('ADMISSION');
      await new Promise(r => setTimeout(r, 3000));
      
      // 4. Offline Event (while in admission)
      setPhase('OFFLINE');
      await new Promise(r => setTimeout(r, 3500));
      
      // 5. Sync Event (while in admission)
      setPhase('SYNC');
      await new Promise(r => setTimeout(r, 3000));
      
      // Loop
      cycle();
    };
    cycle();
  }, []);

  // Mouse tracking for interactive spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(useMotionValue(0), { stiffness: 40, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Parallax & Scroll Transforms
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);
  const dashboardY = useTransform(scrollY, [0, 500], [0, 50]);
  const dashboardOpacity = useTransform(scrollY, [0, 400], [1, 0.5]);
  const dashboardScale = useTransform(scrollY, [0, 500], [1, 0.98]);
  const dashboardRotateX = useTransform(scrollY, [0, 500], [0, 5]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Derived state for UI elements
  const isOffline = phase === 'OFFLINE';
  const isSyncing = phase === 'SYNC';
  const networkStatusColor = isOffline ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  const statusLabel = isOffline ? 'MESH_FALLBACK' : isSyncing ? 'UPLINK_SYNCING' : 'UPLINK_STABLE';

  return (
    <div ref={containerRef} className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#050505] min-h-screen flex flex-col justify-center">
      
      {/* Background Ambience */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(25,30,40,1) 0%, rgba(5,5,5,1) 100%)",
              "radial-gradient(circle at 80% 70%, rgba(15,35,60,1) 0%, rgba(5,5,5,1) 100%)", 
              "radial-gradient(circle at 20% 30%, rgba(25,30,40,1) 0%, rgba(5,5,5,1) 100%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-70"
        />
        
        {/* Additional Glass Glow Layers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] mix-blend-screen pointer-events-none" />

        <motion.div 
          style={{ x: springX, y: mouseY }}
          className="fixed top-0 left-0 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,rgba(234,179,8,0.04)_20%,transparent_70%)] rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </motion.div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* --- DASHBOARD: The "Command Center" --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ 
              y: dashboardY, 
              opacity: dashboardOpacity, 
              scale: dashboardScale, 
              rotateX: dashboardRotateX 
            }}
            className="w-full lg:w-3/5 order-2 lg:order-1 relative perspective-[2000px] group"
          >
            {/* Holographic Glow - Enhanced */}
            <div className={`absolute -inset-1 bg-gradient-to-b transition-colors duration-1000 blur-2xl opacity-50 rounded-[2rem] group-hover:opacity-70 ${isOffline ? 'from-amber-500/20 via-red-500/10' : 'from-blue-500/20 via-hosp-gold/10'} to-transparent`}></div>
            
            {/* Main Interface Frame - Enhanced Glass Effect - Optimized Blur */}
            <div className="rounded-xl border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_50px_100px_-20px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)] overflow-hidden relative ring-1 ring-white/10">
              
              {/* Glossy Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-0" />
              
              {/* Header: Network Status & Controls */}
              <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center justify-between px-4 relative z-20">
                 <div className="flex gap-4 items-center">
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#333] border border-white/10"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-[#333] border border-white/10"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-[#333] border border-white/10"></div>
                   </div>
                   <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
                   <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#71717A]">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span className="tracking-wide">SECURE_ENCLAVE</span>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <motion.div 
                     key={statusLabel}
                     initial={{ opacity: 0, y: -5 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`flex items-center gap-2 px-2 py-0.5 rounded border transition-all duration-500 ${networkStatusColor}`}
                   >
                     <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                       isOffline ? 'bg-amber-500' : isSyncing ? 'bg-blue-400 animate-pulse' : 'bg-emerald-500 animate-pulse'
                     }`}></div>
                     <span className="text-[9px] font-mono font-bold tracking-wide">
                       {statusLabel}
                     </span>
                     {isOffline ? <WifiOff size={10} /> : isSyncing ? <RefreshCw size={10} className="animate-spin" /> : <Wifi size={10} />}
                   </motion.div>
                 </div>
              </div>

              {/* Main Workspace */}
              <div className="grid grid-cols-12 h-[380px] md:h-[420px] relative z-10">
                
                {/* Popups Overlay */}
                <div className="absolute top-4 right-4 left-4 z-50 flex flex-col gap-2 items-center pointer-events-none">
                   <AnimatePresence>
                      {isOffline && (
                        <motion.div 
                           initial={{ opacity: 0, y: -20, scale: 0.9 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, y: -20, scale: 0.9 }}
                           className="bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm text-amber-100 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3"
                        >
                           <WifiOff size={16} className="text-amber-500" />
                           <div className="flex flex-col">
                              <span className="text-xs font-bold">You are offline</span>
                              <span className="text-[10px] opacity-80">Switched to local storage. 0ms latency.</span>
                           </div>
                        </motion.div>
                      )}
                      {isSyncing && (
                        <motion.div 
                           initial={{ opacity: 0, y: -20, scale: 0.9 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, y: -20, scale: 0.9 }}
                           className="bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm text-blue-100 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3"
                        >
                           <Cloud size={16} className="text-blue-400" />
                           <div className="flex flex-col">
                              <span className="text-xs font-bold">Connection Restored</span>
                              <span className="text-[10px] opacity-80">Syncing pending records to cloud...</span>
                           </div>
                           <RefreshCw size={14} className="text-blue-400 animate-spin ml-2" />
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>

                {/* Left Sidebar */}
                <div className="col-span-2 border-r border-white/5 bg-black/40 hidden md:flex flex-col justify-between p-2">
                   <div className="space-y-1">
                      {['Overview', 'Queue', 'Admit', 'Vitals', 'Staff'].map((item, i) => {
                        // Highlight active nav based on phase
                        const isActive = 
                          (phase === 'OVERVIEW' && item === 'Overview') ||
                          (phase === 'QUEUE' && item === 'Queue') ||
                          ((phase === 'ADMISSION' || phase === 'OFFLINE' || phase === 'SYNC') && item === 'Admit');
                          
                        return (
                          <div key={item} className={`p-2 rounded transition-all flex flex-col items-center gap-1 ${isActive ? 'bg-white/10 text-white' : 'text-[#52525B]'}`}>
                             <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                             <span className="text-[9px] font-mono uppercase tracking-wider">{item}</span>
                          </div>
                        )
                      })}
                   </div>
                   <div className="flex flex-col items-center gap-2 p-2">
                      <div className="w-6 h-6 rounded border border-white/10 flex items-center justify-center text-[#52525B]">
                         <Activity size={12} />
                      </div>
                   </div>
                </div>

                {/* Center Content Area - Dynamic */}
                <div className="col-span-12 md:col-span-10 p-6 bg-[#050505]/80 relative overflow-hidden flex flex-col">
                   <div className="bg-noise absolute inset-0 opacity-20 pointer-events-none"></div>
                   
                   <AnimatePresence mode="wait">
                      {phase === 'OVERVIEW' ? (
                        <motion.div 
                           key="overview"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="flex-1 flex flex-col"
                        >
                           <div className="flex justify-between items-center mb-6">
                              <div>
                                 <h3 className="text-lg font-bold text-white mb-1">Facility Operations</h3>
                                 <p className="text-xs text-[#71717A]">General Hospital • Level 1 Trauma</p>
                              </div>
                              <div className="flex gap-2">
                                 <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-mono border border-emerald-500/20">CAPACITY_OK</span>
                              </div>
                           </div>

                           {/* Metrics Grid */}
                           <div className="grid grid-cols-3 gap-4 mb-6">
                               <div className="p-3 bg-[#111] rounded border border-[#262626]">
                                   <div className="flex items-center justify-between mb-1">
                                      <div className="text-[10px] text-[#52525B] uppercase">Census</div>
                                      <Users size={12} className="text-[#52525B]" />
                                   </div>
                                   <div className="text-xl font-mono text-white">142</div>
                                   <div className="text-[9px] text-emerald-500 mt-1">↑ 12% vs 24h</div>
                               </div>
                               <div className="p-3 bg-[#111] rounded border border-[#262626]">
                                   <div className="flex items-center justify-between mb-1">
                                      <div className="text-[10px] text-[#52525B] uppercase">Avg Wait</div>
                                      <Clock size={12} className="text-[#52525B]" />
                                   </div>
                                   <div className="text-xl font-mono text-white">18m</div>
                                   <div className="text-[9px] text-emerald-500 mt-1">-4m vs avg</div>
                               </div>
                               <div className="p-3 bg-[#111] rounded border border-[#262626]">
                                   <div className="flex items-center justify-between mb-1">
                                      <div className="text-[10px] text-[#52525B] uppercase">Diverted</div>
                                      <AlertTriangle size={12} className="text-[#52525B]" />
                                   </div>
                                   <div className="text-xl font-mono text-white">0</div>
                                   <div className="text-[9px] text-[#52525B] mt-1">Normal Ops</div>
                               </div>
                           </div>

                           {/* Occupancy Bars */}
                           <div className="space-y-4 mb-4">
                                <div className="space-y-1">
                                   <div className="flex justify-between text-[10px] uppercase text-[#52525B] font-mono">
                                      <span>ER Occupancy</span>
                                      <span>28 / 32</span>
                                   </div>
                                   <div className="h-1.5 w-full bg-[#111] rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }} 
                                        animate={{ width: '87%' }} 
                                        transition={{ duration: 1 }} 
                                        className="h-full bg-blue-500" 
                                      />
                                   </div>
                                </div>
                                <div className="space-y-1">
                                   <div className="flex justify-between text-[10px] uppercase text-[#52525B] font-mono">
                                      <span>ICU Capacity</span>
                                      <span>4 / 8</span>
                                   </div>
                                   <div className="h-1.5 w-full bg-[#111] rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }} 
                                        animate={{ width: '50%' }} 
                                        transition={{ duration: 1 }} 
                                        className="h-full bg-emerald-500" 
                                      />
                                   </div>
                                </div>
                                <div className="space-y-1">
                                   <div className="flex justify-between text-[10px] uppercase text-[#52525B] font-mono">
                                      <span>Inpatient Ward</span>
                                      <span>42 / 60</span>
                                   </div>
                                   <div className="h-1.5 w-full bg-[#111] rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }} 
                                        animate={{ width: '70%' }} 
                                        transition={{ duration: 1 }} 
                                        className="h-full bg-blue-500" 
                                      />
                                   </div>
                                </div>
                           </div>
                           
                           {/* Activity Feed Snippet */}
                           <div className="mt-auto border-t border-[#262626] pt-2">
                              <div className="text-[10px] font-mono text-[#52525B] mb-2 uppercase">Recent Activity</div>
                              <div className="space-y-2">
                                 <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-[#A1A1AA]">Patient 8921 Admitted to ER-4</span>
                                    <span className="text-[#52525B]">2m ago</span>
                                 </div>
                                 <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-[#A1A1AA]">Lab Results Ready: J. Doe</span>
                                    <span className="text-[#52525B]">5m ago</span>
                                 </div>
                              </div>
                           </div>

                        </motion.div>
                      ) : phase === 'QUEUE' ? (
                        <motion.div 
                           key="queue"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="flex-1 flex flex-col"
                        >
                           <div className="flex justify-between items-center mb-6">
                              <div>
                                 <h3 className="text-lg font-bold text-white mb-1">Visit & Queue Management</h3>
                                 <p className="text-xs text-[#71717A]">Emergency Dept • Zone A</p>
                              </div>
                              <div className="flex gap-4">
                                 <div className="text-right">
                                    <div className="text-[10px] text-[#52525B] uppercase">Waiting</div>
                                    <div className="text-xl font-mono text-white">14</div>
                                 </div>
                                 <div className="text-right">
                                    <div className="text-[10px] text-[#52525B] uppercase">Avg Time</div>
                                    <div className="text-xl font-mono text-emerald-500">12m</div>
                                 </div>
                              </div>
                           </div>

                           {/* Queue Table */}
                           <div className="flex-1 border border-[#262626] rounded-lg overflow-hidden bg-[#0A0A0A]">
                              <div className="grid grid-cols-4 bg-[#111] p-3 text-[10px] font-mono text-[#52525B] uppercase tracking-wider border-b border-[#262626]">
                                 <div>Patient</div>
                                 <div>Complaint</div>
                                 <div>Triage</div>
                                 <div className="text-right">Wait</div>
                              </div>
                              <div className="divide-y divide-[#1F1F1F]">
                                 {[
                                    { name: "Okonkwo, C.", issue: "Chest Pain", score: 1, time: "2m", status: "Critical" },
                                    { name: "Adeyemi, T.", issue: "Febrile", score: 3, time: "15m", status: "Stable" },
                                    { name: "Diallo, M.", issue: "Laceration", score: 4, time: "22m", status: "Stable" },
                                    { name: "Mensah, K.", issue: "Migraine", score: 3, time: "45m", status: "Stable" },
                                 ].map((p, i) => (
                                    <motion.div 
                                      key={i}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="grid grid-cols-4 p-3 text-xs items-center hover:bg-[#111]"
                                    >
                                       <div className="font-medium text-white">{p.name}</div>
                                       <div className="text-[#A1A1AA]">{p.issue}</div>
                                       <div>
                                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${p.score === 1 ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                             ESI-{p.score}
                                          </span>
                                       </div>
                                       <div className="text-right font-mono text-[#71717A]">{p.time}</div>
                                    </motion.div>
                                 ))}
                              </div>
                           </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                           key="admission"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="flex-1 flex flex-col"
                        >
                           <div className="flex justify-between items-center mb-6">
                              <div>
                                 <h3 className="text-lg font-bold text-white mb-1">New Admission</h3>
                                 <p className="text-xs text-[#71717A]">Create Patient Record</p>
                              </div>
                              <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500">
                                 <UserPlus size={16} />
                              </div>
                           </div>

                           <div className="space-y-4 max-w-md">
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-1">
                                    <label className="text-[10px] text-[#52525B] uppercase">First Name</label>
                                    <div className="h-9 bg-[#111] border border-[#262626] rounded px-3 flex items-center text-sm text-white">
                                       <motion.span
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.5 }}
                                       >
                                          Ibrahim
                                       </motion.span>
                                       <motion.div 
                                          animate={{ opacity: [0, 1] }} 
                                          transition={{ repeat: 3, duration: 0.8 }} 
                                          className="w-0.5 h-4 bg-blue-500 ml-0.5" 
                                       />
                                    </div>
                                 </div>
                                 <div className="space-y-1">
                                    <label className="text-[10px] text-[#52525B] uppercase">Last Name</label>
                                    <div className="h-9 bg-[#111] border border-[#262626] rounded px-3 flex items-center text-sm text-white">
                                       <motion.span
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 1 }}
                                       >
                                          Suleiman
                                       </motion.span>
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-1">
                                 <label className="text-[10px] text-[#52525B] uppercase">Chief Complaint</label>
                                 <div className="h-20 bg-[#111] border border-[#262626] rounded p-3 text-sm text-white">
                                    <motion.span
                                       initial={{ opacity: 0 }}
                                       animate={{ opacity: 1 }}
                                       transition={{ delay: 1.5 }}
                                    >
                                       Patient reporting acute abdominal pain (RLQ). Potential appendicitis.
                                    </motion.span>
                                 </div>
                              </div>

                              <div className="pt-2 flex gap-3">
                                 <button className="flex-1 h-9 bg-[#EDEDED] text-black font-medium rounded text-xs hover:bg-white transition-colors">
                                    {isOffline ? 'Save to Device (Local)' : isSyncing ? 'Syncing...' : 'Admit Patient'}
                                 </button>
                                 <button className="h-9 px-4 border border-[#333] text-[#A1A1AA] rounded text-xs hover:text-white">Cancel</button>
                              </div>
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                   
                   {/* Footer Status */}
                   <div className="mt-auto flex items-center justify-between border-t border-[#262626] pt-3">
                      <div className="flex gap-4">
                         <div className="text-[9px] font-mono text-[#52525B]">DB: SQLITE_WASM</div>
                         <div className="text-[9px] font-mono text-[#52525B]">
                            {isOffline ? 'PENDING_WRITES: 4' : 'SYNCED: OK'}
                         </div>
                      </div>
                      <div className="text-[9px] font-mono text-[#333]">V2.4.0-RC4</div>
                   </div>

                </div>
              </div>
            </div>
          </motion.div>

          {/* --- Right Side: Messaging --- */}
          <motion.div 
            className="w-full lg:w-2/5 order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left relative z-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8 relative inline-flex">
              <div className="relative inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-mono font-medium text-[#D4D4D8] tracking-widest uppercase">
                  HospIntel OS v1.0
                </span>
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 text-white relative z-10 leading-[1.05]"
            >
              Zero Downtime. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white animate-shimmer bg-[length:200%_auto]">
                Intelligent Sync.
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-[#E4E4E7] mb-10 max-w-xl leading-relaxed font-light tracking-wide"
            >
              Never let unstable internet stop your hospital operations. 
              Our EMR automatically switches between offline and online modes, synchronizing data to the cloud when connectivity returns.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => navigate('/request-demo')}
                className="group relative w-full sm:w-auto h-12 px-8 rounded-lg overflow-hidden bg-[#EDEDED] text-black font-semibold tracking-tight flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <span>Request Access</span>
                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
              
              <button 
                onClick={() => navigate('/technology')}
                className="group relative w-full sm:w-auto h-12 px-8 rounded-lg bg-transparent border border-[#333] hover:border-[#EDEDED] text-[#A1A1AA] hover:text-white font-medium tracking-tight flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span>Read the Whitepaper</span>
              </button>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </div>
  );
};