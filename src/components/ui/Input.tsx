import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  mono?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, mono, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs font-light text-[#6B6560] uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full h-11 px-3 bg-white border border-[#DDD8D0] rounded
            text-[#1A1A1A] placeholder:text-[#6B6560]/50
            focus:outline-none focus:border-[#1A1A1A] focus:bg-[#FAFAF8]
            transition-colors duration-100
            ${mono ? 'font-mono' : ''}
            ${error ? 'border-[#B84233]' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-[#B84233]">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
