import { useState } from 'react';
import { useRouter } from 'next/router';

export default function QuickActions() {
  const router = useRouter();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [formData, setFormData] = useState({ location: '', cases: 1, severity: 'medium' });

  const actions = [
    { title: 'Report Case', bg: 'bg-[#12a494]', action: () => setShowReportModal(true) },
    { title: 'View Map', bg: 'bg-[#10b981]', action: () => router.push('/map') },
    { title: 'Alerts', bg: 'bg-[#f97316]', action: () => router.push('/alerts') },
    { title: 'Analytics', bg: 'bg-[#8b5cf6]', action: () => router.push('/reports') }
  ];

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setReportSuccess(true);
        setTimeout(() => {
          setReportSuccess(false);
          setShowReportModal(false);
          setFormData({ location: '', cases: 1, severity: 'medium' });
        }, 2000);
      }
    } catch (error) {
      console.error("Error reporting case:", error);
    }
  };

  return (
    <div>
      <h3 className="text-gray-900 font-bold text-base mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((act, idx) => (
          <button 
            key={idx} 
            onClick={act.action}
            className={`${act.bg} text-white font-bold text-sm py-5 px-4 rounded-2xl shadow-sm transition-transform active:scale-95 hover:brightness-105`}
          >
            {act.title}
          </button>
        ))}
      </div>

      {/* Report Case Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
            >
              &times;
            </button>

            {reportSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-teal-50 text-[#12a494] rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Report Submitted</h4>
                <p className="text-gray-500 text-sm">Thank you. The case has been logged successfully and alerts updated.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <h4 className="text-lg font-bold text-gray-950">Report Malaria Case</h4>
                <p className="text-xs text-gray-500">Provide official health statistics to update the monitoring forecast maps.</p>
                
                <div>
                  <label className="block text-gray-700 font-semibold text-xs mb-1.5">Location / District</label>
                  <select 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#12a494] appearance-none"
                    required
                  >
                    <option value="" disabled>Select District</option>
                    <option value="Kampala">Kampala</option>
                    <option value="Wakiso">Wakiso</option>
                    <option value="Mukono">Mukono</option>
                    <option value="Gulu">Gulu</option>
                    <option value="Jinja">Jinja</option>
                    <option value="Mbarara">Mbarara</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold text-xs mb-1.5">Number of Cases</label>
                    <input 
                      type="number" 
                      min="1"
                      value={formData.cases}
                      onChange={(e) => setFormData({...formData, cases: parseInt(e.target.value) || 1})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#12a494]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold text-xs mb-1.5">Risk Severity</label>
                    <select 
                      value={formData.severity}
                      onChange={(e) => setFormData({...formData, severity: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#12a494] appearance-none"
                    >
                      <option value="safe">Safe (No Risk)</option>
                      <option value="low">Low Risk</option>
                      <option value="medium">Medium Risk</option>
                      <option value="high">High Risk</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#12a494] hover:bg-[#0f877a] text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md mt-4"
                >
                  Submit Report
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}