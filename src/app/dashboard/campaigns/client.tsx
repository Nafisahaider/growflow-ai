"use client"

import { useState } from "react"
import { Megaphone, Plus, Search, Sparkles, Send, MoveRight, Loader2 } from "lucide-react"

type Campaign = {
  id: string
  name: string
  message: string
  status: string
  createdAt: string
}

type Contact = {
  id: string
  tags: string[]
}

export function CampaignsClient({ initialCampaigns, contacts }: { initialCampaigns: Campaign[], contacts: Contact[] }) {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [isBuilderOpen, setBuilderOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Builder State
  const [campaignName, setCampaignName] = useState("")
  const [audienceFilter, setAudienceFilter] = useState("all")
  const [message, setMessage] = useState("")

  // Available unique tags
  const tags = Array.from(new Set(contacts.flatMap(c => c.tags)))

  const handleGenerateAI = async () => {
    setLoading(true)
    // Mock AI generation delay
    await new Promise(r => setTimeout(r, 1500))
    setMessage(`Hi there! We have a special offer just for you this weekend. Use code GROW20 for 20% off your next purchase. Click here to claim: [Link]`)
    setLoading(false)
  }

  const handleLaunch = async (draft = false) => {
    setLoading(true)
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campaignName,
          message,
          status: draft ? "draft" : "running",
          audienceFilter
        })
      })

      if (res.ok) {
        const newCampaign = await res.json()
        setCampaigns([newCampaign, ...campaigns])
        setBuilderOpen(false)
        setStep(1)
        setCampaignName("")
        setMessage("")
        setAudienceFilter("all")
      }
    } catch (e) {}
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500 mt-1">Broadcast messages to your segmented audiences.</p>
        </div>
        <button 
          onClick={() => setBuilderOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(camp => (
          <div key={camp.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900 text-lg truncate pr-4">{camp.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                camp.status === 'running' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                camp.status === 'completed' ? 'bg-teal-500/10 text-teal-600 border border-teal-500/20' : 
                'bg-slate-500/10 text-gray-500 border border-slate-500/20'
              }`}>
                {camp.status.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{camp.message}</p>
            <div className="text-xs text-gray-400 flex items-center justify-between">
              <span>Created {new Date(camp.createdAt).toLocaleDateString()}</span>
              {camp.status === 'running' && <span className="flex items-center gap-1 text-emerald-600"><Loader2 className="w-3 h-3 animate-spin"/> Sending</span>}
            </div>
          </div>
        ))}

        {campaigns.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
            No campaigns yet. Click "Create Campaign" to start broadcasting.
          </div>
        )}
      </div>

      {/* Campaign Builder Wizard */}
      {isBuilderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#F0F2F5]/80 backdrop-blur-sm" onClick={() => !loading && setBuilderOpen(false)} />
          <div className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-500">
              <h2 className="text-xl font-bold text-gray-900">Campaign Wizard</h2>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className={`w-2.5 h-2.5 rounded-full transition-colors ${s === step ? 'bg-emerald-500' : s < step ? 'bg-emerald-500/50' : 'bg-slate-700'}`} />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto flex-1">
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 1: Campaign Details</h3>
                  <label className="block text-sm text-gray-500 mb-1">Give your campaign a memorable name.</label>
                  <input autoFocus required value={campaignName} onChange={e=>setCampaignName(e.target.value)} className="w-full bg-[#F0F2F5] border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Black Friday Promo 2026" />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Audience Selection</h3>
                  <label className="block text-sm text-gray-500 mb-4">Who should receive this message?</label>
                  
                  <div className="space-y-3">
                    <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${audienceFilter === 'all' ? 'border-emerald-500 bg-emerald-500/5' : 'border-gray-200 bg-[#F0F2F5] hover:border-gray-300'}`}>
                      <input type="radio" value="all" checked={audienceFilter === 'all'} onChange={() => setAudienceFilter('all')} className="accent-emerald-500 w-4 h-4" />
                      <div>
                        <div className="text-gray-900 font-medium">All Contacts</div>
                        <div className="text-sm text-gray-500">Send to all {contacts.length} contacts</div>
                      </div>
                    </label>

                    {tags.map(tag => {
                      const count = contacts.filter(c => c.tags.includes(tag)).length
                      const filterVal = `tag:${tag}`
                      return (
                         <label key={tag} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${audienceFilter === filterVal ? 'border-emerald-500 bg-emerald-500/5' : 'border-gray-200 bg-[#F0F2F5] hover:border-gray-300'}`}>
                          <input type="radio" value={filterVal} checked={audienceFilter === filterVal} onChange={() => setAudienceFilter(filterVal)} className="accent-emerald-500 w-4 h-4" />
                          <div>
                            <div className="text-gray-900 font-medium">Tag: {tag}</div>
                            <div className="text-sm text-gray-500">Send to {count} tagged contacts</div>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Craft your Message</h3>
                  <div className="flex justify-between items-center mb-1 text-sm text-gray-500">
                    <label>WhatsApp Message Content</label>
                    <button 
                      onClick={handleGenerateAI}
                      disabled={loading}
                      className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium disabled:opacity-50 transition-colors"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4" />}
                      Generate with AI
                    </button>
                  </div>
                  <textarea 
                    autoFocus 
                    value={message} 
                    onChange={e=>setMessage(e.target.value)} 
                    className="w-full h-48 bg-[#F0F2F5] border border-gray-200 rounded-lg p-4 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    placeholder="Hello! We are excited to announce..." 
                  />
                  <p className="text-xs text-gray-400">Supports text and emojis. Variables like {"{name}"} will be replaced automatically.</p>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 text-center py-8">
                  <Send className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Launch!</h3>
                  <p className="text-gray-500 max-w-sm mx-auto mb-8">
                    Your campaign "{campaignName}" is ready to be queued. It will be sent to the selected audience immediately.
                  </p>
                  
                  <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <button 
                      onClick={() => handleLaunch(false)} 
                      disabled={loading}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                    >
                      {loading && <Loader2 className="w-5 h-5 animate-spin"/>} Launch Campaign
                    </button>
                    <button 
                      onClick={() => handleLaunch(true)}
                       disabled={loading}
                      className="bg-gray-100 hover:bg-slate-700 text-gray-900 font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
                    >
                      Save as Draft
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="p-6 border-t border-gray-200 bg-gray-500 flex justify-between items-center">
              {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)} 
                  disabled={loading}
                  className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium transition-colors disabled:opacity-50"
                >
                  Back
                </button>
              ) : (
                <div/>
              )}
              
              {step < 4 && (
                <button 
                  onClick={() => setStep(step + 1)} 
                  disabled={loading || (step === 1 && !campaignName) || (step === 3 && !message)}
                  className="flex items-center gap-2 px-6 py-2 bg-white text-slate-950 rounded-lg font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Continue <MoveRight className="w-4 h-4" />
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}
    </div>
  )
}
