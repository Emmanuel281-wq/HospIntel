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
                    <strong className="text-white block mb-1 font-sans">Hybrid Persistence</strong>
                    <span className="text-[#71717A]">SQLite with WASM layer ensures 0ms read/write latency during outages.</span>
                  </div>
               </div>

               <div className="flex items-start gap-4