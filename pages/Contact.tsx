import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Mail, MapPin, Phone, Globe, MessageSquare, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: 'Enterprise Licensing',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct email parameters
    const subject = `HospIntel Inquiry: ${formData.firstName} ${formData.lastName} - ${formData.department}`;
    const body = `Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Department: ${formData.department}

Message:
${formData.message}`;

    // Trigger mailto
    window.location.href = `mailto:inquiries.hospintel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show success state in UI
    setIsSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container>
        <div className="grid lg:grid-cols-2 gap-20">
            {/* Left Col: Header & Info */}
            <div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F0F0F] border border-[#262626] text-[#A1A1AA] text-[10px] font-mono uppercase tracking-widest mb-6">
                        <MessageSquare className="w-3 h-3" />
                        <span>Inquiries</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                        Contact <br/>HospIntel.
                    </h1>
                    <p className="text-xl text-[#A1A1AA] font-light leading-relaxed">
                        For enterprise licensing, partnership inquiries, or technical support, please reach out directly to our teams in Lagos and Abuja.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" /> HQ
                        </h3>
                        <p className="text-[#A1A1AA] leading-relaxed">
                            Lagos, Nigeria
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 gap-8"
                    >
                        <div>
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-500" /> Email
                            </h3>
                            <ul className="space-y-2 text-[#A1A1AA] text-sm">
                                <li>
                                    <a href="mailto:inquiries.hospintel@gmail.com" className="hover:text-blue-400 transition-colors">
                                        inquiries.hospintel@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-500" /> Phone
                            </h3>
                            <ul className="space-y-2 text-[#A1A1AA] text-sm">
                                <li>+234 707 662 7159</li>
                                <li className="text-xs text-[#52525B] mt-1">Mon-Fri, 8am - 6pm WAT</li>
                            </ul>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-500" /> Regional Hubs
                        </h3>
                        <div className="flex gap-4">
                           <span className="px-3 py-1.5 rounded bg-[#111] border border-[#262626] text-xs text-[#A1A1AA] font-mono">ABJ // Abuja</span>
                           <span className="px-3 py-1.5 rounded bg-[#111] border border-[#262626] text-xs text-[#A1A1AA] font-mono">ACC // Accra</span>
                           <span className="px-3 py-1.5 rounded bg-[#111] border border-[#262626] text-xs text-[#A1A1AA] font-mono">NBO // Nairobi</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Col: Form */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-8 lg:p-12 h-fit"
            >
                {isSubmitted ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6 text-blue-500">
                           <Check className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Opening Email Client...</h3>
                        <p className="text-[#A1A1AA] mb-8">
                           We have prepared a draft in your default email client addressed to inquiries.hospintel@gmail.com.
                        </p>
                        <Button variant="outline" onClick={() => setIsSubmitted(false)}>Reset Form</Button>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">First Name</label>
                                    <input 
                                      required 
                                      name="firstName"
                                      value={formData.firstName}
                                      onChange={handleChange}
                                      type="text" 
                                      className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Last Name</label>
                                    <input 
                                      required 
                                      name="lastName"
                                      value={formData.lastName}
                                      onChange={handleChange}
                                      type="text" 
                                      className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Work Email</label>
                                <input 
                                  required 
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  type="email" 
                                  className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Department</label>
                                <select 
                                  name="department"
                                  value={formData.department}
                                  onChange={handleChange}
                                  className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm appearance-none"
                                >
                                    <option>Enterprise Licensing</option>
                                    <option>Technical Support</option>
                                    <option>Media & Press</option>
                                    <option>Investor Relations</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Message</label>
                                <textarea 
                                  required 
                                  name="message"
                                  value={formData.message}
                                  onChange={handleChange}
                                  rows={5} 
                                  className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                ></textarea>
                            </div>

                            <Button className="w-full h-12 mt-2">Send Message</Button>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
      </Container>
    </div>
  );
};