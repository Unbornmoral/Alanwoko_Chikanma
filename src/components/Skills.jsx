import { motion } from 'framer-motion'
import { Code, Server, Tool, Cloud } from 'lucide-react'

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
      icon: <Tool />,
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
          <h2 className="text-4xl font-bold tracking-tighter mb-4">Core Expertise</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Modern tech stack focused on performance, scalability, and exceptional user experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-brand-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-6 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-6">{category.title}</h3>
              <ul className="space-y-4">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center text-slate-600 dark:text-slate-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-3" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
