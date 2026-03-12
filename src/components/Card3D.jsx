import React, { useRef, useCallback } from 'react'

/**
 * Card3D – wraps children in a CSS perspective container.
 * On mouse-move: tilts up to maxTilt degrees on X and Y axes.
 * Renders a specular (glare) highlight that follows the cursor.
 *
 * Props:
 *   className  – extra classes for the outer wrapper
 *   maxTilt    – max tilt degrees (default 12)
 *   glareColor – CSS colour for the specular blob (default purple)
 */
const Card3D = ({ children, className = '', maxTilt = 12, glareColor = 'rgba(139,92,246,0.18)' }) => {
    const cardRef = useRef(null)
    const glareRef = useRef(null)
    const frameRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current)
        frameRef.current = requestAnimationFrame(() => {
            const card = cardRef.current
            if (!card) return
            const rect = card.getBoundingClientRect()
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2
            // Normalised -1 → +1
            const nx = (e.clientX - cx) / (rect.width / 2)
            const ny = (e.clientY - cy) / (rect.height / 2)
            const rotX = -ny * maxTilt
            const rotY = nx * maxTilt
            card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`
            card.style.transition = 'transform 0.08s linear'

            // Glare follows cursor
            if (glareRef.current) {
                const gx = ((e.clientX - rect.left) / rect.width) * 100
                const gy = ((e.clientY - rect.top) / rect.height) * 100
                glareRef.current.style.background =
                    `radial-gradient(circle at ${gx}% ${gy}%, ${glareColor} 0%, transparent 70%)`
                glareRef.current.style.opacity = '1'
            }
        })
    }, [maxTilt, glareColor])

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current
        if (!card) return
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
        if (glareRef.current) glareRef.current.style.opacity = '0'
    }, [])

    return (
        <div
            ref={cardRef}
            className={`glossy-hover relative will-change-transform ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {children}
            {/* Specular highlight overlay */}
            <div
                ref={glareRef}
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
                style={{ zIndex: 10 }}
            />
        </div>
    )
}

export default Card3D
