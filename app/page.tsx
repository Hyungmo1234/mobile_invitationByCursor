'use client'

import { useState, useEffect } from 'react'
import ImageGallery from '@/components/ImageGallery'
import InvitationHeader from '@/components/InvitationHeader'
import InvitationInfo from '@/components/InvitationInfo'
import ShareButtons from '@/components/ShareButtons'
import QRCodeModal from '@/components/QRCodeModal'
import LocationInfo from '@/components/LocationInfo'
import GuestBook from '@/components/GuestBook'
import CountdownCalendar from '@/components/CountdownCalendar'

export default function Home() {
  const [showQR, setShowQR] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  return (
    <main className="min-h-screen pb-20">
      {/* 메인 헤더 */}
      <InvitationHeader />

      {/* 청첩장 정보 */}
      <InvitationInfo />

      {/* 카운트다운 캘린더 */}
      <CountdownCalendar />

      {/* 장소 정보 */}
      <LocationInfo />

      {/* 방명록 */}
      <GuestBook />

      {/* 이미지 갤러리 */}
      <ImageGallery />

      {/* 공유 버튼 - 주석 처리 */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4 z-50">
        <div className="max-w-md mx-auto flex gap-3">
          <ShareButtons url={currentUrl} />
          <button
            onClick={() => setShowQR(true)}
            className="flex-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            QR코드 보기
          </button>
        </div>
      </div> */}

      {/* QR코드 모달 - 주석 처리 */}
      {/* {showQR && <QRCodeModal url={currentUrl} onClose={() => setShowQR(false)} />} */}
    </main>
  )
}

