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
    <div className="bg-white border-t border-stone-200">
      <div className="px-5 py-4 md:px-8 max-w-4xl mx-auto">
        <div className="flex flex-col gap-2.5">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-stone-500 font-medium">Subtotal</span>
            <span className="font-mono text-[14px] text-stone-700 tabular-nums">{formatCurrency(subtotal)}</span>
          </div>

          {/* Discount */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-stone-500 font-medium">Discount</span>
              <div className="flex items-center bg-stone-100 rounded-md overflow-hidden border border-stone-200">
                {(['', 'percent', 'fixed'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      const val = type || undefined
                      onDiscountChange(val as 'percent' | 'fixed' | undefined, val ? (discountValue ?? 0) : undefined)
                    }}
                    className={`px-2 py-1 text-[10px] font-mono font-medium transition-colors duration-100 ${
                      (discountType ?? '') === type
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                  >
                    {type === '' ? 'None' : type === 'percent' ? '%' : '$'}
                  </button>
                ))}
              </div>
              {discountType && (
                <input
                  type="number"
                  inputMode="decimal"
                  value={discountValue ?? ''}
                  onChange={(e) => onDiscountChange(discountType, parseFloat(e.target.value) || 0)}
                  className="w-16 h-7 px-2 text-right font-mono text-[12px] bg-stone-50 border border-stone-200 rounded-md outline-none focus:ring-2 focus:ring-accent/15"
                  placeholder="0"
                />
              )}
            </div>
            {discount > 0 && (
              <span className="font-mono text-[14px] text-error tabular-nums">-{formatCurrency(discount)}</span>
            )}
          </div>

          {/* GST */}
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <span className="text-[12px] text-stone-500 font-medium">GST (10%)</span>
              <button
                onClick={() => onGstToggle(!includeGst)}
                className={`w-9 h-5 rounded-full transition-colors duration-150 relative ${
                  includeGst ? 'bg-success' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-150 ${
                    includeGst ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </label>
            <span className="font-mono text-[14px] text-stone-700 tabular-nums">{formatCurrency(gst)}</span>
          </div>

          {/* Total */}
          <div className="border-t border-stone-200 pt-3 mt-1">
            <div className="flex justify-between items-baseline">
              <span className="text-[13px] font-bold text-stone-900 uppercase tracking-wide">Total</span>
              <span className="font-mono text-[28px] font-medium text-accent leading-none tabular-nums tracking-tight">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
