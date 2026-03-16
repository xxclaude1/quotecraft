import { useEffect, useState } from 'react'
import { Search, Plus, Phone, Mail } from 'lucide-react'
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
    <div>
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} contacts`}
        action={
          <Button size="sm" onClick={() => { setShowForm(true); setEditingClient(null); setFormData({ name: '', phone: '', email: '', address: '', notes: '' }) }}>
            <Plus size={16} className="mr-1" /> Add
          </Button>
        }
      />

      {/* Search */}
      <div className="px-4 md:px-8 pb-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6560]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or address"
            className="w-full h-10 pl-9 pr-3 bg-white border border-[#DDD8D0] rounded text-sm outline-none focus:border-[#1A1A1A] transition-colors duration-100"
          />
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mx-4 md:mx-8 mb-4 p-4 bg-white border border-[#DDD8D0] rounded space-y-3">
          <h3 className="font-mono text-sm font-bold">{editingClient ? 'Edit Client' : 'New Client'}</h3>
          <Input label="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Client name" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="0412 345 678" type="tel" />
            <Input label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" type="email" />
          </div>
          <Input label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Street address" />
          <Input label="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Any notes" />
          <div className="flex gap-2">
            <Button onClick={handleSave}>{editingClient ? 'Update' : 'Save'}</Button>
            <Button variant="ghost" onClick={() => { setShowForm(false); setEditingClient(null) }}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Client List */}
      <div className="border-t border-[#DDD8D0]">
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-[#6B6560] text-sm">No clients found</p>
          </div>
        ) : (
          filtered.map((client) => (
            <button
              key={client.id}
              onClick={() => handleEdit(client)}
              className="w-full flex items-center gap-3 px-4 md:px-8 py-3 text-left hover:bg-[#EDE9E3] active:bg-[#DDD8D0] transition-colors duration-100 border-b border-[#DDD8D0]"
            >
              <div className="w-9 h-9 rounded bg-[#EDE9E3] flex items-center justify-center text-sm font-mono font-bold text-[#6B6560] shrink-0">
                {client.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1A1A1A] truncate">{client.name}</p>
                {client.address && (
                  <p className="text-xs text-[#6B6560] truncate">{client.address}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-[#6B6560] font-mono">
                  {clientQuoteCount(client.id)} quotes
                </span>
                {client.phone && (
                  <a
                    href={`tel:${client.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-[#6B6560] hover:text-[#2A7D6E]"
                  >
                    <Phone size={14} />
                  </a>
                )}
                {client.email && (
                  <a
                    href={`mailto:${client.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-[#6B6560] hover:text-[#2A7D6E]"
                  >
                    <Mail size={14} />
                  </a>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
