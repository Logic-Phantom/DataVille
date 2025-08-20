'use client'

import { useRef } from 'react'
import * as THREE from 'three'

interface BuildingTypeProps {
  height: number
  color: string
  intensity: number
  position: [number, number, number]
}

// 삼성전자 - 현대적인 고층 타워 (부르즈 할리파 스타일)
export function SamsungTower({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const samsungBlue = "#1f4e79"
  const samsungSilver = "#c0c0c0"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 타워 - 점진적으로 좁아지는 형태 */}
      <mesh position={[0, height * 0.3, 0]}>
        <cylinderGeometry args={[3, 4.5, height * 0.6, 16]} />
        <meshStandardMaterial
          color={samsungBlue}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={intensity * 0.3}
        />
      </mesh>
      
      {/* 상단 섹션 - 더 좁아짐 */}
      <mesh position={[0, height * 0.75, 0]}>
        <cylinderGeometry args={[1.5, 3, height * 0.3, 16]} />
        <meshStandardMaterial
          color={samsungSilver}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={intensity * 0.4}
        />
      </mesh>
      
      {/* 첨탑 */}
      <mesh position={[0, height + 1.5, 0]}>
        <coneGeometry args={[0.8, 3, 8]} />
        <meshStandardMaterial
          color={samsungBlue}
          metalness={1}
          roughness={0}
          emissive={color}
          emissiveIntensity={intensity * 0.8}
        />
      </mesh>
      
      {/* 윈도우 패턴 */}
      {Array.from({ length: Math.floor(height / 2) }).map((_, i) => (
        <group key={i}>
          {Array.from({ length: 8 }).map((_, j) => (
            <mesh 
              key={j} 
              position={[
                Math.cos((j / 8) * Math.PI * 2) * (4 - i * 0.1),
                i * 2 + 2,
                Math.sin((j / 8) * Math.PI * 2) * (4 - i * 0.1)
              ]}
            >
              <boxGeometry args={[0.3, 0.8, 0.1]} />
              <meshBasicMaterial color="#87ceeb" transparent opacity={0.8} />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Samsung 로고 홀로그램 */}
      <mesh position={[0, height + 3, 0]} rotation={[0, 0, 0]}>
        <ringGeometry args={[2, 2.5, 16]} />
      </mesh>
    </group>
  )
}

// SK하이닉스 - 현대적인 계단식 오피스 빌딩
export function SKBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const skRed = "#e61e2b"
  const skGray = "#4a4a4a"
  const skWhite = "#f5f5f5"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 팩토리 건물 */}
      <mesh position={[0, height * 0.4, 0]}>
        <boxGeometry args={[6, height * 0.8, 4]} />
        <meshStandardMaterial
          color={skGray}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={intensity * 0.3}
        />
      </mesh>
      
      {/* 클린룸 섹션 */}
      <mesh position={[0, height * 0.85, 0]}>
        <boxGeometry args={[5, height * 0.3, 3.5]} />
        <meshStandardMaterial
          color={skWhite}
          metalness={0.9}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={intensity * 0.5}
        />
      </mesh>
      
      {/* SK 로고 */}
      <mesh position={[0, height + 1, 2.1]}>
        <boxGeometry args={[3, 1.5, 0.2]} />
        <meshBasicMaterial color={skRed} />
      </mesh>
      
      {/* 메모리 칩 패턴 */}
      {Array.from({ length: 8 }).map((_, i) => (
        Array.from({ length: 6 }).map((_, j) => (
          <mesh
            key={`chip-${i}-${j}`}
            position={[
              -2.5 + j * 1,
              2 + i * (height * 0.08),
              2.1
            ]}
          >
            <boxGeometry args={[0.4, 0.3, 0.1]} />
            <meshBasicMaterial 
              color={i % 2 === 0 ? "#00ff88" : "#87ceeb"} 
              transparent 
              opacity={0.9} 
            />
          </mesh>
        ))
      )).flat()}
      
      {/* 환기 시설 */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={`vent-${i}`} position={[-2 + i * 1.3, height + 0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
          <meshStandardMaterial color={skGray} metalness={0.8} />
        </mesh>
      ))}
      
      {/* 최상층 - 헬리패드 */}
      <mesh position={[0, height * 0.9, 0]}>
        <boxGeometry args={[2.5, height * 0.15, 2.5]} />
        <meshStandardMaterial
          color={skGray}
          emissive={skRed}
          emissiveIntensity={intensity * 0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* 헬리패드 표시 */}
      <mesh position={[0, height + 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.8, 16]} />
        <meshBasicMaterial color={skRed} transparent opacity={0.8} />
      </mesh>
      
      {/* 창문 그리드 패턴 */}
      {Array.from({ length: 3 }).map((_, floor) => (
        Array.from({ length: 8 }).map((_, window) => (
          <mesh key={`window-${floor}-${window}`} position={[
            (window - 3.5) * 0.4,
            height * 0.2 + floor * (height * 0.2),
            2.1 - floor * 0.1
          ]}>
            <boxGeometry args={[0.3, 0.8, 0.05]} />
            <meshBasicMaterial color="#87ceeb" transparent opacity={0.8} />
          </mesh>
        ))
      )).flat()}
    </group>
  )
}

// NAVER - 그린팩토리 스타일 친환경 건물
export function NaverBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const naverGreen = "#00c73c"
  const naverWhite = "#ffffff"
  const naverGray = "#f8f9fa"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 건물 - 곡선형 */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[2.8, 3.2, height, 16]} />
        <meshStandardMaterial
          color={naverWhite}
          emissive={naverGreen}
          emissiveIntensity={intensity * 0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* 친환경 테라스 층 */}
      {[0.3, 0.6, 0.85].map((ratio, i) => (
        <group key={`terrace-${i}`}>
          <mesh position={[0, height * ratio, 0]}>
            <torusGeometry args={[3.5 - i * 0.3, 0.2, 8, 32]} />
            <meshStandardMaterial color="#228b22" roughness={0.8} />
          </mesh>
          {/* 식물 시뮬레이션 */}
          {Array.from({ length: 12 }).map((_, j) => {
            const angle = (j / 12) * Math.PI * 2
            const radius = 3.2 - i * 0.3
            return (
              <mesh key={j} position={[
                Math.cos(angle) * radius,
                height * ratio + 0.3,
                Math.sin(angle) * radius
              ]}>
                <sphereGeometry args={[0.15, 6, 4]} />
                <meshStandardMaterial color="#32cd32" />
              </mesh>
            )
          })}
        </group>
      ))}
      
      {/* NAVER 로고 링 */}
      <mesh position={[0, height * 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.2, 8, 32]} />
        <meshBasicMaterial color={naverGreen} transparent opacity={0.9} />
      </mesh>
      
      {/* 상단 친환경 돔 */}
      <mesh position={[0, height + 1.5, 0]}>
        <sphereGeometry args={[1.8, 12, 8]} />
        <meshStandardMaterial
          color={naverGreen}
          emissive={naverGreen}
          emissiveIntensity={intensity * 0.2}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* 유리 커튼월 패턴 */}
      {Array.from({ length: Math.floor(height / 2) }).map((_, i) => (
        <mesh key={`glass-${i}`} position={[0, i * 2 + 1, 0]}>
          <cylinderGeometry args={[3.3, 3.3, 0.1, 16]} />
          <meshBasicMaterial color="#87ceeb" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

// 카카오 - 판교 아지트 스타일 창의적 건물
export function KakaoBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const kakaoYellow = "#fee500"
  const kakaoBrown = "#8b4513"
  const kakaoOrange = "#ff9500"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 건물 - 독특한 형태 */}
      <mesh position={[0, height * 0.3, 0]}>
        <boxGeometry args={[4, height * 0.6, 3]} />
        <meshStandardMaterial
          color={kakaoYellow}
          emissive={kakaoOrange}
          emissiveIntensity={intensity * 0.1}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      
      {/* 상층부 - 비틀린 형태 */}
      <mesh position={[0, height * 0.7, 0]} rotation={[0, Math.PI / 8, 0]}>
        <boxGeometry args={[3.5, height * 0.4, 2.5]} />
        <meshStandardMaterial
          color={kakaoOrange}
          emissive={kakaoYellow}
          emissiveIntensity={intensity * 0.15}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* 카카오 로고 구 */}
      <mesh position={[0, height + 1.5, 0]}>
        <sphereGeometry args={[1.5, 16, 12]} />
        <meshStandardMaterial
          color={kakaoYellow}
          emissive={kakaoYellow}
          emissiveIntensity={intensity * 0.3}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* 라이언 얼굴 디테일 */}
      <mesh position={[-0.4, height + 1.7, 1.2]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.4, height + 1.7, 1.2]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* 창의적인 발코니들 */}
      {[0.25, 0.45, 0.65].map((ratio, i) => (
        <mesh key={`balcony-${i}`} position={[2.2, height * ratio, 0]} rotation={[0, 0, Math.PI / 12]}>
          <boxGeometry args={[0.8, 0.1, 2]} />
          <meshStandardMaterial color={kakaoYellow} transparent opacity={0.8} />
        </mesh>
      ))}
      
      {/* 컬러풀한 창문들 */}
      {Array.from({ length: 6 }).map((_, i) => (
        Array.from({ length: 4 }).map((_, j) => {
          const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']
          return (
            <mesh key={`window-${i}-${j}`} position={[
              (j - 1.5) * 0.8,
              height * 0.15 + i * (height * 0.12),
              1.6
            ]}>
              <boxGeometry args={[0.6, 0.8, 0.05]} />
              <meshBasicMaterial color={colors[i % colors.length]} transparent opacity={0.7} />
            </mesh>
          )
        })
      )).flat()}
    </group>
  )
}

