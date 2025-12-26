import type { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import { Playfair_Display, Noto_Sans_KR } from 'next/font/google'
import './globals.css'

// 커스텀 TTF 폰트 (app/fonts 폴더에 파일을 넣어야 합니다)
// public/fonts의 파일을 app/fonts로 복사하거나 아래 경로를 수정하세요
const mainFont = localFont({
  src: './fonts/mainFont.ttf',
  variable: '--font-main',
  display: 'swap',
  fallback: ['var(--font-noto)', 'sans-serif'],
})

const cafe24GalleryFont = localFont({
  src: './fonts/cafe24_gallery_font.ttf',
  variable: '--font-cafe24-gallery',
  display: 'swap',
  fallback: ['var(--font-noto)', 'sans-serif'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '양형모 & 이진경 모바일 청첩장',
  description: '아름다운 모바일 청첩장',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${playfairDisplay.variable} ${notoSansKR.variable} ${mainFont.variable} ${cafe24GalleryFont.variable}`}>
      <body className="antialiased">
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  )
}

