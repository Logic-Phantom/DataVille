import { create } from 'zustand'
import { StockData, ConnectionStatus, ViewMode, EffectMode } from '@/types/stock'

interface StockStore {
  // 데이터
  stockData: Record<string, StockData>
  marketVolatility: number
  lastUpdate: number
  
  // 연결 상태
  connectionStatus: ConnectionStatus
  
  // UI 상태
  viewMode: ViewMode
  effectMode: EffectMode
  selectedStock: string | null
  
  // 액션
  updateStockData: (symbol: string, data: StockData) => void
  updateMultipleStocks: (stocks: Record<string, StockData>) => void
  setConnectionStatus: (status: ConnectionStatus) => void
  setViewMode: (mode: ViewMode) => void
  setEffectMode: (mode: EffectMode) => void
  selectStock: (symbol: string | null) => void
  calculateMarketVolatility: () => void
}

export const useStockStore = create<StockStore>((set, get) => ({
  // 초기 상태
  stockData: {},
  marketVolatility: 0,
  lastUpdate: 0,
  connectionStatus: { status: 'disconnected' },
  viewMode: 'overview',
  effectMode: 'normal',
  selectedStock: null,

  // 개별 주식 데이터 업데이트
  updateStockData: (symbol, data) => {
    set((state) => ({
      stockData: {
        ...state.stockData,
        [symbol]: data
      },
      lastUpdate: Date.now()
    }))
    get().calculateMarketVolatility()
  },

  // 여러 주식 데이터 일괄 업데이트
  updateMultipleStocks: (stocks) => {
    set((state) => ({
      stockData: {
        ...state.stockData,
        ...stocks
      },
      lastUpdate: Date.now()
    }))
    get().calculateMarketVolatility()
  },

  // 연결 상태 업데이트
  setConnectionStatus: (status) => {
    set({ connectionStatus: status })
  },

  // 뷰 모드 변경
  setViewMode: (mode) => {
    set({ viewMode: mode })
  },

  // 효과 모드 변경
  setEffectMode: (mode) => {
    set({ effectMode: mode })
  },

  // 주식 선택
  selectStock: (symbol) => {
    set({ selectedStock: symbol })
  },

  // 시장 변동성 계산
  calculateMarketVolatility: () => {
    const { stockData } = get()
    const stocks = Object.values(stockData)
    
    if (stocks.length === 0) {
      set({ marketVolatility: 0 })
      return
    }

    // 변동률의 표준편차로 변동성 계산
    const changeRates = stocks.map(stock => Math.abs(stock.changeRate))
    const avgChange = changeRates.reduce((sum, rate) => sum + rate, 0) / changeRates.length
    const variance = changeRates.reduce((sum, rate) => sum + Math.pow(rate - avgChange, 2), 0) / changeRates.length
    const volatility = Math.sqrt(variance) / 10 // 0-1 범위로 정규화

    set({ marketVolatility: Math.min(volatility, 1) })
  }
}))
