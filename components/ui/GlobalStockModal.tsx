'use client'

import { useState, useEffect } from 'react'
import { StockData } from '@/types/stock'

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{stockInfo.name}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">종목코드:</span>
            <span className="font-mono text-gray-800">{stockInfo.symbol}</span>
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
            <span className="font-bold text-lg text-gray-800">{stockData.price.toLocaleString()}원</span>
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
            <span className="text-gray-800">{stockData.volume.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">시가총액:</span>
            <span className="text-gray-800">{stockData.marketCap.toLocaleString()}원</span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
