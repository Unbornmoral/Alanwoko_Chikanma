import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Code, Server, Wrench, Cloud } from 'lucide-react'
import { useState } from 'react'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Code />,
      skills: ['React 19', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript']
    },
    {
      title: 'Backend',
      icon: <Server />,
      skills: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL', 'Prisma']
    },
    {
      title: 'Tools',
      icon: <Wrench />,
      skills: ['Git', 'Docker', 'Vite', 'Postman', 'Figma']
    },
    {
      title: 'Cloud',
      icon: <Cloud />,
      skills: ['AWS', 'Vercel', 'Netlify', 'Firebase', 'Clerk']
    }
  ]

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4"
          >
            Core <span className="text-brand-primary">Expertise.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-xl mx-auto text-lg font-medium"
          >
            Modern tech stack focused on performance, scalability, and exceptional user experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <SkillCard key={category.title} category={category} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

const SkillCard = ({ category, idx }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-brand-primary transition-colors group relative"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="w-14 h-14 rounded-2xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-6 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm"
      >
        {category.icon}
      </div>
      <h3 
        style={{ transform: "translateZ(40px)" }}
        className="text-2xl font-bold mb-6 tracking-tight"
      >
        {category.title}
      </h3>
      <ul 
        style={{ transform: "translateZ(30px)" }}
        className="space-y-4"
      >
        {category.skills.map((skill) => (
          <li key={skill} className="flex items-center text-slate-600 dark:text-slate-400 font-medium text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-3 shadow-[0_0_8px_rgba(0,122,255,0.5)]" />
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Skills
