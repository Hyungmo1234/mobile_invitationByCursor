'use client'

import Image from 'next/image'

export default function InvitationHeader() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background1.jpg"
          alt="메인 배경"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* 어두운 오버레이 (텍스트 가독성 향상) */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* 부드러운 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center px-6 space-y-6">
        <div className="space-y-2">
          <p className="text-wedding-gold text-lg font-light tracking-wider drop-shadow-lg">
            INVITATION
          </p>
        </div>

        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white drop-shadow-lg">양형모</p>
            </div>
            <div className="text-wedding-gold text-3xl font-light drop-shadow-lg">&</div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white drop-shadow-lg">이진경</p>
            </div>
          </div>
        </div>

        <div className="pt-12">
          <div className="inline-block border-t border-wedding-gold/50 w-32 drop-shadow-md"></div>
        </div>

        <div className="pt-10 space-y-2">
          <p className="text-white text-lg drop-shadow-lg">2026년 5월 24일 일요일 오후 11시</p>
          <p className="text-white/90 drop-shadow-md">더컨벤션 영등포</p>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg
          className="w-6 h-6 text-wedding-gold drop-shadow-lg"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  )
}

