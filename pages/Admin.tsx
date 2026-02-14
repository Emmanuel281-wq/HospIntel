import React, { useState, useEffect } from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { 
  LayoutDashboard, Users, Cookie, 
  BarChart3, RefreshCw, Lock, 
  ArrowUpRight, Download, Search 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Login Component ---
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin') { // Simple client-side gate for demo
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
           <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
             <Lock className="w-6 h-6" />
           </div>
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-2">Restricted Access</h2>
        <p className="text-[#A1A1AA] text-center text-sm mb-8">
          Enter administrative credentials to access the control plane.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
             <input 
                type="password" 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter access key"
                className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                autoFocus
             />
          </div>
          {error && <p className="text-red-500 text-xs text-center">Invalid access key.</p>}
          <Button className="w-full h-10">Authenticate</Button>
        </form>
        <div className="mt-6 text-center text-[10px] text-[#52525B] font-mono">
           HOSPINTEL_ADMIN_GATEWAY // v2.4
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Component ---
export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'leads'>('overview');
  const [leads, setLeads] = useState<any[]>([]);
  const [cookieStats, setCookieStats] = useState<any>(null);

  useEffect(() => {
    // Load data from LocalStorage simulation
    const loadedLeads = JSON.parse(localStorage.getItem('hospintel_demo_requests') || '[]');
    setLeads(loadedLeads);
    
    // Cookie stats (Simulated + Real)
    const currentConsent = localStorage.getItem('hospintel_cookie_consent');
    setCookieStats({
       totalVisitors: 1243, // Simulated base
       consented: currentConsent ? 1 : 0, // Real check
       functionalOptIn: currentConsent ? JSON.parse(currentConsent).functional : false
    });
  }, []);

  const refreshData = () => {
    const loadedLeads = JSON.parse(localStorage.getItem('hospintel_demo_requests') || '[]');
    setLeads(loadedLeads);
  };

  if (!isAuthenticated) return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12 font-sans text-[#EDEDED]">
      <Container>
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-[#1F1F1F] pb-8">
            <div>
               <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-2">
                 <Lock className="w-3 h-3" />
                 <span>Secure Admin Environment</span>
               </div>
               <h1 className="text-3xl font-bold text-white">Command Center</h1>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-xs text-[#52525B] font-mono mr-2">LAST_SYNC: NOW</span>
               <Button size="sm" variant="secondary" onClick={refreshData}>
                  <RefreshCw className="w-4 h-4 mr-2" /> Refresh
               </Button>
               <Button size="sm" variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
            </div>
         </div>

         {/* Navigation Tabs */}
         <div className="flex items-center gap-2 mb-8">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'overview' ? 'bg-[#1F1F1F] text-white border border-[#333]' : 'text-[#A1A1AA] hover:bg-[#0A0A0A]'}`}
            >
               <LayoutDashboard className="w-4 h-4" /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'leads' ? 'bg-[#1F1F1F] text-white border border-[#333]' : 'text-[#A1A1AA] hover:bg-[#0A0A0A]'}`}
            >
               <Users className="w-4 h-4" /> Demo Requests
               {leads.length > 0 && <span className="bg-blue-500 text-white text-[10px] px-1.5 rounded-full">{leads.length}</span>}
            </button>
         </div>

         <AnimatePresence mode="wait">
            {activeTab === 'overview' ? (
               <motion.div 
                 key="overview"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-6"
               >
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                           <div className="w-10 h-10 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-blue-500">
                              <Users className="w-5 h-5" />
                           </div>
                           <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">+12%</span>
                        </div>
                        <h3 className="text-[#A1A1AA] text-sm mb-1">Total Demo Requests</h3>
                        <div className="text-3xl font-bold text-white">{leads.length}</div>
                     </div>

                     <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                           <div className="w-10 h-10 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-amber-500">
                              <Cookie className="w-5 h-5" />
                           </div>
                        </div>
                        <h3 className="text-[#A1A1AA] text-sm mb-1">Consent Compliance</h3>
                        <div className="text-3xl font-bold text-white">98.2%</div>
                        <div className="text-xs text-[#52525B] mt-1">GDPR/NDPR Adherence</div>
                     </div>

                     <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                           <div className="w-10 h-10 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-purple-500">
                              <BarChart3 className="w-5 h-5" />
                           </div>
                        </div>
                        <h3 className="text-[#A1A1AA] text-sm mb-1">Site Traffic (Simulated)</h3>
                        <div className="text-3xl font-bold text-white">~1.2k</div>
                        <div className="text-xs text-[#52525B] mt-1">Unique Visitors / Month</div>
                     </div>
                  </div>

                  {/* Charts / Visuals Placeholder */}
                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-6 rounded-xl h-64 flex flex-col justify-center items-center text-[#333]">
                        <span className="text-xs font-mono mb-2">TRAFFIC_SOURCE_DISTRIBUTION</span>
                        <div className="w-32 h-32 rounded-full border-8 border-[#1F1F1F] border-t-blue-500 border-r-purple-500"></div>
                     </div>
                     <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-6 rounded-xl h-64 flex flex-col">
                        <span className="text-xs font-mono text-[#52525B] mb-4">GEOGRAPHIC_ORIGIN</span>
                        <div className="flex-1 flex items-end gap-2">
                           {[40, 65, 30, 80, 50, 90, 45].map((h, i) => (
                              <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-500/20 rounded-t hover:bg-blue-500 transition-colors cursor-pointer"></div>
                           ))}
                        </div>
                     </div>
                  </div>
               </motion.div>
            ) : (
               <motion.div 
                 key="leads"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
               >
                  <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
                     {/* Toolbar */}
                     <div className="p-4 border-b border-[#1F1F1F] flex items-center justify-between">
                        <div className="relative">
                           <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
                           <input type="text" placeholder="Filter requests..." className="bg-[#111] border border-[#262626] rounded pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none" />
                        </div>
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                           <Download className="w-3 h-3 mr-2" /> Export CSV
                        </Button>
                     </div>

                     {/* Table */}
                     <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                           <thead className="bg-[#111] text-[#71717A] font-mono text-xs uppercase border-b border-[#1F1F1F]">
                              <tr>
                                 <th className="px-6 py-3 font-medium">Timestamp</th>
                                 <th className="px-6 py-3 font-medium">Contact</th>
                                 <th className="px-6 py-3 font-medium">Organization</th>
                                 <th className="px-6 py-3 font-medium">Role</th>
                                 <th className="px-6 py-3 font-medium">Facilities</th>
                                 <th className="px-6 py-3 font-medium">Status</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-[#1F1F1F]">
                              {leads.length === 0 ? (
                                 <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-[#52525B]">
                                       No demo requests received yet.
                                    </td>
                                 </tr>
                              ) : (
                                 leads.map((lead: any) => (
                                    <tr key={lead.id} className="hover:bg-[#0F0F0F] transition-colors group">
                                       <td className="px-6 py-4 text-[#52525B] font-mono text-xs whitespace-nowrap">
                                          {new Date(lead.timestamp).toLocaleDateString()} <span className="text-[#333]">{new Date(lead.timestamp).toLocaleTimeString()}</span>
                                       </td>
                                       <td className="px-6 py-4">
                                          <div className="text-white font-medium">{lead.fullName}</div>
                                          <div className="text-[#52525B] text-xs">{lead.email}</div>
                                       </td>
                                       <td className="px-6 py-4 text-[#A1A1AA]">{lead.organization}</td>
                                       <td className="px-6 py-4 text-[#A1A1AA]">{lead.role}</td>
                                       <td className="px-6 py-4 text-[#A1A1AA]">{lead.facilities}</td>
                                       <td className="px-6 py-4">
                                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                             {lead.status}
                                          </span>
                                       </td>
                                    </tr>
                                 ))
                              )}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </Container>
    </div>
  );
};