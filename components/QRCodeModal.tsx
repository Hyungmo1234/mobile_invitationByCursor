'use client'

import { useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface QRCodeModalProps {
  url: string
  onClose: () => void
}

export default function QRCodeModal({ url, onClose }: QRCodeModalProps) {
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')

      const downloadLink = document.createElement('a')
      downloadLink.download = 'wedding-invitation-qrcode.png'
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">QR코드</h3>
          
          <div ref={qrRef} className="flex justify-center bg-white p-4 rounded-lg">
            <QRCodeSVG
              value={url}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>

          <p className="text-sm text-gray-600">
            QR코드를 스캔하여 청첩장을 확인하세요
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              다운로드
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-all active:scale-95"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

