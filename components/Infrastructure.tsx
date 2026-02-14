import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './ui/Container';
import { Database, Share2, ShieldAlert, Play, Pause, Power, RefreshCw } from 'lucide-react';

// --- Sub-components for the Visualization ---

interface NodeProps {
  x: string;
  y: string;
  label: string;
  isOffline: boolean;
  isMaster?: boolean;
  isSyncing: boolean;
}

const Node: React.FC<NodeProps> = ({ x, y, label, isOffline, isMaster, isSyncing }) => (
  <motion.div 
    className="absolute flex flex-col items-center justify-center z-20"
    style={{ left: x, top: y }}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
  >
    <div className="relative group cursor-pointer">
      {/* Pulse Effect - Blue for Cloud, Amber for Mesh, Green for Active Sync */}
      <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
        isSyncing ? 'bg-green-500 duration-300' : 
        isMaster ? (isOffline ? 'bg-red-500' : 'bg-blue-500') : 
        (isOffline ? 'bg-amber-500' : 'bg-blue-500')
      }`} />
      
      {/* Node Core */}
      <div className={`relative z-10 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-colors duration-500 ${
        isMaster 
          ? (isOffline ? 'bg-red-900/50 border-red-500' : 'bg-blue-500 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.5)]') 
          : (isOffline ? 'bg-[#1a1500] border-amber-500' : 'bg-[#00102b] border-blue-500')
      }`}>
        {isMaster && isOffline && (
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500 text-red-500 text-[9px] px-1.5 rounded whitespace-nowrap">ERR_CON</div>
        )}
        {isSyncing && !isMaster && (
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500/10 border border-green-500 text-green-500 text-[9px] px-1.5 rounded whitespace-nowrap">SYNC</div>
        )}
      </div>
    </div>
    <div className={`mt-2 text-[9px] font-mono font-bold tracking-wider transition-colors duration-500 ${isOffline && !isMaster ? 'text-amber-500' : 'text-[#52525B]'}`}>
      {label}
    </div>
  </motion.div>
);

interface ConnectionProps {
  start: {x: string, y: string};
  end: {x: string, y: string};
  active: boolean;
  color: string;
  dashed?: boolean;
}

const Connection: React.FC<ConnectionProps> = ({ start, end, active, color, dashed = false }) => {
  return (
    <motion.line 
      x1={start.x} y1={start.y} x2={end.x} y2={end.y}
      stroke={color} 
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: active ? 1 : 0, 
        opacity: active ? 0.4 : 0,
        strokeDasharray: dashed ? "4 4" : "0 0"
      }}
      transition={{ duration: 0.5 }}
    />
  );
};

export const Infrastructure: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isAuto, setIsAuto] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[SYS] INITIALIZING DAEMON...",
    "[NET] UPLINK ESTABLISHED (Latency: 45ms)",
    "[SYNC] CLOUD POLLING ACTIVE"
  ]);

  // Simulation Loop
  useEffect(() => {
    let cycle: any;
    
    if (isAuto) {
      cycle = setInterval(() => {
        setIsOffline(prev => !prev);
      }, 6000);
    }

    return () => clearInterval(cycle);
  }, [isAuto]);

  // Handle State Changes & Logging
  useEffect(() => {
    if (isOffline) {
      setLogs(prev => [...prev.slice(-4), `[ERR] UPLINK TIMEOUT (503)`, `[MESH] DISCOVERY_PROTOCOL_INIT`, `[MESH] PEERS CONNECTED: 4`, `[DB] WRITE_MODE: LOCAL_WAL`]);
      setIsSyncing(false);
    } else {
      setLogs(prev => [...prev.slice(-4), `[NET] UPLINK RESTORED`, `[SYNC] MERKLE_TREE_EXCHANGE`, `[SYNC] DELTA_UPLOAD: 14kb`, `[SYS] STATE_CONSISTENT`]);
      
      // Trigger temporary sync effect
      setIsSyncing(true);
      const timer = setTimeout(() => setIsSyncing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOffline]);

  // Node Positions (Percentages)
  const nodes = [
    { id: 'master', x: '50%', y: '50%', label: 'CLOUD_RELAY', isMaster: true }, // Center
    { id: 'n1', x: '20%', y: '20%', label: 'ICU_01' },
    { id: 'n2', x: '80%', y: '20%', label: 'ER_TRIAGE' },
    { id: 'n3', x: '80%', y: '80%', label: 'PHARMACY' },
    { id: 'n4', x: '20%', y: '80%', label: 'LAB_TECH' },
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#050505] border-y border-[#1F1F1F] relative overflow-hidden" id="topology">
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
               <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-6 h-6 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-500/10 transition-colors">
                    <Database size={12} />
                  </div>
                  <div>
                    <strong className="text-white block mb-1 font-sans">Hybrid Persistence</strong>
                    <span className="text-[#71717A]">SQLite with WASM layer ensures 0ms read/write latency during outages.</span>
                  </div>
               </div>

               <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-6 h-6 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-500/10 transition-colors">
                    <Share2 size={12} />
                  </div>
                  <div>
                    <strong className="text-white block mb-1 font-sans">Gossip Protocol</strong>
                    <span className="text-[#71717A]">Changes propagate laterally between devices on the same LAN without touching the internet.</span>
                  </div>
               </div>

               <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-6 h-6 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-500/10 transition-colors">
                    <ShieldAlert size={12} />
                  </div>
                  <div>
                    <strong className="text-white block mb-1 font-sans">Conflict Resolution</strong>
                    <span className="text-[#71717A]">Mathematical guarantees (LWW-Element-Set) prevent data corruption during merges.</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right Column: The Visualizer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
             <div className="rounded-xl bg-[#0A0A0A] border border-[#1F1F1F] p-1 shadow-2xl relative">
                {/* Status Bar Header */}
                <div className="bg-[#0F0F0F] border-b border-[#1F1F1F] px-4 py-2 flex flex-col md:flex-row items-center justify-between rounded-t-lg gap-2 md:gap-0">
                   <div className="flex items-center gap-3 w-full md:w-auto">
                      <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></div>
                      <span className="text-[10px] font-mono text-[#71717A]">
                         MODE: <span className={isOffline ? 'text-amber-500' : 'text-green-500'}>{isOffline ? 'MESH_FALLBACK' : 'CLOUD_LINKED'}</span>
                      </span>
                   </div>
                   
                   {/* Interactive Controls */}
                   <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsAuto(!isAuto)} 
                        className={`px-2 py-1 rounded border text-[9px] font-mono flex items-center gap-1 transition-colors ${isAuto ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-[#111] border-[#333] text-[#71717A]'}`}
                      >
                         {isAuto ? <Pause size={10} /> : <Play size={10} />}
                         {isAuto ? 'AUTO_LOOP' : 'MANUAL'}
                      </button>
                      
                      <div className="h-4 w-px bg-[#333]"></div>

                      <button 
                         onClick={() => { setIsAuto(false); setIsOffline(true); }}
                         className={`p-1.5 rounded hover:bg-red-500/10 hover:text-red-400 transition-colors ${isOffline ? 'text-red-500 bg-red-500/10' : 'text-[#52525B]'}`}
                         title="Simulate Outage"
                      >
                         <Power size={12} />
                      </button>

                      <button 
                         onClick={() => { setIsAuto(false); setIsOffline(false); }}
                         className={`p-1.5 rounded hover:bg-green-500/10 hover:text-green-400 transition-colors ${!isOffline ? 'text-green-500 bg-green-500/10' : 'text-[#52525B]'}`}
                         title="Restore Connection"
                      >
                         <RefreshCw size={12} />
                      </button>
                   </div>
                </div>

                {/* Simulation Area */}
                <div className="relative aspect-[16/9] bg-[#050505] overflow-hidden">
                   {/* Grid Background */}
                   <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                   
                   {/* SVG Connections Layer */}
                   <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                      {/* Cloud Links (Blue) */}
                      {nodes.filter(n => !n.isMaster).map(node => (
                         <Connection 
                           key={`cloud-${node.id}`} 
                           start={{x: node.x, y: node.y}} 
                           end={{x: '50%', y: '50%'}} 
                           active={!isOffline} 
                           color="#3B82F6" 
                         />
                      ))}

                      {/* Mesh Links (Amber) - Peripheral Loop */}
                      <>
                        <Connection key="mesh-1" start={{x: '20%', y: '20%'}} end={{x: '80%', y: '20%'}} active={isOffline} color="#EAB308" dashed />
                        <Connection key="mesh-2" start={{x: '80%', y: '20%'}} end={{x: '80%', y: '80%'}} active={isOffline} color="#EAB308" dashed />
                        <Connection key="mesh-3" start={{x: '80%', y: '80%'}} end={{x: '20%', y: '80%'}} active={isOffline} color="#EAB308" dashed />
                        <Connection key="mesh-4" start={{x: '20%', y: '80%'}} end={{x: '20%', y: '20%'}} active={isOffline} color="#EAB308" dashed />
                        {/* Cross links */}
                        <Connection key="mesh-5" start={{x: '20%', y: '20%'}} end={{x: '80%', y: '80%'}} active={isOffline} color="#EAB308" dashed />
                      </>
                   </svg>

                   {/* Render Nodes */}
                   {nodes.map(node => (
                      <Node 
                        key={node.id} 
                        x={node.x} 
                        y={node.y} 
                        label={node.label} 
                        isOffline={isOffline} 
                        isMaster={node.isMaster} 
                        isSyncing={isSyncing}
                      />
                   ))}

                   {/* Floating Data Packets (Simulated) */}
                   <AnimatePresence>
                      {isOffline && (
                         <motion.div 
                           initial={{ left: '20%', top: '20%', opacity: 1 }}
                           animate={{ left: '80%', top: '80%', opacity: 0 }}
                           transition={{ duration: 1.5, repeat: Infinity }}
                           className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)] z-30"
                         />
                      )}
                      {!isOffline && (
                         <motion.div 
                           initial={{ left: '20%', top: '20%', opacity: 1 }}
                           animate={{ left: '50%', top: '50%', opacity: 0 }}
                           transition={{ duration: 1, repeat: Infinity }}
                           className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] z-30"
                         />
                      )}
                   </AnimatePresence>
                </div>

                {/* Terminal Footer */}
                <div className="bg-[#080808] border-t border-[#1F1F1F] p-4 font-mono text-[10px] md:text-xs h-32 overflow-y-hidden relative">
                   <div className="absolute top-2 right-2 text-[#333] text-[9px]">SYS_LOG_TAIL</div>
                   <div className="space-y-1">
                      {logs.map((log, i) => (
                         <motion.div 
                           key={i} 
                           initial={{ opacity: 0, x: -10 }} 
                           animate={{ opacity: 1, x: 0 }} 
                           className={`${log.includes('[ERR]') ? 'text-red-400' : log.includes('[MESH]') ? 'text-amber-400' : log.includes('[SYNC]') ? 'text-blue-400' : 'text-[#A1A1AA]'}`}
                         >
                            <span className="opacity-50 mr-2">{new Date().toLocaleTimeString()}</span>
                            {log}
                         </motion.div>
                      ))}
                   </div>
                   {/* Gradient fade at bottom */}
                   <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
                </div>
             </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};