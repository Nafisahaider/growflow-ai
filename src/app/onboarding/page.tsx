"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BotMessageSquare, CheckCircle2, ChevronRight, Loader2, Upload } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
  })

  const nextStep = () => setStep((s) => Math.min(s + 1, 4))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const completeOnboarding = async () => {
    setLoading(true)
    // Mock save logic to DB
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    router.push("/dashboard")
  }

  const handleSimulateWhatsAppConnect = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    nextStep()
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
        {/* Progress header */}
        <div className="bg-[#F0F2F5]/50 p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BotMessageSquare className="w-6 h-6 text-emerald-500" />
            <span className="text-lg font-bold text-gray-900">Setup</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Step {step} of 4
          </div>
        </div>

        <div className="p-8 md:p-12 min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center md:text-left mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Tell us about your business</h2>
                  <p className="mt-2 text-gray-500">This helps us tailor our AI to your specific needs.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <input
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="mt-2 block w-full bg-[#F0F2F5] border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="mt-2 block w-full bg-[#F0F2F5] border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                  >
                    <option value="">Select industry</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="saas">SaaS</option>
                    <option value="agency">Agency</option>
                    <option value="local">Local Business</option>
                  </select>
                </div>
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!formData.businessName || !formData.industry}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BotMessageSquare className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Connect WhatsApp</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Link your WhatsApp Business Account. For this demo, we will simulate a successful connection.
                </p>
                <div className="pt-8">
                  <button
                    onClick={handleSimulateWhatsAppConnect}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full max-w-sm mx-auto bg-[#25D366] hover:bg-[#20bd5a] text-gray-900 px-6 py-4 rounded-xl font-bold text-lg transition-all"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Connect with Facebook"}
                  </button>
                  <button onClick={nextStep} className="mt-4 text-gray-400 hover:text-gray-700 text-sm">
                    Skip for now
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Import Contacts</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Upload a CSV file containing your existing leads, or start fresh and let them come to you.
                </p>
                
                <div className="pt-8 border-2 border-dashed border-gray-200 rounded-2xl p-12 hover:border-emerald-500/50 transition-colors mx-auto max-w-md cursor-pointer group">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4 group-hover:text-emerald-600 transition-colors" />
                  <p className="text-gray-700 font-medium">Click to upload CSV</p>
                  <p className="text-gray-400 text-sm mt-1">or drag and drop</p>
                </div>

                <div className="pt-6 flex items-center justify-center gap-4">
                  <button onClick={nextStep} className="text-gray-500 hover:text-gray-900 px-6 py-3 font-medium transition-colors">
                    Skip
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <div className="w-20 h-20 bg-teal-500/10 border border-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-teal-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">You're all set!</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Your GrowFlow workspace is ready. Let's head over to the dashboard to create your first AI campaign.
                </p>
                <div className="pt-8">
                  <button
                    onClick={completeOnboarding}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full max-w-sm mx-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-gray-900 px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-emerald-500/25 transition-all"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Go to Dashboard"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
