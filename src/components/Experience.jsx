import React from 'react'
import { motion } from 'framer-motion'
import Section from './Section'

const EXPERIENCES = [
    {
        year: 'Sep 2025 – Present',
        role: 'Photographer & Video Editor',
        company: 'FYI Club – VIT Bhopal',
        description: 'Capture and edit media for events and club activities. Responsible for creating visual content that documents club events and engages the college community.',
        technologies: ['Photography', 'Video Editing', 'Media Production'],
        color: '#a78bfa',
    },
    {
        year: '2024 – Present',
        role: 'Skin Cancer Detection System',
        company: 'Self-Directed Project',
        description: 'Built a machine learning model to detect skin cancer from image data. Implemented CNN-based classification with a FastAPI backend and React frontend.',
        technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'CNN'],
        color: '#f472b6',
    },
    {
        year: '2024 – Present',
        role: 'Steganography & Cryptography System',
        company: 'Self-Directed Project',
        description: 'Developed a system to hide and encrypt data inside images using cryptographic techniques, combining steganography principles with modern encryption methods.',
        technologies: ['Python', 'Cryptography', 'NumPy', 'PIL', 'Security'],
        color: '#34d399',
    },
    {
        year: '2024 – Present',
        role: 'Competitive Programming',
        company: 'LeetCode & Coding Platforms',
        description: 'Solved 50+ problems on LeetCode and 100+ problems across various coding platforms. Focused on Data Structures, Algorithms, and problem-solving using C++ and Python.',
        technologies: ['C++', 'Python', 'DSA', 'LeetCode', 'Competitive Programming'],
        color: '#60a5fa',
    },
]

const Experience = () => {
    return (
        <Section id="experience" className="border-b border-neutral-900 pb-24">
            {/* Label */}
            <motion.p
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-4 text-center text-xs uppercase tracking-widest text-purple-400"
            >
                ✦ Journey
            </motion.p>

            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 text-center text-5xl font-thin tracking-tight"
            >
                My <span className="font-semibold">Experience</span>
            </motion.h2>

            <div className="relative mx-auto max-w-3xl" style={{ perspective: '1000px' }}>
                {/* Vertical glowing line */}
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-purple-600/80 via-purple-600/30 to-transparent md:left-[130px]" />
                {/* Animated glow pulse on line */}
                <motion.div
                    className="absolute left-0 top-0 w-px md:left-[130px]"
                    style={{ background: 'linear-gradient(to bottom, #7c3aed, transparent)', height: '40%' }}
                    animate={{ top: ['0%', '60%', '0%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="space-y-12">
                    {EXPERIENCES.map((exp, i) => (
                        <div key={i} className="flex flex-col gap-4 md:flex-row md:gap-8">
                            {/* Year */}
                            <motion.div
                                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                initial={{ opacity: 0, x: -40, rotateY: -20 }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="relative md:w-32 flex-shrink-0"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Glowing timeline dot */}
                                <div
                                    className="absolute -left-1.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 md:-left-[140px]"
                                    style={{
                                        borderColor: exp.color,
                                        backgroundColor: '#030712',
                                        boxShadow: `0 0 10px ${exp.color}80, 0 0 20px ${exp.color}40`,
                                    }}
                                />
                                <p className="text-sm font-medium md:text-right" style={{ color: exp.color }}>{exp.year}</p>
                            </motion.div>

                            {/* Content card — 3D Z-axis entry */}
                            <motion.div
                                whileInView={{ opacity: 1, x: 0, rotateX: 0, z: 0 }}
                                initial={{ opacity: 0, x: 40, rotateX: 12 }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex-1 rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700 hover:shadow-2xl"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    willChange: 'transform',
                                }}
                                whileHover={{
                                    y: -4,
                                    boxShadow: `0 20px 40px ${exp.color}20`,
                                    borderColor: `${exp.color}50`,
                                }}
                            >
                                {/* Accent glow at top of card */}
                                <div
                                    className="pointer-events-none absolute top-0 left-0 h-px w-full rounded-t-2xl opacity-60"
                                    style={{ background: `linear-gradient(to right, transparent, ${exp.color}, transparent)` }}
                                />

                                <h3 className="mb-1 font-semibold text-neutral-100">
                                    {exp.role}
                                    <span className="ml-2 text-sm font-normal text-neutral-500">@ {exp.company}</span>
                                </h3>
                                <p className="mb-4 text-sm leading-relaxed text-neutral-500">{exp.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-neutral-800 bg-neutral-950 px-2.5 py-0.5 text-xs transition-colors hover:border-purple-600/50"
                                            style={{ color: exp.color }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default Experience
