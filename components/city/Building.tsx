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
    
    // stockData가 없어도 기본 정보로 모달 열기
    const modalData = stockData || {
      symbol: stockInfo.symbol,
      name: stockInfo.name,
      price: 50000,
      change: 0,
      changeRate: 0,
      volume: 1000000,
      marketCap: 1000000000000,
      timestamp: Date.now()
    }
    
    window.dispatchEvent(new CustomEvent('openStockModal', {
      detail: { stockData: modalData, stockInfo, market }
    }))
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
