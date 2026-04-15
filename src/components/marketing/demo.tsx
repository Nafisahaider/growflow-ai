"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipForward, Users, Megaphone, BarChart3, Bot } from "lucide-react"

const demoScreens = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    title: "Your command center",
    description: "Real-time metrics on every message, campaign, and conversion — all in one elegant view.",
    color: "indigo",
    mockContent: (
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-4 gap-3">
          {["12,405 Contacts", "484K Messages", "12 Campaigns", "$34K Revenue"].map((stat, i) => (
            <div key={i} className="bg-slate-800/80 rounded-xl p-3 border border-white/5">
              <div className="text-indigo-400 text-xs mb-1 font-medium">↑ +12%</div>
              <div className="text-white font-bold text-sm">{stat}</div>
            </div>
          ))}
        </div>
        <div className="bg-slate-800/80 rounded-xl p-3 border border-white/5 h-28 flex items-end gap-1 px-4">
          {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
            <div key={i} className="flex-1 bg-indigo-500/70 rounded-t-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Megaphone,
    title: "Broadcast at scale",
    description: "Create AI-powered campaigns in minutes. Schedule, segment, and send to thousands instantly.",
    color: "purple",
    mockContent: (
      <div className="p-4 space-y-3">
        {["Black Friday Promo 🔥", "Re-engagement Wave", "Product Launch"].map((name, i) => (
          <div key={i} className="bg-slate-800/80 rounded-xl p-3 border border-white/5 flex items-center justify-between">
            <div>
              <div className="text-white font-semibold text-sm">{name}</div>
              <div className="text-slate-400 text-xs mt-0.5">{["12,000 sent", "5,400 sent", "Draft"][i]}</div>
            </div>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${i === 2 ? "bg-slate-700 text-slate-400" : "bg-green-500/20 text-green-400"}`}>
              {["LIVE", "DONE", "DRAFT"][i]}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "contacts",
    label: "Contacts CRM",
    icon: Users,
    title: "Smart lead management",
    description: "Import, tag, and score your contacts automatically. Let AI identify your hottest leads.",
    color: "cyan",
    mockContent: (
      <div className="p-4 space-y-2">
        {[
          { name: "Sarah Johnson", tag: "Hot Lead", score: 94 },
          { name: "Raj Patel", tag: "VIP", score: 88 },
          { name: "Emma Chen", tag: "New", score: 72 },
          { name: "Mike Torres", tag: "Cold", score: 41 },
        ].map((c, i) => (
          <div key={i} className="bg-slate-800/80 rounded-xl px-3 py-2 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {c.name[0]}
              </div>
              <div>
                <div className="text-white text-sm font-medium">{c.name}</div>
                <span className="text-xs text-indigo-400">{c.tag}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-sm">{c.score}</div>
              <div className="text-slate-500 text-xs">AI Score</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "chatbot",
    label: "AI Chatbot",
    icon: Bot,
    title: "Automate every conversation",
    description: "Build flows visually. Your AI bot handles leads 24/7, qualifies them, and hands off to agents when needed.",
    color: "emerald",
    mockContent: (
      <div className="p-4 space-y-3">
        <div className="flex gap-3 items-start">
          <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
            <Bot className="w-3.5 h-3.5 text-green-400" />
          </div>
          <div className="bg-slate-800/80 rounded-2xl rounded-tl-none p-3 text-sm text-slate-200 border border-white/5 max-w-xs">
            Hi there! 👋 Welcome to GrowFlow. Are you looking to grow sales or support customers?
          </div>
        </div>
        <div className="flex gap-3 items-start justify-end">
          <div className="bg-indigo-600/70 rounded-2xl rounded-tr-none p-3 text-sm text-white max-w-xs">
            Grow sales! Tell me more about your pricing.
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
            <Bot className="w-3.5 h-3.5 text-green-400" />
          </div>
          <div className="bg-slate-800/80 rounded-2xl rounded-tl-none p-3 text-sm text-slate-200 border border-white/5 max-w-xs">
            Great choice! We start at just $49/month with 14-day free trial. Want me to send you the link? 🚀
          </div>
        </div>
      </div>
    ),
  },
]

export function Demo() {
  const [activeScreen, setActiveScreen] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const current = demoScreens[activeScreen]
  const Icon = current.icon

  const colorMap: Record<string, string> = {
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  }
  const glowMap: Record<string, string> = {
    indigo: "shadow-indigo-500/20",
    purple: "shadow-purple-500/20",
    cyan: "shadow-cyan-500/20",
    emerald: "shadow-emerald-500/20",
  }

  return (
    <section id="demo" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">See GrowFlow AI in action</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Click through each module to explore the platform before you even sign up.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Tab Selectors */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible w-full lg:w-56 shrink-0">
            {demoScreens.map((screen, i) => {
              const TabIcon = screen.icon
              const isActive = i === activeScreen
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all whitespace-nowrap font-medium text-sm ${
                    isActive
                      ? `${colorMap[screen.color]} shadow-lg ${glowMap[screen.color]}`
                      : "border-white/5 text-slate-400 hover:text-white hover:border-white/10 bg-slate-900/50"
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  {screen.label}
                </button>
              )
            })}
          </div>

          {/* Demo Window */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <div className="flex-1 mx-4 bg-slate-800 rounded px-3 py-1 text-xs text-slate-500 font-mono">
                    app.growflow.ai/{current.id}
                  </div>
                </div>

                {/* Screen mockup */}
                <div className="flex min-h-[320px]">
                  {/* Sidebar mock */}
                  <div className="hidden md:flex w-36 border-r border-white/5 bg-slate-950/60 flex-col py-4 px-2 gap-1">
                    {demoScreens.map((s, i) => {
                      const SIcon = s.icon
                      return (
                        <div key={s.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${i === activeScreen ? colorMap[current.color] : "text-slate-600"}`}>
                          <SIcon className="w-3.5 h-3.5 shrink-0" />
                          {s.label}
                        </div>
                      )
                    })}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {current.mockContent}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Caption */}
            <motion.div
              key={current.id + "-caption"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex items-start gap-4"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${colorMap[current.color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">{current.title}</h3>
                <p className="text-slate-400">{current.description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
