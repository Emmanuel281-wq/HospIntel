import React from 'react';
import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { Activity, Zap, Shield, Globe, Server } from 'lucide-react';

const Stat = ({ label, value, unit, trend }: any) => (
  <div className="flex flex-col">
    <div className="flex items-end gap-1 mb-1">
      <span className="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight">{value}</span>
      <span className="text-xs font-mono text-[#52525B] mb-1">{unit}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[10px] uppercase tracking-wider text-[#71717A]">{label}</span>
      <span className="text-[10px] text-green-500 font-mono">{trend}</span>
    </div>
  </div>
);

export const GlobalOperations: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden border-b border-[#1F1F1F]">
      {/* Map Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#050505] to-[#050505]"></div>
      </div>

      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Narrative */}
          <div className="w-full lg:w-1/3">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-6"
            >
               <Globe className="w-3 h-3" />
               <span>Sovereign Infrastructure</span>
            </motion.div>
            
            <motion.h2 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
            >
               National Scale <br/>
               <span className="text-[#52525B]">Operating Picture.</span>
            </motion.h2>
            
            <motion.p 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-[#A1A1AA] leading-relaxed mb-8"
            >
               HospIntel isn't just software; it's a governance layer. Administrators gain real-time visibility across distributed facility networks, from urban centers to remote clinics, without data sovereignty risks.
            </motion.p>

            <div className="grid grid-cols-2 gap-8 border-t border-[#1F1F1F] pt-8">
               <Stat label="Active Nodes" value="842" unit="sites" trend="+12%" />
               <Stat label="Data Sovereign" value="100" unit="%" trend="SECURED" />
               <Stat label="Trans. Volume" value="4.2" unit="M/day" trend="+8%" />
               <Stat label="Sync Latency" value="48" unit="ms" trend="STABLE" />
            </div>
          </div>

          {/* Right: The "Palantir" Map Visualization */}
          <div className="w-full lg:w-2/3">
             <div className="relative aspect-video rounded-xl bg-[#0A0A0A] border border-[#1F1F1F] p-1 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                
                {/* HUD Header */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-[#0A0A0A]/90 backdrop-blur border-b border-[#1F1F1F] flex items-center justify-between px-4 z-20">
                   <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                         <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500"></div>
                         <div className="w-2 h-2 rounded-full bg-amber-500/20 border border-amber-500"></div>
                         <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500"></div>
                      </div>
                      <span className="hidden sm:inline text-[10px] font-mono text-[#71717A]">LIVE_OPERATIONS_VIEW // REGION_AF_WEST</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-blue-500 animate-pulse">● LIVE STREAM</span>
                   </div>
                </div>

                {/* Map Area */}
                <div className="w-full h-full bg-[#080808] relative">
                   {/* Abstract Map Nodes */}
                   {[
                      { x: '20%', y: '40%', size: 'lg', status: 'active' },
                      { x: '45%', y: '30%', size: 'md', status: 'active' },
                      { x: '70%', y: '60%', size: 'xl', status: 'warning' },
                      { x: '30%', y: '70%', size: 'sm', status: 'active' },
                      { x: '80%', y: '30%', size: 'md', status: 'active' },
                   ].map((node, i) => (
                      <motion.div
                         key={i}
                         initial={{ scale: 0 }}
                         whileInView={{ scale: 1 }}
                         transition={{ delay: 0.3 + (i * 0.1) }}
                         style={{ left: node.x, top: node.y }}
                         className="absolute -translate-x-1/2 -translate-y-1/2 group/node cursor-pointer"
                      >
                         {/* Pulse Ring */}
                         <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${node.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                         
                         {/* Core Dot */}
                         <div className={`relative z-10 rounded-full border-2 border-[#0A0A0A] ${
                            node.size === 'xl' ? 'w-6 h-6' : node.size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'
                         } ${node.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>

                         {/* Hover Data Card */}
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none z-30">
                            <div className="bg-[#111] border border-[#262626] p-2 rounded whitespace-nowrap">
                               <div className="text-[9px] font-mono text-[#71717A] uppercase">Facility ID</div>
                               <div className="text-xs font-bold text-white">LOS_GEN_{100+i}</div>
                               <div className="text-[9px] font-mono text-blue-400 mt-1">SYNC: 14ms</div>
                            </div>
                         </div>
                      </motion.div>
                   ))}

                   {/* Connection Lines (SVG) */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <motion.path 
                         initial={{ pathLength: 0 }}
                         whileInView={{ pathLength: 1 }}
                         transition={{ duration: 2, delay: 1 }}
                         d="M 160 160 L 360 120 L 560 240 L 240 280 Z" 
                         fill="none" 
                         stroke="#3B82F6" 
                         strokeWidth="1" 
                      />
                   </svg>
                </div>

                {/* Bottom Stats Bar inside Map */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                   <div className="flex-1 bg-[#0A0A0A]/80 backdrop-blur border border-[#1F1F1F] p-2 rounded flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center gap-2 mb-1 sm:mb-0">
                         <Activity className="w-3 h-3 text-[#52525B]" />
                         <span className="text-[9px] sm:text-[10px] font-mono text-[#A1A1AA]">UPTIME</span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono text-white">99.99%</span>
                   </div>
                   <div className="flex-1 bg-[#0A0A0A]/80 backdrop-blur border border-[#1F1F1F] p-2 rounded flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center gap-2 mb-1 sm:mb-0">
                         <Zap className="w-3 h-3 text-[#52525B]" />
                         <span className="text-[9px] sm:text-[10px] font-mono text-[#A1A1AA]">OPS/S</span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono text-white">12k</span>
                   </div>
                   <div className="hidden sm:flex flex-1 bg-[#0A0A0A]/80 backdrop-blur border border-[#1F1F1F] p-2 rounded items-center justify-between">
                      <div className="flex items-center gap-2">
                         <Server className="w-3 h-3 text-[#52525B]" />
                         <span className="text-[10px] font-mono text-[#A1A1AA]">STORAGE</span>
                      </div>
                      <span className="text-xs font-mono text-white">4.2 PB</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </Container>
    </section>
  );
};