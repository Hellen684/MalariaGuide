export default function QuickActions() {
  const actions = [
    { title: 'Report Case', bg: 'bg-[#12a494]' },
    { title: 'View Map', bg: 'bg-[#10b981]' },
    { title: 'Alerts', bg: 'bg-[#f97316]' },
    { title: 'Analytics', bg: 'bg-[#8b5cf6]' }
  ];

  return (
    <div>
      <h3 className="text-gray-900 font-bold text-base mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((act, idx) => (
          <button key={idx} className={`${act.bg} text-white font-bold text-sm py-5 px-4 rounded-2xl shadow-sm transition-transform active:scale-95`}>
            {act.title}
          </button>
        ))}
      </div>
    </div>
  );
}