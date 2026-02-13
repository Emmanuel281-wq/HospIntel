import React from 'react';
import { Container } from '../../components/ui/Container';
import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

const StatusRow = ({ name, status }: { name: string, status: 'operational' | 'degraded' | 'down' }) => {
  const statusConfig = {
    operational: { color: "text-green-500", bg: "bg-green-500", label: "Operational" },
    degraded: { color: "text-amber-500", bg: "bg-amber-500", label: "Degraded Performance" },
    down: { color: "text-red-500", bg: "bg-red-500", label: "Major Outage" },
  };

  const current = statusConfig[status];

  return (
    <div className="flex items-center justify-between py-4 border-b border-[#1F1F1F] last:border-0">
      <span className="text-sm font-medium text-white">{name}</span>
      <div className="flex items-center gap-2">
        <span className={`text-xs ${current.color}`}>{current.label}</span>
        <div className={`w-2 h-2 rounded-full ${current.bg} animate-pulse`}></div>
      </div>
    </div>
  );
};

export const SystemStatus: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container className="max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">System Status</h1>
          <p className="text-[#A1A1AA]">Real-time performance metrics for the global control plane.</p>
        </div>

        {/* Big Banner */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 mb-12 flex items-center gap-6">
           <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
             <CheckCircle2 className="w-8 h-8" />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-white mb-1">All Systems Operational</h2>
             <p className="text-green-400 text-sm">Last updated: Just now</p>
           </div>
        </div>

        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-6 mb-12">
           <h3 className="text-xs font-mono text-[#52525B] uppercase mb-4 tracking-wider">Core Services</h3>
           <StatusRow name="Identity & Authentication (LAGOS-CORE)" status="operational" />
           <StatusRow name="Identity & Authentication (ABUJA-EDGE)" status="operational" />
           <StatusRow name="Sync Engine (Global)" status="operational" />
           <StatusRow name="API Gateway" status="operational" />
           <StatusRow name="Developer Portal" status="operational" />
           <StatusRow name="Notification Dispatch" status="operational" />
        </div>

        <div>
           <h3 className="text-lg font-bold text-white mb-6">Incident History</h3>
           <div className="space-y-4">
              <div className="border-l-2 border-[#262626] pl-6 pb-6 relative">
                 <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#333]"></div>
                 <div className="text-sm text-[#52525B] mb-1">Oct 12, 2026</div>
                 <h4 className="text-white font-medium text-sm mb-2">No incidents reported</h4>
                 <p className="text-[#71717A] text-sm">All services maintained 100% availability.</p>
              </div>
              <div className="border-l-2 border-[#262626] pl-6 pb-6 relative">
                 <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                 <div className="text-sm text-[#52525B] mb-1">Sep 28, 2026</div>
                 <h4 className="text-white font-medium text-sm mb-2">Degraded Sync Performance (Lekki AZ)</h4>
                 <p className="text-[#71717A] text-sm">Higher than average latency observed in the Lekki availability zone due to upstream fiber cuts. Mesh fallback activated successfully.</p>
              </div>
           </div>
        </div>
      </Container>
    </div>
  );
};