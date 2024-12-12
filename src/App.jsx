import React from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Party from './components/Party.jsx'
import Presale from './components/Presale.jsx'
import Roadmap from './components/Roadmap.jsx'
import Tokenomics from './components/Tokenomics.jsx'
import HowToBuy from './components/HowToBuy.jsx'
import Faq from './components/Faq.jsx'
import FeaturedIn from './components/FeaturedIn.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Header />
      <Hero />
      <About />
      <Party />
      <Presale />
      <Roadmap />
      <Tokenomics />
      <HowToBuy />
      <Faq />
      <FeaturedIn />
      <Footer />
    </main>
  )
}

export default App