// 현대차 - 미래형 자동차 디자인 센터
export function HyundaiBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const hyundaiBlue = "#002c5f"
  const hyundaiSilver = "#c8c8c8"
  const hyundaiWhite = "#ffffff"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 건물 - 유선형 */}
      <mesh position={[0, height * 0.3, 0]}>
        <cylinderGeometry args={[3, 4, height * 0.6, 16]} />
        <meshStandardMaterial
          color={hyundaiSilver}
          emissive={hyundaiBlue}
          emissiveIntensity={intensity * 0.1}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>
      
      {/* 상층부 - 자동차 실루엣 */}
      <mesh position={[0, height * 0.75, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[4.5, height * 0.3, 2.8]} />
        <meshStandardMaterial
          color={hyundaiBlue}
          emissive={hyundaiBlue}
          emissiveIntensity={intensity * 0.2}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      
      {/* 자동차 형태 상단부 */}
      <mesh position={[0, height + 0.8, 0]}>
        <sphereGeometry args={[2.2, 16, 8]} />
        <meshStandardMaterial
          color={hyundaiBlue}
          emissive={hyundaiBlue}
          emissiveIntensity={intensity * 0.3}
          metalness={0.95}
          roughness={0.02}
        />
      </mesh>
      
      {/* H 로고 - 3D */}
      <group position={[0, height * 0.8, 2.5]}>
        <mesh position={[-0.4, 0, 0]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshBasicMaterial color={hyundaiWhite} />
        </mesh>
        <mesh position={[0.4, 0, 0]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshBasicMaterial color={hyundaiWhite} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.1, 0.1]} />
          <meshBasicMaterial color={hyundaiWhite} />
        </mesh>
      </group>
      
      {/* 자동차 바퀴 모티브 */}
      {[-1.8, 1.8].map((x, i) => (
        <mesh key={`wheel-${i}`} position={[x, height * 0.15, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.3, 8, 16]} />
          <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      
      {/* 미래형 LED 스트립 */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`led-${i}`} position={[0, height * 0.2 + i * (height * 0.15), 0]}>
          <torusGeometry args={[3.8 - i * 0.2, 0.03, 8, 32]} />
          <meshBasicMaterial color={hyundaiBlue} transparent opacity={intensity * 0.8} />
        </mesh>
      ))}
      
      {/* 쇼룸 창문 */}
      {Array.from({ length: 3 }).map((_, floor) => (
        Array.from({ length: 8 }).map((_, window) => {
          const angle = (window / 8) * Math.PI * 2
          const radius = 3.5
          return (
            <mesh key={`window-${floor}-${window}`} position={[
              Math.cos(angle) * radius,
              height * 0.2 + floor * (height * 0.2),
              Math.sin(angle) * radius
            ]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.8, 1.2, 0.05]} />
              <meshBasicMaterial color="#87ceeb" transparent opacity={0.8} />
            </mesh>
          )
        })
      )).flat()}
    </group>
  )
}

