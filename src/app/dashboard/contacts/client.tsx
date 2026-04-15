"use client"

import { useState } from "react"
import { Search, Plus, Upload, MoreHorizontal, Loader2, X } from "lucide-react"
import { useRouter } from "next/navigation"

type Contact = {
  id: string
  name: string
  phone: string
  tags: string[]
  createdAt: string
}

export function ContactsClient({ initialContacts }: { initialContacts: Contact[] }) {
  const router = useRouter()
  const [contacts, setContacts] = useState(initialContacts)
  const [search, setSearch] = useState("")
  const [isModalOpen, setModalOpen] = useState(false)
  const [isImportOpen, setImportOpen] = useState(false)
  
  const [newContact, setNewContact] = useState({ name: "", phone: "", tags: "" })
  const [loading, setLoading] = useState(false)

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search) ||
    c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const tagArray = newContact.tags.split(",").map(t => t.trim()).filter(t => t)

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newContact.name,
          phone: newContact.phone,
          tags: JSON.stringify(tagArray)
        })
      })
      if (res.ok) {
        const data = await res.json()
        setContacts([{
          ...data,
          tags: JSON.parse(data.tags || "[]")
        }, ...contacts])
        setModalOpen(false)
        setNewContact({ name: "", phone: "", tags: "" })
      }
    } catch (e) {}
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts (CRM)</h1>
          <p className="text-gray-500 mt-1">Manage your leads and segment your audience.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setImportOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-slate-700 text-gray-900 rounded-lg transition-colors border border-gray-200"
          >
            <Upload className="w-4 h-4" />
            Import CSV
          </button>
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-gray-200 bg-gray-500">
          <div className="relative max-w-sm">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, phone, or tag..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#F0F2F5] border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 relative">
            <thead className="bg-white/80 text-gray-500 text-xs uppercase border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Phone Number</th>
                <th className="px-6 py-4 font-medium">Tags</th>
                <th className="px-6 py-4 font-medium">Added On</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-white">
              {filteredContacts.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">No contacts found. Try adjusting your search or add a new one.</td></tr>
              ) : (
                filteredContacts.map(contact => (
                  <tr key={contact.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                    <td className="px-6 py-4">{contact.phone}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 flex-wrap">
                        {contact.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">{new Date(contact.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#F0F2F5]/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Add New Contact</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddContact} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input required value={newContact.name} onChange={e=>setNewContact({...newContact, name: e.target.value})} className="mt-2 block w-full bg-[#F0F2F5] border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Jane Smith" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input required value={newContact.phone} onChange={e=>setNewContact({...newContact, phone: e.target.value})} className="mt-2 block w-full bg-[#F0F2F5] border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="+1 234 567 8900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                <input value={newContact.tags} onChange={e=>setNewContact({...newContact, tags: e.target.value})} className="mt-2 block w-full bg-[#F0F2F5] border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="vip, summer-campaign, lead" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">Cancel</button>
                <button disabled={loading} type="submit" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import CSV Modal  */}
      {isImportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#F0F2F5]/80 backdrop-blur-sm" onClick={() => setImportOpen(false)} />
          <div className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl p-6 text-center">
            <Upload className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Import Contacts via CSV</h3>
            <p className="text-gray-500 mb-6">Upload a CSV file with "name", "phone", and "tags" columns.</p>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 hover:border-emerald-500/50 transition-colors cursor-pointer mb-6 text-gray-700">
              Click to browse files or drag and drop
            </div>
            <button onClick={() => setImportOpen(false)} className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
