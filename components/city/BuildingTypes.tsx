'use client'

import { useRef } from 'react'
import * as THREE from 'three'

interface BuildingTypeProps {
  height: number
  color: string
  intensity: number
  position: [number, number, number]
}

// 삼성전자 - 현실적인 초고층 오피스 타워
export function SamsungTower({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const concreteGray = "#8b9dc3"
  const steelGray = "#4a5568"
  const glassBlue = "#2b6cb0"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 타워 - 현실적인 비율 */}
      <mesh position={[0, height * 0.5, 0]}>
        <boxGeometry args={[5, height, 4]} />
        <meshStandardMaterial
          color={concreteGray}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* 건물 모서리 강화 */}
      {[[-2.5, 0, 2], [2.5, 0, 2], [-2.5, 0, -2], [2.5, 0, -2]].map((pos, i) => (
        <mesh key={`corner-${i}`} position={[pos[0], height * 0.5, pos[1]]}>
          <boxGeometry args={[0.2, height, 0.2]} />
          <meshStandardMaterial color={steelGray} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      
      {/* 층별 구분선 */}
      {Array.from({ length: Math.floor(height / 4) }).map((_, i) => (
        <mesh key={`floor-line-${i}`} position={[0, i * 4 + 2, 2.01]}>
          <boxGeometry args={[5, 0.1, 0.05]} />
          <meshStandardMaterial color={steelGray} metalness={0.5} />
        </mesh>
      ))}
      
      {/* 유리창 - 더 현실적인 배치 */}
      {Array.from({ length: Math.floor(height / 4) }).map((_, floor) => (
        Array.from({ length: 10 }).map((_, window) => (
          <mesh 
            key={`window-${floor}-${window}`}
            position={[
              (window - 4.5) * 0.45,
              floor * 4 + 2,
              2.01
            ]}
          >
            <boxGeometry args={[0.4, 3.5, 0.02]} />
            <meshStandardMaterial 
              color={glassBlue}
              metalness={0.1}
              roughness={0.05}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))
      )).flat()}
      
      {/* 옥상 구조물 */}
      <mesh position={[0, height + 1.5, 0]}>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial
          color={steelGray}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* 냉각탑 */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={`cooling-${i}`} position={[x, height + 3.5, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 2, 12]} />
          <meshStandardMaterial color="#666666" metalness={0.3} roughness={0.8} />
        </mesh>
      ))}
      
      {/* 통신 안테나 */}
      <mesh position={[0, height + 5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3, 6]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} />
      </mesh>
    </group>
  )
}

// SK하이닉스 - 현실적인 반도체 팹 건물
export function SKBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const fabWhite = "#f8fafc"
  const steelGray = "#475569"
  const glassBlue = "#1e40af"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 팹 건물 - 클린룸 특성 반영 */}
      <mesh position={[0, height * 0.5, 0]}>
        <boxGeometry args={[7, height, 5]} />
        <meshStandardMaterial
          color={fabWhite}
          metalness={0.05}
          roughness={0.95}
        />
      </mesh>
      
      {/* 건물 외벽 패널 구조 */}
      {Array.from({ length: Math.floor(height / 3) }).map((_, i) => (
        <mesh key={`panel-${i}`} position={[0, i * 3 + 1.5, 2.51]}>
          <boxGeometry args={[6.8, 0.05, 0.1]} />
          <meshStandardMaterial color={steelGray} metalness={0.6} />
        </mesh>
      ))}
      
      {/* 수직 구조 기둥 */}
      {[-3, 0, 3].map((x, i) => (
        <mesh key={`pillar-${i}`} position={[x, height * 0.5, 2.51]}>
          <boxGeometry args={[0.1, height, 0.1]} />
          <meshStandardMaterial color={steelGray} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      
      {/* 작은 창문들 - 팹 특성상 적음 */}
      {Array.from({ length: Math.floor(height / 6) }).map((_, floor) => (
        Array.from({ length: 4 }).map((_, window) => (
          <mesh 
            key={`window-${floor}-${window}`}
            position={[
              (window - 1.5) * 1.5,
              floor * 6 + 3,
              2.51
            ]}
          >
            <boxGeometry args={[0.8, 1.5, 0.02]} />
            <meshStandardMaterial 
              color={glassBlue}
              metalness={0.1}
              roughness={0.05}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))
      )).flat()}
      
      {/* 대형 환기 시설 */}
      <mesh position={[0, height + 2, 0]}>
        <boxGeometry args={[5, 4, 3]} />
        <meshStandardMaterial
          color={steelGray}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* 환기 덕트들 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`duct-${i}`} position={[
          -2 + (i % 3) * 2,
          height + 4.5,
          -1 + Math.floor(i / 3) * 2
        ]}>
          <cylinderGeometry args={[0.4, 0.4, 2, 12]} />
          <meshStandardMaterial color="#525252" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      
      {/* 클린룸 표시등 */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={`light-${i}`} position={[
          -1.5 + i * 1,
          height + 0.5,
          2.52
        ]}>
          <boxGeometry args={[0.3, 0.3, 0.1]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      ))}
    </group>
  )
}

