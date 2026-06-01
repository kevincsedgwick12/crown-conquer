import { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshDistortMaterial, Float, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMouseNorm } from '../hooks/useMousePosition'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Metallic floating crown emblem:
   Two nested octahedra + outer ring
   representing the brand mark in 3D
───────────────────────────────────────── */
function EmblemMesh() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const ringRef  = useRef<THREE.Mesh>(null)
  const mouse    = useMouseNorm()

  const matOuter = new THREE.MeshStandardMaterial({
    color:     '#c0c0c0',
    metalness: 0.98,
    roughness: 0.05,
    envMapIntensity: 1.2,
  })

  const matInner = new THREE.MeshStandardMaterial({
    color:     '#888888',
    metalness: 0.99,
    roughness: 0.02,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide,
  })

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.22
      outerRef.current.rotation.x = Math.sin(t * 0.4) * 0.1 + mouse.current.y * 0.15
      outerRef.current.rotation.z = mouse.current.x * 0.1
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.35
      innerRef.current.rotation.x = t * 0.18
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.12
      ringRef.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.3) * 0.06
    }
  })

  return (
    <group>
      {/* Outer octahedron frame */}
      <mesh ref={outerRef} material={matOuter}>
        <octahedronGeometry args={[1.8, 0]} />
      </mesh>

      {/* Inner counter-rotating octahedron */}
      <mesh ref={innerRef} material={matInner} scale={0.6}>
        <octahedronGeometry args={[1.8, 0]} />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ringRef} material={matOuter}>
        <torusGeometry args={[2.6, 0.03, 16, 100]} />
      </mesh>

      {/* Glowing core */}
      <mesh>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#555555"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export default function InteractiveThree() {
  const sectionRef  = useRef<HTMLElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ithree-line', {
        y: 60, opacity: 0, stagger: 0.12, duration: 1.0, ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="
        relative min-h-screen flex flex-col lg:flex-row
        items-center justify-center overflow-hidden
        bg-crown-charcoal
      "
    >
      {/* Horizontal rule top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crown-border to-transparent" />

      {/* Three.js canvas — left half */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 38 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 8, 5]}  intensity={2.2} />
          <directionalLight position={[-4, -4, -4]} intensity={0.5} color="#444444" />
          <pointLight       position={[2, 3, 2]}   intensity={0.7} color="#ffffff" />

          <Environment preset="city" />

          <Suspense fallback={null}>
            <Float speed={1.0} rotationIntensity={0.12} floatIntensity={0.3}>
              <EmblemMesh />
            </Float>
          </Suspense>
        </Canvas>
      </div>

      {/* Text content — right half */}
      <div
        ref={contentRef}
        className="w-full lg:w-1/2 px-10 md:px-16 py-20 lg:py-0 flex flex-col justify-center"
      >
        <p className="ithree-line text-[10px] tracking-widest3 uppercase text-crown-ash mb-8">
          — The Mark
        </p>

        <h2 className="ithree-line font-heading text-[clamp(2.5rem,6vw,5.5rem)] leading-none text-crown-white mb-8">
          Forged In<br />Darkness.
        </h2>

        <p className="ithree-line text-sm text-crown-ash leading-loose max-w-sm mb-10">
          The Crown &amp; Conquer emblem is not decoration. It is a declaration.
          Wear it only if you are committed to the work that others refuse.
        </p>

        <div className="ithree-line flex flex-col gap-4">
          {['100% Premium Cotton', 'Performance Fit', 'Built To Endure'].map(stat => (
            <div key={stat} className="flex items-center gap-4">
              <span className="w-4 h-px bg-crown-ash" />
              <span className="text-[11px] tracking-widest uppercase text-crown-ash">{stat}</span>
            </div>
          ))}
        </div>

        <div className="ithree-line mt-12">
          <a
            href="#"
            className="
              inline-flex items-center gap-3
              text-[11px] font-semibold tracking-widest uppercase
              text-crown-white border border-crown-white/30
              px-8 py-4 hover:border-crown-white
              hover:bg-crown-white hover:text-crown-black
              transition-all duration-400 cursor-none
            "
          >
            Shop The Look
          </a>
        </div>
      </div>
    </section>
  )
}
