import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
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
                  <AlertTriangle className="w-6 h-6" />
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
                  <Terminal className="w-4 h-4" />
                  <span className="text-xs">STACK_TRACE_DUMP</span>
                </div>
                <code className="text-xs text-red-400 block whitespace-pre-wrap">
                  {this.state.error?.toString()}
                </code>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="bg-red-600 hover:bg-red-500 text-white border-transparent"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
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