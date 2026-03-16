import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-end justify-between px-5 pt-8 pb-5 md:px-8 md:pt-10 md:pb-6">
      <div>
        <h2 className="font-mono text-2xl font-medium text-stone-900 tracking-tight leading-none">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[13px] text-stone-500 mt-1.5">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
