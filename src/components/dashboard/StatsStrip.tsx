import { TrendingUp, Send, Target } from 'lucide-react'
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

  const stats = [
    {
      label: 'Sent this month',
      value: String(sentThisMonth),
      icon: Send,
      color: 'text-accent',
      iconBg: 'bg-accent/8',
    },
    {
      label: 'Value quoted',
      value: formatCurrency(totalValueQuoted).replace('A$', '$'),
      icon: TrendingUp,
      color: 'text-success',
      iconBg: 'bg-success/8',
    },
    {
      label: 'Win rate',
      value: `${acceptanceRate}%`,
      icon: Target,
      color: 'text-stone-700',
      iconBg: 'bg-stone-200',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 px-5 md:px-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-4 border border-stone-300/60"
        >
          <div className={`w-8 h-8 ${stat.iconBg} rounded-lg flex items-center justify-center mb-3`}>
            <stat.icon size={15} className={stat.color} strokeWidth={2} />
          </div>
          <p className="font-mono text-xl md:text-2xl font-medium text-stone-900 leading-none tracking-tight">
            {stat.value}
          </p>
          <p className="text-[11px] text-stone-500 mt-1.5 leading-tight">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
