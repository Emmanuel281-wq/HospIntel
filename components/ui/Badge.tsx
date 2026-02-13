import React from 'react';

interface BadgeProps {
  status: 'success' | 'warning' | 'error' | 'neutral' | 'offline';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const styles = {
    success: "bg-green-500/10 text-green-400 border-green-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    error: "bg-red-500/10 text-red-400 border-red-500/20",
    neutral: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    offline: "bg-gray-500/10 text-gray-400 border-gray-500/20"
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[status]}`}>
      {status === 'success' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />}
      {status === 'offline' && <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5" />}
      {children}
    </span>
  );
};