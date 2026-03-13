import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Small drifting particle cloud ─────────────────────────────── */
const Particles = () => {
    const COUNT = 700
    const meshRef = useRef()
    const clock = useRef(0)

    // Build raw geometry once
    const { geometry, originals } = useMemo(() => {
        const positions = new Float32Array(COUNT * 3)
        const orig = new Float32Array(COUNT * 3)
        for (let i = 0; i < COUNT; i++) {
            const x = (Math.random() - 0.5) * 30
            const y = (Math.random() - 0.5) * 20
            const z = (Math.random() - 0.5) * 15 - 5
            positions[i * 3] = orig[i * 3] = x
            positions[i * 3 + 1] = orig[i * 3 + 1] = y
            positions[i * 3 + 2] = orig[i * 3 + 2] = z
        }
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        return { geometry: geo, originals: orig }
    }, [])

    useFrame((_, delta) => {
        clock.current += delta
        const pos = meshRef.current.geometry.attributes.position.array
        for (let i = 0; i < COUNT; i++) {
            const t = clock.current * 0.4 + i * 0.13
            pos[i * 3] = originals[i * 3] + Math.sin(t) * 0.6
            pos[i * 3 + 1] = originals[i * 3 + 1] + Math.cos(t * 0.7) * 0.5
            pos[i * 3 + 2] = originals[i * 3 + 2] + Math.sin(t * 0.5) * 0.3
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={meshRef} geometry={geometry}>
            <pointsMaterial
                size={0.055}
                color="#a78bfa"
                transparent
                opacity={0.55}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    )
}

/* ─── Larger, slower purple bokeh blobs ─────────────────────────── */
const BokehBlobs = () => {
    const COUNT = 45
    const meshRef = useRef()
    const clock = useRef(0)

    const { geometry, originals } = useMemo(() => {
        const positions = new Float32Array(COUNT * 3)
        const orig = new Float32Array(COUNT * 3)
        for (let i = 0; i < COUNT; i++) {
            const x = (Math.random() - 0.5) * 25
            const y = (Math.random() - 0.5) * 18
            const z = (Math.random() - 0.5) * 8 - 3
            positions[i * 3] = orig[i * 3] = x
            positions[i * 3 + 1] = orig[i * 3 + 1] = y
            positions[i * 3 + 2] = orig[i * 3 + 2] = z
        }
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        return { geometry: geo, originals: orig }
    }, [])

    useFrame((_, delta) => {
        clock.current += delta
        const pos = meshRef.current.geometry.attributes.position.array
        for (let i = 0; i < COUNT; i++) {
            const t = clock.current * 0.2 + i * 0.4
            pos[i * 3] = originals[i * 3] + Math.sin(t) * 1.2
            pos[i * 3 + 1] = originals[i * 3 + 1] + Math.cos(t * 0.6) * 0.9
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={meshRef} geometry={geometry}>
            <pointsMaterial
                size={0.28}
                color="#7c3aed"
                transparent
                opacity={0.15}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    )
}

/* ─── Fixed full-screen canvas ───────────────────────────────────── */
import { useIsMobile } from '../hooks/useIsMobile'

/* ─── Fixed full-screen canvas ───────────────────────────────────── */
const ParticleBackground = () => {
    const isMobile = useIsMobile();
    if (isMobile) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 55 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Particles />
                <BokehBlobs />
            </Canvas>
        </div>
    )
}

export default ParticleBackground
