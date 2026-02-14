import React, { ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';

// Inline simple SVGs to prevent crash if icon lib fails
const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <path d="M12 9v4"/>
    <path d="M12 17h.01"/>
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
    <path d="M16 16h5v5"/>
  </svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" x2="20" y1="19" y2="19"/>
  </svg>
);

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-mono flex items-center justify-center p-4">
          <Container className="max-w-2xl">
            <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded bg-red-500/10 flex items-center justify-center text-red-500">
                  <AlertIcon />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white uppercase tracking-wider">System Exception</h1>
                  <p className="text-red-400 text-sm">CRITICAL_PROCESS_DIED</p>
                </div>
              </div>

              <p className="text-[#A1A1AA] mb-8 font-sans leading-relaxed">
                The application encountered an unrecoverable error in the rendering thread. 
                Diagnostic data has been logged locally.
              </p>

              <div className="bg-[#0A0A0A] border border-[#262626] rounded p-4 mb-8 overflow-x-auto">
                <div className="flex items-center gap-2 text-[#52525B] mb-2 border-b border-[#262626] pb-2">
                  <TerminalIcon />
                  <span className="text-xs">STACK_TRACE_DUMP</span>
                </div>
                <code className="text-xs text-red-400 block whitespace-pre-wrap">
                  {this.state.error?.toString() || "Unknown error occurred"}
                </code>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="bg-red-600 hover:bg-red-500 text-white border-transparent"
                >
                  <RefreshIcon />
                  Initiate System Reboot
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'}
                >
                  Return to Safe Mode
                </Button>
              </div>
            </div>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}