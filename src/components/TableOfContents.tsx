import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\wа-яёА-ЯЁ\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const lines = content.split('\n')
    const extractedHeadings: Heading[] = []

    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)$/)
      const h3Match = line.match(/^###\s+(.+)$/)

      if (h2Match) {
        const text = h2Match[1].trim()
        const id = generateId(text)
        extractedHeadings.push({ id, text, level: 2 })
      } else if (h3Match) {
        const text = h3Match[1].trim()
        const id = generateId(text)
        extractedHeadings.push({ id, text, level: 3 })
      }
    })

    setHeadings(extractedHeadings)

    if (extractedHeadings.length > 0) {
      setActiveId(extractedHeadings[0].id)
    }
  }, [content])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="md-toc">
      <div className="md-toc__inner">
        <h2 className="md-toc__title">На этой странице</h2>
        <ul className="md-toc__list">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`md-toc__item md-toc__item--level${heading.level} ${
                activeId === heading.id ? 'md-toc__item--active' : ''
              }`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(heading.id)
                }}
                className="md-toc__link"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
