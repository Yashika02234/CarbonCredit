import type { ComponentType, SVGProps } from 'react';
import {
  Leaf,
  TrendingUp,
  Award,
  Download,
  Wind,
  Trees,
  ArrowRight,
} from 'lucide-react';

interface ImpactCardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  sub: string;
}

const ImpactCard = ({ icon: Icon, label, value, sub }: ImpactCardProps) => (
  <div className="relative overflow-hidden rounded-2xl bg-slate-900/50 border border-white/5 p-6 group hover:border-emerald-500/20 transition-colors">
    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
      <Icon className="w-12 h-12 text-emerald-500" />
    </div>
    <div className="relative z-10">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
        {label}
      </p>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-xs text-emerald-400">{sub}</p>
    </div>
  </div>
);

interface CertificateItemProps {
  id: string;
  project: string;
  amount: string;
  date: string;
}

const CertificateItem = ({
  id,
  project,
  amount,
  date,
}: CertificateItemProps) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
        <Award className="h-5 w-5" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
          {project}
        </h4>
        <p className="text-xs text-slate-500 font-mono">ID: {id}</p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-right hidden sm:block">
        <p className="text-xs text-slate-500 uppercase tracking-wider">
          Retired
        </p>
        <p className="text-sm font-medium text-white">{amount} tonnes</p>
      </div>
      <div className="text-right hidden sm:block">
        <p className="text-xs text-slate-500 uppercase tracking-wider">
          Date
        </p>
        <p className="text-sm font-medium text-white">{date}</p>
      </div>
      <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
        <Download className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 pt-24 pb-20 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Climate Portfolio
          </h1>
          <p className="text-slate-400">
            Track your contributions to a net-zero future.
          </p>
        </div>

        {/* Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <ImpactCard
            icon={Leaf}
            label="Total Offset"
            value="2,450 t"
            sub="Equivalent to 120,000 trees"
          />
          <ImpactCard
            icon={TrendingUp}
            label="Portfolio Value"
            value="$42,890"
            sub="+12% Appreciation (YoY)"
          />
          <ImpactCard
            icon={Wind}
            label="Projects Supported"
            value="14"
            sub="Across 6 different countries"
          />
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Recent Retirements */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                Retirement Certificates
              </h3>
              <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-3">
              <CertificateItem
                id="CRT-2024-8892"
                project="Amazon Rainforest Conservation"
                amount="500"
                date="Oct 12, 2024"
              />
              <CertificateItem
                id="CRT-2024-7721"
                project="Wind Energy Maharashtra"
                amount="1,200"
                date="Sep 28, 2024"
              />
              <CertificateItem
                id="CRT-2024-6654"
                project="Blue Carbon Mangrove"
                amount="350"
                date="Aug 15, 2024"
              />
              <CertificateItem
                id="CRT-2024-5510"
                project="Clean Cookstoves Kenya"
                amount="400"
                date="Jul 02, 2024"
              />
            </div>
          </div>

          {/* Right: Allocation Chart (Visual Mock) */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-full">
              <h3 className="text-lg font-bold text-white mb-6">
                Portfolio Allocation
              </h3>

              <div className="space-y-6">
                {/* Bar 1 */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Trees className="h-3 w-3 text-emerald-500" /> Forestry
                    </span>
                    <span className="text-white font-mono">45%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[45%]" />
                  </div>
                </div>

                {/* Bar 2 */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Wind className="h-3 w-3 text-blue-500" /> Renewable
                    </span>
                    <span className="text-white font-mono">30%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[30%]" />
                  </div>
                </div>

                {/* Bar 3 */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Trees className="h-3 w-3 text-amber-500" /> Community
                    </span>
                    <span className="text-white font-mono">25%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[25%]" />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium transition-all">
                  Download Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
