import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Mail, MapPin, Phone, Globe, MessageSquare, Check, AlertTriangle } from 'lucide-react';
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
    // Input Hardening: Limit character count to prevent buffer overflow/DoS on mailto
    if (value.length > 2000) return; 
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security Validation
    if (formData.message.length > 2000) {
        setError("Message exceeds maximum length (2000 chars).");
        return;
    }

    // Basic sanitization (removing control characters that might exploit mail clients)
    const sanitizedMessage = formData.message.replace(/[^\x20-\x7E\n\r]/g, '');

    // Construct email parameters
    const subject = `HospIntel Inquiry: ${formData.firstName} ${formData.lastName} - ${formData.department}`;
    const body = `Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Department: ${formData.department}

Message:
${sanitizedMessage}`;

    // Trigger mailto with encoded components
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
                        For enterprise licensing, partnership inquiries, or technical support, please reach out directly to our engineering team in Lagos.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" /> Operational Base
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
                            <Globe className="w-4 h-4 text-blue-500" /> Coverage
                        </h3>
                        <p className="text-[#A1A1AA] leading-relaxed">
                            Serving Healthcare Institutions Across Africa.
                        </p>
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
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-2 text-red-400 text-sm">
                                    <AlertTriangle className="w-4 h-4" /> {error}
                                </div>
                            )}
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">First Name</label>
                                    <input 
                                      required 
                                      name="firstName"
                                      value={formData.firstName}
                                      onChange={handleChange}
                                      maxLength={50}
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
                                      maxLength={50}
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
                                <div className="flex justify-between">
                                    <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">Message</label>
                                    <span className="text-[10px] font-mono text-[#52525B]">{formData.message.length}/2000</span>
                                </div>
                                <textarea 
                                  required 
                                  name="message"
                                  value={formData.message}
                                  onChange={handleChange}
                                  maxLength={2000}
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