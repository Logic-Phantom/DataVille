'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ControlPanel from '@/components/ui/ControlPanel'
import StockInfo from '@/components/ui/StockInfo'
import StatusBar from '@/components/ui/StatusBar'
import LoadingScreen from '@/components/ui/LoadingScreen'
import GlobalStockModal from '@/components/ui/GlobalStockModal'

// 3D 컴포넌트를 동적으로 로드 (SSR 방지)
const City = dynamic(() => import('@/components/city/City'), {
  ssr: false,
  loading: () => <LoadingScreen />
})

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-dark-bg">
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Suspense fallback={<LoadingScreen />}>
          <City />
        </Suspense>
      </div>

      {/* UI 오버레이 */}
      <div className="ui-overlay">
        {/* 상단 상태바 */}
        <StatusBar />
        
        {/* 좌측 컨트롤 패널 */}
        <ControlPanel />
        
        {/* 우측 주식 정보 */}
        <StockInfo />
      </div>
      
      {/* 전역 주식 상세 모달 */}
      <GlobalStockModal />
    </main>
  )
}
