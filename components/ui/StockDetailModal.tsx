'use client'

import { StockData } from '@/types/stock'

interface StockDetailModalProps {
  stockData: StockData
  stockInfo: { symbol: string; name: string }
  market: 'KOSPI' | 'KOSDAQ'
  isOpen: boolean
  onClose: () => void
}

export default function StockDetailModal({ 
  stockData, 
  stockInfo, 
  market, 
  isOpen, 
  onClose 
}: StockDetailModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{stockInfo.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">종목코드:</span>
            <span className="font-mono">{stockInfo.symbol}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">시장:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              market === 'KOSPI' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {market}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">현재가:</span>
            <span className="font-bold text-lg">{stockData.price.toLocaleString()}원</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">등락률:</span>
            <span className={`font-bold ${
              stockData.changeRate > 0 ? 'text-red-600' : 
              stockData.changeRate < 0 ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {stockData.changeRate > 0 ? '+' : ''}{stockData.changeRate.toFixed(2)}%
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">거래량:</span>
            <span>{stockData.volume.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">시가총액:</span>
            <span>{stockData.marketCap.toLocaleString()}원</span>
          </div>
          
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
