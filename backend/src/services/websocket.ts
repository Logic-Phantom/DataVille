import { Server, Socket } from 'socket.io'
import { StockService, StockData } from './stockService'

export class WebSocketHandler {
  private io: Server
  private stockService: StockService
  private connectedClients: Map<string, Socket> = new Map()
  private subscriptions: Map<string, Set<string>> = new Map() // clientId -> symbols

  constructor(io: Server, stockService: StockService) {
    this.io = io
    this.stockService = stockService
  }

  initialize(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`)
      this.connectedClients.set(socket.id, socket)
      this.subscriptions.set(socket.id, new Set())

      // 연결 시 현재 모든 주식 데이터 전송
      this.sendInitialData(socket)

      // 주식 구독
      socket.on('subscribe', (symbols: string[]) => {
        this.handleSubscribe(socket, symbols)
      })

      // 구독 해제
      socket.on('unsubscribe', (symbols: string[]) => {
        this.handleUnsubscribe(socket, symbols)
      })

      // 특정 주식 데이터 요청
      socket.on('requestStock', async (symbol: string) => {
        const stockData = await this.stockService.getStock(symbol)
        if (stockData) {
          socket.emit('stockUpdate', stockData)
        }
      })

      // 연결 해제 처리
      socket.on('disconnect', (reason) => {
        console.log(`Client disconnected: ${socket.id}, reason: ${reason}`)
        this.connectedClients.delete(socket.id)
        this.subscriptions.delete(socket.id)
      })

      // 에러 처리
      socket.on('error', (error) => {
        console.error(`Socket error for ${socket.id}:`, error)
      })
    })
  }

  // 초기 데이터 전송
  private async sendInitialData(socket: Socket): Promise<void> {
    try {
      const allStocks = await this.stockService.getAllStocks()
      socket.emit('marketUpdate', allStocks)
    } catch (error) {
      console.error('Failed to send initial data:', error)
    }
  }

  // 구독 처리
  private handleSubscribe(socket: Socket, symbols: string[]): void {
    const clientSubscriptions = this.subscriptions.get(socket.id)
    if (clientSubscriptions) {
      symbols.forEach(symbol => {
        clientSubscriptions.add(symbol)
      })
      console.log(`Client ${socket.id} subscribed to: ${symbols.join(', ')}`)
    }
  }

  // 구독 해제 처리
  private handleUnsubscribe(socket: Socket, symbols: string[]): void {
    const clientSubscriptions = this.subscriptions.get(socket.id)
    if (clientSubscriptions) {
      symbols.forEach(symbol => {
        clientSubscriptions.delete(symbol)
      })
      console.log(`Client ${socket.id} unsubscribed from: ${symbols.join(', ')}`)
    }
  }

  // 개별 주식 업데이트 브로드캐스트
  async broadcastStockUpdate(symbol: string): Promise<void> {
    try {
      const stockData = await this.stockService.getStock(symbol)
      if (!stockData) return

      // 해당 주식을 구독한 클라이언트들에게만 전송
      this.subscriptions.forEach((symbols, clientId) => {
        if (symbols.has(symbol)) {
          const socket = this.connectedClients.get(clientId)
          if (socket) {
            socket.emit('stockUpdate', stockData)
          }
        }
      })
    } catch (error) {
      console.error(`Failed to broadcast stock update for ${symbol}:`, error)
    }
  }

  // 시장 전체 업데이트 브로드캐스트
  async broadcastMarketUpdate(): Promise<void> {
    try {
      const allStocks = await this.stockService.getAllStocks()
      const marketVolatility = this.stockService.getMarketVolatility()

      // 모든 연결된 클라이언트에게 전송
      this.io.emit('marketUpdate', allStocks)
      this.io.emit('marketVolatility', marketVolatility)

      // 급등락 종목 알림
      const volatileStocks = Object.values(allStocks).filter(
        stock => Math.abs(stock.changeRate) > 5
      )

      if (volatileStocks.length > 0) {
        this.io.emit('volatileStocks', volatileStocks)
      }
    } catch (error) {
      console.error('Failed to broadcast market update:', error)
    }
  }

  // 특정 클라이언트에게 메시지 전송
  sendToClient(clientId: string, event: string, data: any): void {
    const socket = this.connectedClients.get(clientId)
    if (socket) {
      socket.emit(event, data)
    }
  }

  // 연결된 클라이언트 수 반환
  getConnectedClientsCount(): number {
    return this.connectedClients.size
  }

  // 구독 통계 반환
  getSubscriptionStats(): Record<string, number> {
    const stats: Record<string, number> = {}
    
    this.subscriptions.forEach(symbols => {
      symbols.forEach(symbol => {
        stats[symbol] = (stats[symbol] || 0) + 1
      })
    })

    return stats
  }
}
