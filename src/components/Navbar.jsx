import React, { useState, useEffect } from 'react'
import { Linkedin, Github, Menu, X } from 'lucide-react'

const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-glass' : 'bg-transparent'}`}>
            <div className="flex items-center justify-between py-5">
                {/* Logo */}
                <a href="#" className="text-2xl font-bold tracking-tighter text-white">
                    C<span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">P</span>
                </a>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 font-medium"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3">
                    <a
                        href="https://www.linkedin.com/in/chinmay-patil-820451242"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href="https://github.com/Chinmay057"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href="#contact"
                        className="glossy-hover hidden md:inline-flex items-center gap-2 ml-2 rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:border-purple-500 hover:text-white transition-all"
                    >
                        Get in Touch
                    </a>
                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 text-neutral-400 hover:text-white"
                        onClick={() => setMenuOpen(o => !o)}
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-md">
                    {NAV_LINKS.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block px-6 py-3 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    )
}

export default Navbar
