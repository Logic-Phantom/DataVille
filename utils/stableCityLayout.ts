import { StockData } from '@/shared/types/stock'
import { KOSPI_MAJOR_STOCKS, KOSDAQ_MAJOR_STOCKS } from '@/shared/constants/stocks'

export interface BuildingPosition {
  position: [number, number, number]
  stockInfo: { symbol: string; name: string }
  market: 'KOSPI' | 'KOSDAQ'
}

// 고정된 건물 위치 맵 (한번 생성되면 변경되지 않음)
const FIXED_BUILDING_POSITIONS = new Map<string, [number, number, number]>()

// 초기 건물 위치 생성 (최초 1회만 실행)
function initializeFixedPositions(): BuildingPosition[] {
  if (FIXED_BUILDING_POSITIONS.size > 0) {
    // 이미 초기화된 경우 기존 위치 사용
    return generateBuildingsFromFixedPositions()
  }

  const buildings: BuildingPosition[] = []
  
  // KOSPI 주요 종목들을 중심부에 배치
  const kospiPositions = [
    [0, 0, 0],      // 삼성전자 - 중심
    [-8, 0, 0],     // SK하이닉스
    [8, 0, 0],      // LG화학
    [0, 0, -8],     // 삼성바이오로직스
    [0, 0, 8],      // NAVER
    [-8, 0, -8],    // 카카오
    [8, 0, -8],     // 삼성SDI
    [-8, 0, 8],     // 현대차
    [8, 0, 8],      // 기아
    [0, 0, 16]      // 셀트리온
  ]

  // KOSDAQ 종목들을 외곽에 배치
  const kosdaqPositions = [
    [-16, 0, 0],    // 에코프로
    [16, 0, 0],     // 에코프로비엠
    [0, 0, -16],    // 펄어비스
    [-16, 0, -16],  // 위메프
    [16, 0, -16],   // HLB
    [-16, 0, 16],   // 알테오젠
    [16, 0, 16],    // 스튜디오드래곤
    [-24, 0, 0],    // 컴투스
    [24, 0, 0],     // 티앤엘
    [0, 0, 24]      // 바이오니아
  ]

  // KOSPI 종목 위치 설정
  KOSPI_MAJOR_STOCKS.forEach((stock, index) => {
    if (index < kospiPositions.length) {
      const position = kospiPositions[index] as [number, number, number]
      FIXED_BUILDING_POSITIONS.set(stock.symbol, position)
      buildings.push({
        position,
        stockInfo: { symbol: stock.symbol, name: stock.name },
        market: 'KOSPI'
      })
    }
  })

  // KOSDAQ 종목 위치 설정
  KOSDAQ_MAJOR_STOCKS.forEach((stock, index) => {
    if (index < kosdaqPositions.length) {
      const position = kosdaqPositions[index] as [number, number, number]
      FIXED_BUILDING_POSITIONS.set(stock.symbol, position)
      buildings.push({
        position,
        stockInfo: { symbol: stock.symbol, name: stock.name },
        market: 'KOSDAQ'
      })
    }
  })

  return buildings
}

// 고정된 위치에서 건물 정보 생성
function generateBuildingsFromFixedPositions(): BuildingPosition[] {
  const buildings: BuildingPosition[] = []
  
  KOSPI_MAJOR_STOCKS.forEach((stock) => {
    const position = FIXED_BUILDING_POSITIONS.get(stock.symbol)
    if (position) {
      buildings.push({
        position,
        stockInfo: { symbol: stock.symbol, name: stock.name },
        market: 'KOSPI'
      })
    }
  })

  KOSDAQ_MAJOR_STOCKS.forEach((stock) => {
    const position = FIXED_BUILDING_POSITIONS.get(stock.symbol)
    if (position) {
      buildings.push({
        position,
        stockInfo: { symbol: stock.symbol, name: stock.name },
        market: 'KOSDAQ'
      })
    }
  })

  return buildings
}

// 안정적인 도시 레이아웃 생성 (자유분방한 배치)
export function generateStableCityLayout(): BuildingPosition[] {
  const buildings: BuildingPosition[] = []
  
  // 시드 기반 랜덤 함수 (일관된 결과를 위해)
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }
  
  // KOSPI와 KOSDAQ 합쳐서 자유롭게 배치
  const allStocks = [...KOSPI_MAJOR_STOCKS, ...KOSDAQ_MAJOR_STOCKS]
  
  allStocks.forEach((stock, index) => {
    // 각 주식 심볼을 시드로 사용하여 일관된 위치 생성
    const seed = parseInt(stock.symbol) || index * 1000
    
    // 더 넓은 범위에 자유롭게 분포
    const angle = seededRandom(seed) * Math.PI * 2
    const distance = 15 + seededRandom(seed + 1) * 35 // 15~50 범위
    const x = Math.cos(angle) * distance + (seededRandom(seed + 2) - 0.5) * 10
    const z = Math.sin(angle) * distance + (seededRandom(seed + 3) - 0.5) * 10
    
    // 높이 변화를 위한 약간의 지형 효과
    const terrainHeight = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 2
    
    const market = index < KOSPI_MAJOR_STOCKS.length ? 'KOSPI' : 'KOSDAQ'
    
    buildings.push({
      position: [x, terrainHeight, z],
      stockInfo: { symbol: stock.symbol, name: stock.name },
      market: market
    })
  })
  
  return buildings
}

// 가격 변동에 따른 건물 높이 계산
export function calculateBuildingHeightFromPrice(
  currentPrice: number, 
  previousPrice: number = currentPrice,
  baseHeight: number = 5
): number {
  const MIN_HEIGHT = 2
  const MAX_HEIGHT = 50
  
  // 가격 기반 기본 높이 (로그 스케일)
  const priceBasedHeight = Math.log10(currentPrice / 1000) * 8 + baseHeight
  
  // 가격 변동률에 따른 추가 높이 조정
  const priceChangeRatio = currentPrice / previousPrice
  const changeMultiplier = Math.min(Math.max(priceChangeRatio, 0.5), 2.0) // 0.5x ~ 2.0x 범위
  
  const finalHeight = priceBasedHeight * changeMultiplier
  
  // 최소/최대 높이 제한
  return Math.min(Math.max(finalHeight, MIN_HEIGHT), MAX_HEIGHT)
}

// 시가총액 기반 건물 높이 계산 (기존 방식 유지)
export function calculateBuildingHeightFromMarketCap(marketCap: number): number {
  const MIN_HEIGHT = 2
  const MAX_HEIGHT = 50
  
  // 시가총액을 로그 스케일로 변환하여 높이 계산
  const logMarketCap = Math.log10(marketCap)
  const normalizedHeight = ((logMarketCap - 10) / 5) * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT
  
  return Math.min(Math.max(normalizedHeight, MIN_HEIGHT), MAX_HEIGHT)
}

// 건물 위치가 고정되어 있는지 확인
export function isBuildingPositionFixed(symbol: string): boolean {
  return FIXED_BUILDING_POSITIONS.has(symbol)
}

// 특정 종목의 고정 위치 가져오기
export function getFixedPosition(symbol: string): [number, number, number] | null {
  return FIXED_BUILDING_POSITIONS.get(symbol) || null
}
