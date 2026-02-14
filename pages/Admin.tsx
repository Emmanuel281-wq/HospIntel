
import React, { useState, useEffect } from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { 
  Users, MessageSquare, 
  RefreshCw, Lock, 
  Download, Search, Trash2, Mail,
  Terminal, Settings, AlertCircle, ToggleLeft, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../utils/mockApi';

// --- Types ---
interface Lead {
  id: string;
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  facilities: string;
  beds?: string;
  deployment?: string;
  message?: string;
  timestamp: string;
  status: string;
  source: 'WEB_FORM';
}

interface Inquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  message: string;
  timestamp: string;
  status: string;
  source: 'CONTACT_FORM';
}

// --- Login Component (Secure Gate) ---
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    try {
      // Simulate server-side check via API abstraction
      const isValid = await api.verifyAdminPassword(pass);
      
      if (isValid) {
        onLogin();
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setError(true);
    } finally {
      setLoading(false);
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
                placeholder="Access Key"
                className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                autoFocus
                disabled={loading}
             />
          </div>
          {error && <p className="text-red-500 text-xs text-center">Invalid access credentials.</p>}
          <Button disabled={loading} className="w-full h-10">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authenticate"}
          </Button>
        </form>
        <div className="mt-6 text-center text-[10px] text-[#52525B] font-mono">
           HOSPINTEL_ADMIN_GATEWAY // v2.4 (SECURE)
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Component ---
export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'inquiries' | 'logs' | 'config'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  // Initial Data Load
  useEffect(() => {
    if (isAuthenticated) {
        refreshData();
    }
  }, [isAuthenticated]);

  const refreshData = async () => {
    setLoading(true);
    try {
        const storedLeads = await api.getLeads();
        const storedInquiries = await api.getInquiries();
        
        // Sort descending by timestamp
        setLeads(storedLeads.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        setInquiries(storedInquiries.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (e) {
        console.error("Data corruption", e);
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id: string, type: 'leads' | 'inquiries') => {
    if (confirm('Are you sure you want to permanently delete this record?')) {
        await api.deleteRecord(type, id);
        refreshData();
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => {
        return Object.values(obj).map(val => {
            const str = String(val);
            return `"${str.replace(/"/g, '""')}"`;
        }).join(',');
    }).join('\n');

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;

  const filteredLeads = leads.filter(l => 
    (l.organization?.toLowerCase().includes(filter.toLowerCase()) || '') || 
    (l.email?.toLowerCase().includes(filter.toLowerCase()) || '') ||
    (l.fullName?.toLowerCase().includes(filter.toLowerCase()) || '')
  );

  const filteredInquiries = inquiries.filter(i => 
    (i.email?.toLowerCase().includes(filter.toLowerCase()) || '') || 
    (i.lastName?.toLowerCase().includes(filter.toLowerCase()) || '')
  );

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
               <h1 className="text-3xl font-bold text-white">Data Control Plane</h1>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-xs text-[#52525B] font-mono mr-2">INDEXED_DB :: ACTIVE</span>
               <Button size="sm" variant="secondary" onClick={refreshData} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Sync
               </Button>
               <Button size="sm" variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
            </div>
         </div>

         {/* Stats Overview */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-6 rounded-xl">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-blue-500">
                     <Users className="w-5 h-5" />
                  </div>
               </div>
               <h3 className="text-[#A1A1AA] text-sm mb-1">Total Demo Requests</h3>
               <div className="text-3xl font-bold text-white">{leads.length}</div>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-6 rounded-xl">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-purple-500">
                     <MessageSquare className="w-5 h-5" />
                  </div>
               </div>
               <h3 className="text-[#A1A1AA] text-sm mb-1">General Inquiries</h3>
               <div className="text-3xl font-bold text-white">{inquiries.length}</div>
            </div>
         </div>

         {/* Tabs & Actions */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <button 
                onClick={() => setActiveTab('leads')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'leads' ? 'bg-[#1F1F1F] text-white border border-[#333]' : 'text-[#A1A1AA] hover:bg-[#0A0A0A]'}`}
                >
                Demo Requests
                </button>
                <button 
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'inquiries' ? 'bg-[#1F1F1F] text-white border border-[#333]' : 'text-[#A1A1AA] hover:bg-[#0A0A0A]'}`}
                >
                Inquiries
                </button>
                <button 
                onClick={() => setActiveTab('logs')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'logs' ? 'bg-[#1F1F1F] text-white border border-[#333]' : 'text-[#A1A1AA] hover:bg-[#0A0A0A]'}`}
                >
                System Logs
                </button>
                <button 
                onClick={() => setActiveTab('config')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'config' ? 'bg-[#1F1F1F] text-white border border-[#333]' : 'text-[#A1A1AA] hover:bg-[#0A0A0A]'}`}
                >
                Configuration
                </button>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
                    <input 
                        type="text" 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search records..." 
                        className="bg-[#0A0A0A] border border-[#262626] rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-full" 
                    />
                </div>
                <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-9"
                    onClick={() => activeTab === 'leads' ? exportToCSV(leads, 'hospintel_leads') : exportToCSV(inquiries, 'hospintel_inquiries')}
                >
                    <Download className="w-4 h-4 mr-2" /> CSV
                </Button>
            </div>
         </div>

         {/* Data Tables */}
         <AnimatePresence mode="wait">
            {activeTab === 'leads' && (
               <motion.div 
                 key="leads"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden"
               >
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                       <thead className="bg-[#111] text-[#71717A] font-mono text-xs uppercase border-b border-[#1F1F1F]">
                          <tr>
                             <th className="px-6 py-3 font-medium">Timestamp</th>
                             <th className="px-6 py-3 font-medium">Organization</th>
                             <th className="px-6 py-3 font-medium">Contact</th>
                             <th className="px-6 py-3 font-medium">Facilities/Beds</th>
                             <th className="px-6 py-3 font-medium">Deployment</th>
                             <th className="px-6 py-3 font-medium text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-[#1F1F1F]">
                          {filteredLeads.length === 0 ? (
                             <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-[#52525B] font-mono text-xs">
                                   NO_RECORDS_FOUND
                                </td>
                             </tr>
                          ) : (
                             filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-[#0F0F0F] transition-colors group">
                                   <td className="px-6 py-4 text-[#52525B] font-mono text-xs whitespace-nowrap">
                                      {new Date(lead.timestamp).toLocaleDateString()}
                                      <div className="text-[10px] text-[#333]">{new Date(lead.timestamp).toLocaleTimeString()}</div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <div className="text-white font-medium">{lead.organization}</div>
                                      <div className="text-[#52525B] text-xs">Role: {lead.role}</div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <div className="text-[#EDEDED]">{lead.fullName}</div>
                                      <div className="text-blue-400 text-xs">{lead.email}</div>
                                      <div className="text-[#52525B] text-xs">{lead.phone}</div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <div className="text-[#A1A1AA] text-xs">{lead.facilities}</div>
                                      <div className="text-[#52525B] text-xs font-mono">{lead.beds || 'N/A'} Beds</div>
                                   </td>
                                   <td className="px-6 py-4 text-[#A1A1AA] text-xs">{lead.deployment}</td>
                                   <td className="px-6 py-4 text-right">
                                      <div className="flex justify-end gap-2">
                                          <a href={`mailto:${lead.email}`} className="p-2 hover:bg-[#1F1F1F] rounded text-[#52525B] hover:text-white transition-colors">
                                              <Mail className="w-4 h-4" />
                                          </a>
                                          <button onClick={() => handleDelete(lead.id, 'leads')} className="p-2 hover:bg-red-900/10 rounded text-[#52525B] hover:text-red-500 transition-colors">
                                              <Trash2 className="w-4 h-4" />
                                          </button>
                                      </div>
                                   </td>
                                </tr>
                             ))
                          )}
                       </tbody>
                    </table>
                 </div>
               </motion.div>
            )}
            
            {activeTab === 'inquiries' && (
               <motion.div 
                 key="inquiries"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden"
               >
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                       <thead className="bg-[#111] text-[#71717A] font-mono text-xs uppercase border-b border-[#1F1F1F]">
                          <tr>
                             <th className="px-6 py-3 font-medium">Timestamp</th>
                             <th className="px-6 py-3 font-medium">Sender</th>
                             <th className="px-6 py-3 font-medium">Department</th>
                             <th className="px-6 py-3 font-medium">Message Preview</th>
                             <th className="px-6 py-3 font-medium text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-[#1F1F1F]">
                          {filteredInquiries.length === 0 ? (
                             <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-[#52525B] font-mono text-xs">
                                   NO_RECORDS_FOUND
                                </td>
                             </tr>
                          ) : (
                             filteredInquiries.map((inq) => (
                                <tr key={inq.id} className="hover:bg-[#0F0F0F] transition-colors group">
                                   <td className="px-6 py-4 text-[#52525B] font-mono text-xs whitespace-nowrap">
                                      {new Date(inq.timestamp).toLocaleDateString()}
                                      <div className="text-[10px] text-[#333]">{new Date(inq.timestamp).toLocaleTimeString()}</div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <div className="text-white font-medium">{inq.firstName} {inq.lastName}</div>
                                      <div className="text-blue-400 text-xs">{inq.email}</div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#1F1F1F] border border-[#333] text-[#A1A1AA]">
                                         {inq.department}
                                      </span>
                                   </td>
                                   <td className="px-6 py-4 text-[#71717A] text-xs max-w-md truncate">
                                      {inq.message}
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                      <div className="flex justify-end gap-2">
                                          <a href={`mailto:${inq.email}`} className="p-2 hover:bg-[#1F1F1F] rounded text-[#52525B] hover:text-white transition-colors">
                                              <Mail className="w-4 h-4" />
                                          </a>
                                          <button onClick={() => handleDelete(inq.id, 'inquiries')} className="p-2 hover:bg-red-900/10 rounded text-[#52525B] hover:text-red-500 transition-colors">
                                              <Trash2 className="w-4 h-4" />
                                          </button>
                                      </div>
                                   </td>
                                </tr>
                             ))
                          )}
                       </tbody>
                    </table>
                 </div>
               </motion.div>
            )}

            {activeTab === 'logs' && (
               <motion.div 
                 key="logs"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden p-6"
               >
                 <div className="flex items-center gap-3 mb-6">
                    <Terminal className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-bold text-white">System Logs</h3>
                 </div>
                 
                 <div className="bg-[#050505] border border-[#262626] rounded-lg p-4 font-mono text-xs h-[400px] overflow-y-auto custom-scrollbar">
                    <div className="text-green-500 mb-1">[INFO] System initialized at {new Date().toLocaleTimeString()}</div>
                    <div className="text-[#52525B] mb-1">[SYS] Connecting to local storage daemon... OK</div>
                    <div className="text-[#52525B] mb-1">[AUTH] Admin session started for user: admin@hospintel.com</div>
                    <div className="text-[#52525B] mb-1">[DB] Rehydrating state from 'hospintel_core_db'... OK</div>
                    <div className="text-blue-400 mb-1">[NET] Sync engine idle. Waiting for upstream connection...</div>
                    <div className="text-amber-500 mb-1">[WARN] Telemetry: High latency detected on node 'AF-WEST-1' (simulated)</div>
                    <div className="text-[#52525B] mb-1">[SYS] Routine maintenance scheduled for 03:00 WAT</div>
                 </div>
               </motion.div>
            )}

            {activeTab === 'config' && (
               <motion.div 
                 key="config"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden p-6"
               >
                 <div className="flex items-center gap-3 mb-6">
                    <Settings className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-bold text-white">System Configuration</h3>
                 </div>

                 <div className="max-w-2xl space-y-6">
                    <div className="p-4 rounded bg-[#111] border border-[#262626] flex items-center justify-between opacity-60 cursor-not-allowed">
                       <div>
                          <div className="text-white font-medium mb-1">Maintenance Mode</div>
                          <div className="text-xs text-[#71717A]">Suspend public access to forms</div>
                       </div>
                       <ToggleLeft className="w-8 h-8 text-[#333]" />
                    </div>

                    <div className="p-4 rounded bg-[#111] border border-[#262626] flex items-center justify-between opacity-60 cursor-not-allowed">
                       <div>
                          <div className="text-white font-medium mb-1">Email Notifications</div>
                          <div className="text-xs text-[#71717A]">Send alerts on new lead submission</div>
                       </div>
                       <ToggleLeft className="w-8 h-8 text-green-500" />
                    </div>

                    <div className="p-4 rounded bg-[#111] border border-[#262626] flex items-center justify-between opacity-60 cursor-not-allowed">
                       <div>
                          <div className="text-white font-medium mb-1">Data Retention Policy</div>
                          <div className="text-xs text-[#71717A]">Auto-delete records older than 90 days</div>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#52525B]">90 DAYS</span>
                          <Settings className="w-4 h-4 text-[#52525B]" />
                       </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 p-3 rounded">
                       <AlertCircle className="w-4 h-4" />
                       Configuration changes are disabled in this demo environment.
                    </div>
                 </div>
               </motion.div>
            )}
         </AnimatePresence>
      </Container>
    </div>
  );
};
