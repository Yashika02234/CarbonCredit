/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server'; 
import html2canvas from 'html2canvas'; 
import jsPDF from 'jspdf'; 
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
    Gauge, // Trust Score Icon
    AlertTriangle, // Risk Flag Icon
} from 'lucide-react';
import AddAssetModal from './AddAssetModal'; 
// Assuming the types are defined in a separate file (e.g., ../../lib/types)
// If you don't have this structure, define these interfaces directly above the mock data.
interface CarbonCredit {
    id: string;
    projectName: string;
    pricePerCredit: number;
    availableCredits: number;
    location: string;
    country: string;
    vintage: number;
    registry: string;
    trustScore: number;
    status: string;
    projectType: string;
    unicId: string;
    image: string;
}
interface CertificateAsset {
    id: string;
    project: string;
    amount: string;
    date: string;
    image: string;
    type: string;
    color: string;
    status: string;
    trustScore: number; 
    riskFlags: string[]; 
}
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

// Mock Data for the Certificates (UPDATED)
const mockCertificates: CertificateAsset[] = [
    { id: "CRT-2024-8892", project: "Amazon Conservation", amount: "500", date: "Oct 12, 2024", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", type: "Forestry", color: "text-emerald-500", status: "Retired", trustScore: 92, riskFlags: ["Low Additionality"] },
    { id: "CRT-2024-7721", project: "Wind Energy Maharashtra", amount: "1,200", date: "Sep 28, 2024", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7", type: "Renewable", color: "text-cyan-500", status: "Retired", trustScore: 98, riskFlags: [] },
    { id: "CRT-2024-6654", project: "Blue Carbon Mangrove", amount: "350", date: "Aug 15, 2024", image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7", type: "Blue Carbon", color: "text-blue-500", status: "Retired", trustScore: 65, riskFlags: ["High Permanence Risk", "Leakage Concern"] },
    { id: "CRT-2024-5510", project: "Clean Cookstoves", amount: "400", date: "Jul 02, 2024", image: "https://images.unsplash.com/photo-1595278069441-2cf29f525a3c", type: "Community", color: "text-orange-500", status: "Retired", trustScore: 78, riskFlags: ["Community Displacement"] },
];


// ==========================================
// 1. PDF DESIGN TEMPLATES (MODIFIED)
// ==========================================

// Trust Score Progress Bar (PDF Layout)
const TrustScoreBadge: React.FC<{ score: number }> = ({ score }) => {
    const color = score >= 90 ? 'bg-emerald-500' : score >= 70 ? 'bg-amber-500' : 'bg-red-500';

    return (
        <div className="w-1/3 flex flex-col items-center">
            <span className="text-xs font-mono text-gray-500 uppercase mb-2 flex items-center gap-1">
                <Gauge className="w-3 h-3 text-emerald-600" /> Trust Score
            </span>
            <div className="text-3xl font-extrabold" style={{ color: color }}>
                {score}
                <span className="text-base font-normal align-top">%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
};

// Risk Flags Display (PDF Layout)
const RiskFlagsDisplay: React.FC<{ flags: string[] }> = ({ flags }) => {
    if (flags.length === 0) return (
        <div className="w-full text-center py-2 text-sm text-gray-500 border-b border-gray-200">
            No major risk flags detected.
        </div>
    );

    return (
        <div className="w-full mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 font-semibold text-sm mb-2">
                <AlertTriangle className="w-4 h-4" /> Risk Flags ({flags.length})
            </div>
            <ul className="text-xs text-red-600 list-disc list-inside space-y-0.5 ml-4">
                {flags.map((flag, index) => (
                    <li key={index}>{flag}</li>
                ))}
            </ul>
        </div>
    );
};

const PDFCertificateTemplate: React.FC<{ certificate: CertificateAsset }> = ({ certificate }) => (
    <div className="p-8 border-4 border-emerald-500 bg-white shadow-xl max-w-lg mx-auto" style={{ width: '210mm', height: '148mm' }}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-emerald-600" /> CarbonVault Certificate
            </h2>
            <span className="text-sm font-mono text-gray-500">{certificate.date}</span>
        </div>

        {/* Centerpiece: Amount */}
        <div className="text-center my-10 flex flex-col items-center">
            <p className="text-xl font-medium text-gray-600 mb-2">Certificate of Permanent Retirement</p>
            <h1 className="text-6xl font-extrabold text-emerald-700 tracking-tight mb-4">
                {certificate.amount} tCO₂e
            </h1>
            <p className="text-lg font-semibold text-gray-700">from the {certificate.project} project</p>
        </div>

        {/* TRUST SCORE DISPLAY */}
        <div className="flex justify-center my-6">
            <TrustScoreBadge score={certificate.trustScore} />
        </div>

        <div className="flex justify-between border-t border-gray-200 py-4 text-sm">
            <div className="flex flex-col">
                <span className="text-xs font-mono text-gray-500 uppercase">Certificate ID</span>
                <span className="font-semibold text-gray-900">{certificate.id}</span>
            </div>
            <div className="flex flex-col text-right">
                <span className="text-xs font-mono text-gray-500 uppercase">Asset Type</span>
                <span className="font-semibold text-gray-900">{certificate.type}</span>
            </div>
        </div>
        
        {/* RISK FLAGS DISPLAY */}
        <div className="border-b border-gray-200">
            <RiskFlagsDisplay flags={certificate.riskFlags} />
        </div>
        

        <div className="mt-6 text-center text-xs text-gray-500">
            <p>This document verifies the permanent and irreversible retirement of the listed carbon credits on the blockchain.</p>
            <p>Status: {certificate.status}</p>
        </div>
    </div>
);

// PDF Report Template (UNMODIFIED)
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
// 2. REPORT GENERATION FUNCTIONS (FUNCTIONAL PDF DOWNLOAD)
// ==========================================

const generateAnnualReportData = (): ReportData => {
    // ... implementation remains unchanged
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
 * Functional PDF generator using html2canvas and jspdf.
 */
const generateAndDownloadPDF = (contentElement: JSX.Element, filename: string) => {
    // 1. Create a hidden container element to render the component temporarily
    const container = document.createElement('div');
    // Apply styling to hide the temporary container off-screen
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    // 2. Render the React component into the hidden container using SSR utility
    try {
        container.innerHTML = ReactDOMServer.renderToString(contentElement);
    } catch (e) {
        console.error("Error rendering component to string:", e);
        document.body.removeChild(container);
        alert("Error during PDF rendering preparation.");
        return;
    }
    const elementToCapture = container.firstChild as HTMLElement;

    if (!elementToCapture) {
        alert("Error: Could not render component for capture.");
        document.body.removeChild(container);
        return;
    }

    // 3. Use html2canvas to capture the rendered HTML/CSS content
    html2canvas(elementToCapture, { 
        scale: 2, // Use higher scale for better quality
        logging: false 
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        // A5 landscape is used here to fit the certificate design
        const pdf = new jsPDF({
            orientation: 'landscape', 
            unit: 'mm',
            format: 'a5' 
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${filename}.pdf`);

        // 4. Clean up the temporary element
        document.body.removeChild(container);
        console.log(`Successfully generated and downloaded ${filename}.pdf!`);
        alert(`Successfully generated and downloaded ${filename}.pdf!`);
    });
};


// =======================
// 3. FUNCTIONAL HANDLERS (UPDATED TO USE NEW PDF FUNCTION)
// =======================

// This handler is now controlled by useState in the Portfolio component
// eslint-disable-next-line @typescript-eslint/no-unused-vars


const handleDownloadReport = () => {
    const reportData = generateAnnualReportData();
    const filename = `Annual_Impact_Report_${reportData.company}_${new Date().getFullYear()}`;
    
    const reportElement = <PDFReportTemplate data={reportData} />;
    
    generateAndDownloadPDF(reportElement, filename);
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
    
    const certificateElement = <PDFCertificateTemplate certificate={certificate} />;
    
    generateAndDownloadPDF(certificateElement, filename);
};


// =======================
// 4. SUB-COMPONENTS 
// =======================

interface ImpactCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  sub: string;
  trend?: string;
  color: string; 
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

interface CertificateCardProps {
    onShare: (certificate: CertificateAsset) => void;
    onDownload: (certificate: CertificateAsset) => void;
}

const CertificateCard: React.FC<CertificateAsset & CertificateCardProps> = ({
  id,
  project,
  amount,
  date,
  image,
  type,
  color,
  status = 'Retired',
    trustScore, 
    riskFlags, 
    onShare,
    onDownload,
}) => {
    const certificate = { id, project, amount, date, image, type, color, status, trustScore, riskFlags };
    const scoreColor = trustScore >= 90 ? 'text-emerald-500' : trustScore >= 70 ? 'text-amber-500' : 'text-red-500';

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

            {/* Trust Score and Risk Flag Summary UI */}
            <div className='flex items-center justify-between mt-2 mb-3'>
                <div className='flex items-center gap-2'>
                    <Gauge className={`w-3.5 h-3.5 ${scoreColor}`} />
                    <span className={`text-sm font-bold ${scoreColor}`}>Score: {trustScore}%</span>
                </div>
                {riskFlags.length > 0 && (
                    <div className='flex items-center gap-1 text-xs text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full'>
                        <AlertTriangle className='w-3 h-3' /> 
                        {riskFlags.length} Risk{riskFlags.length > 1 ? 's' : ''}
                    </div>
                )}
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
  color: string; 
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
    // 1. STATE FOR MODAL VISIBILITY
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. MODAL CONTROL HANDLERS
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // 3. MOCK HANDLER FOR ADDING ASSET
    const handleAddNewAsset = (newAsset: CarbonCredit) => {
        console.log("New Asset Added (Simulated):", newAsset.projectName, newAsset.availableCredits);
        handleCloseModal();
    };

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
                    onClick={handleOpenModal} 
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
            color="text-orange-500"
            sub="Assets permanently retired"
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
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-&lsqb;10s&rsqb;"
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
    
    {/* MODAL RENDERING */}
    <AddAssetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddNewAsset}
    />
    </div>
  );
};

export default Portfolio;