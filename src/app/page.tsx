import { Navbar } from "@/components/marketing/navbar"
import { Hero } from "@/components/marketing/hero"
import { Trust } from "@/components/marketing/trust"
import { Features } from "@/components/marketing/features"
import { Demo } from "@/components/marketing/demo"
import { Testimonials } from "@/components/marketing/testimonials"
import { FAQ } from "@/components/marketing/faq"
import { Footer } from "@/components/marketing/footer"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30">
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <section id="features">
          <Features />
        </section>
        <Demo />
        <Testimonials />

        {/* Pricing Preview CTA Banner */}
        <section className="py-20 bg-slate-900 border-y border-white/5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start free. Scale when ready.</h2>
            <p className="text-slate-400 text-lg mb-8">
              No credit card required. 14-day trial on all paid plans. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-colors shadow-lg shadow-indigo-500/20"
              >
                Start Free Trial
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        <FAQ />
        <Footer />
      </main>
    </div>
  )
}
