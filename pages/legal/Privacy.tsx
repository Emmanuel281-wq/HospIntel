import React from 'react';
import { Container } from '../../components/ui/Container';
import { Lock } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container className="max-w-3xl">
        <div className="mb-12 border-b border-[#1F1F1F] pb-8">
          <div className="inline-flex items-center gap-2 mb-4 text-blue-500">
             <Lock className="w-4 h-4" />
             <span className="text-xs font-mono uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-[#71717A] text-sm font-mono">Effective Date: January 1, 2026</p>
        </div>

        <div className="space-y-12 text-[#A1A1AA] leading-relaxed">
           <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                 HospIntel Systems Inc. ("HospIntel", "we", "us") is committed to protecting the privacy of patients, clinicians, and administrators. 
                 This policy outlines how we handle data within our hospital operating system. Unlike consumer apps, we operate as a Data Processor on behalf of the healthcare institution (the Data Controller).
              </p>
           </section>

           <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Data Minimization</h2>
              <p>
                 Our architecture is designed to minimize data transfer. Patient Health Information (PHI) is processed locally on edge devices whenever possible. 
                 When data must be synced to the cloud, it is end-to-end encrypted. We do not inspect, sell, or analyze patient data for advertising purposes.
              </p>
           </section>

           <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                 <li><strong>System Telemetry:</strong> Anonymized performance logs (CPU usage, sync latency, error rates) to maintain system stability.</li>
                 <li><strong>Account Data:</strong> Clinician names, roles, and institutional email addresses for authentication.</li>
                 <li><strong>Audit Logs:</strong> Timestamps of record access for compliance reporting.</li>
              </ul>
           </section>

           <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Compliance Frameworks</h2>
              <p>
                 We adhere to the following regulatory standards:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                 <li><strong>NDPR (Nigeria):</strong> Full compliance with the Nigeria Data Protection Regulation (2019) and NDPA (2023).</li>
                 <li><strong>HIPAA (USA):</strong> We maintain HIPAA-compliant safeguards for international compatibility.</li>
                 <li><strong>GDPR (EU):</strong> We support Right to Erasure and Data Portability requests where applicable.</li>
              </ul>
           </section>

           <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Contact Officer</h2>
              <p>
                 For privacy inquiries or data subject access requests:
                 <br/><br/>
                 <span className="text-white">Data Protection Officer</span><br/>
                 <a href="mailto:inquiries.hospintel@gmail.com" className="hover:text-blue-400 transition-colors">inquiries.hospintel@gmail.com</a><br/>
                 Lagos, Nigeria
              </p>
           </section>
        </div>
      </Container>
    </div>
  );
};