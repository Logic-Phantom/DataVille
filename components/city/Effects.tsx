'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStockStore } from '@/stores/stockStore'

export default function Effects() {
  const pointsRef = useRef<THREE.Points>(null)
  const { marketVolatility } = useStockStore()

  // 파티클 위치 생성
  const particleCount = 500
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200     // x
    positions[i * 3 + 1] = Math.random() * 50          // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200 // z
  }

  useFrame((state) => {
    if (pointsRef.current) {
      // 시장 변동성에 따른 파티클 애니메이션
      const material = pointsRef.current.material as THREE.PointsMaterial
      material.opacity = marketVolatility * 0.5 + 0.1
      
      // 파티클 회전
      pointsRef.current.rotation.y += 0.001
    }
  })

  return (
    <group>
      {/* 배경 파티클 */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ff88"
          size={0.5}
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>

      {/* 급등락 시 번개 효과 */}
      {marketVolatility > 0.8 && (
        <mesh position={[0, 25, 0]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={Math.sin(Date.now() * 0.01) * 0.5 + 0.5}
          />
        </mesh>
      )}
    </group>
  )
}
