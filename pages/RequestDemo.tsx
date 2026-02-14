import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Activity, Wifi, Server, ShieldCheck, Check, MessageCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const RequestDemo: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    role: '',
    phone: '',
    email: '',
    facilities: 'Single Location',
    beds: '',
    deployment: 'On-Premise (Air-gapped)',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Persist to Local Storage (The "Database")
    try {
        const existingReqs = JSON.parse(localStorage.getItem('hospintel_db_demos') || '[]');
        const newReq = {
            id: crypto.randomUUID(), // Unique ID
            ...formData,
            status: 'NEW',
            timestamp: new Date().toISOString(),
            source: 'WEB_FORM'
        };
        localStorage.setItem('hospintel_db_demos', JSON.stringify([newReq, ...existingReqs]));
    } catch (err) {
        console.error("Local write error", err);
    }

    // 2. Trigger Email Client (The "Notification")
    const subject = `Demo Request: ${formData.organization}`;
    const body = `New Institutional Demo Request\n\nName: ${formData.fullName}\nRole: ${formData.role}\nOrg: ${formData.organization}\n\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nSpecs:\nFacilities: ${formData.facilities}\nBeds: ${formData.beds}\nDeployment: ${formData.deployment}\n\nMessage:\n${formData.message}`;
    
    window.location.href = `mailto:inquiries.hospintel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-20 bg-[#050505] min-h-screen flex items-center">
        <Container className="max-w-2xl text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-12"
           >
             <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6 text-blue-500">
               <Check className="w-8 h-8" />
             </div>
             <h2 className="text-3xl font-bold text-white mb-4">Request Logged</h2>
             <p className="text-[#A1A1AA] text-lg mb-8 leading-relaxed">
               Your architectural requirements have been securely recorded in our system. Your default email client has been opened to finalize the transmission.
             </p>
             
             <div className="flex justify-center gap-4">
               <Button variant="outline" onClick={() => navigate('/')}>
                 <ArrowLeft className="w-4 h-4 mr-2" /> Return Home
               </Button>
             </div>
           </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Panel */}
          <div>
            <div className="mb-8">
              <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4 block">Institutional Access</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Evaluate the Complete EMR Infrastructure.
              </h1>
              <p className="text-lg text-[#A1A1AA] leading-relaxed">
                Our team will guide you through system architecture, multi-location deployment, security controls, and migration planning.
              </p>
            </div>

            <div className="space-y-6 mb-12">
               {[
                 { text: "Full EMR replacement", icon: Activity },
                 { text: "Hybrid-cloud architecture", icon: Wifi },
                 { text: "Multi-facility scalability", icon: Server },
                 { text: "Secure deployment models", icon: ShieldCheck }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded bg-[#111] border border-[#262626] flex items-center justify-center text-blue-500">
                     <item.icon className="w-5 h-5" />
                   </div>
                   <span className="text-[#EDEDED] font-medium">{item.text}</span>
                 </div>
               ))}
            </div>

            <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#1F1F1F]">
              <h4 className="text-white font-bold mb-2">Technical Pre-requisites</h4>
              <p className="text-sm text-[#71717A] leading-relaxed">
                HospIntel can be deployed on-premise (Linux/Unix) or via private cloud VPC. 
                We recommend a dedicated consultation for multi-region topology planning.
              </p>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Request Institutional Demonstration</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                 <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Full Name *</label>
                 <input 
                    required 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Hospital / Organization *</label>
                 <input 
                    required 
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                 />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                   <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Role / Position *</label>
                   <input 
                      required 
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      type="text" 
                      className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Phone *</label>
                   <input 
                      required 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel" 
                      className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                   />
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Work Email *</label>
                 <input 
                    required 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                 />
              </div>

              <div className="grid grid-cols-2 gap-5">
                 <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Facilities *</label>
                    <select 
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleChange}
                        className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm appearance-none"
                    >
                       <option>Single Location</option>
                       <option>2 - 5 Locations</option>
                       <option>5 - 15 Locations</option>
                       <option>15+ Locations</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Total Beds *</label>
                    <input 
                        required 
                        name="beds"
                        value={formData.beds}
                        onChange={handleChange}
                        type="text" 
                        placeholder="e.g. 500" 
                        className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Deployment Preference *</label>
                 <select 
                    name="deployment"
                    value={formData.deployment}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm appearance-none"
                 >
                    <option>On-Premise (Air-gapped)</option>
                    <option>Hybrid Cloud</option>
                    <option>Cloud-Assisted</option>
                    <option>Unsure / Need Consultation</option>
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Message (Optional)</label>
                 <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3} 
                    className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                 ></textarea>
              </div>
              
              <div className="flex items-start gap-3 py-2">
                <input required type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-600 bg-[#050505] text-blue-500 focus:ring-offset-0 focus:ring-0" />
                <span className="text-xs text-[#71717A]">I confirm this request is for institutional evaluation purposes and I am authorized to represent this organization.</span>
              </div>

              <Button className="w-full h-12 text-sm font-semibold">Schedule Demonstration</Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};