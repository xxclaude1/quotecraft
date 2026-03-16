import type { Quote } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'

interface StatsStripProps {
  quotes: Quote[]
}

export function StatsStrip({ quotes }: StatsStripProps) {
  const now = new Date()
  const thisMonth = quotes.filter((q) => {
    const d = new Date(q.createdAt)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const sentThisMonth = thisMonth.filter((q) => q.status !== 'draft').length

  const totalValueQuoted = thisMonth
    .filter((q) => q.status !== 'draft')
    .reduce((sum, q) => {
      const subtotal = q.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0)
      return sum + subtotal
    }, 0)

  const acceptedCount = quotes.filter((q) => q.status === 'accepted').length
  const decidedCount = quotes.filter((q) => ['accepted', 'declined'].includes(q.status)).length
  const acceptanceRate = decidedCount > 0 ? Math.round((acceptedCount / decidedCount) * 100) : 0

  return (
    <div className="grid grid-cols-3 gap-px bg-[#DDD8D0] mx-4 md:mx-8 rounded overflow-hidden">
      <div className="bg-[#F5F2ED] px-3 py-3 md:px-4">
        <p className="text-[10px] text-[#6B6560] uppercase tracking-wider font-light">Sent this month</p>
        <p className="font-mono text-2xl font-bold text-[#1A1A1A] mt-1">{sentThisMonth}</p>
      </div>
      <div className="bg-[#F5F2ED] px-3 py-3 md:px-4">
        <p className="text-[10px] text-[#6B6560] uppercase tracking-wider font-light">Value quoted</p>
        <p className="font-mono text-2xl font-bold text-[#1A1A1A] mt-1">
          {formatCurrency(totalValueQuoted).replace('A$', '$')}
        </p>
      </div>
      <div className="bg-[#F5F2ED] px-3 py-3 md:px-4">
        <p className="text-[10px] text-[#6B6560] uppercase tracking-wider font-light">Win rate</p>
        <p className="font-mono text-2xl font-bold text-[#1A1A1A] mt-1">{acceptanceRate}%</p>
      </div>
    </div>
  )
}
