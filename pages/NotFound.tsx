import React from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { SearchX, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] flex items-center pt-20">
      <Container className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#0A0A0A] border border-[#262626] text-[#52525B] mb-8">
          <SearchX className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
          404: Resource Invalid
        </h1>
        
        <p className="text-[#A1A1AA] text-lg mb-8 font-mono max-w-md mx-auto">
          The requested navigational vector does not map to a known subsystem.
        </p>

        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate('/')} size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </div>
        
        <div className="mt-12 p-4 bg-[#0A0A0A] border border-[#1F1F1F] rounded inline-block">
          <code className="text-xs text-[#52525B] font-mono">
            ERR_ROUTE_UNREACHABLE :: 0x800404
          </code>
        </div>
      </Container>
    </div>
  );
};
