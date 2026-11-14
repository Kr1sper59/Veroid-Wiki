import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkAlert from 'remark-github-blockquote-alert'
import rehypeRaw from 'rehype-raw'
import { useLocation, Link } from 'react-router-dom'
import { DOC_PATH_BY_ROUTE, DOC_PATH_TO_ROUTE } from '../routes'
import CodeBlock from './CodeBlock'
import TableOfContents from './TableOfContents'

function toAppPath(href: string): string | null {
  if (!href.startsWith('/') || href === '/') return null
  const path = href.replace(/\/$/, '').toLowerCase()
  if (DOC_PATH_BY_ROUTE[path]) return path
  return null
}

function getCurrentDocPath(pathname: string): string | null {
  const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/'
  return DOC_PATH_BY_ROUTE[path] ?? null
}

function resolveRelativeLink(currentDocPath: string | null, href: string): string | null {
  if (!currentDocPath || !href || href.includes('://') || href.startsWith('#') || href.startsWith('mailto:'))
    return null
  const baseDir = currentDocPath.includes('/') ? currentDocPath.replace(/\/[^/]+$/, '') + '/' : ''
  const resolved = (baseDir + href).replace(/\/+/g, '/').replace(/\/$/, '')
  const normalized = resolved.endsWith('.md') ? resolved : resolved + '.md'
  return DOC_PATH_TO_ROUTE[normalized] ?? DOC_PATH_TO_ROUTE[normalized.replace(/\/index\.md$/, '.md')] ?? null
}

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/

function stripFrontmatter(md: string): string {
  return md.replace(FRONTMATTER_REGEX, '').trim()
}

function parseFrontmatter(md: string): { hideToc?: boolean; author?: string; authorDiscord?: string } {
  const match = md.match(FRONTMATTER_REGEX)
  if (!match) return {}

  const frontmatter = match[1]
  const hideTocMatch = frontmatter.match(/hideToc:\s*(true|false)/i)
  const authorMatch = frontmatter.match(/author:\s*(.+)/i)
  const authorDiscordMatch = frontmatter.match(/authorDiscord:\s*(.+)/i)

  return {
    hideToc: hideTocMatch ? hideTocMatch[1].toLowerCase() === 'true' : undefined,
    author: authorMatch ? authorMatch[1].trim() : undefined,
    authorDiscord: authorDiscordMatch ? authorDiscordMatch[1].trim() : undefined
  }
}

function generateHeadingId(text: string | React.ReactNode): string {
  const textContent = typeof text === 'string' ? text : String(text)
  return textContent
    .toLowerCase()
    .replace(/[^\wа-яёА-ЯЁ\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function getDocPath(pathname: string): string | null {
  const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/'
  return DOC_PATH_BY_ROUTE[path] ?? null
}

export default function MarkdownPage() {
  const location = useLocation()
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hideToc, setHideToc] = useState(false)
  const [author, setAuthor] = useState<string | undefined>()
  const [authorDiscord, setAuthorDiscord] = useState<string | undefined>()

  const baseUrl = import.meta.env.BASE_URL || '/'
  const baseNoTrailingSlash = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const docsBase = `${baseUrl}docs/`

  const docPath = getDocPath(location.pathname)
  const currentDocPath = getCurrentDocPath(location.pathname)

  useEffect(() => {
    if (!docPath) {
      setTimeout(() => {
        setContent('')
        setLoading(false)
        setError('Страница не найдена')
      }, 0)
      return
    }
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setError(null)
    const url = `${docsBase}${encodeURI(docPath)}`
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((text) => {
        const metadata = parseFrontmatter(text)
        setHideToc(metadata.hideToc ?? false)
        setAuthor(metadata.author)
        setAuthorDiscord(metadata.authorDiscord)
        setContent(stripFrontmatter(text))
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Ошибка загрузки')
        setContent('')
      })
      .finally(() => setLoading(false))
  }, [docPath, docsBase])

  if (loading) {
    return (
      <div className="md-content md-loading">
        <p>Загрузка…</p>
      </div>
    )
  }

  if (error || !content) {
    return (
      <div className="md-content md-error">
        <h1>Ошибка</h1>
        <p>{error ?? 'Страница не найдена.'}</p>
      </div>
    )
  }

  const imageBase = currentDocPath
    ? `${docsBase}${currentDocPath.replace(/\/[^/]+$/, '')}/`
    : docsBase

  const resolveImageSrc = (src: string | undefined): string => {
    if (!src) return ''
    if (src.startsWith('http://') || src.startsWith('https://')) return src
    if (src.startsWith('/')) {
      if (baseNoTrailingSlash && src.startsWith(baseNoTrailingSlash + '/')) return src
      return `${baseNoTrailingSlash}${src}`
    }
    return imageBase + src.replace(/^\.\//, '')
  }

  return (
    <>
      <article className="md-content md-rendered">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkAlert]}
          rehypePlugins={[rehypeRaw]}
          components={{
          a: ({ href, children, ...props }) => {
            if (!href) return <span {...props}>{children}</span>
            const appPath = toAppPath(href) ?? resolveRelativeLink(currentDocPath, href)
            if (appPath !== null) {
              return (
                <Link to={appPath} {...props}>
                  {children}
                </Link>
              )
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            )
          },
          img: ({ src, alt, ...props }) => (
            <img src={resolveImageSrc(src)} alt={alt ?? ''} loading="lazy" {...props} />
          ),
          h2: ({ children, ...props }) => {
            const id = generateHeadingId(children)
            return <h2 id={id} {...props}>{children}</h2>
          },
          h3: ({ children, ...props }) => {
            const id = generateHeadingId(children)
            return <h3 id={id} {...props}>{children}</h3>
          },
          code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
            const text = String(children ?? '')
            const isReallyInline = (!text.includes('\n') && text.length < 200) || inline === true
            if (isReallyInline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
            return (
              <CodeBlock className={className}>
                {text}
              </CodeBlock>
            )
          },
          pre: ({ children }: { children?: React.ReactNode }) => <pre>{children}</pre>,
        }}
      >
        {content}
      </ReactMarkdown>
      {(author || authorDiscord) && (
        <div className="md-article-meta">
          <div className="md-article-meta__inner">
            <span className="md-article-meta__label">Автор статьи:</span>
            {authorDiscord ? (
              <a
                href={authorDiscord}
                target="_blank"
                rel="noopener noreferrer"
                className="md-article-meta__author"
              >
                {author || 'Неизвестный автор'}
              </a>
            ) : (
              <span className="md-article-meta__author">{author}</span>
            )}
          </div>
        </div>
      )}
      </article>
      {!hideToc && <TableOfContents content={content} />}
    </>
  )
}
