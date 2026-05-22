'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Code, Server, Wrench, Cloud, Plus, Trash2 } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import InlineEditable from './InlineEditable'

const iconMap = {
  Code: <Code />,
  Server: <Server />,
  Wrench: <Wrench />,
  Cloud: <Cloud />
};

const Skills = () => {
  const { data, updateData, isAdmin } = usePortfolio();

  if (!data) return null;

  const updateSkillsHeader = (field, value) => {
    updateData({ ...data, skills: { ...data.skills, [field]: value } });
  };

  const updateCategoryTitle = (idx, value) => {
    const newCategories = [...data.skills.categories];
    newCategories[idx] = { ...newCategories[idx], title: value };
    updateData({ ...data, skills: { ...data.skills, categories: newCategories } });
  };

  const updateSkill = (catIdx, skillIdx, value) => {
    const newCategories = [...data.skills.categories];
    newCategories[catIdx].skills[skillIdx] = value;
    updateData({ ...data, skills: { ...data.skills, categories: newCategories } });
  };

  const addSkill = (catIdx) => {
    const newCategories = [...data.skills.categories];
    newCategories[catIdx].skills.push('New Skill');
    updateData({ ...data, skills: { ...data.skills, categories: newCategories } });
  };

  const removeSkill = (catIdx, skillIdx) => {
    const newCategories = [...data.skills.categories];
    newCategories[catIdx].skills.splice(skillIdx, 1);
    updateData({ ...data, skills: { ...data.skills, categories: newCategories } });
  };

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
            <InlineEditable 
              value={data.skills.title} 
              onSave={(val) => updateSkillsHeader('title', val)} 
              component="span"
            />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-xl mx-auto text-lg font-medium"
          >
            <InlineEditable 
              value={data.skills.subtitle} 
              onSave={(val) => updateSkillsHeader('subtitle', val)} 
              component="span"
            />
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.skills.categories.map((category, idx) => (
            <SkillCard 
              key={category.title} 
              category={category} 
              idx={idx} 
              isAdmin={isAdmin}
              onUpdateTitle={(val) => updateCategoryTitle(idx, val)}
              onUpdateSkill={(sIdx, val) => updateSkill(idx, sIdx, val)}
              onAddSkill={() => addSkill(idx)}
              onRemoveSkill={(sIdx) => removeSkill(idx, sIdx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const SkillCard = ({ category, idx, isAdmin, onUpdateTitle, onUpdateSkill, onAddSkill, onRemoveSkill }) => {
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
        {iconMap[category.icon] || <Code />}
      </div>
      <h3 
        style={{ transform: "translateZ(40px)" }}
        className="text-2xl font-bold mb-6 tracking-tight"
      >
        <InlineEditable 
          value={category.title} 
          onSave={onUpdateTitle} 
          component="span"
        />
      </h3>
      <ul 
        style={{ transform: "translateZ(30px)" }}
        className="space-y-4"
      >
        {category.skills.map((skill, sIdx) => (
          <li key={sIdx} className="flex items-center text-slate-600 dark:text-slate-400 font-medium text-sm group/item">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-3 shadow-[0_0_8px_rgba(0,122,255,0.5)]" />
            <InlineEditable 
              value={skill} 
              onSave={(val) => onUpdateSkill(sIdx, val)} 
              component="span"
            />
            {isAdmin && (
              <button 
                onClick={() => onRemoveSkill(sIdx)}
                className="ml-auto opacity-0 group-hover/item:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
            )}
          </li>
        ))}
        {isAdmin && (
          <li>
            <button 
              onClick={onAddSkill}
              className="flex items-center gap-2 text-xs font-bold text-brand-primary hover:gap-3 transition-all"
            >
              <Plus size={14} /> Add Skill
            </button>
          </li>
        )}
      </ul>
    </motion.div>
  )
}

export default Skills
