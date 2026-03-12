import React from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Feedback from './components/Feedback'
import MusicPlayer from './components/MusicPlayer'
import GlobalEffects from './components/GlobalEffects'

function App() {
  return (
    <Layout>
      <GlobalEffects />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Feedback />
      <Contact />
      <MusicPlayer />
    </Layout>
  )
}

export default App
