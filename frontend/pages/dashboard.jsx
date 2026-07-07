import { useState, useEffect } from 'react';
import BottomNavbar from '../components/BottomNavbar';
import StatsCard from '../components/StatsCard';
import ForecastChart from '../components/ForecastChart';
import OutbreakList from '../components/OutbreakList';
import QuickActions from '../components/QuickActions';

export default function Dashboard() {
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
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm opacity-80">Real-time malaria monitoring</p>
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