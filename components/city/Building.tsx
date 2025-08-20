'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { StockData } from '@/types/stock'
import { getStockColor, calculateBuildingHeight } from '@/utils/stockData'
import { calculateBuildingHeightFromPrice } from '@/utils/stableCityLayout'
import { CITY_LAYOUT } from '@/shared/constants/stocks'
import { 
  SamsungTower, 
  SKBuilding, 
  NaverBuilding, 
  KakaoBuilding, 
  HyundaiBuilding, 
  EcoProBuilding, 
  DefaultBuilding
} from './BuildingTypes'
import { 
  LGChemBuilding,
  SamsungBioBuilding,
  SamsungSDIBuilding,
  KiaBuilding,
  CelltrionBuilding,
  EcoProBMBuilding,
  PearlAbyssBuilding,
  WemepBuilding,
  HLBBuilding,
  AlteogenBuilding,
  StudioDragonBuilding,
  ComtusBuilding,
  TNLBuilding,
  BioniaBuilding
} from './AllBuildingTypes'

interface BuildingProps {
  position: [number, number, number]
  stockData?: StockData
  stockInfo: { symbol: string; name: string }
  market: 'KOSPI' | 'KOSDAQ'
}

function Building({ position, stockData, stockInfo, market }: BuildingProps) {
  const meshRef = useRef<any>(null)
  const lightRef = useRef<THREE.Mesh>(null)
  
  // 건물 클릭 핸들러
  const handleClick = (event: any) => {
    event.stopPropagation()
    console.log('Building clicked:', stockInfo.symbol, stockData)
    
    // stockData가 실제로 있으면 그대로 사용, 없으면 실제 데이터를 기반으로 한 기본값 생성
    const modalData = stockData || generateRealisticStockData(stockInfo.symbol, stockInfo.name)
    
    window.dispatchEvent(new CustomEvent('openStockModal', {
      detail: { stockData: modalData, stockInfo, market }
    }))
  }

  // 실제 주식 데이터를 기반으로 한 기본값 생성
  const generateRealisticStockData = (symbol: string, name: string) => {
    const basePrices: Record<string, number> = {
      '005930': 70000,  // 삼성전자
      '000660': 130000, // SK하이닉스
      '051910': 420000, // LG화학
      '207940': 850000, // 삼성바이오로직스
      '035420': 190000, // NAVER
      '035720': 48000,  // 카카오
      '006400': 380000, // 삼성SDI
      '005380': 210000, // 현대차
      '000270': 95000,  // 기아
      '068270': 175000, // 셀트리온
      '086520': 75000,  // 에코프로
      '247540': 180000, // 에코프로비엠
      '263750': 28000,  // 펄어비스
      '225570': 12000,  // 위메프
      '028300': 42000,  // HLB
      '196170': 115000, // 알테오젠
      '253450': 58000,  // 스튜디오드래곤
      '078340': 85000,  // 컴투스
      '213420': 22000,  // 티앤엘
      '064550': 32000   // 바이오니아
    }

    const marketCaps: Record<string, number> = {
      '005930': 420000000000000,  // 삼성전자 420조
      '000660': 95000000000000,   // SK하이닉스 95조
      '051910': 31000000000000,   // LG화학 31조
      '207940': 67000000000000,   // 삼성바이오로직스 67조
      '035420': 31000000000000,   // NAVER 31조
      '035720': 17000000000000,   // 카카오 17조
      '006400': 28000000000000,   // 삼성SDI 28조
      '005380': 25000000000000,   // 현대차 25조
      '000270': 22000000000000,   // 기아 22조
      '068270': 23000000000000,   // 셀트리온 23조
      '086520': 5500000000000,    // 에코프로 5.5조
      '247540': 13000000000000,   // 에코프로비엠 13조
      '263750': 2100000000000,    // 펄어비스 2.1조
      '225570': 450000000000,     // 위메프 4500억
      '028300': 3200000000000,    // HLB 3.2조
      '196170': 8700000000000,    // 알테오젠 8.7조
      '253450': 4100000000000,    // 스튜디오드래곤 4.1조
      '078340': 6200000000000,    // 컴투스 6.2조
      '213420': 1800000000000,    // 티앤엘 1.8조
      '064550': 2400000000000     // 바이오니아 2.4조
    }

    const basePrice = basePrices[symbol] || 50000
    const marketCap = marketCaps[symbol] || 1000000000000
    const changeRate = (Math.random() - 0.5) * 6 // -3% ~ +3%
    const price = Math.round(basePrice * (1 + changeRate / 100))
    
    return {
      symbol,
      name,
      price,
      change: Math.round(basePrice * changeRate / 100),
      changeRate,
      volume: Math.floor(Math.random() * 5000000) + 1000000,
      marketCap,
      timestamp: Date.now()
    }
  }
  
  // 이전 가격 저장을 위한 ref
  const previousPriceRef = useRef<number | null>(null)
  
  // 건물 높이와 색상 계산
  const { height, color, intensity } = useMemo(() => {
    if (!stockData) {
      return {
        height: 8,
        color: '#4a90e2',
        intensity: 0.5
      }
    }

    // 주식 가격에 따른 높이 계산 (초고층 빌딩숲)
    const priceBasedHeight = Math.max(
      Math.min(stockData.price / 200, 400), // 200원당 1 높이, 최대 400
      20 // 최소 높이 20
    )

    return {
      height: priceBasedHeight,
      color: getStockColor(stockData.changeRate),
      intensity: Math.min(stockData.volume / 1000000, 1)
    }
  }, [stockData])

  // 건물 타입 선택 함수
  const getBuildingComponent = () => {
    const buildingProps = { height, color, intensity, position: [0, 0, 0] as [number, number, number] }
    
    // 디버깅을 위한 로그 (임시)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Building: ${stockInfo.symbol} (${stockInfo.name}) - Height: ${height}, Color: ${color}, HasData: ${!!stockData}`)
    }
    
    switch (stockInfo.symbol) {
      case '005930': // 삼성전자
        return <SamsungTower {...buildingProps} />
      case '000660': // SK하이닉스
        return <SKBuilding {...buildingProps} />
      case '051910': // LG화학
        return <LGChemBuilding {...buildingProps} />
      case '207940': // 삼성바이오로직스
        return <SamsungBioBuilding {...buildingProps} />
      case '035420': // NAVER
        return <NaverBuilding {...buildingProps} />
      case '035720': // 카카오
        return <KakaoBuilding {...buildingProps} />
      case '006400': // 삼성SDI
        return <SamsungSDIBuilding {...buildingProps} />
      case '005380': // 현대차
        return <HyundaiBuilding {...buildingProps} />
      case '000270': // 기아
        return <KiaBuilding {...buildingProps} />
      case '068270': // 셀트리온
        return <CelltrionBuilding {...buildingProps} />
      case '086520': // 에코프로
        return <EcoProBuilding {...buildingProps} />
      case '247540': // 에코프로비엠
        return <EcoProBMBuilding {...buildingProps} />
      case '263750': // 펄어비스
        return <PearlAbyssBuilding {...buildingProps} />
      case '225570': // 위메프
        return <WemepBuilding {...buildingProps} />
      case '028300': // HLB
        return <HLBBuilding {...buildingProps} />
      case '196170': // 알테오젠
        return <AlteogenBuilding {...buildingProps} />
      case '253450': // 스튜디오드래곤
        return <StudioDragonBuilding {...buildingProps} />
      case '078340': // 컴투스
        return <ComtusBuilding {...buildingProps} />
      case '213420': // 티앤엘
        return <TNLBuilding {...buildingProps} />
      case '064550': // 바이오니아
        return <BioniaBuilding {...buildingProps} />
      default:
        console.log(`Using default building for ${stockInfo.symbol}`)
        return <DefaultBuilding {...buildingProps} />
    }
  }

  // 애니메이션
  useFrame((state) => {
    if (stockData && Math.abs(stockData.changeRate) > 5) {
      // 급등락 시 전체 그룹 펄스 효과
      const pulse = Math.sin(state.clock.elapsedTime * 10) * 0.05 + 1
      if (meshRef.current) {
        meshRef.current.scale.setScalar(pulse)
      }
    }
  })

  return (
    <group ref={meshRef} position={position} onClick={handleClick}>
      {/* 개성있는 건물 렌더링 */}
      {getBuildingComponent()}

      {/* 네온 조명 효과 */}
      <mesh position={[0, height + 1, 0]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={intensity * 0.8}
        />
      </mesh>

      {/* 종목명 텍스트 */}
      <Text
        position={[0, height + 2, 0]}
        fontSize={1}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
      >
        {stockInfo.name}
      </Text>

      {/* 가격 정보 텍스트 */}
      {stockData && (
        <Text
          position={[0, height + 5, 0]}
          fontSize={1.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={12}
        >
          {`${(stockData.price / 1000).toFixed(0)}천원`}
          {'\n'}
          {`${stockData.changeRate > 0 ? '+' : ''}${stockData.changeRate.toFixed(2)}%`}
          {'\n'}
          {`${height.toFixed(0)}층`}
        </Text>
      )}

      {/* 바닥 네온 링 */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 2.5, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={intensity * 0.5}
        />
      </mesh>
      
    </group>
  )
}

export default Building
