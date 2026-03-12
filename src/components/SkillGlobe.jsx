import React, { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Skill data ─────────────────────────────────────────────────── */
const SKILLS = [
    { id: 'ml', label: 'ML', color: '#a78bfa' },
    { id: 'trading', label: 'Trading', color: '#f472b6' },
    { id: 'maths', label: 'Maths', color: '#60a5fa' },
    { id: 'dsa', label: 'DSA/C++', color: '#34d399' },
    { id: 'analytics', label: 'Analytics', color: '#fbbf24' },
    { id: 'finance', label: 'Finance', color: '#fb923c' },
    { id: 'database', label: 'Databases', color: '#22d3ee' },
    { id: 'backend', label: 'Backend', color: '#a3e635' },
    { id: 'dl', label: 'Deep Learn', color: '#e879f9' },
    { id: 'stats', label: 'Statistics', color: '#f87171' },
    { id: 'python', label: 'Python', color: '#4ade80' },
    { id: 'viz', label: 'Data Viz', color: '#f97316' },
]

/* ─── Fibonacci sphere distribution ─────────────────────────────── */
function fibonacciSphere(n, radius) {
    const phi = Math.PI * (3 - Math.sqrt(5))
    return Array.from({ length: n }, (_, i) => {
        const y = 1 - (i / (n - 1)) * 2
        const r = Math.sqrt(Math.max(0, 1 - y * y))
        const theta = phi * i
        return new THREE.Vector3(
            radius * r * Math.cos(theta),
            radius * y,
            radius * r * Math.sin(theta)
        )
    })
}

/* ─── Skill node: glowing dot ────────────────────────────────────── */
const SkillDot = ({ position, color, index }) => {
    const meshRef = useRef()
    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime * 0.8 + index * 0.52
        meshRef.current.position.set(
            position.x + Math.sin(t) * 0.06,
            position.y + Math.cos(t * 0.7) * 0.06,
            position.z + Math.sin(t * 0.5) * 0.04
        )
    })
    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.8}
                roughness={0.1}
                metalness={0.5}
            />
        </mesh>
    )
}

/* ─── Skill label rendered as canvas sprite ─────────────────────── */
const SkillLabel = ({ position, label, color, index }) => {
    const spriteRef = useRef()

    // Create texture from canvas
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 256
        canvas.height = 64
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, 256, 64)
        ctx.font = 'bold 28px Arial'
        ctx.fillStyle = color
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(label, 128, 32)
        const tex = new THREE.CanvasTexture(canvas)
        return tex
    }, [label, color])

    useFrame((state) => {
        if (!spriteRef.current) return
        const t = state.clock.elapsedTime * 0.8 + index * 0.52
        spriteRef.current.position.set(
            position.x + Math.sin(t) * 0.06,
            position.y + 0.2 + Math.cos(t * 0.7) * 0.06,
            position.z + Math.sin(t * 0.5) * 0.04
        )
    })

    return (
        <sprite ref={spriteRef} scale={[0.9, 0.22, 1]}>
            <spriteMaterial map={texture} transparent depthWrite={false} />
        </sprite>
    )
}

/* ─── Wire lines from centre to each node ───────────────────────── */
const ConnectionLines = ({ positions }) => {
    const geometry = useMemo(() => {
        const verts = []
        positions.forEach(p => {
            verts.push(0, 0, 0, p.x, p.y, p.z)
        })
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3))
        return geo
    }, [positions])

    return (
        <lineSegments geometry={geometry}>
            <lineBasicMaterial color="#7c3aed" transparent opacity={0.15} />
        </lineSegments>
    )
}

/* ─── Inner distorted core sphere ────────────────────────────────── */
const CoreSphere = () => {
    const meshRef = useRef()
    useFrame((state) => {
        if (!meshRef.current) return
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
    })
    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[0.42, 3]} />
            <meshStandardMaterial
                color="#7c3aed"
                emissive="#4c1d95"
                emissiveIntensity={0.9}
                roughness={0.2}
                metalness={0.7}
                wireframe={false}
            />
        </mesh>
    )
}

/* ─── Drag-to-rotate group ───────────────────────────────────────── */
const GlobeScene = () => {
    const groupRef = useRef()
    const isDragging = useRef(false)
    const lastMouse = useRef({ x: 0, y: 0 })
    const velocity = useRef({ x: 0, y: 0 })
    const { gl } = useThree()

    const positions = useMemo(() => fibonacciSphere(SKILLS.length, 1.85), [])

    useFrame((_, delta) => {
        if (!groupRef.current) return
        if (!isDragging.current) {
            groupRef.current.rotation.y += delta * 0.2
        }
        // Momentum decay
        velocity.current.x *= 0.88
        velocity.current.y *= 0.88
        if (!isDragging.current) {
            groupRef.current.rotation.x += velocity.current.x
            groupRef.current.rotation.y += velocity.current.y
        }
    })

    const onPointerDown = useCallback((e) => {
        isDragging.current = true
        lastMouse.current = { x: e.clientX, y: e.clientY }
        velocity.current = { x: 0, y: 0 }
        gl.domElement.style.cursor = 'grabbing'
    }, [gl])

    const onPointerMove = useCallback((e) => {
        if (!isDragging.current || !groupRef.current) return
        const dx = e.clientX - lastMouse.current.x
        const dy = e.clientY - lastMouse.current.y
        groupRef.current.rotation.y += dx * 0.008
        groupRef.current.rotation.x += dy * 0.008
        velocity.current = { x: dy * 0.004, y: dx * 0.004 }
        lastMouse.current = { x: e.clientX, y: e.clientY }
    }, [])

    const onPointerUp = useCallback(() => {
        isDragging.current = false
        gl.domElement.style.cursor = 'grab'
    }, [gl])

    return (
        <>
            <ambientLight intensity={0.7} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#a78bfa" />
            <pointLight position={[-5, -3, -5]} intensity={0.9} color="#f472b6" />

            {/* Invisible hit zone for drag */}
            <mesh
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
            >
                <sphereGeometry args={[2.8, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            <group ref={groupRef}>
                <CoreSphere />
                <ConnectionLines positions={positions} />
                {SKILLS.map((skill, i) => (
                    <React.Fragment key={skill.id}>
                        <SkillDot position={positions[i]} color={skill.color} index={i} />
                        <SkillLabel position={positions[i]} label={skill.label} color={skill.color} index={i} />
                    </React.Fragment>
                ))}
            </group>
        </>
    )
}

/* ─── Exported wrapper ───────────────────────────────────────────── */
const SkillGlobe = () => (
    <div style={{ width: '100%', height: '520px', cursor: 'grab', userSelect: 'none' }}>
        <Canvas
            camera={{ position: [0, 0, 5.5], fov: 48 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
        >
            <GlobeScene />
        </Canvas>
        <p style={{
            textAlign: 'center',
            fontSize: '0.68rem',
            color: 'rgba(168,139,250,0.45)',
            marginTop: '-10px',
            userSelect: 'none',
            letterSpacing: '0.08em',
        }}>
            drag to rotate
        </p>
    </div>
)

export default SkillGlobe
