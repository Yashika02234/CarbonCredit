export default function NeuralInkBackground() {
  return (
    <div className="fixed inset-0 -z-[1] opacity-[0.6]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,255,180,0.35),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,200,255,0.35),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(0,180,140,0.25),transparent)] animate-spin-slow"></div>
    </div>
  );
}
