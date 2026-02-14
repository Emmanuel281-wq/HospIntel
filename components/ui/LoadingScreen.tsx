
import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-t-2 border-b-2 border-blue-500 animate-[spin_1s_linear_infinite]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Simple Pulse Dot */}
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <h3 className="text-white font-bold tracking-widest text-sm">HOSPINTEL OS</h3>
        <div className="flex items-center gap-1">
           <span className="w-1 h-1 bg-[#52525B] rounded-full animate-bounce"></span>
           <span className="w-1 h-1 bg-[#52525B] rounded-full animate-bounce delay-100"></span>
           <span className="w-1 h-1 bg-[#52525B] rounded-full animate-bounce delay-200"></span>
        </div>
        <p className="text-[#52525B] font-mono text-[10px] uppercase tracking-wider mt-2">
           Loading Modules...
        </p>
      </div>
    </div>
  );
};
