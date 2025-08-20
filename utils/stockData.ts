import { STOCK_COLORS, CITY_LAYOUT } from '@/shared/constants/stocks'
import { StockData } from '@/shared/types/stock'

// 주식 변동률에 따른 색상 반환
export const getStockColor = (changeRate: number): string => {
  if (changeRate <= -5) return STOCK_COLORS.STRONG_DOWN
  if (changeRate < -1) return STOCK_COLORS.DOWN
  if (changeRate >= 5) return STOCK_COLORS.STRONG_UP
  if (changeRate > 1) return STOCK_COLORS.UP
  return STOCK_COLORS.NEUTRAL
}

// 시가총액 기반 건물 높이 계산
export const calculateBuildingHeight = (marketCap: number): number => {
  const { MIN_HEIGHT, MAX_HEIGHT } = CITY_LAYOUT
  
  // 로그 스케일로 높이 계산 (1조원 = 최대 높이)
  const logCap = Math.log10(marketCap / 1000000000000) // 조원 단위
  const normalizedHeight = Math.max(0, Math.min(1, (logCap + 2) / 3)) // -2 ~ 1 범위를 0~1로 정규화
  
  return MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * normalizedHeight
}

// 가격 포맷팅
export const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(1)}K`
  }
  return price.toLocaleString()
}

// 변동률 포맷팅
export const formatChangeRate = (changeRate: number): string => {
  const sign = changeRate > 0 ? '+' : ''
  return `${sign}${changeRate.toFixed(2)}%`
}

// 시가총액 포맷팅 (x조원 형태)
export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1000000000000) {
    return `${(marketCap / 1000000000000).toFixed(1)}조원`
  } else if (marketCap >= 100000000000) {
    return `${(marketCap / 100000000000).toFixed(1)}천억원`
  } else if (marketCap >= 100000000) {
    return `${(marketCap / 100000000).toFixed(0)}억원`
  }
  return `${marketCap.toLocaleString()}원`
}

// 거래량 기반 강도 계산
export const calculateIntensity = (volume: number): number => {
  // 1억주 거래량을 기준으로 정규화
  return Math.min(volume / 100000000, 1)
}

// 모의 주식 데이터 생성 (개발용)
export function generateMockStockData(symbol: string, name: string): StockData {
  // 실제 주가 범위를 반영한 모의 데이터
  const basePrice = getBasePriceForSymbol(symbol)
  const changeRate = (Math.random() - 0.5) * 10 // -5% ~ +5%
  const price = Math.round(basePrice * (1 + changeRate / 100))
  
  return {
    symbol,
    name,
    price,
    change: Math.round(basePrice * changeRate / 100),
    changeRate,
    volume: Math.floor(Math.random() * 10000000) + 1000000, // 100만 ~ 1000만
    marketCap: price * Math.floor(Math.random() * 1000000000) + 100000000, // 시가총액
    timestamp: Date.now()
  }
}

// 심볼별 기준 가격 (2024년 실제 주가 범위 반영)
function getBasePriceForSymbol(symbol: string): number {
  const priceMap: Record<string, number> = {
    '005930': 70000,  // 삼성전자 (실제 약 69-71만원)
    '000660': 130000, // SK하이닉스 (실제 약 120-140만원)
    '051910': 420000, // LG화학 (실제 약 400-450만원)
    '207940': 850000, // 삼성바이오로직스 (실제 약 800-900만원)
    '035420': 190000, // NAVER (실제 약 180-200만원)
    '035720': 48000,  // 카카오 (실제 약 45-55만원)
    '006400': 380000, // 삼성SDI (실제 약 350-400만원)
    '005380': 210000, // 현대차 (실제 약 200-220만원)
    '000270': 95000,  // 기아 (실제 약 90-100만원)
    '068270': 175000, // 셀트리온 (실제 약 170-180만원)
    '086520': 75000,  // 에코프로 (실제 약 70-80만원)
    '247540': 180000, // 에코프로비엠 (실제 약 170-190만원)
    '263750': 28000,  // 펄어비스 (실제 약 25-35만원)
    '225570': 12000,  // 위메프 (실제 약 10-15만원)
    '028300': 42000,  // HLB (실제 약 40-45만원)
    '196170': 115000, // 알테오젠 (실제 약 110-120만원)
    '253450': 58000,  // 스튜디오드래곤 (실제 약 55-65만원)
    '078340': 85000,  // 컴투스 (실제 약 80-90만원)
    '213420': 22000,  // 티앤엘 (실제 약 20-25만원)
    '064550': 32000   // 바이오니아 (실제 약 30-35만원)
  }
  
  return priceMap[symbol] || 50000 // 기본값 5만원
}

// 실시간 데이터 시뮬레이션 (개발용)
export const simulateRealTimeUpdate = (previousData: any) => {
  const volatility = 0.02 // 2% 변동성
  const priceChange = (Math.random() - 0.5) * volatility
  const newPrice = previousData.price * (1 + priceChange)
  const change = newPrice - previousData.price
  const changeRate = (change / previousData.price) * 100

  return {
    ...previousData,
    price: Math.round(newPrice),
    change: Math.round(change),
    changeRate: Number(changeRate.toFixed(2)),
    volume: previousData.volume + Math.floor(Math.random() * 100000),
    timestamp: Date.now()
  }
}
