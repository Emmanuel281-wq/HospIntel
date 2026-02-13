import React from 'react';
import { Container } from '../../components/ui/Container';
import { ShieldCheck, FileCheck, Globe, Lock } from 'lucide-react';

const ComplianceCard = ({ title, desc, icon: Icon, tags }: any) => (
  <div className="p-8 rounded-xl bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333] transition-colors">
     <div className="w-12 h-12 rounded-lg bg-[#111] border border-[#262626] flex items-center justify-center text-white mb-6">
        <Icon className="w-6 h-6" />
     </div>
     <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
     <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">{desc}</p>
     <div className="flex flex-wrap gap-2">
        {tags.map((t: string) => (
           <span key={t} className="px-2 py-1 rounded bg-[#171717] text-[10px] font-mono text-[#71717A] border border-[#262626]">
              {t}
           </span>
        ))}
     </div>
  </div>
);

export const Compliance: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container>
        <div className="max-w-4xl mb-16">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Regulatory Compliance</h1>
           <p className="text-xl text-[#A1A1AA] font-light leading-relaxed">
             We meet or exceed the strictest standards for healthcare data protection across Nigeria and Africa.
           </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
           <ComplianceCard 
             title="NDPR / NDPA"
             desc="Fully compliant with the Nigeria Data Protection Act (2023). We ensure lawful processing and data sovereignty for Nigerian institutions."
             icon={ShieldCheck}
             tags={['DPCO Audited', 'Nigeria First']}
           />
           <ComplianceCard 
             title="ISO 27001"
             desc="Certified Information Security Management System (ISMS) covering all aspects of our engineering and operations in Lagos and Abuja."
             icon={Lock}
             tags={['International', 'ISMS']}
           />
           <ComplianceCard 
             title="Data Residency"
             desc="We offer guaranteed local data residency via MainOne (MDXi) in Lagos and Rack Centre to meet regulatory requirements."
             icon={Globe}
             tags={['Lagos', 'Johannesburg']}
           />
           <ComplianceCard 
             title="HIPAA"
             desc="Our architecture ensures adherence to international best practices, compatible with US Privacy and Security Rules."
             icon={FileCheck}
             tags={['Standard', 'BAA Ready']}
           />
        </div>

        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-8 lg:p-12">
           <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-white mb-4">Encryption Standards</h2>
              <p className="text-[#A1A1AA] mb-8">
                 We utilize cryptographic primitives that exceed industry recommendations.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                 <div>
                    <h4 className="text-white font-bold text-sm mb-2">Data At Rest</h4>
                    <p className="text-sm text-[#71717A]">AES-256-GCM with per-tenant key wrapping via AWS KMS or HashiCorp Vault.</p>
                 </div>
                 <div>
                    <h4 className="text-white font-bold text-sm mb-2">Data In Transit</h4>
                    <p className="text-sm text-[#71717A]">TLS 1.3 only. Perfect Forward Secrecy enforced. Certificate pinning on mobile endpoints.</p>
                 </div>
              </div>
           </div>
        </div>
      </Container>
    </div>
  );
};