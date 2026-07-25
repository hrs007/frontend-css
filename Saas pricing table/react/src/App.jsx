import { useState } from 'react'
import './App.css'
import PricingCard from './PricingCard';

const pricingData = [
  {
    name: "Basic",
    monthlyPrice: 9,
    annualPrice: 90,
    features: ["1 User", "5GB Storage", "Basic Support"],
    isPopular: false
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    annualPrice: 290,
    features: ["5 Users", "50GB Storage", "Priority Support", "Advanced Analytics"],
    isPopular: true
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    annualPrice: 990,
    features: ["Unlimited Users", "500GB Storage", "24/7 Support", "Custom Domain"],
    isPopular: false
  }
];

function App() {
  const [isAnnualToggle, setAnnualToggle] = useState(false);
  return (
    <>
      {/* <!-- Main Container --> */}
      <div className="min-h-screen bg-slate-50 flex flex-col items-center py-16 px-4 font-sans">

        {/* <!-- Header --> */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2">Simple, transparent pricing</h1>
          <p className="text-lg text-slate-500">No hidden fees. Cancel anytime.</p>
        </div>

        {/* <!-- The Toggle Switch (This is where your React onClick goes) --> */}
        <div className="flex items-center gap-3 mb-12 bg-slate-200 p-1 rounded-full" >
          <button className={`px-6 py-2 rounded-full text-sm  ${isAnnualToggle ? 'text-slate-500 font-medium hover:text-slate-900' : 'bg-white text-slate-900 font-bold shadow-sm'}    transition-all `} onClick={()=>setAnnualToggle(false)}>
            Monthly
          </button>
          <button className={`px-6 py-2 rounded-full text-sm ${!isAnnualToggle ? 'text-slate-500 font-medium hover:text-slate-900' : 'bg-white text-slate-900 font-bold shadow-sm'}  transition-all`} onClick={()=>setAnnualToggle(true)}>
            Annually
          </button>
        </div>

        {/* <!-- The Card Grid --> */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-5xl">
          {/* Map over your PricingCard components here */}
          {pricingData.map((data, index) => <PricingCard key={index} isAnnual={isAnnualToggle} data={data}/>)}
        </div>
      </div>
    </>
  )
}

export default App


