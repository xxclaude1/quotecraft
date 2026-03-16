import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FilePlus, Users, Layers, BookOpen, Settings } from 'lucide-react'

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/quotes/new', icon: FilePlus, label: 'New Quote' },
  { to: '/clients', icon: Users, label: 'Clients' },
  { to: '/templates', icon: Layers, label: 'Templates' },
  { to: '/pricebook', icon: BookOpen, label: 'Price Book' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function Nav() {
  return (
    <>
      {/* Mobile bottom nav — dark, chunky tabs */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-stone-900 safe-area-bottom">
        <div className="flex">
          {links.slice(0, 5).map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-2.5 pt-3 text-[10px] font-medium tracking-wide transition-colors duration-100
                ${isActive
                  ? 'text-accent'
                  : 'text-stone-500 active:text-stone-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-lg transition-colors duration-100 ${isActive ? 'bg-accent/10' : ''}`}>
                    <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                  </div>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Desktop sidebar — fixed, clean */}
      <nav className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-60 md:bg-stone-900 md:z-40">
        {/* Logo */}
        <div className="px-6 pt-7 pb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
              <span className="font-mono text-sm font-bold text-white">Q</span>
            </div>
            <div>
              <h1 className="font-mono text-[15px] font-medium text-white tracking-tight leading-none">
                QuoteCraft
              </h1>
              <p className="text-[10px] text-stone-500 font-mono uppercase tracking-[0.15em] mt-0.5">
                Trade Quotes
              </p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-0.5 px-3 flex-1">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-100
                ${isActive
                  ? 'bg-white/10 text-white'
                  : 'text-stone-400 hover:bg-white/5 hover:text-stone-200'
                }`
              }
            >
              <Icon size={18} strokeWidth={1.5} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Bottom branding */}
        <div className="px-6 py-4 border-t border-white/5">
          <p className="text-[10px] text-stone-600 font-mono">v1.0.0</p>
        </div>
      </nav>
    </>
  )
}
