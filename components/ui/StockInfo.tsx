'use client'

import { useStockStore } from '@/stores/stockStore'
import { ALL_MAJOR_STOCKS } from '@/shared/constants/stocks'
import { formatPrice, formatChangeRate, formatMarketCap } from '@/utils/stockData'

export default function StockInfo() {
  const { stockData, selectedStock, selectStock, marketVolatility } = useStockStore()

  const selectedStockData = selectedStock ? stockData[selectedStock] : null
  const selectedStockInfo = selectedStock ? 
    ALL_MAJOR_STOCKS.find(stock => stock.symbol === selectedStock) : null

  return (
    <div className="fixed top-4 right-4 bg-dark-surface/80 backdrop-blur-sm p-4 rounded-lg neon-border border-neon-blue min-w-[300px] max-h-[80vh] overflow-y-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-neon-blue neon-text">
          주식 정보
        </h3>
        <div className="text-sm text-gray-400">
          변동성: <span className={`font-semibold ${
            marketVolatility > 0.7 ? 'text-neon-red' :
            marketVolatility > 0.4 ? 'text-neon-yellow' :
            'text-neon-green'
          }`}>
            {(marketVolatility * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* 선택된 주식 상세 정보 */}
      {selectedStockData && selectedStockInfo ? (
        <div className="mb-6 p-4 bg-dark-bg/50 rounded-lg neon-border border-neon-green/50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xl font-bold text-neon-green">
              {selectedStockInfo.name}
            </h4>
            <button
              onClick={() => selectStock(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">종목코드:</span>
              <span className="text-white">{selectedStockData.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">현재가:</span>
              <span className="text-white font-bold">
                {selectedStockData.price.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">변동률:</span>
              <span className={`font-bold ${
                selectedStockData.changeRate > 0 ? 'text-neon-green' :
                selectedStockData.changeRate < 0 ? 'text-neon-red' :
                'text-neon-yellow'
              }`}>
                {formatChangeRate(selectedStockData.changeRate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">거래량:</span>
              <span className="text-white">
                {selectedStockData.volume.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">시가총액:</span>
              <span className="text-white">
                {formatMarketCap(selectedStockData.marketCap)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-dark-bg/30 rounded-lg text-center text-gray-400">
          건물을 클릭하여 상세 정보를 확인하세요
        </div>
      )}

      {/* 전체 종목 리스트 */}
      <div>
        <h4 className="text-md font-semibold text-neon-blue mb-3">
          주요 종목 현황
        </h4>
        
        {/* KOSPI 섹션 */}
        <div className="mb-4">
          <h5 className="text-sm font-medium text-neon-green mb-2">KOSPI</h5>
          <div className="space-y-1">
            {ALL_MAJOR_STOCKS.slice(0, 10).map((stock) => {
              const data = stockData[stock.symbol]
              return (
                <div
                  key={stock.symbol}
                  onClick={() => selectStock(stock.symbol)}
                  className={`p-2 rounded cursor-pointer transition-all hover:bg-neon-green/10 ${
                    selectedStock === stock.symbol ? 'bg-neon-green/20 neon-border border-neon-green' : 'bg-dark-bg/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white truncate">
                      {stock.name}
                    </span>
                    {data && (
                      <span className={`text-xs font-bold ${
                        data.changeRate > 0 ? 'text-neon-green' :
                        data.changeRate < 0 ? 'text-neon-red' :
                        'text-neon-yellow'
                      }`}>
                        {formatChangeRate(data.changeRate)}
                      </span>
                    )}
                  </div>
                  {data && (
                    <div className="text-xs text-gray-400">
                      {data.price.toLocaleString()}원
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* KOSDAQ 섹션 */}
        <div>
          <h5 className="text-sm font-medium text-neon-blue mb-2">KOSDAQ</h5>
          <div className="space-y-1">
            {ALL_MAJOR_STOCKS.slice(10).map((stock) => {
              const data = stockData[stock.symbol]
              return (
                <div
                  key={stock.symbol}
                  onClick={() => selectStock(stock.symbol)}
                  className={`p-2 rounded cursor-pointer transition-all hover:bg-neon-blue/10 ${
                    selectedStock === stock.symbol ? 'bg-neon-blue/20 neon-border border-neon-blue' : 'bg-dark-bg/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white truncate">
                      {stock.name}
                    </span>
                    {data && (
                      <span className={`text-xs font-bold ${
                        data.changeRate > 0 ? 'text-neon-green' :
                        data.changeRate < 0 ? 'text-neon-red' :
                        'text-neon-yellow'
                      }`}>
                        {formatChangeRate(data.changeRate)}
                      </span>
                    )}
                  </div>
                  {data && (
                    <div className="text-xs text-gray-400">
                      {data.price.toLocaleString()}원
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
