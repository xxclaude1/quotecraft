import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between px-4 pt-6 pb-4 md:px-8 md:pt-8">
      <div>
        <h2 className="font-mono text-xl font-bold text-[#1A1A1A] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[#6B6560] mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
