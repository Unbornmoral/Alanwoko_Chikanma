'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, Trash2, Loader2 } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, project, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: [],
    link: '',
    github: '',
    image: '',
  });
  const [newTech, setNewTech] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        title: '',
        description: '',
        tech: [],
        link: '',
        github: '',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      });
    }
  }, [project, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addTech = () => {
    if (newTech && !formData.tech.includes(newTech)) {
      setFormData({ ...formData, tech: [...formData.tech, newTech] });
      setNewTech('');
    }
  };

  const removeTech = (t) => {
    setFormData({ ...formData, tech: formData.tech.filter(item => item !== t) });
  };

  const handleImageUpload = async (e) => {
    setIsUploading(true);
    try {
      // Mock upload
      const response = await fetch('/api/upload', { 
        method: 'POST',
        body: JSON.stringify({ type: 'project' })
      });
      const result = await response.json();
      setFormData({ ...formData, image: result.url });
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold tracking-tight">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Project Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows="3"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none resize-none" 
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Link</label>
                <input 
                  type="text" 
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">GitHub Link</label>
                <input 
                  type="text" 
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Technologies</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" 
                  placeholder="Add tech..."
                />
                <button 
                  type="button" 
                  onClick={addTech}
                  className="px-6 bg-brand-primary text-white rounded-xl font-bold"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tech.map(t => (
                  <span key={t} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold">
                    {t}
                    <button type="button" onClick={() => removeTech(t)} className="text-red-500"><X size={14} /></button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Cover Image</label>
              <div className="flex items-center gap-6 p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <img src={formData.image} className="w-24 h-16 object-cover rounded-lg" alt="Preview" />
                <button 
                  type="button" 
                  onClick={handleImageUpload}
                  disabled={isUploading}
                  className="flex items-center gap-2 text-brand-primary font-bold hover:underline disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Upload size={18} />
                  )}
                  {isUploading ? 'Uploading...' : 'Change Image'}
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="submit" 
                className="flex-1 py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
              >
                Save Project
              </button>
              <button 
                type="button" 
                onClick={onClose}
                className="px-8 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