// 에코프로 - 친환경 바이오 타워
export function EcoProBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ecoGreen = "#228b22"
  const ecoBlue = "#4169e1"
  const ecoWhite = "#f0fff0"
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 타워 - 나선형 */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[2, 3, height, 12]} />
        <meshStandardMaterial
          color={ecoWhite}
          emissive={ecoGreen}
          emissiveIntensity={intensity * 0.1}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      
      {/* 나선형 녹색 정원 */}
      {Array.from({ length: Math.floor(height / 2) }).map((_, i) => {
        const spiralHeight = i * 2
        const rotation = (i * Math.PI) / 3
        return (
          <group key={`spiral-${i}`} rotation={[0, rotation, 0]}>
            <mesh position={[2.5, spiralHeight, 0]}>
              <torusGeometry args={[0.8, 0.2, 6, 12]} />
              <meshStandardMaterial color="#228b22" roughness={0.9} />
            </mesh>
            {/* 식물들 */}
            {Array.from({ length: 6 }).map((_, j) => {
              const plantAngle = (j / 6) * Math.PI * 2
              return (
                <mesh key={j} position={[
                  2.5 + Math.cos(plantAngle) * 0.6,
                  spiralHeight + 0.4,
                  Math.sin(plantAngle) * 0.6
                ]}>
                  <coneGeometry args={[0.1, 0.6, 6]} />
                  <meshStandardMaterial color="#32cd32" />
                </mesh>
              )
            })}
          </group>
        )
      })}
      
      {/* 상단 바이오 돔 */}
      <mesh position={[0, height + 2, 0]}>
        <sphereGeometry args={[2.5, 16, 12]} />
        <meshStandardMaterial
          color={ecoGreen}
          emissive={ecoGreen}
          emissiveIntensity={intensity * 0.2}
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* 태양광 패널 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh key={`solar-${i}`} position={[
            Math.cos(angle) * 2.8,
            height + 3.5,
            Math.sin(angle) * 2.8
          ]} rotation={[-Math.PI / 6, angle, 0]}>
            <boxGeometry args={[1, 0.05, 1.5]} />
            <meshStandardMaterial color="#191970" metalness={0.8} roughness={0.2} />
          </mesh>
        )
      })}
      
      {/* 친환경 인증 마크 */}
      <mesh position={[0, height * 0.7, 3.2]}>
        <circleGeometry args={[0.8, 16]} />
        <meshBasicMaterial color={ecoGreen} transparent opacity={0.8} />
      </mesh>
      
      {/* 수직 정원 시뮬레이션 */}
      {Array.from({ length: Math.floor(height / 1.5) }).map((_, i) => (
        Array.from({ length: 4 }).map((_, j) => {
          const angle = (j / 4) * Math.PI * 2
          return (
            <mesh key={`garden-${i}-${j}`} position={[
              Math.cos(angle) * 3.2,
              i * 1.5 + 1,
              Math.sin(angle) * 3.2
            ]}>
              <sphereGeometry args={[0.2, 6, 4]} />
              <meshStandardMaterial color="#228b22" />
            </mesh>
          )
        })
      )).flat()}
    </group>
  )
}

