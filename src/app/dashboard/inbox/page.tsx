"use client"

import { Inbox as InboxIcon, Send, Search } from "lucide-react"

export default function InboxPage() {
  return (
    <div className="h-[calc(100vh-120px)] flex border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xl">
      {/* Sidebar Threads */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-500">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <InboxIcon className="w-5 h-5 text-emerald-500" /> Inbox
          </h2>
        </div>
        <div className="p-4 border-b border-gray-200">
           <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-[#F0F2F5] border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${i === 1 ? 'bg-emerald-500/10 border-l-2 border-l-emerald-500' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-gray-900 text-sm">Demo User {i}</span>
                <span className="text-xs text-gray-400">10:42 AM</span>
              </div>
              <p className="text-xs text-gray-500 truncate">I have a question about my recent order.</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#F0F2F5]">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-bold">D1</div>
               <div>
                  <h3 className="text-gray-900 font-semibold">Demo User 1</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                  </p>
               </div>
            </div>
            <button className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-md font-medium">Assign to me</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           {/* Messages */}
           <div className="flex justify-start">
             <div className="bg-gray-100 text-gray-900 p-3 rounded-2xl rounded-tl-none max-w-md text-sm shadow-sm">
                Hi, I wanted to know if you offer volume discounts?
             </div>
           </div>
           <div className="flex justify-start">
             <div className="bg-gray-100 text-gray-900 p-3 rounded-2xl rounded-tl-none max-w-md text-sm shadow-sm">
                We are a team of 15 looking for an enterprise tier.
             </div>
           </div>
           <div className="flex justify-end pt-4">
             <div className="bg-emerald-600 text-white p-3 rounded-2xl rounded-tr-none max-w-md text-sm shadow-sm">
                Absolutely! I'd be happy to discuss our Enterprise tier with you. Let me route this to our sales team.
             </div>
           </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-end gap-2 relative">
             <textarea 
               className="w-full bg-[#F0F2F5] border border-gray-200 rounded-xl p-3 pr-12 text-gray-900 resize-none h-14 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
               placeholder="Type a message or use '/ai' for suggested replies..." 
             />
             <button className="absolute right-2 bottom-2 p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
               <Send className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
