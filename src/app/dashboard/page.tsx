"use client"

import { Users, Megaphone, Zap, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const stats = [
  { name: "Total Contacts", value: "12,405", trend: "+14.2%", isPositive: true, icon: Users },
  { name: "Messages Sent", value: "484,392", trend: "+28.4%", isPositive: true, icon: Megaphone },
  { name: "Active Campaigns", value: "12", trend: "-2.1%", isPositive: false, icon: Zap },
  { name: "Revenue", value: "$34,290", trend: "+8.4%", isPositive: true, icon: DollarSign },
]

const performanceData = [
  { name: "Mon", open: 4000, click: 2400 },
  { name: "Tue", open: 3000, click: 1398 },
  { name: "Wed", open: 2000, click: 9800 },
  { name: "Thu", open: 2780, click: 3908 },
  { name: "Fri", open: 1890, click: 4800 },
  { name: "Sat", open: 2390, click: 3800 },
  { name: "Sun", open: 3490, click: 4300 },
]

const engagementData = [
  { name: "Week 1", rate: 65 },
  { name: "Week 2", rate: 68 },
  { name: "Week 3", rate: 62 },
  { name: "Week 4", rate: 74 },
  { name: "Week 5", rate: 85 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your WhatsApp campaigns today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? "text-green-400" : "text-red-400"}`}>
                  {stat.trend}
                  {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Performance (This Week)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Line type="monotone" dataKey="open" stroke="#6366f1" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="click" stroke="#a855f7" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="rate" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
