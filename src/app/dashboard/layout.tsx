"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  BotMessageSquare, 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  Inbox, 
  Bot, 
  Sparkles, 
  BarChart, 
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  X
} from "lucide-react"
import { useState, useEffect } from "react"
import { signOut } from "next-auth/react"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Contacts", href: "/dashboard/contacts", icon: Users },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { name: "Inbox", href: "/dashboard/inbox", icon: Inbox },
  { name: "Chatbot", href: "/dashboard/chatbot", icon: Bot },
  { name: "AI Tools", href: "/dashboard/ai", icon: Sparkles },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  if (status === "loading" || status === "unauthenticated") {
    return <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="h-20 flex items-center px-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <BotMessageSquare className="w-8 h-8 text-emerald-500" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">GrowFlow</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-gray-500 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-900">
              <Menu className="w-6 h-6" />
            </button>
            <BotMessageSquare className="w-8 h-8 text-emerald-500" />
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-[#F0F2F5] border border-gray-200 rounded-full px-4 py-2 w-96 max-w-md text-gray-500 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition-all">
            <Search className="w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search contacts, campaigns..." 
              className="bg-transparent border-none outline-none text-sm w-full text-gray-900 placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <button className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-inner flex items-center justify-center text-gray-900 font-bold text-xs ring-2 ring-white/10">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-x-hidden p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#F0F2F5]/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col shadow-2xl">
            <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
              <Link href="/" className="flex items-center gap-2">
                <BotMessageSquare className="w-8 h-8 text-emerald-500" />
                <span className="text-xl font-bold text-gray-900 tracking-tight">GrowFlow</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
