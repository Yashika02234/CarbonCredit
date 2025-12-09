/* eslint-disable no-irregular-whitespace */
import React from 'react';
import {
  Leaf,
  TrendingUp,
  Download,
  Wind,
  Trees,
  ArrowRight,
  Globe2,
  PieChart,
  Wallet,
  CheckCircle2,
  MoreHorizontal,
  Share2,
  Maximize2,
  Layers,
} from 'lucide-react';

// Define the Asset type used in the certificates
interface CertificateAsset {
    id: string;
    project: string;
    amount: string;
    date: string;
    image: string;
    type: string;
    color: string;
    status: string;
}

// Mock Data for the Certificates
const mockCertificates: CertificateAsset[] = [
    { id: "CRT-2024-8892", project: "Amazon Conservation", amount: "500", date: "Oct 12, 2024", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", type: "Forestry", color: "text-emerald-500", status: "Retired" },
    { id: "CRT-2024-7721", project: "Wind Energy Maharashtra", amount: "1,200", date: "Sep 28, 2024", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7", type: "Renewable", color: "text-cyan-500", status: "Retired" },
    { id: "CRT-2024-6654", project: "Blue Carbon Mangrove", amount: "350", date: "Aug 15, 2024", image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7", type: "Blue Carbon", color: "text-blue-500", status: "Retired" },
    { id: "CRT-2024-5510", project: "Clean Cookstoves", amount: "400", date: "Jul 02, 2024", image: "https://images.unsplash.com/photo-1595278069441-2cf29f525a3c", type: "Community", color: "text-orange-500", status: "Retired" },
];


// ==========================================
// 1. PDF DESIGN TEMPLATES (Print-Ready HTML/CSS)
// ==========================================

const PDFCertificateTemplate: React.FC<{ certificate: CertificateAsset }> = ({ certificate }) => (
    <div className="p-8 border-4 border-emerald-500 bg-white shadow-xl max-w-lg mx-auto" style={{ width: '210mm', height: '148mm' }}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-emerald-600" /> CarbonVault Certificate
            </h2>
            <span className="text-sm font-mono text-gray-500">{certificate.date}</span>
        </div>

        <div className="text-center my-12">
            <p className="text-xl font-medium text-gray-600 mb-2">Certificate of Permanent Retirement</p>
            <h1 className="text-6xl font-extrabold text-emerald-700 tracking-tight mb-4">
                {certificate.amount} tCO₂e
            </h1>
            <p className="text-lg font-semibold text-gray-700">from the {certificate.project} project</p>
        </div>

        <div className="flex justify-between border-t border-b border-gray-200 py-4 text-sm">
            <div className="flex flex-col">
                <span className="text-xs font-mono text-gray-500 uppercase">Certificate ID</span>
                <span className="font-semibold text-gray-900">{certificate.id}</span>
            </div>
            <div className="flex flex-col text-right">
                <span className="text-xs font-mono text-gray-500 uppercase">Asset Type</span>
                <span className="font-semibold text-gray-900">{certificate.type}</span>
            </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
            <p>This document verifies the permanent and irreversible retirement of the listed carbon credits on the blockchain.</p>
            <p>Status: {certificate.status}</p>
        </div>
    </div>
);

interface ReportData {
    reportDate: string;
    company: string;
    netOffset: string;
    portfolioValue: string;
    retirementRatio: string;
    assets: { id: string, project: string, amount: string, type: string, date: string }[];
    breakdown: { type: string, percentage: string }[];
    sdgs: { num: string, label: string }[];
}

const PDFReportTemplate: React.FC<{ data: ReportData }> = ({ data }) => (
    <div className="p-10 bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
        <div className="border-b-4 border-primary pb-4 mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800">Annual Climate Impact Report</h1>
            <p className="text-sm text-gray-500 mt-1">Generated for {data.company} | Date: {data.reportDate}</p>
        </div>

        <h2 className="text-xl font-bold text-emerald-600 mb-4">1. Portfolio Summary</h2>
        <div className="grid grid-cols-3 gap-6 mb-8 text-gray-700">
            <div>
                <p className="text-xs uppercase font-mono text-gray-500">Net Offset</p>
                <p className="text-2xl font-bold">{data.netOffset}</p>
            </div>
            <div>
                <p className="text-xs uppercase font-mono text-gray-500">Portfolio Value</p>
                <p className="text-2xl font-bold">{data.portfolioValue}</p>
            </div>
            <div>
                <p className="text-xs uppercase font-mono text-gray-500">Retirement Ratio</p>
                <p className="text-2xl font-bold text-emerald-600">{data.retirementRatio}</p>
            </div>
        </div>

        <h2 className="text-xl font-bold text-emerald-600 mb-4 mt-8">2. Asset Allocation & SDGs</h2>
        <div className="grid grid-cols-2 gap-8">
            <div>
                <h3 className="text-lg font-semibold mb-3">Allocation Breakdown</h3>
                {data.breakdown.map((b, i) => (
                    <div key={i} className="flex justify-between py-1 border-b border-gray-100 text-sm">
                        <span>{b.type}</span>
                        <span className="font-mono font-semibold">{b.percentage}</span>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-3">SDG Contribution</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    {data.sdgs.map((s, i) => (
                        <li key={i}>{s.label} (Goal {s.num})</li>
                    ))}
                </ul>
            </div>
        </div>

        <h2 className="text-xl font-bold text-emerald-600 mb-4 mt-12">3. Retired Certificates</h2>
        <table className="w-full text-left border-collapse table-auto text-sm">
            <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <th className="py-2 px-4">ID</th>
                    <th className="py-2 px-4">Project</th>
                    <th className="py-2 px-4">Amount (t)</th>
                    <th className="py-2 px-4">Date</th>
                </tr>
            </thead>
            <tbody>
                {data.assets.map((a, i) => (
                    <tr key={i} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-4 font-mono">{a.id}</td>
                        <td className="py-2 px-4">{a.project}</td>
                        <td className="py-2 px-4 font-mono">{a.amount}</td>
                        <td className="py-2 px-4 font-mono text-gray-500">{a.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        <div className="mt-20 pt-5 border-t border-gray-200 text-xs text-gray-500 text-center">
            Verification via CarbonVault Blockchain Ledger.
        </div>
    </div>
);


// ==========================================
// 2. REPORT GENERATION FUNCTIONS (Simulated Functionality)
// ==========================================

const generateAnnualReportData = (): ReportData => {
    return {
        reportDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        company: "Acme Corp.",
        netOffset: "2,450 tCO2e",
        portfolioValue: "$42,890",
        retirementRatio: "98.5%",
        assets: mockCertificates.map(c => ({ id: c.id, project: c.project, amount: c.amount, type: c.type, date: c.date })),
        breakdown: [
            { type: 'Forestry', percentage: '45%' },
            { type: 'Renewable', percentage: '30%' },
            { type: 'Community', percentage: '25%' },
        ],
        sdgs: [
            { num: '13', label: 'Climate Action' },
            { num: '15', label: 'Life on Land' },
            { num: '07', label: 'Affordable Energy' },
        ]
    };
};

/**
 * Helper function to simulate rendering React component to string and initiating PDF download.
 */
const simulatePDFDownload = (contentElement: JSX.Element, filename: string) => {
    // NOTE: In a live app, you would use ReactDOMServer.renderToString(contentElement)
    // and then pass that HTML string to a PDF library like jsPDF or a backend service.

    const downloadMessage = `[PDF Download Simulation] The highly styled content for "${filename}" has been generated.
    
*** TO ACHIEVE TRUE PDF OUTPUT (e.g., in a React/JS environment), you would need to use external libraries:
1. Client-Side: html2canvas (to render HTML/CSS to an image) + jsPDF (to convert the image to PDF).
2. Server-Side: A library like Puppeteer or wkhtmltopdf to render the HTML/CSS accurately.
    
    This function will now download a file with the correct .pdf extension (containing the simulation log).`;

    const blob = new Blob([downloadMessage], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.pdf`; // Downloads as PDF
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`Download initiated successfully for ${filename}.pdf. (Check downloads)`);
    alert(`Downloading ${filename}.pdf! (Simulated PDF generation)`);
};


// =======================
// 3. FUNCTIONAL HANDLERS
// =======================

const handleAddAssets = () => {
    alert("Functionality triggered: Navigating to Marketplace/Add Assets page.");
    console.log("Navigating to Marketplace/Add Assets page...");
    // window.location.href = '/marketplace/add'; // Example redirect
};

const handleDownloadReport = () => {
    const reportData = generateAnnualReportData();
    const filename = `Annual_Impact_Report_${reportData.company}_${new Date().getFullYear()}`;
    
    // Render the report template for simulation
    const reportElement = <PDFReportTemplate data={reportData} />;
    
    simulatePDFDownload(reportElement, filename);
};

const handleShare = (certificate: CertificateAsset) => {
    const shareText = `Check out my retired carbon offset certificate! Project: ${certificate.project} (${certificate.amount} tCO2e). ID: ${certificate.id}.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Carbon Certificate Offset',
            text: shareText,
            url: `[Link to Certificate Proof]`, 
        }).catch((error) => console.error('Error sharing:', error));
    } else {
        navigator.clipboard.writeText(shareText);
        alert('Share link copied to clipboard!');
    }
};

const handleDownloadCertificate = (certificate: CertificateAsset) => {
    const filename = `${certificate.id}_Certificate`;
    
    // Render the certificate template for simulation
    const certificateElement = <PDFCertificateTemplate certificate={certificate} />;
    
    simulatePDFDownload(certificateElement, filename);
};


// =======================
// 4. SUB-COMPONENTS (Original structure, minor updates)
// =======================

interface ImpactCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  sub: string;
  trend?: string;
  color: string; // e.g. "text-emerald-500"
  delay?: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({
  icon: Icon,
  label,
  value,
  sub,
  trend,
  color,
  delay,
}) => (
  <div
    className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 md:p-8 group hover:border-primary/40 hover:shadow-xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 hover:-translate-y-1"
    style={{ animationDelay: delay }}
  >
    {/* Background Glow */}
    <div
      className={`absolute top-0 right-0 w-32 h-32 ${color.replace(
        'text-',
        'bg-',
      )}/30 blur-[70px] rounded-full transition-all`}
    />

    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="flex justify-between items-start mb-6">
        <div
          className={`p-3 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center ${color}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
            <TrendingUp className="w-3 h-3" /> {trend}
          </span>
        )}
        </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
          {label}
        </p>
        <h3 className="text-3xl md:text-4xl font-semibold text-foreground mb-2 tracking-tight">
          {value}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">{sub}</p>
      </div>
    </div>
  </div>
);

interface CertificateCardProps extends CertificateAsset {
    onShare: (certificate: CertificateAsset) => void;
    onDownload: (certificate: CertificateAsset) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  id,
  project,
  amount,
  date,
  image,
  type,
  color,
  status = 'Retired',
    onShare,
    onDownload,
}) => {
    const certificate = { id, project, amount, date, image, type, color, status };

    return (
        <div className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
        {/* Top Image Section */}
        <div className="h-40 relative overflow-hidden">
            <img
                src={`${image}?auto=format&fit=crop&q=80&w=800`}
                alt={project}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div
                className={`absolute top-3 left-3 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur text-white flex items-center gap-1.5 shadow-sm`}
            >
                <div
                    className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')}`}
                />
                {type}
            </div>

            <div className="absolute top-3 right-3 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                {status}
            </div>
        </div>

        {/* Content */}
        <div className="p-5 relative bg-card">
            {/* Decorative Line */}
            <div
                className={`absolute top-0 left-6 w-8 h-1 -mt-0.5 rounded-b-full ${color.replace(
                    'text-',
                    'bg-',
                )}`}
            />

            <div className="flex justify-between items-start mb-4 mt-2">
                <div>
                    <p className="text-[9px] text-muted-foreground font-mono mb-1 uppercase tracking-widest">
                        Certificate ID
                    </p>
                    <p className="text-xs text-foreground font-mono tracking-wide">
                        {id}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] text-muted-foreground font-mono mb-1 uppercase tracking-widest">
                        Amount
                    </p>
                    <p className="text-lg font-semibold text-foreground">{amount} t</p>
                </div>
            </div>

            <h4 className="text-sm font-semibold text-foreground mb-4 line-clamp-1 group-hover:text-primary transition-colors">
                {project}
            </h4>

            <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground font-mono">{date}</span>
                <div className="flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onShare(certificate); }}
                        className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                        title="Share"
                    >
                        <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDownload(certificate); }}
                        className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center gap-2 text-[10px] font-bold uppercase px-3 transition-colors border border-primary/30"
                        title="Download"
                    >
                        <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

interface SDGChipProps {
  num: string;
  color: string; // bg-*
  label: string;
}

const SDGChip: React.FC<SDGChipProps> = ({ num, color, label }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors cursor-default group">
    <div
      className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white font-bold text-lg shadow-md`}
    >
      {num}
      </div>
    <div>
      <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">
        Goal {num}
      </p>
      <p className="text-xs text-foreground font-medium group-hover:text-primary transition-colors">
        {label}
      </p>
    </div>
  </div>
);

// =======================
// 5. MAIN PORTFOLIO COMPONENT
// =======================

const Portfolio: React.FC = () => {
    const reportData = generateAnnualReportData();

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-20 font-sans selection:bg-emerald-500/20 overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-emerald-50 via-background to-background" />
        <div className="absolute top-10 right-10 w-[480px] h-[480px] bg-emerald-200/50 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[520px] h-[520px] bg-cyan-100/60 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* 1. HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 animate-in slide-in-from-bottom-4 duration-700">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                <Wallet className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-mono text-emerald-700 uppercase tracking-widest">
                Asset Vault
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-tight">
              Climate{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
                Portfolio.
              </span>
              </h1>
            </div>
            <div className="flex gap-3">
              <button 
                    onClick={handleDownloadReport} 
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border hover:bg-muted transition-all text-xs font-bold uppercase tracking-wider"
                >
                <Download className="w-4 h-4" /> Annual Report
              </button>
              <button 
                    onClick={handleAddAssets} 
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all text-xs font-bold uppercase tracking-wider"
                >
                Add Assets <ArrowRight className="w-4 h-4" />
              </button>
            </div>
        </div>

        {/* 2. IMPACT OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <ImpactCard
            icon={Leaf}
            label="Net Carbon Offset"
            value={reportData.netOffset.replace('tCO2e', 't')}
            sub="Equivalent to 120,000 trees"
            trend="+12%"
            color="text-emerald-500"
            delay="0ms"
          />
          <ImpactCard
            icon={TrendingUp}
            label="Portfolio Value"
            value={reportData.portfolioValue}
            sub="Current market valuation"
            trend="+8.4%"
            color="text-sky-500"
            delay="100ms"
          />
          <ImpactCard
            icon={Globe2}
            label="Global Reach"
            value="6 Regions"
            sub="Supporting 14 communities"
            color="text-indigo-500"
            delay="200ms"
          />
          <ImpactCard
            icon={CheckCircle2}
            label="Retirement Ratio"
            value={reportData.retirementRatio}
            sub="Assets permanently retired"
            color="text-orange-500"
            delay="300ms"
          />
        </div>

        {/* 3. INTELLIGENCE DECK */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Map */}
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-emerald-600" /> Impact Distribution
              </h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider">
                  Live View
                </span>
              </div>
            </div>

            <div className="relative h-[340px] w-full rounded-2xl overflow-hidden bg-slate-200 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
                alt="World map"
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[10s]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(15,23,42,0.3)_100%)]" />

              {/* Map Pins */}
              <div className="absolute top-[40%] left-[30%] group/pin cursor-pointer">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute opacity-70" />
                <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white relative z-10 hover:scale-150 transition-transform" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur px-2 py-1 rounded border border-slate-600 text-[9px] text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                  Brazil
                </div>
              </div>

              <div className="absolute top-[50%] right-[25%] group/pin cursor-pointer">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping absolute opacity-70 delay-700" />
                <div className="w-3 h-3 bg-cyan-500 rounded-full border-2 border-white relative z-10" />
              </div>

              <div className="absolute bottom-[30%] left-[55%] group/pin cursor-pointer">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-ping absolute opacity-70 delay-300" />
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white relative z-10" />
              </div>
            </div>
          </div>

          {/* Allocation + SDGs */}
          <div className="flex flex-col gap-6">
            {/* Portfolio Mix */}
            <div className="bg-card border border-border rounded-3xl p-8 flex-1">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <PieChart className="w-5 h-5 text-sky-500" /> Asset Allocation
              </h3>
              <div className="space-y-5">
                {reportData.breakdown.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground flex items-center gap-2">
                        {item.type === 'Forestry' && <Trees className={`w-3.5 h-3.5 text-emerald-500`} />}
                        {item.type === 'Renewable' && <Wind className={`w-3.5 h-3.5 text-cyan-500`} />}
                        {item.type === 'Community' && <Maximize2 className={`w-3.5 h-3.5 text-orange-500`} />}
                        {item.type}
                      </span>
                      <span className="text-foreground font-mono">{item.percentage}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.type === 'Forestry' ? 'bg-emerald-500' : item.type === 'Renewable' ? 'bg-cyan-500' : 'bg-orange-500'}`}
                        style={{ width: item.percentage }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SDGs */}
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                SDG Contribution
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {reportData.sdgs.map((sdg) => (
                    <SDGChip key={sdg.num} num={sdg.num} color={sdg.num === '13' ? 'bg-[#3F7E44]' : sdg.num === '15' ? 'bg-[#56C02B]' : 'bg-[#FCC30B]'} label={sdg.label} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. DIGITAL ASSET VAULT */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              Digital Assets
            </h2>
            <div className="flex gap-2">
              <button className="p-2.5 rounded-xl bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border">
                <Layers className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-xl bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCertificates.map((cert) => (
                    <CertificateCard
                        key={cert.id}
                        {...cert}
                        onShare={handleShare}
                        onDownload={handleDownloadCertificate}
                    />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;