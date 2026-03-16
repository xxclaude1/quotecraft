import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Copy } from 'lucide-react'
import type { LineItem } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'

const UNITS = [
  { value: 'hours', label: 'hrs' },
  { value: 'each', label: 'ea' },
  { value: 'm²', label: 'm²' },
  { value: 'metres', label: 'm' },
  { value: 'litres', label: 'L' },
  { value: 'kg', label: 'kg' },
  { value: 'sqm', label: 'sqm' },
  { value: 'lm', label: 'lm' },
  { value: 'days', label: 'days' },
  { value: 'fixed', label: 'fixed' },
]

const CATEGORIES = [
  { value: 'labour', label: 'Labour' },
  { value: 'materials', label: 'Materials' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'other', label: 'Other' },
]

interface LineItemRowProps {
  item: LineItem
  onUpdate: (id: string, updates: Partial<LineItem>) => void
  onDelete: (id: string) => void
  onDuplicate: (item: LineItem) => void
}

export function LineItemRow({ item, onUpdate, onDelete, onDuplicate }: LineItemRowProps) {
  const [showActions, setShowActions] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const lineTotal = item.quantity * item.unitPrice

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border-b border-[#DDD8D0] bg-white ${isDragging ? 'opacity-50 shadow-lg z-10' : ''}`}
    >
      <div className="flex items-start gap-1 p-3">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-3 p-1 text-[#DDD8D0] hover:text-[#6B6560] cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical size={16} />
        </button>

        <div className="flex-1 min-w-0">
          {/* Description */}
          <input
            type="text"
            value={item.description}
            onChange={(e) => onUpdate(item.id, { description: e.target.value })}
            placeholder="Description"
            className="w-full text-sm text-[#1A1A1A] bg-transparent border-none outline-none placeholder:text-[#6B6560]/40 font-medium"
          />

          {/* Category & numbers row */}
          <div className="flex items-center gap-2 mt-2">
            <select
              value={item.category}
              onChange={(e) => onUpdate(item.id, { category: e.target.value as LineItem['category'] })}
              className="text-[10px] uppercase tracking-wider text-[#6B6560] bg-[#EDE9E3] border-none rounded px-1.5 py-0.5 outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            <div className="flex items-center gap-1 ml-auto">
              <input
                type="number"
                inputMode="decimal"
                value={item.quantity || ''}
                onChange={(e) => onUpdate(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                className="w-14 h-8 px-1.5 text-right font-mono text-sm bg-[#F5F2ED] border border-[#DDD8D0] rounded outline-none focus:border-[#1A1A1A]"
                placeholder="Qty"
              />

              <select
                value={item.unit}
                onChange={(e) => onUpdate(item.id, { unit: e.target.value })}
                className="h-8 px-1 text-xs text-[#6B6560] bg-[#F5F2ED] border border-[#DDD8D0] rounded outline-none focus:border-[#1A1A1A]"
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>

              <span className="text-xs text-[#6B6560] mx-0.5">@</span>

              <div className="relative">
                <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-[#6B6560]">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={item.unitPrice || ''}
                  onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                  className="w-20 h-8 pl-5 pr-1.5 text-right font-mono text-sm bg-[#F5F2ED] border border-[#DDD8D0] rounded outline-none focus:border-[#1A1A1A]"
                  placeholder="Price"
                />
              </div>
            </div>
          </div>

          {/* Line total & actions */}
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={() => setShowActions(!showActions)}
              className="text-[10px] text-[#6B6560]/50 hover:text-[#6B6560]"
            >
              {showActions ? 'Hide' : 'Actions'}
            </button>

            <div className="flex items-center gap-1">
              {showActions && (
                <>
                  <button
                    onClick={() => onDuplicate(item)}
                    className="p-1 text-[#6B6560] hover:text-[#1A1A1A] transition-colors duration-100"
                    title="Duplicate"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1 text-[#B84233] hover:text-[#8e3428] transition-colors duration-100"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              )}
              <span className="font-mono text-sm font-bold text-[#1A1A1A] ml-2">
                {formatCurrency(lineTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
