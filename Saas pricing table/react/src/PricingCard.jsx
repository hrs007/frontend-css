
export default function PricingCard({ isAnnual, data }) {
    const tier = { name: data.name, description: "", features: data.features }
    const displayPrice = isAnnual ? data.annualPrice : data.monthlyPrice
    const isPopular = data.isPopular
    return (
        <>
            <div class={`relative bg-white rounded-2xl border flex flex-col p-8 w-full max-w-sm md:flex-1 transition-all duration-300 ${isPopular ? 'border-indigo-500 shadow-2xl z-10 md:scale-105 md:py-10' : 'border-slate-200 shadow-sm hover:shadow-md'}`}>

                {/* <!-- "Most Popular" Badge (Only show if isPopular is true) --> */}
                {isPopular && (<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
                    Most Popular
                </div>)}

                {/* <!-- Plan Info --> */}
                <div className="text-center mb-8 border-b border-slate-100 pb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                    <p className="text-sm text-slate-500 mb-6">{tier.description}</p>
                    <div className="flex items-end justify-center gap-1">
                        <span className="text-5xl font-black text-slate-900">${displayPrice}</span>
                        <span className="text-slate-500 font-medium mb-1">/{isAnnual ? 'yr' : 'mo'}</span>
                    </div>
                </div>

                {/* <!-- Features List --> */}
                <ul className="flex flex-col gap-4 flex-1 mb-8">
                    {tier.features.map((feature) =>
                        <div><li className="flex items-center gap-3 text-sm text-slate-700">
                            <svg className="w-5 h-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                        </li>
                        </div>
                    )}
                </ul>


                {/* <!-- CTA Button --> */}
                <button className={`w-full py-3 rounded-xl text-sm font-bold transition-colors mt-auto ${isPopular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                    Get Started
                </button>
            </div>
        </>
    )
}
