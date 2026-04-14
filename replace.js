const fs = require('fs');
const files = [
  'c:/Users/yashi/OneDrive/Desktop/Projects/carboncreditmain/CarbonCredit/src/components/portfolio/Portfolio.tsx',
  'c:/Users/yashi/OneDrive/Desktop/Projects/carboncreditmain/CarbonCredit/src/components/portfolio/ActiveProjectsSection.tsx'
];

for(const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Weights
  content = content.replace(/font-bold/g, 'font-medium');
  content = content.replace(/font-semibold/g, 'font-medium');
  
  // Tints & Shades
  content = content.replace(/text-neutral-900/g, 'text-slate-800');
  content = content.replace(/text-neutral-800/g, 'text-slate-700');
  content = content.replace(/bg-neutral-900/g, 'bg-slate-800');
  content = content.replace(/text-neutral-500/g, 'text-slate-500');
  content = content.replace(/text-neutral-400/g, 'text-slate-500');
  content = content.replace(/bg-neutral-100/g, 'bg-slate-50');
  
  // Tracking
  content = content.replace(/tracking-widest/g, 'tracking-wider');

  // Exact Match Adjustments for Headers
  content = content.replace(/text-5xl md:text-7xl lg:text-\[5rem\] font-medium/g, 'text-5xl md:text-7xl lg:text-[5rem] font-light');
  content = content.replace(/text-4xl md:text-5xl font-medium/g, 'text-4xl md:text-5xl font-light');
  content = content.replace(/text-3xl font-medium/g, 'text-3xl font-light tracking-tight');

  fs.writeFileSync(file, content);
}
