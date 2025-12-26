'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  url: string
}

export default function ShareButtons({ url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleKakaoShare = () => {
    // 카카오톡 공유 기능
    if (typeof window !== 'undefined' && (window as any).Kakao) {
      const { Kakao } = window as any
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '')
      }

      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '모바일 청첩장',
          description: '두 분의 만남을 축하합니다',
          imageUrl: `${url}/og-image.jpg`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      })
    } else {
      // 카카오톡 앱이 없을 경우 링크 복사 안내
      handleCopyLink()
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('링크 복사 실패:', err)
    }
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleKakaoShare}
        className="flex-1 bg-[#FEE500] text-gray-800 py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <span>카카오톡</span>
      </button>
      <button
        onClick={handleCopyLink}
        className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        {copied ? '복사됨!' : '링크복사'}
      </button>
    </div>
  )
}

