'use client'

import { useState, useRef, useEffect } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface MediaItem {
  id: number
  src: string
  alt: string
  type: 'image' | 'video' | 'intro'
}

const sampleImages: MediaItem[] = [
  { id: 0, src: '', alt: '인트로', type: 'intro' },
  { id: 1, src: '/images/photo1.jpg', alt: '사진 1', type: 'image' },
  { id: 2, src: '/images/photo2.jpg', alt: '사진 2', type: 'image' },
  { id: 3, src: '/images/photo3.jpg', alt: '사진 3', type: 'image' },
  { id: 4, src: '/images/photo4.jpg', alt: '사진 4', type: 'image' },
  { id: 5, src: '/images/photo5.jpg', alt: '사진 5', type: 'image' },
  { id: 6, src: '/images/photo6.jpg', alt: '사진 6', type: 'image' },
  { id: 7, src: '/images/video1.mp4', alt: '비디오 1', type: 'video' },
]

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [backgroundError, setBackgroundError] = useState(false)
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const sliderRef = useRef<HTMLDivElement>(null)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + sampleImages.length) % sampleImages.length)
  }

  // 터치 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
    setTouchEnd({ x: touch.clientX, y: touch.clientY })
  }

  // 터치 이동 - 수직 스크롤 우선
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.x && !touchStart.y) return
    
    const touch = e.targetTouches[0]
    const currentX = touch.clientX
    const currentY = touch.clientY
    
    const deltaX = Math.abs(currentX - touchStart.x)
    const deltaY = Math.abs(currentY - touchStart.y)
    
    // 수직 움직임이 수평보다 훨씬 크면 스크롤 허용
    if (deltaY > deltaX * 1.5 && deltaY > 15) {
      setTouchStart({ x: 0, y: 0 })
      setTouchEnd({ x: 0, y: 0 })
      return
    }
    
    // 수평 스와이프 처리
    if (deltaX > 10) {
      setTouchEnd({ x: currentX, y: currentY })
    }
  }

  // 터치 종료 - 스와이프 감지
  const handleTouchEnd = () => {
    if (!touchStart.x && !touchStart.y) {
      setTouchStart({ x: 0, y: 0 })
      setTouchEnd({ x: 0, y: 0 })
      return
    }
    
    const deltaX = touchStart.x - touchEnd.x
    const deltaY = Math.abs(touchStart.y - touchEnd.y)
    const minSwipeDistance = 50 // 최소 스와이프 거리

    // 수평 움직임이 수직보다 크고 최소 거리 이상이면 슬라이드
    if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // 왼쪽으로 스와이프 (다음 이미지)
        nextImage()
      } else {
        // 오른쪽으로 스와이프 (이전 이미지)
        prevImage()
      }
    }

    // 리셋
    setTouchStart({ x: 0, y: 0 })
    setTouchEnd({ x: 0, y: 0 })
  }

  // 현재 비디오만 재생하고 나머지는 일시정지
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex && sampleImages[index].type === 'video') {
          video.play().catch(() => {
            // 자동재생 실패 시 무시 (브라우저 정책)
          })
        } else {
          video.pause()
        }
      }
    })
  }, [currentIndex])

  return (
    <section ref={sectionRef} className={`relative py-8 md:py-16 px-4 overflow-hidden min-h-screen md:min-h-[80vh] ${sectionVisible ? 'scroll-animate visible' : 'scroll-animate'}`}>
      {/* 배경 이미지 또는 Fallback */}
      <div className="absolute inset-0 z-0">
        {!backgroundError ? (
          <>
            <img
              src="/images/background6.jpg"
              alt="갤러리 배경"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setBackgroundError(true)}
            />
            {/* 오버레이 (콘텐츠 가독성 향상) - 최소한만 */}
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/15"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-white"></div>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* 제목 */}
        <h2 className="text-2xl md:text-3xl font-cafe24 text-center text-gray-800 mb-6 md:mb-8">
          Gallery
        </h2>

        {/* 이미지 슬라이더 */}
        <div className="relative">
          {/* 왼쪽 화살표 */}
          <button
            onClick={prevImage}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all active:scale-95 hover:scale-110"
            aria-label="이전 이미지"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          {/* 미디어 컨테이너 */}
          <div 
            ref={sliderRef}
            className="relative w-full aspect-[3/4] md:aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden shadow-xl"
            style={{ touchAction: 'pan-y pan-x' }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out h-full will-change-transform"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {sampleImages.map((item, index) => (
                <div
                  key={item.id}
                  className="min-w-full h-full flex-shrink-0 relative flex items-center justify-center"
                >
                  {item.type === 'intro' ? (
                    <div className="w-full h-full bg-black/40 flex items-center justify-center">
                      <div className="text-center px-6 space-y-4">
                        <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                          혹시 저희들의 추억이 궁금하신가요?
                        </p>
                        <p className="text-white text-base md:text-lg font-medium leading-relaxed">
                          우측 화살표를 클릭해주세요!
                        </p>
                      </div>
                    </div>
                  ) : item.type === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el
                        }}
                        src={item.src}
                        className="w-full h-full object-contain"
                        autoPlay
                        muted
                        loop
                        playsInline
                        onError={() => {
                          console.error(`비디오 로드 실패: ${item.src}`)
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-contain"
                      style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', margin: '0 auto', display: 'block' }}
                      onError={(e) => {
                        console.error(`이미지 로드 실패: ${item.src}`)
                        // 이미지 로드 실패 시 placeholder 표시
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const placeholder = target.parentElement?.querySelector('.image-placeholder')
                        if (placeholder) {
                          (placeholder as HTMLElement).style.display = 'flex'
                        }
                      }}
                    />
                  )}
                  {/* 이미지 로드 실패 시 placeholder */}
                  {item.type === 'image' && (
                    <div className="image-placeholder absolute inset-0 w-full h-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center hidden">
                      <span className="text-gray-500 text-lg">사진 {item.id}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽 화살표 */}
          <button
            onClick={nextImage}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all active:scale-95 hover:scale-110"
            aria-label="다음 이미지"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center gap-1.5 md:gap-2 mt-4 md:mt-6">
          {sampleImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 md:h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-amber-500 w-6 md:w-8'
                  : 'bg-gray-300 hover:bg-gray-400 w-1.5 md:w-2'
              }`}
              aria-label={`${index + 1}번 이미지로 이동`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

