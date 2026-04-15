"use client"

import { Bot, Sparkles, Zap, Users, Brain, Loader2 } from "lucide-react"
import { useState } from "react"

const aiTools = [
  { id: "reply", name: "AI Reply Generator", icon: Bot, desc: "Automatically draft confident responses based on chat history and business context." },
  { id: "campaign", name: "AI Campaign Generator", icon: Sparkles, desc: "Input a goal, and we will write the perfect high-converting WhatsApp broadcast." },
  { id: "segmentation", name: "AI Segmentation", icon: Users, desc: "Automatically cluster your CRM contacts based on implicit chat intentions." },
  { id: "scoring", name: "AI Lead Scoring", icon: Zap, desc: "Score contacts from 1-100 based on engagement probability to prioritize sales." },
]

export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState("reply")
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState("")

  const simulateAIOperation = (toolId: string) => {
    setLoading(true)
    setOutput("")
    
    setTimeout(() => {
      setLoading(false)
      switch(toolId) {
        case "reply":
          setOutput("Suggested Reply: 'Hi there! We can certainly help you with shipping. For orders over $50, standard shipping is completely free. Would you like to proceed?'")
          break
        case "campaign":
          setOutput("Here is a high converting draft:\n\nHey {name}! 🌟 We noticed you looking at our premium plans. For the next 24 hours, upgrade to Starter and get 50% off your first month! Use code FAST50 at checkout. Let me know if you have any questions!")
          break
        case "segmentation":
          setOutput("Analyzed 12,405 contacts.\n\nSegments Created:\n- High-intent buyers (342 users)\n- Price sensitive (1,200 users)\n- Cold leads (8,500 users)")
          break
        case "scoring":
          setOutput("Successfully scored all active contacts. Check the CRM page to view individual scores. Top 10% of leads represent $45,000 in pipeline value.")
          break
      }
    }, 2000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 flex flex-col h-[calc(100vh-120px)]">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Brain className="w-6 h-6 text-emerald-500" /> AI Tools suite
        </h1>
        <p className="text-gray-500 mt-1">Supercharge your WhatsApp marketing with integrated intelligence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
        {aiTools.map(tool => (
          <button 
            key={tool.id}
            onClick={() => { setActiveTool(tool.id); setOutput("") }}
            className={`p-5 rounded-2xl border text-left flex flex-col h-full transition-all ${activeTool === tool.id ? "bg-emerald-500/10 border-emerald-500 shadow-xl shadow-emerald-500/10" : "bg-white border-gray-200 hover:border-gray-300"}`}
          >
            <tool.icon className={`w-8 h-8 mb-4 ${activeTool === tool.id ? "text-emerald-600" : "text-gray-400"}`} />
            <h3 className="font-bold text-gray-900 mb-2">{tool.name}</h3>
            <p className="text-gray-500 text-sm flex-1">{tool.desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Interactive Playground: {aiTools.find(t=>t.id === activeTool)?.name}</h2>
          <button 
            onClick={() => simulateAIOperation(activeTool)}
            disabled={loading}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Run Mock AI"}
          </button>
        </div>

        <div className="flex-1 bg-[#F0F2F5] border border-gray-200 rounded-xl p-4 font-mono text-sm text-gray-700 overflow-y-auto relative">
          {!output && !loading && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-600">
              Run the mock AI to view output
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-emerald-600 gap-3">
              <Loader2 className="w-6 h-6 animate-spin" /> Processing via OpenAI...
            </div>
          )}
          {output && (
            <div className="whitespace-pre-wrap">{output}</div>
          )}
        </div>
      </div>
    </div>
  )
}
