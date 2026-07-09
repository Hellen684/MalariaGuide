import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import BottomNavbar from '../components/BottomNavbar';

const OSMMap = dynamic(() => import('../components/OSMMap'), { ssr: false });

export default function RiskMap() {
  const router = useRouter();
  const handleLogout = () => router.push('/');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all'); // all, high, medium, low, safe
  const [selectedArea, setSelectedArea] = useState(null);
  
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetchAreas();
  }, [selectedMonth, selectedYear]);

  const fetchAreas = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/cases/monthly-risk?month=${selectedMonth}&year=${selectedYear}`);
      if (res.ok) {
        const data = await res.json();
        // Transform the backend data for the frontend
        const transformedData = data.map(zone => ({
          id: zone.location.toLowerCase(),
          name: zone.location,
          status: zone.severity,
          population: 'Unknown', // Could be fetched from a config
          cases: zone.totalCases,
          details: `Aggregated data for ${selectedMonth}/${selectedYear}.`
        }));
        setAreas(transformedData);
      }
    } catch (error) {
      console.error('Failed to fetch risk zones:', error);
    }
  };

  const filteredAreas = areas.filter(area => {
    const matchesSearch = area.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = riskFilter === 'all' || area.status === riskFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
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
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
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
          
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none bg-teal-50 border border-teal-100 text-[#10a396] font-bold text-sm py-3 pl-4 pr-4 rounded-xl focus:outline-none cursor-pointer"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i+1} value={i+1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="appearance-none bg-teal-50 border border-teal-100 text-[#10a396] font-bold text-sm py-3 pl-4 pr-4 rounded-xl focus:outline-none cursor-pointer"
          >
            {[2024, 2025, 2026].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="appearance-none bg-teal-50 border border-teal-100 text-[#10a396] font-bold text-sm py-3 pl-4 pr-10 rounded-xl focus:outline-none cursor-pointer relative"
          >
            <option value="all">All Risks</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
            <option value="safe">Safe</option>
          </select>
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5 relative overflow-hidden">
          <OSMMap riskData={filteredAreas.map(a => ({ location: a.name, severity: a.status, totalCases: a.cases }))} />
        </div>

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
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      area.status === 'high' ? 'bg-red-50 text-red-500' :
                      area.status === 'medium' ? 'bg-orange-50 text-orange-400' : 
                      area.status === 'low' ? 'bg-yellow-50 text-yellow-500' :
                      'bg-green-50 text-green-500'
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
                          area.status === 'medium' ? 'bg-orange-100 text-orange-700' : 
                          area.status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {area.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1 font-semibold">
                        <span className="flex items-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-gray-400 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" />
                          </svg>
                          {area.cases} cases this month
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
                No matching locations found for this period
              </div>
            )}
          </div>
        </div>
      </main>

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
                selectedArea.status === 'medium' ? 'bg-orange-100 text-orange-700' : 
                selectedArea.status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {selectedArea.status} Risk
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl mb-4 text-center">
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

      <BottomNavbar currentPath="map" />
    </div>
  );
}
