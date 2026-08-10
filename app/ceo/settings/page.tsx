"use client";

import { useState } from "react";
import { Save, Sliders, Bell, Building, CreditCard, Check, ArrowRight } from "lucide-react";

const PLANS = [
    {
        key: 'starter',
        name: 'Starter',
        monthlyPrice: 186,
        annualPrice: 143,
        description: 'For small businesses & independent practices',
        features: ['Basic HR management', 'Employee directory', 'Standard reporting', 'Email support'],
        popular: false,
    },
    {
        key: 'scale',
        name: 'Scale',
        monthlyPrice: 289,
        annualPrice: 223,
        description: 'For growing organizations',
        features: ['Includes Starter features', 'Payroll integration', 'Advanced analytics', 'Priority support'],
        popular: true,
    },
    {
        key: 'enterprise',
        name: 'Enterprise',
        monthlyPrice: 0,
        annualPrice: 0,
        description: 'For large enterprises',
        features: ['Custom integrations', 'Dedicated account manager', 'SLA guarantees', '24/7 phone support'],
        popular: false,
        customPrice: true,
    },
];

export default function CEOSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Executive Settings saved successfully.");
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Executive Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your executive dashboard preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
        >
          {isSaving ? 'Saving...' : <><Save size={16} /> Save Settings</>}
        </button>
      </div>

      <div className="space-y-6">
         {/* Account Module - Company Details */}
         <AccountModule />

         {/* Subscription and Billing Model */}
         <SubscriptionModule />

         {/* Preferences */}
         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
               <Sliders size={18} className="text-emerald-500" />
               <h2 className="text-lg font-bold text-white">Dashboard Layout</h2>
            </div>
            <div className="p-6">
               <div className="space-y-4">
                  {[
                    { title: 'Show Financial Metrics', desc: 'Display project budgets and burn rates on the main overview.' },
                    { title: 'Enable High-Contrast Mode', desc: 'Increase UI contrast for easier reading.' }
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                       <div>
                          <div className="text-sm font-bold text-white mb-1">{setting.title}</div>
                          <div className="text-xs text-slate-500 font-medium">{setting.desc}</div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={i === 0} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                       </label>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Notifications */}
         <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
               <Bell size={18} className="text-emerald-500" />
               <h2 className="text-lg font-bold text-white">Alert Thresholds</h2>
            </div>
            <div className="p-6 space-y-4">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Alert me when project budget exceeds (%)</label>
                  <input type="number" defaultValue="85" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 text-white" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Alert me when squad health drops below (%)</label>
                  <input type="number" defaultValue="70" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 text-white" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function AccountModule() {
    const [formData, setFormData] = useState({
        companyName: '',
        companyType: '',
        address: '',
        city: '',
        country: '',
        taxId: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/30">
                <div className="flex items-center gap-3">
                    <Building size={18} className="text-emerald-500" />
                    <div>
                        <h2 className="text-lg font-bold text-white">Company Details</h2>
                        <p className="text-xs text-slate-500">Manage your business profile and information</p>
                    </div>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-all"
                    >
                        Edit Details
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-1.5 text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-all"
                    >
                        Cancel
                    </button>
                )}
            </div>
            
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider mb-2">Company Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={e => setFormData({...formData, companyName: e.target.value})}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 text-white"
                                placeholder="Enter company name"
                            />
                        ) : (
                            <div className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-800/50 rounded-xl text-sm text-slate-300">
                                {formData.companyName || '—'}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider mb-2">Company Type</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.companyType}
                                onChange={e => setFormData({...formData, companyType: e.target.value})}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 text-white"
                                placeholder="e.g. LLC, Corporation"
                            />
                        ) : (
                            <div className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-800/50 rounded-xl text-sm text-slate-300">
                                {formData.companyType || '—'}
                            </div>
                        )}
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider mb-2">Address</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.address}
                                onChange={e => setFormData({...formData, address: e.target.value})}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 text-white"
                                placeholder="Street address"
                            />
                        ) : (
                            <div className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-800/50 rounded-xl text-sm text-slate-300">
                                {formData.address || '—'}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider mb-2">City</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.city}
                                onChange={e => setFormData({...formData, city: e.target.value})}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 text-white"
                            />
                        ) : (
                            <div className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-800/50 rounded-xl text-sm text-slate-300">
                                {formData.city || '—'}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider mb-2">Country</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.country}
                                onChange={e => setFormData({...formData, country: e.target.value})}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 text-white"
                            />
                        ) : (
                            <div className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-800/50 rounded-xl text-sm text-slate-300">
                                {formData.country || '—'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SubscriptionModule() {
    const [billingInterval, setBillingInterval] = useState<'monthly' | 'annually'>('monthly');
    const [currentPlan, setCurrentPlan] = useState('starter');

    const handleCheckout = (planKey: string) => {
        alert(`Redirecting to checkout for ${planKey} (${billingInterval})...`);
        setCurrentPlan(planKey);
    };

    return (
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
                <CreditCard size={18} className="text-emerald-500" />
                <div>
                    <h2 className="text-lg font-bold text-white">Subscription & Billing</h2>
                    <p className="text-xs text-slate-500">Manage your plan and billing interval</p>
                </div>
            </div>

            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h3 className="text-md font-bold text-white">Available Plans</h3>
                        <p className="text-slate-400 text-xs mt-1">Choose the plan that fits your business needs</p>
                    </div>

                    <div className="bg-slate-950 p-1 rounded-full border border-slate-800 flex items-center w-fit">
                        <button
                            onClick={() => setBillingInterval('monthly')}
                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${billingInterval === 'monthly' ? 'bg-emerald-500 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingInterval('annually')}
                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${billingInterval === 'annually' ? 'bg-emerald-500 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            Annually
                            <span className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${billingInterval === 'annually' ? 'bg-slate-900 text-emerald-500' : 'bg-emerald-500/20 text-emerald-500'}`}>SAVE 20%</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {PLANS.map((plan) => {
                        const isCurrentPlan = currentPlan === plan.key;
                        const price = plan.customPrice ? null : (billingInterval === 'monthly' ? plan.monthlyPrice : plan.annualPrice);
                        
                        return (
                            <div 
                                key={plan.key} 
                                className={`relative flex flex-col p-5 bg-slate-950 rounded-xl border transition-all ${
                                    plan.popular ? 'border-emerald-500 shadow-[0_0_15px_rgba(245,158,11,0.15)] scale-[1.02]' : 'border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                                        <span className="bg-emerald-500 text-slate-900 text-[10px] font-bold uppercase tracking-wider py-0.5 px-3 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                                    <p className="text-xs text-slate-400 h-8">{plan.description}</p>
                                </div>
                                
                                <div className="mb-6">
                                    {plan.customPrice ? (
                                        <div className="flex items-baseline text-3xl font-extrabold text-white">
                                            Custom
                                        </div>
                                    ) : (
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-extrabold text-white">${price}</span>
                                            <span className="text-xs font-medium text-slate-500">/mo</span>
                                        </div>
                                    )}
                                    {!plan.customPrice && billingInterval === 'annually' && (
                                        <div className="text-[10px] font-semibold text-emerald-500 mt-1">
                                            Billed ${plan.annualPrice * 12} yearly
                                        </div>
                                    )}
                                    {plan.customPrice && (
                                        <div className="text-[10px] font-semibold text-slate-500 mt-1 invisible">
                                            Spacer
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleCheckout(plan.key)}
                                    disabled={isCurrentPlan}
                                    className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 mb-6 ${
                                        isCurrentPlan 
                                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                            : plan.popular 
                                                ? 'bg-emerald-500 text-slate-900 hover:bg-emerald-600' 
                                                : 'bg-white text-slate-900 hover:bg-gray-200'
                                    }`}
                                >
                                    {isCurrentPlan ? 'Current Plan' : plan.customPrice ? 'Contact Sales' : 'Upgrade Plan'}
                                    {!isCurrentPlan && <ArrowRight size={14} />}
                                </button>

                                <div className="flex-1 space-y-3">
                                    <p className="text-xs font-bold text-slate-300">What's included:</p>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                                                <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                                <span className="leading-tight">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
