import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const MESSAGES_FILE = path.join(DATA_DIR, 'guestbook.json')

// 파일에서 메시지 읽기
function readMessages(): any[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const fileContent = fs.readFileSync(MESSAGES_FILE, 'utf-8')
      const messages = JSON.parse(fileContent)
      // 빈 배열이거나 유효한 메시지 배열인지 확인
      if (Array.isArray(messages) && messages.length > 0) {
        return messages
      }
      // 빈 배열이거나 유효하지 않으면 파일 삭제
      if (fs.existsSync(MESSAGES_FILE)) {
        fs.unlinkSync(MESSAGES_FILE)
      }
    }
  } catch (error) {
    console.error('메시지 파일 읽기 실패:', error)
    // 파일이 손상되었으면 삭제
    try {
      if (fs.existsSync(MESSAGES_FILE)) {
        fs.unlinkSync(MESSAGES_FILE)
      }
    } catch (deleteError) {
      console.error('파일 삭제 실패:', deleteError)
    }
  }
  // 기본값은 빈 배열
  return []
}

// 파일에 메시지 저장
function writeMessages(messages: any[]): void {
  try {
    // data 디렉토리가 없으면 생성
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8')
  } catch (error) {
    console.error('메시지 파일 저장 실패:', error)
    throw error
  }
}

// GET: 메시지 목록 가져오기
export async function GET() {
  try {
    const messages = readMessages()
    return NextResponse.json({ messages })
  } catch (error) {
    console.error('메시지 불러오기 실패:', error)
    return NextResponse.json(
      { error: '메시지를 불러올 수 없습니다.' },
      { status: 500 }
    )
  }
}

// POST: 새 메시지 추가
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message } = body

    if (!name || !message || !name.trim() || !message.trim()) {
      return NextResponse.json(
        { error: '이름과 메시지를 입력해주세요.' },
        { status: 400 }
      )
    }

    const messages = readMessages()
    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('ko-KR').replace(/\./g, '.').slice(0, -1),
    }

    const updatedMessages = [newMessage, ...messages]
    writeMessages(updatedMessages)

    return NextResponse.json({ success: true, message: newMessage })
  } catch (error) {
    console.error('메시지 저장 실패:', error)
    return NextResponse.json(
      { error: '메시지를 저장할 수 없습니다.' },
      { status: 500 }
    )
  }
}

