import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
  {
    id: 'img-1',
    src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
    alt: 'Камерна сцена з живим виступом у KavaBAR',
  },
  {
    id: 'img-2',
    src: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80',
    alt: 'Зосереджені глядачі на поетичному вечорі',
  },
  {
    id: 'img-3',
    src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    alt: 'Музикант на сцені KavaBAR',
  },
  {
    id: 'img-4',
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    alt: 'Кава у руках гостя під час вечора',
  },
  {
    id: 'img-5',
    src: 'https://images.unsplash.com/photo-1485872299829-c44e56252dc2?w=800&q=80',
    alt: 'Аплодисменти після виступу',
  },
  {
    id: 'img-6',
    src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    alt: 'Атмосфера живої музики у камерному просторі',
  },
  {
    id: 'img-7',
    src: 'https://images.unsplash.com/photo-1529543544282-bba04f5023e0?w=800&q=80',
    alt: 'Поетичний слем — відкритий мікрофон',
  },
  {
    id: 'img-8',
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
    alt: 'Кавові напої на столі під час вечора',
  },
  {
    id: 'img-9',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    alt: 'Гості насолоджуються виступом',
  },
]

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const isOpen = lightboxIndex !== null

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    )
  }, [])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    )
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, goToPrev, goToNext])

  return (
    <section className="bg-muted px-4 py-20 md:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Як це було
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Кілька фото з минулих вечорів — камерна сцена, зосереджені обличчя,
            аплодисменти, кава у руках
          </p>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={`Відкрити фото: ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90"
          role="dialog"
          aria-modal="true"
          aria-label="Перегляд фото"
        >
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={closeLightbox}
            aria-hidden="true"
          />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-card/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-card/40 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Закрити"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute left-4 top-4 z-10 rounded-full bg-card/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            {lightboxIndex! + 1} з {galleryImages.length}
          </div>

          {/* Prev button */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/20 p-3 text-white backdrop-blur-sm transition-colors hover:bg-card/40 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Попереднє фото"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/20 p-3 text-white backdrop-blur-sm transition-colors hover:bg-card/40 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Наступне фото"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Main image */}
          <img
            src={galleryImages[lightboxIndex!].src.replace('w=800', 'w=1400')}
            alt={galleryImages[lightboxIndex!].alt}
            className="relative z-[1] max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  )
}
