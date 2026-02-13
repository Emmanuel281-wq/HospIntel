import React from 'react';
import { Hero } from '../components/Hero';
import { WhatWeOffer } from '../components/WhatWeOffer';
import { Features } from '../components/Features';
import { Infrastructure } from '../components/Infrastructure';
import { ProductShowcase } from '../components/ProductShowcase';
import { Security } from '../components/Security';
import { AboutBrief } from '../components/AboutBrief';
import { GlobalOperations } from '../components/GlobalOperations';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <GlobalOperations />
      <Features />
      <Infrastructure />
      <WhatWeOffer />
      <ProductShowcase />
      <Security />
      <AboutBrief />
      
      {/* Engineering Insights Preview - New Section for SEO/Marketing */}
      <section className="py-24 bg-[#050505] border-t border-[#1F1F1F]">
        <Container>
           <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F0F0F] border border-[#262626] text-[#52525B] text-[10px] font-mono uppercase tracking-widest mb-4">
                    <FileText className="w-3 h-3" />
                    <span>HospIntel Research</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold text-white">Engineering Intelligence</h2>
              </div>
              <Button variant="outline" onClick={() => navigate('/insights')} className="mt-4 md:mt-0">
                 View All Research <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {[
                 {
                    tag: "Infrastructure",
                    title: "The CAP Theorem in Critical Care",
                    date: "Oct 2026",
                    desc: "Why we prioritize Availability over Consistency in our offline-first sync engine."
                 },
                 {
                    tag: "Security",
                    title: "Zero-Trust Device Architecture",
                    date: "Sep 2026",
                    desc: "Implementing node-level encryption and mutual TLS in hostile network environments."
                 },
                 {
                    tag: "Case Study",
                    title: "Scaling to 5M Records in Lagos",
                    date: "Aug 2026",
                    desc: "Performance benchmarks from a live deployment across 12 distributed facilities."
                 }
              ].map((item, i) => (
                 <div key={i} className="group cursor-pointer border-t border-[#262626] pt-6 hover:border-blue-500/50 transition-colors" onClick={() => navigate('/insights')}>
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-[10px] font-mono text-blue-500 uppercase">{item.tag}</span>
                       <span className="text-[10px] font-mono text-[#52525B]">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed">{item.desc}</p>
                 </div>
              ))}
           </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative overflow-hidden border-t border-[#1F1F1F]">
        {/* Deep Blue Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-[#050505] to-[#050505] opacity-80"></div>
        
        <Container className="relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-8">
            Secure the Future of<br/>National Health.
          </h2>
          <p className="text-[#A1A1AA] text-xl mb-12 max-w-xl mx-auto font-light">
            Join the institutions running the next generation of healthcare operations. 
            Zero downtime. Zero data loss. Total control.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button size="lg" onClick={() => navigate('/request-demo')} className="px-10 h-14 text-lg shadow-[0_0_40px_rgba(59,130,246,0.3)] border-blue-400/20">Schedule Executive Briefing</Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/technology')} className="px-10 h-14 text-lg hover:border-blue-500/30 hover:bg-blue-500/5">View Architecture</Button>
          </div>
        </Container>
      </section>
    </>
  );
};