import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { Plus, ArrowLeft, Send, ChevronDown } from 'lucide-react'
import { useQuoteStore } from '../store/quoteStore'
import { useClientStore } from '../store/clientStore'
import { LineItemRow } from '../components/quote/LineItemRow'
import { TotalsPanel } from '../components/quote/TotalsPanel'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import type { LineItem, Quote } from '../types'

const VALIDITY_OPTIONS = [
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' },
  { value: '60', label: '60 days' },
]

export function QuoteBuilder() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    currentQuote,
    loadQuote,
    createQuote,
    updateQuote,
    addLineItem,
    updateLineItem,
    removeLineItem,
    reorderLineItems,
  } = useQuoteStore()
  const { clients, loadClients } = useClientStore()

  const [showClientSelect, setShowClientSelect] = useState(false)
  const [clientSearch, setClientSearch] = useState('')

  useEffect(() => {
    loadClients()
    if (id === 'new') {
      createQuote().then((q) => {
        navigate(`/quotes/${q.id}`, { replace: true })
      })
    } else if (id) {
      loadQuote(id)
    }
  }, [id, loadQuote, createQuote, navigate, loadClients])

  const quote = currentQuote

  const handleUpdate = useCallback(
    (updates: Partial<Quote>) => {
      if (quote) updateQuote(quote.id, updates)
    },
    [quote, updateQuote]
  )

  const handleLineItemUpdate = useCallback(
    (itemId: string, updates: Partial<LineItem>) => {
      if (quote) updateLineItem(quote.id, itemId, updates)
    },
    [quote, updateLineItem]
  )

  const handleAddLineItem = useCallback(() => {
    if (quote) addLineItem(quote.id)
  }, [quote, addLineItem])

  const handleDeleteLineItem = useCallback(
    (itemId: string) => {
      if (quote) removeLineItem(quote.id, itemId)
    },
    [quote, removeLineItem]
  )

  const handleDuplicateLineItem = useCallback(
    (item: LineItem) => {
      if (quote) {
        addLineItem(quote.id, {
          description: item.description,
          category: item.category,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
        })
      }
    },
    [quote, addLineItem]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!quote) return
      const { active, over } = event
      if (!over || active.id === over.id) return

      const oldIndex = quote.lineItems.findIndex((i) => i.id === active.id)
      const newIndex = quote.lineItems.findIndex((i) => i.id === over.id)
      const reordered = arrayMove(quote.lineItems, oldIndex, newIndex)
      reorderLineItems(quote.id, reordered)
    },
    [quote, reorderLineItems]
  )

  const handleSend = useCallback(() => {
    if (quote) {
      updateQuote(quote.id, { status: 'sent', sentAt: new Date() })
    }
  }, [quote, updateQuote])

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  )

  const selectedClient = clients.find((c) => c.id === quote?.clientId)

  if (!quote) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#6B6560] font-mono text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="pb-48">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 md:px-8 border-b border-[#DDD8D0] bg-white">
        <button onClick={() => navigate('/')} className="p-1 text-[#6B6560] hover:text-[#1A1A1A]">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <span className="font-mono text-xs text-[#6B6560]">{quote.quoteNumber}</span>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs uppercase font-mono tracking-wider ${
                quote.status === 'draft' ? 'text-[#6B6560]' : 'text-[#E8580C]'
              }`}
            >
              {quote.status}
            </span>
          </div>
        </div>
        {quote.status === 'draft' && (
          <Button onClick={handleSend} size="sm" className="gap-1.5">
            <Send size={14} />
            Send
          </Button>
        )}
      </div>

      {/* Quote Form */}
      <div className="p-4 md:p-8 space-y-4">
        {/* Job Title */}
        <Input
          value={quote.jobTitle}
          onChange={(e) => handleUpdate({ jobTitle: e.target.value })}
          placeholder="Job title — e.g. Bathroom reno, 42 Smith St"
          label="Job Title"
          className="text-base font-medium"
        />

        {/* Client Select */}
        <div>
          <label className="text-xs font-light text-[#6B6560] uppercase tracking-wider">
            Client
          </label>
          <button
            onClick={() => setShowClientSelect(!showClientSelect)}
            className="w-full h-11 px-3 mt-1 bg-white border border-[#DDD8D0] rounded text-left flex items-center justify-between text-sm text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors duration-100"
          >
            <span className={selectedClient ? '' : 'text-[#6B6560]/50'}>
              {selectedClient?.name ?? 'Select client (optional)'}
            </span>
            <ChevronDown size={16} className="text-[#6B6560]" />
          </button>

          {showClientSelect && (
            <div className="mt-1 bg-white border border-[#DDD8D0] rounded shadow-sm max-h-48 overflow-y-auto">
              <div className="p-2 border-b border-[#DDD8D0]">
                <input
                  type="text"
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Search clients..."
                  className="w-full text-sm bg-transparent outline-none"
                  autoFocus
                />
              </div>
              <button
                onClick={() => {
                  handleUpdate({ clientId: undefined })
                  setShowClientSelect(false)
                }}
                className="w-full px-3 py-2 text-left text-sm text-[#6B6560] hover:bg-[#EDE9E3]"
              >
                No client
              </button>
              {filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    handleUpdate({ clientId: client.id })
                    setShowClientSelect(false)
                    setClientSearch('')
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-[#1A1A1A] hover:bg-[#EDE9E3]"
                >
                  {client.name}
                  {client.address && (
                    <span className="block text-[10px] text-[#6B6560]">{client.address}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Validity */}
        <div>
          <label className="text-xs font-light text-[#6B6560] uppercase tracking-wider">
            Valid For
          </label>
          <div className="flex gap-1.5 mt-1">
            {VALIDITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleUpdate({ validForDays: parseInt(opt.value) as Quote['validForDays'] })}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors duration-100 ${
                  quote.validForDays === parseInt(opt.value)
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-white border border-[#DDD8D0] text-[#6B6560] hover:bg-[#EDE9E3]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div>
        <div className="flex items-center justify-between px-4 md:px-8 py-2">
          <h3 className="text-xs font-light text-[#6B6560] uppercase tracking-wider">
            Line Items ({quote.lineItems.length})
          </h3>
        </div>

        <div className="border-t border-[#DDD8D0]">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={quote.lineItems.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              {quote.lineItems.map((item) => (
                <LineItemRow
                  key={item.id}
                  item={item}
                  onUpdate={handleLineItemUpdate}
                  onDelete={handleDeleteLineItem}
                  onDuplicate={handleDuplicateLineItem}
                />
              ))}
            </SortableContext>
          </DndContext>

          {quote.lineItems.length === 0 && (
            <div className="px-4 py-8 text-center bg-white border-b border-[#DDD8D0]">
              <p className="text-sm text-[#6B6560]">No line items yet</p>
              <p className="text-xs text-[#6B6560]/50 mt-1">
                Tap the + button below to add items
              </p>
            </div>
          )}
        </div>

        {/* Add line item button */}
        <div className="px-4 py-3 md:px-8">
          <button
            onClick={handleAddLineItem}
            className="w-full flex items-center justify-center gap-1.5 py-3 border-2 border-dashed border-[#DDD8D0] rounded text-sm text-[#6B6560] hover:border-[#E8580C] hover:text-[#E8580C] transition-colors duration-100"
          >
            <Plus size={16} />
            Add Line Item
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="px-4 md:px-8 py-2">
        <label className="text-xs font-light text-[#6B6560] uppercase tracking-wider">
          Notes / Scope of Work
        </label>
        <textarea
          value={quote.notes ?? ''}
          onChange={(e) => handleUpdate({ notes: e.target.value })}
          placeholder="Terms, exclusions, scope details..."
          rows={3}
          className="w-full mt-1 px-3 py-2 bg-white border border-[#DDD8D0] rounded text-sm text-[#1A1A1A] placeholder:text-[#6B6560]/40 outline-none focus:border-[#1A1A1A] resize-y"
        />
      </div>

      {/* Sticky Totals */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:left-56 z-40 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
        <TotalsPanel
          lineItems={quote.lineItems}
          includeGst={quote.includeGst}
          discountType={quote.discountType}
          discountValue={quote.discountValue}
          onGstToggle={(includeGst) => handleUpdate({ includeGst })}
          onDiscountChange={(type, value) =>
            handleUpdate({ discountType: type, discountValue: value })
          }
        />
      </div>
    </div>
  )
}
