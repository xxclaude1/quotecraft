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
  { value: 'labour', label: 'Labour', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { value: 'materials', label: 'Materials', color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { value: 'equipment', label: 'Equipment', color: 'bg-violet-50 text-violet-600 border-violet-200' },
  { value: 'other', label: 'Other', color: 'bg-stone-100 text-stone-500 border-stone-200' },
]

interface LineItemRowProps {
  item: LineItem
  onUpdate: (id: string, updates: Partial<LineItem>) => void
  onDelete: (id: string) => void
  onDuplicate: (item: LineItem) => void
}

export function LineItemRow({ item, onUpdate, onDelete, onDuplicate }: LineItemRowProps) {
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
  const categoryConfig = CATEGORIES.find((c) => c.value === item.category)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white transition-shadow duration-100 ${isDragging ? 'opacity-60 shadow-xl z-10 rounded-lg' : ''}`}
    >
      <div className="flex items-start gap-2 px-4 py-4 md:px-6">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-1 p-0.5 text-stone-300 hover:text-stone-500 cursor-grab active:cursor-grabbing touch-none shrink-0"
        >
          <GripVertical size={16} />
        </button>

        <div className="flex-1 min-w-0">
          {/* Description row */}
          <div className="flex items-start gap-2">
            <input
              type="text"
              value={item.description}
              onChange={(e) => onUpdate(item.id, { description: e.target.value })}
              placeholder="Item description"
              className="flex-1 text-[14px] text-stone-900 bg-transparent border-none outline-none placeholder:text-stone-300 font-medium leading-snug"
            />
            {/* Actions */}
            <div className="flex items-center gap-0.5 shrink-0 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-100 md:opacity-100">
              <button
                onClick={() => onDuplicate(item)}
                className="p-1.5 text-stone-300 hover:text-stone-600 rounded-md hover:bg-stone-100 transition-colors duration-100"
                title="Duplicate"
              >
                <Copy size={13} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-1.5 text-stone-300 hover:text-error rounded-md hover:bg-error/5 transition-colors duration-100"
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {/* Category + Qty + Price row */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <select
              value={item.category}
              onChange={(e) => onUpdate(item.id, { category: e.target.value as LineItem['category'] })}
              className={`text-[10px] uppercase tracking-widest font-medium border rounded-md px-2 py-1 outline-none appearance-none cursor-pointer ${categoryConfig?.color ?? ''}`}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 ml-auto">
              <input
                type="number"
                inputMode="decimal"
                value={item.quantity || ''}
                onChange={(e) => onUpdate(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                className="w-16 h-8 px-2 text-right font-mono text-[13px] text-stone-900 bg-stone-50 border border-stone-200 rounded-md outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent transition-all duration-100"
                placeholder="Qty"
              />

              <select
                value={item.unit}
                onChange={(e) => onUpdate(item.id, { unit: e.target.value })}
                className="h-8 px-1.5 text-[12px] text-stone-600 bg-stone-50 border border-stone-200 rounded-md outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent appearance-none cursor-pointer"
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>

              <span className="text-[11px] text-stone-300 font-mono">@</span>

              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[12px] text-stone-400 font-mono">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={item.unitPrice || ''}
                  onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                  className="w-24 h-8 pl-6 pr-2 text-right font-mono text-[13px] text-stone-900 bg-stone-50 border border-stone-200 rounded-md outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent transition-all duration-100"
                  placeholder="0.00"
                />
              </div>

              {/* Line total */}
              <div className="min-w-[90px] text-right pl-2 border-l border-stone-200">
                <span className="font-mono text-[14px] font-medium text-stone-900 tabular-nums">
                  {formatCurrency(lineTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
