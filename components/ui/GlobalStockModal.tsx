'use client'

import { useState, useEffect } from 'react'
import { StockData } from '@/types/stock'
import { formatMarketCap } from '@/utils/stockData'

interface StockModalData {
  stockData: StockData
  stockInfo: { symbol: string; name: string }
  market: 'KOSPI' | 'KOSDAQ'
}

export default function GlobalStockModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState<StockModalData | null>(null)

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      setModalData(event.detail)
      setIsOpen(true)
    }

    window.addEventListener('openStockModal', handleOpenModal as EventListener)
    
    return () => {
      window.removeEventListener('openStockModal', handleOpenModal as EventListener)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setModalData(null)
  }

  if (!isOpen || !modalData) return null

  const { stockData, stockInfo, market } = modalData

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{stockInfo.name}</h2>
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-400 text-sm">{stockInfo.symbol}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                market === 'KOSPI' 
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {market}
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-700/50 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Price Section */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6 border border-slate-700/30">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-bold text-white">{stockData.price.toLocaleString()}<span className="text-lg text-slate-400 ml-1">원</span></span>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-lg font-semibold ${
              stockData.changeRate > 0 
                ? 'bg-red-500/20 text-red-400' 
                : stockData.changeRate < 0 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-slate-500/20 text-slate-400'
            }`}>
              {stockData.changeRate > 0 && '↗'}
              {stockData.changeRate < 0 && '↘'}
              {stockData.changeRate > 0 ? '+' : ''}{stockData.changeRate.toFixed(2)}%
            </div>
          </div>
          <div className={`text-sm font-medium ${
            stockData.change > 0 ? 'text-red-400' : stockData.change < 0 ? 'text-blue-400' : 'text-slate-400'
          }`}>
            {stockData.change > 0 ? '+' : ''}{stockData.change.toLocaleString()}원
          </div>
        </div>
        
        {/* Details */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
            <span className="text-slate-300 font-medium">거래량</span>
            <span className="text-white font-mono">{stockData.volume.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
            <span className="text-slate-300 font-medium">시가총액</span>
            <span className="text-white font-semibold">{formatMarketCap(stockData.marketCap)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-300 font-medium">업데이트</span>
            <span className="text-slate-400 text-sm">{new Date(stockData.timestamp).toLocaleTimeString('ko-KR')}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
          >
            닫기
          </button>
          <button
            onClick={() => {
              // 네이버 금융 차트 페이지로 이동
              const naverFinanceUrl = `https://finance.naver.com/item/main.naver?code=${stockInfo.symbol}`
              window.open(naverFinanceUrl, '_blank')
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
          >
            차트
          </button>
        </div>
      </div>
    </div>
  )
}
