import { useState } from 'react';
import { useRouter } from 'next/router';
import BottomNavbar from '../components/BottomNavbar';

export default function Reports() {
  const router = useRouter();
  const handleLogout = () => router.push('/');
  const [activeTooltip, setActiveTooltip] = useState(null); // { month, x, y, cases, recovery }
  const [selectedRange, setSelectedRange] = useState('6 Months');

  const monthlyTrendData = [
    { label: 'Jan', cases: 140, recovery: 130, x: 50, yCases: 110, yRecov: 115 },
    { label: 'Feb', cases: 160, recovery: 145, x: 130, yCases: 100, yRecov: 108 },
    { label: 'Mar', cases: 195, recovery: 175, x: 210, yCases: 82, yRecov: 92 },
    { label: 'Apr', cases: 230, recovery: 210, x: 290, yCases: 65, yRecov: 75 },
    { label: 'May', cases: 275, recovery: 255, x: 370, yCases: 42, yRecov: 52 },
    { label: 'Jun', cases: 245, recovery: 230, x: 450, yCases: 57, yRecov: 65 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Analytics Page Header */}
      <div className="bg-[#10a396] text-white pt-8 pb-12 px-6 rounded-b-[32px] shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3.5">
            <img src="/logo.jpeg" alt="Malaria Guide Logo" className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-sm" />
            <div>
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-sm opacity-80">Data-driven insights</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => alert("Report downloaded successfully as PDF.")}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
              title="Download Report"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
            <button onClick={handleLogout} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all" title="Logout">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 -mt-6 space-y-6 relative z-10">
        
        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">This Month</span>
            <div className="text-2xl font-bold text-gray-900">245 Cases</div>
            <div className="flex items-center text-xs font-bold text-green-600 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 mr-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              -12.5% vs last month
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Recovery Rate</span>
            <div className="text-2xl font-bold text-gray-900">93.1%</div>
            <div className="flex items-center text-xs font-bold text-green-600 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 mr-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              +2.3% improvement
            </div>
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5 relative">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-gray-900 font-bold text-base">Monthly Trend</h3>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">Reported Cases vs Recovered</p>
            </div>
            
            <div className="relative">
              <select 
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                className="appearance-none bg-teal-50 border border-teal-100 text-[#10a396] font-bold text-xs py-2 pl-3.5 pr-8 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#10a396] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="relative w-full h-48 mt-4 select-none">
            <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
              <defs>
                {/* Cases Line Gradient */}
                <linearGradient id="casesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10a396" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10a396" stopOpacity="0.0" />
                </linearGradient>
                {/* Recovery Line Gradient */}
                <linearGradient id="recovGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="120" x2="480" y2="120" stroke="#f3f4f6" strokeWidth="1.5" />
              <line x1="20" y1="85" x2="480" y2="85" stroke="#f3f4f6" strokeWidth="1.5" />
              <line x1="20" y1="50" x2="480" y2="50" stroke="#f3f4f6" strokeWidth="1.5" />
              <line x1="20" y1="15" x2="480" y2="15" stroke="#f3f4f6" strokeWidth="1.5" />

              {/* Grid Y Axis Labels */}
              <text x="5" y="123" className="text-[9px] fill-gray-400 font-bold" textAnchor="end">0</text>
              <text x="5" y="88" className="text-[9px] fill-gray-400 font-bold" textAnchor="end">140</text>
              <text x="5" y="53" className="text-[9px] fill-gray-400 font-bold" textAnchor="end">210</text>
              <text x="5" y="18" className="text-[9px] fill-gray-400 font-bold" textAnchor="end">280</text>

              {/* Cases Area Under Curve */}
              <path d="M 50 120 L 50 110 Q 90 104, 130 100 T 210 82 T 290 65 T 370 42 Q 410 49.5, 450 57 L 450 120 Z" fill="url(#casesGrad)" />
              {/* Cases Trend Line */}
              <path d="M 50 110 Q 90 104, 130 100 T 210 82 T 290 65 T 370 42 Q 410 49.5, 450 57" fill="none" stroke="#10a396" strokeWidth="3" strokeLinecap="round" />

              {/* Recovery Area Under Curve */}
              <path d="M 50 120 L 50 115 Q 90 111.5, 130 108 T 210 92 T 290 75 T 370 52 Q 410 58.5, 450 65 L 450 120 Z" fill="url(#recovGrad)" />
              {/* Recovery Trend Line */}
              <path d="M 50 115 Q 90 111.5, 130 108 T 210 92 T 290 75 T 370 52 Q 410 58.5, 450 65" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 0" />

              {/* Dynamic Interactive Dots and Trigger Zones */}
              {monthlyTrendData.map((d, index) => (
                <g key={index} className="cursor-pointer">
                  {/* Hover Zone Trigger */}
                  <rect 
                    x={d.x - 30} 
                    y="0" 
                    width="60" 
                    height="140" 
                    fill="transparent" 
                    onMouseEnter={(e) => setActiveTooltip({ 
                      month: d.label, 
                      x: d.x, 
                      y: d.yCases, 
                      cases: d.cases, 
                      recovery: d.recovery 
                    })}
                    onMouseLeave={() => setActiveTooltip(null)}
                  />
                  {/* Cases Dot indicator */}
                  <circle cx={d.x} cy={d.yCases} r="4.5" fill="#10a396" stroke="#ffffff" strokeWidth="2" className="shadow" />
                  {/* Recovery Dot indicator */}
                  <circle cx={d.x} cy={d.yRecov} r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" className="shadow" />
                </g>
              ))}

              {/* Tooltip Overlay */}
              {activeTooltip && (
                <g transform={`translate(${activeTooltip.x - 55}, ${activeTooltip.y - 62})`} className="pointer-events-none">
                  {/* Tooltip box */}
                  <rect width="110" height="52" rx="12" fill="#1f2937" opacity="0.95" shadow="0 4px 6px -1px rgb(0 0 0 / 0.1)" />
                  <text x="10" y="16" className="text-[10px] font-bold fill-white">{activeTooltip.month} Statistics</text>
                  <text x="10" y="30" className="text-[9px] fill-teal-300 font-semibold">Cases: {activeTooltip.cases}</text>
                  <text x="10" y="42" className="text-[9px] fill-green-300 font-semibold">Recovered: {activeTooltip.recovery}</text>
                </g>
              )}
            </svg>
          </div>

          <div className="flex justify-between text-xs font-semibold text-gray-400 mt-5 border-t border-gray-50 pt-3 px-4">
            {monthlyTrendData.map((d, index) => (
              <span key={index}>{d.label}</span>
            ))}
          </div>
        </div>

        {/* Bottom charts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Cases by Age Group Pie (Donut) Chart */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5">
            <h3 className="text-gray-900 font-bold text-base mb-4">Cases by Age Group</h3>
            
            <div className="flex flex-col items-center sm:flex-row sm:justify-around py-4">
              {/* Donut SVG */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
                  {/* Background Track */}
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                  
                  {/* Segment 1: 0-5 years (35%) - color: #10a396 */}
                  {/* stroke-dasharray="35% of 376.99 = 132, remaining = 245" */}
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#10a396" strokeWidth="20" strokeDasharray="132 377" strokeDashoffset="0" className="transition-all duration-500 hover:stroke-width-24 cursor-pointer" />

                  {/* Segment 2: 18-45 years (28%) - color: #f97316 */}
                  {/* stroke-dasharray="28% of 376.99 = 106, remaining = 271" */}
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#f97316" strokeWidth="20" strokeDasharray="106 377" strokeDashoffset="-132" />

                  {/* Segment 3: 6-17 years (25%) - color: #10b981 */}
                  {/* stroke-dasharray="25% of 376.99 = 94, remaining = 283" */}
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="94 377" strokeDashoffset="-238" />

                  {/* Segment 4: 45+ years (12%) - color: #8b5cf6 */}
                  {/* stroke-dasharray="12% of 376.99 = 45, remaining = 332" */}
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="45 377" strokeDashoffset="-332" />
                </svg>

                {/* Donut Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-extrabold text-gray-800">Age</span>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Demographics</span>
                </div>
              </div>

              {/* Custom Legend */}
              <div className="space-y-2 mt-4 sm:mt-0 text-xs font-semibold text-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#10a396]"></span>
                  <span>0-5 years: <strong className="text-gray-900">35%</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#10b981]"></span>
                  <span>6-17 years: <strong className="text-gray-900">25%</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#f97316]"></span>
                  <span>18-45 years: <strong className="text-gray-900">28%</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#8b5cf6]"></span>
                  <span>45+ years: <strong className="text-gray-900">12%</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Cases vs Recovery Bar Chart */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5">
            <h3 className="text-gray-900 font-bold text-base mb-2">Cases vs Recovery</h3>
            <p className="text-xs text-gray-400 font-semibold mb-4">Comparison of positive diagnoses against recoveries</p>

            <div className="relative w-full h-44 mt-4">
              <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                {/* Horizontal reference gridlines */}
                <line x1="20" y1="120" x2="480" y2="120" stroke="#f3f4f6" strokeWidth="1.5" />
                <line x1="20" y1="85" x2="480" y2="85" stroke="#f3f4f6" strokeWidth="1.5" />
                <line x1="20" y1="50" x2="480" y2="50" stroke="#f3f4f6" strokeWidth="1.5" />
                <line x1="20" y1="15" x2="480" y2="15" stroke="#f3f4f6" strokeWidth="1.5" />

                {/* Y labels */}
                <text x="5" y="123" className="text-[9px] fill-gray-400 font-bold" textAnchor="end">0</text>
                <text x="5" y="88" className="text-[9px] fill-gray-400 font-bold" textAnchor="end">140</text>
                <text x="5" y="53" className="text-[9px] fill-gray-400 font-bold" textAnchor="end">210</text>
                <text x="5" y="18" className="text-[9px] fill-gray-400 font-bold" textAnchor="end">280</text>

                {/* Months Bar clusters */}
                {/* Monthly mock values:
                    Jan: Cases 140, Recov 130
                    Feb: Cases 160, Recov 145
                    Mar: Cases 195, Recov 175
                    Apr: Cases 230, Recov 210
                    May: Cases 275, Recov 255
                    Jun: Cases 245, Recov 230
                */}
                {monthlyTrendData.map((d, index) => {
                  const xGroupOffset = 45 + index * 75;
                  
                  // Math scales height relative to 120 baseline. Y value is (120 - height)
                  // Cases bar height (scaling cases/280 * 105)
                  const casesHeight = (d.cases / 280) * 105;
                  const casesY = 120 - casesHeight;

                  // Recovery bar height (scaling recov/280 * 105)
                  const recovHeight = (d.recovery / 280) * 105;
                  const recovY = 120 - recovHeight;

                  return (
                    <g key={index}>
                      {/* Cases Bar (Teal) */}
                      <rect 
                        x={xGroupOffset} 
                        y={casesY} 
                        width="18" 
                        height={casesHeight} 
                        fill="#10a396" 
                        rx="4" 
                        className="transition-all hover:brightness-105 cursor-pointer"
                      />
                      {/* Recovery Bar (Light green) */}
                      <rect 
                        x={xGroupOffset + 22} 
                        y={recovY} 
                        width="18" 
                        height={recovHeight} 
                        fill="#10b981" 
                        rx="4" 
                        className="transition-all hover:brightness-105 cursor-pointer"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* X Labels */}
            <div className="flex justify-between text-xs font-semibold text-gray-400 mt-4 border-t border-gray-50 pt-3 px-10">
              {monthlyTrendData.map((d, index) => (
                <span key={index}>{d.label}</span>
              ))}
            </div>

            {/* Custom chart legend */}
            <div className="flex justify-center space-x-6 text-[10px] uppercase font-bold tracking-wider text-gray-500 mt-4">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded bg-[#10a396]"></span>
                <span>Active Cases</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded bg-[#10b981]"></span>
                <span>Recovered Cases</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Bottom Navbar navigation */}
      <BottomNavbar currentPath="reports" />
    </div>
  );
}
