'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

function Ground() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // 지면에 미묘한 네온 그리드 애니메이션
      const material = meshRef.current.material as any
      material.emissiveIntensity = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.05
    }
  })

  return (
    <group>
      {/* 메인 지면 */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#00ff88"
          emissiveIntensity={0.05}
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      {/* 그리드 라인들 */}
      {Array.from({ length: 21 }, (_, i) => (
        <group key={`grid-${i}`}>
          {/* 세로 라인 */}
          <mesh position={[-50 + i * 5, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 100]} />
            <meshBasicMaterial
              color="#00ff88"
              transparent
              opacity={0.2}
            />
          </mesh>
          {/* 가로 라인 */}
          <mesh position={[0, 0, -50 + i * 5]}>
            <boxGeometry args={[100, 0.1, 0.1]} />
            <meshBasicMaterial
              color="#00ff88"
              transparent
              opacity={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default Ground
