import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BottomNavbar from '../components/BottomNavbar';
import StatsCard from '../components/StatsCard';
import ForecastChart from '../components/ForecastChart';
import OutbreakList from '../components/OutbreakList';
import QuickActions from '../components/QuickActions';

export default function Dashboard() {
  const router = useRouter();
  const handleLogout = () => router.push('/');

  const [metrics, setMetrics] = useState({
    stats: {
      totalCases: { value: '1,247', change: '-12% this month' },
      riskLevel: { value: 'Medium', label: 'Moderate risk' },
      activeAlerts: { value: '8', detail: '3 high priority' },
      atRisk: { value: '3,842', detail: '15 villages' }
    },
    forecast: [45, 52, 68, 85, 124, 95],
    outbreaks: [
      { id: 1, location: 'Kambia District', cases: 45, timeAgo: '2 hours ago', status: 'high' },
      { id: 2, location: 'Kenema Region', cases: 28, timeAgo: '5 hours ago', status: 'medium' },
      { id: 3, location: 'Port Loko', cases: 12, timeAgo: '1 day ago', status: 'low' }
    ]
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/data')
      .then(res => res.json())
      .then(data => data.stats && setMetrics(data))
      .catch(() => console.log("Running in prototype mode (using fallback data)."));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-[#10a396] text-white pt-8 pb-12 px-6 rounded-b-[32px] shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3.5">
            <img src="/logo.jpeg" alt="Malaria Guide Logo" className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-sm" />
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm opacity-80">Real-time malaria monitoring</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={handleLogout} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all" title="Logout">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-4 mt-8">
          <StatsCard title="Total Cases" value={metrics.stats.totalCases.value} detail={metrics.stats.totalCases.change} color="text-teal-100" />
          <StatsCard title="Risk Level" value={metrics.stats.riskLevel.value} detail={metrics.stats.riskLevel.label} color="text-orange-200" />
          <StatsCard title="Active Alerts" value={metrics.stats.activeAlerts.value} detail={metrics.stats.activeAlerts.detail} color="text-red-200" />
          <StatsCard title="At Risk" value={metrics.stats.atRisk.value} detail={metrics.stats.atRisk.detail} color="text-yellow-100" />
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 mt-6 space-y-6">
        <ForecastChart dataPoints={metrics.forecast} />
        <OutbreakList outbreaks={metrics.outbreaks} />
        <QuickActions />
      </main>

      <BottomNavbar currentPath="home" />
    </div>
  );
}