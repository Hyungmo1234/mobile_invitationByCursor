# 모바일 청첩장

아름다운 모바일 청첩장 웹 애플리케이션입니다.

## 기능

- 📱 모바일 최적화 반응형 디자인
- 🖼️ 이미지 갤러리
- 📍 장소 정보 및 지도 연동
- 💬 축하 메시지 방명록
- 📤 카카오톡 공유 기능
- 📱 QR코드 생성 및 다운로드
- 🎨 아름다운 웨딩 테마 디자인

## 시작하기

### 사전 요구사항

- **Node.js 18 이상** 필요 ([다운로드](https://nodejs.org/))
- 설치 확인: `node --version`, `npm --version`

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 모바일에서 테스트하기

1. 컴퓨터와 모바일이 같은 Wi-Fi에 연결
2. 컴퓨터의 IP 주소 확인 (PowerShell에서 `ipconfig` 실행)
3. 모바일 브라우저에서 `http://[컴퓨터IP]:3000` 접속
   - 예: `http://192.168.0.10:3000`

**더 자세한 실행 가이드는 `실행가이드.md` 파일을 참고하세요.**

### 빌드

```bash
npm run build
npm start
```

## 커스터마이징

### 청첩장 정보 수정

`components/InvitationHeader.tsx`와 `components/InvitationInfo.tsx`에서 신랑/신부 이름, 날짜, 장소 등을 수정할 수 있습니다.

### 이미지 추가

`public/images/` 폴더에 이미지를 추가하고 `components/ImageGallery.tsx`의 `sampleImages` 배열을 수정하세요.

### 카카오톡 공유 설정

카카오톡 공유 기능을 사용하려면:
1. [카카오 개발자 센터](https://developers.kakao.com/)에서 앱을 등록
2. `.env.local` 파일에 `NEXT_PUBLIC_KAKAO_JS_KEY` 추가
3. `app/layout.tsx`에 카카오 SDK 스크립트 추가

## 기술 스택

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- qrcode.react

