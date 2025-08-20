'use client'

import { useStockStore } from '@/stores/stockStore'
import { useStockWebSocket } from '@/hooks/useStockWebSocket'

export default function StatusBar() {
  const { lastUpdate, marketVolatility, connectionStatus } = useStockStore()
  useStockWebSocket() // WebSocket 연결 활성화

  const formatTime = (timestamp: number) => {
    if (!timestamp) return '--:--:--'
    return new Date(timestamp).toLocaleTimeString('ko-KR')
  }

  const getMarketStatus = () => {
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const currentTime = hour * 100 + minute

    // 장 시간: 09:00 ~ 15:30
    if (currentTime >= 900 && currentTime <= 1530) {
      return { status: '장중', color: 'text-neon-green' }
    } else if (currentTime >= 800 && currentTime < 900) {
      return { status: '장 시작 전', color: 'text-neon-yellow' }
    } else if (currentTime > 1530 && currentTime <= 1800) {
      return { status: '장 마감', color: 'text-neon-blue' }
    } else {
      return { status: '장외시간', color: 'text-gray-400' }
    }
  }

  const marketStatus = getMarketStatus()

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-dark-surface/80 backdrop-blur-sm px-6 py-3 rounded-lg neon-border border-neon-yellow">
      <div className="flex items-center gap-6 text-sm">
        {/* 로고 */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-neon-green to-neon-blue rounded"></div>
          <span className="font-bold text-neon-green neon-text">
            Live Data City
          </span>
        </div>

        {/* 시장 상태 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400">시장:</span>
          <span className={`font-semibold ${marketStatus.color}`}>
            {marketStatus.status}
          </span>
        </div>

        {/* 연결 상태 */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            connectionStatus.status === 'connected' ? 'bg-neon-green animate-pulse' :
            connectionStatus.status === 'connecting' ? 'bg-neon-yellow animate-pulse' :
            'bg-neon-red'
          }`} />
          <span className="text-gray-400">
            {connectionStatus.status === 'connected' ? '실시간' :
             connectionStatus.status === 'connecting' ? '연결중' :
             '오프라인'}
          </span>
        </div>

        {/* 마지막 업데이트 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400">업데이트:</span>
          <span className="text-white font-mono">
            {formatTime(lastUpdate)}
          </span>
        </div>

        {/* 변동성 지표 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400">변동성:</span>
          <div className="flex items-center gap-1">
            <div className="w-16 h-2 bg-dark-bg rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  marketVolatility > 0.7 ? 'bg-neon-red' :
                  marketVolatility > 0.4 ? 'bg-neon-yellow' :
                  'bg-neon-green'
                }`}
                style={{ width: `${marketVolatility * 100}%` }}
              />
            </div>
            <span className={`text-xs font-semibold ${
              marketVolatility > 0.7 ? 'text-neon-red' :
              marketVolatility > 0.4 ? 'text-neon-yellow' :
              'text-neon-green'
            }`}>
              {(marketVolatility * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
