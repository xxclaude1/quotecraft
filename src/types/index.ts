export interface Business {
  id: string
  name: string
  abn?: string
  phone?: string
  email?: string
  address?: string
  logoUrl?: string
  defaultTerms?: string
  quotePrefix: string
  nextQuoteNumber: number
  gstDefault: boolean
  currency: 'AUD' | 'NZD' | 'USD'
}

export interface Client {
  id: string
  name: string
  phone?: string
  email?: string
  address?: string
  notes?: string
  createdAt: Date
}

export interface LineItem {
  id: string
  description: string
  category: 'labour' | 'materials' | 'equipment' | 'other'
  quantity: number
  unit: string
  unitPrice: number
  sortOrder: number
}

export interface Quote {
  id: string
  quoteNumber: string
  clientId?: string
  jobTitle: string
  lineItems: LineItem[]
  notes?: string
  discountType?: 'percent' | 'fixed'
  discountValue?: number
  includeGst: boolean
  validForDays: 7 | 14 | 30 | 60
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired'
  createdAt: Date
  updatedAt: Date
  sentAt?: Date
}

export interface SavedLineItem {
  id: string
  description: string
  category: 'labour' | 'materials' | 'equipment' | 'other'
  defaultQuantity: number
  unit: string
  unitPrice: number
}

export interface QuoteTemplate {
  id: string
  name: string
  description?: string
  lineItems: Omit<LineItem, 'id'>[]
  createdAt: Date
}

export type QuoteStatus = Quote['status']
export type LineItemCategory = LineItem['category']
export type Currency = Business['currency']
