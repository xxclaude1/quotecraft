import type { LineItem } from '../../types'
import { calcQuoteTotals } from '../../utils/quoteCalculations'
import { formatCurrency } from '../../utils/formatCurrency'

interface TotalsPanelProps {
  lineItems: LineItem[]
  includeGst: boolean
  discountType?: 'percent' | 'fixed'
  discountValue?: number
  onGstToggle: (includeGst: boolean) => void
  onDiscountChange: (type: 'percent' | 'fixed' | undefined, value: number | undefined) => void
}

export function TotalsPanel({
  lineItems,
  includeGst,
  discountType,
  discountValue,
  onGstToggle,
  onDiscountChange,
}: TotalsPanelProps) {
  const { subtotal, discount, gst, total } = calcQuoteTotals(
    lineItems,
    includeGst,
    discountType,
    discountValue
  )

  return (
    <div className="bg-white border-t border-[#DDD8D0]">
      <div className="px-4 py-3 space-y-2">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-[#6B6560] uppercase tracking-wider font-light">Subtotal</span>
          <span className="font-mono text-sm text-[#1A1A1A]">{formatCurrency(subtotal)}</span>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B6560] uppercase tracking-wider font-light">Discount</span>
            <select
              value={discountType ?? ''}
              onChange={(e) => {
                const val = e.target.value as 'percent' | 'fixed' | ''
                onDiscountChange(val || undefined, val ? (discountValue ?? 0) : undefined)
              }}
              className="text-[10px] text-[#6B6560] bg-[#EDE9E3] border-none rounded px-1 py-0.5 outline-none"
            >
              <option value="">None</option>
              <option value="percent">%</option>
              <option value="fixed">$</option>
            </select>
            {discountType && (
              <input
                type="number"
                inputMode="decimal"
                value={discountValue ?? ''}
                onChange={(e) => onDiscountChange(discountType, parseFloat(e.target.value) || 0)}
                className="w-16 h-6 px-1.5 text-right font-mono text-xs bg-[#F5F2ED] border border-[#DDD8D0] rounded outline-none"
                placeholder="0"
              />
            )}
          </div>
          {discount > 0 && (
            <span className="font-mono text-sm text-[#B84233]">−{formatCurrency(discount)}</span>
          )}
        </div>

        {/* GST */}
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-[#6B6560] uppercase tracking-wider font-light">GST (10%)</span>
            <button
              onClick={() => onGstToggle(!includeGst)}
              className={`w-8 h-4 rounded-full transition-colors duration-100 relative ${
                includeGst ? 'bg-[#2A7D6E]' : 'bg-[#DDD8D0]'
              }`}
            >
              <span
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-100 ${
                  includeGst ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </label>
          <span className="font-mono text-sm text-[#1A1A1A]">{formatCurrency(gst)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-[#DDD8D0] pt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Total</span>
            <span className="font-mono text-2xl font-bold text-[#E8580C]">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
