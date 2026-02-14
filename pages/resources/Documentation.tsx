import React, { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { Book, ChevronRight, Search, Terminal } from 'lucide-react';

interface DocSectionProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

const DocSection: React.FC<DocSectionProps> = ({ title, children, id }) => (
  <div id={id} className="mb-16 scroll-mt-32">
    <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#262626] pb-4">{title}</h2>
    <div className="space-y-6 text-[#A1A1AA] leading-relaxed">
      {children}
    </div>
  </div>
);

const CodeBlock = ({ code, lang = 'bash' }: { code: string; lang?: string }) => (
  <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] overflow-hidden my-6">
    <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-b border-[#262626]">
      <span className="text-[10px] font-mono text-[#52525B] uppercase">{lang}</span>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#262626]"></div>
        <div className="w-2 h-2 rounded-full bg-[#262626]"></div>
      </div>
    </div>
    <div className="p-4 overflow-x-auto">
      <code className="text-xs font-mono text-[#EDEDED] whitespace-pre">{code}</code>
    </div>
  </div>
);

export const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'auth', label: 'Authentication' },
    { id: 'patient-index', label: 'Patient Management' },
    { id: 'sync-engine', label: 'Sync Engine' },
    { id: 'rbac', label: 'Access Control' }
  ];

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="sticky top-32">
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
                  <input 
                    type="text" 
                    placeholder="Search docs..." 
                    className="w-full bg-[#0A0A0A] border border-[#262626] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left px-4 py-2 rounded text-sm transition-colors flex items-center justify-between group ${
                      activeSection === item.id 
                      ? 'bg-blue-500/10 text-blue-400 font-medium' 
                      : 'text-[#71717A] hover:text-white hover:bg-[#111]'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && <ChevronRight className="w-3 h-3" />}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-[#262626]">
                 <div className="text-[10px] font-mono text-[#52525B] uppercase mb-4">Downloads</div>
                 <button className="flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-white transition-colors mb-2">
                    <Book className="w-3 h-3" /> Admin Manual (PDF)
                 </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            <div className="mb-12">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F0F0F] border border-[#262626] text-blue-500 text-[10px] font-mono uppercase tracking-widest mb-6">
                 <Terminal className="w-3 h-3" />
                 <span>Version 2.4.0</span>
               </div>
               <h1 className="text-4xl font-bold text-white mb-6">System Documentation</h1>
               <p className="text-xl text-[#A1A1AA]">
                 Comprehensive guides for administrators and integrators managing the HospIntel operating system.
               </p>
            </div>

            <DocSection id="getting-started" title="Getting Started">
              <p>
                HospIntel is designed as a distributed system. Before deploying to client devices, you must initialize the core control plane.
              </p>
              <h3 className="text-white font-bold mt-6">Prerequisites</h3>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li>Linux Environment (RHEL 8+ or Ubuntu 22.04 LTS)</li>
                <li>Docker Engine 24.0+</li>
                <li>Minimum 16GB RAM for Master Node</li>
              </ul>
              <h3 className="text-white font-bold mt-6">Initialization</h3>
              <CodeBlock code={`curl -sL https://pkg.hospintel.com/install.sh | sudo bash -s -- --role master\nhospintel-cli init --cluster-id "AF-WEST-MAIN"`} />
            </DocSection>

            <DocSection id="auth" title="Authentication">
              <p>
                The platform supports OIDC and SAML 2.0 for SSO integration. Local fallback authentication is available when the identity provider is unreachable.
              </p>
              <CodeBlock lang="yaml" code={`auth:
  provider: "oidc"
  issuer: "https://idp.hospital.org"
  client_id: "hospintel-core"
  fallback_mode: "local_keychain" # Critical for hybrid resilience`} />
            </DocSection>

            <DocSection id="patient-index" title="Patient Management">
              <p>
                The Patient Index is the source of truth for demographics. It utilizes a probabilistic matching algorithm to resolve duplicates created during disconnected periods.
              </p>
              <p>
                Records are sharded geographically but indexed globally. A lookup for a patient ID will check the local cache first (0ms), then the LAN mesh (5ms), then the cloud (&lt;50ms).
              </p>
            </DocSection>

            <DocSection id="sync-engine" title="Sync Engine">
              <p>
                HospIntel uses a delta-state CRDT (Conflict-free Replicated Data Type) model. Operations are commutative, meaning they can be applied in any order and will result in the same state.
              </p>
            </DocSection>

          </div>
        </div>
      </Container>
    </div>
  );
};