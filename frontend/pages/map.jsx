import { useState } from 'react';
import { useRouter } from 'next/router';
import BottomNavbar from '../components/BottomNavbar';

export default function RiskMap() {
  const router = useRouter();
  const handleLogout = () => router.push('/');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all'); // all, high, medium, low
  const [selectedArea, setSelectedArea] = useState(null);

  const areas = [
    { id: 'kambia', name: 'Kambia District', status: 'high', population: '2,400', cases: 45, coordinate: { x: 120, y: 80, r: 16 }, details: 'Significant rise in water-borne vectors due to recent flooding near the northern border. Recommended actions include mass distribution of LLINs and indoor residual spraying.' },
    { id: 'kenema', name: 'Kenema Region', status: 'medium', population: '3,200', cases: 28, coordinate: { x: 380, y: 150, r: 12 }, details: 'Moderate vector density reported. Community health workers are actively monitoring fever cases and administering rapid diagnostic tests.' },
    { id: 'portloko', name: 'Port Loko', status: 'low', population: '1,800', cases: 12, coordinate: { x: 150, y: 190, r: 8 }, details: 'Low transmission rate maintained. Preventive larviciding has been successfully completed across key breeding reservoirs.' },
    { id: 'makeni', name: 'Makeni City', status: 'high', population: '4,100', cases: 52, coordinate: { x: 250, y: 100, r: 18 }, details: 'Heavy infestation reported in peri-urban sectors. Emergency therapeutic response has been deployed alongside community sensitization campaigns.' },
    { id: 'botown', name: 'Bo Town', status: 'medium', population: '2,900', cases: 31, coordinate: { x: 300, y: 220, r: 14 }, details: 'Slight seasonal case uptick. Medical facilities report stable supplies of ACT antimalarials, but caution is advised in low-lying sections.' },
    { id: 'freetown', name: 'Freetown Rural', status: 'low', population: '1,200', cases: 8, coordinate: { x: 80, y: 240, r: 8 }, details: 'Excellent compliance with weekly net usage. Mosquito populations remain under control due to active drainage maintenance.' }
  ];

  const filteredAreas = areas.filter(area => {
    const matchesSearch = area.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = riskFilter === 'all' || area.status === riskFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Risk Map Header */}
      <div className="bg-[#10a396] text-white pt-8 pb-12 px-6 rounded-b-[32px] shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3.5">
            <img src="/logo.jpeg" alt="Malaria Guide Logo" className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-sm" />
            <div>
              <h1 className="text-2xl font-bold">Risk Map</h1>
              <p className="text-sm opacity-80">Geographic malaria risk profiling</p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all" title="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 -mt-6 space-y-6 relative z-10">
        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3">
          <div className="relative flex-1">
            <input 
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#10a396] transition-colors"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
            </svg>
          </div>
          
          <div className="relative">
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="appearance-none bg-teal-50 border border-teal-100 text-[#10a396] font-bold text-sm py-3 pl-4 pr-10 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="all">All Risks</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#10a396] pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dynamic Stylized Map View */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5 relative overflow-hidden">
          <div className="relative w-full aspect-[4/3] bg-teal-50/30 rounded-2xl border border-teal-50 flex items-center justify-center">
            
            {/* SVG Background Geography */}
            <svg viewBox="0 0 500 320" className="w-full h-full opacity-90 select-none">
              <defs>
                <radialGradient id="mapGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e0f2f1" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#b2dfdb" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              
              {/* Landmass shapes mockups */}
              <path d="M 50,50 Q 120,30 200,60 T 350,40 Q 420,80 460,140 T 450,260 Q 320,300 200,280 T 50,200 Z" fill="url(#mapGrad)" stroke="#10a396" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 180,60 Q 230,120 250,180 T 320,290" fill="none" stroke="#10a396" strokeWidth="0.5" opacity="0.3" />
              <path d="M 80,130 Q 220,160 380,120" fill="none" stroke="#10a396" strokeWidth="0.5" opacity="0.3" />

              {/* Pulsing Hotspots */}
              {areas.map((area) => {
                const isFilteredOut = riskFilter !== 'all' && area.status !== riskFilter;
                const dotColor = area.status === 'high' ? 'fill-red-500 stroke-red-100' :
                                 area.status === 'medium' ? 'fill-orange-400 stroke-orange-100' : 'fill-green-500 stroke-green-100';
                
                return (
                  <g 
                    key={area.id} 
                    className={`cursor-pointer transition-all duration-300 ${isFilteredOut ? 'opacity-10' : 'opacity-100 hover:scale-110'}`}
                    onClick={() => setSelectedArea(area)}
                  >
                    {/* Ring Pulse */}
                    <circle 
                      cx={area.coordinate.x} 
                      cy={area.coordinate.y} 
                      r={area.coordinate.r + 6} 
                      className={`animate-ping origin-center ${
                        area.status === 'high' ? 'fill-red-400/20' : 
                        area.status === 'medium' ? 'fill-orange-400/20' : 'fill-green-400/20'
                      }`}
                      style={{ animationDuration: '3s' }}
                    />
                    {/* Main Dot */}
                    <circle 
                      cx={area.coordinate.x} 
                      cy={area.coordinate.y} 
                      r={area.coordinate.r} 
                      className={`${dotColor} stroke-4 shadow-md`}
                    />
                    {/* Tag label */}
                    <text 
                      x={area.coordinate.x} 
                      y={area.coordinate.y - area.coordinate.r - 4} 
                      textAnchor="middle" 
                      className="text-[10px] font-bold fill-gray-700 bg-white"
                    >
                      {area.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map Legend */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border border-gray-100 text-xs font-semibold text-gray-700 space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Risk Levels</div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 block"></span>
                <span>High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400 block"></span>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 block"></span>
                <span>Low Risk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Affected Areas List */}
        <div>
          <h2 className="text-gray-900 font-bold text-lg mb-4">Affected Areas</h2>
          <div className="space-y-3">
            {filteredAreas.length > 0 ? (
              filteredAreas.map((area) => (
                <div 
                  key={area.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    {/* Icon matching badge status */}
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      area.status === 'high' ? 'bg-red-50 text-red-500' :
                      area.status === 'medium' ? 'bg-orange-50 text-orange-400' : 'bg-green-50 text-green-500'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-800 text-sm">{area.name}</span>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          area.status === 'high' ? 'bg-red-100 text-red-700' :
                          area.status === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {area.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1 font-semibold">
                        <span>Population: {area.population}</span>
                        <span>•</span>
                        <span className="flex items-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-gray-400 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" />
                          </svg>
                          {area.cases} active cases
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedArea(area)}
                    className="text-[#10a396] hover:text-[#0b746a] text-xs font-bold px-3.5 py-1.5 bg-teal-50 hover:bg-teal-100 rounded-xl transition-all"
                  >
                    Details
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-2xl border border-gray-100 text-gray-400 text-sm">
                No matching locations found
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Details Side Drawer / Modal popup */}
      {selectedArea && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl relative animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in duration-200">
            <button 
              onClick={() => setSelectedArea(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <h3 className="text-lg font-bold text-gray-900">{selectedArea.name}</h3>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                selectedArea.status === 'high' ? 'bg-red-100 text-red-700' :
                selectedArea.status === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
              }`}>
                {selectedArea.status} Risk
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl mb-4 text-center">
              <div>
                <span className="text-[10px] uppercase text-gray-400 block font-bold">Estimated Population</span>
                <span className="text-base font-bold text-gray-800">{selectedArea.population}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-gray-400 block font-bold">Reported Cases</span>
                <span className="text-base font-bold text-gray-800">{selectedArea.cases}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-500 block mb-1">Risk Profile Summary</span>
                <p className="text-xs text-gray-600 leading-relaxed bg-teal-50/20 border border-teal-100/30 p-3 rounded-xl">
                  {selectedArea.details}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-500 block mb-1.5">Recommended Actions</span>
                <ul className="text-xs text-gray-600 space-y-1.5 font-medium">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✔</span> Sleeping under treated bednets nightly
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✔</span> Drain stagnant surface pools around households
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">✔</span> Seek prompt medical testing within 24h of fever onset
                  </li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setSelectedArea(null)}
              className="w-full bg-[#10a396] hover:bg-[#0c786f] text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md mt-6"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navbar navigation */}
      <BottomNavbar currentPath="map" />
    </div>
  );
}
