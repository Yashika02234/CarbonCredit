import { useState, useEffect, useMemo } from "react";
import { ChevronDown, Check, Wallet } from "lucide-react";
import leaves from "../../assets/images/dashboard-bg.jpg";

// IMPORT DATA FROM YOUR FILE
import { ACTIVITY_DATA, getChartData } from "../../lib/mock-data";

export default function Dashboard() {
  // --- STATE ---
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("Sep");
  const [selectedView, setSelectedView] = useState("Year to View");
  const [selectedMetric, setSelectedMetric] = useState("CO₂e");
  const [activityFilter, setActivityFilter] = useState("View All");
  const [userName, setUserName] = useState("User");


  // --- GET DYNAMIC GRAPH DATA ---
  // We pass the selected view and month to our helper function
  const currentGraphData = getChartData(selectedView, selectedMonth);

  // --- CALCULATE TOTALS ---
  const totalOffset = useMemo(() => {
    return ACTIVITY_DATA.reduce((acc, item) => acc + item.amount, 0).toLocaleString();
  }, []);

  // --- FILTER ACTIVITY LIST ---
  const filteredActivity = useMemo(() => {
    if (activityFilter === "View All") return ACTIVITY_DATA;
    return ACTIVITY_DATA.filter(item => item.type === activityFilter);
  }, [activityFilter]);
useEffect(() => {
  const storedName = localStorage.getItem("offset_user_name");

  if (storedName && storedName.trim().length > 0) {
    setUserName(storedName);
  } else {
    setUserName("User");
  }
}, []);


  // --- CLICK OUTSIDE HANDLER ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2F3E33] pt-32 pb-12 font-sans selection:bg-[#9CCBA0]/30 relative">
      
      {/* BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <img 
          src={leaves} 
          alt="Leaves Background" 
          className="w-full h-full object-cover opacity-100 mix-blend-multiply object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFBF7]/60 to-[#FDFBF7]"></div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 space-y-10">

        {/* HEADER */}
        <section className="flex justify-between items-end">
          <div>
           <h1 className="text-5xl font-serif text-[#1A2F23] mb-3">
  Welcome, {userName}!
</h1>

            <p className="text-xl text-[#5C6F66]">Track Your Impact</p>
          </div>
          
          <div className="hidden md:flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white shadow-sm">
             <div className="p-2 bg-emerald-100 rounded-full text-emerald-700">
                <Wallet className="w-5 h-5" />
             </div>
             <div>
                <p className="text-xs text-[#5C6F66] uppercase font-bold tracking-wider">Total Offset</p>
                <p className="text-lg font-mono font-bold text-[#1A2F23]">{totalOffset} t</p>
             </div>
          </div>
        </section>

        {/* CHART CARD */}
        <section className="bg-[#F4F1E8]/80 backdrop-blur-md rounded-[30px] p-8 shadow-sm relative overflow-visible border border-white/60">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-20">
            <h2 className="text-2xl font-serif text-[#2F3E33]">Total {selectedMetric} Offset</h2>
            
            {/* CONTROLS */}
            <div className="flex items-center gap-2 bg-[#EAE7DE] p-1.5 rounded-2xl w-fit relative dropdown-container shadow-inner">
              
              {/* MONTH DROPDOWN */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown("month")}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeDropdown === "month" || selectedMonth !== "Sep" ? "bg-white text-[#2F3E33] shadow-sm" : "text-[#6B7B73] hover:text-[#2F3E33]"
                  }`}
                >
                  {selectedMonth}
                </button>
                {activeDropdown === "month" && (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-[#EBE8E0] p-2 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="grid grid-cols-2 gap-1">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m) => (
                        <button
                          key={m}
                          onClick={() => { setSelectedMonth(m); setActiveDropdown(null); }}
                          className={`text-xs py-2 rounded-lg hover:bg-[#F4F1E8] ${selectedMonth === m ? 'font-bold bg-[#F4F1E8]' : ''}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* VIEW DROPDOWN */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown("view")}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeDropdown === "view" || selectedView === "Year to View" ? "bg-[#D6D3C9] text-[#2F3E33] shadow-sm" : "text-[#6B7B73] hover:text-[#2F3E33]"
                  }`}
                >
                  {selectedView}
                </button>
                {activeDropdown === "view" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-[#EBE8E0] p-1 z-50">
                    {["Year to View", "Month to View", "Week to View"].map((v) => (
                      <button 
                        key={v} 
                        onClick={() => { setSelectedView(v); setActiveDropdown(null); }} 
                        className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-[#F4F1E8] flex justify-between"
                      >
                        {v} {selectedView === v && <Check className="w-3 h-3"/>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* METRIC DROPDOWN */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown("metric")}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1 transition-all ${
                    activeDropdown === "metric" ? "bg-white text-[#2F3E33] shadow-sm" : "text-[#6B7B73] hover:text-[#2F3E33]"
                  }`}
                >
                  {selectedMetric} <ChevronDown className="w-3 h-3" />
                </button>
                {activeDropdown === "metric" && (
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-[#EBE8E0] p-1 z-50">
                    {["CO₂e", "tCO₂", "kg CO₂"].map((m) => (
                      <button
                        key={m}
                        onClick={() => { setSelectedMetric(m); setActiveDropdown(null); }}
                        className={`w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-[#F4F1E8] flex justify-between ${selectedMetric === m ? 'font-bold bg-[#F4F1E8]' : ''}`}
                      >
                        {m} {selectedMetric === m && <Check className="w-3 h-3"/>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* === THE GRAPH === */}
          <div className="relative h-64 w-full mt-4 select-none">
            
            {/* GRID LINES */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-[#9CA3AF] font-medium pointer-events-none z-0">
              {[500, 300, 100, 0].map((val, i) => (
                <div key={i} className="flex items-center w-full">
                   <span className="w-8 text-right mr-4 opacity-50 font-mono">{val}K</span>
                   <div className="h-[1px] w-full bg-[#D6D3C9]/50 border-t border-dashed border-[#B0B0B0]/40"></div>
                </div>
              ))}
            </div>

            {/* BARS CONTAINER - Uses 'currentGraphData' from mock file */}
            <div className="absolute inset-0 flex items-end justify-between pl-12 pr-4 pb-6 z-10 gap-2 md:gap-4">
              {currentGraphData.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-3 flex-1 group cursor-pointer h-full justify-end">
                  
                  {/* BAR */}
                  <div 
                    className="w-full max-w-[48px] md:max-w-[64px] rounded-t-lg transition-all duration-700 ease-out hover:scale-[1.02] relative overflow-hidden group-hover:shadow-lg origin-bottom"
                    style={{ 
                      height: item.h,
                      backgroundColor: '#638666',
                      backgroundImage: 'linear-gradient(180deg, #9CCBA0 0%, #557C58 100%)' 
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
                  </div>

                  {/* LABEL */}
                  <span className={`text-xs font-semibold transition-colors ${item.label === selectedMonth ? 'text-[#2F3E33]' : 'text-[#8C9E96]'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section className="relative z-30 pb-10">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-2xl font-serif text-[#2F3E33]">Recent Offsetting Activity</h2>
            
            <div className="relative dropdown-container">
               <button 
                 onClick={() => toggleDropdown("activity")}
                 className="flex items-center gap-2 text-sm font-bold text-[#5C6F66] bg-[#F4F1E8] px-5 py-2.5 rounded-full hover:bg-[#EAE7DE] transition-colors"
               >
                 {activityFilter} <ChevronDown className="w-4 h-4"/>
               </button>
               
               {activeDropdown === "activity" && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#EBE8E0] p-1 z-50">
                    {["View All", "Forestry", "Renewable", "Blue Carbon"].map((opt) => (
                      <button key={opt} onClick={() => { setActivityFilter(opt); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-[#F4F1E8] flex justify-between">{opt}</button>
                    ))}
                  </div>
               )}
            </div>
          </div>

          <div className="bg-[#F4F1E8]/80 backdrop-blur-md rounded-[30px] p-2 space-y-1 border border-white/60">
            {filteredActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 md:p-6 hover:bg-[#EAE7DE] rounded-[24px] transition-colors cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 ${item.bg} rounded-full flex items-center justify-center text-white shadow-sm`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2F3E33]">{item.project}</h3>
                    <p className="text-xs md:text-sm text-[#7A8C82] mt-0.5">Verified • {item.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-lg font-mono font-bold text-[#2F3E33] hidden md:block">
                    {item.amount.toLocaleString()} €
                  </span>
                  <span className="bg-[#DEE5DE] text-[#4A6356] text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-wider">
                    Bought
                  </span>
                </div>
              </div>
            ))}
            {filteredActivity.length === 0 && (
                <div className="p-8 text-center text-[#8C9E96]">No activity found for this filter.</div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}