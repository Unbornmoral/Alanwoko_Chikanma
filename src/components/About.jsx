'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import InlineEditable from './InlineEditable'
import { Upload } from 'lucide-react'

const About = () => {
  const { data, updateData, isAdmin } = usePortfolio();
  const containerRef = useRef(null)
  const fileInputRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  if (!data) return null;

  const updateAbout = (field, value) => {
    updateData({ ...data, about: { ...data.about, [field]: value } });
  };

  const updateHero = (field, value) => {
    updateData({ ...data, hero: { ...data.hero, [field]: value } });
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

  const updateChapter = (index, field, value) => {
    const newChapters = [...data.about.chapters];
    newChapters[index] = { ...newChapters[index], [field]: value };
    updateData({ ...data, about: { ...data.about, chapters: newChapters } });
  };

  return (
    <section id="about" ref={containerRef} className="py-32 relative bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24 flex flex-col md:flex-row gap-12 items-center md:items-start"
          >
            <div 
              className={`relative flex-shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-xl ${isAdmin ? 'cursor-pointer group' : ''}`}
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
              <img 
                src={data.hero.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
              {isAdmin && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="text-white" size={32} />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4">
                <InlineEditable 
                  value={data.about.title} 
                  onSave={(val) => updateAbout('title', val)} 
                  component="span"
                />
              </h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium">
                <InlineEditable 
                  value={data.about.subtitle} 
                  onSave={(val) => updateAbout('subtitle', val)} 
                  component="span"
                />
              </p>
            </div>
          </motion.div>

          <div className="relative pl-12 md:pl-32">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary to-brand-secondary rounded-full"
            />
            
            <div className="space-y-48">
              {data.about.chapters.map((chapter, index) => (
                <StoryChapter 
                  key={index}
                  index={index}
                  title={chapter.title}
                  text={chapter.text}
                  onUpdate={updateChapter}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const StoryChapter = ({ index, title, text, onUpdate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <div className="absolute -left-[60px] md:-left-[140px] top-2 w-4 h-4 rounded-full bg-white dark:bg-black border-4 border-brand-primary z-10 shadow-[0_0_20px_rgba(0,122,255,0.6)] group-hover:scale-150 transition-transform" />
      
      <h3 className="text-2xl md:text-4xl font-bold mb-8 tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-brand-primary">
        <InlineEditable 
          value={title} 
          onSave={(val) => onUpdate(index, 'title', val)} 
          component="span"
        />
      </h3>
      <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl font-medium">
        <InlineEditable 
          value={text} 
          onSave={(val) => onUpdate(index, 'text', val)} 
          multiline
          component="span"
        />
      </p>
    </motion.div>
  )
}

export default About
