'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface Message {
  id: number
  name: string
  message: string
  date: string
}

interface MessageItemProps {
  msg: Message
  index: number
}

function MessageItem({ msg, index }: MessageItemProps) {
  const { ref, isVisible } = useScrollAnimation({ rootMargin: '0px 0px -30px 0px' })
  
  return (
    <div
      ref={ref}
      className={`bg-white/50 rounded-xl p-6 shadow-md border border-pink-100 ${isVisible ? 'scroll-animate visible' : 'scroll-animate'}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-bold text-gray-900 drop-shadow-sm">{msg.name}</h4>
        <span className="text-xs text-gray-600 drop-shadow-sm">{msg.date}</span>
      </div>
      <p className="text-gray-800 leading-relaxed drop-shadow-sm font-medium">{msg.message}</p>
    </div>
  )
}

const STORAGE_KEY = 'wedding-guestbook-messages'

// localStorage에서 메시지 불러오기
const loadMessagesFromStorage = (): Message[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('메시지 불러오기 실패:', error)
  }
  
  // 기본 샘플 메시지
  return [
    {
      id: 1,
      name: '김철수',
      message: '축하합니다! 행복하게 사세요!',
      date: new Date().toLocaleDateString('ko-KR').replace(/\./g, '.').slice(0, -1),
    },
    {
      id: 2,
      name: '이영희',
      message: '두 분의 앞날을 축복합니다.',
      date: new Date().toLocaleDateString('ko-KR').replace(/\./g, '.').slice(0, -1),
    },
  ]
}

// localStorage에 메시지 저장하기
const saveMessagesToStorage = (messages: Message[]) => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  } catch (error) {
    console.error('메시지 저장 실패:', error)
  }
}

export default function GuestBook() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  
  const [messages, setMessages] = useState<Message[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', message: '' })

  // 컴포넌트 마운트 시 localStorage에서 메시지 불러오기
  useEffect(() => {
    const loadedMessages = loadMessagesFromStorage()
    setMessages(loadedMessages)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.message.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      name: formData.name.trim(),
      message: formData.message.trim(),
      date: new Date().toLocaleDateString('ko-KR').replace(/\./g, '.').slice(0, -1),
    }

    const updatedMessages = [newMessage, ...messages]
    setMessages(updatedMessages)
    saveMessagesToStorage(updatedMessages) // localStorage에 저장
    setFormData({ name: '', message: '' })
    setShowForm(false)
  }

  return (
    <section ref={sectionRef} className={`relative py-16 px-4 overflow-hidden min-h-screen md:min-h-[80vh] ${sectionVisible ? 'scroll-animate visible' : 'scroll-animate'}`}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background5.jpg"
          alt="배경"
          fill
          className="object-cover"
          quality={90}
        />
        {/* 오버레이 (텍스트 가독성 향상) */}
        <div className="absolute inset-0 bg-white/20"></div>
      </div>
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* 메시지 작성 버튼 */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 mb-8"
          >
            축하 메시지 남기기
          </button>
        )}

        {/* 메시지 작성 폼 */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white/50 rounded-2xl p-6 shadow-md mb-8 space-y-4"
          >
            <div>
              <input
                type="text"
                placeholder="이름"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-gray-900 placeholder:text-gray-500"
                maxLength={20}
              />
            </div>
            <div>
              <textarea
                placeholder="축하 메시지를 남겨주세요"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none bg-white/80 text-gray-900 placeholder:text-gray-500"
                rows={4}
                maxLength={200}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all active:scale-95"
              >
                등록
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setFormData({ name: '', message: '' })
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all active:scale-95"
              >
                취소
              </button>
            </div>
          </form>
        )}

        {/* 메시지 목록 */}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <MessageItem key={msg.id} msg={msg} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

