import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════════
   Screen texture — "Meet Chinmay" preview shown on laptop
═══════════════════════════════════════════════════════════ */
function makeAboutScreenTexture() {
    const W = 1024, H = 640
    const c = document.createElement('canvas')
    c.width = W; c.height = H
    const ctx = c.getContext('2d')

    ctx.fillStyle = '#060610'
    ctx.fillRect(0, 0, W, H)

    ctx.strokeStyle = 'rgba(120,50,255,0.07)'
    ctx.lineWidth = 1
    for (let x = 0; x < W; x += 56) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
    for (let y = 0; y < H; y += 56) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

    const glow = ctx.createRadialGradient(W / 2, H / 4, 0, W / 2, H / 4, 400)
    glow.addColorStop(0, 'rgba(124,58,237,0.30)'); glow.addColorStop(1, 'transparent')
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H)

    const PAD = 68
    ctx.textBaseline = 'middle'

    ctx.font = '300 12px Arial'; ctx.fillStyle = 'rgba(168,139,250,0.6)'; ctx.textAlign = 'left'
    ctx.fillText('✦  A B O U T  M E', PAD, 62)

    ctx.font = '300 66px Arial'; ctx.fillStyle = 'rgba(225,220,245,0.92)'
    ctx.fillText('Meet ', PAD, 150)
    const meetW = ctx.measureText('Meet ').width

    const gName = ctx.createLinearGradient(PAD + meetW, 0, PAD + meetW + 320, 0)
    gName.addColorStop(0, '#f9a8d4'); gName.addColorStop(0.5, '#c084fc'); gName.addColorStop(1, '#818cf8')
    ctx.font = 'bold 66px Arial'; ctx.fillStyle = gName
    ctx.fillText('Chinmay', PAD + meetW, 150)

    ctx.strokeStyle = 'rgba(139,92,246,0.4)'; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(PAD, 184); ctx.lineTo(PAD + 360, 184); ctx.stroke()

    ctx.font = '300 15px Arial'; ctx.fillStyle = 'rgba(160,154,188,0.80)'
        ;[
            'Third-year engineering student — Data Science,',
            'Machine Learning and Quantitative Finance.',
            'Python · C++ · React · TensorFlow · SQL',
        ].forEach((ln, i) => ctx.fillText(ln, PAD, 220 + i * 28))

    ctx.font = '300 12.5px Arial'
    let px = PAD
        ;['Python', 'ML', 'React', 'TensorFlow', 'Finance'].forEach(pill => {
            const tw = ctx.measureText(pill).width + 22
            ctx.beginPath()
            if (ctx.roundRect) ctx.roundRect(px, 324, tw, 26, 13)
            else ctx.rect(px, 324, tw, 26)
            ctx.fillStyle = 'rgba(124,58,237,0.16)'; ctx.fill()
            ctx.strokeStyle = 'rgba(139,92,246,0.42)'; ctx.lineWidth = 1; ctx.stroke()
            ctx.fillStyle = 'rgba(200,185,255,0.88)'; ctx.textAlign = 'left'
            ctx.fillText(pill, px + 11, 337)
            px += tw + 9
        })

    const ax = W - 188, ay = H / 2 + 18
    const ag = ctx.createRadialGradient(ax, ay, 0, ax, ay, 112)
    ag.addColorStop(0, 'rgba(124,58,237,0.38)'); ag.addColorStop(0.65, 'rgba(80,20,200,0.16)'); ag.addColorStop(1, 'transparent')
    ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(ax, ay, 112, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = 'rgba(168,139,250,0.38)'; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(ax, ay, 110, 0, Math.PI * 2); ctx.stroke()
    ctx.font = 'bold 42px Arial'; ctx.fillStyle = 'rgba(200,180,255,0.5)'; ctx.textAlign = 'center'
    ctx.fillText('CP', ax, ay + 14)

    for (let i = 0; i < 4; i++) {
        ctx.beginPath(); ctx.arc(PAD + i * 15, H - 34, i === 0 ? 4 : 3, 0, Math.PI * 2)
        ctx.fillStyle = i === 0 ? 'rgba(168,139,250,0.9)' : 'rgba(168,139,250,0.2)'; ctx.fill()
    }

    return new THREE.CanvasTexture(c)
}

