import { useEffect, useState } from 'react'
import { Search, Plus, Phone, Mail, ChevronRight } from 'lucide-react'
import { useClientStore } from '../store/clientStore'
import { useQuoteStore } from '../store/quoteStore'
import { PageHeader } from '../components/layout/PageHeader'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import type { Client } from '../types'

export function Clients() {
  const { clients, loadClients, addClient, updateClient } = useClientStore()
  const { quotes, loadQuotes } = useQuoteStore()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '', notes: '' })

  useEffect(() => {
    loadClients()
    loadQuotes()
  }, [loadClients, loadQuotes])

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address?.toLowerCase().includes(search.toLowerCase())
  )

  const clientQuoteCount = (clientId: string) =>
    quotes.filter((q) => q.clientId === clientId).length

  const handleSave = async () => {
    if (!formData.name.trim()) return
    if (editingClient) {
      await updateClient(editingClient.id, formData)
    } else {
      await addClient(formData)
    }
    setFormData({ name: '', phone: '', email: '', address: '', notes: '' })
    setShowForm(false)
    setEditingClient(null)
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      phone: client.phone ?? '',
      email: client.email ?? '',
      address: client.address ?? '',
      notes: client.notes ?? '',
    })
    setShowForm(true)
  }

  return (
    <div className="pb-8">
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} contacts`}
        action={
          <Button size="sm" onClick={() => { setShowForm(true); setEditingClient(null); setFormData({ name: '', phone: '', email: '', address: '', notes: '' }) }}>
            <Plus size={15} className="mr-1" /> Add Client
          </Button>
        }
      />

      {/* Search */}
      <div className="px-5 md:px-8 pb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or address..."
            className="w-full h-11 pl-10 pr-4 bg-white border border-stone-300 rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-100"
          />
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mx-5 md:mx-8 mb-5 p-5 bg-white border border-stone-200 rounded-xl shadow-sm space-y-4">
          <h3 className="font-mono text-[14px] font-medium text-stone-900">
            {editingClient ? 'Edit Client' : 'New Client'}
          </h3>
          <Input label="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Client name" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="0412 345 678" type="tel" />
            <Input label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" type="email" />
          </div>
          <Input label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Street address" />
          <Input label="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Any notes" />
          <div className="flex gap-2 pt-1">
            <Button onClick={handleSave}>{editingClient ? 'Update' : 'Save Client'}</Button>
            <Button variant="ghost" onClick={() => { setShowForm(false); setEditingClient(null) }}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Client List */}
      <div className="divide-y divide-stone-200/60">
        {filtered.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <div className="w-12 h-12 bg-stone-200 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Search size={20} className="text-stone-400" />
            </div>
            <p className="text-[14px] text-stone-600 font-medium">No clients found</p>
            <p className="text-[12px] text-stone-400 mt-1">Try a different search or add a new client</p>
          </div>
        ) : (
          filtered.map((client) => (
            <button
              key={client.id}
              onClick={() => handleEdit(client)}
              className="group w-full flex items-center gap-3.5 px-5 py-4 md:px-8 text-left hover:bg-white active:bg-stone-200/60 transition-all duration-100"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-200 flex items-center justify-center text-[14px] font-mono font-medium text-stone-600 shrink-0">
                {client.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-stone-900 truncate">{client.name}</p>
                {client.address && (
                  <p className="text-[12px] text-stone-500 truncate mt-0.5">{client.address}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] text-stone-400 font-mono mr-1">
                  {clientQuoteCount(client.id)} quotes
                </span>
                {client.phone && (
                  <a
                    href={`tel:${client.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-stone-300 hover:text-success rounded-lg hover:bg-success/8 transition-colors duration-100"
                  >
                    <Phone size={15} />
                  </a>
                )}
                {client.email && (
                  <a
                    href={`mailto:${client.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-stone-300 hover:text-success rounded-lg hover:bg-success/8 transition-colors duration-100"
                  >
                    <Mail size={15} />
                  </a>
                )}
                <ChevronRight size={14} className="text-stone-300 group-hover:text-stone-500 ml-1" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
