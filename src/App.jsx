import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import CodingProfiles from './components/CodingProfiles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      <CustomCursor />
      
      <AnimatePresence>
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <CodingProfiles />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;