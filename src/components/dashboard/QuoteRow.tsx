import { useNavigate } from 'react-router-dom'
import type { Quote } from '../../types'
import { Badge } from '../ui/Badge'
import { formatCurrency } from '../../utils/formatCurrency'
import { daysAgo } from '../../utils/dates'
import { calcQuoteTotals } from '../../utils/quoteCalculations'

interface QuoteRowProps {
  quote: Quote
  clientName?: string
}

export function QuoteRow({ quote, clientName }: QuoteRowProps) {
  const navigate = useNavigate()
  const { total } = calcQuoteTotals(
    quote.lineItems,
    quote.includeGst,
    quote.discountType,
    quote.discountValue
  )

  const days = quote.sentAt ? daysAgo(quote.sentAt) : daysAgo(quote.createdAt)

  return (
    <button
      onClick={() => navigate(`/quotes/${quote.id}`)}
      className="w-full flex items-center gap-3 px-4 py-3 md:px-8 text-left hover:bg-[#EDE9E3] active:bg-[#DDD8D0] transition-colors duration-100 border-b border-[#DDD8D0] last:border-b-0"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#6B6560]">{quote.quoteNumber}</span>
          <Badge status={quote.status} />
        </div>
        <p className="text-sm font-medium text-[#1A1A1A] truncate mt-0.5">
          {quote.jobTitle || 'Untitled Quote'}
        </p>
        {clientName && (
          <p className="text-xs text-[#6B6560] truncate">{clientName}</p>
        )}
      </div>
      <div className="text-right shrink-0">
        <p className="font-mono text-sm font-bold text-[#1A1A1A]">
          {formatCurrency(total)}
        </p>
        <p className="text-[10px] text-[#6B6560] mt-0.5">
          {days === 0 ? 'Today' : `${days}d ago`}
        </p>
      </div>
    </button>
  )
}
