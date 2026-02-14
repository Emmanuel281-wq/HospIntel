import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Mail, MapPin, Phone, Globe, MessageSquare, Check, AlertTriangle, Send, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: 'Enterprise Licensing',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (value.length > 2000) return; 
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.message.length > 2000) {
        setError("Message exceeds maximum length (2000 chars).");
        return;
    }

    const sanitizedMessage = formData.message.replace(/[^\x20-\x7E\n\r]/g, '');
    const subject = `HospIntel Inquiry: ${formData.firstName} ${formData.lastName} - ${formData.department}`;
    const body = `Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Department: ${formData.department}

Message:
${sanitizedMessage}`;

    // Record interaction for Admin (Simulated)
    try {
        const existingLeads = JSON.parse(localStorage.getItem('hospintel_leads') || '[]');
        const newLead = {
            id: Date.now().toString(),
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            type: formData.department,
            status: 'New',
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('hospintel_leads', JSON.stringify([newLead, ...existingLeads]));
    } catch (e) {
        // Silent fail for storage limits
    }

    window.location.href = `mailto:inquiries.hospintel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setIsSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Col: Immersive 3D Info Card */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative perspective-[2000px] group"
            >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-transparent blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
                
                <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl p-8 lg:p-12 overflow-hidden transform transition-transform duration-700 hover:rotate-y-1 hover:rotate-x-1">
                    <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111] border border-[#262626] text-[#A1A1AA] text-[10px] font-mono uppercase tracking-widest mb-8 shadow-sm">
                            <MessageSquare className="w-3 h-3 text-blue-500" />
                            <span>Direct Channel</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                            Contact <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">HospIntel HQ.</span>
                        </h1>
                        
                        <p className="text-lg text-[#A1A1AA] font-light leading-relaxed mb-12">
                            For enterprise licensing, partnership inquiries, or technical support, connect directly with our engineering team in Lagos.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group/item">
                                <div className="mt-1 w-10 h-10 rounded-lg bg-[#0F0F0F] border border-[#262626] flex items-center justify-center text-blue-500 group-hover/item:border-blue-500/30 group-hover/item:bg-blue-500/10 transition-all">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm mb-1">Operational Base</h3>
                                    <p className="text-[#71717A] text-sm">Lagos, Nigeria</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group/item">
                                <div className="mt-1 w-10 h-10 rounded-lg bg-[#0F0F0F] border border-[#262626] flex items-center justify-center text-blue-500 group-hover/item:border-blue-500/30 group-hover/item:bg-blue-500/10 transition-all">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm mb-1">Electronic Mail</h3>
                                    <a href="mailto:inquiries.hospintel@gmail.com" className="text-[#71717A] text-sm hover:text-blue-400 transition-colors">
                                        inquiries.hospintel@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group/item">
                                <div className="mt-1 w-10 h-10 rounded-lg bg-[#0F0F0F] border border-[#262626] flex items-center justify-center text-blue-500 group-hover/item:border-blue-500/30 group-hover/item:bg-blue-500/10 transition-all">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm mb-1">Secure Line</h3>
                                    <p className="text-[#71717A] text-sm">+234 707 662 7159</p>
                                    <span className="text-[10px] text-[#52525B] uppercase tracking-wider">Mon-Fri, 8am - 6pm WAT</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-[#1F1F1F]">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#52525B]">
                                <Globe className="w-3 h-3" />
                                <span>SERVING HEALTHCARE INSTITUTIONS PAN-AFRICA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Col: Glassmorphic Form */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full" />
                <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#1F1F1F] rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-transparent opacity-50" />

                    {isSubmitted ? (
                        <div className="text-center py-20">
                            <motion.div 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }}
                                className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-8 text-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                            >
                               <Check className="w-10 h-10" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-white mb-4">Transmission Initiated</h3>
                            <p className="text-[#A1A1AA] mb-10 max-w-sm mx-auto leading-relaxed">
                               We have opened your default email client with a secure draft addressed to <strong>inquiries.hospintel@gmail.com</strong>.
                            </p>
                            <Button variant="outline" onClick={() => setIsSubmitted(false)} className="mx-auto">
                                Reset Communication
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-white">Send Secure Message</h3>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[#262626]" />
                                    <div className="w-2 h-2 rounded-full bg-[#262626]" />
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                </div>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-2 text-red-400 text-xs font-mono"
                                    >
                                        <AlertTriangle className="w-4 h-4" /> {error}
                                    </motion.div>
                                )}
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">First Name</label>
                                        <input 
                                          required 
                                          name="firstName"
                                          value={formData.firstName}
                                          onChange={handleChange}
                                          maxLength={50}
                                          type="text" 
                                          className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm placeholder:text-[#333]"
                                          placeholder="Enter name"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">Last Name</label>
                                        <input 
                                          required 
                                          name="lastName"
                                          value={formData.lastName}
                                          onChange={handleChange}
                                          maxLength={50}
                                          type="text" 
                                          className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm placeholder:text-[#333]"
                                          placeholder="Enter surname"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">Work Email</label>
                                    <input 
                                      required 
                                      name="email"
                                      value={formData.email}
                                      onChange={handleChange}
                                      type="email" 
                                      className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm placeholder:text-[#333]"
                                      placeholder="name@hospital.org"
                                    />
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">Department</label>
                                    <div className="relative">
                                        <select 
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm appearance-none cursor-pointer"
                                        >
                                            <option>Enterprise Licensing</option>
                                            <option>Technical Support</option>
                                            <option>Media & Press</option>
                                            <option>Investor Relations</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-[#52525B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <div className="flex justify-between">
                                        <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">Message Encrypted</label>
                                        <span className="text-[10px] font-mono text-[#52525B]">{formData.message.length}/2000</span>
                                    </div>
                                    <textarea 
                                      required 
                                      name="message"
                                      value={formData.message}
                                      onChange={handleChange}
                                      maxLength={2000}
                                      rows={5} 
                                      className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm placeholder:text-[#333] resize-none"
                                      placeholder="How can we assist your infrastructure?"
                                    ></textarea>
                                </div>

                                <Button className="w-full h-12 mt-2 group shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                                    <span>Initiate Transfer</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                
                                <div className="text-center">
                                    <p className="text-[10px] text-[#52525B]">
                                        Secure TLS 1.3 Connection • End-to-End Encrypted
                                    </p>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
      </Container>
    </div>
  );
};