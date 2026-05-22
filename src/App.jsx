import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Github, Linkedin, Mail, ArrowRight, ExternalLink, Code, Server, Wrench, Cloud } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import CV from './components/CV'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { isAdmin, enableAdmin, disableAdmin } from './utils/admin'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    let ctrlAPressed = false;

    const handleKeyDown = (e) => {
      // Check for Ctrl + A
      if (e.ctrlKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        ctrlAPressed = true;
      } 
      // If Ctrl + A was pressed, wait for C
      else if (ctrlAPressed && e.key.toLowerCase() === 'c') {
        ctrlAPressed = false;
        const code = prompt('Enter Admin Code:');
        if (code === 'Kamal.08032001') {
          enableAdmin();
        }
      } 
      // Reset if any other key is pressed
      else {
        ctrlAPressed = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-black text-slate-900 dark:text-slate-100">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CV />
        <Contact />
      </main>
      <Footer />

      {isAdmin() && (
        <button
          onClick={disableAdmin}
          className="fixed bottom-4 right-4 z-[100] px-4 py-2 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 transition-colors font-bold text-sm"
        >
          Disable Admin Mode
        </button>
      )}
    </div>
  )
}

export default App
