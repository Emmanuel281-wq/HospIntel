import React from 'react';

export const ARTICLES: Record<string, any> = {
  "cap-theorem": {
    title: "The CAP Theorem in Critical Care: Why Availability Must Trump Consistency",
    subtitle: "An architectural analysis of distributed systems in life-critical environments.",
    date: "October 12, 2026",
    readTime: "12 min read",
    author: "Dr. K. Okafor, CTO",
    tag: "Distributed Systems",
    excerpt: "Why we prioritize Availability over Consistency in our offline-first sync engine.",
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

        <h3>Embracing Hybrid Resiliency</h3>
        <p>
          HospIntel is built as an <strong>AP (Available + Partition Tolerant)</strong> system. We utilize Conflict-Free Replicated Data Types (CRDTs) to ensure that every node can accept writes at any time, switching to local storage when the network fails.
        </p>
        <p>
          When the network heals, our sync engine merges the divergent states. Because medical data is largely additive (append-only logs of events), true conflicts are rarer than in financial ledgers. When they do occur (e.g., two doctors changing a prescription simultaneously), we use Last-Write-Wins (LWW) with semantic merging rules that flag the conflict for human review without blocking the database.
        </p>

        <h3>Architecture of Resilience</h3>
        <p>
          We employ an adaptive "Source of Truth" model. While the cloud is the ultimate authority, the local device acts as a fully functional failover node.
        </p>
        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
            <li><strong>Failover Writes:</strong> Immediate persistence to disk if cloud is unreachable.</li>
            <li><strong>Automatic Sync:</strong> Data trickles up when bandwidth permits.</li>
            <li><strong>Continuous Availability:</strong> The UI remains responsive during network transitions.</li>
        </ul>
        <p>
          By implementing intelligent network switching, we ensure that the software never becomes the bottleneck in patient care. The hospital runs, even when the internet doesn't.
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
    excerpt: "How we reduced bandwidth usage by 94% using cryptographic hashing to identify only the changed blocks in patient records.",
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
    title: "Resilience Modeling: Network Partitions",
    subtitle: "Simulating a 12-hour ISP outage and maintaining 100% uptime in disconnected environments.",
    date: "September 28, 2026",
    readTime: "6 min read",
    author: "Ops Team",
    tag: "Infrastructure",
    excerpt: "Simulating a 12-hour ISP outage and how a local mesh network maintains 100% uptime in disconnected environments.",
    content: (
      <>
        <p className="lead">
          Fiber cuts and ISP failures are a reality of infrastructure in developing markets. We model our system behavior against a "12-hour cut" scenario to ensure clinical continuity.
        </p>

        <h3>Incident Simulation</h3>
        <ul className="space-y-4 border-l border-[#262626] pl-6 my-8">
            <li className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-red-500"></div>
                <strong className="text-white block">T-Minus 0</strong>
                <span className="text-[#A1A1AA]">Fiber cut simulation. WAN uplink lost. Cloud API unreachable.</span>
            </li>
            <li className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-blue-500"></div>
                <strong className="text-white block">T-Plus 300ms</strong>
                <span className="text-[#A1A1AA]">Local nodes detect timeout. Gossip protocol switches to LAN-only mode. UI shows "Offline Mode" badge.</span>
            </li>
            <li className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-blue-500"></div>
                <strong className="text-white block">T-Plus 2 Hours</strong>
                <span className="text-[#A1A1AA]">Peak load simulation. Triage continues using local logic gates. No slowdown in interface response observed.</span>
            </li>
            <li className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-green-500"></div>
                <strong className="text-white block">T-Plus 12 Hours</strong>
                <span className="text-[#A1A1AA]">Uplink restored. Pending mutations queued for upload. Background sync initiates.</span>
            </li>
        </ul>

        <h3>The Human Factor</h3>
        <p>
            The critical metric in this scenario is <strong>user behavior</strong>. In legacy systems, outages force a revert to paper. In our resilience model, nurses continue using tablets because the UX remains responsive, decoupling clinical operations from infrastructure status.
        </p>
        <p>
            Trust is built when systems work when they shouldn't. By decoupling the UI from the network request, we decouple clinical operations from infrastructure failures.
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
    type: "Whitepaper",
    excerpt: "Navigating NDPR and African Data Sovereignty laws while maintaining the benefits of a distributed cloud architecture.",
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
            2. <strong>Sync Target:</strong> Our cloud relay servers are architected to reside in Tier III data centers within sovereign borders where required.
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
    excerpt: "Moving away from subjective prioritization to data-driven queuing models based on real-time vitals analysis.",
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
    excerpt: "Why we chose a single-file database architecture over a client-server model for individual device state management.",
    content: (
      <>
        <p className="lead">
            The standard web development stack (React + JSON API + Postgres) is fundamentally flawed for mission-critical apps. It assumes the server is the brain and the client is a dumb terminal.
        </p>

        <h3>The Hybrid Edge Paradigm</h3>
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