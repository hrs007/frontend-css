import React, { useState } from 'react';

const dashboardData = {
  user: { name: "Admin User", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  metrics: [
    { id: 1, title: "Total Revenue", value: "$45,231.89", trend: "+20.1% from last month", isPositive: true, span: 2 },
    { id: 2, title: "Active Users", value: "+2,350", trend: "+180 today", isPositive: true, span: 1 },
    { id: 3, title: "Churn Rate", value: "2.4%", trend: "-0.5% from last week", isPositive: false, span: 1 }
  ],
  links: [
    { id: 1, icon: "📊", label: "Dashboard", active: true },
    { id: 2, icon: "👥", label: "Customers", active: false },
    { id: 3, icon: "💰", label: "Revenue", active: false },
    { id: 4, icon: "⚙️", label: "Settings", active: false }
  ]
};


function MetricCard({ title, value, trend, span }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between ${span === 2 ? 'col-span-1 md:col-span-2' : 'col-span-1'}`}>
      <div className="text-sm font-semibold text-slate-500 uppercase">{title}</div>
      <div className="text-3xl font-black text-slate-900 my-2">{value}</div>
      
      {/* TODO: Add logic here to change color based on whether the trend is positive or negative */}
      <div className="text-sm font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded">
        {trend}
      </div>
    </div>
  );
}

function Sidebar({ links, isMobileMenuOpen }) {
  return (
    <div className={`
      bg-slate-900 text-white flex flex-col transition-all duration-300
      /* Mobile classes */
      ${isMobileMenuOpen ? 'block' : 'hidden'} md:block
      /* Desktop classes */
      md:w-[230px] md:h-full md:rounded-xl p-4
    `}>
      <div className="text-xl font-black mb-6 px-2">SaaS<span className="text-indigo-500">Board</span></div>
      
      <div className="flex flex-col gap-2">
        {/* Using .map() to loop over our links array and create HTML for each one! */}
        {links.map((link) => (
          <div 
            key={link.id} 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer ${link.active ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span>{link.icon}</span>
            <span className="font-medium">{link.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 font-sans">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-full">
        
        <Sidebar links={dashboardData.links} isMobileMenuOpen={isMobileMenuOpen} />

        <div className="flex-1 flex flex-col gap-6">
          
          <header className="bg-white rounded-xl shadow-sm border border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
              {isMobileMenuOpen ? '✕' : '≡'}
            </div>
            
            <h1 className="text-xl font-bold text-slate-800">Overview</h1>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600 hidden sm:block">{dashboardData.user.name}</span>
              <img src={dashboardData.user.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-indigo-100" />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* We map over our metrics array, rendering a <MetricCard /> for each item in the data! */}
            {dashboardData.metrics.map((metric) => (
              <MetricCard 
                key={metric.id}
                title={metric.title}
                value={metric.value}
                trend={metric.trend}
                span={metric.span}
              />
            ))}

            {/* TODO: Create and insert a <ChartCard /> component here! */}
            <div className="col-span-1 md:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[300px] flex items-center justify-center text-slate-400">
              Paste your HTML/CSS for the chart inside a new React component!
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}