import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { MessageCircle, Twitter, Linkedin, Server, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-[#262626] pt-24 pb-12 text-sm">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8 mb-24">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3 pr-8">
            <Link to="/" className="flex items-center gap-2 mb-6 group w-fit">
              <div className="relative w-6 h-6 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="19" stroke="#3B82F6" strokeWidth="2.5" />
                  <path d="M20 33.5L18.5 32.1C13.2 27.3 9.5 23.9 9.5 19.8C9.5 16.4 12.1 13.8 15.5 13.8C17.4 13.8 19.3 14.7 20 16.1C20.7 14.7 22.6 13.8 24.5 13.8C27.9 13.8 30.5 16.4 30.5 19.8C30.5 23.9 26.8 27.3 21.5 32.1L20 33.5Z" fill="#3B82F6" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight font-sans">
                <span className="text-white">Hosp</span><span className="text-[#3B82F6]">Intel</span>
              </span>
            </Link>
            <p className="text-[#71717A] mb-8 leading-relaxed">
              The operating system for resilient healthcare. 
              Built for high availability in mission-critical environments.
            </p>
            <div className="flex gap-4">
               <a href="#" className="text-[#52525B] hover:text-white transition-colors" aria-label="X (Twitter)"><Twitter className="w-4 h-4" /></a>
               <a href="#" className="text-[#52525B] hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>
          
          {/* Product */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-[#A1A1AA]">
              <li><Link to="/product" className="hover:text-blue-400 transition-colors">Core Architecture</Link></li>
              <li><Link to="/security" className="hover:text-blue-400 transition-colors">Secure Design</Link></li>
              <li><Link to="/technology" className="hover:text-blue-400 transition-colors">Sync Engine</Link></li>
              <li><Link to="/migration" className="hover:text-blue-400 transition-colors">Data Migration</Link></li>
              <li><Link to="/request-demo" className="hover:text-blue-400 transition-colors">Request Access</Link></li>
            </ul>
          </div>

          {/* Research */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold mb-6">Research</h4>
            <ul className="space-y-4 text-[#A1A1AA]">
              <li><Link to="/insights" className="hover:text-blue-400 transition-colors">Engineering Blog</Link></li>
              <li><Link to="/insights" className="hover:text-blue-400 transition-colors">Whitepapers</Link></li>
              <li><Link to="/technology" className="hover:text-blue-400 transition-colors">System Topology</Link></li>
              <li><Link to="/resources/api" className="hover:text-blue-400 transition-colors">API Documentation</Link></li>
              <li><Link to="/resources/sla" className="hover:text-blue-400 transition-colors">Support Targets</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-[#A1A1AA]">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">Manifesto</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><a href="https://wa.me/2347076627159" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-2"><MessageCircle className="w-3 h-3" /> WhatsApp</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-[#A1A1AA]">
              <li><Link to="/legal/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/compliance" className="hover:text-blue-400 transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Technical Footer Status Bar */}
        <div className="pt-8 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-[#52525B] font-mono">
            © 2026 HOSPINTEL SYSTEMS INC. [LAGOS]
          </div>
          
          <div className="flex items-center gap-6">
             <Link to="/resources/status" className="flex items-center gap-2 group cursor-pointer">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-[10px] text-[#71717A] font-mono group-hover:text-emerald-400 transition-colors">SYSTEMS_OPERATIONAL</span>
             </Link>
             
             <div className="h-4 w-px bg-[#262626]"></div>
             
             <div className="flex items-center gap-2 text-[10px] text-[#52525B] font-mono">
                <Shield className="w-3 h-3" />
                <span>SECURITY_FIRST</span>
             </div>
             
             <div className="h-4 w-px bg-[#262626]"></div>
             
             <div className="flex items-center gap-2 text-[10px] text-[#52525B] font-mono">
                <Server className="w-3 h-3" />
                <span>v1.0.0</span>
             </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};