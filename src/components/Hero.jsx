'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Upload } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import InlineEditable from './InlineEditable'
import { useRef } from 'react'

const Hero = () => {
  const { data, updateData, isAdmin } = usePortfolio();
  const fileInputRef = useRef(null);
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  if (!data) return null;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const updateHero = (field, value) => {
    const newData = { ...data, hero: { ...data.hero, [field]: value } };
    updateData(newData);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({ type: 'profile' })
    });
    const result = await response.json();
    updateHero('profileImage', result.url);
    alert('Profile photo updated successfully (Mock)');
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800"
          >
            <InlineEditable 
              value={data.hero.badge} 
              onSave={(val) => updateHero('badge', val)} 
            />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 leading-[1.1]"
          >
            <InlineEditable 
              value={data.hero.title} 
              onSave={(val) => updateHero('title', val)} 
              multiline
              component="span"
            />
            <br />
            <span className="text-brand-primary">
              <InlineEditable 
                value={data.hero.subtitle} 
                onSave={(val) => updateHero('subtitle', val)} 
                multiline
                component="span"
              />
            </span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-4 mt-8"
          >
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
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            perspective: "1200px",
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="hidden lg:flex justify-center"
        >
          <div 
            style={{
              transform: "translateZ(100px)",
              transformStyle: "preserve-3d",
            }}
            className="relative w-96 h-96 rounded-[64px] glass border border-white/20 dark:border-white/10 shadow-2xl flex items-center justify-center overflow-visible"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-[64px]" />
            
            <motion.div 
              animate={{ 
                rotate: 360,
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-56 h-56 rounded-full border border-dashed border-brand-primary/20 absolute"
            />

            <div 
              style={{
                transform: "translateZ(80px)",
              }}
              className={`absolute overflow-hidden rounded-full border-4 border-white/50 shadow-2xl ${isAdmin ? 'cursor-pointer group' : ''}`}
              onClick={() => isAdmin && fileInputRef.current?.click()}
            >
              {isAdmin && (
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              )}
              
              {data.hero.profileImage ? (
                <img 
                  src={data.hero.profileImage} 
                  alt="Profile" 
                  className="w-48 h-48 object-cover"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-brand-primary text-6xl font-bold text-white tracking-tighter">
                  AC<span className="opacity-50">.</span>
                </div>
              )}

              {isAdmin && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="text-white" size={32} />
                </div>
              )}
            </div>
            
            {/* Floating glass elements */}
            <motion.div 
              style={{
                transform: "translateZ(120px)",
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 -right-8 w-24 h-24 rounded-3xl glass border border-white/30 shadow-2xl"
            />
            <motion.div 
              style={{
                transform: "translateZ(60px)",
              }}
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 -left-12 w-20 h-20 rounded-full glass border border-white/30 shadow-2xl"
            />
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
