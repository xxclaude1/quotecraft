import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { Plus, ArrowLeft, Send, ChevronDown, Check } from 'lucide-react'
import { useQuoteStore } from '../store/quoteStore'
import { useClientStore } from '../store/clientStore'
import { LineItemRow } from '../components/quote/LineItemRow'
import { TotalsPanel } from '../components/quote/TotalsPanel'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
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
        <div className="w-5 h-5 border-2 border-stone-300 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="pb-52">
      {/* Header bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="flex items-center gap-3 px-4 py-3 md:px-8 max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors duration-100"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] text-stone-400">{quote.quoteNumber}</span>
              <Badge status={quote.status} />
            </div>
          </div>

          {quote.status === 'draft' && (
            <button
              onClick={handleSend}
              className="flex items-center gap-1.5 h-9 px-4 bg-accent text-white text-[13px] font-medium rounded-lg hover:bg-accent-hover active:bg-accent-active transition-colors duration-100 shadow-sm shadow-accent/20"
            >
              <Send size={14} />
              Send Quote
            </button>
          )}
          {quote.status === 'sent' && (
            <button
              onClick={() => handleUpdate({ status: 'accepted' })}
              className="flex items-center gap-1.5 h-9 px-4 bg-success text-white text-[13px] font-medium rounded-lg hover:bg-success/90 transition-colors duration-100"
            >
              <Check size={14} />
              Mark Accepted
            </button>
          )}
        </div>
      </div>

      {/* Quote Form */}
      <div className="px-5 py-6 md:px-8 space-y-5">
        <Input
          value={quote.jobTitle}
          onChange={(e) => handleUpdate({ jobTitle: e.target.value })}
          placeholder="e.g. Bathroom reno — 42 Smith St"
          label="Job Title"
          className="text-[15px] font-medium"
        />

        {/* Client dropdown */}
        <div className="relative">
          <label className="text-[11px] font-medium text-stone-500 uppercase tracking-[0.08em]">
            Client
          </label>
          <button
            onClick={() => setShowClientSelect(!showClientSelect)}
            className="w-full h-11 px-3.5 mt-1.5 bg-white border border-stone-300 rounded-lg text-left flex items-center justify-between text-[14px] text-stone-900 hover:border-stone-400 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-100 focus-ring"
          >
            <span className={selectedClient ? '' : 'text-stone-400'}>
              {selectedClient?.name ?? 'Select client (optional)'}
            </span>
            <ChevronDown size={15} className={`text-stone-400 transition-transform duration-100 ${showClientSelect ? 'rotate-180' : ''}`} />
          </button>

          {showClientSelect && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg shadow-stone-900/5 max-h-56 overflow-y-auto z-20">
              <div className="sticky top-0 p-2.5 border-b border-stone-100 bg-white">
                <input
                  type="text"
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Search clients..."
                  className="w-full text-[13px] bg-stone-50 rounded-lg px-3 py-2 outline-none border border-stone-200 focus:border-accent"
                  autoFocus
                />
              </div>
              <button
                onClick={() => {
                  handleUpdate({ clientId: undefined })
                  setShowClientSelect(false)
                }}
                className="w-full px-4 py-2.5 text-left text-[13px] text-stone-400 hover:bg-stone-50"
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
                  className={`w-full px-4 py-2.5 text-left text-[13px] hover:bg-stone-50 transition-colors duration-75 ${
                    quote.clientId === client.id ? 'text-accent font-medium' : 'text-stone-900'
                  }`}
                >
                  {client.name}
                  {client.address && (
                    <span className="block text-[11px] text-stone-400 mt-0.5">{client.address}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Validity */}
        <div>
          <label className="text-[11px] font-medium text-stone-500 uppercase tracking-[0.08em]">
            Valid For
          </label>
          <div className="flex gap-2 mt-1.5">
            {VALIDITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleUpdate({ validForDays: parseInt(opt.value) as Quote['validForDays'] })}
                className={`px-3.5 py-2 text-[12px] font-mono font-medium rounded-lg transition-all duration-100 ${
                  quote.validForDays === parseInt(opt.value)
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white border border-stone-300 text-stone-600 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Line Items section */}
      <div>
        <div className="flex items-center justify-between px-5 md:px-8 pb-2">
          <h3 className="text-[11px] font-medium text-stone-500 uppercase tracking-[0.08em]">
            Line Items
          </h3>
          <span className="text-[11px] text-stone-400 font-mono">{quote.lineItems.length} items</span>
        </div>

        <div className="divide-y divide-stone-100 border-y border-stone-200">
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
            <div className="px-5 py-12 text-center bg-white">
              <p className="text-[13px] text-stone-500">No line items yet</p>
              <p className="text-[11px] text-stone-400 mt-1">
                Add items to start building your quote
              </p>
            </div>
          )}
        </div>

        {/* Add button */}
        <div className="px-5 py-4 md:px-8">
          <button
            onClick={handleAddLineItem}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-stone-300 rounded-xl text-[13px] font-medium text-stone-500 hover:border-accent hover:text-accent hover:bg-accent/3 transition-all duration-100"
          >
            <Plus size={16} strokeWidth={2} />
            Add Line Item
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="px-5 md:px-8 pb-4">
        <label className="text-[11px] font-medium text-stone-500 uppercase tracking-[0.08em]">
          Notes / Scope of Work
        </label>
        <textarea
          value={quote.notes ?? ''}
          onChange={(e) => handleUpdate({ notes: e.target.value })}
          placeholder="Terms, exclusions, scope details..."
          rows={3}
          className="w-full mt-1.5 px-3.5 py-3 bg-white border border-stone-300 rounded-lg text-[14px] text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y transition-all duration-100"
        />
      </div>

      {/* Sticky Totals */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:left-60 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
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
