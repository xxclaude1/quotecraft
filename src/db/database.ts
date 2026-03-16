import Dexie, { type Table } from 'dexie'
import type { Business, Client, Quote, SavedLineItem, QuoteTemplate } from '../types'

export class QuoteCraftDB extends Dexie {
  business!: Table<Business>
  clients!: Table<Client>
  quotes!: Table<Quote>
  savedLineItems!: Table<SavedLineItem>
  quoteTemplates!: Table<QuoteTemplate>

  constructor() {
    super('QuoteCraftDB')

    this.version(1).stores({
      business: 'id',
      clients: 'id, name, createdAt',
      quotes: 'id, quoteNumber, clientId, status, createdAt, updatedAt',
      savedLineItems: 'id, category, description',
      quoteTemplates: 'id, name, createdAt',
    })
  }
}

export const db = new QuoteCraftDB()

export async function getOrCreateBusiness(): Promise<Business> {
  const existing = await db.business.toCollection().first()
  if (existing) return existing

  const defaultBusiness: Business = {
    id: 'default',
    name: 'My Business',
    quotePrefix: 'QC-',
    nextQuoteNumber: 1,
    gstDefault: true,
    currency: 'AUD',
  }
  await db.business.add(defaultBusiness)
  return defaultBusiness
}

export async function getNextQuoteNumber(): Promise<string> {
  const business = await getOrCreateBusiness()
  const num = business.nextQuoteNumber
  await db.business.update('default', { nextQuoteNumber: num + 1 })
  return `${business.quotePrefix}${String(num).padStart(4, '0')}`
}
