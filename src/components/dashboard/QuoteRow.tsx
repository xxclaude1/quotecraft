import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
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
      className="group w-full flex items-center gap-4 px-5 py-4 md:px-8 text-left hover:bg-white active:bg-stone-200/60 transition-all duration-100"
    >
      {/* Left accent bar */}
      <div className={`w-1 h-10 rounded-full shrink-0 ${
        quote.status === 'accepted' ? 'bg-success' :
        quote.status === 'sent' ? 'bg-accent' :
        quote.status === 'declined' ? 'bg-error' :
        quote.status === 'expired' ? 'bg-stone-300' :
        'bg-stone-300'
      }`} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="font-mono text-[11px] text-stone-400 tracking-wide">{quote.quoteNumber}</span>
          <Badge status={quote.status} />
        </div>
        <p className="text-[14px] font-medium text-stone-900 truncate leading-snug">
          {quote.jobTitle || 'Untitled Quote'}
        </p>
        {clientName && (
          <p className="text-[12px] text-stone-500 truncate mt-0.5">{clientName}</p>
        )}
      </div>

      <div className="text-right shrink-0">
        <p className="font-mono text-[15px] font-medium text-stone-900 tabular-nums">
          {formatCurrency(total)}
        </p>
        <p className="text-[11px] text-stone-400 mt-0.5">
          {days === 0 ? 'Today' : days === 1 ? 'Yesterday' : `${days}d ago`}
        </p>
      </div>

      <ChevronRight size={16} className="text-stone-300 group-hover:text-stone-500 shrink-0 transition-colors duration-100" />
    </button>
  )
}
