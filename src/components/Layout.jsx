import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ParticleBackground from './ParticleBackground'

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200 antialiased selection:bg-purple-500 selection:text-white relative">
            {/* 3D Particle background — fixed behind everything */}
            <ParticleBackground />

            {/* Original deep-space gradient still underneath */}
            <div className="fixed top-0 left-0 -z-10 h-full w-full">
                <div className="absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <Navbar />
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    )
}

export default Layout
