export default function ForecastChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-gray-900 font-bold text-base mb-4">Malaria Forecast</h3>
      <div className="relative w-full h-40">
        <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10a396" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10a396" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M 10 115 Q 100 105, 190 90 T 370 25 Q 435 30, 490 45 L 490 140 L 10 140 Z" fill="url(#chartGrad)" />
          <path d="M 10 115 Q 100 105, 190 90 T 370 25 Q 435 30, 490 45" fill="none" stroke="#10a396" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex justify-between text-xs font-semibold text-gray-400 mt-2">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
      </div>
    </div>
  );
}