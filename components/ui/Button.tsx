import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-[#050505] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg tracking-tight overflow-hidden";
  
  const variants = {
    primary: "bg-[#EDEDED] text-black hover:bg-white border border-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)] group",
    secondary: "bg-[#171717] text-[#EDEDED] border border-[#262626] hover:border-[#404040] hover:bg-[#262626]",
    outline: "bg-transparent border border-[#262626] text-[#A1A1AA] hover:text-[#EDEDED] hover:border-[#404040]",
    ghost: "bg-transparent text-[#A1A1AA] hover:text-[#EDEDED] hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Subtle shimmer effect for primary button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10 w-full h-full transform skew-x-12" />
      )}
      <span className="relative z-20 flex items-center">{children}</span>
    </button>
  );
};