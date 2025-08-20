'use client'

import { useRef } from 'react'
import * as THREE from 'three'

interface BuildingProps {
  height: number
  color: string
  intensity: number
  position: [number, number, number]
}

// 벽돌 패턴이 있는 삼성 타워
export function EnhancedSamsungTower({ height, color, intensity, position }: BuildingProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group position={position}>
      {/* 메인 타워 */}
      <mesh ref={meshRef} position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, height, 4]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      {/* 창문들 */}
      {Array.from({ length: Math.floor(height / 2) }, (_, i) => (
        <group key={`windows-${i}`}>
          {/* 앞면 창문 */}
          <mesh position={[0, i * 2 + 1, 2.01]}>
            <planeGeometry args={[3, 1.5]} />
            <meshStandardMaterial 
              color="#87CEEB" 
              transparent 
              opacity={0.7}
              emissive="#87CEEB"
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* 뒷면 창문 */}
          <mesh position={[0, i * 2 + 1, -2.01]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[3, 1.5]} />
            <meshStandardMaterial 
              color="#87CEEB" 
              transparent 
              opacity={0.7}
              emissive="#87CEEB"
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* 좌면 창문 */}
          <mesh position={[-2.01, i * 2 + 1, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[3, 1.5]} />
            <meshStandardMaterial 
              color="#87CEEB" 
              transparent 
              opacity={0.7}
              emissive="#87CEEB"
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* 우면 창문 */}
          <mesh position={[2.01, i * 2 + 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[3, 1.5]} />
            <meshStandardMaterial 
              color="#87CEEB" 
              transparent 
              opacity={0.7}
              emissive="#87CEEB"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      ))}
      
      {/* 상단 안테나 */}
      <mesh position={[0, height + 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

// 벽돌 패턴 SK 건물
export function EnhancedSKBuilding({ height, color, intensity, position }: BuildingProps) {
  return (
    <group position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, height, 3.5]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* 벽돌 패턴 */}
      {Array.from({ length: Math.floor(height / 1) }, (_, i) => (
        <group key={`brick-${i}`}>
          {/* 앞면 벽돌 라인 */}
          <mesh position={[0, i * 1 + 0.5, 1.76]}>
            <boxGeometry args={[3.6, 0.1, 0.02]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* 뒷면 벽돌 라인 */}
          <mesh position={[0, i * 1 + 0.5, -1.76]}>
            <boxGeometry args={[3.6, 0.1, 0.02]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* 좌면 벽돌 라인 */}
          <mesh position={[-1.76, i * 1 + 0.5, 0]}>
            <boxGeometry args={[0.02, 0.1, 3.6]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* 우면 벽돌 라인 */}
          <mesh position={[1.76, i * 1 + 0.5, 0]}>
            <boxGeometry args={[0.02, 0.1, 3.6]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        </group>
      ))}
      
      {/* 창문들 */}
      {Array.from({ length: Math.floor(height / 3) }, (_, i) => (
        <group key={`windows-${i}`}>
          <mesh position={[0, i * 3 + 1.5, 1.76]}>
            <planeGeometry args={[2.5, 2]} />
            <meshStandardMaterial 
              color="#4169E1" 
              transparent 
              opacity={0.6}
              emissive="#4169E1"
              emissiveIntensity={0.1}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// 현대적인 유리 네이버 건물
export function EnhancedNaverBuilding({ height, color, intensity, position }: BuildingProps) {
  return (
    <group position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, height, 4.5]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* 유리 패널들 */}
      {Array.from({ length: Math.floor(height / 1.5) }, (_, i) => (
        <group key={`glass-${i}`}>
          {/* 앞면 유리 패널 */}
          <mesh position={[0, i * 1.5 + 0.75, 2.26]}>
            <planeGeometry args={[4, 1.2]} />
            <meshStandardMaterial 
              color="#00FF00" 
              transparent 
              opacity={0.3}
              emissive="#00FF00"
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* 측면 유리 패널들 */}
          <mesh position={[-2.26, i * 1.5 + 0.75, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[4, 1.2]} />
            <meshStandardMaterial 
              color="#00FF00" 
              transparent 
              opacity={0.3}
              emissive="#00FF00"
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[2.26, i * 1.5 + 0.75, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[4, 1.2]} />
            <meshStandardMaterial 
              color="#00FF00" 
              transparent 
              opacity={0.3}
              emissive="#00FF00"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}
      
      {/* 네이버 로고 */}
      <mesh position={[0, height + 1, 2.3]}>
        <planeGeometry args={[3, 1]} />
        <meshStandardMaterial 
          color="#00FF00" 
          emissive="#00FF00"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

// 카카오 노란색 건물
export function EnhancedKakaoBuilding({ height, color, intensity, position }: BuildingProps) {
  return (
    <group position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.5, 3, height, 8]} />
        <meshStandardMaterial 
          color="#FFEB3B"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      
      {/* 원형 창문들 */}
      {Array.from({ length: Math.floor(height / 2) }, (_, i) => (
        <group key={`windows-${i}`}>
          {Array.from({ length: 6 }, (_, j) => (
            <mesh 
              key={`window-${j}`}
              position={[
                Math.cos((j * Math.PI * 2) / 6) * 2.6,
                i * 2 + 1,
                Math.sin((j * Math.PI * 2) / 6) * 2.6
              ]}
            >
              <circleGeometry args={[0.4, 16]} />
              <meshStandardMaterial 
                color="#FFA500" 
                transparent 
                opacity={0.7}
                emissive="#FFA500"
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* 상단 장식 */}
      <mesh position={[0, height + 1, 0]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial 
          color="#FFEB3B" 
          emissive="#FFEB3B"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

// 현대차 건물
export function EnhancedHyundaiBuilding({ height, color, intensity, position }: BuildingProps) {
  return (
    <group position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, height, 3]} />
        <meshStandardMaterial 
          color="#2E3192"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
      
      {/* 수직 스트라이프 */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={`stripe-${i}`}
          position={[-2 + (i * 0.6), height / 2, 1.51]}
        >
          <boxGeometry args={[0.1, height, 0.02]} />
          <meshStandardMaterial color="#C0C0C0" />
        </mesh>
      ))}
      
      {/* 창문 그리드 */}
      {Array.from({ length: Math.floor(height / 2.5) }, (_, i) => (
        <group key={`window-row-${i}`}>
          {Array.from({ length: 6 }, (_, j) => (
            <mesh 
              key={`window-${j}`}
              position={[-2 + (j * 0.8), i * 2.5 + 1.25, 1.51]}
            >
              <planeGeometry args={[0.6, 1.8]} />
              <meshStandardMaterial 
                color="#87CEEB" 
                transparent 
                opacity={0.6}
                emissive="#87CEEB"
                emissiveIntensity={0.1}
              />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* 현대 로고 */}
      <mesh position={[0, height + 0.5, 1.6]}>
        <boxGeometry args={[2, 0.8, 0.1]} />
        <meshStandardMaterial 
          color="#2E3192" 
          emissive="#2E3192"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

// 에코프로 친환경 건물
export function EnhancedEcoProBuilding({ height, color, intensity, position }: BuildingProps) {
  return (
    <group position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, height, 3.5]} />
        <meshStandardMaterial 
          color="#228B22"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* 친환경 패널들 */}
      {Array.from({ length: Math.floor(height / 2) }, (_, i) => (
        <group key={`solar-${i}`}>
          <mesh position={[0, i * 2 + 1, 1.76]}>
            <planeGeometry args={[3, 1.5]} />
            <meshStandardMaterial 
              color="#006400" 
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          {/* 태양광 패널 격자 */}
          {Array.from({ length: 3 }, (_, j) => (
            <mesh 
              key={`grid-${j}`}
              position={[-1 + j, i * 2 + 1, 1.77]}
            >
              <boxGeometry args={[0.05, 1.5, 0.01]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* 상단 풍력 발전기 */}
      <mesh position={[0, height + 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* 풍력 발전기 날개들 */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh 
          key={`blade-${i}`}
          position={[0, height + 3.5, 0]}
          rotation={[0, 0, (i * Math.PI * 2) / 3]}
        >
          <boxGeometry args={[0.1, 2, 0.05]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      ))}
    </group>
  )
}

// 기본 건물 (향상된 버전)
export function EnhancedDefaultBuilding({ height, color, intensity, position }: BuildingProps) {
  return (
    <group position={position}>
      {/* 메인 건물 */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, height, 3]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
      
      {/* 창문들 */}
      {Array.from({ length: Math.floor(height / 2) }, (_, i) => (
        <group key={`windows-${i}`}>
          <mesh position={[0, i * 2 + 1, 1.51]}>
            <planeGeometry args={[2.5, 1.5]} />
            <meshStandardMaterial 
              color="#FFD700" 
              transparent 
              opacity={0.7}
              emissive="#FFD700"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      ))}
      
      {/* 건물 테두리 */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[3.1, height + 0.1, 3.1]} />
        <meshStandardMaterial 
          color="#444444"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </group>
  )
}
