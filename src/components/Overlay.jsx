import React from 'react'
import { motion, useTransform } from 'framer-motion'

const Overlay = ({ scrollYProgress }) => {
  // ── Section 1: "Chinmay Patil" — visible at 0–20% scroll ──
  const s1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.22], [0, 1, 1, 0])
  const s1Y = useTransform(scrollYProgress, [0, 0.22], ['0%', '-15%'])

  // ── Section 2: "I build digital experiences" — visible at 25–50% ──
  const s2Opacity = useTransform(scrollYProgress, [0.22, 0.30, 0.42, 0.50], [0, 1, 1, 0])
  const s2Y = useTransform(scrollYProgress, [0.22, 0.50], ['8%', '-8%'])

  // ── Section 3: "Bridging design and engineering" — visible 55–80% ──
  const s3Opacity = useTransform(scrollYProgress, [0.50, 0.58, 0.70, 0.78], [0, 1, 1, 0])
  const s3Y = useTransform(scrollYProgress, [0.50, 0.78], ['8%', '-8%'])

  // ── Section 4: CTA / final — visible 82–100% ──
  const s4Opacity = useTransform(scrollYProgress, [0.78, 0.86, 0.95, 1], [0, 1, 1, 0.8])
  const s4Y = useTransform(scrollYProgress, [0.78, 1], ['10%', '-5%'])

  const textShadow = '0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)'

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {/* ── Section 1: Name & Title ──────────────────────── */}
      <motion.div
        style={{
          opacity: s1Opacity,
          y: s1Y,
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid rgba(168,139,250,0.3)',
            background: 'rgba(6,3,18,0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: 999,
            padding: '6px 18px',
            fontSize: '0.7rem',
            color: 'rgba(200,180,255,0.9)',
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#a78bfa',
              animation: 'pulse 2s infinite',
            }}
          />
          Available for opportunities
        </div>

        <p
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            color: 'rgba(168,139,250,0.6)',
            textTransform: 'uppercase',
            marginBottom: 16,
            textShadow,
          }}
        >
          ✦ Portfolio
        </p>

        <h1
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            fontWeight: 200,
            lineHeight: 1.05,
            color: 'rgba(240,237,255,0.95)',
            marginBottom: 16,
            textShadow,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Chinmay{' '}
          <span
            style={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f9a8d4, #c084fc, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 12px rgba(139,92,246,0.4))',
            }}
          >
            Patil
          </span>
        </h1>

        <div
          style={{
            height: 1.5,
            maxWidth: 180,
            width: '60%',
            margin: '0 auto 20px',
            background:
              'linear-gradient(to right, transparent, rgba(139,92,246,0.5), transparent)',
          }}
        />

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            fontWeight: 300,
            color: 'rgba(190,185,215,0.85)',
            textShadow,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.02em',
          }}
        >
          Creative Developer · Data Scientist
        </p>
      </motion.div>

      {/* ── Section 2: Left-aligned ──────────────────────── */}
      <motion.div
        style={{
          opacity: s2Opacity,
          y: s2Y,
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 8vw',
        }}
      >
        <p
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            color: 'rgba(168,139,250,0.55)',
            textTransform: 'uppercase',
            marginBottom: 14,
            textShadow,
          }}
        >
          What I do
        </p>
        <h2
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            fontWeight: 200,
            lineHeight: 1.1,
            color: 'rgba(240,237,255,0.92)',
            maxWidth: '600px',
            textShadow,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          I build{' '}
          <span
            style={{
              fontWeight: 600,
              background: 'linear-gradient(135deg, #67e8f9, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            digital
          </span>
          <br />
          experiences.
        </h2>
      </motion.div>

      {/* ── Section 3: Right-aligned ─────────────────────── */}
      <motion.div
        style={{
          opacity: s3Opacity,
          y: s3Y,
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: '0 8vw',
          textAlign: 'right',
        }}
      >
        <p
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            color: 'rgba(168,139,250,0.55)',
            textTransform: 'uppercase',
            marginBottom: 14,
            textShadow,
          }}
        >
          My approach
        </p>
        <h2
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            fontWeight: 200,
            lineHeight: 1.1,
            color: 'rgba(240,237,255,0.92)',
            maxWidth: '600px',
            textShadow,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Bridging{' '}
          <span
            style={{
              fontWeight: 600,
              background: 'linear-gradient(135deg, #f472b6, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            design
          </span>
          <br />& engineering.
        </h2>
      </motion.div>

      {/* ── Section 4: CTA ───────────────────────────────── */}
      <motion.div
        style={{
          opacity: s4Opacity,
          y: s4Y,
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
          pointerEvents: 'auto',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: 300,
            color: 'rgba(200,195,225,0.85)',
            marginBottom: 28,
            textShadow,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Let's build something remarkable together.
        </p>
        <a
          href="#projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
            color: '#fff',
            borderRadius: 999,
            padding: '14px 32px',
            fontSize: '0.9rem',
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow:
              '0 0 30px rgba(124,58,237,0.35), 0 4px 15px rgba(0,0,0,0.3)',
            fontFamily: "'Inter', sans-serif",
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'
            e.currentTarget.style.boxShadow =
              '0 0 40px rgba(124,58,237,0.5), 0 8px 25px rgba(0,0,0,0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none'
            e.currentTarget.style.boxShadow =
              '0 0 30px rgba(124,58,237,0.35), 0 4px 15px rgba(0,0,0,0.3)'
          }}
        >
          View My Work
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </a>
      </motion.div>
    </div>
  )
}

export default Overlay
