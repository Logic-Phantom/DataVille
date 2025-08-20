'use client'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useStockStore } from '@/stores/stockStore'
import { StockData } from '@/types/stock'
import { ALL_MAJOR_STOCKS } from '@/shared/constants/stocks'

export const useStockWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const { 
    updateStockData, 
    updateMultipleStocks, 
    setConnectionStatus 
  } = useStockStore()

  useEffect(() => {
    // WebSocket 서버 URL (환경변수 또는 기본값)
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
    
    const newSocket = io(wsUrl, {
      transports: ['websocket'],
      upgrade: true,
      timeout: 20000,
    })

    // 연결 성공
    newSocket.on('connect', () => {
      console.log('WebSocket connected')
      setConnectionStatus({ status: 'connected' })
      
      // 주요 종목 구독
      const symbols = ALL_MAJOR_STOCKS.map(stock => stock.symbol)
      newSocket.emit('subscribe', symbols)
    })

    // 개별 주식 데이터 업데이트
    newSocket.on('stockUpdate', (data: StockData) => {
      updateStockData(data.symbol, data)
    })

    // 시장 전체 데이터 업데이트
    newSocket.on('marketUpdate', (data: Record<string, StockData>) => {
      updateMultipleStocks(data)
    })

    // 연결 해제
    newSocket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason)
      setConnectionStatus({ 
        status: 'disconnected', 
        message: `연결이 끊어졌습니다: ${reason}` 
      })
    })

    // 연결 오류
    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error)
      setConnectionStatus({ 
        status: 'error', 
        message: `연결 오류: ${error.message}` 
      })
    })

    // 재연결 시도
    newSocket.on('reconnect', (attemptNumber) => {
      console.log('WebSocket reconnected after', attemptNumber, 'attempts')
      setConnectionStatus({ status: 'connected' })
    })

    setSocket(newSocket)

    // 정리
    return () => {
      newSocket.close()
    }
  }, [updateStockData, updateMultipleStocks, setConnectionStatus])

  // 수동으로 특정 종목 구독
  const subscribeToStock = (symbol: string) => {
    if (socket) {
      socket.emit('subscribe', [symbol])
    }
  }

  // 구독 해제
  const unsubscribeFromStock = (symbol: string) => {
    if (socket) {
      socket.emit('unsubscribe', [symbol])
    }
  }

  return {
    socket,
    subscribeToStock,
    unsubscribeFromStock
  }
}
