'use client'

import { useRef } from 'react'
import * as THREE from 'three'

interface BuildingTypeProps {
  height: number
  color: string
  intensity: number
  position: [number, number, number]
}

// LG화학 - 화학 공장 스타일
export function LGChemBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const lgRed = "#a50034"
  const lgWhite = "#ffffff"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[3, 3.5, height, 8]} />
        <meshStandardMaterial
          color={lgWhite}
          emissive={lgRed}
          emissiveIntensity={intensity * 0.1}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* 화학 탱크들 */}
      {[0.3, 0.6, 0.9].map((ratio, i) => (
        <mesh key={`tank-${i}`} position={[4, height * ratio, 0]}>
          <cylinderGeometry args={[1, 1, height * 0.2, 12]} />
          <meshStandardMaterial color={lgRed} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

// 삼성바이오로직스 - 바이오 연구소
export function SamsungBioBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bioBlue = "#0066cc"
  const bioWhite = "#f8f8ff"
  const bioGreen = "#00ff7f"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[4, height, 4]} />
        <meshStandardMaterial
          color={bioWhite}
          emissive={bioBlue}
          emissiveIntensity={intensity * 0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* 바이오 리액터 */}
      <mesh position={[0, height + 2, 0]}>
        <sphereGeometry args={[2, 16, 12]} />
        <meshStandardMaterial
          color={bioGreen}
          emissive={bioGreen}
          emissiveIntensity={intensity * 0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

// 삼성SDI - 배터리 공장
export function SamsungSDIBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const sdiBlue = "#1f4e79"
  const sdiSilver = "#c0c0c0"
  const sdiGreen = "#00ff00"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[4.5, height, 3]} />
        <meshStandardMaterial
          color={sdiSilver}
          emissive={sdiBlue}
          emissiveIntensity={intensity * 0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* 배터리 셀 모양 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`battery-${i}`} position={[i * 1.5 - 1.5, height + 1, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 2, 8]} />
          <meshStandardMaterial color={sdiGreen} emissive={sdiGreen} emissiveIntensity={intensity * 0.4} />
        </mesh>
      ))}
    </group>
  )
}

// 기아 - 자동차 디자인 센터
export function KiaBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const kiaRed = "#c5282f"
  const kiaBlack = "#1a1a1a"
  const kiaWhite = "#ffffff"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[4, height, 3.5]} />
        <meshStandardMaterial
          color={kiaBlack}
          emissive={kiaRed}
          emissiveIntensity={intensity * 0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* KIA 로고 */}
      <mesh position={[0, height + 1, 2]}>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshBasicMaterial color={kiaWhite} />
      </mesh>
    </group>
  )
}

// 셀트리온 - 제약 연구소
export function CelltrionBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cellBlue = "#0066cc"
  const cellWhite = "#ffffff"
  const cellGreen = "#00cc66"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[2.5, 3.5, height, 12]} />
        <meshStandardMaterial
          color={cellWhite}
          emissive={cellBlue}
          emissiveIntensity={intensity * 0.1}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* 의료 십자가 */}
      <group position={[0, height + 1, 3]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 1.5, 0.1]} />
          <meshBasicMaterial color={cellGreen} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.1]} />
          <meshBasicMaterial color={cellGreen} />
        </mesh>
      </group>
    </group>
  )
}

// 에코프로비엠 - 배터리 소재
export function EcoProBMBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bmGreen = "#228b22"
  const bmBlue = "#4169e1"
  const bmSilver = "#c0c0c0"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[3.5, height, 3.5]} />
        <meshStandardMaterial
          color={bmSilver}
          emissive={bmGreen}
          emissiveIntensity={intensity * 0.1}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* 배터리 모양 상단 */}
      <mesh position={[0, height + 1, 0]}>
        <cylinderGeometry args={[2, 2, 2, 8]} />
        <meshStandardMaterial color={bmBlue} emissive={bmBlue} emissiveIntensity={intensity * 0.3} />
      </mesh>
    </group>
  )
}

