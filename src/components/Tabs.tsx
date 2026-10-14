import { NavLink, useLocation } from 'react-router-dom'
import { getCurrentTab, TABS } from './tabs'

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
