import axios from 'axios'

export interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changeRate: number
  volume: number
  marketCap: number
  timestamp: number
}

export class StockService {
  private stockData: Map<string, StockData> = new Map()
  private readonly majorStocks = [
    // KOSPI
    { symbol: '005930', name: '삼성전자' },
    { symbol: '000660', name: 'SK하이닉스' },
    { symbol: '051910', name: 'LG화학' },
    { symbol: '207940', name: '삼성바이오로직스' },
    { symbol: '035420', name: 'NAVER' },
    { symbol: '035720', name: '카카오' },
    { symbol: '006400', name: '삼성SDI' },
    { symbol: '005380', name: '현대차' },
    { symbol: '000270', name: '기아' },
    { symbol: '068270', name: '셀트리온' },
    // KOSDAQ
    { symbol: '086520', name: '에코프로' },
    { symbol: '247540', name: '에코프로비엠' },
    { symbol: '263750', name: '펄어비스' },
    { symbol: '225570', name: '위메프' },
    { symbol: '028300', name: 'HLB' },
    { symbol: '196170', name: '알테오젠' },
    { symbol: '253450', name: '스튜디오드래곤' },
    { symbol: '078340', name: '컴투스' },
    { symbol: '213420', name: '티앤엘' },
    { symbol: '064550', name: '바이오니아' },
  ]

  constructor() {
    // 초기 모의 데이터 생성
    this.initializeMockData()
  }

  // 모의 데이터 초기화
  private initializeMockData(): void {
    this.majorStocks.forEach(stock => {
      const mockData = this.generateMockStockData(stock.symbol, stock.name)
      this.stockData.set(stock.symbol, mockData)
    })
  }

  // 모의 주식 데이터 생성
  private generateMockStockData(symbol: string, name: string): StockData {
    const basePrice = Math.random() * 100000 + 10000 // 1만원 ~ 11만원
    const changeRate = (Math.random() - 0.5) * 20 // -10% ~ +10%
    const change = basePrice * (changeRate / 100)
    const volume = Math.floor(Math.random() * 10000000) + 100000 // 10만주 ~ 1천만주
    const marketCap = basePrice * (Math.random() * 1000000000 + 100000000) // 시가총액

    return {
      symbol,
      name,
      price: Math.round(basePrice),
      change: Math.round(change),
      changeRate: Number(changeRate.toFixed(2)),
      volume,
      marketCap: Math.round(marketCap),
      timestamp: Date.now()
    }
  }

  // 실시간 데이터 시뮬레이션
  private simulateRealTimeUpdate(previousData: StockData): StockData {
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

  // 외부 API에서 실제 주식 데이터 가져오기 (향후 구현)
  private async fetchRealStockData(symbol: string): Promise<StockData | null> {
    try {
      // TODO: 실제 주식 API 연동 (한국투자증권 Open API 등)
      // 현재는 모의 데이터 반환
      const existingData = this.stockData.get(symbol)
      if (existingData) {
        return this.simulateRealTimeUpdate(existingData)
      }
      return null
    } catch (error) {
      console.error(`Failed to fetch stock data for ${symbol}:`, error)
      return null
    }
  }

  // 모든 주식 데이터 업데이트
  async updateAllStocks(): Promise<void> {
    const updatePromises = this.majorStocks.map(async (stock) => {
      try {
        const data = await this.fetchRealStockData(stock.symbol)
        if (data) {
          this.stockData.set(stock.symbol, data)
        }
      } catch (error) {
        console.error(`Failed to update ${stock.symbol}:`, error)
      }
    })

    await Promise.all(updatePromises)
  }

  // 개별 주식 데이터 조회
  async getStock(symbol: string): Promise<StockData | null> {
    return this.stockData.get(symbol) || null
  }

  // 모든 주식 데이터 조회
  async getAllStocks(): Promise<Record<string, StockData>> {
    const result: Record<string, StockData> = {}
    this.stockData.forEach((data, symbol) => {
      result[symbol] = data
    })
    return result
  }

  // 특정 종목들의 데이터 조회
  async getStocksBySymbols(symbols: string[]): Promise<Record<string, StockData>> {
    const result: Record<string, StockData> = {}
    symbols.forEach(symbol => {
      const data = this.stockData.get(symbol)
      if (data) {
        result[symbol] = data
      }
    })
    return result
  }

  // 시장 변동성 계산
  getMarketVolatility(): number {
    const stocks = Array.from(this.stockData.values())
    if (stocks.length === 0) return 0

    const changeRates = stocks.map(stock => Math.abs(stock.changeRate))
    const avgChange = changeRates.reduce((sum, rate) => sum + rate, 0) / changeRates.length
    const variance = changeRates.reduce((sum, rate) => sum + Math.pow(rate - avgChange, 2), 0) / changeRates.length
    
    return Math.sqrt(variance) / 10 // 0-1 범위로 정규화
  }
}
