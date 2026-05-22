'use client';

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="text-xl font-bold tracking-tighter">
        ALANWOKO<span className="text-brand-primary">.</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
        {['About', 'Skills', 'Projects', 'CV', 'Contact'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="hover:text-brand-primary transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </motion.nav>
  )
}

export default Navbar
