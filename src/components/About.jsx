import React, { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'

const SKILLS = [
    'Python', 'C++', 'Data Analysis', 'Data Science', 'Machine Learning',
    'Pandas', 'EDA', 'Data Structures & Algorithms',
    'Problem Solving', 'Competitive Programming', 'Finance & Investing',
    'Cyber Security', 'Digital Forensics',
]

const TIMELINE = [
    { period: 'Currently', label: 'B.Tech CS (Cyber Security & Digital Forensics) @ VIT Bhopal' },
    { period: '2024 – Present', label: 'ML & Data Science Projects' },
    { period: '2022 – 2024', label: 'Mastermind Global School (CBSE Class 11 & 12)' },
]

const fadeLeft = (delay) => ({
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, delay } },
})

const fadeRight = (delay) => ({
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, delay } },
})

/* ─── 3D tilt on profile image ────────────────────────────────── */
const ProfileCard3D = ({ children }) => {
    const cardRef = useRef(null)
    const frameRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current)
        frameRef.current = requestAnimationFrame(() => {
            const card = cardRef.current
            if (!card) return
            const rect = card.getBoundingClientRect()
            const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
            const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
            card.style.transform = `perspective(800px) rotateY(${nx * 14}deg) rotateX(${-ny * 14}deg) translateZ(12px)`
            card.style.transition = 'transform 0.08s linear'
        })
    }, [])

    const handleMouseLeave = useCallback(() => {
        if (cardRef.current) {
            cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
            cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
        }
    }, [])

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    )
}

const About = () => {
    return (
        <Section id="about" className="border-b border-neutral-900 pb-24">
            {/* Section label */}
            <motion.p
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-4 text-center text-xs uppercase tracking-widest text-purple-400"
            >
                ✦ About me
            </motion.p>

            <div className="flex flex-wrap items-start gap-16 lg:gap-8">
                {/* LEFT — Text content */}
                <div className="w-full lg:w-1/2">
                    <motion.h2
                        variants={fadeLeft(0.1)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mb-6 text-5xl font-thin tracking-tight lg:text-6xl"
                    >
                        Meet{' '}
                        <span className="font-semibold bg-gradient-to-r from-pink-300 via-slate-400 to-purple-500 bg-clip-text text-transparent">
                            Chinmay
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={fadeLeft(0.2)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mb-4 max-w-lg text-sm leading-relaxed text-neutral-400"
                    >
                        Third-year Computer Science student at VIT Bhopal specializing in Cyber Security
                        and Digital Forensics. Passionate about data science, machine learning, and problem
                        solving — exploring the intersection of technology and intelligent systems.
                    </motion.p>

                    <motion.p
                        variants={fadeLeft(0.3)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mb-8 max-w-lg text-sm leading-relaxed text-neutral-400"
                    >
                        Experienced in Python, C++, and data analysis using Pandas. Actively improving
                        algorithmic thinking through competitive programming and exploring personal
                        interests in Finance & Investing.
                    </motion.p>

                    {/* Skill pills */}
                    <motion.div
                        variants={fadeLeft(0.4)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2"
                    >
                        {SKILLS.map((skill) => (
                            <span
                                key={skill}
                                className="skill-pill rounded-full border border-neutral-700/60 bg-neutral-900/50 px-3 py-1 text-xs text-neutral-300 hover:border-purple-500/60 hover:text-white transition-all duration-200 cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* RIGHT — 3D Photo + Timeline */}
                <div className="w-full lg:w-5/12">
                    <motion.div
                        variants={fadeRight(0.15)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative mb-8"
                    >
                        <ProfileCard3D>
                            {/* Outer glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-500/20 blur-2xl" />
                            <div
                                className="absolute inset-0 rounded-2xl border-2 border-purple-500/30"
                                style={{ boxShadow: '0 0 40px rgba(124,58,237,0.3), inset 0 0 30px rgba(124,58,237,0.1)', transform: 'translateZ(-6px)' }}
                            />
                            {/* Avatar card */}
                            <div
                                className="relative w-full max-w-sm mx-auto rounded-2xl border border-neutral-800/60 shadow-xl overflow-hidden"
                                style={{ height: 320, background: 'linear-gradient(135deg,#0d0d1a 0%,#120822 50%,#0a0a18 100%)', transform: 'translateZ(10px)' }}
                            >
                                {/* Animated ring */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        style={{
                                            width: 160, height: 160, borderRadius: '50%',
                                            background: 'radial-gradient(circle at 35% 35%, rgba(168,139,250,0.18), rgba(124,58,237,0.06))',
                                            border: '1.5px solid rgba(168,139,250,0.4)',
                                            boxShadow: '0 0 60px rgba(124,58,237,0.3)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '3.5rem', fontWeight: 700,
                                            color: 'rgba(200,180,255,0.7)',
                                        }}
                                    >CP</div>
                                </div>
                                {/* Code snippet decorations */}
                                <div className="absolute bottom-6 left-5 right-5 space-y-1.5">
                                    {['Python · C++ · Machine Learning', 'Cyber Security | VIT Bhopal', 'Finance & Investing 📈'].map((line, i) => (
                                        <div key={i} style={{ fontSize: '0.65rem', color: 'rgba(168,139,250,0.6)', fontFamily: 'monospace', letterSpacing: '0.03em' }}>
                                            <span style={{ color: 'rgba(244,114,182,0.6)' }}>›</span> {line}
                                        </div>
                                    ))}
                                </div>
                                {/* shimmer shine */}
                                <div className="pointer-events-none absolute top-0 left-0 h-1/3 w-full rounded-t-2xl opacity-20"
                                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)' }} />
                            </div>
                        </ProfileCard3D>
                    </motion.div>

                    {/* Mini timeline */}
                    <motion.div
                        variants={fadeRight(0.3)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {TIMELINE.map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-start gap-4 cursor-default"
                                whileHover={{ x: 6 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-500 flex-shrink-0"
                                    style={{ boxShadow: '0 0 8px rgba(139,92,246,0.6)' }} />
                                <div>
                                    <p className="text-xs text-neutral-500">{item.period}</p>
                                    <p className="text-sm font-medium text-neutral-300">{item.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </Section>
    )
}

export default About
