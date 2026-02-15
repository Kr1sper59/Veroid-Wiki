import { NavLink } from 'react-router-dom'
import type { NavItem } from '../routes'

interface SidebarProps {
  items: NavItem[]
  className?: string
  onNavigate?: () => void
}

interface NavListProps {
  items: NavItem[]
  depth?: number
  onNavigate?: () => void
}

function NavList({
  items,
  depth = 0,
  onNavigate,
}: NavListProps) {
  const isNested = depth > 0

  return (
    <ul className={`md-nav__list ${isNested ? 'md-nav__list--nested' : ''}`}>
      {items.map((item) => (
        <li key={item.path ?? item.label} className="md-nav__item">
          {item.path != null ? (
            <NavLink
              to={item.path}
              end={item.path === '/' || !item.path.includes('/')}
              onClick={onNavigate}
              className={({ isActive }) =>
                `md-nav__link ${isActive ? 'md-nav__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ) : (
            <span className="md-nav__link md-nav__title">
              {item.label}
            </span>
          )}

          {item.children && item.children.length > 0 && (
            <NavList
              items={item.children}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default function Sidebar({
  items,
  className,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className={`md-sidebar md-sidebar--primary ${className ?? ''}`}>
      <nav className="md-nav md-nav--primary">
        <NavList items={items} onNavigate={onNavigate} />
      </nav>
    </aside>
  )
}
