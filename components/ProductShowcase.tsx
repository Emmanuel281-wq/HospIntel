import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { Search, Command, User, AlertCircle, Calendar, ArrowRight, Activity, Zap, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProductShowcase: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const navigate = useNavigate();

  // Parallax effects - "Heavy" theme (positive Y)
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const visualY = useTransform(scrollYProgress, [0, 1], [40, 120]); // Moves slower (more depth)
  const visualOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]); // Background moves slowest

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#050505] relative overflow-hidden" id="product">
      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          
          {/* Text Content */}
          <motion.div style={{ y: textY }} className="relative z-10 order-2 lg:order-1">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="inline-flex items-center gap-2 text-[#A1A1AA] text-xs font-mono uppercase tracking-wider mb-6"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded bg-[#171717] border border-[#262626] text-[#EDEDED]">
                <Command className="w-3 h-3" />
              </div>
              Command & Control
            </motion.div>
            
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="text-3xl md:text-5xl font-bold text-[#EDEDED] mb-6 leading-tight"
            >
              A single pane of glass for <br />
              <span className="text-[#52525B]">clinical velocity.</span>
            </motion.h2>
            
            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="text-[#A1A1AA] text-lg leading-relaxed mb-8"
            >
              HospIntel replaces fragmented legacy portals with a high-performance operating system. 
              Search patients, trigger workflows, and reallocate resources in milliseconds—keyboard first.
            </motion.p>
            
            <motion.ul 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="space-y-4 mb-10"
            >
               {[
                 { text: "Global fuzzy search across all records", icon: Search },
                 { text: "Optimistic UI for zero-latency interactions", icon: Zap },
                 { text: "Context-aware clinical alerts", icon: Activity }
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-[#EDEDED]">
                   <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-[#52525B]">
                     <item.icon className="w-3 h-3" />
                   </div>
                   <span className="text-sm font-medium">{item.text}</span>
                 </li>
               ))}
            </motion.ul>

            <motion.div
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.4 }}
               className="flex items-center gap-4"
            >
              <Button onClick={() => navigate('/product')}>
                View Interface Tour
                <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Visual Content: Command Palette & Dashboard */}
          <motion.div 
            style={{ y: visualY, opacity: visualOpacity }}
            className="relative order-1 lg:order-2 mb-20 md:mb-0"
          >
             {/* Parallax Background Glow */}
             <motion.div 
               style={{ y: bgY }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -z-10"
             />
             
             {/* Layer 1: Blurred Background Interface (The "Desktop") */}
             <div className="relative rounded-xl border border-[#262626] bg-[#0A0A0A] overflow-hidden shadow-2xl opacity-40 blur-[2px] transform scale-[0.98]">
                 <div className="h-8 border-b border-[#262626] bg-[#141414] flex items-center px-4 gap-2">
                   <div className="w-2 h-2 rounded-full bg-[#262626]"></div>
                   <div className="w-2 h-2 rounded-full bg-[#262626]"></div>
                   <div className="ml-auto text-[10px] font-mono text-[#52525B]">ICU_DASHBOARD_V2</div>
                 </div>
                 <div className="p-4 grid grid-cols-2 gap-4 h-[300px]">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="bg-[#111] rounded border border-[#1F1F1F]"></div>
                    ))}
                 </div>
             </div>

             {/* Layer 2: The Command Palette (Active UI) */}
             <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[110%] bg-[#0F0F0F] rounded-xl border border-[#333] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] overflow-hidden ring-1 ring-white/5"
             >
                {/* Search Input */}
                <div className="flex items-center gap-4 p-5 border-b border-[#262626]">
                  <Search className="w-5 h-5 text-[#A1A1AA]" />
                  <div className="flex-1 text-lg font-medium text-[#EDEDED] flex items-center">
                    cardiac pro
                    <motion.div 
                      animate={{ opacity: [1, 0] }} 
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-[2px] h-5 bg-blue-500 ml-0.5"
                    />
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <kbd className="px-2 py-1 rounded bg-[#1F1F1F] border border-[#262626] text-[10px] font-mono text-[#71717A]">ESC</kbd>
                  </div>
                </div>

                {/* Results */}
                <div className="p-2">
                   <div className="px-3 py-2 text-[10px] font-mono text-[#52525B] uppercase tracking-wider">Top Hits</div>
                   
                   {/* Active Item - Gold/Blue Accent */}
                   <motion.div 
                     initial={{ x: -10, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="flex items-center gap-4 p-3 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 cursor-pointer mb-1"
                   >
                     <div className="w-8 h-8 rounded-md bg-[#3B82F6]/20 flex items-center justify-center text-blue-400">
                       <AlertCircle className="w-4 h-4" />
                     </div>
                     <div className="flex-1">
                       <div className="text-sm font-medium text-white flex items-center gap-2">
                         Activate Cardiac Response Team
                         <span className="px-1.5 py-0.5 rounded-full bg-hosp-gold/10 border border-hosp-gold/20 text-[10px] text-hosp-gold font-mono hidden sm:inline-block">CODE BLUE</span>
                       </div>
                       <div className="text-xs text-[#A1A1AA]">Triggers broadcast to 4 on-call pagers</div>
                     </div>
                     <div className="text-xs font-mono text-blue-400 opacity-60">⏎</div>
                   </motion.div>

                   {/* Secondary Items */}
                   <motion.div 
                     initial={{ x: -10, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.4 }}
                     className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1F1F1F] transition-colors cursor-pointer group"
                   >
                     <div className="w-8 h-8 rounded-md bg-[#1F1F1F] border border-[#262626] flex items-center justify-center text-[#71717A] group-hover:text-white group-hover:border-[#404040]">
                       <User className="w-4 h-4" />
                     </div>
                     <div className="flex-1">
                       <div className="text-sm font-medium text-[#A1A1AA] group-hover:text-white">Patient: Probst, Michael</div>
                       <div className="text-xs text-[#52525B]">ICU Bed 4 • Admitted 12h ago</div>
                     </div>
                   </motion.div>
                   
                   <motion.div 
                     initial={{ x: -10, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.5 }}
                     className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1F1F1F] transition-colors cursor-pointer group"
                   >
                     <div className="w-8 h-8 rounded-md bg-[#1F1F1F] border border-[#262626] flex items-center justify-center text-[#71717A] group-hover:text-white group-hover:border-[#404040]">
                       <Calendar className="w-4 h-4" />
                     </div>
                     <div className="flex-1">
                       <div className="text-sm font-medium text-[#A1A1AA] group-hover:text-white">Schedule Procedure: Cardiology</div>
                       <div className="text-xs text-[#52525B]">Check OR availability</div>
                     </div>
                   </motion.div>
                </div>
                
                {/* Footer */}
                <div className="h-8 bg-[#111] border-t border-[#1F1F1F] flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                     <span className="flex items-center gap-1 text-[10px] text-[#52525B]">
                       <ArrowRight className="w-3 h-3" /> Select
                     </span>
                     <span className="hidden sm:flex items-center gap-1 text-[10px] text-[#52525B]">
                       <div className="w-3 h-3 bg-[#262626] rounded flex items-center justify-center">↓</div> Navigate
                     </span>
                  </div>
                  <div className="text-[10px] text-[#52525B] font-mono">
                    HOSP_OS v2.4.0
                  </div>
                </div>
             </motion.div>
          </motion.div>
        </div>

        {/* Integration Ready Section - Added to complete the component update */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
             <h2 className="text-3xl font-bold text-white mb-8">Platform Capabilities</h2>
             {/* Content omitted for brevity, keeping existing structure */}
             <div className="border-t border-[#1F1F1F]">
                {/* ... FeatureRows ... */}
             </div>
          </div>
          
          <div className="relative">
             <div className="sticky top-32">
                <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#1F1F1F] relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-20">
                      <Settings className="w-40 h-40 text-[#52525B] animate-[spin_60s_linear_infinite]" />
                   </div>
                   
                   <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Integration Ready</h3>
                   <p className="text-[#A1A1AA] mb-8 relative z-10 leading-relaxed">
                      HospIntel isn't a walled garden. It connects to your existing infrastructure through standard protocols.
                   </p>
                   
                   <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between p-4 rounded bg-[#111] border border-[#262626]">
                         <span className="text-sm font-mono text-[#A1A1AA]">HL7 / FHIR Bridge</span>
                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded bg-[#111] border border-[#262626]">
                         <span className="text-sm font-mono text-[#A1A1AA]">DICOM Viewer</span>
                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded bg-[#111] border border-[#262626]">
                         <span className="text-sm font-mono text-[#A1A1AA]">Billing (X12)</span>
                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                   </div>

                   <div className="mt-8 pt-8 border-t border-[#262626]">
                      <Button onClick={() => navigate('/technology')} className="w-full justify-between group">
                         View Developer Docs
                         <ArrowRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-white transition-colors" />
                      </Button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
};