import { motion } from 'framer-motion'

const About = () => {
  const timeline = [
    { year: '2023 - Present', title: 'Senior Full Stack Engineer', company: 'TechNova Solutions', description: 'Leading frontend architecture and cloud migration projects.' },
    { year: '2021 - 2023', title: 'Full Stack Developer', company: 'DigitalPulse', description: 'Built and scaled multiple SaaS products using React and Node.js.' },
    { year: '2019 - 2021', title: 'Frontend Developer', company: 'CreativeWeb', description: 'Specialized in creating high-fidelity animations and UI components.' },
  ]

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold tracking-tighter mb-8">My Story</h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              <p>
                I am Alanwoko Chikanma, a passionate software engineer dedicated to crafting exceptional digital experiences. My journey in technology began with a curiosity about how things work, which evolved into a career building complex systems.
              </p>
              <p>
                With over 5 years of experience, I specialize in building scalable, user-centric applications. I believe that good design and clean code go hand in hand to create products that not only work well but also delight users.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the tech community.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h3 className="text-xl font-bold mb-10 text-slate-400 uppercase tracking-widest text-sm">Journey</h3>
            <div className="space-y-12 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-slate-200 dark:before:bg-slate-800 ml-4 pl-10">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[53px] top-1 w-6 h-6 rounded-full bg-white dark:bg-black border-2 border-brand-primary z-10" />
                  <span className="text-sm font-bold text-brand-primary mb-2 block tracking-tight">{item.year}</span>
                  <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500 mb-3">{item.company}</p>
                  <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
