import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { ArrowUpRight, Filter, Calendar, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ title, date, excerpt, tag, readTime, slug, type = "Article" }: any) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/insights/${slug}`)}
      className="group cursor-pointer border-b border-[#1F1F1F] py-10 first:pt-0 hover:bg-white/[0.01] transition-colors -mx-4 px-4 rounded-lg"
    >
       <div className="flex items-center gap-3 mb-3">
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wide border ${
              tag === 'Engineering' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
              tag === 'Compliance' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
              'bg-[#171717] text-[#A1A1AA] border-[#262626]'
          }`}>
            {tag}
          </span>
          <span className="text-xs text-[#52525B] font-mono flex items-center gap-1">
             <Calendar className="w-3 h-3" />
             {date}
          </span>
          <span className="text-xs text-[#52525B] font-mono">• {readTime}</span>
       </div>
       
       <h2 className="text-2xl font-bold text-[#EDEDED] mb-3 group-hover:text-blue-400 transition-colors flex items-start justify-between gap-4">
          {title}
          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
       </h2>
       
       <p className="text-[#A1A1AA] leading-relaxed max-w-3xl text-sm md:text-base mb-4">
          {excerpt}
       </p>
       
       {type === "Whitepaper" && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#52525B] group-hover:text-[#EDEDED] transition-colors">
              <Download className="w-3 h-3" /> PDF Available
          </div>
       )}
    </motion.div>
  );
};

export const Insights: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();
  const tabs = ['All', 'Engineering', 'Infrastructure', 'Clinical Ops', 'Compliance'];

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container className="max-w-5xl">
        {/* Header - SEO Optimized H1 */}
        <div className="mb-16 border-b border-[#1F1F1F] pb-12">
           <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-xs font-mono text-blue-500 uppercase tracking-widest">HospIntel Research</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
              Engineering <span className="text-[#52525B]">&</span> Infrastructure<br/> Intelligence.
           </h1>
           <p className="text-xl text-[#A1A1AA] max-w-3xl font-light">
              Technical deep dives, architectural decision records, and operational whitepapers for healthcare CTOs and Systems Architects.
           </p>
        </div>

        {/* Featured Whitepaper - Lead Magnet */}
        <div className="mb-20">
           <div 
             onClick={() => navigate('/insights/cap-theorem')}
             className="relative rounded-xl border border-[#262626] bg-[#0A0A0A] overflow-hidden group cursor-pointer transition-all hover:border-blue-500/30"
           >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                 <div>
                    <div className="text-xs font-mono text-blue-400 mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        FEATURED WHITEPAPER
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6 leading-tight group-hover:text-blue-100 transition-colors">
                        The CAP Theorem in Critical Care: Why Availability Must Trump Consistency.
                    </h2>
                    <p className="text-[#A1A1AA] text-lg leading-relaxed mb-8">
                        An academic analysis of distributed systems in life-critical environments. Why we chose Eventual Consistency over Strong Consistency for our offline-first sync engine.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-white font-medium bg-blue-600/10 border border-blue-600/20 px-4 py-2 rounded-lg w-fit group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                        Read Full Analysis <ArrowUpRight className="w-4 h-4" />
                    </div>
                 </div>
                 
                 {/* Abstract visual */}
                 <div className="relative border border-[#262626] bg-[#050505] rounded-lg p-6 font-mono text-[10px] text-[#52525B] leading-loose overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-[#333]">FIG 1.1</div>
                    {`
> NETWORK_PARTITION_DETECTED
> NODE_A (ICU) -> WRITES_ACCEPTED (LOCAL)
> NODE_B (PHARM) -> WRITES_ACCEPTED (LOCAL)
> ... 4 hours later ...
> UPLINK_RESTORED
> INITIATING_MERKLE_TREE_EXCHANGE
> CONFLICT_RESOLUTION: LWW (Last Write Wins)
> SYNC_COMPLETE: 142ms
                    `}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent h-20 bottom-0 top-auto"></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
           <Filter className="w-4 h-4 text-[#52525B] mr-2" />
           {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all font-mono uppercase tracking-wide ${
                   activeTab === tab 
                   ? 'bg-[#EDEDED] text-black border border-white' 
                   : 'text-[#71717A] hover:text-white hover:bg-[#111] border border-transparent'
                }`}
              >
                {tab}
              </button>
           ))}
        </div>

        {/* Article List - Structured Data for SEO */}
        <div className="space-y-4">
           <ArticleCard 
              slug="merkle-trees"
              tag="Engineering"
              date="Oct 12, 2026"
              readTime="8 min read"
              title="Implementing Merkle Trees for Efficient Delta Syncing"
              excerpt="How we reduced bandwidth usage by 94% using cryptographic hashing to identify only the changed blocks in patient records."
           />
           <ArticleCard 
              slug="network-outage-postmortem"
              tag="Infrastructure"
              date="Sep 28, 2026"
              readTime="6 min read"
              title="Resilience Modeling: Network Partitions"
              excerpt="Simulating a 12-hour ISP outage and how a local mesh network maintains 100% uptime in disconnected environments."
           />
           <ArticleCard 
              slug="data-sovereignty"
              tag="Compliance"
              date="Sep 20, 2026"
              readTime="15 min read"
              type="Whitepaper"
              title="Data Sovereignty in the Age of Cloud: A Legal Framework"
              excerpt="Navigating NDPR and African Data Sovereignty laws while maintaining the benefits of a distributed cloud architecture."
           />
           <ArticleCard 
              slug="algorithmic-triage"
              tag="Clinical Ops"
              date="Sep 15, 2026"
              readTime="5 min read"
              title="Algorithmic Triage: Reducing Wait Times via Logic Gates"
              excerpt="Moving away from subjective prioritization to data-driven queuing models based on real-time vitals analysis."
           />
           <ArticleCard 
              slug="sqlite-app-format"
              tag="Engineering"
              date="Aug 02, 2026"
              readTime="12 min read"
              title="SQLite as an Application File Format"
              excerpt="Why we chose a single-file database architecture over a client-server model for individual device state management."
           />
        </div>
        
        {/* Newsletter / Updates CTA */}
        <div className="mt-24 p-12 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Subscribe to the Engineering Journal</h3>
            <p className="text-[#A1A1AA] mb-8 max-w-lg mx-auto">
                Get technical deep dives and architectural updates delivered to your inbox. 
                No marketing fluff, only systems engineering.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
                <input type="email" placeholder="work_email@hospital.org" className="flex-1 bg-[#050505] border border-[#262626] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                <button className="bg-[#EDEDED] text-black px-6 py-2 rounded-lg font-medium hover:bg-white transition-colors">Subscribe</button>
            </div>
        </div>

      </Container>
    </div>
  );
};