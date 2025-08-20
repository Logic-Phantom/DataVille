import type { Metadata } from 'next'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr'
})

export const metadata: Metadata = {
  title: 'Live Data City - 실시간 주식 3D 시각화',
  description: '실시간 국내 주식 데이터를 3D 가상 도시로 시각화하여 주식 시장의 동향을 직관적으로 표현',
  manifest: '/manifest.json',
  themeColor: '#00ff88',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} ${notoSansKR.variable} bg-dark-bg text-white overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}
