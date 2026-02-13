import React from 'react';
import { Container } from '../components/ui/Container';
import { motion } from 'framer-motion';

const StatBlock = ({ value, label }: any) => (
  <div className="border-l border-[#262626] pl-6">
    <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{value}</div>
    <div className="text-sm text-[#71717A] font-mono uppercase tracking-wide">{label}</div>
  </div>
);

export const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container className="max-w-5xl">
        {/* Manifesto Header */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-mono text-[#52525B] mb-8"
          >
            EST. 2026 — LAGOS, NIGERIA
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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-16 text-lg text-[#A1A1AA] leading-relaxed font-light"
          >
            <p>
              Hospitals in Nigeria and across the continent are complex operational environments. They face unique infrastructure challenges—unstable power, fluctuating connectivity, and high patient volume. Yet, they are forced to use software built for the West that crumbles when the internet flickers.
            </p>
            <p>
              HospIntel is rebuilding the stack from the bottom up, specifically for the African context. We are an engineering company bringing distributed systems expertise from global tech to the patient bedside in Lagos, Abuja, and beyond.
            </p>
          </motion.div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-[#1F1F1F] py-12">
           <StatBlock value="99.999%" label="Uptime Record" />
           <StatBlock value="<50ms" label="Avg Latency" />
           <StatBlock value="Zero" label="Data Loss" />
           <StatBlock value="Pan-African" label="Focus" />
        </div>

        {/* Engineering Philosophy */}
        <div className="mb-32">
           <h2 className="text-2xl font-bold text-white mb-12">Engineering Principles</h2>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                 { title: "Offline by Default", desc: "We assume the network is down. The application must function perfectly without it." },
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
        <div className="bg-[#0A0A0A] rounded-2xl border border-[#1F1F1F] p-12 text-center">
           <h2 className="text-3xl font-bold text-white mb-6">Built by Systems Engineers</h2>
           <p className="text-[#A1A1AA] max-w-2xl mx-auto mb-8 leading-relaxed">
              Our team comes from infrastructure backgrounds at major global tech firms and leading African fintechs. We understand what it takes to build resilient systems for our environment.
           </p>
           <div className="inline-flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
              {/* Abstract logos or tech stack icons could go here */}
              <div className="h-8 w-24 bg-[#1F1F1F] rounded"></div>
              <div className="h-8 w-24 bg-[#1F1F1F] rounded"></div>
              <div className="h-8 w-24 bg-[#1F1F1F] rounded"></div>
           </div>
        </div>

      </Container>
    </div>
  );
};