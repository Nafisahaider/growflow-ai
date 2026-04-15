"use client"

import { useState } from "react"
import { CreditCard, Key, Users, Settings as Cog, Plus, Edit2, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)

  const handleSimulateStripeCheckout = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Redirecting to Stripe Checkout session... (Demo Mock)")
    }, 1000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account, team members, and subscription.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0 space-y-1">
          {[
            { id: "profile", label: "Profile & Account", icon: Cog },
            { id: "billing", label: "Billing & Plans", icon: CreditCard },
            { id: "team", label: "Team Members", icon: Users },
            { id: "api", label: "API Keys", icon: Key },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left ${activeTab === tab.id ? "bg-emerald-500/10 text-emerald-600" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input defaultValue="Demo User" className="mt-2 block w-full bg-[#F0F2F5] border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input disabled defaultValue="demo@example.com" className="mt-2 block w-full bg-[#F0F2F5] border border-gray-200 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed" />
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-emerald-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Current Plan: Free Tier</h3>
                <p className="text-gray-500 mb-6 font-medium">You have used 1,302 out of 2,000 free messages this month.</p>
                <div className="w-full bg-[#F0F2F5] rounded-full h-3 mb-2 overflow-hidden border border-gray-200">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "65%" }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-medium pb-6">
                  <span>1,302 sent</span>
                  <span>2,000 limit</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Upgrades (Stripe Checkout)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#F0F2F5] border border-gray-200 rounded-xl p-5 hover:border-emerald-500/50 transition-colors">
                    <h4 className="font-bold text-gray-900 text-lg">Starter</h4>
                    <p className="text-emerald-600 font-medium mb-3">$49 / month</p>
                    <button onClick={handleSimulateStripeCheckout} disabled={loading} className="w-full bg-gray-100 hover:bg-emerald-600 text-white font-medium py-2 rounded-lg transition-colors">
                      Upgrade
                    </button>
                  </div>
                  <div className="bg-[#F0F2F5] border border-gray-200 rounded-xl p-5 hover:border-teal-500/50 transition-colors">
                    <h4 className="font-bold text-gray-900 text-lg">Pro</h4>
                    <p className="text-teal-600 font-medium mb-3">$149 / month</p>
                    <button onClick={handleSimulateStripeCheckout} disabled={loading} className="w-full bg-gray-100 hover:bg-purple-600 text-gray-900 font-medium py-2 rounded-lg transition-colors">
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-[#F0F2F5]">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md">
                      <svg viewBox="0 0 38 24" className="w-8 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M12 11.5L9 22h3l3-10.5h-3zm18-7.5l-3.5 10c-.5 1.5-1.5 2.5-3 2.5H16l1.5-4.5h6l3.5-10h3zM34.5 4h-3L30 14h3l1.5-10z" fill="#00579F"/><path d="M11.5 4h-4L5 14h4l2.5-10z" fill="#F4A522"/></svg>
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">Visa ending in 4242</p>
                      <p className="text-gray-400 text-sm">Expires 12/28</p>
                    </div>
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium">Edit</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                  <Plus className="w-4 h-4" /> Invite
                </button>
              </div>
              <ul className="divide-y divide-white/5">
                {[1, 2].map(n => (
                  <li key={n} className="py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-gray-900 font-bold text-sm">
                        U{n}
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">Demo User {n}</p>
                        <p className="text-gray-400 text-sm">user{n}@example.com</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm border border-gray-200 px-2 py-1 rounded">Admin</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === "api" && (
             <div className="bg-white border border-gray-200 rounded-2xl p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-2">API Keys</h3>
               <p className="text-gray-500 mb-6">Use these keys to authenticate API requests from your own backend.</p>
               
               <div className="p-4 border border-gray-200 rounded-lg bg-[#F0F2F5] mb-4 flex items-center justify-between">
                 <div>
                   <p className="text-gray-900 font-medium mb-1">Production Key</p>
                   <p className="text-gray-400 font-mono text-sm">sk_live_gFlow_xxxxxxxxxxxxxxxxxxxxxx</p>
                 </div>
                 <div className="flex gap-2">
                   <button className="p-2 text-gray-500 hover:text-gray-900 rounded transition-colors"><Edit2 className="w-4 h-4"/></button>
                   <button className="p-2 text-gray-500 hover:text-red-400 rounded transition-colors"><Trash2 className="w-4 h-4"/></button>
                 </div>
               </div>
               <button className="text-emerald-600 hover:text-emerald-700 font-medium">Generate New Key</button>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
