import React, { useEffect, useRef } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

/* ─────────────────────────────────────────────────────────────
   GlobalEffects
   Renders three layers of futuristic eye-candy that sit behind
   all content (z-index < 0 relative to layout):

   1. Canvas — drifting particles (purple, pink, cyan, white)
   2. CSS    — sweeping light beams across the viewport
   3. CSS    — pulsing ambient orbs that slowly drift

   Mobile: reduced to 30 particles, no shadowBlur, no beams/orbs
───────────────────────────────────────────────────────────── */
const NUM_PARTICLES = 120

const GlobalEffects = () => {
    const canvasRef = useRef(null)
    const rafRef = useRef(null)
    const mobile = useIsMobile()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = document.body.scrollHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Particle pool
        const COLORS = [
            'rgba(168,139,250,',  // purple
            'rgba(244,114,182,',  // pink
            'rgba(103,232,249,',  // cyan
            'rgba(255,255,255,',  // white sparkle
        ]
        const particles = Array.from({ length: NUM_PARTICLES }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.4,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random() * 0.5 + 0.15,
            alphaDir: Math.random() > 0.5 ? 1 : -1,
        }))

        const draw = () => {
            if (mobile) return // Stop loop entirely if mobile
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => {
                p.x += p.vx
                p.y += p.vy
                p.alpha += p.alphaDir * 0.003
                if (p.alpha > 0.65 || p.alpha < 0.08) p.alphaDir *= -1
                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`
                if (!mobile) {
                    ctx.shadowBlur = 6
                    ctx.shadowColor = `${p.color}0.4)`
                } else {
                    ctx.shadowBlur = 0
                }
                ctx.fill()
            })
            rafRef.current = requestAnimationFrame(draw)
        }
        if (!mobile) {
            draw()
        }

        return () => {
            window.removeEventListener('resize', resize)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [mobile])

    if (mobile) return null;

    return (
        <>
            {/* ── Particle canvas ── */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            {/* ── Flowing light beams — desktop only ── */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
                {/* Beam 1 — wide diagonal purple sweeper */}
                <div style={{
                    position: 'absolute',
                    top: '-30%', left: '-20%',
                    width: '60%', height: '200%',
                    background: 'linear-gradient(105deg, transparent 40%, rgba(124,58,237,0.07) 50%, rgba(139,92,246,0.04) 55%, transparent 65%)',
                    animation: 'beamSweep1 14s ease-in-out infinite',
                    transformOrigin: 'top left',
                }} />
                {/* Beam 2 — thin pink sweeper from right */}
                <div style={{
                    position: 'absolute',
                    top: '10%', right: '-30%',
                    width: '50%', height: '180%',
                    background: 'linear-gradient(260deg, transparent 40%, rgba(244,114,182,0.05) 50%, rgba(236,72,153,0.03) 55%, transparent 65%)',
                    animation: 'beamSweep2 18s ease-in-out infinite',
                    transformOrigin: 'top right',
                }} />
                {/* Beam 3 — cyan bottom sweeper */}
                <div style={{
                    position: 'absolute',
                    bottom: '-10%', left: '20%',
                    width: '70%', height: '60%',
                    background: 'linear-gradient(180deg, transparent 30%, rgba(103,232,249,0.04) 50%, transparent 70%)',
                    animation: 'beamSweep3 20s ease-in-out infinite',
                    transformOrigin: 'bottom center',
                }} />
            </div>

            {/* ── Ambient drifting orbs — desktop only ── */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <div style={{
                    position: 'absolute', width: 600, height: 600,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
                    top: '5%', left: '-10%',
                    animation: 'orbDrift1 22s ease-in-out infinite alternate',
                }} />
                <div style={{
                    position: 'absolute', width: 500, height: 500,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(236,72,153,0.09) 0%, transparent 70%)',
                    top: '40%', right: '-8%',
                    animation: 'orbDrift2 28s ease-in-out infinite alternate',
                }} />
                <div style={{
                    position: 'absolute', width: 400, height: 400,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(103,232,249,0.06) 0%, transparent 70%)',
                    bottom: '10%', left: '30%',
                    animation: 'orbDrift3 18s ease-in-out infinite alternate',
                }} />
            </div>

            <style>{`
                @keyframes beamSweep1 {
                    0%   { transform: translateX(-40%) rotate(-5deg); opacity: 0.6; }
                    50%  { transform: translateX(120%) rotate(2deg); opacity: 1; }
                    100% { transform: translateX(-40%) rotate(-5deg); opacity: 0.6; }
                }
                @keyframes beamSweep2 {
                    0%   { transform: translateX(30%) rotate(5deg); opacity: 0.5; }
                    50%  { transform: translateX(-120%) rotate(-3deg); opacity: 0.9; }
                    100% { transform: translateX(30%) rotate(5deg); opacity: 0.5; }
                }
                @keyframes beamSweep3 {
                    0%   { transform: translateY(20%) scaleX(0.8); opacity: 0.4; }
                    50%  { transform: translateY(-30%) scaleX(1.2); opacity: 0.8; }
                    100% { transform: translateY(20%) scaleX(0.8); opacity: 0.4; }
                }
                @keyframes orbDrift1 {
                    0%   { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(8vw, 6vh) scale(1.15); }
                }
                @keyframes orbDrift2 {
                    0%   { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(-6vw, -8vh) scale(1.2); }
                }
                @keyframes orbDrift3 {
                    0%   { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(-4vw, 5vh) scale(0.9); }
                }
            `}</style>
        </>
    )
}

export default GlobalEffects
