'use client'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-dark-bg flex items-center justify-center z-50">
      <div className="text-center">
        {/* 로딩 애니메이션 */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-neon-green border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-neon-blue border-b-transparent rounded-full animate-spin animate-reverse"></div>
        </div>
        
        {/* 로딩 텍스트 */}
        <h2 className="text-2xl font-bold text-neon-green neon-text mb-2">
          Live Data City
        </h2>
        <p className="text-gray-400 animate-pulse">
          3D 주식 도시를 로딩중...
        </p>
      </div>
    </div>
  )
}
