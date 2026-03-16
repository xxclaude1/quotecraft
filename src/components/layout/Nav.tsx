import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, Users, Layers, BookOpen, Settings } from 'lucide-react'

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/quotes/new', icon: FileText, label: 'New Quote' },
  { to: '/clients', icon: Users, label: 'Clients' },
  { to: '/templates', icon: Layers, label: 'Templates' },
  { to: '/pricebook', icon: BookOpen, label: 'Price Book' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] border-t border-[#333] md:relative md:border-t-0 md:border-r md:border-[#DDD8D0] md:bg-[#F5F2ED] md:w-56 md:min-h-screen">
      {/* Mobile bottom nav */}
      <div className="flex md:hidden">
        {links.slice(0, 5).map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] transition-colors duration-100
              ${isActive ? 'text-[#E8580C]' : 'text-[#999]'}`
            }
          >
            <Icon size={20} strokeWidth={1.5} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:h-full">
        <div className="px-5 py-6 border-b border-[#DDD8D0]">
          <h1 className="font-mono text-lg font-bold text-[#1A1A1A] tracking-tight">
            QuoteCraft
          </h1>
          <p className="text-[10px] text-[#6B6560] font-mono uppercase tracking-widest mt-0.5">
            Trade Quotes
          </p>
        </div>
        <div className="flex flex-col gap-0.5 p-3 flex-1">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors duration-100
                ${isActive
                  ? 'bg-[#1A1A1A] text-white'
                  : 'text-[#1A1A1A] hover:bg-[#EDE9E3]'
                }`
              }
            >
              <Icon size={18} strokeWidth={1.5} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
