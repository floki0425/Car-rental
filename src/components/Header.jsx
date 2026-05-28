import { Link, NavLink } from 'react-router-dom'
import { cx } from '../lib/utils'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/cars', label: 'Cars' },
]

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-extrabold text-[var(--brand-navy)]">
          DriveGo
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-2 text-sm font-medium sm:gap-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cx(
                      'rounded-full px-3 py-2 transition',
                      isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