/* ═══════════════════════════════════════════════════════════
   Camera rig — zooms into screen during phase 2
═══════════════════════════════════════════════════════════ */
const CameraRig = ({ progressRef }) => {
    const { camera } = useThree()
    useFrame(() => {
        const p = progressRef.current
        const raw = Math.max(0, Math.min(1, (p - 0.45) / 0.55))
        const t = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2
        camera.position.z = THREE.MathUtils.lerp(5.5, 0.55, t)
        camera.position.y = THREE.MathUtils.lerp(1.0, 1.18, t)
        camera.fov = THREE.MathUtils.lerp(44, 52, t)
        camera.updateProjectionMatrix()
    })
    return null
}

/* ═══════════════════════════════════════════════════════════
   Laptop 3-D model
═══════════════════════════════════════════════════════════ */
const LaptopModel = ({ progressRef }) => {
    const rootRef = useRef()
    const screenGroupRef = useRef()
    const tex = useMemo(() => makeAboutScreenTexture(), [])

    const BW = 3.0, BD = 2.0, BH = 0.14
    const SW = 3.0, SH = 1.9, SD = 0.09
    const HINGE_Z = -BD / 2

    useFrame(() => {
        const p = progressRef.current
        if (!rootRef.current || !screenGroupRef.current) return

        // Phase 1 — lid opens (0 → 0.5)
        const lidP = Math.min(p / 0.5, 1)
        screenGroupRef.current.rotation.x = -Math.PI / 2 + lidP * (Math.PI / 2 + 0.35)

        // SINGLE 360° spin: completes exactly at scroll p=0.42, then holds at 0
        const spinP = Math.min(p / 0.42, 1)
        // Ease-in-out so it accelerates then decelerates before the zoom
        const spinEased = spinP < 0.5
            ? 2 * spinP * spinP
            : 1 - Math.pow(-2 * spinP + 2, 2) / 2
        rootRef.current.rotation.y = spinEased * Math.PI * 2

        // Gentle float (disappears when zoom kicks in)
        const zP = Math.max(0, (p - 0.45) / 0.55)
        const floatAmp = THREE.MathUtils.lerp(0.07, 0, zP)
        rootRef.current.position.y = Math.sin(Date.now() * 0.0009) * floatAmp

        rootRef.current.scale.setScalar(Math.min(p * 2.5 + 0.28, 1))
    })

    return (
        <group ref={rootRef}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[BW, BH, BD]} />
                <meshStandardMaterial color="#c8c8cc" metalness={0.92} roughness={0.08} />
            </mesh>
            <mesh position={[0, BH / 2 + 0.005, 0.04]}>
                <boxGeometry args={[BW - 0.14, 0.01, BD - 0.22]} />
                <meshStandardMaterial color="#1a1a22" metalness={0.6} roughness={0.2} />
            </mesh>
            <group ref={screenGroupRef} position={[0, BH / 2, HINGE_Z]}>
                {/* Lid shell */}
                <mesh position={[0, SH / 2, SD / 2]} castShadow>
                    <boxGeometry args={[SW, SH, SD]} />
                    <meshStandardMaterial color="#c8c8cc" metalness={0.92} roughness={0.08} />
                </mesh>
                {/* Bezel */}
                <mesh position={[0, SH / 2, SD + 0.001]}>
                    <boxGeometry args={[SW - 0.1, SH - 0.1, 0.01]} />
                    <meshStandardMaterial color="#0c0c18" metalness={0.5} roughness={0.3} />
                </mesh>
                {/* Display */}
                <mesh position={[0, SH / 2, SD + 0.012]}>
                    <boxGeometry args={[SW - 0.28, SH - 0.28, 0.005]} />
                    <meshStandardMaterial map={tex} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.55} />
                </mesh>
                <pointLight position={[0, SH / 2, SD + 0.55]} intensity={2.2} color="#7c3aed" distance={5} decay={2} />
            </group>
        </group>
    )
}