// 기본 건물 - 현대적 오피스 타워
export function DefaultBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // 다양한 색상 팩레트
  const buildingColors = [
    { main: "#4a90e2", accent: "#357abd" }, // 블루
    { main: "#7ed321", accent: "#5ba517" }, // 그린
    { main: "#f5a623", accent: "#d4941a" }, // 오렌지
    { main: "#bd10e0", accent: "#9013fe" }, // 보라
    { main: "#b8e986", accent: "#9ccc65" }, // 라임
    { main: "#50e3c2", accent: "#26a69a" }  // 터쿼이즈
  ]
  
  const colorIndex = Math.abs(position[0] + position[2]) % buildingColors.length
  const buildingColor = buildingColors[colorIndex]
  
  return (
    <group ref={groupRef} position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[3.5, height, 3.5]} />
        <meshStandardMaterial
          color={buildingColor.main}
          emissive={buildingColor.accent}
          emissiveIntensity={intensity * 0.1}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* 상단 현대적 캡 */}
      <mesh position={[0, height + 0.8, 0]}>
        <cylinderGeometry args={[2, 2.5, 1.6, 8]} />
        <meshStandardMaterial
          color={buildingColor.accent}
          emissive={buildingColor.accent}
          emissiveIntensity={intensity * 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* 안테나/첨탑 */}
      <mesh position={[0, height + 2.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2, 6]} />
        <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.1} />
      </mesh>
      
      {/* 창문 그리드 */}
      {Array.from({ length: Math.floor(height / 2.5) }).map((_, floor) => (
        Array.from({ length: 4 }).map((_, side) => {
          const positions = [
            [1.8, 0], [-1.8, 0], [0, 1.8], [0, -1.8]
          ]
          return (
            Array.from({ length: 3 }).map((_, window) => (
              <mesh key={`window-${floor}-${side}-${window}`} position={[
                positions[side][0],
                floor * 2.5 + window * 0.8 + 1,
                positions[side][1]
              ]}>
                <boxGeometry args={[0.6, 0.6, 0.05]} />
                <meshBasicMaterial color="#87ceeb" transparent opacity={0.7} />
              </mesh>
            ))
          )
        })
      )).flat().flat()}
      
      {/* LED 액센트 라인 */}
      {[0.25, 0.5, 0.75].map((ratio, i) => (
        <mesh key={`accent-${i}`} position={[0, height * ratio, 0]}>
          <torusGeometry args={[3.8, 0.05, 8, 32]} />
          <meshBasicMaterial color={buildingColor.accent} transparent opacity={intensity * 0.7} />
        </mesh>
      ))}
    </group>
  )
}
