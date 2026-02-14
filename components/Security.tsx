import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, FileKey, ShieldAlert, Fingerprint, Eye, ServerCog } from 'lucide-react';
import { Container } from './ui/Container';

export const Security: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const securityFeatures = [
    { 
      icon: Lock, 
      bgIcon: Fingerprint,
      title: "Local Encryption", 
      desc: "Data is encrypted at rest using AES-256-GCM before ever touching the network layer." 
    },
    { 
      icon: FileKey, 
      bgIcon: ServerCog,
      title: "Immutable Logs", 
      desc: "Every action is cryptographically signed. Audit trails are append-only and tamper-proof." 
    },
    { 
      icon: ShieldAlert, 
      bgIcon: Eye,
      title: "Intrusion Detection", 
      desc: "Heuristic analysis monitors local nodes for suspicious access patterns in real-time." 
    }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-[#050505] border-t border-[#262626] relative overflow-hidden" id="security">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <Container className="relative z-10">
        <motion.div style={{ y: headerY }} className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F0F0F] border border-[#262626] text-[#52525B] text-[10px] font-mono uppercase tracking-widest mb-6">
            <ShieldAlert className="w-3 h-3" />
            <span>Secure Architecture</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDEDED] mb-6">
            Security as Architecture
          </h2>
          <p className="text-[#A1A1AA] text-lg">
            HospIntel implements a security-first architecture. Every node, user, and device is strictly authenticated. 
            Data is encrypted at rest and in transit using industry-standard protocols.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((item, i) => (
            <div key={i} className="group relative flex flex-col items-start text-left p-8 h-full min-h-[320px] rounded-xl bg-[#0A0A0A] border border-[#262626] overflow-hidden hover:border-[#404040] transition-all duration-300">
              
              {/* Hover Glow Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Large Background Icon (Watermark) */}
              <div className="absolute -right-8 -bottom-8 text-[#111] group-hover:text-[#171717] transition-colors duration-500 transform rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform ease-out pointer-events-none">
                <item.bgIcon className="w-48 h-48 opacity-40 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-500" />
              </div>

              {/* Primary Icon */}
              <div className="w-12 h-12 rounded-lg bg-[#111] border border-[#262626] flex items-center justify-center text-[#71717A] mb-8 z-10 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-300 shadow-[0_0_0_1px_rgba(0,0,0,0)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <item.icon className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-semibold text-[#EDEDED] mb-3 z-10 group-hover:text-white transition-colors relative">
                {item.title}
              </h3>
              
              <p className="text-[#A1A1AA] text-sm leading-relaxed z-10 max-w-[90%] relative">
                {item.desc}
              </p>

              {/* Decorative Tech Lines */}
              <div className="absolute bottom-6 left-8 right-8 h-px bg-[#171717] z-10 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out delay-100"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};