import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary: 'bg-[#E8580C] text-white hover:bg-[#d04f0b] active:bg-[#b8450a]',
  secondary: 'bg-[#1A1A1A] text-white hover:bg-[#333] active:bg-[#444]',
  ghost: 'bg-transparent text-[#1A1A1A] hover:bg-[#EDE9E3] active:bg-[#DDD8D0]',
  danger: 'bg-[#B84233] text-white hover:bg-[#a33b2e] active:bg-[#8e3428]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
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
        rounded transition-colors duration-100
        disabled:opacity-40 disabled:cursor-not-allowed
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