// NAVER - 현실적인 IT 오피스 빌딩
export function NaverBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const whiteGray = "#f3f4f6"
  const darkGray = "#374151"
  const glassBlue = "#1e40af"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height * 0.5, 0]}>
        <boxGeometry args={[4.5, height, 3.5]} />
        <meshStandardMaterial
          color={whiteGray}
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>
      
      {/* 유리 파사드 */}
      <mesh position={[0, height * 0.5, 1.76]}>
        <boxGeometry args={[4.3, height * 0.95, 0.02]} />
        <meshStandardMaterial
          color={glassBlue}
          metalness={0.1}
          roughness={0.1}
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* 창문 그리드 */}
      {Array.from({ length: Math.floor(height / 2.8) }).map((_, floor) => (
        Array.from({ length: 9 }).map((_, window) => (
          <mesh 
            key={`window-${floor}-${window}`}
            position={[
              (window - 4) * 0.45,
              floor * 2.8 + 1.4,
              1.77
            ]}
          >
            <boxGeometry args={[0.4, 2.3, 0.01]} />
            <meshBasicMaterial 
              color={Math.random() > 0.8 ? "#10b981" : "#3b82f6"} 
              transparent 
              opacity={0.8} 
            />
          </mesh>
        ))
      )).flat()}
      
      {/* 옥상 */}
      <mesh position={[0, height + 0.5, 0]}>
        <boxGeometry args={[4.5, 1, 3.5]} />
        <meshStandardMaterial
          color={darkGray}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}

// 카카오 - 현실적인 IT 캠퍼스 빌딩
export function KakaoBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const lightGray = "#e5e7eb"
  const darkGray = "#4b5563"
  const glassBlue = "#1f2937"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height * 0.5, 0]}>
        <boxGeometry args={[4, height, 3.8]} />
        <meshStandardMaterial
          color={lightGray}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      
      {/* 유리창 */}
      {Array.from({ length: Math.floor(height / 2.5) }).map((_, floor) => (
        Array.from({ length: 8 }).map((_, window) => (
          <mesh 
            key={`window-${floor}-${window}`}
            position={[
              (window - 3.5) * 0.45,
              floor * 2.5 + 1.25,
              1.91
            ]}
          >
            <boxGeometry args={[0.4, 2, 0.02]} />
            <meshStandardMaterial 
              color={glassBlue}
              metalness={0.1}
              roughness={0.1}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))
      )).flat()}
      
      {/* 옥상 */}
      <mesh position={[0, height + 0.5, 0]}>
        <boxGeometry args={[4, 1, 3.8]} />
        <meshStandardMaterial
          color={darkGray}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}

