import React from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { 
  Database, FileSpreadsheet, ShieldCheck, 
  CheckCircle, ArrowRight, Layers, FileOutput, 
  TableProperties, ScanLine, UserCog,
  FileCheck, AlertCircle, GitBranch, Lock, Server
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProcessStep = ({ number, title, desc, icon: Icon }: any) => (
  <div className="relative group">
    <div className="absolute top-8 left-8 w-px h-full bg-[#1F1F1F] group-last:hidden" />
    <div className="flex gap-6 relative z-10 pb-12 last:pb-0">
      <div className="w-16 h-16 rounded-xl bg-[#0A0A0A] border border-[#262626] flex items-center justify-center shrink-0 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all shadow-sm">
        <Icon className="w-6 h-6 text-[#52525B] group-hover:text-blue-400 transition-colors" />
      </div>
      <div className="pt-2">
        <div className="flex items-center gap-3 mb-2">
           <span className="font-mono text-[10px] text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">STEP 0{number}</span>
           <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-md">{desc}</p>
      </div>
    </div>
  </div>
);

export const Migration: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-900/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F0F0F] border border-[#262626] text-blue-500 text-[10px] font-mono uppercase tracking-widest mb-8"
            >
              <Database className="w-3 h-3" />
              <span>Data Infrastructure Layer</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-8"
            >
              System Transition <br />
              <span className="text-[#333]">Protocols.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl font-light border-l border-[#262626] pl-6"
            >
              A structured, secure methodology for migrating sensitive clinical datasets from legacy environments to the HospIntel operating system.
            </motion.p>
        </div>

        {/* Section 1: Philosophy & Visualization */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-40 border-b border-[#1F1F1F] pb-24">
           <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold text-white mb-6">Controlled Data Transition</h2>
              <div className="space-y-6 text-[#A1A1AA] leading-relaxed">
                <p>
                  Transitioning from an existing EMR system is a high-risk operation that requires precision planning. We reject "black box" automated tools in favor of explicit, verified data pipelines.
                </p>
                <p>
                  Our protocols emphasize <strong>data integrity</strong> and <strong>operational continuity</strong>. Migration is treated as a clinical procedure: careful, staged, and monitored.
                </p>
              </div>
              
              <div className="mt-8 flex gap-4">
                 <div className="px-4 py-3 rounded bg-[#0A0A0A] border border-[#262626] flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-mono text-[#EDEDED]">No Data Loss</span>
                 </div>
                 <div className="px-4 py-3 rounded bg-[#0A0A0A] border border-[#262626] flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-mono text-[#EDEDED]">Full Audit Trail</span>
                 </div>
              </div>
           </div>

           {/* Visual Diagram */}
           <div className="lg:col-span-7">
              <div className="relative rounded-xl border border-[#262626] bg-[#0A0A0A] p-8 lg:p-12 overflow-hidden">
                 <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                 
                 {/* Pipeline Visualization */}
                 <div className="relative z-10 flex flex-col gap-2">
                    {/* Node 1: Legacy */}
                    <div className="flex items-center gap-6 group">
                       <div className="w-12 h-12 rounded border border-[#262626] bg-[#111] flex items-center justify-center text-[#52525B]">
                          <Server className="w-5 h-5" />
                       </div>
                       <div className="flex-1 border-b border-dashed border-[#262626] relative h-px">
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 bg-[#0A0A0A] text-[9px] font-mono text-[#52525B]">CSV / XLS EXPORT</div>
                       </div>
                       <div className="text-xs font-mono text-[#52525B]">LEGACY_DB</div>
                    </div>

                    {/* Connector */}
                    <div className="h-12 w-px bg-[#262626] ml-6 my-1 relative">
                       <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-500/50" />
                    </div>

                    {/* Node 2: Staging */}
                    <div className="flex items-center gap-6 group">
                       <div className="w-12 h-12 rounded border border-blue-500/30 bg-blue-500/5 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                          <ScanLine className="w-5 h-5" />
                       </div>
                       <div className="flex-1">
                          <div className="text-sm font-bold text-white mb-1">Staging & Validation</div>
                          <div className="flex gap-1">
                             <div className="h-1 w-8 rounded-full bg-green-500/50"></div>
                             <div className="h-1 w-8 rounded-full bg-green-500/50"></div>
                             <div className="h-1 w-8 rounded-full bg-[#262626]"></div>
                          </div>
                       </div>
                       <div className="text-xs font-mono text-blue-400">PROCESSING</div>
                    </div>

                    {/* Connector */}
                    <div className="h-12 w-px bg-[#262626] ml-6 my-1"></div>

                    {/* Node 3: Production */}
                    <div className="flex items-center gap-6 group">
                       <div className="w-12 h-12 rounded border border-[#262626] bg-[#111] flex items-center justify-center text-white">
                          <Database className="w-5 h-5" />
                       </div>
                       <div className="flex-1 border-b border-[#262626] relative h-px"></div>
                       <div className="text-xs font-mono text-white">HOSPINTEL_CORE</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Section 2: Structured Import Workflow */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-40">
           <div>
              <div className="sticky top-32">
                 <div className="flex items-center gap-3 mb-8">
                    <FileSpreadsheet className="w-6 h-6 text-blue-500" />
                    <h2 className="text-3xl font-bold text-white">Structured Data Import</h2>
                 </div>
                 <p className="text-[#A1A1AA] text-lg leading-relaxed mb-8">
                    We utilize a standardized ingestion engine. Data must be exported from your legacy system into structured formats (CSV/Excel) before processing. This ensures complete transparency and allows for offline verification before any data touches the live system.
                 </p>
                 <div className="p-6 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F]">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                       <AlertCircle className="w-4 h-4 text-amber-500" /> Important
                    </h4>
                    <p className="text-sm text-[#71717A] leading-relaxed">
                       We do not offer "black box" direct API integrations for legacy EMRs due to the high risk of schema mismatch. All migrations pass through our structured intermediate layer.
                    </p>
                 </div>
              </div>
           </div>
           
           <div className="space-y-2">
              <ProcessStep 
                number="1" 
                title="Export & Format" 
                desc="Export patient, clinical, and inventory data from legacy systems into standard CSV or Excel templates provided by our engineering team."
                icon={FileOutput}
              />
              <ProcessStep 
                number="2" 
                title="Schema Mapping" 
                desc="Map legacy fields (e.g., 'DOB', 'pat_id') to HospIntel's strict schema types via our migration utility tool."
                icon={TableProperties}
              />
              <ProcessStep 
                number="3" 
                title="Pre-Flight Validation" 
                desc="The system dry-runs the import, checking for type errors, missing required fields, and format inconsistencies."
                icon={FileCheck}
              />
              <ProcessStep 
                number="4" 
                title="Admin Commit" 
                desc="Authorized administrators review the validation report and cryptographically sign off on the batch import."
                icon={UserCog}
              />
           </div>
        </div>

        {/* Section 3: Integrity & Phased Approach */}
        <div className="mb-40">
           <div className="grid md:grid-cols-2 gap-8">
              {/* Validation Card */}
              <div className="p-8 lg:p-10 rounded-2xl bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333] transition-colors">
                 <div className="w-12 h-12 rounded-lg bg-[#111] border border-[#262626] flex items-center justify-center text-blue-500 mb-8">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-6">Data Validation & Integrity</h3>
                 <div className="space-y-4">
                    {[
                       { label: "Required Field Checks", desc: "Verifies presence of critical identifiers (MRN, Name, DOB)." },
                       { label: "Duplicate Detection", desc: "Fuzzy matching algorithms flag potential duplicate profiles." },
                       { label: "Type Safety", desc: "Ensures dates, phone numbers, and codes match strict formats." },
                       { label: "Immutable Logging", desc: "Every row import is logged for post-migration audit." }
                    ].map((item, i) => (
                       <div key={i} className="flex gap-4">
                          <CheckCircle className="w-5 h-5 text-[#262626] shrink-0 mt-0.5" />
                          <div>
                             <h4 className="text-white font-medium text-sm">{item.label}</h4>
                             <p className="text-[#71717A] text-sm">{item.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Phased Approach Card */}
              <div className="p-8 lg:p-10 rounded-2xl bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333] transition-colors relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Layers className="w-48 h-48" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-[#111] border border-[#262626] flex items-center justify-center text-blue-500 mb-8">
                       <GitBranch className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6">Phased Onboarding</h3>
                    <p className="text-[#A1A1AA] mb-8 leading-relaxed">
                       Reduce operational risk by staging the migration. We recommend moving active patients first, followed by historical archives.
                    </p>
                    
                    <div className="space-y-2 font-mono text-xs">
                       <div className="flex items-center justify-between p-3 rounded bg-[#111] border border-[#262626]">
                          <span className="text-white">PHASE 1: ACTIVE_CENSUS</span>
                          <span className="text-green-500">LIVE</span>
                       </div>
                       <div className="flex justify-center h-4">
                          <div className="w-px h-full bg-[#262626]"></div>
                       </div>
                       <div className="flex items-center justify-between p-3 rounded bg-[#111] border border-[#262626]">
                          <span className="text-white">PHASE 2: DEPT_ROLLOUT</span>
                          <span className="text-blue-500">PENDING</span>
                       </div>
                       <div className="flex justify-center h-4">
                          <div className="w-px h-full bg-[#262626]"></div>
                       </div>
                       <div className="flex items-center justify-between p-3 rounded bg-[#111] border border-[#262626]">
                          <span className="text-white">PHASE 3: HISTORICAL_ARCHIVE</span>
                          <span className="text-[#52525B]">QUEUED</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Section 5: Oversight */}
        <div className="mb-32">
           <div className="rounded-2xl border border-[#1F1F1F] bg-[#080808] p-10 lg:p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0F0F0F] border border-[#262626] text-white mb-8">
                 <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Administrative Control</h2>
              <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-8">
                 Migration is not automated magic. It is a controlled administrative process. All imports are gated by cryptographic signatures from authorized personnel to ensure total accountability.
              </p>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-[#1F1F1F] pt-20">
           <h3 className="text-2xl font-bold text-white mb-6">Ready to Plan Your Transition?</h3>
           <p className="text-[#A1A1AA] mb-8 max-w-lg mx-auto">
             Speak with our implementation team to discuss your current data topology and migration strategy.
           </p>
           <Button size="lg" onClick={() => navigate('/request-demo')} className="px-8 h-12">
             Schedule a Migration Assessment
             <ArrowRight className="w-4 h-4 ml-2" />
           </Button>
        </div>
      </Container>
    </div>
  );
};