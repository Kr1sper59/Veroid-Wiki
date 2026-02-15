export interface NavItem {
  label: string
  path?: string
  docPath?: string
  children?: NavItem[]
}

export const DOC_PATH_BY_ROUTE: Record<string, string> = {
  '/': 'index.md',
  '/guides/kernel': 'guides/kernel.md',
  '/guides/version': 'guides/version.md',
  '/guides/sftp': 'guides/sftp.md',
  '/guides/domain': 'guides/domain.md',
  '/guides/spark': 'guides/spark.md',
  '/guides/server.propertis': 'guides/server.propertis.md',
  '/guides/proxy': 'guides/proxy.md',
  '/community': 'community/index.md',
  '/community/discord': 'community/discord.md',
  '/community/gradient': 'community/gradient.md',
  '/community/plasmo-voice': 'community/plasmo-voice.md',
  '/community/optimization': 'community/optimization.md',
}

export const DOC_PATH_TO_ROUTE: Record<string, string> = Object.fromEntries(
  Object.entries(DOC_PATH_BY_ROUTE).map(([route, docPath]) => [docPath, route])
)

export const NAV: NavItem[] = [
  {
    label: 'Главная',
    path: '/',
    docPath: 'index.md',
    children: [
      { label: 'Главная', path: '/', docPath: 'index.md' },
      { label: 'Ядра', path: 'guides/kernel', docPath: 'guides/kernel.md' },    
      { label: 'Смена версии', path: 'guides/version', docPath: 'guides/versoin.md' },
      { label: 'Подключение к SFTP', path: 'guides/sftp', docPath: 'guides/sftp.md' },
      { label: 'Подключение своего домена к серверу', path: 'guides/domain', docPath: 'guides/domain.md' },
      { label: 'Spark', path: 'guides/spark', docPath: 'guides/spark.md' },
      { label: 'Server.propertis', path: 'guides/server.propertis', docPath: 'guides/server.propertis.md' },
      { label: 'Настройка прокси сервера', path: 'guides/proxy', docPath: 'guides/proxy.md' },
    ]
  },
  {
    label: 'Гайды Коммюнити',
    path: '/community',
    docPath: 'community.md',
    children: [
      { label: 'Главная', path: 'community', docPath: 'community/index.md' },
      { label: 'Как подключить дискорд к биллингу', path: 'community/discord', docPath: 'community/discord.md' },
      { label: 'Как сделать переливающийся градиент в табе?', path: 'community/gradient', docPath: 'community/gradient.md' },
      { label: 'Настройка PlasmoVoice в связке с Velocity', path: 'community/plasmo-voice', docPath: 'community/plasmo-voice.md' },
      { label: 'Как оптимизировать свой сервер Minecraft', path: 'community/optimization', docPath: 'community/optimization.md' },
    ],
  },
]
