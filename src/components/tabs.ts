export interface Tab {
  label: string
  path: string
  basePath: string
}

export const TABS: Tab[] = [
  { label: 'Официальные гайды', path: '/', basePath: '/' },
  { label: 'Гайды комьюнити', path: '/community', basePath: '/community' },
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
