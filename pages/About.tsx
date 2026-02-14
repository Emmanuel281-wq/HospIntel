import React from 'react';
import { Container } from '../components/ui/Container';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Globe, Server, Terminal } from 'lucide-react';

const StatBlock = ({ value, label }: any) => (
  <div className="border-l border-[#262626] pl-6">
    <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{value}</div>
    <div className="text-sm text-[#71717A] font-mono uppercase tracking-wide">{label}</div>
  </div>
);

export const About: React.FC = () => {
  const { scrollY } = useScroll();
  
  // 3D Animation for the "Origin Block"
  const rotateX = useTransform(scrollY, [0, 500], [0, 5]);
  const y = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.98]);

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-blue-900/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <Container className="relative z-10 max-w-6xl">
        {/* Header with 3D Visual */}
        <div className="flex flex-col lg:flex-row gap-16 mb-32 items-center">
           <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F0F0F] border border-[#262626] text-[#52525B] text-[10px] font-mono uppercase tracking-widest mb-8"
              >
                <MapPin className="w-3 h-3" />
                <span>EST. 2026 — LAGOS, NIGERIA</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1] mb-12"
              >
                We believe that <span className="text-[#333]">reliability</span> is <br/>
                the most critical feature of <br/>
                African healthcare.
              </motion.h1>

              <div className="text-lg text-[#A1A1AA] leading-relaxed font-light space-y-6">
                <p>
                  Hospitals in Nigeria and across the continent are complex operational environments. They face unique infrastructure challenges—unstable power, fluctuating connectivity, and high patient volume. Yet, they are forced to use software built for the West that crumbles when the internet flickers.
                </p>
              </div>
           </div>

           {/* 3D Visual: The Origin Block */}
           <motion.div 
              style={{ rotateX, y, opacity, scale }}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/2 w-full perspective-[2000px] group"
           >
              {/* Holographic Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent blur-3xl opacity-40 rounded-[2rem] group-hover:opacity-60 transition-opacity duration-700"></div>

              <div className="relative rounded-xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/5 p-8 h-[400px] flex flex-col justify-between">
                 <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                 
                 <div className="relative z-10 flex justify-between items-start">
                    <div className="flex items-center gap-2">
                       <Globe className="w-5 h-5 text-blue-500" />
                       <span className="text-xs font-mono text-white">NETWORK_ORIGIN</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#52525B]">
                       6.5244° N, 3.3792° E
                    </div>
                 </div>

                 {/* Abstract Map Nodes */}
                 <div className="relative flex-1 flex items-center justify-center">
                    <div className="relative w-48 h-48 rounded-full border border-[#262626] flex items-center justify-center animate-[spin_60s_linear_infinite]">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                       <div className="absolute bottom-10 right-2 w-1.5 h-1.5 bg-[#333] rounded-full"></div>
                       <div className="absolute top-10 left-4 w-1.5 h-1.5 bg-[#333] rounded-full"></div>
                    </div>
                    <div className="absolute w-32 h-32 rounded-full border border-dashed border-[#333] animate-[spin_40s_linear_infinite_reverse]"></div>
                    <div className="absolute w-4 h-4 bg-white rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                       <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    </div>
                 </div>

                 <div className="relative z-10 border-t border-[#1F1F1F] pt-4 flex justify-between items-center">
                    <div className="text-xs text-[#A1A1AA]">Active Nodes</div>
                    <div className="font-mono text-white">1,240+</div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-[#1F1F1F] py-12">
           <StatBlock value="99.9%" label="Availability Target" />
           <StatBlock value="<50ms" label="Local Latency" />
           <StatBlock value="Resilient" label="Sync Engine" />
           <StatBlock value="Pan-African" label="Focus" />
        </div>

        {/* Engineering Philosophy */}
        <div className="mb-32">
           <h2 className="text-2xl font-bold text-white mb-12">Engineering Principles</h2>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                 { title: "Hybrid Connectivity", desc: "We anticipate network fluctuations. The application seamlessly switches between online and offline modes to ensure continuity." },
                 { title: "Speed is Safety", desc: "A slow interface causes clinical errors. We optimize for sub-frame interaction times on standard hardware." },
                 { title: "Radical Simplicity", desc: "Complexity is the enemy of reliability. We ruthlessly prune features that do not serve the core mission." }
              ].map((item, i) => (
                 <div key={i} className="group">
                    <div className="w-8 h-px bg-[#262626] group-hover:bg-blue-500 transition-colors mb-6"></div>
                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-[#71717A] leading-relaxed">{item.desc}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* Team / Culture */}
        <div className="bg-[#0A0A0A]/50 backdrop-blur-sm rounded-2xl border border-[#1F1F1F] p-12 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Terminal className="w-64 h-64" />
           </div>
           
           <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Built for Resilience</h2>
           <p className="text-[#A1A1AA] max-w-2xl mx-auto mb-8 leading-relaxed relative z-10">
              Our team is built on a foundation of rigorous engineering standards and deep healthcare insight. We are dedicated to creating systems that withstand the unique infrastructure challenges of the African continent.
           </p>
           
           <div className="inline-flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all relative z-10">
              <div className="h-8 w-24 bg-[#1F1F1F] rounded flex items-center justify-center text-[10px] text-[#52525B] font-mono">RELIABILITY</div>
              <div className="h-8 w-24 bg-[#1F1F1F] rounded flex items-center justify-center text-[10px] text-[#52525B] font-mono">ENGINEERING</div>
              <div className="h-8 w-24 bg-[#1F1F1F] rounded flex items-center justify-center text-[10px] text-[#52525B] font-mono">HEALTH_OPS</div>
           </div>
        </div>

      </Container>
    </div>
  );
};