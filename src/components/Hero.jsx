import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800">
            Available for new projects
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
            Building Digital <br /> Excellence.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10">
            Senior Full-Stack Engineer specialized in high-performance web applications and premium digital experiences. 
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href="#projects"
              className="px-8 py-4 rounded-full bg-brand-primary text-white font-medium hover:bg-brand-primary/90 transition-all flex items-center group shadow-lg shadow-brand-primary/20"
            >
              View Projects
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact"
              className="px-8 py-4 rounded-full border border-slate-200 dark:border-slate-800 font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 flex justify-center pt-2"
      >
        <div className="w-1 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
      </motion.div>
    </section>
  )
}

export default Hero
