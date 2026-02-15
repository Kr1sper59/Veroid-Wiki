import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  children: string
  className?: string
}

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const code = String(children).replace(/\n$/, '')

  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyButton = (
    <button
      className="md-code-block__copy"
      onClick={handleCopy}
      aria-label="Копировать код"
      title={copied ? 'Скопировано!' : 'Копировать'}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )

  if (!language) {
    return (
      <div className="md-code-block">
        {copyButton}
        <pre className="md-code-block__pre">
          <code>{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className="md-code-block">
      {copyButton}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '6px',
          background: '#151B23',
        }}
        PreTag="div"
        codeTagProps={{
          style: {
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
            fontSize: '0.85rem',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
