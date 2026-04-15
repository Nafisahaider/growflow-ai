"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Founder, StyleNova",
    content: "GrowFlow AI tripled our WhatsApp sales in 3 weeks. The AI chatbot handles 80% of customer queries automatically. We can't imagine running without it.",
    rating: 5,
    initials: "PS",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "Karan Mehta",
    role: "CMO, FoodRush",
    content: "We ran our biggest Diwali campaign with 50,000 contacts in under 10 minutes. The AI campaign generator wrote better copy than our agency ever did.",
    rating: 5,
    initials: "KM",
    gradient: "from-cyan-500 to-indigo-500",
  },
  {
    name: "Lisa Park",
    role: "Head of Sales, TechEdge",
    content: "The lead scoring feature is incredible. We focus our sales reps only on contacts scoring above 80. Our close rate went from 12% to 34%.",
    rating: 5,
    initials: "LP",
    gradient: "from-purple-500 to-pink-500",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-950 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Loved by growth teams worldwide</h2>
          <p className="mt-4 text-slate-400 text-lg">Don't just take our word for it.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-slate-900 border border-white/5 rounded-2xl p-8 flex flex-col gap-5 hover:border-indigo-500/30 transition-colors"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed flex-1">"{t.content}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-slate-500 text-sm">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
