'use client'

import { useMemo, useEffect } from 'react'
import { useStockStore } from '@/stores/stockStore'
import Building from './Building'
import { generateStableCityLayout } from '@/utils/stableCityLayout'
import { KOSPI_MAJOR_STOCKS, KOSDAQ_MAJOR_STOCKS } from '@/shared/constants/stocks'
import { MovingCars, MovingAirplane, MovingClouds, MovingPeople } from './CityAnimations'
import CityEnvironment from './CityEnvironment'
import { generateMockStockData } from '@/utils/stockData'

export default function CityScene() {
  const { stockData, updateMultipleStocks } = useStockStore()

  // 개발용 모의 데이터 생성
  useEffect(() => {
    if (Object.keys(stockData).length === 0) {
      const mockData: Record<string, any> = {}
      const allStocks = [...KOSPI_MAJOR_STOCKS, ...KOSDAQ_MAJOR_STOCKS]
      allStocks.forEach(stock => {
        mockData[stock.symbol] = generateMockStockData(stock.symbol, stock.name)
      })
      updateMultipleStocks(mockData)
      console.log('Mock stock data generated:', mockData)
    }
  }, [stockData, updateMultipleStocks])

  // 안정적인 도시 레이아웃 생성
  const cityLayout = useMemo(() => {
    return generateStableCityLayout()
  }, [])

  return (
    <>
      {/* 건물들 렌더링 */}
      {cityLayout.map((building: any, index: number) => {
        const allStocks = [...KOSPI_MAJOR_STOCKS, ...KOSDAQ_MAJOR_STOCKS]
        const stockInfo = allStocks.find(stock => stock.symbol === building.stockInfo.symbol)
        const market = building.market
        
        return (
          <Building
            key={`${building.symbol}-${index}`}
            position={building.position}
            stockData={stockData[building.symbol]}
            stockInfo={stockInfo || { symbol: building.symbol, name: `Stock ${building.symbol}` }}
            market={market}
          />
        )
      })}
      
      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* 도시 환경 요소들 */}
      <CityEnvironment />
      
      {/* 도시 애니메이션 요소들 */}
      <MovingCars />
      <MovingPeople />
      <MovingAirplane />
      <MovingClouds />
    </>
  )
}
