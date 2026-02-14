import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './ui/Container';
import { Network, Database, Wifi, WifiOff, Server } from 'lucide-react';

export const Infrastructure: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Initial stable logs
    setLogs([
        "[SYS] INITIALIZING DAEMON...",
        "[NET] LISTENING ON PORT 443",
        "[DAG] GRAPH SYNCED: OK",
        "[INFO] UPLINK DETECTED",
        "[NET] HANDSHAKE_ACK (LOS-1)",
        "[SUCCESS] SYNC_COMPLETE"
    ]);
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#050505] border-y border-[#1F1F1F] relative overflow-hidden">
      {/* Technical Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
      
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3"
          >
            <div className="flex items-center gap-2 text-[#52525B] font-mono text-[10px] uppercase tracking-widest mb-6">
              <div className="w-2 h-2 bg-[#3B82F6] rounded-sm"></div>
              <span>Network Topology // v2.4</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Unbreakable <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Mesh Connectivity.</span>
            </h2>
            
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-8 border-l-2 border-[#1F1F1F] pl-4">
              When the central uplink fails, HospIntel nodes instantly form a peer-to-peer mesh. Clinical data is preserved locally and synchronized laterally using CRDTs until connectivity is restored.
            </p>

            <div className="space-y-6 font-mono text-xs">
               <div className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-blue-500 shrink-0">
                    <Database size={12} />
                  </div>
                  <div>
                    <strong className="text-white block mb-1 font-sans">Local-First Persistence</strong>
                    <span className="text-[#71717A]">SQLite with WASM layer ensures 0ms read/write latency on every device.</span>
                  </div>
               </div>

               <div className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-blue-500 shrink-0">
                    <Network size={12} />
                  </div>
                  <div>
                    <strong className="text-white block mb-1 font-sans">Automatic Peer Discovery</strong>
                    <span className="text-[#71717A]">Nodes broadcast availability over LAN/Bluetooth when WAN is unreachable.</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right Column: NOC Monitor Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/3"
          >
             <div className="relative rounded-lg bg-[#030303] border border-[#1F1F1F] overflow-hidden shadow-2xl">
                {/* Header Bar */}
                <div className="h-8 border-b border-[#1F1F1F] bg-[#0A0A0A] flex items-center justify-between px-3">
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#52525B]">TOPOLOGY_VIEWER</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#171717] text-[9px] font-mono text-[#A1A1AA]">LOS-VI-1</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-amber-500 animate-pulse' : 'bg-blue-500'}`}></div>
                      <span className={`text-[9px] font-mono ${isOffline ? 'text-amber-500' : 'text-blue-500'}`}>
                        {isOffline ? 'MESH_MODE' : 'CLOUD_LINKED'}
                      </span>
                   </div>
                </div>

                <div className="flex flex-col md:flex-row h-auto md:h-[400px]">
                   {/* Main Visualization Area */}
                   <div className="flex-1 relative bg-[#050505] flex items-center justify-center overflow-hidden h-[300px] md:h-auto">
                      {/* Grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                      
                      <svg className="w-full h-full max-w-[400px]" viewBox="0 0 400 400">
                         <g transform="translate(200, 200)">
                            {/* Satellite Nodes */}
                            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                               const rad = (deg * Math.PI) / 180;
                               const x = Math.cos(rad) * 120;
                               const y = Math.sin(rad) * 120;
                               
                               return (
                                  <g key={i}>
                                     {/* Connection to Center (Cloud) */}
                                     <motion.line 
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                                        x1={0} y1={0} x2={x} y2={y}
                                        stroke={isOffline ? "#1F1F1F" : "#3B82F6"}
                                        strokeOpacity={isOffline ? 0.5 : 0.4}
                                        strokeWidth="1"
                                     />
                                     
                                     {/* Active Data Flow (Cloud) */}
                                     {!isOffline && (
                                       <motion.circle r="1.5" fill="#3B82F6">
                                          <animateMotion 
                                            dur="2s" 
                                            repeatCount="indefinite" 
                                            path={`M0,0 L${x},${y}`} 
                                            keyPoints={i % 2 === 0 ? "0;1" : "1;0"} 
                                            keyTimes="0;1" 
                                          />
                                       </motion.circle>
                                     )}

                                     {/* Mesh Connections (Neighbor) */}
                                     {isOffline && (
                                        <motion.line
                                           initial={{ pathLength: 0, opacity: 0 }}
                                           animate={{ pathLength: 1, opacity: 0.4 }}
                                           x1={x} y1={y}
                                           x2={Math.cos(((deg + 60) * Math.PI) / 180) * 120}
                                           y2={Math.sin(((deg + 60) * Math.PI) / 180) * 120}
                                           stroke="#F59E0B"
                                           strokeWidth="1"
                                           strokeDasharray="2 2"
                                        />
                                     )}
                                     
                                     {/* Node Graphic */}
                                     <motion.circle 
                                      initial={{ scale: 0 }}
                                      whileInView={{ scale: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                                      cx={x} cy={y} r="4" fill="#0A0A0A" stroke={isOffline ? "#F59E0B" : "#3B82F6"} strokeWidth="1.5" 
                                     />
                                  </g>
                               )
                            })}

                            {/* Center Hub */}
                            <motion.circle 
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ duration: 0.5 }}
                              r={isOffline ? 15 : 20} fill="#0A0A0A" stroke={isOffline ? "#262626" : "#3B82F6"} strokeWidth="1.5" 
                            />
                            <foreignObject x="-10" y="-10" width="20" height="20">
                               <div className={`w-full h-full flex items-center justify-center ${isOffline ? 'text-[#333]' : 'text-blue-500'}`}>
                                  {isOffline ? <WifiOff size={10} /> : <Server size={10} />}
                               </div>
                            </foreignObject>
                         </g>
                      </svg>
                   </div>

                   {/* Sidebar: Logs & Telemetry */}
                   <div className="w-full md:w-56 border-t md:border-t-0 md:border-l border-[#1F1F1F] bg-[#080808] p-4 flex flex-col font-mono">
                      <div className="mb-6">
                        <div className="text-[9px] text-[#52525B] uppercase mb-2">System Status</div>
                        <div className="flex justify-between items-center mb-1">
                           <span className="text-[10px] text-[#A1A1AA]">Uplink</span>
                           <span className={`text-[10px] ${isOffline ? 'text-red-500' : 'text-blue-500'}`}>
                             {isOffline ? 'DOWN' : 'ACTIVE'}
                           </span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                           <span className="text-[10px] text-[#A1A1AA]">Mesh Peers</span>
                           <span className={`text-[10px] ${isOffline ? 'text-amber-500' : 'text-[#333]'}`}>
                             {isOffline ? '6/6' : 'IDLE'}
                           </span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] text-[#A1A1AA]">Sync Pend</span>
                           <span className="text-[10px] text-[#EDEDED]">{isOffline ? '142 objs' : '0 objs'}</span>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col min-h-[120px]">
                        <div className="text-[9px] text-[#52525B] uppercase mb-2">Event Log</div>
                        <div className="flex-1 overflow-hidden relative">
                           <div className="absolute bottom-0 left-0 w-full space-y-1.5">
                              <AnimatePresence>
                                {logs.map((log, i) => (
                                  <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[9px] text-[#71717A] truncate"
                                  >
                                    <span className="text-[#333] mr-1">›</span> {log}
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};