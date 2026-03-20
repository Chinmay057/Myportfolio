import React from 'react'
import ScrollyCanvas from './ScrollyCanvas'

/* ══ Hero ══════════════════════════════════════════════════════════
   On mobile: lightweight CSS-only hero (no WebGL / Three.js).
   On desktop: full scroll-driven 3D laptop animation.
════════════════════════════════════════════════════════════════════ */

const MobileHero = () => (
    <section id="hero" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
    }}>
        {/* Ambient glow */}
        <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(120,50,255,0.18), transparent)',
        }} />

        {/* Status badge */}
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(168,139,250,0.28)',
            background: 'rgba(6,3,18,0.75)',
            borderRadius: 999, padding: '6px 16px',
            fontSize: '0.7rem', color: 'rgba(200,180,255,0.9)',
            marginBottom: 32,
        }}>
            <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#a78bfa', flexShrink: 0,
                animation: 'pulse 2s infinite',
            }} />
            Available for opportunities
        </div>

        {/* Heading */}
        <p style={{
            fontSize: '0.7rem', letterSpacing: '0.18em',
            color: 'rgba(168,139,250,0.65)', textTransform: 'uppercase',
            marginBottom: 16,
        }}>✦ Portfolio</p>

        <h1 style={{
            fontSize: 'clamp(2.4rem, 10vw, 4rem)',
            fontWeight: 300, lineHeight: 1.1,
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
        </h1>

        <div style={{
            height: 1.5, maxWidth: 200, width: '100%', margin: '0 auto 20px',
            background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.5), transparent)',
        }} />

        <p style={{
            fontSize: '0.92rem', lineHeight: 1.75,
            color: 'rgba(155,150,185,0.88)',
            maxWidth: 340, marginBottom: 32,
        }}>
            Third-year engineering student focused on Data Science,
            Machine Learning &amp; Quantitative Finance.
        </p>

        {/* Skill pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 40 }}>
            {['Python', 'C++', 'React', 'ML', 'TensorFlow', 'SQL'].map(s => (
                <span key={s} style={{
                    fontSize: '0.7rem', padding: '5px 14px',
                    borderRadius: 999,
                    border: '1px solid rgba(139,92,246,0.38)',
                    background: 'rgba(124,58,237,0.1)',
                    color: 'rgba(200,185,255,0.85)',
                }}>{s}</span>
            ))}
        </div>

        {/* CTA */}
        <a href="#projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
            color: '#fff', borderRadius: 999,
            padding: '12px 28px', fontSize: '0.85rem', fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 0 24px rgba(124,58,237,0.3)',
        }}>
            View My Work ↓
        </a>

        {/* Scroll hint */}
        <div style={{
            position: 'absolute', bottom: 24, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            opacity: 0.5,
        }}>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.15em', color: 'rgba(168,139,250,0.6)', textTransform: 'uppercase' }}>
                Scroll
            </span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
                style={{ animation: 'bounce 1.4s ease-in-out infinite' }}>
                <path d="M5 8l5 5 5-5" stroke="rgba(168,139,250,0.6)" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    </section>
)

const Hero = () => {
    return (
        <>
            <div className="mobile-hero-wrapper">
                <MobileHero />
            </div>
            <div className="laptop-hero-wrapper">
                <ScrollyCanvas />
            </div>
        </>
    )
}

export default Hero
