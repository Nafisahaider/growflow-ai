"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const faqs = [
  {
    q: "Does GrowFlow AI work with the official WhatsApp Business API?",
    a: "Yes! GrowFlow AI is built on the official WhatsApp Business API via Meta's Cloud API, ensuring your messages are delivered reliably and your account is never at risk of being banned.",
  },
  {
    q: "How does the AI campaign generator work?",
    a: "Simply describe your campaign goal (e.g., 'promote 20% off sale for summer products') and our GPT-4 powered generator writes multiple high-converting message variants for you. You can edit, approve, and launch in seconds.",
  },
  {
    q: "Can I import my existing contacts?",
    a: "Absolutely. You can import up to unlimited contacts via CSV file. Our system automatically deduplicates and validates phone numbers for you.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes! Our Free plan lets you get started with up to 500 contacts and 3 campaigns per month — no credit card required. Upgrade when you're ready to scale.",
  },
  {
    q: "What happens if I exceed my plan limits?",
    a: "We'll notify you before you hit your limits. You can upgrade at any time with one click, or enable pay-as-you-go usage billing through Stripe.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is encrypted at rest and in transit. We are SOC 2 Type II compliant and never share your data with third parties. You can export or delete your data at any time.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-slate-900 border-t border-white/5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-4 text-slate-400">Everything you need to know about GrowFlow AI.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/5 rounded-xl overflow-hidden bg-slate-950/50">
              <button
                className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 text-white font-medium hover:bg-white/[0.03] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
