"use client"

import { motion } from "framer-motion"
import { Bot, Radio, Inbox, Users, LineChart } from "lucide-react"

const features = [
  {
    name: "AI Chatbot",
    description: "Build logic flows and let our GPT-4 integration automatically answer customer queries 24/7.",
    icon: Bot,
  },
  {
    name: "Campaign Broadcast",
    description: "Send thousands of personalized messages instantly. Avoid spam filters with smart scheduling.",
    icon: Radio,
  },
  {
    name: "Shared Inbox",
    description: "Your entire team can access the same WhatsApp number simultaneously from any device.",
    icon: Inbox,
  },
  {
    name: "Smart CRM",
    description: "Automatically tags, scores, and segments leads based on their chat behavior and AI interactions.",
    icon: Users,
  },
  {
    name: "Analytics",
    description: "Real-time metrics on open rates, reply rates, and conversion attribution for every campaign.",
    icon: LineChart,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-[#F0F2F5] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need to scale</h2>
          <p className="mt-4 text-lg text-gray-500">Stop juggling tools. GrowFlow AI replaces 5 different subscriptions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group rounded-2xl border border-gray-200 bg-gray-50 p-8 overflow-hidden hover:border-emerald-500/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.name}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
