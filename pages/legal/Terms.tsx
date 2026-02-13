import React from 'react';
import { Container } from '../../components/ui/Container';
import { FileText } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container className="max-w-3xl">
        <div className="mb-12 border-b border-[#1F1F1F] pb-8">
          <div className="inline-flex items-center gap-2 mb-4 text-blue-500">
             <FileText className="w-4 h-4" />
             <span className="text-xs font-mono uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-[#71717A] text-sm font-mono">Last Updated: January 1, 2026</p>
        </div>

        <div className="space-y-12 text-[#A1A1AA] leading-relaxed">
           <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                 By accessing or using the HospIntel platform, you agree to be bound by these Terms of Service and our Master Services Agreement (MSA) signed by your institution.
              </p>
           </section>

           <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Permitted Use</h2>
              <p>
                 The Service is intended solely for professional clinical and administrative use within healthcare facilities. You agree not to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                 <li>Reverse engineer the sync protocol or API.</li>
                 <li>Use the platform for any illegal purpose.</li>
                 <li>Attempt to bypass security controls or access data outside your authorized role.</li>
              </ul>
           </section>

           <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Availability & SLA</h2>
              <p>
                 While we strive for 100% uptime through our offline-first architecture, specific availability guarantees and remedies for downtime are governed exclusively by your institution's SLA.
              </p>
           </section>

           <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Limitation of Liability</h2>
              <p>
                 HospIntel is a tool to assist clinical decision-making, not a substitute for professional medical judgment. 
                 To the maximum extent permitted by law, HospIntel Systems Inc. shall not be liable for any indirect, incidental, or consequential damages arising from the use of the Service.
              </p>
           </section>
        </div>
      </Container>
    </div>
  );
};