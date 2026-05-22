import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Code, Download, Calendar, MapPin } from 'lucide-react'

const CV = () => {
  const experiences = [
    {
      company: 'TechNova Solutions',
      role: 'Senior Full Stack Engineer',
      period: '2023 - Present',
      location: 'Remote / Lagos',
      description: 'Lead engineer for the core platform architecture. Responsible for scaling frontend micro-services and implementing high-performance API layers.',
      achievements: [
        'Architected and deployed a micro-frontend system using Module Federation.',
        'Reduced overall bundle size by 35% through aggressive code-splitting.',
        'Implemented a real-time analytics engine using WebSockets and Redis.'
      ]
    },
    {
      company: 'DigitalPulse',
      role: 'Full Stack Developer',
      period: '2021 - 2023',
      location: 'London, UK (Remote)',
      description: 'Key contributor to a multi-tenant SaaS product focused on marketing automation.',
      achievements: [
        'Developed a drag-and-drop workflow builder using React-Flow.',
        'Optimized PostgreSQL queries, improving dashboard load times by 50%.',
        'Built a comprehensive UI component library.'
      ]
    }
  ]

  const education = [
    {
      school: 'University of Lagos',
      degree: 'B.Sc. in Computer Science',
      period: '2015 - 2019',
      location: 'Lagos, Nigeria'
    },
    {
      school: 'Tech Institute',
      degree: 'Full Stack Development Certification',
      period: '2019 - 2020',
      location: 'Online'
    }
  ]

  const skillGroups = [
    { name: 'Frontend', skills: ['React', 'Next.js', 'Tailwind', 'TypeScript'] },
    { name: 'Backend', skills: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL'] },
    { name: 'Cloud', skills: ['AWS', 'Docker', 'Kubernetes', 'Vercel'] }
  ]

  return (
    <section id="cv" className="py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Interactive <span className="text-brand-primary">CV.</span></h2>
              <p className="text-slate-500 text-lg font-medium">Professional trajectory and academic background.</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                y: { 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: [0.175, 0.885, 0.32, 1.275] 
                } 
              }}
              className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all"
            >
              <Download size={20} />
              Download PDF
            </motion.button>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
            {/* Left Column: Experience & Education */}
            <div className="space-y-16">
              {/* Experience */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-brand-primary">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">Experience</h3>
                </div>
                
                <div className="space-y-12">
                  {experiences.map((exp, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-primary border-4 border-white dark:border-black" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                        <h4 className="text-xl font-bold">{exp.role}</h4>
                        <span className="text-sm font-bold text-brand-primary px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/10">
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm font-medium mb-4">
                        <span className="flex items-center gap-1"><Briefcase size={14} /> {exp.company}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {exp.location}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-medium">
                        {exp.description}
                      </p>
                      <ul className="space-y-2">
                        {exp.achievements.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-brand-primary">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">Education</h3>
                </div>

                <div className="space-y-12">
                  {education.map((edu, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-black" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <h4 className="text-xl font-bold">{edu.degree}</h4>
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                          {edu.period}
                        </span>
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        {edu.school} • {edu.location}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Skills Sidebar */}
            <div className="space-y-8">
              <div className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Code size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Skills</h3>
                </div>
                
                <div className="space-y-8">
                  {skillGroups.map((group, i) => (
                    <div key={i}>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{group.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill, j) => (
                          <span 
                            key={j}
                            className="px-4 py-2 rounded-xl bg-white dark:bg-black border border-slate-100 dark:border-slate-800 text-sm font-bold shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="p-8 rounded-[32px] bg-brand-primary text-white overflow-hidden relative group">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">Let's build something together.</h3>
                  <p className="text-white/80 text-sm mb-6 leading-relaxed">
                    Always open to discussing high-impact projects or leadership opportunities.
                  </p>
                  <a href="#contact" className="inline-flex items-center font-bold gap-2 text-white hover:gap-4 transition-all">
                    Get in touch <Code size={16} />
                  </a>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CV
