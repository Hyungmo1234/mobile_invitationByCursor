'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function LocationInfo() {
  const [showMapModal, setShowMapModal] = useState(false)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation()
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollAnimation()

  const handleKakaoMap = () => {
    const mapUrl = 'https://map.kakao.com/link/map/더컨벤션영등포,37.5265,126.8962'
    window.open(mapUrl, '_blank')
    setShowMapModal(false)
  }

  const handleNaverMap = () => {
    const mapUrl = 'https://map.naver.com/v5/search/더컨벤션영등포'
    window.open(mapUrl, '_blank')
    setShowMapModal(false)
  }

  return (
    <section ref={sectionRef} className={`relative py-16 px-4 overflow-hidden min-h-screen md:min-h-[80vh] ${sectionVisible ? 'scroll-animate visible' : 'scroll-animate'}`}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background4.jpg"
          alt="배경"
          fill
          className="object-cover"
          quality={90}
        />
        {/* 오버레이 (텍스트 가독성 향상) */}
        <div className="absolute inset-0 bg-white/30"></div>
      </div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* 장소 정보 */}
          <div ref={infoRef} className={`bg-gradient-to-br from-pink-50/50 to-rose-50/50 rounded-2xl p-6 shadow-md ${infoVisible ? 'scroll-animate-scale visible' : 'scroll-animate-scale'}`}>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  더컨벤션 영등포
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  도로명: 서울 영등포구 국회대로38길 2
                </p>
                <p className="text-gray-600 text-sm">
                  지번: 서울 영등포구 당산동3가 93-2
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    🚇 지하철
                  </p>
                  <p className="text-sm text-gray-600">
                    2, 5호선 영등포구청역 4번 출구 도보 5분
                    <br />
                    <span className="text-gray-500">영등포경찰서 인근 더컨벤션 영등포</span>
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* 지도 버튼 */}
          <div ref={buttonRef}>
            <button
              onClick={() => setShowMapModal(true)}
              className={`w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 ${buttonVisible ? 'scroll-animate visible' : 'scroll-animate'}`}
            >
            지도에서 보기
          </button>
          </div>
        </div>
      </div>

      {/* 지도 선택 모달 */}
      {showMapModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowMapModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                지도 선택
              </h3>
              
              <button
                onClick={handleKakaoMap}
                className="w-full bg-[#FEE500] text-gray-800 py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>카카오맵</span>
              </button>

              <button
                onClick={handleNaverMap}
                className="w-full bg-[#03C75A] text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156l8.897 12.845H24V0h-7.727v12.845z"/>
                </svg>
                <span>네이버지도</span>
              </button>

              <button
                onClick={() => setShowMapModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all active:scale-95 mt-2"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

