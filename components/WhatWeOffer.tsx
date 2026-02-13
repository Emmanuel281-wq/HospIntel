import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Container } from './ui/Container';
import { Users, CalendarClock, Building2, ShieldCheck, Wifi, ArrowUpRight } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Patient Management",
    description: "Keep all patient records organized. Unified master index with conflict-free merging.",
    icon: Users,
    colSpan: "lg:col-span-1",
  },
  {
    id: 2,
    title: "Visit & Queue Management",
    description: "Streamline appointments and daily operations with algorithmic triage logic.",
    icon: CalendarClock,
    colSpan: "lg:col-span-1",
  },
  {
    id: 3,
    title: "Department Management",
    description: "Manage every hospital unit efficiently from a centralized command plane.",
    icon: Building2,
    colSpan: "lg:col-span-1",
  },
  {
    id: 4,
    title: "Role-Based Access Control",
    description: "Keep data secure and controlled. Granular permission sets tailored to clinical roles.",
    icon: ShieldCheck,
    colSpan: "lg:col-span-2",
  },
  {
    id: 5,
    title: "Offline & Online Sync",
    description: "Work anywhere; data syncs automatically. Zero downtime during network failures.",
    icon: Wifi,
    colSpan: "lg:col-span-1",
    highlight: true,
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const WhatWeOffer: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden border-b border-[#1F1F1F]">
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-900/5 rounded-[100%] blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500">Modern Hospitals</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#A1A1AA] font-light leading-relaxed"
          >
            A complete EMR platform built to streamline patient care and hospital workflows — 
            <span className="text-white font-medium"> offline or online.</span>
          </motion.p>
        </div>

        {/* Feature Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className={`${feature.colSpan || ''} group relative p-8 rounded-2xl bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333] transition-all duration-300 overflow-hidden flex flex-col`}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 transition-all duration-300 ${
                feature.highlight 
                  ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' 
                  : 'bg-[#141414] border-[#262626] text-[#71717A] group-hover:text-white group-hover:border-[#404040]'
              }`}>
                <feature.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors flex items-center gap-2">
                  {feature.title}
                  {feature.highlight && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  )}
                </h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-sm group-hover:text-[#D4D4D8] transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                <ArrowUpRight className="w-5 h-5 text-[#52525B]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};