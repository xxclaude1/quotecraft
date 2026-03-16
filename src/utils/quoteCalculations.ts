import type { LineItem } from '../types'

export function calcLineTotal(item: LineItem): number {
  return item.quantity * item.unitPrice
}

export function calcSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + calcLineTotal(item), 0)
}

export function calcDiscount(
  subtotal: number,
  discountType?: 'percent' | 'fixed',
  discountValue?: number
): number {
  if (!discountType || !discountValue) return 0
  if (discountType === 'percent') return subtotal * (discountValue / 100)
  return discountValue
}

export function calcGst(amount: number, includeGst: boolean): number {
  if (!includeGst) return 0
  return amount * 0.1
}

export function calcQuoteTotals(
  items: LineItem[],
  includeGst: boolean,
  discountType?: 'percent' | 'fixed',
  discountValue?: number
) {
  const subtotal = calcSubtotal(items)
  const discount = calcDiscount(subtotal, discountType, discountValue)
  const afterDiscount = subtotal - discount
  const gst = calcGst(afterDiscount, includeGst)
  const total = afterDiscount + gst

  return { subtotal, discount, gst, total }
}
