import type { QuoteStatus } from '../../types'

const statusConfig: Record<QuoteStatus, { bg: string; text: string; dot: string; label: string }> = {
  draft: { bg: 'bg-stone-200', text: 'text-stone-600', dot: 'bg-stone-400', label: 'Draft' },
  sent: { bg: 'bg-accent/8', text: 'text-accent', dot: 'bg-accent', label: 'Sent' },
  accepted: { bg: 'bg-success/8', text: 'text-success', dot: 'bg-success', label: 'Accepted' },
  declined: { bg: 'bg-error/8', text: 'text-error', dot: 'bg-error', label: 'Declined' },
  expired: { bg: 'bg-stone-200', text: 'text-stone-400', dot: 'bg-stone-300', label: 'Expired' },
}

interface BadgeProps {
  status: QuoteStatus
}

export function Badge({ status }: BadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono font-medium uppercase tracking-wider rounded-md
        ${config.bg} ${config.text}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}
