import React from 'react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { ArrowRight, Terminal, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const AboutBrief: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 bg-[#0A0A0A] border-y border-[#1F1F1F] relative overflow-hidden">
      {/* Subtle Technical Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/5 to-transparent pointer-events-none" />

      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
          
          {/* Text Content */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] uppercase tracking-widest w-fit">
              <Terminal className="w-3 h-3" />
              <span>Engineering DNA</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.1]">
              Not IT Consultants. <br/>
              <span className="text-[#52525B]">Systems Engineers.</span>
            </h2>
            
            <p className="text-lg text-[#A1A1AA] mb-8 leading-relaxed">
              We don't just patch healthcare software; we architect resilience. We bring a zero-tolerance mindset for failure to the patient bedside, ensuring operations continue regardless of infrastructure conditions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={() => navigate('/about')} className="group border-[#333] hover:border-[#EDEDED] hover:bg-[#111]">
                Read Our Manifesto
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
          
          {/* Stats / Visual Content */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {/* Stat Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 rounded-lg bg-[#050505] border border-[#1F1F1F] group hover:border-[#333] transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-[#52525B] mb-4 group-hover:text-blue-500 transition-colors">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">99.999%</div>
                <div className="text-[10px] font-mono text-[#52525B] uppercase tracking-wide">Uptime SLA</div>
              </motion.div>

              {/* Stat Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 rounded-lg bg-[#050505] border border-[#1F1F1F] group hover:border-[#333] transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-[#52525B] mb-4 group-hover:text-blue-500 transition-colors">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">0ms</div>
                <div className="text-[10px] font-mono text-[#52525B] uppercase tracking-wide">Local Latency</div>
              </motion.div>

              {/* Philosophy Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 rounded-lg bg-[#050505] border border-[#1F1F1F] col-span-2 group hover:border-[#333] transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                  <div className="text-sm font-bold text-white">"Speed is Safety"</div>
                </div>
                <p className="text-sm text-[#71717A] leading-relaxed">
                  A slow interface causes clinical errors. We optimize for sub-frame interaction times to reduce cognitive load on clinicians during critical moments.
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};