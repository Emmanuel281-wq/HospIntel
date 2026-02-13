import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Command, ArrowRight, FileText, 
  Shield, Activity, Server, Hash, Zap 
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Toggle with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { icon: Zap, label: 'Request Demo', sub: 'Schedule institutional briefing', action: () => navigate('/request-demo') },
    { icon: Server, label: 'Technology', sub: 'View architecture & sync engine', action: () => navigate('/technology') },
    { icon: Shield, label: 'Security', sub: 'Zero-trust protocols', action: () => navigate('/security') },
    { icon: FileText, label: 'Engineering Journal', sub: 'Read technical whitepapers', action: () => navigate('/insights') },
    { icon: Activity, label: 'System Status', sub: 'Check global uptime', action: () => navigate('/resources/status') },
    { icon: Hash, label: 'API Reference', sub: 'Developer documentation', action: () => navigate('/resources/api') },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) || 
    cmd.sub.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation within the list
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, filteredCommands, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-[#0A0A0A] border border-[#262626] rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10"
          >
            {/* Input */}
            <div className="flex items-center px-4 py-4 border-b border-[#1F1F1F]">
              <Search className="w-5 h-5 text-[#52525B] mr-3" />
              <input 
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="flex-1 bg-transparent text-white placeholder-[#52525B] focus:outline-none text-sm font-medium"
              />
              <div className="px-1.5 py-0.5 rounded bg-[#1F1F1F] border border-[#262626] text-[10px] text-[#71717A] font-mono">
                ESC
              </div>
            </div>

            {/* List */}
            <div className="py-2 max-h-[300px] overflow-y-auto custom-scrollbar">
              {filteredCommands.length === 0 ? (
                <div className="px-4 py-8 text-center text-[#52525B] text-sm">
                  No commands found.
                </div>
              ) : (
                <div className="px-2">
                  <div className="px-2 py-1.5 text-[10px] font-mono text-[#52525B] uppercase tracking-wider mb-1">
                    Suggestions
                  </div>
                  {filteredCommands.map((cmd, i) => (
                    <button
                      key={cmd.label}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        i === selectedIndex 
                          ? 'bg-[#1F1F1F] text-white' 
                          : 'text-[#A1A1AA] hover:bg-[#141414] hover:text-[#EDEDED]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                         i === selectedIndex ? 'border-[#333] bg-[#262626]' : 'border-[#1F1F1F] bg-[#111]'
                      }`}>
                         <cmd.icon className="w-3 h-3" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{cmd.label}</div>
                        <div className="text-xs text-[#52525B]">{cmd.sub}</div>
                      </div>
                      {i === selectedIndex && (
                        <ArrowRight className="w-3 h-3 text-[#52525B]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-[#1F1F1F] bg-[#0F0F0F] flex items-center justify-between text-[10px] text-[#52525B] font-mono">
               <div className="flex gap-3">
                 <span>↑↓ navigate</span>
                 <span>↵ select</span>
               </div>
               <span>HospIntel OS v2.4</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};