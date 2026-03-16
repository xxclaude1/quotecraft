import { useEffect, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { db } from '../db/database'
import { PageHeader } from '../components/layout/PageHeader'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Select } from '../components/ui/Select'
import type { SavedLineItem } from '../types'
import { formatCurrency } from '../utils/formatCurrency'
import { v4 as uuid } from 'uuid'

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'labour', label: 'Labour' },
  { value: 'materials', label: 'Materials' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'other', label: 'Other' },
]

const CATEGORY_COLORS: Record<string, string> = {
  labour: 'bg-blue-100 text-blue-700',
  materials: 'bg-amber-100 text-amber-700',
  equipment: 'bg-purple-100 text-purple-700',
  other: 'bg-gray-100 text-gray-600',
}

export function PriceBook() {
  const [items, setItems] = useState<SavedLineItem[]>([])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    description: '',
    category: 'labour' as SavedLineItem['category'],
    defaultQuantity: 1,
    unit: 'hours',
    unitPrice: 0,
  })

  const loadItems = () => db.savedLineItems.toArray().then(setItems)

  useEffect(() => {
    loadItems()
  }, [])

  const filtered = items.filter((item) => {
    const matchesSearch = item.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleSave = async () => {
    if (!formData.description.trim()) return
    await db.savedLineItems.add({ ...formData, id: uuid() })
    setFormData({ description: '', category: 'labour', defaultQuantity: 1, unit: 'hours', unitPrice: 0 })
    setShowForm(false)
    loadItems()
  }

  const handleDelete = async (id: string) => {
    await db.savedLineItems.delete(id)
    loadItems()
  }

  return (
    <div>
      <PageHeader
        title="Price Book"
        subtitle="Saved line items"
        action={
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus size={16} className="mr-1" /> Add
          </Button>
        }
      />

      {/* Search & Filter */}
      <div className="px-4 md:px-8 pb-3 flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6560]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full h-10 pl-9 pr-3 bg-white border border-[#DDD8D0] rounded text-sm outline-none focus:border-[#1A1A1A]"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 px-2 bg-white border border-[#DDD8D0] rounded text-sm outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="mx-4 md:mx-8 mb-4 p-4 bg-white border border-[#DDD8D0] rounded space-y-3">
          <h3 className="font-mono text-sm font-bold">New Item</h3>
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="e.g. General plumbing labour"
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as SavedLineItem['category'] })}
              options={CATEGORIES.filter((c) => c.value !== 'all')}
            />
            <Input
              label="Unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              placeholder="hours, each, m²"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Default Qty"
              type="number"
              value={String(formData.defaultQuantity)}
              onChange={(e) => setFormData({ ...formData, defaultQuantity: parseFloat(e.target.value) || 1 })}
              mono
            />
            <Input
              label="Unit Price"
              type="number"
              value={String(formData.unitPrice)}
              onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
              mono
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="border-t border-[#DDD8D0]">
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-[#6B6560] text-sm">No items found</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-4 md:px-8 py-3 border-b border-[#DDD8D0] hover:bg-[#EDE9E3] transition-colors duration-100"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1A1A1A] truncate">{item.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-mono ${CATEGORY_COLORS[item.category]}`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-[#6B6560]">
                    {item.defaultQuantity} {item.unit}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-sm font-bold text-[#1A1A1A]">
                  {formatCurrency(item.unitPrice)}
                </p>
                <p className="text-[10px] text-[#6B6560]">per {item.unit}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-[10px] text-[#B84233] hover:text-[#8e3428] ml-2"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
