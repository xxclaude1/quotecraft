import { useEffect, useState } from 'react'
import { Plus, Search, Trash2 } from 'lucide-react'
import { db } from '../db/database'
import { PageHeader } from '../components/layout/PageHeader'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Select } from '../components/ui/Select'
import type { SavedLineItem } from '../types'
import { formatCurrency } from '../utils/formatCurrency'
import { v4 as uuid } from 'uuid'

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'labour', label: 'Labour' },
  { value: 'materials', label: 'Materials' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'other', label: 'Other' },
]

const CATEGORY_STYLES: Record<string, string> = {
  labour: 'bg-blue-50 text-blue-600 border-blue-200',
  materials: 'bg-amber-50 text-amber-600 border-amber-200',
  equipment: 'bg-violet-50 text-violet-600 border-violet-200',
  other: 'bg-stone-100 text-stone-500 border-stone-200',
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
    <div className="pb-8">
      <PageHeader
        title="Price Book"
        subtitle={`${items.length} saved items`}
        action={
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus size={15} className="mr-1" /> Add Item
          </Button>
        }
      />

      {/* Search & Filter */}
      <div className="px-5 md:px-8 pb-4 flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full h-11 pl-10 pr-4 bg-white border border-stone-300 rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-11 px-3 bg-white border border-stone-300 rounded-lg text-[13px] text-stone-700 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent appearance-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="mx-5 md:mx-8 mb-5 p-5 bg-white border border-stone-200 rounded-xl shadow-sm space-y-4">
          <h3 className="font-mono text-[14px] font-medium text-stone-900">New Price Book Item</h3>
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
              label="Unit Price ($)"
              type="number"
              value={String(formData.unitPrice)}
              onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
              mono
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button onClick={handleSave}>Save Item</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="divide-y divide-stone-200/60">
        {filtered.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-[14px] text-stone-600 font-medium">No items found</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-4 px-5 md:px-8 py-4 hover:bg-white transition-all duration-100"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-stone-900 truncate">{item.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-md border ${CATEGORY_STYLES[item.category]}`}>
                    {item.category}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {item.defaultQuantity} {item.unit}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-[15px] font-medium text-stone-900 tabular-nums">
                  {formatCurrency(item.unitPrice)}
                </p>
                <p className="text-[11px] text-stone-400">per {item.unit}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-stone-300 hover:text-error rounded-lg hover:bg-error/5 opacity-0 group-hover:opacity-100 transition-all duration-100"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
