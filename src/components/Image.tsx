import { useState, useEffect } from 'react'

type Props = { children: React.ReactNode }

export default function ImageLightbox({ children }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (preview) {
      const timeout = setTimeout(() => setShow(true), 10)
      return () => clearTimeout(timeout)
    } else {
      setShow(false)
    }
  }, [preview])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const img = target.closest('img') as HTMLImageElement | null
    if (img) setPreview(img.src)
  }

  const handleClose = () => {
    setShow(false)
    setTimeout(() => setPreview(null), 300) 
  }

  return (
    <>
      <div onClick={handleClick}>{children}</div>

      {preview && (
        <div
          className={`lightbox ${show ? 'show' : ''}`}
          onClick={handleClose}
        >
          <img src={preview} alt="Preview" className="lightbox__image" />
        </div>
      )}
    </>
  )
}
