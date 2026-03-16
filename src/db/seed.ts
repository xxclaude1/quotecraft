import { db } from './database'
import type { Client, Quote, SavedLineItem, QuoteTemplate } from '../types'
import { v4 as uuid } from 'uuid'

const now = new Date()
const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000)

export async function seedDatabase() {
  const quoteCount = await db.quotes.count()
  if (quoteCount > 0) return // Already seeded

  // Seed clients
  const clients: Client[] = [
    { id: uuid(), name: 'Karen Mitchell', phone: '0412 345 678', email: 'karen@email.com', address: '42 Smith St, Richmond VIC 3121', createdAt: daysAgo(30) },
    { id: uuid(), name: 'Tom Nguyen', phone: '0423 456 789', email: 'tom.n@gmail.com', address: '15 Oak Ave, Hawthorn VIC 3122', createdAt: daysAgo(20) },
    { id: uuid(), name: 'Strata Corp - 88 Collins', phone: '03 9888 7777', email: 'manager@88collins.com.au', address: '88 Collins St, Melbourne VIC 3000', createdAt: daysAgo(15) },
    { id: uuid(), name: 'Dave & Lisa Palmer', phone: '0434 567 890', email: 'davepalmer@outlook.com', address: '7 Banksia Cres, Glen Waverley VIC 3150', createdAt: daysAgo(10) },
    { id: uuid(), name: 'Raj Patel', phone: '0445 678 901', address: '23 Station Rd, Box Hill VIC 3128', createdAt: daysAgo(5) },
  ]
  await db.clients.bulkAdd(clients)

  // Seed quotes
  const quotes: Quote[] = [
    {
      id: uuid(),
      quoteNumber: 'QC-0001',
      clientId: clients[0].id,
      jobTitle: 'Bathroom renovation - 42 Smith St',
      lineItems: [
        { id: uuid(), description: 'Strip existing bathroom', category: 'labour', quantity: 16, unit: 'hours', unitPrice: 85, sortOrder: 0 },
        { id: uuid(), description: 'Waterproofing membrane', category: 'materials', quantity: 12, unit: 'm²', unitPrice: 45, sortOrder: 1 },
        { id: uuid(), description: 'Wall & floor tiling', category: 'labour', quantity: 24, unit: 'hours', unitPrice: 85, sortOrder: 2 },
        { id: uuid(), description: 'Tiles - 600x600 porcelain', category: 'materials', quantity: 14, unit: 'm²', unitPrice: 65, sortOrder: 3 },
        { id: uuid(), description: 'Vanity unit supply & install', category: 'materials', quantity: 1, unit: 'each', unitPrice: 1200, sortOrder: 4 },
        { id: uuid(), description: 'Plumbing rough-in & fit-off', category: 'labour', quantity: 12, unit: 'hours', unitPrice: 95, sortOrder: 5 },
        { id: uuid(), description: 'Skip bin hire', category: 'equipment', quantity: 1, unit: 'fixed', unitPrice: 380, sortOrder: 6 },
      ],
      notes: 'Price includes all materials and labour. Excludes any structural work if required once walls are opened. Tiles selected from our standard range — upgrades available at additional cost.',
      includeGst: true,
      validForDays: 30,
      status: 'sent',
      createdAt: daysAgo(7),
      updatedAt: daysAgo(7),
      sentAt: daysAgo(6),
    },
    {
      id: uuid(),
      quoteNumber: 'QC-0002',
      clientId: clients[1].id,
      jobTitle: 'Hot water system replacement',
      lineItems: [
        { id: uuid(), description: 'Disconnect & remove old HWS', category: 'labour', quantity: 2, unit: 'hours', unitPrice: 95, sortOrder: 0 },
        { id: uuid(), description: 'Rinnai 26L continuous flow unit', category: 'materials', quantity: 1, unit: 'each', unitPrice: 1650, sortOrder: 1 },
        { id: uuid(), description: 'Installation & commissioning', category: 'labour', quantity: 4, unit: 'hours', unitPrice: 95, sortOrder: 2 },
        { id: uuid(), description: 'Copper pipe & fittings', category: 'materials', quantity: 1, unit: 'fixed', unitPrice: 180, sortOrder: 3 },
        { id: uuid(), description: 'Tempering valve', category: 'materials', quantity: 1, unit: 'each', unitPrice: 120, sortOrder: 4 },
      ],
      includeGst: true,
      validForDays: 14,
      status: 'accepted',
      createdAt: daysAgo(12),
      updatedAt: daysAgo(10),
      sentAt: daysAgo(11),
    },
    {
      id: uuid(),
      quoteNumber: 'QC-0003',
      clientId: clients[2].id,
      jobTitle: 'Common area plumbing maintenance - 88 Collins',
      lineItems: [
        { id: uuid(), description: 'Inspect all common area fixtures', category: 'labour', quantity: 4, unit: 'hours', unitPrice: 95, sortOrder: 0 },
        { id: uuid(), description: 'Replace washers & seals (estimated)', category: 'materials', quantity: 1, unit: 'fixed', unitPrice: 120, sortOrder: 1 },
        { id: uuid(), description: 'Clear floor waste drains x6', category: 'labour', quantity: 3, unit: 'hours', unitPrice: 95, sortOrder: 2 },
        { id: uuid(), description: 'CCTV drain inspection', category: 'equipment', quantity: 1, unit: 'fixed', unitPrice: 450, sortOrder: 3 },
      ],
      includeGst: true,
      validForDays: 30,
      status: 'sent',
      createdAt: daysAgo(3),
      updatedAt: daysAgo(3),
      sentAt: daysAgo(2),
    },
    {
      id: uuid(),
      quoteNumber: 'QC-0004',
      clientId: clients[3].id,
      jobTitle: 'Kitchen sink & dishwasher install',
      lineItems: [
        { id: uuid(), description: 'Remove existing sink', category: 'labour', quantity: 1.5, unit: 'hours', unitPrice: 95, sortOrder: 0 },
        { id: uuid(), description: 'Install new undermount sink', category: 'labour', quantity: 2, unit: 'hours', unitPrice: 95, sortOrder: 1 },
        { id: uuid(), description: 'Connect dishwasher waste & water', category: 'labour', quantity: 1.5, unit: 'hours', unitPrice: 95, sortOrder: 2 },
        { id: uuid(), description: 'Flexible hoses & fittings', category: 'materials', quantity: 1, unit: 'fixed', unitPrice: 85, sortOrder: 3 },
      ],
      includeGst: true,
      validForDays: 14,
      status: 'draft',
      createdAt: daysAgo(1),
      updatedAt: daysAgo(1),
    },
    {
      id: uuid(),
      quoteNumber: 'QC-0005',
      clientId: clients[4].id,
      jobTitle: 'Gas leak detection & repair',
      lineItems: [
        { id: uuid(), description: 'Gas leak detection survey', category: 'labour', quantity: 2, unit: 'hours', unitPrice: 110, sortOrder: 0 },
        { id: uuid(), description: 'Repair gas fitting (estimated)', category: 'labour', quantity: 1.5, unit: 'hours', unitPrice: 110, sortOrder: 1 },
        { id: uuid(), description: 'Gas pressure test & certification', category: 'labour', quantity: 1, unit: 'hours', unitPrice: 110, sortOrder: 2 },
        { id: uuid(), description: 'Replacement fittings (estimated)', category: 'materials', quantity: 1, unit: 'fixed', unitPrice: 65, sortOrder: 3 },
      ],
      notes: 'Final cost may vary depending on location and extent of leak. Will advise before proceeding with any additional work.',
      includeGst: true,
      validForDays: 7,
      status: 'declined',
      createdAt: daysAgo(14),
      updatedAt: daysAgo(12),
      sentAt: daysAgo(13),
    },
    {
      id: uuid(),
      quoteNumber: 'QC-0006',
      clientId: clients[0].id,
      jobTitle: 'Laundry tap replacement',
      lineItems: [
        { id: uuid(), description: 'Remove old laundry taps', category: 'labour', quantity: 1, unit: 'hours', unitPrice: 95, sortOrder: 0 },
        { id: uuid(), description: 'Supply & install new mixer tap', category: 'materials', quantity: 1, unit: 'each', unitPrice: 280, sortOrder: 1 },
        { id: uuid(), description: 'New flexible hoses', category: 'materials', quantity: 2, unit: 'each', unitPrice: 25, sortOrder: 2 },
      ],
      includeGst: true,
      validForDays: 14,
      status: 'expired',
      createdAt: daysAgo(45),
      updatedAt: daysAgo(45),
      sentAt: daysAgo(44),
    },
  ]
  await db.quotes.bulkAdd(quotes)

  // Update business next quote number
  await db.business.update('default', { nextQuoteNumber: 7 })

  // Seed saved line items (price book)
  const savedItems: SavedLineItem[] = [
    { id: uuid(), description: 'General plumbing labour', category: 'labour', defaultQuantity: 1, unit: 'hours', unitPrice: 95 },
    { id: uuid(), description: 'Apprentice labour', category: 'labour', defaultQuantity: 1, unit: 'hours', unitPrice: 55 },
    { id: uuid(), description: 'Gas fitting labour', category: 'labour', defaultQuantity: 1, unit: 'hours', unitPrice: 110 },
    { id: uuid(), description: 'Supply & install mixer tap', category: 'materials', defaultQuantity: 1, unit: 'each', unitPrice: 320 },
    { id: uuid(), description: 'Copper pipe & fittings', category: 'materials', defaultQuantity: 1, unit: 'fixed', unitPrice: 180 },
    { id: uuid(), description: 'Flexible braided hose', category: 'materials', defaultQuantity: 1, unit: 'each', unitPrice: 25 },
    { id: uuid(), description: 'Skip bin hire - small', category: 'equipment', defaultQuantity: 1, unit: 'fixed', unitPrice: 350 },
    { id: uuid(), description: 'CCTV drain inspection', category: 'equipment', defaultQuantity: 1, unit: 'fixed', unitPrice: 450 },
    { id: uuid(), description: 'Waterproofing membrane', category: 'materials', defaultQuantity: 1, unit: 'm²', unitPrice: 45 },
    { id: uuid(), description: 'Tempering valve supply & install', category: 'materials', defaultQuantity: 1, unit: 'each', unitPrice: 120 },
  ]
  await db.savedLineItems.bulkAdd(savedItems)

  // Seed templates
  const templates: QuoteTemplate[] = [
    {
      id: uuid(),
      name: 'Hot Water System Replacement',
      description: 'Standard continuous flow HWS changeover',
      lineItems: [
        { description: 'Disconnect & remove old HWS', category: 'labour', quantity: 2, unit: 'hours', unitPrice: 95, sortOrder: 0 },
        { description: 'Continuous flow unit (TBC)', category: 'materials', quantity: 1, unit: 'each', unitPrice: 1650, sortOrder: 1 },
        { description: 'Installation & commissioning', category: 'labour', quantity: 4, unit: 'hours', unitPrice: 95, sortOrder: 2 },
        { description: 'Copper pipe & fittings', category: 'materials', quantity: 1, unit: 'fixed', unitPrice: 180, sortOrder: 3 },
        { description: 'Tempering valve', category: 'materials', quantity: 1, unit: 'each', unitPrice: 120, sortOrder: 4 },
      ],
      createdAt: daysAgo(60),
    },
    {
      id: uuid(),
      name: 'Bathroom Renovation - Standard',
      description: 'Full bathroom strip and reno, mid-range finishes',
      lineItems: [
        { description: 'Strip existing bathroom', category: 'labour', quantity: 16, unit: 'hours', unitPrice: 85, sortOrder: 0 },
        { description: 'Waterproofing', category: 'materials', quantity: 12, unit: 'm²', unitPrice: 45, sortOrder: 1 },
        { description: 'Tiling labour', category: 'labour', quantity: 24, unit: 'hours', unitPrice: 85, sortOrder: 2 },
        { description: 'Tiles (standard range)', category: 'materials', quantity: 14, unit: 'm²', unitPrice: 65, sortOrder: 3 },
        { description: 'Vanity supply & install', category: 'materials', quantity: 1, unit: 'each', unitPrice: 1200, sortOrder: 4 },
        { description: 'Plumbing rough-in & fit-off', category: 'labour', quantity: 12, unit: 'hours', unitPrice: 95, sortOrder: 5 },
        { description: 'Skip bin hire', category: 'equipment', quantity: 1, unit: 'fixed', unitPrice: 380, sortOrder: 6 },
      ],
      createdAt: daysAgo(60),
    },
    {
      id: uuid(),
      name: 'Tap Replacement',
      description: 'Single tap or mixer changeover',
      lineItems: [
        { description: 'Remove old tap/mixer', category: 'labour', quantity: 1, unit: 'hours', unitPrice: 95, sortOrder: 0 },
        { description: 'Supply & install new mixer tap', category: 'materials', quantity: 1, unit: 'each', unitPrice: 320, sortOrder: 1 },
        { description: 'New flexible hoses', category: 'materials', quantity: 2, unit: 'each', unitPrice: 25, sortOrder: 2 },
      ],
      createdAt: daysAgo(45),
    },
  ]
  await db.quoteTemplates.bulkAdd(templates)
}
