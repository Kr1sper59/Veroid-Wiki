import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Tabs from './Tabs'
import { getCurrentTab } from './tabs'
import { NAV } from '../routes'
import ImageLightbox from './Image'

export default function Layout() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const currentTab = getCurrentTab(location.pathname)
  const currentNavItem = NAV.find(
    (item) => item.path === currentTab.basePath
  )
  const sidebarItems = currentNavItem?.children || []

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  return (
    <div className="md-container">
      <header className="md-header">
        <div className="md-header__inner">
          <Link to="/" className="md-header__title">
            <img
              src="/assets/logo.png"
              alt="Veroid Wiki"
              className="md-header__logo"
            />
            <span className="md-header__site-name">
              Veroid Wiki
            </span>
          </Link>

          <Tabs />
          {sidebarItems.length > 0 && (
            <button
              className="md-burger"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(prev => !prev)}
            >
              ☰
            </button>
          )}

        </div>
      </header>

      <main className="md-main">
        {mobileOpen && (
          <div
            className="md-overlay"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {sidebarItems.length > 0 && (
          <Sidebar
            items={sidebarItems}
            className={mobileOpen ? 'is-open' : ''}
            onNavigate={() => setMobileOpen(false)}
          />
        )}

        <div
          className={`md-main__content ${sidebarItems.length === 0
            ? 'md-main__content--no-sidebar'
            : ''
            }`}
        >
          <main className="layout__content">
            <ImageLightbox>
              <Outlet />
            </ImageLightbox>
          </main>
        </div>
      </main>
      <footer className='layout__footer'>
        <a href="https://kr1sper.com">
          Created by Kr1sper_
        </a>
      </footer>
    </div>
  )
}
