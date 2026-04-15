"use client"

import { motion } from "framer-motion"

const metrics = [
  { value: "98%", label: "Open Rate" },
  { value: "4.2x", label: "ROI vs Email" },
  { value: "50k+", label: "Businesses" },
  { value: "2B+", label: "Messages Sent" },
]

const brands = ["Shopify", "Zomato", "Razorpay", "CRED", "Meesho", "PhonePe"]

export function Trust() {
  return (
    <section className="py-20 bg-slate-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-500 text-sm font-medium tracking-widest uppercase mb-10">
          Trusted by 50,000+ businesses worldwide
        </p>

        {/* Brand Logos */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-slate-500 font-bold text-xl tracking-tight hover:text-slate-300 transition-colors cursor-default"
            >
              {brand}
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
                {m.value}
              </div>
              <div className="text-slate-400 text-sm">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
