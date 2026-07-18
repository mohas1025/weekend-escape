import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/trips', label: 'My Trips' },
  { to: '/map', label: 'Map' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto max-w-4xl px-4">
      <div className="glass flex items-center justify-between rounded-full bg-white/90 px-5 py-2.5 shadow-[0_10px_30px_rgba(21,14,43,0.25)]">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="font-body text-[10px] uppercase tracking-[0.25em] text-magenta">
            Sat–Sun
          </span>
          <span className="font-display text-lg font-bold text-ink">
            Weekend Escape
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan to-magenta text-ink'
                    : 'text-ink/70 hover:bg-ink/5 hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="rounded-full bg-gradient-to-r from-cyan to-magenta px-4 py-1.5 text-sm font-semibold text-ink shadow-md transition-transform hover:scale-105">
          Sign in
        </button>
      </div>

      {/* mobile nav */}
      <nav className="glass mt-2 flex items-center gap-1 overflow-x-auto rounded-full bg-white/90 px-3 py-2 sm:hidden">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-cyan to-magenta text-ink'
                  : 'text-ink/70'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
