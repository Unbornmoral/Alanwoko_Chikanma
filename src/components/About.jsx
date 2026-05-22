import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const containerRef = useRef(null)
  
  // Track scroll progress for the whole section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // Smooth line growth
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const storyChapters = [
    {
      title: "The Genesis",
      text: "It started with a single line of code in a cluttered room. A curiosity for how the digital world ticks evolved into a relentless pursuit of technical mastery."
    },
    {
      title: "Building the Foundation",
      text: "From simple scripts to complex architectures, I spent years mastering the craft of full-stack development. Every bug was a lesson; every deployment, a victory."
    },
    {
      title: "Seniority & Vision",
      text: "As a Senior Engineer, I don't just write code; I architect systems. I focus on scalability, security, and the bridge between high-level business goals and technical reality."
    },
    {
      title: "The Human Element",
      text: "At the end of every network request is a human being. I build experiences that prioritize accessibility and performance, making the web a better place for everyone."
    },
    {
      title: "Looking Ahead",
      text: "The horizon is always moving. I'm currently exploring the intersection of AI and cloud infrastructure, pushing the boundaries of what's possible in the browser."
    }
  ]

  return (
    <section id="about" ref={containerRef} className="py-32 relative bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4">
              My <span className="text-brand-primary italic">Story</span>telling.
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium">A journey through code, architecture, and innovation.</p>
          </motion.div>

          <div className="relative pl-12 md:pl-32">
            {/* The Growing Vertical Line */}
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary to-brand-secondary rounded-full"
            />
            
            <div className="space-y-48">
              {storyChapters.map((chapter, index) => (
                <StoryChapter 
                  key={index}
                  title={chapter.title}
                  text={chapter.text}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const StoryChapter = ({ title, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Node on the line */}
      <div className="absolute -left-[60px] md:-left-[140px] top-2 w-4 h-4 rounded-full bg-white dark:bg-black border-4 border-brand-primary z-10 shadow-[0_0_20px_rgba(0,122,255,0.6)] group-hover:scale-150 transition-transform" />
      
      <h3 className="text-2xl md:text-4xl font-bold mb-8 tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-brand-primary">
        {title}
      </h3>
      <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl font-medium">
        {text}
      </p>
    </motion.div>
  )
}

export default About
