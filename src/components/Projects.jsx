import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

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
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">Selected Projects</h2>
            <p className="text-slate-500">A collection of premium digital products built with precision and modern engineering principles.</p>
          </div>
          <a href="#" className="font-bold text-brand-primary flex items-center hover:opacity-80 transition-opacity">
            View All Work <ExternalLink size={18} className="ml-2" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-black rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={project.github} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                    <Github size={20} />
                  </a>
                  <a href={project.link} className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center hover:scale-110 transition-transform">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
