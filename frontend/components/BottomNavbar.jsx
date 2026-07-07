export default function BottomNavbar() {
  const tabs = ['Home', 'Map', 'Alerts', 'Reports', 'Learn'];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-4 rounded-t-3xl shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-between items-center text-xs font-medium text-gray-400">
        {tabs.map((tab, i) => (
          <button key={i} className={`flex-1 flex flex-col items-center ${i === 0 ? 'text-[#10a396] font-bold' : ''}`}>
            <span>{tab}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}