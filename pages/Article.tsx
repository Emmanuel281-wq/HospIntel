import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { ArrowLeft, Clock, Calendar, User, Tag, Share2, Printer, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../components/ui/Button';

// --- CONTENT REPOSITORY ---
// In a real production app, this would be fetched from a Headless CMS (Sanity, Contentful).
// For this architecture, we embed the "Static" content directly to ensure zero-latency loading.

const ARTICLES: Record<string, any> = {
  "cap-theorem": {
    title: "The CAP Theorem in Critical Care: Why Availability Must Trump Consistency",
    subtitle: "An architectural analysis of distributed systems in life-critical environments.",
    date: "October 12, 2026",
    readTime: "12 min read",
    author: "Dr. K. Okafor, CTO",
    tag: "Distributed Systems",
    content: (
      <>
        <p className="lead">
          In distributed systems theory, the CAP theorem states that a data store can only provide two of the following three guarantees: Consistency, Availability, and Partition Tolerance. In the context of a hospital in Lagos or Nairobi, Partition Tolerance is not a choice—it is a reality of the infrastructure.
        </p>
        <p>
          This leaves us with a binary choice during a network failure: do we refuse to accept new patient vitals to ensure all databases are perfectly synced (Consistency), or do we accept the data locally and figure out the mess later (Availability)?
        </p>

        <h3>The Fallacy of Strong Consistency in Healthcare</h3>
        <p>
          Traditional EMRs (Electronic Medical Records) like Epic or Cerner are designed with Strong Consistency (CP) in mind. They assume a high-bandwidth, always-on connection to a central server. If the server is unreachable, the client device locks up.
        </p>
        <p>
          In a clinical setting, <strong>latency is a clinical risk</strong>. If a nurse cannot input a drug administration record because the Wi-Fi is down, they will write it on paper. This breaks the digital loop, leading to what we call "Shadow Data"—critical information that exists on scraps of paper but not in the system.
        </p>

        <div className="bg-[#0A0A0A] border border-[#262626] p-6 rounded-lg my-8 font-mono text-sm text-[#A1A1AA]">
          <div className="text-blue-400 mb-2">// The CP Failure Mode</div>
          <div>1. Nurse attempts to save Vitals(HR=120, BP=140/90)</div>
          <div>2. Network partition detected</div>
          <div>3. System returns ERROR_503_UPSTREAM_TIMEOUT</div>
          <div>4. Nurse abandons tablet, writes on paper</div>
          <div>5. Result: Digital Twin is now inaccurate</div>
        </div>

        <h3>Embracing Eventual Consistency</h3>
        <p>
          HospIntel is built as an <strong>AP (Available + Partition Tolerant)</strong> system. We utilize Conflict-Free Replicated Data Types (CRDTs) to ensure that every node can accept writes at any time, regardless of network status.
        </p>
        <p>
          When the network heals, our sync engine merges the divergent states. Because medical data is largely additive (append-only logs of events), true conflicts are rarer than in financial ledgers. When they do occur (e.g., two doctors changing a prescription simultaneously), we use Last-Write-Wins (LWW) with semantic merging rules that flag the conflict for human review without blocking the database.
        </p>

        <h3>Architecture of Resilience</h3>
        <p>
          We moved the "Source of Truth" from the server to the edge. Every HospIntel tablet runs a full SQLite instance. The "Cloud" is merely a peer that eventually receives the data, not the gatekeeper of it.
        </p>
        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
            <li><strong>Local Reads:</strong> 0ms latency. No network round-trip.</li>
            <li><strong>Local Writes:</strong> Immediate persistence to disk.</li>
            <li><strong>Background Sync:</strong> Data trickles up when bandwidth permits.</li>
        </ul>
        <p>
          By choosing Availability, we ensure that the software never becomes the bottleneck in patient care. The hospital runs, even when the internet doesn't.
        </p>
      </>
    )
  },
  "merkle-trees": {
    title: "Implementing Merkle Trees for Efficient Delta Syncing",
    subtitle: "Reducing bandwidth costs by 94% through cryptographic hashing.",
    date: "October 12, 2026",
    readTime: "8 min read",
    author: "Engineering Team",
    tag: "Engineering",
    content: (
      <>
        <p className="lead">
          Bandwidth in emerging markets is not just slow; it is expensive. A hospital operating system that re-downloads the entire patient index every morning is operationally inviable. We needed a way to synchronize gigabytes of medical data while transmitting only kilobytes of changes.
        </p>

        <h3>The Bandwidth Problem</h3>
        <p>
          In a naïve synchronization model, client A asks server B for "all records." As the dataset grows to millions of patients, this JSON payload becomes massive. Even "poll for changes since timestamp X" is fragile, as clock drift between devices can lead to missing records.
        </p>

        <h3>Enter the Merkle Tree</h3>
        <p>
          A Merkle Tree (or Hash Tree) allows us to verify the contents of a large data structure efficiently. We hash every patient record. Then we pair those hashes and hash them together, recursively, until we have a single "Root Hash."
        </p>
        <p>
          When a HospIntel tablet connects to the mesh:
        </p>
        <ol className="list-decimal pl-5 space-y-2 marker:text-white">
            <li>It sends its <strong>Root Hash</strong> to the peer.</li>
            <li>If the Root Hashes match, the data is identical. <strong>Sync complete (0 bytes transferred).</strong></li>
            <li>If they differ, the devices compare the hashes of the child branches.</li>
            <li>They traverse the tree down to the specific "leaf" (patient record) that differs.</li>
            <li>Only that specific record is transmitted.</li>
        </ol>

        <div className="bg-[#0A0A0A] border border-[#262626] p-6 rounded-lg my-8">
            <h4 className="text-white font-bold mb-4">Bandwidth Consumption Comparison</h4>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-xs text-[#71717A] mb-1">
                        <span>REST API (Full Pull)</span>
                        <span>45 MB</span>
                    </div>
                    <div className="w-full bg-[#1F1F1F] h-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-full"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs text-[#71717A] mb-1">
                        <span>Timestamp Polling</span>
                        <span>2.1 MB</span>
                    </div>
                    <div className="w-full bg-[#1F1F1F] h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[10%]"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs text-[#71717A] mb-1">
                        <span>Merkle Tree Delta</span>
                        <span>14 KB</span>
                    </div>
                    <div className="w-full bg-[#1F1F1F] h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[1%]"></div>
                    </div>
                </div>
            </div>
        </div>

        <h3>Result</h3>
        <p>
          This approach allows a doctor to walk into a facility after a week away, open their tablet, and be fully synchronized with the hospital's state within seconds, even over a 3G connection. We moved the computational cost from the network (bandwidth) to the CPU (hashing), a trade-off that aligns perfectly with modern hardware capabilities.
        </p>
      </>
    )
  },
  "network-outage-postmortem": {
    title: "Surviving the Network Cut: A Post-Mortem",
    subtitle: "Analyzing a 12-hour ISP outage at a Level 1 Trauma Center.",
    date: "September 28, 2026",
    readTime: "6 min read",
    author: "Ops Team",
    tag: "Infrastructure",
    content: (
      <>
        <p className="lead">
          On September 24th, a major fiber cut severed connectivity to one of our largest deployment sites in Abuja. For 12 hours, the hospital had zero connection to the outside world. This is the timeline of how HospIntel performed.
        </p>

        <h3>Incident Timeline</h3>
        <ul className="space-y-4 border-l border-[#262626] pl-6 my-8">
            <li className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-red-500"></div>
                <strong className="text-white block">08:14 AM</strong>
                <span className="text-[#A1A1AA]">Fiber cut reported. WAN uplink lost. Cloud API unreachable.</span>
            </li>
            <li className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-blue-500"></div>
                <strong className="text-white block">08:14 AM (+300ms)</strong>
                <span className="text-[#A1A1AA]">Local nodes detect timeout. Gossip protocol switches to LAN-only mode. UI shows "Offline Mode" badge.</span>
            </li>
            <li className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-blue-500"></div>
                <strong className="text-white block">10:00 AM</strong>
                <span className="text-[#A1A1AA]">Peak patient inflow. 450 active sessions. Triage continues using local logic gates. No slowdown in interface response.</span>
            </li>
            <li className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-green-500"></div>
                <strong className="text-white block">08:30 PM</strong>
                <span className="text-[#A1A1AA]">Uplink restored. 12,400 pending mutations queued for upload. Background sync initiates.</span>
            </li>
        </ul>

        <h3>The Human Factor</h3>
        <p>
            The most significant metric was <strong>user behavior</strong>. In previous systems, an outage meant reverting to paper. During this outage, we observed zero switch-to-paper events. Nurses continued using the tablets because the UX remained responsive.
        </p>
        <p>
            Trust is built when systems work when they shouldn't. By decoupling the UI from the network request, we decoupled clinical operations from infrastructure failures.
        </p>
      </>
    )
  },
  "data-sovereignty": {
    title: "Data Sovereignty in the Age of Cloud: A Legal Framework",
    subtitle: "Navigating NDPR and African Data Sovereignty laws in distributed architectures.",
    date: "September 20, 2026",
    readTime: "15 min read",
    author: "Legal & Compliance",
    tag: "Compliance",
    content: (
      <>
        <p className="lead">
            Healthcare data regulation is increasingly strictly enforced in Africa. The Nigeria Data Protection Act (NDPA) of 2023 mandates that critical sovereign data must be physically resident within the country unless specific derogations apply.
        </p>

        <h3>The Sovereign Cloud Model</h3>
        <p>
            HospIntel adopts a "Sovereign-Local" architecture. 
        </p>
        <p>
            1. <strong>Primary Storage:</strong> The primary copy of the data exists on the physical devices within the hospital (Local Residency).
            <br/>
            2. <strong>Sync Target:</strong> Our cloud relay servers are hosted in Tier III data centers within Lagos (MainOne MDXi) and Johannesburg.
        </p>

        <h3>Legal Derogations</h3>
        <p>
            By using end-to-end encryption where the private keys are held by the hospital (not HospIntel), we ensure that even if data transits through a foreign server for routing, it remains mathematically opaque and thus legally compliant with strict residency laws. We act as a processor of encrypted blobs, not a processor of identifiable health information.
        </p>
      </>
    )
  },
  "algorithmic-triage": {
    title: "Algorithmic Triage: Reducing Wait Times via Logic Gates",
    subtitle: "Removing bias from emergency room prioritization.",
    date: "September 15, 2026",
    readTime: "5 min read",
    author: "Clinical Product Team",
    tag: "Clinical Ops",
    content: (
      <>
        <p className="lead">
            Triage is the most dangerous point in a hospital visit. It is where human bias, fatigue, and error can lead to critical patients waiting too long.
        </p>
        
        <h3>The ESI Problem</h3>
        <p>
            The Emergency Severity Index (ESI) is the standard, but it is subjective. Two different nurses might score the same patient differently based on how "loud" the patient is complaining.
        </p>

        <h3>Deterministic Triage</h3>
        <p>
            HospIntel implements a logic-gate triage system. It takes objective inputs:
        </p>
        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
            <li>Vital Signs (HR, BP, SpO2)</li>
            <li>Chief Complaint (Mapped to SNOMED CT)</li>
            <li>Age / Comorbidities</li>
        </ul>
        <p>
            The system runs these inputs through a locally-stored rules engine (no API call required) to generate a recommended priority score. This score isn't a mandate—the nurse can override it—but it provides a <strong>computational baseline</strong> that catches sepsis or silent myocardial infarctions that a tired human might miss.
        </p>
      </>
    )
  },
  "sqlite-app-format": {
    title: "SQLite as an Application File Format",
    subtitle: "Why we abandoned the Client-Server database model.",
    date: "August 02, 2026",
    readTime: "12 min read",
    author: "Engineering Team",
    tag: "Engineering",
    content: (
      <>
        <p className="lead">
            The standard web development stack (React + JSON API + Postgres) is fundamentally flawed for mission-critical apps. It assumes the server is the brain and the client is a dumb terminal.
        </p>

        <h3>The Local-First Paradigm</h3>
        <p>
            We use SQLite (specifically, a WASM build) as the application file format. When a user logs in, they aren't fetching rows; they are mounting a database.
        </p>
        <p>
            This gives us full SQL power on the client. We can run complex joins, full-text searches, and aggregations directly on the user's device with zero network latency.
        </p>
        
        <h3>WAL Mode & Concurrency</h3>
        <p>
            Using Write-Ahead Logging (WAL), we allow non-blocking reads and writes on the client. The synchronization engine simply acts as a replication stream for the WAL file. This architecture makes HospIntel feel like a native desktop app, even though it runs in the browser.
        </p>
      </>
    )
  }
};

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
                            {['Distributed Systems', 'Offline-First', 'CRDTs', 'Security', 'Healthcare'].map(t => (
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