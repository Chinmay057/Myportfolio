import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, Code2 } from 'lucide-react'
import Section from './Section'

const CONTACTS = [
    {
        icon: Mail,
        label: 'Email',
        value: 'chinmayspatil057@gmail.com',
        href: 'mailto:chinmayspatil057@gmail.com',
        color: 'text-purple-400',
        border: 'hover:border-purple-500/60',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'linkedin.com/in/chinmay-patil-820451242',
        href: 'https://www.linkedin.com/in/chinmay-patil-820451242',
        color: 'text-sky-400',
        border: 'hover:border-sky-500/60',
    },
    {
        icon: Github,
        label: 'GitHub',
        value: 'github.com/Chinmay057',
        href: 'https://github.com/Chinmay057',
        color: 'text-neutral-300',
        border: 'hover:border-neutral-500/60',
    },
    {
        icon: Code2,
        label: 'LeetCode',
        value: 'leetcode.com/u/Chinmay0557',
        href: 'https://leetcode.com/u/Chinmay0557/',
        color: 'text-orange-400',
        border: 'hover:border-orange-500/60',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'VIT Bhopal, India',
        href: null,
        color: 'text-pink-400',
        border: 'hover:border-pink-500/60',
    },
]

const Contact = () => {
    return (
        <Section id="contact" className="border-b border-neutral-900 pb-24">
            {/* Label */}
            <motion.p
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-4 text-center text-xs uppercase tracking-widest text-purple-400"
            >
                ✦ Reach out
            </motion.p>

            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-4 text-center text-5xl font-thin tracking-tight"
            >
                Get In <span className="font-semibold">Touch</span>
            </motion.h2>

            <motion.p
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mx-auto mb-14 max-w-md text-center text-sm text-neutral-500"
            >
                Open to opportunities, collaborations, and interesting conversations.
                Drop me a message anytime!
            </motion.p>

            <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
                {CONTACTS.map((item, i) => {
                    const Icon = item.icon
                    const Wrapper = item.href ? 'a' : 'div'
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <Wrapper
                                href={item.href}
                                target={item.href?.startsWith('http') ? '_blank' : undefined}
                                rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className={`streaming-border flex items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 transition-all duration-200 ${item.border} ${item.href ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg' : ''}`}
                            >
                                <div className={`rounded-xl border border-neutral-800 bg-neutral-900 p-3 ${item.color}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500">{item.label}</p>
                                    <p className="text-sm font-medium text-neutral-200 break-all">{item.value}</p>
                                </div>
                            </Wrapper>
                        </motion.div>
                    )
                })}
            </div>
        </Section>
    )
}

export default Contact
