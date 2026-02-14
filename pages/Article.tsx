import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { ArrowLeft, Clock, User, Share2, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ARTICLES } from '../data/content';

export const Article: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = slug ? ARTICLES[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
        <div className="pt-32 pb-20 bg-[#050505] min-h-screen flex items-center justify-center">
            <Container className="text-center">
                <h1 className="text-4xl text-white font-bold mb-4">Article Not Found</h1>
                <Button onClick={() => navigate('/insights')}>Return to Journal</Button>
            </Container>
        </div>
    );
  }

  return (
    <article className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <Container className="max-w-4xl">
        {/* Navigation */}
        <button 
            onClick={() => navigate('/insights')}
            className="group flex items-center gap-2 text-sm text-[#71717A] hover:text-white mb-12 transition-colors"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Engineering Journal
        </button>

        {/* Header */}
        <div className="mb-12 border-b border-[#262626] pb-12">
            <div className="flex items-center gap-3 mb-6">
                <span className="px-2 py-1 rounded text-xs font-mono font-medium uppercase tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {article.tag}
                </span>
                <span className="text-[#52525B] text-sm flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {article.readTime}
                </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                {article.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#A1A1AA] leading-relaxed font-light">
                {article.subtitle}
            </p>
            
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-[#1F1F1F]">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#111] border border-[#262626] flex items-center justify-center text-[#52525B]">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-sm text-white font-medium">{article.author}</div>
                        <div className="text-xs text-[#71717A]">{article.date}</div>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button className="p-2 rounded bg-[#111] border border-[#262626] text-[#A1A1AA] hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded bg-[#111] border border-[#262626] text-[#A1A1AA] hover:text-white transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded bg-[#111] border border-[#262626] text-[#A1A1AA] hover:text-white transition-colors">
                        <Twitter className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Main Text */}
            <div className="lg:col-span-8">
                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-[#A1A1AA] prose-strong:text-white prose-code:text-blue-400 prose-pre:bg-[#0A0A0A] prose-pre:border prose-pre:border-[#262626] prose-li:text-[#A1A1AA]">
                    {article.content}
                </div>
                
                <div className="mt-20 pt-12 border-t border-[#262626]">
                    <h3 className="text-white font-bold mb-6">About the Author</h3>
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-8 rounded-xl flex gap-6 items-start">
                        <div className="w-16 h-16 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#52525B] shrink-0">
                             <User className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-2">{article.author}</h4>
                            <p className="text-[#A1A1AA] text-sm leading-relaxed">
                                Building resilient infrastructure for the next generation of African healthcare. 
                                Specializing in distributed systems, local-first architecture, and clinical operations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-32">
                    <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#1F1F1F] mb-8">
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Related Topics</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Distributed Systems', 'Hybrid-Cloud', 'CRDTs', 'Security', 'Healthcare'].map(t => (
                                <span key={t} className="px-2 py-1 rounded bg-[#111] border border-[#262626] text-xs text-[#A1A1AA] hover:text-white hover:border-[#404040] transition-colors cursor-pointer">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-blue-900/10 border border-blue-500/20">
                        <h4 className="text-sm font-bold text-blue-100 mb-2">HospIntel Enterprise</h4>
                        <p className="text-xs text-blue-200/70 mb-4 leading-relaxed">
                            See these architectures in action. Schedule a technical deep-dive with our solutions engineering team.
                        </p>
                        <Button className="w-full text-xs" onClick={() => navigate('/request-demo')}>Request Briefing</Button>
                    </div>
                </div>
            </div>
        </div>

      </Container>
    </article>
  );
};