export default function OutbreakList({ outbreaks }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-900 font-bold text-base">Recent Outbreaks</h3>
        <button className="text-[#10a396] font-bold text-xs hover:underline">View All</button>
      </div>

      <div className="space-y-3">
        {outbreaks.map((outbreak) => (
          <div 
            key={outbreak.id}
            className="flex items-center justify-between p-4 bg-gray-50/70 rounded-2xl border border-gray-50/50"
          >
            <div className="flex items-center space-x-3.5">
              {/* Alert Level Status Dot */}
              <span className={`w-3 h-3 rounded-full shrink-0 ${
                outbreak.status === 'high' ? 'bg-red-500' :
                outbreak.status === 'medium' ? 'bg-orange-400' : 'bg-yellow-400'
              }`} />
              
              <div>
                <div className="flex items-center space-x-1 text-gray-800 font-semibold text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span>{outbreak.location}</span>
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">
                  {outbreak.cases} cases · {outbreak.timeAgo}
                </div>
              </div>
            </div>

            {/* High Severity Hazard Notification Icon */}
            {outbreak.status === 'high' && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}