'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 움직이는 차량 컴포넌트
export function MovingCars() {
  const carsRef = useRef<THREE.Group>(null)
  
  // 차량 경로 생성 (속도 느리게 조정)
  const carPaths = useMemo(() => [
    { start: [-50, 0, -10], end: [50, 0, -10], speed: 0.08, color: '#ff4444' },
    { start: [50, 0, 10], end: [-50, 0, 10], speed: 0.06, color: '#4444ff' },
    { start: [-10, 0, -50], end: [-10, 0, 50], speed: 0.05, color: '#44ff44' },
    { start: [10, 0, 50], end: [10, 0, -50], speed: 0.07, color: '#ffff44' },
  ], [])

  useFrame((state) => {
    if (!carsRef.current) return
    
    carsRef.current.children.forEach((car, index) => {
      const path = carPaths[index]
      const time = state.clock.elapsedTime * path.speed
      const progress = (time % 2) / 2 // 0에서 1까지 반복
      
      // 선형 보간으로 위치 계산
      const x = path.start[0] + (path.end[0] - path.start[0]) * progress
      const z = path.start[2] + (path.end[2] - path.start[2]) * progress
      
      car.position.set(x, 0.5, z)
      
      // 이동 방향에 따라 회전
      const direction = new THREE.Vector3(
        path.end[0] - path.start[0],
        0,
        path.end[2] - path.start[2]
      ).normalize()
      car.lookAt(car.position.clone().add(direction))
    })
  })

  return (
    <group ref={carsRef}>
      {carPaths.map((path, index) => (
        <group key={`car-${index}`}>
          {/* 차량 본체 */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[2, 0.8, 4]} />
            <meshStandardMaterial color={path.color} />
          </mesh>
          {/* 차량 지붕 */}
          <mesh position={[0, 0.8, -0.5]}>
            <boxGeometry args={[1.8, 0.6, 2]} />
            <meshStandardMaterial color={path.color} />
          </mesh>
          {/* 바퀴들 */}
          {[[-0.8, -1.2], [0.8, -1.2], [-0.8, 1.2], [0.8, 1.2]].map(([x, z], i) => (
            <mesh key={`wheel-${i}`} position={[x, 0, z]}>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

// 비행기 컴포넌트 - 개선된 디자인
export function MovingAirplane() {
  return (
    <group>
      <Airplane position={[0, 200, 0]} />
      <Airplane position={[30, 250, 20]} />
    </group>
  )
}

function Airplane({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.3) * 50
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.3) * 50
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + Math.PI / 2
      // 약간의 롤링 효과
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* 동체 */}
      {/* 비행기 동체 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.8, 6, 8]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      {/* 주날개 */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[12, 0.2, 2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      {/* 꼬리날개 */}
      <mesh position={[0, 1, -2.5]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[4, 0.2, 1.5]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      {/* 수직 꼬리날개 */}
      <mesh position={[0, 1.5, -2.5]}>
        <boxGeometry args={[0.2, 2, 1]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
    </group>
  )
}

// 구름 컴포넌트
export function MovingClouds() {
  const cloudsRef = useRef<THREE.Group>(null)
  
  const cloudData = useMemo(() => [
    { x: 0, y: 180, z: 0, scale: 1.2, speed: 0.02 },
    { x: 50, y: 220, z: -30, scale: 0.8, speed: 0.015 },
    { x: -40, y: 160, z: 40, scale: 1.5, speed: 0.025 },
    { x: 30, y: 250, z: 50, scale: 1.0, speed: 0.018 },
    { x: -60, y: 200, z: -20, scale: 0.9, speed: 0.022 },
    { x: 20, y: 190, z: -60, scale: 1.3, speed: 0.016 },
    { x: -20, y: 210, z: 60, scale: 1.5, speed: 0.025 },
    { x: 70, y: 170, z: -30, scale: 1.0, speed: 0.018 },
    { x: -80, y: 230, z: 10, scale: 0.9, speed: 0.022 },
  ], [])

  useFrame((state) => {
    if (!cloudsRef.current) return
    
    cloudsRef.current.children.forEach((cloud: any, index: number) => {
      const data = cloudData[index]
      const time = state.clock.elapsedTime
      
      // 구름 이동
      cloud.position.x = data.x + Math.sin(time * data.speed) * 10
      cloud.position.y = data.y + Math.sin(time * data.speed * 0.5) * 2
      cloud.rotation.y = time * data.speed * 0.1
    })
  })

  return (
    <group ref={cloudsRef}>
      {cloudData.map((data, index) => (
        <group key={`cloud-${index}`} scale={data.scale} position={[data.x, data.y, data.z]}>
          {/* 구름 구성 요소들 */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[3, 16, 12]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
          <mesh position={[2, 0.5, 1]}>
            <sphereGeometry args={[2.5, 16, 12]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
          <mesh position={[-2, 0.2, 0.5]}>
            <sphereGeometry args={[2, 16, 12]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0, 1, -1.5]}>
            <sphereGeometry args={[2.2, 16, 12]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// 움직이는 사람들 컴포넌트
export function MovingPeople() {
  const peopleRef = useRef<THREE.Group>(null)
  
  const peopleData = useMemo(() => [
    { path: [[-15, 0, -15], [-15, 0, 15]], speed: 0.03, color: '#ff6b6b' },
    { path: [[15, 0, 15], [15, 0, -15]], speed: 0.035, color: '#4ecdc4' },
    { path: [[-25, 0, 5], [25, 0, 5]], speed: 0.025, color: '#45b7d1' },
    { path: [[5, 0, -25], [5, 0, 25]], speed: 0.04, color: '#96ceb4' },
    { path: [[-5, 0, -20], [-5, 0, 20]], speed: 0.03, color: '#ffeaa7' },
  ], [])

  useFrame((state) => {
    if (!peopleRef.current) return
    
    peopleRef.current.children.forEach((person: any, index: number) => {
      const data = peopleData[index]
      const time = state.clock.elapsedTime * data.speed
      const progress = (time % 2) / 2
      
      // 경로를 따라 이동
      const start = data.path[0]
      const end = data.path[1]
      const x = start[0] + (end[0] - start[0]) * progress
      const z = start[2] + (end[2] - start[2]) * progress
      
      person.position.set(x, 0, z)
      
      // 걷는 애니메이션 (상하 움직임)
      person.position.y = Math.abs(Math.sin(time * 10)) * 0.1
    })
  })

  return (
    <group ref={peopleRef}>
      {peopleData.map((data, index) => (
        <group key={`person-${index}`}>
          {/* 몸통 */}
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 1.2, 8]} />
            <meshStandardMaterial color={data.color} />
          </mesh>
          {/* 머리 */}
          <mesh position={[0, 2, 0]}>
            <sphereGeometry args={[0.4, 16, 12]} />
            <meshStandardMaterial color="#ffdbac" />
          </mesh>
          {/* 팔들 */}
          <mesh position={[-0.6, 1.2, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.8, 6]} />
            <meshStandardMaterial color="#ffdbac" />
          </mesh>
          <mesh position={[0.6, 1.2, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.8, 6]} />
            <meshStandardMaterial color="#ffdbac" />
          </mesh>
          {/* 다리들 */}
          <mesh position={[-0.2, 0.3, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.6, 6]} />
            <meshStandardMaterial color="#2d3436" />
          </mesh>
          <mesh position={[0.2, 0.3, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.6, 6]} />
            <meshStandardMaterial color="#2d3436" />
          </mesh>
        </group>
      ))}
    </group>
  )
}
