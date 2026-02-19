'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownCalendar() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [calendarBgError, setCalendarBgError] = useState(false)
  
  // 결혼식 날짜: 2026년 5월 24일 일요일 오전 11시
  const weddingDate = new Date('2026-05-24T11:00:00')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  // 5월 2026 캘린더 생성
  const getCalendarDays = () => {
    const year = 2026
    const month = 4 // 5월 (0-indexed)
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days: (number | null)[] = []

    // 빈 칸 추가 (첫 날 이전)
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const calendarDays = getCalendarDays()
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']
  const weddingDay = 24

  return (
    <section ref={sectionRef} className={`py-16 px-4 ${sectionVisible ? 'scroll-animate visible' : 'scroll-animate'}`} style={{ backgroundColor: '#94857C' }}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50">
          {/* 캘린더 */}
          <div className="mb-8 relative rounded-xl overflow-hidden">
            {/* 배경 이미지 - 캘린더에만 적용 */}
            <div className="absolute inset-0 z-0">
              {!calendarBgError ? (
                <>
                  <img
                    src="/images/background3.jpg"
                    alt="캘린더 배경"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => setCalendarBgError(true)}
                  />
                  {/* 오버레이 (최소한만) */}
                  <div className="absolute inset-0 bg-white/10"></div>
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100/30"></div>
              )}
            </div>
            {/* 캘린더 콘텐츠 */}
            <div className="p-6 pb-8">
              <div className="text-center mb-5 pt-2">
                <h3 className="text-xl font-semibold text-gray-800 drop-shadow-md">2026년 5월</h3>
              </div>
              
              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 gap-1.5 mb-3">
                {weekDays.map((day, index) => (
                  <div
                    key={day}
                    className={`text-center text-sm font-semibold py-2.5 ${
                      index === 0 || index === 6
                        ? 'text-red-500'
                        : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* 캘린더 날짜 */}
              <div className="grid grid-cols-7 gap-1.5 relative z-10">
                {calendarDays.map((day, index) => {
                  const isSunday = index % 7 === 0
                  const isSaturday = index % 7 === 6
                  const isWeddingDay = day === weddingDay

                  if (day === null) {
                    return <div key={index} className="aspect-[4/5]"></div>
                  }

                  return (
                    <div
                      key={index}
                      className={`aspect-[4/5] flex items-center justify-center text-sm font-medium rounded-lg transition-all relative z-10 ${
                        isWeddingDay
                          ? 'bg-amber-400 text-white shadow-lg scale-110 font-bold ring-2 ring-amber-500'
                          : isSunday
                          ? 'text-red-600 drop-shadow-md'
                          : isSaturday
                          ? 'text-blue-600 drop-shadow-md'
                          : 'text-gray-800 drop-shadow-md'
                      }`}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6 relative z-10"></div>

          {/* 카운트다운 타이머 */}
          <div className="grid grid-cols-4 gap-3 mb-6 relative z-10">
            <div className="p-4 text-center">
              <div className="text-3xl font-bold text-amber-900 mb-1">
                {timeLeft.days}
              </div>
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Days
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-3xl font-bold text-amber-900 mb-1">
                {timeLeft.hours}
              </div>
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Hours
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-3xl font-bold text-amber-900 mb-1">
                {timeLeft.minutes}
              </div>
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Minutes
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-3xl font-bold text-amber-900 mb-1">
                {timeLeft.seconds}
              </div>
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Seconds
              </div>
            </div>
          </div>

          {/* 하단 메시지 */}
          <div className="text-center relative z-10">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">양형모</span>
              <span className="text-red-500 mx-2">❤️</span>
              <span className="font-semibold">이진경</span>
              <br />
              <span className="text-gray-600">결혼식이 </span>
              <span className="text-amber-600 font-bold text-base">{timeLeft.days}</span>
              <span className="text-gray-600">일 남았습니다</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

