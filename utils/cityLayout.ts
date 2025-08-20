import { StockData } from '@/shared/types/stock'
import { KOSPI_MAJOR_STOCKS, KOSDAQ_MAJOR_STOCKS, CITY_LAYOUT } from '@/shared/constants/stocks'

export interface BuildingPosition {
  position: [number, number, number]
  stockInfo: { symbol: string; name: string }
  market: 'KOSPI' | 'KOSDAQ'
}

// 현실적인 도시 블록 패턴 생성
function generateCityBlocks(): Array<{ center: [number, number], size: number, type: 'main' | 'business' | 'residential' }> {
  return [
    // 메인 비즈니스 구역 (중심부)
    { center: [0, 0], size: 12, type: 'main' },
    { center: [15, 0], size: 10, type: 'business' },
    { center: [-15, 0], size: 10, type: 'business' },
    { center: [0, 15], size: 8, type: 'business' },
    { center: [0, -15], size: 8, type: 'business' },
    
    // 서브 비즈니스 구역
    { center: [25, 15], size: 6, type: 'residential' },
    { center: [-25, 15], size: 6, type: 'residential' },
    { center: [25, -15], size: 6, type: 'residential' },
    { center: [-25, -15], size: 6, type: 'residential' },
    
    // 외곽 구역
    { center: [35, 0], size: 8, type: 'business' },
    { center: [-35, 0], size: 8, type: 'business' },
    { center: [0, 35], size: 6, type: 'residential' },
    { center: [0, -35], size: 6, type: 'residential' }
  ]
}

// 자연스러운 건물 배치를 위한 지터 함수
function addJitter(x: number, z: number, amount: number = 2): [number, number] {
  return [
    x + (Math.random() - 0.5) * amount,
    z + (Math.random() - 0.5) * amount
  ]
}

export function generateCityLayout(): BuildingPosition[] {
  const buildings: BuildingPosition[] = []
  const cityBlocks = generateCityBlocks()
  
  // 주식을 시가총액/중요도 순으로 정렬
  const allStocks = [
    ...KOSPI_MAJOR_STOCKS.map((stock: { symbol: string; name: string }) => ({ ...stock, market: 'KOSPI' as const, priority: 1 })),
    ...KOSDAQ_MAJOR_STOCKS.map((stock: { symbol: string; name: string }) => ({ ...stock, market: 'KOSDAQ' as const, priority: 2 }))
  ]
  
  // 주요 종목을 우선적으로 중심부에 배치
  const priorityStocks = [
    '005930', // 삼성전자
    '000660', // SK하이닉스  
    '035420', // NAVER
    '035720', // 카카오
    '005380', // 현대차
    '086520'  // 에코프로
  ]
  
  let stockIndex = 0
  
  cityBlocks.forEach((block, blockIndex) => {
    const buildingsPerBlock = Math.floor(allStocks.length / cityBlocks.length) + 
                             (blockIndex < allStocks.length % cityBlocks.length ? 1 : 0)
    
    for (let i = 0; i < buildingsPerBlock && stockIndex < allStocks.length; i++) {
      const stock = allStocks[stockIndex]
      
      // 블록 내에서 원형/나선형 패턴으로 배치
      let x, z
      
      if (block.type === 'main' && i < 6) {
        // 중심부는 육각형 패턴
        const angle = (i / 6) * Math.PI * 2
        const radius = 8
        x = block.center[0] + Math.cos(angle) * radius
        z = block.center[1] + Math.sin(angle) * radius
      } else {
        // 나머지는 격자 + 지터
        const gridSize = Math.ceil(Math.sqrt(buildingsPerBlock))
        const row = Math.floor(i / gridSize)
        const col = i % gridSize
        
        const spacing = block.size / gridSize
        x = block.center[0] + (col - gridSize/2) * spacing
        z = block.center[1] + (row - gridSize/2) * spacing
        
        // 자연스러운 배치를 위한 지터 추가
        const [jitteredX, jitteredZ] = addJitter(x, z, spacing * 0.3)
        x = jitteredX
        z = jitteredZ
      }
      
      // 주요 종목은 더 중심부에 배치
      if (priorityStocks.includes(stock.symbol) && block.type !== 'main') {
        // 주요 종목을 중심부로 이동
        const mainBlock = cityBlocks.find(b => b.type === 'main')
        if (mainBlock) {
          const angle = Math.random() * Math.PI * 2
          const radius = 5 + Math.random() * 7
          x = mainBlock.center[0] + Math.cos(angle) * radius
          z = mainBlock.center[1] + Math.sin(angle) * radius
        }
      }
      
      buildings.push({
        position: [x, 0, z],
        stockInfo: { symbol: stock.symbol, name: stock.name },
        market: stock.market
      })
      
      stockIndex++
    }
  })
  
  return buildings
}

// 건물 위치 생성 함수
export const generateBuildingPositions = (
  area: { center: [number, number, number]; size: [number, number]; gridSize: [number, number] },
  buildingCount: number
): [number, number, number][] => {
  const positions: [number, number, number][] = []
  const { center, size, gridSize } = area
  const [gridX, gridY] = gridSize
  const [sizeX, sizeY] = size
  
  const spacingX = sizeX / (gridX - 1)
  const spacingY = sizeY / (gridY - 1)
  
  let index = 0
  for (let y = 0; y < gridY && index < buildingCount; y++) {
    for (let x = 0; x < gridX && index < buildingCount; x++) {
      const posX = center[0] - sizeX / 2 + x * spacingX
      const posY = center[1]
      const posZ = center[2] - sizeY / 2 + y * spacingY
      
      positions.push([posX, posY, posZ])
      index++
    }
  }
  
  return positions
}

// 섹터별 위치 계산
export const getSectorPosition = (sector: string): [number, number, number] => {
  const sectorPositions: Record<string, [number, number, number]> = {
    'technology': [-30, 0, -30],
    'finance': [30, 0, -30],
    'manufacturing': [-30, 0, 30],
    'healthcare': [30, 0, 30],
    'energy': [0, 0, -60],
    'consumer': [0, 0, 60],
  }
  
  return sectorPositions[sector] || [0, 0, 0]
}

// 카메라 위치 계산
export const getCameraPositionForView = (viewMode: string): [number, number, number] => {
  switch (viewMode) {
    case 'kospi':
      return [25, 20, 25]
    case 'kosdaq':
      return [25, 20, -25]
    case 'sector':
      return [0, 40, 0]
    default: // overview
      return [50, 30, 50]
  }
}
