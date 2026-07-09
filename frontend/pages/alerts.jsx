import { useState } from 'react';
import { useRouter } from 'next/router';
import BottomNavbar from '../components/BottomNavbar';

export default function Alerts() {
  const router = useRouter();
  const handleLogout = () => router.push('/');

  const [selectedAlert, setSelectedAlert] = useState(null);

  const stats = [
    { label: 'Critical', value: '2', color: 'bg-red-50 text-red-600 border-red-100' },
    { label: 'Warning', value: '2', color: 'bg-orange-50 text-orange-600 border-orange-100' },
    { label: 'Total', value: '6', color: 'bg-teal-50 text-[#10a396] border-teal-100' }
  ];

  const alerts = [
    {
      id: 1,
      title: 'High Risk Outbreak',
      location: 'Kampala',
      description: 'Significant increase in malaria cases reported in Kampala suburbs. Immediate intervention required.',
      time: '2 hours ago',
      cases: '65 cases',
      trend: 'increasing',
      borderColor: 'border-l-red-500',
      iconBg: 'bg-red-50 text-red-500',
      trendClass: 'bg-red-100 text-red-700',
      details: 'Over the last 72 hours, health centres in Bwaise, Katanga, and Kisenyi have reported a 40% surge in positive malaria rapid diagnostic test results. Vector control teams from Kampala Capital City Authority have been dispatched with bed nets and diagnostic test kits. Residents are advised to stay indoors after dusk and secure all open windows.'
    },
    {
      id: 2,
      title: 'Northern Uganda Alert',
      location: 'Gulu',
      description: 'Heavy malaria burden persists in Gulu District. Monitor situation closely.',
      time: '4 hours ago',
      cases: '58 cases',
      trend: 'increasing',
      borderColor: 'border-l-red-500',
      iconBg: 'bg-red-50 text-red-500',
      trendClass: 'bg-red-100 text-red-700',
      details: 'Gulu Regional Referral Hospital reports a sustained increase in malaria admissions. Flooding in the Acholi sub-region has created extensive mosquito breeding sites. Emergency IRS teams have been mobilized across affected sub-counties.'
    },
    {
      id: 3,
      title: 'Medium Risk Alert',
      location: 'Jinja',
      description: 'Moderate rise in malaria cases along the Lake Victoria shore. Monitoring ongoing.',
      time: '5 hours ago',
      cases: '30 cases',
      trend: 'stable',
      borderColor: 'border-l-orange-500',
      iconBg: 'bg-orange-50 text-orange-500',
      trendClass: 'bg-gray-100 text-gray-700',
      details: 'Case reports in Jinja show a steady baseline with minor local clusters near the Nile source. Surveillance has been heightened. Jinja Regional Referral Hospital is fully stocked with Artemether-Lumefantrine treatment courses. Continuous monitoring is ongoing.'
    },
    {
      id: 4,
      title: 'Seasonal Uptick',
      location: 'Mukono',
      description: 'New cluster of cases identified in Mukono wetland areas.',
      time: '1 day ago',
      cases: '25 cases',
      trend: 'increasing',
      borderColor: 'border-l-orange-500',
      iconBg: 'bg-orange-50 text-orange-500',
      trendClass: 'bg-red-100 text-red-700',
      details: 'Multiple households near Mabira Forest and wetland zones in Mukono have reported malaria symptoms. Outdoor larval control spraying is scheduled for this week. Families in the area are receiving free replacement insecticide-treated nets (ITNs).'
    },
    {
      id: 5,
      title: 'Weather Advisory',
      location: 'Wakiso',
      description: 'Heavy rainfall expected in Wakiso. Increased mosquito breeding risk.',
      time: '8 hours ago',
      cases: '10 cases',
      trend: null,
      borderColor: 'border-l-blue-500',
      iconBg: 'bg-blue-50 text-blue-500',
      trendClass: null,
      details: 'Meteorological projections forecast 120mm of rainfall over the next week in Wakiso District, likely causing standing water pools in Entebbe and Nansana. Community leaders are requested to initiate drainage clearing campaigns immediately.'
    },
    {
      id: 6,
      title: 'Prevention Success',
      location: 'Mbarara',
      description: 'Mosquito net distribution campaign showing excellent results in Mbarara.',
      time: '2 days ago',
      cases: '2 cases',
      trend: 'decreasing',
      borderColor: 'border-l-green-500',
      iconBg: 'bg-green-50 text-green-500',
      trendClass: 'bg-green-100 text-green-700',
      details: 'Following the distribution of 8,000 long-lasting insecticidal nets (LLINs) across Mbarara District, active malaria cases have dropped to near-zero levels. High altitude and effective community health education have contributed to this success. Outstanding work by Mbarara District health teams!'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Alerts Page Header */}
      <div className="bg-[#10a396] text-white pt-8 pb-12 px-6 rounded-b-[32px] shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3.5">
            <img src="/logo.jpeg" alt="Malaria Guide Logo" className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-sm" />
            <div>
              <h1 className="text-2xl font-bold">Alerts</h1>
              <p className="text-sm opacity-80">Epidemiological alerts and warnings</p>
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
        {/* Stats Row Counters */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`bg-white border rounded-2xl p-4 text-center shadow-sm ${stat.color.split(' ')[2]}`}
            >
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                {stat.label}
              </span>
              <span className={`text-2xl sm:text-3xl font-extrabold ${stat.color.split(' ')[1]}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${alert.borderColor} border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-all active:scale-[0.99]`}
            >
              <div className="flex items-start space-x-3.5 pr-4 flex-1">
                {/* Warning icon */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${alert.iconBg}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-gray-800 text-sm leading-snug">{alert.title}</h3>
                  <div className="flex items-center space-x-1 text-[11px] font-semibold text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span>{alert.location}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-normal">{alert.description}</p>
                  <span className="text-[10px] text-gray-400 font-semibold block pt-0.5">{alert.time}</span>
                </div>
              </div>

              {/* Status Badge & Arrow */}
              <div className="flex flex-col items-end justify-between self-stretch shrink-0 py-0.5">
                <div className="text-right">
                  {alert.cases && (
                    <div className="text-xs font-bold text-gray-800">{alert.cases}</div>
                  )}
                  {alert.trend && (
                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md mt-1 inline-block ${alert.trendClass}`}>
                      {alert.trend}
                    </span>
                  )}
                </div>
                
                <div className="text-gray-300 hover:text-gray-500 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Alert Details Dialog */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl relative animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in duration-200">
            <button 
              onClick={() => setSelectedAlert(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <div className="flex items-center space-x-3 mb-3">
              <span className={`w-3 h-3 rounded-full shrink-0 ${
                selectedAlert.borderColor.includes('red') ? 'bg-red-500' :
                selectedAlert.borderColor.includes('orange') ? 'bg-orange-400' :
                selectedAlert.borderColor.includes('blue') ? 'bg-blue-400' : 'bg-green-500'
              }`} />
              <h3 className="text-lg font-bold text-gray-900">{selectedAlert.title}</h3>
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-4 bg-gray-50 px-3 py-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span>{selectedAlert.location}</span>
              <span>•</span>
              <span>{selectedAlert.time}</span>
              {selectedAlert.cases && (
                <>
                  <span>•</span>
                  <span className="text-gray-700">{selectedAlert.cases}</span>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-500 block mb-1">Details & Context</span>
                <p className="text-xs text-gray-600 leading-relaxed bg-[#10a396]/5 border border-[#10a396]/10 p-3.5 rounded-xl">
                  {selectedAlert.details}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <span className="text-xs font-bold text-gray-500 block mb-2">Emergency Directives</span>
                <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-semibold">
                  <a href="tel:999" className="bg-red-50 text-red-600 p-2.5 rounded-xl hover:bg-red-100 transition-colors">
                    📞 Call Support
                  </a>
                  <button 
                    onClick={() => {
                      alert("Alert report shared successfully.");
                    }} 
                    className="bg-teal-50 text-[#10a396] p-2.5 rounded-xl hover:bg-teal-100 transition-colors"
                  >
                    🔗 Share Update
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedAlert(null)}
              className="w-full bg-[#10a396] hover:bg-[#0c786f] text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md mt-6"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navbar navigation */}
      <BottomNavbar currentPath="alerts" />
    </div>
  );
}
