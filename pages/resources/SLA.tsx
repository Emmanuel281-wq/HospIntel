import React from 'react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Download, Shield } from 'lucide-react';

export const SLA: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container className="max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">Service Level Agreement</h1>
          <p className="text-xl text-[#A1A1AA] font-light leading-relaxed">
            Our commitment to uptime and reliability is not just a promise; it's a contractual guarantee. 
            We offer industry-leading SLAs backed by financial credits.
          </p>
        </div>

        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden mb-12">
           <table className="w-full text-left text-sm">
              <thead className="bg-[#111] text-white font-bold border-b border-[#262626]">
                 <tr>
                    <th className="p-6">Subscription Tier</th>
                    <th className="p-6">Uptime Guarantee</th>
                    <th className="p-6">Support Response</th>
                    <th className="p-6">Service Credit Cap</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F1F] text-[#A1A1AA]">
                 <tr>
                    <td className="p-6 text-white font-medium">Enterprise Core</td>
                    <td className="p-6">99.9%</td>
                    <td className="p-6">4 Hours</td>
                    <td className="p-6">30%</td>
                 </tr>
                 <tr>
                    <td className="p-6 text-white font-medium">Mission Critical</td>
                    <td className="p-6 text-blue-400 font-bold">99.99%</td>
                    <td className="p-6">1 Hour (24/7)</td>
                    <td className="p-6">50%</td>
                 </tr>
                 <tr>
                    <td className="p-6 text-white font-medium">Dedicated Infra</td>
                    <td className="p-6 text-hosp-gold font-bold">99.999%</td>
                    <td className="p-6">15 Minutes</td>
                    <td className="p-6">100%</td>
                 </tr>
              </tbody>
           </table>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
           <div>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                 <Shield className="w-4 h-4 text-blue-500" /> Maintenance Windows
              </h3>
              <p className="text-[#71717A] text-sm leading-relaxed">
                 HospIntel utilizes a blue-green deployment architecture, meaning zero downtime during standard updates. 
                 Major structural maintenance is communicated 14 days in advance and scheduled during off-peak hours (02:00 - 04:00 Local).
              </p>
           </div>
           <div>
              <h3 className="text-white font-bold mb-4">Credit Calculation</h3>
              <p className="text-[#71717A] text-sm leading-relaxed">
                 Service Credits are calculated as a percentage of the total monthly bill. 
                 Credits are applied to the next billing cycle.
                 <br/><br/>
                 Example: 99.5% uptime on a 99.9% tier results in a 10% credit.
              </p>
           </div>
        </div>

        <div className="flex justify-center">
           <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Download Full SLA (PDF)
           </Button>
        </div>

      </Container>
    </div>
  );
};