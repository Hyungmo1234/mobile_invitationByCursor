'use client'

import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function InvitationInfo() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: dateRef, isVisible: dateVisible } = useScrollAnimation()
  const { ref: messageRef, isVisible: messageVisible } = useScrollAnimation()
  const { ref: namesRef, isVisible: namesVisible } = useScrollAnimation()

  return (
    <section ref={sectionRef} className={`relative py-16 px-4 overflow-hidden min-h-screen md:min-h-[80vh] ${sectionVisible ? 'scroll-animate visible' : 'scroll-animate'}`}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background2.jpg"
          alt="배경"
          fill
          className="object-cover"
          quality={90}
        />
        {/* 어두운 오버레이 (텍스트 가독성 향상) */}
        <div className="absolute inset-0 bg-black/20"></div>
        {/* 부드러운 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50"></div>
      </div>
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-12">
        {/* 날짜와 시간 */}
        <div ref={titleRef} className={`space-y-4 ${titleVisible ? 'scroll-animate-fade visible' : 'scroll-animate-fade'}`}>
          <div className="inline-block border-t border-wedding-gold/30 w-24"></div>
          <h2 className="text-3xl font-serif text-gray-800">결혼합니다</h2>
          <div className="inline-block border-t border-wedding-gold/30 w-24"></div>
        </div>


        {/* 인사말 */}
        <div ref={messageRef} className={`pt-12 space-y-6 ${messageVisible ? 'scroll-animate-fade visible' : 'scroll-animate-fade'}`}>
          <div className="inline-block border-t border-wedding-gold/30 w-24"></div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              서로가 마주 보며 다져온 사랑을
              <br />
              이제 함께 한 곳을 바라보며
              <br />
              걸어가고자 합니다.
            </p>
            <p>
              저희 두 사람이 사랑의 이름으로
              <br />
              지켜나갈 수 있도록
              <br />
              앞날을 축복해 주시면
              <br />
              감사하겠습니다.
            </p>
          </div>
          <div className="inline-block border-t border-wedding-gold/30 w-24"></div>
        </div>

        {/* 신랑/신부 이름 */}
        <div ref={namesRef} className={`pt-12 space-y-4 ${namesVisible ? 'scroll-animate-scale visible' : 'scroll-animate-scale'}`}>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800 mb-1">양형모</p>
              <p className="text-sm text-gray-600">양태제 이인옥의 아들</p>
            </div>
            <div className="text-wedding-gold text-2xl font-light">&</div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800 mb-1">이진경</p>
              <p className="text-sm text-gray-600">이문영 천영희의 딸</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

