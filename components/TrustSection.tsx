import React from 'react';
import { Container } from './ui/Container';
import { Activity, ShieldCheck, Database, Server } from 'lucide-react';

const TickerItem = ({ label, value, color = "text-white" }: { label: string, value: string, color?: string }) => (
  <div className="flex items-center gap-2 px-6 border-r border-[#262626]/50 h-full">
    <span className="text-[9px] font-mono text-[#52525B] uppercase tracking-wider">{label}</span>
    <span className={`text-xs font-mono font-medium ${color}`}>{value}</span>
  </div>
);

export const TrustSection: React.FC = () => {
  const facilityTypes = [
    "ACUTE CARE CENTERS", "SPECIALTY CLINICS", "GENERAL HOSPITALS", 
    "DIAGNOSTIC LABS", "PRIVATE PRACTICE", "EMERGENCY UNITS"
  ];

  return (
    <div className="border-b border-[#1F1F1F] bg-[#050505] relative z-20">
      <div className="flex flex-col md:flex-row items-stretch">
        
        {/* Left: System Status - Static on Desktop, Stacked on Mobile */}
        <div className="w-full md:w-auto bg-[#0A0A0A] border-b md:border-b-0 md:border-r border-[#1F1F1F] px-6 py-4 flex items-center justify-between md:justify-start gap-4 z-20">
           <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold text-white tracking-widest">SYSTEM_OPTIMAL</span>
           </div>
           <div className="text-[10px] font-mono text-[#52525B]">
              LATENCY: 12ms
           </div>
        </div>

        {/* Right: Scrolling Ticker */}
        <div className="flex-1 overflow-hidden relative bg-[#050505] h-12 flex items-center">
            {/* Gradient Masks */}
            <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee whitespace-nowrap items-center h-full">
               {[...Array(2)].map((_, setIndex) => (
                 <React.Fragment key={setIndex}>
                   {/* Metrics */}
                   <TickerItem label="ARCHITECTURAL_TARGET" value="HIGH AVAILABILITY" />
                   <TickerItem label="SYNC_ENGINE" value="ACTIVE" color="text-blue-400" />
                   <TickerItem label="TARGET_UPTIME" value="99.9%" color="text-emerald-400" />
                   
                   {/* Divider */}
                   <div className="px-6 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#333]"></div>
                   </div>

                   {/* Facility Types */}
                   <div className="flex items-center px-6 gap-2">
                      <span className="text-[9px] font-mono text-[#52525B] uppercase tracking-wider">DESIGNED FOR:</span>
                   </div>
                   {facilityTypes.map((name, i) => (
                     <div key={i} className="flex items-center gap-2 px-6 opacity-40 hover:opacity-100 transition-opacity cursor-default border-r border-[#262626]/30 h-full">
                        <div className="w-3 h-3 bg-[#262626] transform rotate-45"></div>
                        <span className="text-[10px] font-bold text-[#EDEDED] tracking-tight font-sans">{name}</span>
                     </div>
                   ))}
                   
                   {/* More Metrics */}
                   <TickerItem label="DATA_SOVEREIGNTY" value="LOCALLY_HOSTED" />
                   <TickerItem label="ENCRYPTION" value="AES_256_GCM" />
                 </React.Fragment>
               ))}
            </div>
        </div>
      </div>
    </div>
  );
};