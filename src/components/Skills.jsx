import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Code2, Database, TrendingUp, Globe, Eye } from 'lucide-react'
import Section from './Section'
import Card3D from './Card3D'

const SERVICES = [
    {
        icon: Brain,
        title: 'Machine Learning',
        description: 'Building predictive models using Python and Scikit-learn for real-world classification and regression tasks. Actively learning and applying ML concepts to practical problems.',
        color: 'text-purple-400',
        border: 'hover:border-purple-500/50',
        glow: 'rgba(139,92,246,0.22)',
    },
    {
        icon: TrendingUp,
        title: 'Data Analysis',
        description: 'Transforming raw data into insights using Pandas, NumPy, and Matplotlib. Skilled in Exploratory Data Analysis (EDA) to identify patterns and trends in datasets.',
        color: 'text-pink-400',
        border: 'hover:border-pink-500/50',
        glow: 'rgba(244,114,182,0.22)',
    },
    {
        icon: Code2,
        title: 'Competitive Programming',
        description: 'Solved 50+ problems on LeetCode and 100+ across coding platforms. Strong foundation in Data Structures & Algorithms using C++ and Python.',
        color: 'text-sky-400',
        border: 'hover:border-sky-500/50',
        glow: 'rgba(56,189,248,0.22)',
    },
    {
        icon: Eye,
        title: 'Computer Vision',
        description: 'Implementing CNN-based image classification models for real-world applications — including a Skin Cancer Detection system with GradCAM heatmaps.',
        color: 'text-green-400',
        border: 'hover:border-green-500/50',
        glow: 'rgba(74,222,128,0.22)',
    },
    {
        icon: Database,
        title: 'Cyber Security',
        description: 'Pursuing specialization in Cyber Security & Digital Forensics at VIT Bhopal. Applied cryptographic techniques in a Steganography & Cryptography project.',
        color: 'text-yellow-400',
        border: 'hover:border-yellow-500/50',
        glow: 'rgba(250,204,21,0.22)',
    },
    {
        icon: Globe,
        title: 'Finance & Investing',
        description: 'Personal passion for finance and investing — exploring financial markets, investment strategies, and the application of data analysis to financial decision-making.',
        color: 'text-orange-400',
        border: 'hover:border-orange-500/50',
        glow: 'rgba(251,146,60,0.22)',
    },
]

const Skills = () => {
    return (
        <Section id="skills" className="border-b border-neutral-900 pb-24">
            {/* Label */}
            <motion.p
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-4 text-center text-xs uppercase tracking-widest text-purple-400"
            >
                ✦ What I do
            </motion.p>

            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-4 text-center text-5xl font-thin tracking-tight"
            >
                Skills &amp; <span className="font-semibold">Expertise</span>
            </motion.h2>

            <motion.p
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mx-auto mb-16 max-w-xl text-center text-sm text-neutral-500"
            >
                Building intelligent, data-driven systems that solve real-world problems.
            </motion.p>

            {/* 3D Tilt Card grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.map((service, i) => {
                    const Icon = service.icon
                    return (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 40, rotateX: -15 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            style={{ perspective: 1200 }}
                        >
                            <Card3D
                                maxTilt={14}
                                glareColor={service.glow}
                                className={`group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-colors duration-300 ${service.border}`}
                            >
                                {/* Glow blob */}
                                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-purple-600/10 blur-2xl transition group-hover:bg-purple-600/22" />

                                {/* 3D-lifted icon box */}
                                <div
                                    className={`mb-4 inline-flex rounded-xl border border-neutral-800 bg-neutral-900 p-3 ${service.color} transition-transform duration-200 group-hover:scale-110`}
                                    style={{ transform: 'translateZ(24px)' }}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3
                                    className="mb-2 text-base font-semibold text-neutral-100"
                                    style={{ transform: 'translateZ(16px)' }}
                                >
                                    {service.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed text-neutral-500"
                                    style={{ transform: 'translateZ(8px)' }}
                                >
                                    {service.description}
                                </p>
                            </Card3D>
                        </motion.div>
                    )
                })}
            </div>
        </Section>
    )
}

export default Skills
