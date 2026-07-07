export default function StatsCard({ title, value, detail, color }) {
  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-white">
      <span className="text-xs font-medium tracking-wide block opacity-80 mb-1">{title}</span>
      <div className="text-xl font-bold">{value}</div>
      <div className={`text-xs ${color}`}>{detail}</div>
    </div>
  );
}