import React, { useEffect, useRef, useState } from 'react'

const MusicPlayer = () => {
    const audioRef = useRef(null)
    // Start as true — audio.muted is also true initially, so UI matches reality
    const [muted, setMuted] = useState(true)
    const [started, setStarted] = useState(false)
    const userChangedRef = useRef(false) // tracks if user manually toggled

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        audio.volume = 0.35
        audio.loop = true
        audio.muted = true  // muted autoplay — browsers allow this

        const removeListeners = () => {
            window.removeEventListener('click', unlock)
            window.removeEventListener('scroll', unlock)
            window.removeEventListener('keydown', unlock)
            window.removeEventListener('touchstart', unlock)
        }

        const unlock = () => {
            // Only auto-unmute if the user has NOT manually changed the button
            if (!userChangedRef.current) {
                audio.muted = false
                setMuted(false)
            }
            removeListeners()
        }

        audio.play()
            .then(() => {
                setStarted(true)
                // Auto-unmute on first real interaction
                window.addEventListener('click', unlock)
                window.addEventListener('scroll', unlock, { passive: true })
                window.addEventListener('keydown', unlock)
                window.addEventListener('touchstart', unlock)
            })
            .catch(() => {
                // If even muted autoplay fails, try on click
                const startOnClick = () => {
                    audio.muted = false
                    audio.play().then(() => { setStarted(true); setMuted(false) }).catch(() => {})
                    window.removeEventListener('click', startOnClick)
                }
                window.addEventListener('click', startOnClick)
            })

        return () => removeListeners()
    }, [])

    const toggle = () => {
        const audio = audioRef.current
        if (!audio) return
        userChangedRef.current = true  // user explicitly chose — don't auto-override
        audio.muted = !muted
        setMuted(m => !m)
    }

    return (
        <>
            <audio ref={audioRef} src="/websitemusic.mp3" preload="auto" />
            <button
                onClick={toggle}
                title={muted ? 'Unmute music' : 'Mute music'}
                style={{
                    position: 'fixed',
                    bottom: 28,
                    right: 28,
                    zIndex: 9999,
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    border: '1px solid rgba(139,92,246,0.5)',
                    background: 'rgba(10,6,25,0.8)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    boxShadow: muted
                        ? '0 0 0 transparent'
                        : '0 0 20px rgba(139,92,246,0.5), 0 0 50px rgba(139,92,246,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                    outline: 'none',
                }}
            >
                {!muted && started && (
                    <>
                        <span style={{
                            position: 'absolute', inset: -4, borderRadius: '50%',
                            border: '1.5px solid rgba(139,92,246,0.45)',
                            animation: 'musicPulse 2s ease-in-out infinite',
                            pointerEvents: 'none',
                        }} />
                        <span style={{
                            position: 'absolute', inset: -10, borderRadius: '50%',
                            border: '1px solid rgba(139,92,246,0.2)',
                            animation: 'musicPulse 2s ease-in-out infinite 0.5s',
                            pointerEvents: 'none',
                        }} />
                    </>
                )}
                {muted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="rgba(168,139,250,0.55)" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="rgba(168,139,250,0.95)" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                )}
            </button>
            <style>{`
                @keyframes musicPulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50%       { transform: scale(1.3); opacity: 0; }
                }
            `}</style>
        </>
    )
}

export default MusicPlayer
