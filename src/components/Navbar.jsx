import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/trips', label: 'My Trips' },
  { to: '/map', label: 'Map' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-pine/10 bg-fog/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-[0.2em] text-trail uppercase">Sat–Sun</span>
          <span className="font-display text-xl font-semibold text-pine">Weekend Escape</span>
        </NavLink>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-pine text-fog'
                    : 'text-pine/70 hover:bg-pine/5 hover:text-pine'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="rounded-full border border-pine/20 px-4 py-2 text-sm font-medium text-pine transition-colors hover:border-pine hover:bg-pine hover:text-fog">
          Sign in
        </button>
      </div>

      {/* mobile nav */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-pine/10 px-4 py-2 sm:hidden">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                isActive ? 'bg-pine text-fog' : 'text-pine/70'
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
