"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#F0F2F5] pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-sm font-medium mb-8 border border-emerald-500/20">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            GrowFlow AI Version 1.0 is live
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8">
            Turn WhatsApp into your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-400">
              #1 sales machine
            </span>
          </h1>

          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Automate conversations with AI, broadcast campaigns to thousands, and manage all your leads in one smart shared inbox.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full overflow-hidden transition-all hover:bg-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative">Start Free Trial</span>
              <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-50 text-gray-900 font-semibold rounded-full border border-gray-200 hover:bg-gray-100 transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              Watch Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
