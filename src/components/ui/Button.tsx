import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover active:bg-accent-active shadow-sm shadow-accent/20',
  secondary: 'bg-stone-900 text-white hover:bg-stone-800 active:bg-stone-700 shadow-sm',
  ghost: 'bg-transparent text-stone-700 hover:bg-stone-200 active:bg-stone-300',
  danger: 'bg-error text-white hover:bg-error/90 active:bg-error/80 shadow-sm',
}

const sizes = {
  sm: 'h-8 px-3 text-[13px] gap-1.5',
  md: 'h-10 px-4 text-[13px] gap-2',
  lg: 'h-12 px-6 text-[15px] gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        rounded-lg transition-all duration-100 ease-out
        focus-ring
        disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
