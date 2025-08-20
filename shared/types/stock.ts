export interface StockData {
  symbol: string;        // 종목코드
  name: string;         // 종목명
  price: number;        // 현재가
  change: number;       // 변동가
  changeRate: number;   // 변동률
  volume: number;       // 거래량
  marketCap: number;    // 시가총액
  timestamp: number;    // 타임스탬프
}

export interface CityBuilding {
  id: string;
  position: [number, number, number];
  height: number;       // 시가총액 기반
  color: string;        // 수익률 기반
  intensity: number;    // 거래량 기반
  stockData: StockData;
}

export interface MarketData {
  kospi: StockData[];
  kosdaq: StockData[];
  lastUpdate: number;
}

export interface ConnectionStatus {
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  message?: string;
}

export type ViewMode = 'overview' | 'kospi' | 'kosdaq' | 'sector';
export type EffectMode = 'normal' | 'enhanced' | 'minimal';
