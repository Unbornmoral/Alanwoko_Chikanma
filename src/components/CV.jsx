'use client';

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Code, Download, MapPin, Plus, Trash2, Upload, Loader2 } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import InlineEditable from './InlineEditable'
import { useRef, useState } from 'react'

const CV = () => {
  const { data, updateData, isAdmin } = usePortfolio();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!data) return null;

  const updateCV = (field, value) => {
    updateData({ ...data, cv: { ...data.cv, [field]: value } });
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Mock upload
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ filename: file.name, type: 'pdf' })
      });
      const result = await response.json();
      // For mock, we'll just use a sample PDF URL or the same mock image URL
      updateCV('cvUrl', result.url);
      alert('CV updated successfully (Mock)');
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const updateExperience = (idx, field, value) => {
    const newExperiences = [...data.cv.experiences];
    newExperiences[idx] = { ...newExperiences[idx], [field]: value };
    updateCV('experiences', newExperiences);
  };

  const updateAchievement = (expIdx, achIdx, value) => {
    const newExperiences = [...data.cv.experiences];
    newExperiences[expIdx].achievements[achIdx] = value;
    updateCV('experiences', newExperiences);
  };

  const addExperience = () => {
    const newExperiences = [{
      company: 'New Company',
      role: 'New Role',
      period: '2024 - Present',
      location: 'Remote',
      description: 'Describe your role...',
      achievements: ['First achievement']
    }, ...data.cv.experiences];
    updateCV('experiences', newExperiences);
  };

  const removeExperience = (idx) => {
    const newExperiences = data.cv.experiences.filter((_, i) => i !== idx);
    updateCV('experiences', newExperiences);
  };

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
            
            <div className="flex flex-col sm:flex-row gap-4">
              {isAdmin && (
                <>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".pdf"
                    onChange={handleCvUpload}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold transition-all disabled:opacity-50"
                  >
                    {isUploading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Upload size={20} />
                    )}
                    {isUploading ? 'Uploading...' : 'Attach/Update CV'}
                  </motion.button>
                </>
              )}
              <motion.a
                href={data.cv.cvUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ y: { duration: 1.5, repeat: Infinity, ease: [0.175, 0.885, 0.32, 1.275] } }}
                className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all"
              >
                <Download size={20} />
                Download PDF
              </motion.a>
            </div>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
            <div className="space-y-16">
              <div>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-brand-primary">
                      <Briefcase size={24} />
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight">Experience</h3>
                  </div>
                  {isAdmin && (
                    <button onClick={addExperience} className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-full transition-colors"><Plus size={24} /></button>
                  )}
                </div>
                
                <div className="space-y-12">
                  {data.cv.experiences.map((exp, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800 group"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-primary border-4 border-white dark:border-black" />
                      {isAdmin && (
                        <button onClick={() => removeExperience(i)} className="absolute -left-12 top-0 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                        <h4 className="text-xl font-bold">
                          <InlineEditable value={exp.role} onSave={(val) => updateExperience(i, 'role', val)} />
                        </h4>
                        <span className="text-sm font-bold text-brand-primary px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/10">
                          <InlineEditable value={exp.period} onSave={(val) => updateExperience(i, 'period', val)} />
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm font-medium mb-4">
                        <span className="flex items-center gap-1"><Briefcase size={14} /> <InlineEditable value={exp.company} onSave={(val) => updateExperience(i, 'company', val)} /></span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> <InlineEditable value={exp.location} onSave={(val) => updateExperience(i, 'location', val)} /></span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-medium">
                        <InlineEditable value={exp.description} onSave={(val) => updateExperience(i, 'description', val)} multiline />
                      </p>
                      <ul className="space-y-2">
                        {exp.achievements.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium group/ach">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0" />
                            <InlineEditable value={item} onSave={(val) => updateAchievement(i, j, val)} />
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-brand-primary">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">Education</h3>
                </div>

                <div className="space-y-12">
                  {data.cv.education.map((edu, i) => (
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
                        <h4 className="text-xl font-bold">
                          <InlineEditable value={edu.degree} onSave={(val) => {
                            const newEdu = [...data.cv.education];
                            newEdu[i].degree = val;
                            updateCV('education', newEdu);
                          }} />
                        </h4>
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                          <InlineEditable value={edu.period} onSave={(val) => {
                            const newEdu = [...data.cv.education];
                            newEdu[i].period = val;
                            updateCV('education', newEdu);
                          }} />
                        </span>
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        <InlineEditable value={edu.school} onSave={(val) => {
                          const newEdu = [...data.cv.education];
                          newEdu[i].school = val;
                          updateCV('education', newEdu);
                        }} /> • <InlineEditable value={edu.location} onSave={(val) => {
                          const newEdu = [...data.cv.education];
                          newEdu[i].location = val;
                          updateCV('education', newEdu);
                        }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Code size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Skills</h3>
                </div>
                
                <div className="space-y-8">
                  {data.cv.skillGroups.map((group, i) => (
                    <div key={i}>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                        <InlineEditable value={group.name} onSave={(val) => {
                          const newGroups = [...data.cv.skillGroups];
                          newGroups[i].name = val;
                          updateCV('skillGroups', newGroups);
                        }} />
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill, j) => (
                          <span 
                            key={j}
                            className="px-4 py-2 rounded-xl bg-white dark:bg-black border border-slate-100 dark:border-slate-800 text-sm font-bold shadow-sm"
                          >
                            <InlineEditable value={skill} onSave={(val) => {
                              const newGroups = [...data.cv.skillGroups];
                              newGroups[i].skills[j] = val;
                              updateCV('skillGroups', newGroups);
                            }} />
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
