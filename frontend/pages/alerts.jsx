import { useState } from 'react';
import BottomNavbar from '../components/BottomNavbar';

export default function Alerts() {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const stats = [
    { label: 'Critical', value: '1', color: 'bg-red-50 text-red-600 border-red-100' },
    { label: 'Warning', value: '3', color: 'bg-orange-50 text-orange-600 border-orange-100' },
    { label: 'Total', value: '6', color: 'bg-teal-50 text-[#10a396] border-teal-100' }
  ];

  const alerts = [
    {
      id: 1,
      title: 'High Risk Outbreak',
      location: 'Kambia District',
      description: 'Significant increase in malaria cases reported. Immediate intervention required.',
      time: '2 hours ago',
      cases: '45 cases',
      trend: 'increasing',
      borderColor: 'border-l-red-500',
      iconBg: 'bg-red-50 text-red-500',
      trendClass: 'bg-red-100 text-red-700',
      details: 'Over the last 72 hours, local clinics in Kambia have reported a 40% surge in positive malaria rapid diagnostic test results. Vector control teams have been dispatched with bed nets and diagnostic test kits. Local population is advised to stay indoors after dusk and secure all open windows.'
    },
    {
      id: 2,
      title: 'Medium Risk Alert',
      location: 'Kenema Region',
      description: 'Moderate rise in malaria cases. Monitor situation closely.',
      time: '5 hours ago',
      cases: '28 cases',
      trend: 'stable',
      borderColor: 'border-l-orange-500',
      iconBg: 'bg-orange-50 text-orange-500',
      trendClass: 'bg-gray-100 text-gray-700',
      details: 'Case reports in Kenema show a steady baseline with minor local clusters. Surveillance has been heightened. Local health centers are fully stocked with Artemether-Lumefantrine treatment courses. No immediate lockdown or emergency actions are required, but continuous monitoring is ongoing.'
    },
    {
      id: 3,
      title: 'Weather Advisory',
      location: 'Port Loko',
      description: 'Heavy rainfall expected. Increased mosquito breeding risk.',
      time: '8 hours ago',
      cases: null,
      trend: null,
      borderColor: 'border-l-blue-500',
      iconBg: 'bg-blue-50 text-blue-500',
      trendClass: null,
      details: 'Meteorological projections forecast 150mm of rainfall over the next week in Port Loko, likely causing standing water pools in low-elevation valleys. Community leaders are requested to initiate drainage clearing campaigns immediately. Insecticide distribution points have been set up at central community markets.'
    },
    {
      id: 4,
      title: 'Treatment Shortage',
      location: 'Makeni City',
      description: 'Low stock of antimalarial medication. Resupply needed.',
      time: '1 day ago',
      cases: '52 cases',
      trend: 'increasing',
      borderColor: 'border-l-orange-500',
      iconBg: 'bg-orange-50 text-orange-500',
      trendClass: 'bg-red-100 text-red-700',
      details: 'Makeni Central Pharmacy reports inventory of primary antimalarial treatments has dropped below a 5-day buffer. Medical logistics is coordinating an emergency delivery from central stores. Patients seeking treatment are currently redirected to neighboring sub-clinics.'
    },
    {
      id: 5,
      title: 'Community Alert',
      location: 'Bo Town',
      description: 'New cluster of cases identified in northern sector.',
      time: '1 day ago',
      cases: '31 cases',
      trend: 'increasing',
      borderColor: 'border-l-orange-500',
      iconBg: 'bg-orange-50 text-orange-500',
      trendClass: 'bg-red-100 text-red-700',
      details: 'Twelve households in the northern outskirts of Bo Town have reported malaria symptoms concurrently. Outdoor larval control spraying is scheduled for tomorrow morning. Families in the area are receiving free replacement insecticide-treated nets (ITNs).'
    },
    {
      id: 6,
      title: 'Prevention Success',
      location: 'Freetown Rural',
      description: 'Mosquito net distribution campaign showing positive results.',
      time: '2 days ago',
      cases: '8 cases',
      trend: 'decreasing',
      borderColor: 'border-l-green-500',
      iconBg: 'bg-green-50 text-green-500',
      trendClass: 'bg-green-100 text-green-700',
      details: 'Following the distribution of 5,000 long-lasting insecticidal nets (LLINs) in Freetown Rural, active malaria cases have dropped by 65% over the past two weeks. Clinic consultation rates for fever symptoms have reached an all-time low for this season. Outstanding job by community health educators!'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Alerts Page Header */}
      <div className="bg-[#10a396] text-white pt-8 pb-12 px-6 rounded-b-[32px] shadow-md">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Alerts</h1>
          <p className="text-sm opacity-80">Epidemiological alerts and warnings</p>
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
