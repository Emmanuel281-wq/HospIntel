import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Database, Activity, Users, Clock, ArrowUpRight, Wifi, WifiOff, AlertTriangle, ShieldCheck, HeartPulse, Battery, Server } from 'lucide-react';
import { Container } from './ui/Container';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [networkState, setNetworkState] = useState<'online' | 'offline'>('online');
  const navigate = useNavigate();
  
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

  return (
    <div ref={containerRef} className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#050505] min-h-screen flex flex-col justify-center">
      
      {/* Background Ambience */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%)",
              "radial-gradient(circle at 80% 70%, rgba(10,25,45,1) 0%, rgba(5,5,5,1) 100%)", 
              "radial-gradient(circle at 20% 30%, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-60"
        />
        <motion.div 
          style={{ x: springX, y: mouseY }}
          className="fixed top-0 left-0 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,rgba(234,179,8,0.03)_20%,transparent_70%)] rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 mix-blend-screen"
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
            {/* Holographic Glow */}
            <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/10 via-hosp-gold/5 to-transparent blur-3xl opacity-40 rounded-[2rem] group-hover:opacity-60 transition-opacity duration-700"></div>
            
            {/* Main Interface Frame */}
            <div className="rounded-xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative ring-1 ring-white/5">
              
              {/* Header: Network Status & Controls */}
              <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center justify-between px-4">
                 <div className="flex gap-4 items-center">
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#333] border border-white/10"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-[#333] border border-white/10"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-[#333] border border-white/10"></div>
                   </div>
                   <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
                   <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#71717A]">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span className="tracking-wide">SECURE_ENCLAVE :: ACTIVE</span>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <div className={`flex items-center gap-2 px-2 py-0.5 rounded border transition-all duration-500 ${
                     networkState === 'online' 
                       ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                       : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                   }`}>
                     <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                       networkState === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                     }`}></div>
                     <span className="text-[9px] font-mono font-bold tracking-wide">
                       {networkState === 'online' ? 'UPLINK_STABLE' : 'MESH_FALLBACK'}
                     </span>
                     {networkState === 'online' ? <Wifi size={10} /> : <WifiOff size={10} />}
                   </div>
                 </div>
              </div>

              {/* Main Workspace */}
              <div className="grid grid-cols-12 h-auto md:h-[450px]">
                {/* Left Sidebar: Navigation - Hidden on Mobile */}
                <div className="col-span-2 border-r border-white/5 bg-black/40 hidden md:flex flex-col justify-between p-2">
                   <div className="space-y-1">
                      {['Overview', 'Vitals', 'Patients', 'Staff', 'Pharm'].map((item, i) => (
                        <div key={item} className={`p-2 rounded cursor-pointer transition-all flex flex-col items-center gap-1 ${i === 0 ? 'bg-white/10 text-white' : 'text-[#52525B] hover:text-white hover:bg-white/5'}`}>
                           <div className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                           <span className="text-[9px] font-mono uppercase tracking-wider">{item}</span>
                        </div>
                      ))}
                   </div>
                   <div className="flex flex-col items-center gap-2 p-2">
                      <div className="w-6 h-6 rounded border border-white/10 flex items-center justify-center text-[#52525B]">
                         <Activity size={12} />
                      </div>
                   </div>
                </div>

                {/* Center Panel: Data Density */}
                <div className="col-span-12 md:col-span-10 p-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100">
                   
                   {/* Top Stats Row - Stacks on mobile */}
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      <div className="bg-[#111] border border-[#262626] rounded p-3 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-100 transition-opacity"><ArrowUpRight size={10} className="text-white"/></div>
                         <div className="text-[9px] font-mono text-[#71717A] uppercase mb-1">Total Census</div>
                         <div className="text-xl font-mono text-white">842 <span className="text-[10px] text-emerald-500">+12%</span></div>
                         <div className="w-full bg-[#262626] h-0.5 mt-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full w-[85%]"></div>
                         </div>
                      </div>
                      <div className="bg-[#111] border border-[#262626] rounded p-3">
                         <div className="text-[9px] font-mono text-[#71717A] uppercase mb-1">Critical Care</div>
                         <div className="text-xl font-mono text-white flex items-center gap-2">
                            28 <span className="px-1 py-0.5 bg-red-500/20 text-red-500 text-[8px] rounded border border-red-500/30">HIGH</span>
                         </div>
                         <div className="w-full bg-[#262626] h-0.5 mt-2 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full w-[45%]"></div>
                         </div>
                      </div>
                      <div className="bg-[#111] border border-[#262626] rounded p-3">
                         <div className="text-[9px] font-mono text-[#71717A] uppercase mb-1">Avg Wait</div>
                         <div className="text-xl font-mono text-white">14m <span className="text-[10px] text-emerald-500">▼ 2m</span></div>
                         <div className="w-full bg-[#262626] h-0.5 mt-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[92%]"></div>
                         </div>
                      </div>
                   </div>

                   {/* Map & Alerts Grid - Adapts height on mobile */}
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 h-auto sm:h-[280px]">
                      {/* Bed Map Visualization */}
                      <div className="col-span-1 sm:col-span-2 bg-[#0F0F0F] border border-[#262626] rounded p-3 relative overflow-hidden min-h-[200px]">
                         <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Unit A4 Map</span>
                            <div className="flex gap-2">
                               <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-blue-900 border border-blue-500"></div><span className="text-[8px] text-[#52525B]">OCC</span></div>
                               <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-[#1A1A1A] border border-[#333]"></div><span className="text-[8px] text-[#52525B]">VAC</span></div>
                            </div>
                         </div>
                         
                         {/* The Spatial Grid */}
                         <div className="grid grid-cols-6 gap-2 opacity-80">
                            {Array.from({ length: 18 }).map((_, i) => (
                               <div key={i} className={`aspect-square rounded-sm border relative group transition-all duration-300 ${
                                  [2, 5, 11, 14].includes(i) ? 'bg-[#1A1A1A] border-[#333]' : 'bg-blue-900/10 border-blue-500/30 hover:bg-blue-500/20'
                               }`}>
                                  {![2, 5, 11, 14].includes(i) && (
                                     <div className="absolute inset-0 flex items-center justify-center">
                                        <Users size={8} className="text-blue-500 opacity-60 group-hover:opacity-100" />
                                     </div>
                                  )}
                                  <div className="hidden sm:block absolute bottom-0.5 right-0.5 text-[6px] font-mono text-[#333] group-hover:text-[#71717A]">
                                     A4-{i+1}
                                  </div>
                               </div>
                            ))}
                         </div>
                         
                         {/* Scanning Line Effect */}
                         <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[scan_4s_linear_infinite] pointer-events-none"></div>
                      </div>

                      {/* Right Column: Live Feed & Alerts */}
                      <div className="col-span-1 flex flex-col gap-3">
                         {/* Network Graph Simulation */}
                         <div className="flex-1 bg-[#0F0F0F] border border-[#262626] rounded p-3 relative overflow-hidden min-h-[80px]">
                            <div className="flex justify-between items-center mb-2">
                               <span className="text-[10px] font-mono text-[#A1A1AA]">LATENCY</span>
                               <span className="text-[10px] font-mono text-emerald-500">12ms</span>
                            </div>
                            <div className="flex items-end gap-0.5 h-12 sm:h-16 w-full">
                               {Array.from({ length: 20 }).map((_, i) => (
                                  <motion.div 
                                    key={i}
                                    animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                                    className="flex-1 bg-blue-500/20 rounded-t-sm"
                                  ></motion.div>
                               ))}
                            </div>
                         </div>

                         {/* Alerts List */}
                         <div className="flex-1 bg-[#0F0F0F] border border-[#262626] rounded p-3 overflow-hidden min-h-[100px]">
                            <div className="flex justify-between items-center mb-2">
                               <span className="text-[10px] font-mono text-[#A1A1AA]">ALERTS</span>
                               <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            </div>
                            <div className="space-y-1.5">
                               <div className="p-1.5 rounded bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                                  <AlertTriangle size={10} className="text-red-500" />
                                  <div className="text-[8px] text-red-200">CODE BLUE • BED 4</div>
                               </div>
                               <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
                                  <Battery size={10} className="text-amber-500" />
                                  <div className="text-[8px] text-amber-200">UPS POWER • LAB 2</div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   {/* Footer Status */}
                   <div className="mt-4 flex items-center justify-between border-t border-[#262626] pt-2">
                      <div className="flex gap-4">
                         <div className="text-[9px] font-mono text-[#52525B]">CPU: 14%</div>
                         <div className="text-[9px] font-mono text-[#52525B]">MEM: 2.1GB</div>
                      </div>
                      <div className="text-[9px] font-mono text-[#333]">V2.4.0-RC4 // LAGOS_NODE</div>
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
                  Institutional OS v2.4
                </span>
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 text-white relative z-10 leading-[1.05]"
            >
              Critical <br />
              Infrastructure for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white animate-shimmer bg-[length:200%_auto]">
                Modern Healthcare.
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-[#A1A1AA] mb-10 max-w-xl leading-relaxed font-light tracking-wide"
            >
              The operating system for nations that value resilience. 
              Zero downtime, total data sovereignty, and military-grade encryption for the public sector.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => navigate('/request-demo')}
                className="group relative w-full sm:w-auto h-12 px-8 rounded-lg overflow-hidden bg-[#EDEDED] text-black font-semibold tracking-tight flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <span>Deploy HospIntel</span>
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