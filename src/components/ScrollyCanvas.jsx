import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Overlay from './Overlay'

const FRAME_COUNT = 45 // frames 00 → 44

/**
 * Build the URL for a given frame index.
 * Files live in public/sequence/ and are served at /sequence/...
 */
const frameUrl = (index) => {
  const padded = String(index).padStart(2, '0')
  return `/sequence/frame_${padded}_delay-0.066s.png`
}

const ScrollyCanvas = () => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentFrameRef = useRef(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // ── Framer Motion scroll tracking ────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1])

  // ── Preload all frames ───────────────────────────────────
  useEffect(() => {
    let mounted = true
    const images = []
    let loaded = 0

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = frameUrl(i)
      img.onload = () => {
        loaded++
        if (loaded === FRAME_COUNT && mounted) {
          setImagesLoaded(true)
        }
      }
      images.push(img)
    }

    imagesRef.current = images
    return () => { mounted = false }
  }, [])

  // ── Draw frame on canvas (object-fit: cover logic) ───────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = imagesRef.current[index]
    if (!img || !img.complete) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // "cover" math: scale so the image fully covers the canvas
    const scale = Math.max(cw / iw, ch / ih)
    const sw = iw * scale
    const sh = ih * scale
    const sx = (cw - sw) / 2
    const sy = (ch - sh) / 2

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, sx, sy, sw, sh)
  }, [])

  // ── Resize canvas to match viewport ──────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      drawFrame(currentFrameRef.current)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame, imagesLoaded])

  // ── Subscribe to scroll-driven frame index changes ───────
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const idx = Math.round(latest)
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx
      drawFrame(idx)
    }
  })

  // ── Draw first frame once images are ready ───────────────
  useEffect(() => {
    if (imagesLoaded) {
      drawFrame(0)
    }
  }, [imagesLoaded, drawFrame])

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        height: '500vh',
        position: 'relative',
        background: '#121212',
      }}
    >
      {/* ── Sticky viewport ───────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />

        {/* Subtle vignette overlay for depth */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 50%, rgba(0,0,0,0.5) 100%)',
            zIndex: 2,
          }}
        />

        {/* Text overlays */}
        <Overlay scrollYProgress={scrollYProgress} />

        {/* Scroll progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 2,
            width: '100%',
            zIndex: 20,
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(to right, #7c3aed, #f472b6)',
              transformOrigin: 'left',
            }}
          >
            {/* We'll animate this div with scroll */}
          </div>
        </div>

        {/* Loading indicator */}
        {!imagesLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#121212',
              zIndex: 50,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                border: '3px solid rgba(139,92,246,0.2)',
                borderTopColor: '#7c3aed',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
          </div>
        )}

        {/* Scroll hint at the bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            zIndex: 10,
            opacity: 0.6,
            animation: 'fadeOut 1s ease-out 3s forwards',
          }}
        >
          <span
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(200,180,255,0.6)',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Scroll to explore
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            style={{ animation: 'bounce 1.4s ease-in-out infinite' }}
          >
            <path
              d="M5 8l5 5 5-5"
              stroke="rgba(200,180,255,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default ScrollyCanvas
