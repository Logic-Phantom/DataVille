'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'
import CityScene from './CityScene'
import Effects from './Effects'
import { useStockWebSocket } from '@/hooks/useStockWebSocket'

// THREE 객체들을 R3F에 등록
extend(THREE)

export default function City() {
  // WebSocket 연결 시도
  useStockWebSocket()

  return (
    <Canvas
      camera={{ position: [60, 50, 60], fov: 75 }}
      shadows
      className="w-full h-full"
    >
      {/* 환경 설정 */}
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 50, 200]} />
      
      {/* 조명 */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      
      {/* 도시 씬 */}
      <Suspense fallback={null}>
        <CityScene />
      </Suspense>
      
      {/* 특수 효과 */}
      <Effects />
      
      {/* 환경 */}
      <Environment preset="night" />
      
      {/* 카메라 컨트롤 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={30}
        maxDistance={800}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0, 0]}
      />
      
    </Canvas>
  )
}
