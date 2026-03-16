import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  mono?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, mono, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[11px] font-medium text-stone-500 uppercase tracking-[0.08em]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full h-11 px-3.5 bg-white border border-stone-300 rounded-lg
            text-[14px] text-stone-900 placeholder:text-stone-400
            focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent
            transition-all duration-100
            ${mono ? 'font-mono' : ''}
            ${error ? 'border-error focus:ring-error/20 focus:border-error' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-[12px] text-error">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
