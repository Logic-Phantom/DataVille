import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import cron from 'node-cron'
import { StockService } from './services/stockService'
import { WebSocketHandler } from './services/websocket'

dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

const PORT = process.env.PORT || 3001

// 미들웨어
app.use(cors())
app.use(express.json())

// 서비스 초기화
const stockService = new StockService()
const wsHandler = new WebSocketHandler(io, stockService)

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ 
    message: 'Live Data City Backend Server',
    status: 'running',
    timestamp: new Date().toISOString()
  })
})

// 헬스 체크
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  })
})

// 주식 데이터 API
app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await stockService.getAllStocks()
    res.json(stocks)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' })
  }
})

app.get('/api/stocks/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params
    const stock = await stockService.getStock(symbol)
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' })
    }
    res.json(stock)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' })
  }
})

// WebSocket 연결 처리
wsHandler.initialize()

// 실시간 데이터 업데이트 스케줄러
// 장중 시간(9:00-15:30)에는 1초마다, 장외시간에는 5초마다 업데이트
cron.schedule('* * * * * *', async () => {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const isMarketOpen = (hour === 9 && minute >= 0) || (hour > 9 && hour < 15) || (hour === 15 && minute <= 30)
  
  // 장중에만 실시간 업데이트
  if (isMarketOpen) {
    await stockService.updateAllStocks()
    wsHandler.broadcastMarketUpdate()
  }
})

// 장외시간 업데이트 (5초마다)
cron.schedule('*/5 * * * * *', async () => {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const isMarketClosed = !((hour === 9 && minute >= 0) || (hour > 9 && hour < 15) || (hour === 15 && minute <= 30))
  
  if (isMarketClosed) {
    await stockService.updateAllStocks()
    wsHandler.broadcastMarketUpdate()
  }
})

// 에러 핸들링
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', error)
  res.status(500).json({ error: 'Internal server error' })
})

// 서버 시작
server.listen(PORT, () => {
  console.log(`🚀 Live Data City Backend Server running on port ${PORT}`)
  console.log(`📊 Stock data service initialized`)
  console.log(`🔌 WebSocket server ready`)
  
  // 초기 데이터 로드
  stockService.updateAllStocks()
})
