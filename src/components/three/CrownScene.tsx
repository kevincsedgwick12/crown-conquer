import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useMouseNorm } from '../../hooks/useMousePosition'

/* ─────────────────────────────────────────
   Procedural crown built from primitives:
   - Torus base ring
   - 5 tapered spikes (LatheGeometry)
   - 3 accent spheres on alternate tips
   - 800 particle cloud
───────────────────────────────────────── */

function CrownMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const mouse    = useMouseNorm()

  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:     new THREE.Color('#aaaaaa'),
    metalness: 0.95,
    roughness: 0.08,
  }), [])

  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:     new THREE.Color('#cccccc'),
    metalness: 1.0,
    roughness: 0.04,
    emissive:  new THREE.Color('#222222'),
  }), [])

  // 5 spike positions around the ring at radius 1.15
  const spikes = useMemo(() => (
    Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2
      return {
        x: Math.sin(a) * 1.15,
        z: Math.cos(a) * 1.15,
        angle: a,
        height: i % 2 === 0 ? 1.4 : 0.95,   // alternate tall / short
      }
    })
  ), [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    // Slow base rotation
    groupRef.current.rotation.y = t * 0.18

    // Mouse parallax: tilt toward cursor
    groupRef.current.rotation.x += (mouse.current.y * 0.18 - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.z += (-mouse.current.x * 0.10 - groupRef.current.rotation.z) * 0.04
  })

  return (
    <group ref={groupRef}>
      {/* Base band */}
      <mesh material={metalMat} castShadow>
        <torusGeometry args={[1.15, 0.09, 20, 80]} />
      </mesh>

      {/* Lower decorative band */}
      <mesh material={metalMat} position={[0, -0.28, 0]}>
        <torusGeometry args={[1.15, 0.04, 12, 80]} />
      </mesh>

      {/* Spikes */}
      {spikes.map((s, i) => (
        <group key={i} position={[s.x, 0.04, s.z]}>
          <mesh
            material={metalMat}
            rotation={[0, 0, 0]}
            castShadow
          >
            {/* Tapered spike: cylinder top→cone */}
            <cylinderGeometry args={[0.035, 0.095, s.height, 7, 1]} />
          </mesh>
          {/* Tip sphere on the 3 tall spikes */}
          {i % 2 === 0 && (
            <mesh material={accentMat} position={[0, s.height / 2 + 0.06, 0]}>
              <sphereGeometry args={[0.075, 16, 16]} />
            </mesh>
          )}
        </group>
      ))}

      {/* Centre jewel */}
      <mesh material={accentMat} position={[0, 0.05, 0]}>
        <octahedronGeometry args={[0.18, 0]} />
      </mesh>
    </group>
  )
}

/* ─── Particle cloud ─── */
function Particles({ count = 800 }) {
  const mesh = useRef<THREE.Points>(null)
  const mouse = useMouseNorm()

  const [positions, sizes] = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const size = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 3.5
      const θ = Math.random() * Math.PI * 2
      const φ = Math.acos(2 * Math.random() - 1)
      pos[i*3]   = r * Math.sin(φ) * Math.cos(θ)
      pos[i*3+1] = r * Math.sin(φ) * Math.sin(θ)
      pos[i*3+2] = r * Math.cos(φ)
      size[i] = Math.random()
    }
    return [pos, size]
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.04 + mouse.current.x * 0.05
    mesh.current.rotation.x = mouse.current.y * 0.04
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#888888"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Scene wrapper ─── */
export default function CrownScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 6, 3]}  intensity={1.8} castShadow />
      <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#444444" />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#ffffff" />

      <Environment preset="studio" />

      <Float
        speed={1.2}
        rotationIntensity={0.15}
        floatIntensity={0.4}
      >
        <CrownMesh />
      </Float>

      <Particles />
    </Canvas>
  )
}
