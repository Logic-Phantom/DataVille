'use client'

import { useStockStore } from '@/stores/stockStore'
import { ViewMode, EffectMode } from '@/types/stock'

export default function ControlPanel() {
  const { 
    viewMode, 
    effectMode, 
    connectionStatus,
    setViewMode, 
    setEffectMode 
  } = useStockStore()

  const viewModes: { value: ViewMode; label: string }[] = [
    { value: 'overview', label: '전체 보기' },
    { value: 'kospi', label: 'KOSPI' },
    { value: 'kosdaq', label: 'KOSDAQ' },
    { value: 'sector', label: '섹터별' },
  ]

  const effectModes: { value: EffectMode; label: string }[] = [
    { value: 'minimal', label: '최소' },
    { value: 'normal', label: '보통' },
    { value: 'enhanced', label: '강화' },
  ]

  return (
    <div className="fixed top-4 left-4 bg-dark-surface/80 backdrop-blur-sm p-4 rounded-lg neon-border border-neon-green min-w-[250px]">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${
          connectionStatus.status === 'connected' ? 'bg-neon-green animate-pulse' :
          connectionStatus.status === 'connecting' ? 'bg-neon-yellow animate-pulse' :
          'bg-neon-red'
        }`} />
        <h3 className="text-lg font-bold text-neon-green neon-text">
          컨트롤 패널
        </h3>
      </div>

      {/* 연결 상태 */}
      <div className="mb-4 p-2 bg-dark-bg/50 rounded">
        <p className="text-sm text-gray-300">
          상태: <span className={`font-semibold ${
            connectionStatus.status === 'connected' ? 'text-neon-green' :
            connectionStatus.status === 'connecting' ? 'text-neon-yellow' :
            'text-neon-red'
          }`}>
            {connectionStatus.status === 'connected' ? '연결됨' :
             connectionStatus.status === 'connecting' ? '연결중...' :
             connectionStatus.status === 'disconnected' ? '연결 끊김' :
             '오류'}
          </span>
        </p>
        {connectionStatus.message && (
          <p className="text-xs text-gray-400 mt-1">
            {connectionStatus.message}
          </p>
        )}
      </div>

      {/* 뷰 모드 선택 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-neon-blue mb-2">
          뷰 모드
        </label>
        <div className="grid grid-cols-2 gap-2">
          {viewModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => setViewMode(mode.value)}
              className={`px-3 py-2 text-sm rounded transition-all ${
                viewMode === mode.value
                  ? 'bg-neon-green/20 text-neon-green neon-border border-neon-green'
                  : 'bg-dark-bg/50 text-gray-300 hover:bg-neon-green/10 hover:text-neon-green'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* 효과 모드 선택 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-neon-blue mb-2">
          시각 효과
        </label>
        <div className="flex gap-2">
          {effectModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => setEffectMode(mode.value)}
              className={`px-3 py-2 text-sm rounded transition-all flex-1 ${
                effectMode === mode.value
                  ? 'bg-neon-blue/20 text-neon-blue neon-border border-neon-blue'
                  : 'bg-dark-bg/50 text-gray-300 hover:bg-neon-blue/10 hover:text-neon-blue'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* 도움말 */}
      <div className="text-xs text-gray-400 space-y-1">
        <p>• 마우스로 카메라 조작</p>
        <p>• 건물 클릭으로 상세 정보</p>
        <p>• 스크롤로 줌 인/아웃</p>
      </div>
    </div>
  )
}
