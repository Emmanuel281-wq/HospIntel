import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-t-2 border-b-2 border-blue-500 animate-[spin_1s_linear_infinite]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Inline SVG Activity Icon to avoid dependency on lucide-react during boot */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-6 h-6 text-blue-500 animate-pulse"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <h3 className="text-white font-bold tracking-widest text-sm">HOSPINTEL OS</h3>
        <p className="text-[#52525B] font-mono text-xs animate-pulse">INITIALIZING MODULES...</p>
      </div>
    </div>
  );
};