// 펄어비스 - 게임 회사
export function PearlAbyssBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pearlBlack = "#1a1a1a"
  const pearlGold = "#ffd700"
  const pearlPurple = "#8a2be2"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[3.5, height, 3.5]} />
        <meshStandardMaterial
          color={pearlBlack}
          emissive={pearlPurple}
          emissiveIntensity={intensity * 0.2}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      
      {/* 게임 픽셀 효과 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`pixel-${i}`} position={[
          (i % 4 - 1.5) * 0.8,
          height + 1 + Math.floor(i / 4) * 0.8,
          2
        ]}>
          <boxGeometry args={[0.6, 0.6, 0.1]} />
          <meshBasicMaterial color={pearlGold} />
        </mesh>
      ))}
    </group>
  )
}

// 위메프 - 이커머스
export function WemepBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const wemepRed = "#ff6b6b"
  const wemepWhite = "#ffffff"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[3.5, height, 3.5]} />
        <meshStandardMaterial
          color={wemepWhite}
          emissive={wemepRed}
          emissiveIntensity={intensity * 0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* 쇼핑백 모양 */}
      <mesh position={[0, height + 1.5, 0]}>
        <boxGeometry args={[2.5, 2, 1.5]} />
        <meshStandardMaterial color={wemepRed} />
      </mesh>
    </group>
  )
}

// HLB - 바이오 제약
export function HLBBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const hlbBlue = "#0066cc"
  const hlbWhite = "#ffffff"
  const hlbGreen = "#00cc66"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[2.5, 3, height, 8]} />
        <meshStandardMaterial
          color={hlbWhite}
          emissive={hlbBlue}
          emissiveIntensity={intensity * 0.1}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* DNA 나선 */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 4
        return (
          <mesh key={`dna-${i}`} position={[
            Math.cos(angle) * 1.5,
            height * 0.2 + i * (height * 0.06),
            Math.sin(angle) * 1.5
          ]}>
            <sphereGeometry args={[0.2, 8, 6]} />
            <meshBasicMaterial color={hlbGreen} />
          </mesh>
        )
      })}
    </group>
  )
}

// 알테오젠 - 바이오 기술
export function AlteogenBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const alteBlue = "#0066ff"
  const alteWhite = "#ffffff"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[3.5, height, 3.5]} />
        <meshStandardMaterial
          color={alteWhite}
          emissive={alteBlue}
          emissiveIntensity={intensity * 0.1}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      
      {/* 분자 구조 */}
      <mesh position={[0, height + 2, 0]}>
        <sphereGeometry args={[1.5, 16, 12]} />
        <meshStandardMaterial
          color={alteBlue}
          emissive={alteBlue}
          emissiveIntensity={intensity * 0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  )
}

// 스튜디오드래곤 - 드라마 제작사
export function StudioDragonBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const dragonRed = "#dc143c"
  const dragonGold = "#ffd700"
  const dragonBlack = "#1a1a1a"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[4, height, 3]} />
        <meshStandardMaterial
          color={dragonBlack}
          emissive={dragonRed}
          emissiveIntensity={intensity * 0.1}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* 용 모양 장식 */}
      <mesh position={[0, height + 2, 0]}>
        <sphereGeometry args={[1.8, 16, 12]} />
        <meshStandardMaterial
          color={dragonGold}
          emissive={dragonGold}
          emissiveIntensity={intensity * 0.4}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

// 컴투스 - 게임 회사
export function ComtusBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const comBlue = "#4169e1"
  const comOrange = "#ff8c00"
  const comWhite = "#ffffff"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[3.5, height, 3.5]} />
        <meshStandardMaterial
          color={comWhite}
          emissive={comBlue}
          emissiveIntensity={intensity * 0.1}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* 게임 컨트롤러 모양 */}
      <mesh position={[0, height + 1, 0]}>
        <boxGeometry args={[3, 1.5, 0.8]} />
        <meshStandardMaterial color={comOrange} />
      </mesh>
    </group>
  )
}

// 티앤엘 - 의료기기
export function TNLBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const tnlBlue = "#0066cc"
  const tnlWhite = "#ffffff"
  const tnlGreen = "#00cc66"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[2.5, 3, height, 8]} />
        <meshStandardMaterial
          color={tnlWhite}
          emissive={tnlBlue}
          emissiveIntensity={intensity * 0.1}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* 의료 장비 모양 */}
      <mesh position={[0, height + 1.5, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={tnlGreen} />
      </mesh>
    </group>
  )
}

// 바이오니아 - 바이오 진단
export function BioniaBuilding({ height, color, intensity, position }: BuildingTypeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bioBlue = "#0066ff"
  const bioWhite = "#ffffff"
  const bioGreen = "#00ff66"
  
  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[3.5, height, 3.5]} />
        <meshStandardMaterial
          color={bioWhite}
          emissive={bioBlue}
          emissiveIntensity={intensity * 0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* 진단 장비 모양 */}
      <mesh position={[0, height + 1, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 2, 12]} />
        <meshStandardMaterial
          color={bioGreen}
          emissive={bioGreen}
          emissiveIntensity={intensity * 0.3}
        />
      </mesh>
    </group>
  )
}
