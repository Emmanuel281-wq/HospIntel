import React from 'react';
import { Container } from '../../components/ui/Container';
import { Copy, Terminal } from 'lucide-react';

interface EndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  desc: string;
  params?: { name: string; type: string; desc: string }[];
}

const Endpoint: React.FC<EndpointProps> = ({ method, path, desc, params }) => {
  const methodColors: Record<string, string> = {
    GET: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    POST: "bg-green-500/10 text-green-400 border-green-500/20",
    PUT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/20"
  };

  return (
    <div className="mb-12 border-b border-[#1F1F1F] pb-12 last:border-0">
      <div className="flex items-center gap-3 mb-4 font-mono">
        <span className={`px-2 py-0.5 rounded text-xs border font-bold ${methodColors[method]}`}>{method}</span>
        <span className="text-[#EDEDED]">{path}</span>
      </div>
      <p className="text-[#A1A1AA] text-sm mb-6">{desc}</p>
      
      {params && (
        <div className="mb-6">
          <h4 className="text-[10px] font-mono text-[#52525B] uppercase mb-3">Parameters</h4>
          <div className="bg-[#0A0A0A] border border-[#262626] rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111] border-b border-[#262626] text-[#71717A] font-mono">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F1F]">
                {params.map((p, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 text-blue-400 font-mono">{p.name}</td>
                    <td className="px-4 py-2 text-[#52525B] font-mono">{p.type}</td>
                    <td className="px-4 py-2 text-[#A1A1AA]">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export const APIReference: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container>
        <div className="max-w-4xl mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F0F0F] border border-[#262626] text-[#52525B] text-[10px] font-mono uppercase tracking-widest mb-6">
             <Terminal className="w-3 h-3" />
             <span>Developer Preview</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">API Reference</h1>
           <p className="text-[#A1A1AA] text-lg max-w-2xl">
             Programmatic access to the HospIntel core via JSON-RPC over secure WebSocket or REST. 
             All endpoints require a signed JWT.
           </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-8">Patient Endpoints</h2>
            
            <Endpoint 
              method="GET" 
              path="/v1/patients" 
              desc="Retrieve a paginated list of patients from the local index. Supports fuzzy search."
              params={[
                { name: "query", type: "string", desc: "Search term (name, MRN)" },
                { name: "limit", type: "integer", desc: "Max records (default 20)" },
                { name: "department", type: "string", desc: "Filter by active unit" }
              ]}
            />
            
            <Endpoint 
              method="POST" 
              path="/v1/patients/admit" 
              desc="Create a new admission record. Triggers a sync event to the mesh immediately."
              params={[
                { name: "patient_id", type: "uuid", desc: "Unique identifier" },
                { name: "reason", type: "string", desc: "Chief complaint" },
                { name: "triage_level", type: "1-5", desc: "ESI Triage Score" }
              ]}
            />

            <h2 className="text-xl font-bold text-white mb-8 mt-12">Clinical Endpoints</h2>
            
            <Endpoint 
              method="POST" 
              path="/v1/clinical/orders" 
              desc="Submit a new medication or procedure order."
            />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="rounded-xl border border-[#262626] bg-[#0A0A0A] overflow-hidden">
                <div className="bg-[#111] border-b border-[#262626] px-4 py-3 flex justify-between items-center">
                   <span className="text-xs font-mono text-[#52525B]">REQUEST EXAMPLE</span>
                   <Copy className="w-3 h-3 text-[#52525B] cursor-pointer hover:text-white" />
                </div>
                <div className="p-4 font-mono text-xs leading-relaxed">
                  <div className="flex flex-wrap gap-1 mb-1">
                    <span className="text-purple-400">curl</span> 
                    <span className="text-[#A1A1AA]">-X POST</span> 
                    <span className="text-green-400">https://api.hospintel.com/v1/patients/admit</span> 
                    <span>\</span>
                  </div>
                  <div className="pl-4 text-[#A1A1AA]">
                    <div>-H <span className="text-yellow-200">"Authorization: Bearer token"</span> \</div>
                    <div>-H <span className="text-yellow-200">"Content-Type: application/json"</span> \</div>
                    <div>-d <span className="text-yellow-200">'{`{`}</span></div>
                    <div className="pl-2">
                      <span className="text-blue-400">"patient_id"</span>: <span className="text-yellow-200">"8f8d-..."</span>,
                    </div>
                    <div className="pl-2">
                      <span className="text-blue-400">"triage_level"</span>: <span className="text-yellow-200">1</span>
                    </div>
                    <div><span className="text-yellow-200">{`}'`}</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[#262626] bg-[#0A0A0A] overflow-hidden">
                <div className="bg-[#111] border-b border-[#262626] px-4 py-3">
                   <span className="text-xs font-mono text-[#52525B]">RESPONSE (200 OK)</span>
                </div>
                <div className="p-4 font-mono text-xs leading-relaxed text-[#A1A1AA]">
                  {`{`}
                  <br/>&nbsp;&nbsp;<span className="text-blue-400">"status"</span>: <span className="text-green-400">"success"</span>,
                  <br/>&nbsp;&nbsp;<span className="text-blue-400">"sync_id"</span>: <span className="text-yellow-200">"tx_99281"</span>,
                  <br/>&nbsp;&nbsp;<span className="text-blue-400">"propagated_peers"</span>: <span className="text-blue-300">6</span>
                  <br/>{`}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};