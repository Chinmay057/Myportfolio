import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Section from './Section'
import Card3D from './Card3D'

const PROJECTS = [
    {
        title: 'Skin Cancer Detection',
        description: 'A machine learning model to detect skin cancer from image data. Uses CNN-based classification with GradCAM heatmaps, lesion sizing via coin reference, risk stratification, and a FastAPI backend with React frontend.',
        techStack: ['Python', 'FastAPI', 'TensorFlow', 'Grad-CAM', 'React'],
        image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=1998&auto=format&fit=crop',
        link: '#',
        repo: 'https://github.com/Chinmay057',
    },
    {
        title: 'Steganography & Cryptography',
        description: 'A system to hide and encrypt data inside images using cryptographic techniques. Combines steganography principles with modern encryption methods to securely embed secret messages within image files.',
        techStack: ['Python', 'Cryptography', 'NumPy', 'PIL', 'Cyber Security'],
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
        link: '#',
        repo: 'https://github.com/Chinmay057',
    },
    {
        title: 'Portfolio Website',
        description: 'A personal portfolio with a 3D laptop hero animation, Firebase-powered feedback system, smooth Framer Motion transitions, 3D tilt card effects, and a fully responsive design.',
        techStack: ['React', 'Three.js', 'Framer Motion', 'Firebase'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        link: '#',
        repo: 'https://github.com/Chinmay057',
    },
]

const Projects = () => {
    return (
        <Section id="projects" className="border-b border-neutral-900 pb-24">
            {/* Label */}
            <motion.p
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="mb-4 text-center text-xs uppercase tracking-widest text-purple-400"
            >
                ✦ My work
            </motion.p>

            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="mb-4 text-center text-5xl font-thin tracking-tight"
            >
                Featured <span className="font-semibold">Projects</span>
            </motion.h2>

            <motion.p
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="mx-auto mb-16 max-w-xl text-center text-sm text-neutral-500"
            >
                A selection of projects that reflect my passion for building things people use.
            </motion.p>

            {/* 3D Tilt Cards */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {PROJECTS.map((project, i) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 40, rotateX: -10, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        style={{ perspective: 1200 }}
                    >
                        <Card3D
                            maxTilt={12}
                            glareColor="rgba(139,92,246,0.2)"
                            className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm transition-colors duration-300 hover:border-neutral-700 hover:shadow-2xl hover:shadow-purple-900/20"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />

                                {/* 3D floating badge */}
                                <div
                                    className="absolute top-3 right-3 rounded-full bg-purple-600/80 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    style={{ transform: 'translateZ(30px)' }}
                                >
                                    View Project ↗
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-6">
                                <h3
                                    className="mb-2 text-lg font-semibold text-neutral-100"
                                    style={{ transform: 'translateZ(18px)' }}
                                >
                                    {project.title}
                                </h3>
                                <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-500">{project.description}</p>

                                {/* Tech pills */}
                                <div className="mb-5 flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-0.5 text-xs text-purple-400"
                                            style={{ transform: 'translateZ(10px)' }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-4 border-t border-neutral-800 pt-4">
                                    <a
                                        href={project.link}
                                        className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                                    </a>
                                    <a
                                        href={project.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                                    >
                                        <Github className="h-3.5 w-3.5" /> GitHub
                                    </a>
                                </div>
                            </div>
                        </Card3D>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}

export default Projects
