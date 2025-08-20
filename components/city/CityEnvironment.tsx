'use client'

import { useRef } from 'react'
import * as THREE from 'three'

// 도시 환경 요소들 (도로, 공원, 강 등)
export function CityEnvironment() {
  return (
    <group>
      {/* 메인 도로 네트워크 */}
      <Roads />
      
      {/* 공원과 녹지 */}
      <Parks />
      
      {/* 강/하천 */}
      <River />
      
      {/* 도시 조명 */}
      <StreetLights />
    </group>
  )
}

// 도로 시스템
function Roads() {
  return (
    <group>
      {/* 메인 도로 (동서) */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 4]} />
        <meshStandardMaterial color="#333333" roughness={0.8} />
      </mesh>
      
      {/* 메인 도로 (남북) */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[100, 4]} />
        <meshStandardMaterial color="#333333" roughness={0.8} />
      </mesh>
      
      {/* 서브 도로들 */}
      {[-30, -15, 15, 30].map((x, i) => (
        <mesh key={`road-x-${i}`} position={[x, 0.05, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[80, 2.5]} />
          <meshStandardMaterial color="#444444" roughness={0.8} />
        </mesh>
      ))}
      
      {[-30, -15, 15, 30].map((z, i) => (
        <mesh key={`road-z-${i}`} position={[0, 0.05, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[80, 2.5]} />
          <meshStandardMaterial color="#444444" roughness={0.8} />
        </mesh>
      ))}
      
      {/* 도로 중앙선 */}
      {[-30, -15, 0, 15, 30].map((x, i) => (
        <mesh key={`centerline-x-${i}`} position={[x, 0.1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[80, 0.1]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.8} />
        </mesh>
      ))}
      
      {[-30, -15, 0, 15, 30].map((z, i) => (
        <mesh key={`centerline-z-${i}`} position={[0, 0.1, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[80, 0.1]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

// 공원과 녹지
function Parks() {
  return (
    <group>
      {/* 중앙 공원 */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial color="#228b22" roughness={0.9} />
      </mesh>
      
      {/* 공원 내 나무들 */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 4 + Math.random() * 2
        return (
          <group key={`park-tree-${i}`} position={[
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
          ]}>
            {/* 나무 줄기 */}
            <mesh position={[0, 1.5, 0]}>
              <cylinderGeometry args={[0.3, 0.4, 3, 8]} />
              <meshStandardMaterial color="#8b4513" roughness={0.8} />
            </mesh>
            {/* 나뭇잎 */}
            <mesh position={[0, 3.5, 0]}>
              <sphereGeometry args={[1.5, 8, 6]} />
              <meshStandardMaterial color="#228b22" roughness={0.9} />
            </mesh>
          </group>
        )
      })}
      
      {/* 작은 공원들 */}
      {[
        [25, 25], [-25, 25], [25, -25], [-25, -25]
      ].map(([x, z], i) => (
        <group key={`small-park-${i}`}>
          <mesh position={[x, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[4, 16]} />
            <meshStandardMaterial color="#32cd32" roughness={0.9} />
          </mesh>
          {/* 작은 나무들 */}
          {Array.from({ length: 4 }).map((_, j) => {
            const angle = (j / 4) * Math.PI * 2
            const radius = 2
            return (
              <group key={j} position={[
                x + Math.cos(angle) * radius,
                0,
                z + Math.sin(angle) * radius
              ]}>
                <mesh position={[0, 1, 0]}>
                  <cylinderGeometry args={[0.2, 0.3, 2, 6]} />
                  <meshStandardMaterial color="#8b4513" roughness={0.8} />
                </mesh>
                <mesh position={[0, 2.5, 0]}>
                  <sphereGeometry args={[1, 6, 4]} />
                  <meshStandardMaterial color="#228b22" roughness={0.9} />
                </mesh>
              </group>
            )
          })}
        </group>
      ))}
    </group>
  )
}

// 강/하천
function River() {
  return (
    <group>
      {/* 메인 강 */}
      <mesh position={[0, -0.2, -60]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 8]} />
        <meshStandardMaterial 
          color="#4169e1" 
          transparent 
          opacity={0.7}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      
      {/* 강변 */}
      {[-4.5, 4.5].map((offset, i) => (
        <mesh key={`riverbank-${i}`} position={[0, 0.01, -60 + offset]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[120, 1]} />
          <meshStandardMaterial color="#daa520" roughness={0.8} />
        </mesh>
      ))}
      
      {/* 다리들 */}
      {[-20, 0, 20].map((x, i) => (
        <group key={`bridge-${i}`}>
          <mesh position={[x, 1, -60]} rotation={[0, 0, 0]}>
            <boxGeometry args={[12, 0.5, 1]} />
            <meshStandardMaterial color="#696969" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* 다리 기둥 */}
          {[-3, 3].map((pillarX, j) => (
            <mesh key={j} position={[x + pillarX, -0.5, -60]}>
              <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
              <meshStandardMaterial color="#696969" metalness={0.7} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

// 가로등
function StreetLights() {
  const positions: Array<[number, number]> = []
  
  // 메인 도로를 따라 가로등 배치
  for (let x = -40; x <= 40; x += 8) {
    positions.push([x, 2.5], [x, -2.5])
  }
  for (let z = -40; z <= 40; z += 8) {
    positions.push([2.5, z], [-2.5, z])
  }
  
  return (
    <group>
      {positions.map(([x, z], i) => (
        <group key={`streetlight-${i}`} position={[x, 0, z]}>
          {/* 가로등 기둥 */}
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 6, 8]} />
            <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* 가로등 헤드 */}
          <mesh position={[0, 6.5, 0]}>
            <sphereGeometry args={[0.4, 8, 6]} />
            <meshBasicMaterial color="#ffff88" transparent opacity={0.8} />
          </mesh>
          
          {/* 조명 효과 */}
          <pointLight
            position={[0, 6, 0]}
            color="#ffff88"
            intensity={0.5}
            distance={15}
            decay={2}
          />
        </group>
      ))}
    </group>
  )
}

export default CityEnvironment
