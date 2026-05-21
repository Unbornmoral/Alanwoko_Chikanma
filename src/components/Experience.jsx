import { motion } from 'framer-motion'

const Experience = () => {
  const experiences = [
    {
      company: 'TechNova Solutions',
      role: 'Senior Full Stack Engineer',
      period: '2023 - Present',
      points: [
        'Architected microservices using Node.js and AWS.',
        'Improved system performance by 40% through Redis caching.',
        'Mentored junior developers and led code reviews.'
      ]
    },
    {
      company: 'DigitalPulse',
      role: 'Full Stack Developer',
      period: '2021 - 2023',
      points: [
        'Developed real-time analytics dashboards with Next.js.',
        'Integrated multi-tenant database architecture.',
        'Optimized database queries reducing latency by 25%.'
      ]
    },
    {
      company: 'CreativeWeb',
      role: 'Frontend Developer',
      period: '2019 - 2021',
      points: [
        'Built responsive web applications with React.',
        'Designed and implemented complex UI animations.',
        'Collaborated with designers to ensure pixel-perfect implementation.'
      ]
    }
  ]

  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tighter mb-16 text-center">Professional Journey</h2>
          
          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-[1fr_3fr] gap-8"
              >
                <div className="text-slate-400 font-bold tracking-tighter text-xl">{exp.period}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                  <p className="text-brand-primary font-bold mb-6">{exp.company}</p>
                  <ul className="space-y-4">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start text-slate-600 dark:text-slate-400 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 mr-4 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