/* ═══════════════════════════════════════════════════════════
   Ambient particles (fade out during zoom)
═══════════════════════════════════════════════════════════ */
const SceneParticles = ({ progressRef }) => {
    const purpleRef = useRef()
    const pinkRef = useRef()
    const cyanRef = useRef()
    const COUNT = 300
    const HALF = Math.floor(COUNT / 3)

    const { geo1, geo2, geo3, orig1, orig2, orig3 } = useMemo(() => {
        const makeGeo = () => {
            const pos = new Float32Array(HALF * 3), o = new Float32Array(HALF * 3)
            for (let i = 0; i < HALF; i++) {
                const x = (Math.random() - 0.5) * 18
                const y = (Math.random() - 0.5) * 11
                const z = (Math.random() - 0.5) * 9 - 3
                pos[i * 3] = o[i * 3] = x
                pos[i * 3 + 1] = o[i * 3 + 1] = y
                pos[i * 3 + 2] = o[i * 3 + 2] = z
            }
            const g = new THREE.BufferGeometry()
            g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
            return { geo: g, orig: o }
        }
        const a = makeGeo(), b = makeGeo(), c = makeGeo()
        return { geo1: a.geo, orig1: a.orig, geo2: b.geo, orig2: b.orig, geo3: c.geo, orig3: c.orig }
    }, [])

    const t = useRef(0)
    useFrame((_, dt) => {
        t.current += dt
        const zP = Math.max(0, (progressRef.current - 0.45) / 0.55)
        const opacity = THREE.MathUtils.lerp(0.55, 0, zP)

        const animate = (ref, orig, phase) => {
            if (!ref.current) return
            ref.current.material.opacity = opacity
            const arr = ref.current.geometry.attributes.position.array
            for (let i = 0; i < HALF; i++) {
                const ti = t.current * 0.22 + i * 0.19 + phase
                arr[i * 3] = orig[i * 3] + Math.sin(ti) * 0.55
                arr[i * 3 + 1] = orig[i * 3 + 1] + Math.cos(ti * 0.65) * 0.42
            }
            ref.current.geometry.attributes.position.needsUpdate = true
        }
        animate(purpleRef, orig1, 0)
        animate(pinkRef, orig2, 2.1)
        animate(cyanRef, orig3, 4.3)
    })
    return (
        <>
            <points ref={purpleRef} geometry={geo1}>
                <pointsMaterial size={0.045} color="#a78bfa" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
            </points>
            <points ref={pinkRef} geometry={geo2}>
                <pointsMaterial size={0.035} color="#f472b6" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
            </points>
            <points ref={cyanRef} geometry={geo3}>
                <pointsMaterial size={0.028} color="#67e8f9" transparent opacity={0.30} sizeAttenuation depthWrite={false} />
            </points>
        </>
    )
}

