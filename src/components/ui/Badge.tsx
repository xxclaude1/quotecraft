import type { QuoteStatus } from '../../types'

const statusStyles: Record<QuoteStatus, string> = {
  draft: 'bg-[#EDE9E3] text-[#6B6560]',
  sent: 'bg-[#E8580C]/10 text-[#E8580C]',
  accepted: 'bg-[#2A7D6E]/10 text-[#2A7D6E]',
  declined: 'bg-[#B84233]/10 text-[#B84233]',
  expired: 'bg-[#EDE9E3] text-[#6B6560]/50',
}

const statusLabels: Record<QuoteStatus, string> = {
  draft: 'Draft',
  sent: 'Sent',
  accepted: 'Accepted',
  declined: 'Declined',
  expired: 'Expired',
}

interface BadgeProps {
  status: QuoteStatus
}

export function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 text-xs font-mono font-medium uppercase tracking-wide rounded
        ${statusStyles[status]}
      `}
    >
      {statusLabels[status]}
    </span>
  )
}
