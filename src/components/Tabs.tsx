import { NavLink, useLocation } from 'react-router-dom'

interface Tab {
  label: string
  path: string
  basePath: string
}

const TABS: Tab[] = [
  { label: 'Главная', path: '/', basePath: '/' },
  { label: 'Гайды коммюнити', path: '/community', basePath: '/community' },
]

export function getCurrentTab(pathname: string): Tab {
  const path = pathname === '/' ? '/' : (pathname.replace(/\/$/, '') || '/')
  const normalized = path.startsWith('/') ? path : '/' + path

  const sorted = [...TABS].sort((a, b) => b.basePath.length - a.basePath.length)
  for (const tab of sorted) {
    if (tab.basePath === '/') {
      if (normalized === '/') return tab
    } else if (normalized === tab.basePath || normalized.startsWith(tab.basePath + '/')) {
      return tab
    }
  }
  return TABS[0]
}

export default function Tabs() {
  const location = useLocation()
  const currentTab = getCurrentTab(location.pathname)

  return (
    <nav className="md-tabs">
      <div className="md-tabs__inner">
        {TABS.map((tab) => {
          const isActive = currentTab.basePath === tab.basePath
          return (
            <div key={tab.path} className={`md-tabs__item ${isActive ? 'md-tabs__item--active' : ''}`}>
              <NavLink
                to={tab.path}
                className="md-tabs__link"
                end={tab.path === '/'}
              >
                {tab.label}
              </NavLink>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
