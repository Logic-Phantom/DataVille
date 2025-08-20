// 주요 종목 리스트
export const KOSPI_MAJOR_STOCKS = [
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
];

export const KOSDAQ_MAJOR_STOCKS = [
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
];

export const ALL_MAJOR_STOCKS = [...KOSPI_MAJOR_STOCKS, ...KOSDAQ_MAJOR_STOCKS];

// 색상 매핑
export const STOCK_COLORS = {
  STRONG_DOWN: '#ff0055',    // 강한 하락 (-5% 이하)
  DOWN: '#ff4444',           // 하락 (-1% ~ -5%)
  NEUTRAL: '#ffff00',        // 보합 (-1% ~ +1%)
  UP: '#00ff88',            // 상승 (+1% ~ +5%)
  STRONG_UP: '#00d4ff',     // 강한 상승 (+5% 이상)
};

// 도시 레이아웃 설정
export const CITY_LAYOUT = {
  KOSPI_AREA: {
    center: [0, 0, 0] as [number, number, number],
    size: [40, 40] as [number, number],
    gridSize: [5, 2] as [number, number], // 5x2 그리드
  },
  KOSDAQ_AREA: {
    center: [0, 0, -50] as [number, number, number],
    size: [50, 30] as [number, number],
    gridSize: [5, 2] as [number, number], // 5x2 그리드
  },
  BUILDING_SPACING: 8,
  MIN_HEIGHT: 2,
  MAX_HEIGHT: 50,
};

// 성능 설정
export const PERFORMANCE_CONFIG = {
  LOD_DISTANCES: {
    HIGH: 50,
    MEDIUM: 100,
    LOW: 200,
  },
  UPDATE_INTERVALS: {
    FAST: 100,    // 100ms - 실시간 업데이트
    NORMAL: 1000, // 1초 - 일반 업데이트
    SLOW: 5000,   // 5초 - 백그라운드 업데이트
  },
  MAX_PARTICLES: 1000,
  BATCH_SIZE: 50,
};
