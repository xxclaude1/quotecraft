import { create } from 'zustand'
import { db, getNextQuoteNumber } from '../db/database'
import type { Quote, LineItem } from '../types'
import { v4 as uuid } from 'uuid'

interface QuoteStore {
  quotes: Quote[]
  currentQuote: Quote | null
  loading: boolean

  loadQuotes: () => Promise<void>
  createQuote: () => Promise<Quote>
  updateQuote: (id: string, updates: Partial<Quote>) => Promise<void>
  deleteQuote: (id: string) => Promise<void>
  setCurrentQuote: (quote: Quote | null) => void
  loadQuote: (id: string) => Promise<Quote | null>

  addLineItem: (quoteId: string, item?: Partial<LineItem>) => Promise<void>
  updateLineItem: (quoteId: string, itemId: string, updates: Partial<LineItem>) => Promise<void>
  removeLineItem: (quoteId: string, itemId: string) => Promise<void>
  reorderLineItems: (quoteId: string, items: LineItem[]) => Promise<void>
}

export const useQuoteStore = create<QuoteStore>((set, get) => ({
  quotes: [],
  currentQuote: null,
  loading: false,

  loadQuotes: async () => {
    set({ loading: true })
    const quotes = await db.quotes.orderBy('updatedAt').reverse().toArray()
    set({ quotes, loading: false })
  },

  createQuote: async () => {
    const quoteNumber = await getNextQuoteNumber()
    const now = new Date()
    const quote: Quote = {
      id: uuid(),
      quoteNumber,
      jobTitle: '',
      lineItems: [],
      includeGst: true,
      validForDays: 30,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    }
    await db.quotes.add(quote)
    set((state) => ({ quotes: [quote, ...state.quotes], currentQuote: quote }))
    return quote
  },

  updateQuote: async (id, updates) => {
    const updatedFields = { ...updates, updatedAt: new Date() }
    await db.quotes.update(id, updatedFields)
    set((state) => ({
      quotes: state.quotes.map((q) => (q.id === id ? { ...q, ...updatedFields } : q)),
      currentQuote: state.currentQuote?.id === id ? { ...state.currentQuote, ...updatedFields } : state.currentQuote,
    }))
  },

  deleteQuote: async (id) => {
    await db.quotes.delete(id)
    set((state) => ({
      quotes: state.quotes.filter((q) => q.id !== id),
      currentQuote: state.currentQuote?.id === id ? null : state.currentQuote,
    }))
  },

  setCurrentQuote: (quote) => set({ currentQuote: quote }),

  loadQuote: async (id) => {
    const quote = await db.quotes.get(id)
    if (quote) {
      set({ currentQuote: quote })
    }
    return quote ?? null
  },

  addLineItem: async (quoteId, item) => {
    const quote = get().quotes.find((q) => q.id === quoteId) ?? get().currentQuote
    if (!quote) return

    const newId = uuid()
    const newItem: LineItem = {
      id: newId,
      description: item?.description ?? '',
      category: item?.category ?? 'labour',
      quantity: item?.quantity ?? 1,
      unit: item?.unit ?? 'hours',
      unitPrice: item?.unitPrice ?? 0,
      sortOrder: quote.lineItems.length,
      ...item,
    }
    newItem.id = newId

    const lineItems = [...quote.lineItems, newItem]
    await get().updateQuote(quoteId, { lineItems })
  },

  updateLineItem: async (quoteId, itemId, updates) => {
    const quote = get().quotes.find((q) => q.id === quoteId) ?? get().currentQuote
    if (!quote) return

    const lineItems = quote.lineItems.map((item) =>
      item.id === itemId ? { ...item, ...updates } : item
    )
    await get().updateQuote(quoteId, { lineItems })
  },

  removeLineItem: async (quoteId, itemId) => {
    const quote = get().quotes.find((q) => q.id === quoteId) ?? get().currentQuote
    if (!quote) return

    const lineItems = quote.lineItems
      .filter((item) => item.id !== itemId)
      .map((item, i) => ({ ...item, sortOrder: i }))
    await get().updateQuote(quoteId, { lineItems })
  },

  reorderLineItems: async (quoteId, items) => {
    const reordered = items.map((item, i) => ({ ...item, sortOrder: i }))
    await get().updateQuote(quoteId, { lineItems: reordered })
  },
}))