// 현대차 - 현실적인 자동차 제조 공장
export function HyundaiBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const metalGray = "#6b7280"
  const darkGray = "#374151"
  const glassBlue = "#1e3a8a"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 공장 건물 */}
      <mesh position={[0, height * 0.5, 0]}>
        <boxGeometry args={[6, height, 4]} />
        <meshStandardMaterial
          color={metalGray}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* 유리창 */}
      {Array.from({ length: Math.floor(height / 3) }).map((_, floor) => (
        Array.from({ length: 12 }).map((_, window) => (
          <mesh 
            key={`window-${floor}-${window}`}
            position={[
              (window - 5.5) * 0.45,
              floor * 3 + 1.5,
              2.01
            ]}
          >
            <boxGeometry args={[0.4, 2.5, 0.02]} />
            <meshStandardMaterial 
              color={glassBlue}
              metalness={0.1}
              roughness={0.1}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))
      )).flat()}
      
      {/* 옥상 기계실 */}
      <mesh position={[0, height + 1, 0]}>
        <boxGeometry args={[4, 2, 3]} />
        <meshStandardMaterial
          color={darkGray}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      
      {/* 굴뚝/환기시설 */}
      {Array.from({ length: 2 }).map((_, i) => (
        <mesh key={`chimney-${i}`} position={[-1.5 + i * 3, height + 2.5, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
          <meshStandardMaterial color={darkGray} metalness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// 에코프로 - 현실적인 친환경 제조 공장
export function EcoProBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const whiteGray = "#f3f4f6"
  const darkGray = "#374151"
  const glassGreen = "#065f46"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height * 0.5, 0]}>
        <boxGeometry args={[4.5, height, 3.5]} />
        <meshStandardMaterial
          color={whiteGray}
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>
      
      {/* 유리창 */}
      {Array.from({ length: Math.floor(height / 2.5) }).map((_, floor) => (
        Array.from({ length: 9 }).map((_, window) => (
          <mesh 
            key={`window-${floor}-${window}`}
            position={[
              (window - 4) * 0.45,
              floor * 2.5 + 1.25,
              1.76
            ]}
          >
            <boxGeometry args={[0.4, 2, 0.02]} />
            <meshStandardMaterial 
              color={glassGreen}
              metalness={0.1}
              roughness={0.1}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))
      )).flat()}
      
      {/* 옥상 */}
      <mesh position={[0, height + 0.5, 0]}>
        <boxGeometry args={[4.5, 1, 3.5]} />
        <meshStandardMaterial
          color={darkGray}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      
      {/* 태양광 패널 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`solar-${i}`} position={[
          -1.8 + (i % 3) * 1.8,
          height + 1.2,
          -0.8 + Math.floor(i / 3) * 1.6
        ]} rotation={[-Math.PI / 8, 0, 0]}>
          <boxGeometry args={[1.5, 0.05, 1]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

// 기본 건물 - 현실적인 오피스 타워
export function DefaultBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // 현실적인 건물 색상
  const buildingColors = [
    "#9ca3af", // 회색
    "#6b7280", // 진회색  
    "#e5e7eb", // 밝은회색
    "#d1d5db", // 중간회색
    "#f3f4f6", // 거의흰색
    "#4b5563"  // 어두운회색
  ]
  
  const colorIndex = Math.abs(position[0] + position[2]) % buildingColors.length
  const buildingColor = buildingColors[colorIndex]
  const glassColor = "#1e3a8a"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[3.5, height, 3.5]} />
        <meshStandardMaterial
          color={buildingColor}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      
      {/* 유리창 */}
      {Array.from({ length: Math.floor(height / 2.5) }).map((_, floor) => (
        Array.from({ length: 7 }).map((_, window) => (
          <mesh 
            key={`window-${floor}-${window}`}
            position={[
              (window - 3) * 0.45,
              floor * 2.5 + 1.25,
              1.76
            ]}
          >
            <boxGeometry args={[0.4, 2, 0.02]} />
            <meshStandardMaterial 
              color={glassColor}
              metalness={0.1}
              roughness={0.1}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))
      )).flat()}
      
      {/* 옥상 */}
      <mesh position={[0, height + 0.3, 0]}>
        <boxGeometry args={[3.5, 0.6, 3.5]} />
        <meshStandardMaterial
          color="#374151"
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      
      {/* 안테나 */}
      <mesh position={[0, height + 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} />
      </mesh>
    </group>
  )
}
