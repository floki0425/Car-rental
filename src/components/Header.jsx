import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import brandLogo from '../../references/logo-reference.jpg'
import { cx } from '../lib/utils'

const navItems = [
  { to: '/', label: 'Home', type: 'route', end: true },
  { to: '/cars', label: 'Vehicles', type: 'route' },
  { to: '/#services', hash: '#services', label: 'Services', type: 'anchor' },
  { to: '/#destinations', hash: '#destinations', label: 'Destinations', type: 'anchor' },
  { to: '/#concierge', hash: '#concierge', label: 'Concierge', type: 'anchor' },
]

function CalendarIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 3v4M17 3v4M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setIsOpen(false)

  const isHomeActive = location.pathname === '/' && !location.hash

  const isAnchorActive = (hash) => {
    return location.pathname === '/' && location.hash === hash
  }

  const handleLogoClick = () => {
    closeMenu()

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const navLinkClass =
    'inline-flex h-20 items-center text-[0.72rem] font-black uppercase tracking-[0.18em] text-gray-950 transition duration-200 outline-none'

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 shadow-sm shadow-black/[0.04] backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to={{ pathname: '/', search: '', hash: '' }}
          onClick={handleLogoClick}
          className="flex min-w-0 items-center gap-3 rounded-none outline-none transition"
          aria-label="Hoppin With Shawn's Car Rental home"
          aria-current={isHomeActive ? 'page' : undefined}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-none bg-white">
            <img
              src={brandLogo}
              alt="Hoppin With Shawn's Car Rental logo"
              className="h-full w-full object-contain"
            />
          </span>

          <span className="hidden min-w-0 leading-none sm:block">
            <span className="block max-w-[16rem] truncate text-[0.82rem] font-black uppercase tracking-[0.18em] text-gray-950">
              Hoppin With Shawn&apos;s
            </span>
            <span className="mt-1.5 block text-[0.58rem] font-black uppercase tracking-[0.32em] text-gray-600">
              Car Rental
            </span>
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-9 xl:gap-11">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.type === 'route' ? (
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={navLinkClass}
                  >
                    {({ isActive }) => {
                      const active = isActive && !location.hash

                      return (
                        <span className="relative inline-flex items-center">
                          {item.label}
                          <span
                            className={cx(
                              'absolute -bottom-2 left-0 h-[2px] w-full rounded-none bg-black transition-opacity duration-200',
                              active ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                        </span>
                      )
                    }}
                  </NavLink>
                ) : (
                  <a
                    href={item.to}
                    onClick={closeMenu}
                    className={navLinkClass}
                  >
                    <span className="relative inline-flex items-center">
                      {item.label}
                      <span
                        className={cx(
                          'absolute -bottom-2 left-0 h-[2px] w-full rounded-none bg-black transition-opacity duration-200',
                          isAnchorActive(item.hash) ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#plan-rental"
            className="hidden h-11 items-center justify-center gap-2 rounded-none bg-black px-5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_rgba(0,0,0,0.16)] outline-none transition hover:-translate-y-0.5 hover:bg-gray-800 hover:text-white focus:ring-4 focus:ring-gray-300 lg:inline-flex"
          >
            <CalendarIcon />
            Book Now
          </a>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-none bg-white text-gray-950 shadow-sm outline-none transition hover:bg-gray-50 lg:hidden"
          >
            <span className="relative h-4 w-5">
              <span
                className={cx(
                  'absolute left-0 top-0 h-0.5 w-5 rounded-none bg-current transition duration-300',
                  isOpen && 'top-2 rotate-45',
                )}
              />
              <span
                className={cx(
                  'absolute left-0 top-2 h-0.5 w-5 rounded-none bg-current transition duration-300',
                  isOpen && 'opacity-0',
                )}
              />
              <span
                className={cx(
                  'absolute left-0 top-4 h-0.5 w-5 rounded-none bg-current transition duration-300',
                  isOpen && 'top-2 -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-gray-200/80 bg-white/98 shadow-xl shadow-black/5 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6" aria-label="Mobile navigation">
            <div className="grid gap-2">
              {navItems.map((item) =>
                item.type === 'route' ? (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.end}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      cx(
                        'rounded-none px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-gray-950 outline-none transition hover:bg-gray-50',
                        isActive && !location.hash && 'bg-gray-50',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={closeMenu}
                    className={cx(
                      'rounded-none px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-gray-950 outline-none transition hover:bg-gray-50',
                      isAnchorActive(item.hash) && 'bg-gray-50',
                    )}
                  >
                    {item.label}
                  </a>
                ),
              )}

              <a
                href="/#plan-rental"
                onClick={closeMenu}
                className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-none bg-black text-sm font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-black/20 outline-none transition hover:bg-gray-800 hover:text-white focus:ring-4 focus:ring-gray-300"
              >
                <CalendarIcon />
                Book Now
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default Header
