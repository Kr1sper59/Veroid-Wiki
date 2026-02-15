import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useLocation, Link } from 'react-router-dom'
import { DOC_PATH_BY_ROUTE, DOC_PATH_TO_ROUTE } from '../routes'
import CodeBlock from './CodeBlock'

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

const FRONTMATTER_REGEX = /^---\r?\n[\s\S]*?\r?\n---\r?\n/

function stripFrontmatter(md: string): string {
  return md.replace(FRONTMATTER_REGEX, '').trim()
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

  const docPath = getDocPath(location.pathname)
  const currentDocPath = getCurrentDocPath(location.pathname)

  useEffect(() => {
    if (!docPath) {
      setContent('')
      setLoading(false)
      setError('Страница не найдена')
      return
    }
    setLoading(true)
    setError(null)
    const url = `/docs/${encodeURI(docPath)}`
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((text) => {
        setContent(stripFrontmatter(text))
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Ошибка загрузки')
        setContent('')
      })
      .finally(() => setLoading(false))
  }, [docPath])

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
    ? `/docs/${currentDocPath.replace(/\/[^/]+$/, '')}/`
    : '/docs/'

  const resolveImageSrc = (src: string | undefined): string => {
    if (!src || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/'))
      return src ?? ''
    return imageBase + src.replace(/^\.\//, '')
  }

  return (
    <article className="md-content md-rendered">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children, ...props }: any) => {
            if (children && typeof children === 'object' && 'props' in children) {
              const codeProps = children.props
              const className = codeProps?.className || ''
              const codeString = String(codeProps.children || '').replace(/\n$/, '')
              return <CodeBlock className={className}>{codeString}</CodeBlock>
            }
            
            return <pre {...props}>{children}</pre>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
