"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BotMessageSquare, Loader2 } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F0F2F5] text-gray-900 font-sans">
      <div className="hidden lg:flex w-1/2 bg-white border-r border-gray-200 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20" />
        <Link href="/" className="relative z-10 flex items-center gap-2">
          <BotMessageSquare className="w-8 h-8 text-emerald-500" />
          <span className="text-xl font-bold tracking-tight">GrowFlow AI</span>
        </Link>
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold mb-4">Welcome back to your command center.</h2>
          <p className="text-gray-500 text-lg">
            Log in to manage your campaigns, review AI chats, and engage with your leads.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center lg:text-left">
            <BotMessageSquare className="w-10 h-10 text-emerald-500 mx-auto lg:hidden mb-4" />
            <h2 className="text-3xl font-bold">Sign in to your account</h2>
            <p className="mt-2 text-gray-500">Don't have an account? <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">Sign up</Link></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input required name="email" type="email" className="mt-2 block w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input required name="password" type="password" className="mt-2 block w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="••••••••" />
            </div>
            
            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
