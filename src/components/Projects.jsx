import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useRef } from 'react'

const Projects = () => {
  const projects = [
    {
      title: 'GhostCheck',
      description: 'AI-powered Government HR tool that detects ghost workers using biometric verification and attendance anomaly analysis.',
      tech: ['React', 'Tailwind CSS', 'Squad API', 'AI Analysis'],
      link: '#',
      github: '#',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Skyline SaaS',
      description: 'High-performance property management platform with real-time analytics and automated billing systems.',
      tech: ['Next.js', 'PostgreSQL', 'Redis', 'AWS'],
      link: '#',
      github: '#',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Lumina Dashboard',
      description: 'Enterprise resource planning dashboard with complex data visualization and multi-tenant support.',
      tech: ['React', 'GraphQL', 'D3.js', 'TypeScript'],
      link: '#',
      github: '#',
      image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f67d?auto=format&fit=crop&q=80&w=800'
    }
  ]

  return (
    <section id="projects" className="py-32 bg-slate-50 dark:bg-slate-900/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-4"
            >
              Selected <span className="text-brand-primary">Work.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-lg font-medium"
            >
              A collection of premium digital products built with precision and modern engineering principles.
            </motion.p>
          </div>
          <motion.a 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="#" 
            className="font-bold text-brand-primary flex items-center hover:gap-4 transition-all"
          >
            View All Work <ExternalLink size={18} className="ml-2" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, idx }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

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

  // Parallax effect for image
  const imgTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["10px", "-10px"])
  const imgTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["10px", "-10px"])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group bg-white dark:bg-black rounded-[40px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500"
    >
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="relative aspect-video overflow-hidden"
      >
        <motion.img 
          style={{ 
            x: imgTranslateX,
            y: imgTranslateY,
            scale: 1.1
          }}
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <motion.a 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={project.github} 
            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl"
          >
            <Github size={24} />
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={project.link} 
            className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-xl"
          >
            <ExternalLink size={24} />
          </motion.a>
        </div>
      </div>
      
      <div className="p-10">
        <h3 
          style={{ transform: "translateZ(40px)" }}
          className="text-3xl font-bold mb-4 tracking-tight"
        >
          {project.title}
        </h3>
        <p 
          style={{ transform: "translateZ(30px)" }}
          className="text-slate-500 dark:text-slate-400 mb-8 text-base leading-relaxed font-medium"
        >
          {project.description}
        </p>
        <div 
          style={{ transform: "translateZ(20px)" }}
          className="flex flex-wrap gap-2"
        >
          {project.tech.map(t => (
            <span key={t} className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Projects