/* ═══════════════════════════════════════════════════════════
   Main hero component
═══════════════════════════════════════════════════════════ */
const LaptopHero = () => {
    const sectionRef = useRef(null)
    const progressRef = useRef(0)
    const [scrollPct, setScrollPct] = useState(0)
    const [isDesktopContent, setIsDesktopContent] = useState(true)

    // Ensure we only mount WebGL on desktop sizes
    useEffect(() => {
        const checkWidth = () => setIsDesktopContent(window.innerWidth > 1024)
        checkWidth() // Trigger once on mount
        window.addEventListener('resize', checkWidth)
        return () => window.removeEventListener('resize', checkWidth)
    }, [])

    /* scroll tracker */
    useEffect(() => {
        if (!isDesktopContent) return // Don't track scrolling on mobile
        const onScroll = () => {
            if (!sectionRef.current) return
            const rect = sectionRef.current.getBoundingClientRect()
            const total = sectionRef.current.offsetHeight - window.innerHeight
            const p = Math.max(0, Math.min(1, -rect.top / total))
            progressRef.current = p
            setScrollPct(p)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [isDesktopContent])

    /* ── Portal animation values ─────────────────────────────────
       zoom phase: p goes 0.45 → 1.0
       portalT:    0 → 1 over that range (eased)
       
       The "screen" on the canvas sits roughly centred horizontally,
       vertically about 55 % up the viewport.
       We update the CSS rect to drive the portal clip.
    ─────────────────────────────────────────────────────────── */
    const raw = Math.max(0, Math.min(1, (scrollPct - 0.45) / 0.55))
    // ease-in-out quad
    const portalT = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2

    // The portal starts invisible (scale=0 from screen centre)
    // and grows to cover the whole viewport.
    // We use clip-path: inset() so it expands from the screen's location.

    // Approximate screen centre in viewport % (laptop screen is ~55% from top, centred)
    // These are tuned to match the 3D camera view
    const screenCX = 50  // % from left  (dead centre)
    const screenCY = 42  // % from top   (slightly above centre)

    // At portalT=0: very tight inset (screen-sized ~18vw × 12vh)
    // At portalT=1: zero inset (full viewport)
    // inset(top right bottom left)
    const iTop = THREE.MathUtils.lerp(screenCY, 0, portalT)
    const iBottom = THREE.MathUtils.lerp(100 - screenCY, 0, portalT)
    const iLeft = THREE.MathUtils.lerp(screenCX - 16, 0, portalT)
    const iRight = THREE.MathUtils.lerp(100 - (screenCX + 16), 0, portalT)

    // Round the clip corners – tight at start, 0 at end
    const iRadius = THREE.MathUtils.lerp(12, 0, portalT)

    // Portal content opacity: starts appearing at portalT > 0.25
    const portalContentOp = Math.max(0, Math.min(1, (portalT - 0.25) / 0.75))

    // Show the portal div only during the zoom phase
    const showPortal = scrollPct > 0.44

    const badgeOp = Math.max(0, 1 - scrollPct * 6)
    const hintOp = Math.max(0, 1 - scrollPct * 4)

    return (
        <section ref={sectionRef} id="hero" style={{ height: '240vh', position: 'relative' }}>

            {/* ── Sticky viewport ────────────────────────────────── */}
            <div style={{
                position: 'sticky', top: 0,
                height: '100vh', width: '100%',
                overflow: 'hidden',
            }}>
                {/* ambient top glow */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(120,50,255,0.2), transparent)',
                }} />

                {/* ── Three.js canvas ─────────────────────────────── */}
                {isDesktopContent && (
                    <Canvas
                        camera={{ position: [0, 1.0, 5.5], fov: 44 }}
                        dpr={[1, 1.5]}
                        gl={{ antialias: true, alpha: true }}
                        shadows
                        style={{ position: 'absolute', inset: 0 }}
                    >
                        <CameraRig progressRef={progressRef} />
                        <ambientLight intensity={0.45} />
                        <directionalLight position={[4, 8, 5]} intensity={1.4} castShadow />
                        <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#a78bfa" />
                        <pointLight position={[0, 6, 4]} intensity={0.7} color="#f472b6" distance={14} />
                        <SceneParticles progressRef={progressRef} />
                        <LaptopModel progressRef={progressRef} />
                    </Canvas>
                )}

                {/* ════════════════════════════════════════════════════
                    PORTAL EFFECT
                    ────────────────────────────────────────────────────
                    This div clips from the laptop-screen position and
                    grows outward to reveal the About content.  It lives
                    INSIDE the sticky viewport so it doesn't escape.
                ════════════════════════════════════════════════════ */}
                {showPortal && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 50,
                        // The CLIP — shrinks from screen rect → full viewport as portalT 0→1
                        clipPath: `inset(${iTop}% ${iRight}% ${iBottom}% ${iLeft}% round ${iRadius}px)`,
                        // Smooth clip transition on the animation frame level (scroll drives it)
                        transition: 'clip-path 0.05s linear',
                        background: '#060610',
                        overflow: 'hidden',
                        pointerEvents: portalT > 0.98 ? 'auto' : 'none',
                    }}>
                        {/* Background to match site */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `
                                radial-gradient(ellipse 80% 50% at 50% -5%, rgba(120,50,255,0.18), transparent),
                                #060610
                            `,
                        }} />

                        {/* Subtle grid lines inside the portal */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: `
                                linear-gradient(rgba(120,50,255,0.06) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(120,50,255,0.06) 1px, transparent 1px)
                            `,
                            backgroundSize: '56px 56px',
                        }} />

                        {/* ── The actual "Meet Chinmay" content ─────── */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            opacity: portalContentOp,
                            transition: 'opacity 0.08s linear',
                            padding: '5vh 6vw',
                        }}>
                            <div style={{ maxWidth: 960, width: '100%', display: 'flex', gap: '4vw', alignItems: 'center', flexWrap: 'wrap' }}>

                                {/* LEFT — text */}
                                <div style={{ flex: '1 1 340px', minWidth: 0 }}>
                                    <p style={{
                                        fontSize: '0.7rem', letterSpacing: '0.18em',
                                        color: 'rgba(168,139,250,0.65)', textTransform: 'uppercase',
                                        marginBottom: 16,
                                    }}>✦ About me</p>

                                    <h2 style={{
                                        fontSize: 'clamp(2.6rem,5vw,4rem)',
                                        fontWeight: 300,
                                        lineHeight: 1.1,
                                        color: 'rgba(225,220,245,0.95)',
                                        marginBottom: 20,
                                    }}>
                                        Meet{' '}
                                        <span style={{
                                            fontWeight: 700,
                                            background: 'linear-gradient(90deg,#f9a8d4,#c084fc,#818cf8)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}>Chinmay</span>
                                    </h2>

                                    <div style={{
                                        height: 1.5,
                                        background: 'linear-gradient(to right, rgba(139,92,246,0.5), transparent)',
                                        marginBottom: 20,
                                        maxWidth: 360,
                                    }} />

                                    <p style={{
                                        fontSize: '0.88rem', lineHeight: 1.75,
                                        color: 'rgba(155,150,185,0.88)',
                                        marginBottom: 12, maxWidth: 480,
                                    }}>
                                        Third-year engineering student with a strong interest in
                                        Data Science, Machine Learning, and Quantitative Finance.
                                        Passionate about the intersection of technology and markets.
                                    </p>
                                    <p style={{
                                        fontSize: '0.88rem', lineHeight: 1.75,
                                        color: 'rgba(155,150,185,0.88)',
                                        marginBottom: 22, maxWidth: 480,
                                    }}>
                                        Proficient in C++ and Python, solid DSA foundation, plus
                                        working knowledge of React, FastAPI, and TensorFlow.
                                    </p>

                                    {/* Skill pills */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                                        {['Python', 'C++', 'Data Science', 'Machine Learning', 'React', 'TensorFlow', 'Finance', 'SQL'].map(s => (
                                            <span key={s} style={{
                                                fontSize: '0.7rem', padding: '4px 13px',
                                                borderRadius: 999,
                                                border: '1px solid rgba(139,92,246,0.38)',
                                                background: 'rgba(124,58,237,0.1)',
                                                color: 'rgba(200,185,255,0.85)',
                                            }}>{s}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* RIGHT — avatar placeholder */}
                                <div style={{
                                    flex: '0 0 auto',
                                    width: 'clamp(180px,22vw,260px)',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
                                }}>
                                    {/* Avatar circle */}
                                    <div style={{
                                        width: 'clamp(160px,20vw,240px)',
                                        height: 'clamp(160px,20vw,240px)',
                                        borderRadius: '50%',
                                        background: 'radial-gradient(circle at 35% 35%, rgba(168,139,250,0.22), rgba(124,58,237,0.08))',
                                        border: '1.5px solid rgba(168,139,250,0.35)',
                                        boxShadow: '0 0 60px rgba(124,58,237,0.18)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 'clamp(2rem,5vw,3.2rem)',
                                        fontWeight: 700,
                                        color: 'rgba(200,180,255,0.55)',
                                    }}>CP</div>

                                    {/* Mini timeline */}
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {[
                                            { period: 'Currently', label: 'B.Tech Engineering Student' },
                                            { period: '2023-24', label: 'ML & Data Science Projects' },
                                            { period: '2022-23', label: 'Competitive Programming (C++)' },
                                        ].map((item, i) => (
                                            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                                <div style={{
                                                    marginTop: 4,
                                                    width: 8, height: 8, borderRadius: '50%',
                                                    background: '#8b5cf6', flexShrink: 0,
                                                    boxShadow: '0 0 6px rgba(139,92,246,0.6)',
                                                }} />
                                                <div>
                                                    <p style={{ fontSize: '0.65rem', color: 'rgba(120,114,155,0.8)', marginBottom: 2 }}>{item.period}</p>
                                                    <p style={{ fontSize: '0.78rem', color: 'rgba(190,185,215,0.9)' }}>{item.label}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Role badge ─────────────────────────────────── */}
                <div style={{
                    position: 'absolute', bottom: '11%', left: 0, right: 0,
                    display: 'flex', justifyContent: 'center',
                    opacity: badgeOp, transition: 'opacity 0.12s',
                    zIndex: 4, pointerEvents: 'none',
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        border: '1px solid rgba(168,139,250,0.28)',
                        background: 'rgba(6,3,18,0.75)',
                        borderRadius: 999, padding: '7px 18px',
                        fontSize: '0.71rem', color: 'rgba(200,180,255,0.9)',
                        backdropFilter: 'blur(12px)',
                    }}>
                        <span style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: '#a78bfa', flexShrink: 0,
                            animation: 'pulse 2s infinite',
                        }} />
                        Data Analyst &amp; Machine Engineer
                    </div>
                </div>

                {/* ── Scroll hint ───────────────────────────────────── */}
                <div style={{
                    position: 'absolute', bottom: 24, left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: hintOp, zIndex: 4, pointerEvents: 'none',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}>
                    <span style={{
                        fontSize: '0.58rem', letterSpacing: '0.15em',
                        color: 'rgba(168,139,250,0.38)', textTransform: 'uppercase',
                    }}>Scroll to enter</span>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
                        style={{ animation: 'bounce 1.4s ease-in-out infinite' }}>
                        <path d="M5 8l5 5 5-5" stroke="rgba(168,139,250,0.45)" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* ── Scroll progress bar ─────────────────────────── */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, height: 2, zIndex: 5,
                    width: `${scrollPct * 100}%`,
                    background: 'linear-gradient(to right, #7c3aed, #f472b6)',
                    transition: 'width 0.05s linear',
                }} />
            </div>
        </section>
    )
}

export default LaptopHero
