import { useState } from 'react';
import { useRouter } from 'next/router';
import BottomNavbar from '../components/BottomNavbar';

export default function Learn() {
  const router = useRouter();
  const handleLogout = () => router.push('/');
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0); // 0: intro, 1-3: questions, 4: results
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const courses = [
    {
      id: 'prevention',
      title: 'Malaria Prevention Basics',
      description: 'Learn fundamental prevention techniques and protective measures',
      lessons: '5 lessons',
      duration: '15 min',
      progress: 100,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      details: 'This module covers: (1) Vector biology (Anopheles mosquitoes), (2) Insecticide-Treated Net (ITN) utilization guidelines, (3) Indoor Residual Spraying (IRS) logic, (4) Managing environmental pooling reservoirs, and (5) Personal protective repellents.'
    },
    {
      id: 'symptoms',
      title: 'Identifying Symptoms',
      description: 'Recognize early warning signs and when to seek medical help',
      lessons: '4 lessons',
      duration: '12 min',
      progress: 55,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.408l-2.013-1.892m0 0l-2.013 1.892m2.013-1.892v7.413" />
        </svg>
      ),
      details: 'This module covers: (1) Standard malaria presentation parameters (fever, chills, headache, nausea), (2) Differentiating uncomplicated malaria from severe conditions (cerebral anemia, respiratory distress), and (3) Rapid Diagnostic Testing (RDT) timelines.'
    },
    {
      id: 'community',
      title: 'Community Protection',
      description: 'Strategies for protecting your family and community',
      lessons: '6 lessons',
      duration: '20 min',
      progress: 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      details: 'This module covers: (1) Local community surveillance organization, (2) Vector site elimination drives, (3) Safe municipal drainage techniques, and (4) Formulating regional protection plans for pregnant women and newborns.'
    },
    {
      id: 'treatment',
      title: 'Treatment & Care',
      description: 'Understanding malaria treatment and patient care',
      lessons: '5 lessons',
      duration: '18 min',
      progress: 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
      ),
      details: 'This module covers: (1) Artemisinin-based Combination Therapy (ACT) compliance, (2) Supportive care protocols (hydration, fever management), and (3) Hospital referral guidelines.'
    }
  ];

  const videos = [
    { id: 1, title: 'How to Use Mosquito Nets', views: '1,234 views', duration: '3:45', youtubeId: 'e8M8uQdJpXw', desc: 'Step-by-step tutorial on installing, maintaining, and retreatment guidelines for long-lasting insecticidal nets.' },
    { id: 2, title: 'Preventing Mosquito Breeding', views: '2,156 views', duration: '5:20', youtubeId: '2bN-0LptZ58', desc: 'Identify and clear pooling water reservoirs, tire tracks, and open containers around community households.' },
    { id: 3, title: 'Recognizing Malaria Symptoms', views: '1,876 views', duration: '4:15', youtubeId: 'S-qY3450q3Y', desc: 'Differentiating general fatigue from severe symptoms that demand immediate clinical emergency transport.' }
  ];

  const achievements = [
    { title: 'First Steps', desc: 'Completed first course', unlocked: true, color: 'text-orange-500 bg-orange-50 border-orange-100' },
    { title: 'Knowledge Seeker', desc: 'Completed 3 courses', unlocked: false, color: 'text-gray-400 bg-gray-50 border-gray-100' },
    { title: 'Quiz Master', desc: 'Perfect score on 5 quizzes', unlocked: true, color: 'text-orange-500 bg-orange-50 border-orange-100' }
  ];

  const quizQuestions = [
    {
      q: 'Which mosquito species is primary vector for malaria transmission?',
      options: ['Aedes aegypti', 'Anopheles mosquito', 'Culex pipiens', 'Culiseta longiareolata'],
      answer: 1
    },
    {
      q: 'Within what timeframe should diagnostic testing occur after fever onset?',
      options: ['Within 24 hours', 'Within 72 hours', 'After 5 days', 'Only when visible rashes appear'],
      answer: 0
    },
    {
      q: 'What is the most effective primary household vector control method?',
      options: ['Sleeping under long-lasting insecticidal nets', 'Using local fan coils', 'Boiling drinking water', 'Applying skin moisturizer'],
      answer: 0
    }
  ];

  const handleNextQuiz = () => {
    if (selectedAnswer === quizQuestions[quizStep - 1].answer) {
      setQuizScore(quizScore + 1);
    }
    setSelectedAnswer(null);
    setQuizStep(quizStep + 1);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Learn Page Header */}
      <div className="bg-[#10a396] text-white pt-8 pb-12 px-6 rounded-b-[32px] shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3.5">
            <img src="/logo.jpeg" alt="Malaria Guide Logo" className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-sm" />
            <div>
              <h1 className="text-2xl font-bold">Learn & Grow</h1>
              <p className="text-sm opacity-80">Empower yourself with malaria education</p>
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
        
        {/* User Progress Card */}
        <div className="bg-[#0b8a7f] text-white rounded-[24px] p-5 shadow-lg border border-teal-600/30 flex justify-between items-center">
          <div className="flex-1 pr-4">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block opacity-75 mb-1">Your Progress</span>
            <div className="text-2xl sm:text-3xl font-extrabold">40% Complete</div>
            <div className="w-full bg-white/20 h-2.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
            </div>
          </div>
          <button 
            onClick={() => alert("Keep going! You have completed 1 of 4 modules.")}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.5 4.5L21.75 7.5" />
            </svg>
          </button>
        </div>

        {/* My Courses Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-900 font-bold text-lg">My Courses</h2>
            <button onClick={() => alert("Showing all available courses (4/4 loaded).")} className="text-[#10a396] font-bold text-xs hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5 pr-2">
                    <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-800 text-sm leading-snug">{course.title}</h3>
                      <p className="text-xs text-gray-500 leading-normal mt-0.5">{course.description}</p>
                    </div>
                  </div>

                  {course.progress === 100 && (
                    <div className="text-green-500 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.74-5.24z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-50">
                  <span className="text-[11px] text-gray-400 font-semibold">{course.lessons} • {course.duration}</span>
                  
                  <button 
                    onClick={() => setActiveCourse(course)}
                    className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all ${
                      course.progress === 100 ? 'bg-gray-100 hover:bg-gray-200 text-gray-600' :
                      course.progress > 0 ? 'bg-[#10a396] hover:bg-[#0c7a70] text-white' : 'bg-[#10a396] hover:bg-[#0c7a70] text-white'
                    }`}
                  >
                    {course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start Course'}
                  </button>
                </div>

                {course.progress > 0 && course.progress < 100 && (
                  <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-[#10a396] h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-900 font-bold text-lg">Video Tutorials</h2>
            <button onClick={() => alert("See More tutorials feature is coming soon.")} className="text-[#10a396] font-bold text-xs hover:underline">See More</button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {videos.map((vid) => (
              <div 
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3.5 pr-2">
                  {/* Video Mock Thumbnail */}
                  <div className="w-14 h-14 bg-teal-600/10 rounded-2xl flex items-center justify-center shrink-0 border border-teal-600/20 text-[#10a396]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12m0 0l-2.25 2.25M16.5 12H7.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-800 text-xs sm:text-sm">{vid.title}</h3>
                    <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">{vid.views} • {vid.duration}</span>
                  </div>
                </div>

                <button 
                  className="w-10 h-10 rounded-full bg-[#10a396] hover:bg-[#0c7a70] text-white flex items-center justify-center shrink-0 shadow transition-transform active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 ml-0.5">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div>
          <h2 className="text-gray-900 font-bold text-lg mb-4">Achievements</h2>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((ach, idx) => (
              <div 
                key={idx}
                className={`bg-white border rounded-2xl p-3 text-center flex flex-col items-center justify-between shadow-sm relative ${
                  !ach.unlocked ? 'opacity-50' : ''
                }`}
              >
                {/* Ribbon / Padlock badge */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border ${
                  ach.unlocked ? 'bg-orange-50 border-orange-100 text-orange-500' : 'bg-gray-100 border-gray-200 text-gray-400'
                }`}>
                  {ach.unlocked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-2.25a1.125 1.125 0 00-1.125 1.125v3.375m9 0h-9M9 10.5h6m-6 3h6m-6-6h6M9 6a3 3 0 116 0 3 3 0 01-6 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  )}
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-[11px] text-gray-800 leading-snug">{ach.title}</h4>
                  <p className="text-[9px] text-gray-400 leading-snug">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Take a Quiz Promo Banner */}
        <div className="bg-[#8b5cf6] text-white rounded-3xl p-6 shadow-lg border border-purple-500/20 text-center space-y-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold">Take a Quiz</h3>
            <p className="text-xs opacity-80 mt-1 max-w-xs mx-auto">Test your knowledge, claim certificates, and unlock the Quiz Master badge!</p>
          </div>
          <button 
            onClick={() => {
              setQuizStep(0);
              setShowQuiz(true);
            }}
            className="w-full max-w-[200px] bg-white hover:bg-gray-100 text-[#8b5cf6] font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-md mx-auto block"
          >
            Start Quiz
          </button>
        </div>

      </main>

      {/* Course Detail Modal */}
      {activeCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl relative animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in duration-200">
            <button 
              onClick={() => setActiveCourse(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <h3 className="text-lg font-bold text-gray-900 pr-6 mb-2">{activeCourse.title}</h3>
            <span className="text-[11px] text-gray-400 font-semibold block mb-4">{activeCourse.lessons} • {activeCourse.duration}</span>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-500 block mb-1">Curriculum Outline</span>
                <p className="text-xs text-gray-600 leading-relaxed bg-[#10a396]/5 border border-[#10a396]/10 p-3.5 rounded-xl">
                  {activeCourse.details}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4 flex space-x-3">
                <button 
                  onClick={() => setActiveCourse(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-2xl text-xs transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    alert("Module loaded. Starting lessons simulation...");
                    setActiveCourse(null);
                  }}
                  className="flex-1 bg-[#10a396] hover:bg-[#0c7a70] text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md"
                >
                  Launch Module
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[32px] p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3">{activeVideo.title}</h3>
            
            {/* Embedded Player Placeholder simulating high quality tutorial video */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 mb-4 shadow-inner">
              <span className="text-xs text-white/50 absolute top-4 left-4">Tutorial Playback</span>
              <button 
                onClick={() => alert("Video playback started. Running simulation...")}
                className="w-16 h-16 rounded-full bg-[#10a396] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-medium bg-gray-50 p-3 rounded-xl">
              {activeVideo.desc}
            </p>
          </div>
        </div>
      )}

      {/* Quiz Interactive Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[32px] p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Close */}
            <button 
              onClick={resetQuiz}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            {quizStep === 0 && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-purple-50 text-[#8b5cf6] rounded-full flex items-center justify-center mx-auto border border-purple-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-2.13c1.93-.457 3.018-2.52 2.457-4.453l-.974-3.356M9.813 15.904L9 21l8.982-2.13c1.93-.457 3.018-2.52 2.457-4.453l-.974-3.356" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Malaria Assessment Quiz</h3>
                  <p className="text-xs text-gray-500 mt-1">Answer 3 questions to test your knowledge. Score 100% to qualify for your certification.</p>
                </div>
                <button 
                  onClick={() => setQuizStep(1)}
                  className="w-full bg-[#8b5cf6] hover:bg-[#724ae2] text-white font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-md"
                >
                  Start Questions
                </button>
              </div>
            )}

            {quizStep > 0 && quizStep <= quizQuestions.length && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-600">Question {quizStep} of {quizQuestions.length}</span>
                  <span className="text-xs font-bold text-gray-400">Score: {quizScore}</span>
                </div>

                <h4 className="text-sm font-extrabold text-gray-900 leading-snug mb-4">
                  {quizQuestions[quizStep - 1].q}
                </h4>

                <div className="space-y-2.5">
                  {quizQuestions[quizStep - 1].options.map((opt, oIdx) => (
                    <button 
                      key={oIdx}
                      onClick={() => setSelectedAnswer(oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                        selectedAnswer === oIdx ? 'bg-purple-50 border-purple-300 text-purple-700' : 'bg-gray-50/50 hover:bg-gray-50 border-gray-100 text-gray-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <button 
                  disabled={selectedAnswer === null}
                  onClick={handleNextQuiz}
                  className="w-full bg-[#8b5cf6] hover:bg-[#724ae2] text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md mt-6 disabled:opacity-50"
                >
                  {quizStep === quizQuestions.length ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            )}

            {quizStep > quizQuestions.length && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Quiz Completed!</h3>
                  <p className="text-xs text-gray-500 mt-1">You scored {quizScore} out of {quizQuestions.length}.</p>
                </div>

                {quizScore === quizQuestions.length ? (
                  <div className="bg-amber-50 border border-amber-100 p-3.5 rounded-2xl text-xs text-amber-700 font-semibold max-w-xs mx-auto">
                    🏆 Perfect Score! You unlocked the <strong>Quiz Master</strong> achievement.
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 font-medium">Try again to score 100% and claim your badge!</p>
                )}

                <div className="flex space-x-3 pt-2">
                  <button 
                    onClick={() => {
                      setQuizStep(1);
                      setQuizScore(0);
                      setSelectedAnswer(null);
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-2xl text-xs transition-all"
                  >
                    Retake Quiz
                  </button>
                  <button 
                    onClick={resetQuiz}
                    className="flex-1 bg-[#8b5cf6] hover:bg-[#724ae2] text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md"
                  >
                    Finish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navbar navigation */}
      <BottomNavbar currentPath="learn" />
    </div>
  );
}
