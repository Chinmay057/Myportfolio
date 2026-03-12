import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './Section'
import { db } from '../lib/firebaseClient'
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore'
import { MessageSquare, Send, User, Mail, Star, ArrowRight } from 'lucide-react'

/* ── Interactive Star Picker ─────────────────────────────────── */
const StarPicker = ({ value, onChange }) => {
    const [hovered, setHovered] = useState(0)
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                    <Star
                        className={`h-6 w-6 transition-colors ${star <= (hovered || value)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-transparent text-neutral-600'
                            }`}
                    />
                </button>
            ))}
            {value > 0 && (
                <span className="ml-2 text-xs text-neutral-400">
                    {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][value]}
                </span>
            )}
        </div>
    )
}

/* ── Static Star Display ─────────────────────────────────────── */
const StarDisplay = ({ rating = 5 }) => (
    <div className="mb-3 flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
            <Star
                key={s}
                className={`h-3.5 w-3.5 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-neutral-700 text-neutral-700'}`}
            />
        ))}
        <span className="ml-1.5 text-xs text-neutral-500">{rating}.0</span>
    </div>
)

/* ── Animated Counter ────────────────────────────────────────── */
const Counter = ({ end, suffix = '' }) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        let start = 0
        const step = Math.ceil(end / 40)
        const timer = setInterval(() => {
            start += step
            if (start >= end) { setCount(end); clearInterval(timer) }
            else setCount(start)
        }, 30)
        return () => clearInterval(timer)
    }, [end])
    return <span>{count}{suffix}</span>
}

/* ── Main Component ──────────────────────────────────────────── */
const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const [form, setForm] = useState({ name: '', email: '', message: '', rating: 0 })
    const [status, setStatus] = useState('idle')
    const [loadingFeed, setLoadingFeed] = useState(true)

    const fetchFeedbacks = async () => {
        try {
            const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'))
            const snapshot = await getDocs(q)
            setFeedbacks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        } catch (e) {
            console.error('Failed to fetch feedbacks:', e)
        } finally {
            setLoadingFeed(false)
        }
    }

    useEffect(() => { fetchFeedbacks() }, [])

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name.trim() || !form.message.trim() || form.rating === 0) return
        setStatus('loading')
        try {
            await addDoc(collection(db, 'feedbacks'), {
                name: form.name.trim(),
                email: form.email.trim(),
                message: form.message.trim(),
                rating: form.rating,
                createdAt: serverTimestamp(),
            })
            setForm({ name: '', email: '', message: '', rating: 0 })
            setStatus('success')
            await fetchFeedbacks()
            setTimeout(() => setStatus('idle'), 3000)
        } catch (err) {
            console.error(err)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 3000)
        }
    }

    return (
        <Section id="feedback" className="border-b border-neutral-900 pb-24">

            {/* ── Header row — matches reference "Client Reviews" layout ── */}
            <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <motion.p
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-3 text-xs uppercase tracking-widest text-purple-400"
                    >
                        ✦ Design services
                    </motion.p>
                    <motion.h2
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-4 text-5xl font-thin tracking-tight lg:text-6xl"
                    >
                        Client <span className="font-semibold">Reviews</span>
                    </motion.h2>
                    <motion.p
                        whileInView={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="max-w-md text-sm text-neutral-500"
                    >
                        Real feedback from people who've worked with me or used my projects.
                        Leave yours below!
                    </motion.p>
                </div>

                {/* CTA buttons */}
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3"
                >
                    <a
                        href="#feedback-form"
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-600 px-5 py-2.5 text-sm text-neutral-300 hover:border-purple-500 hover:text-white transition-all"
                    >
                        Leave Feedback <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-neutral-700 px-5 py-2.5 text-sm text-neutral-300 hover:bg-white/10 transition-all"
                    >
                        See Projects
                    </a>
                </motion.div>
            </div>

            {/* ── Stats Bar ── */}
            <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 grid grid-cols-3 divide-x divide-neutral-800 rounded-2xl border border-neutral-800 bg-neutral-900/30"
            >
                {[
                    { end: 5, suffix: '+', label: 'Projects completed' },
                    { end: 3, suffix: '+', label: 'Technologies mastered' },
                    { end: 3, suffix: '+', label: 'Years of learning' },
                ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center py-8 px-4">
                        <span className="text-3xl font-thin text-white lg:text-4xl">
                            <Counter end={stat.end} suffix={stat.suffix} />
                        </span>
                        <span className="mt-1 text-xs text-neutral-500 text-center">{stat.label}</span>
                    </div>
                ))}
            </motion.div>

            {/* ── Feedback Form ── */}
            <motion.div
                id="feedback-form"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mx-auto mb-16 max-w-xl"
            >
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-purple-400" />
                        <h3 className="text-lg font-medium text-neutral-200">Leave Feedback</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                            <input
                                type="text" name="name" placeholder="Your Name *"
                                value={form.name} onChange={handleChange} required
                                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/60 py-3 pl-10 pr-4 text-sm text-neutral-200 placeholder-neutral-500 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                            <input
                                type="email" name="email" placeholder="Email (private, never shown)"
                                value={form.email} onChange={handleChange}
                                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/60 py-3 pl-10 pr-4 text-sm text-neutral-200 placeholder-neutral-500 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            />
                        </div>
                        <div className="rounded-lg border border-neutral-700 bg-neutral-800/60 px-4 py-3">
                            <p className="mb-2 text-xs text-neutral-500">Your Rating *</p>
                            <StarPicker value={form.rating} onChange={(r) => setForm((prev) => ({ ...prev, rating: r }))} />
                        </div>
                        <textarea
                            name="message" placeholder="Your feedback... *"
                            value={form.message} onChange={handleChange} required rows={4}
                            className="w-full resize-none rounded-lg border border-neutral-700 bg-neutral-800/60 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                        <motion.button
                            type="submit"
                            disabled={status === 'loading' || form.rating === 0}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-700 to-pink-700 px-6 py-3 text-sm font-medium text-white transition hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                        >
                            {status === 'loading' ? <span className="animate-pulse">Sending...</span> : <><Send className="h-4 w-4" /> Submit Feedback</>}
                        </motion.button>
                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center text-sm text-green-400">
                                    ✓ Thank you! Your feedback has been submitted.
                                </motion.p>
                            )}
                            {status === 'error' && (
                                <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center text-sm text-red-400">
                                    ✗ Something went wrong. Please try again.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </motion.div>

            {/* ── Cards Grid ── */}
            {loadingFeed ? (
                <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                </div>
            ) : feedbacks.length === 0 ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-neutral-500">
                    No reviews yet. Be the first to leave one!
                </motion.p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {feedbacks.map((fb, i) => (
                        <motion.div
                            key={fb.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-sm transition hover:border-purple-700/60"
                        >
                            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-600/10 blur-2xl transition group-hover:bg-purple-600/20" />
                            <StarDisplay rating={fb.rating ?? 5} />
                            <p className="mb-4 text-sm leading-relaxed text-neutral-300">
                                &ldquo;{fb.message}&rdquo;
                            </p>
                            <div className="flex items-center gap-3 border-t border-neutral-800 pt-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-xs font-bold uppercase text-white">
                                    {fb.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-200">{fb.name}</p>
                                    {fb.createdAt?.toDate && (
                                        <p className="text-xs text-neutral-500">
                                            {fb.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </Section>
    )
}

export default Feedback
