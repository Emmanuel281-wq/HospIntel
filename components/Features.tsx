import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Wifi, Shield, Zap, LayoutDashboard } from 'lucide-react';
import { Container } from './ui/Container';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Bento Item Component
const BentoItem = ({ children, className = "", title, description, icon: Icon }: any) => (
  <motion.div 
    variants={itemVariants}
    className={`p-6 md:p-8 rounded-2xl bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333] transition-colors relative overflow-hidden group ${className}`}
  >
    <div className="relative z-10 h-full flex flex-col">
      <div className="w-10 h-10 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300 group-hover:text-blue-400 group-hover:border-blue-500/20">
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6 flex-1">{description}</p>
      {children}
    </div>
    
    {/* Hover Gradient - Blue/Gold */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-hosp-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </motion.div>
);

export const Features: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#050505] relative overflow-hidden" id="architecture">
      
      {/* Background Parallax Element */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10 opacity-30 mix-blend-screen" 
      />

      <Container>
        <motion.div style={{ y: headerY }} className="mb-20 max-w-2xl relative z-10">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
            Engineered for <span className="text-[#52525B]">Resilience.</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg">
            Traditional hospital software relies on perfect connectivity. HospIntel adapts when the network fails, 
            providing a distributed operating system that preserves data integrity under any condition.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)] relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Feature - Offline Core */}
          <BentoItem 
            className="md:col-span-2 md:row-span-2"
            title="Adaptive Hybrid Architecture"
            description="Our smart sync engine detects connectivity loss and instantly switches to local storage. Data merges automatically and conflict-free when the connection is restored."
            icon={Wifi}
          >
            <div className="mt-4 rounded-xl bg-[#0F0F0F] border border-[#262626] p-4 h-48 relative overflow-hidden">
               {/* Abstract visual of syncing nodes */}
               <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-50">
                  <div className="w-16 h-16 rounded-xl border border-dashed border-[#52525B] flex items-center justify-center text-[10px] font-mono text-[#52525B]">LOCAL</div>
                  <div className="h-px w-24 bg-gradient-to-r from-[#52525B] to-[#52525B] relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500 w-1/2 animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <div className="w-16 h-16 rounded-xl border border-[#52525B] bg-[#1F1F1F] flex items-center justify-center text-[10px] font-mono text-white">CLOUD</div>
               </div>
               <div className="absolute bottom-4 left-4 flex gap-2">
                 <div className="px-2 py-1 rounded bg-[#1F1F1F] border border-[#262626] text-[10px] text-blue-400 font-mono">sync_active</div>
                 <div className="px-2 py-1 rounded bg-[#1F1F1F] border border-[#262626] text-[10px] text-[#52525B] font-mono">latency: 4ms</div>
               </div>
            </div>
          </BentoItem>

          {/* Secondary Features */}
          <BentoItem 
            title="Zero-Trust Security"
            description="Every request is authenticated, authorized, and encrypted locally before transmission."
            icon={Shield}
          />
          
          <BentoItem 
            title="Sub-50ms Latency"
            description="Optimized local caching ensures instant interface response, regardless of server load."
            icon={Zap}
          />

          <BentoItem 
            className="md:col-span-3"
            title="Centralized Facility Operations"
            description="Monitor multiple departments, wards, and satellite clinics from a single command plane."
            icon={LayoutDashboard}
          >
            <div className="grid grid-cols-4 gap-4 mt-2">
               {['ER Triage', 'ICU West', 'Pharmacy', 'Lab Services'].map((region, i) => (
                  <div key={region} className="flex items-center gap-3 p-2 rounded bg-[#0F0F0F] border border-[#262626]">
                     <div className={`w-2 h-2 rounded-full ${i===3 ? 'bg-hosp-gold' : 'bg-blue-500'}`}></div>
                     <span className="text-xs font-mono text-[#A1A1AA]">{region}</span>
                     <span className="ml-auto text-xs font-mono text-[#52525B]">{i === 3 ? 'BUSY' : 'OK'}</span>
                  </div>
               ))}
            </div>
          </BentoItem>
        </motion.div>
      </Container>
    </section>
  );
};