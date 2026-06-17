export interface NavItem {
  label: string
  path?: string
  docPath?: string
  children?: NavItem[]
}

export const DOC_PATH_BY_ROUTE: Record<string, string> = {
  '/': 'index.md',
  '/guides/core': 'guides/core.md',
  '/guides/version': 'guides/version.md',
  '/guides/sftp': 'guides/sftp.md',
  '/guides/plugins': 'guides/plugins.md',
  '/guides/domain': 'guides/domain.md',
  '/guides/spark': 'guides/spark.md',
  '/guides/server.properties': 'guides/server.properties.md',
  '/guides/proxy': 'guides/proxy.md',
  '/guides/voicechat': 'guides/voicechat.md',
  '/community': 'community/index.md',
  '/community/discord': 'community/discord.md',
  '/community/gradient': 'community/gradient.md',
  '/community/plasmo-voice': 'community/plasmo-voice.md',
  '/community/optimization': 'community/optimization.md',
  '/community/zapret': 'community/zapret.md',
}

export const DOC_PATH_TO_ROUTE: Record<string, string> = Object.fromEntries(
  Object.entries(DOC_PATH_BY_ROUTE).map(([route, docPath]) => [docPath, route])
)

export const NAV: NavItem[] = [
  {
    label: 'Официальные гайды',
    path: '/',
    docPath: 'index.md',
    children: [
      { label: 'Введение', path: '/', docPath: 'index.md' },
      { label: 'Ядра', path: 'guides/core', docPath: 'guides/core.md' },    
      { label: 'Смена версии', path: 'guides/version', docPath: 'guides/version.md' },
      { label: 'Плагины', path: 'guides/plugins', docPath: 'guides/plugins.md' },
      { label: 'Подключение к SFTP', path: 'guides/sftp', docPath: 'guides/sftp.md' },
      { label: 'Подключение своего домена к серверу', path: 'guides/domain', docPath: 'guides/domain.md' },
      { label: 'Spark', path: 'guides/spark', docPath: 'guides/spark.md' },
      { label: 'Server.properties', path: 'guides/server.properties', docPath: 'guides/server.properties.md' },
      { label: 'Настройка прокси сервера', path: 'guides/proxy', docPath: 'guides/proxy.md' },
      { label: 'Настройка голосового чата', path: 'guides/voicechat', docPath: 'guides/voicechat.md' },
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
      { label: 'Фикс узла Rage 2 / Фикс подключения к Minecraft серверам', path: 'community/zapret', docPath: 'community/zapret.md' },
    ],
  },
]
