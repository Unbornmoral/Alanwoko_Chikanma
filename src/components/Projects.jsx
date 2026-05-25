'use client';

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Plus, Edit2, Trash2, GripVertical } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import InlineEditable from './InlineEditable'
import ProjectModal from './ProjectModal'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Projects = () => {
  const { data, updateData, isAdmin } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!data) return null;

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = data.projects.findIndex((p) => p.id === active.id);
      const newIndex = data.projects.findIndex((p) => p.id === over.id);

      const newProjects = arrayMove(data.projects, oldIndex, newIndex);
      updateData({ ...data, projects: newProjects });
    }
  };

  const handleSaveProject = (projectData) => {
    let newProjects;
    if (editingProject) {
      newProjects = data.projects.map(p => p.id === editingProject.id ? { ...projectData, id: p.id } : p);
    } else {
      const newId = Math.max(...data.projects.map(p => parseInt(p.id)), 0) + 1;
      newProjects = [...data.projects, { ...projectData, id: newId.toString() }];
    }
    updateData({ ...data, projects: newProjects });
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const newProjects = data.projects.filter(p => p.id !== id);
      updateData({ ...data, projects: newProjects });
    }
  };

  const updateProjectsSection = (field, value) => {
    updateData({ ...data, projectsSection: { ...data.projectsSection, [field]: value } });
  };

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
              <InlineEditable 
                value={data.projectsSection.title} 
                onSave={(val) => updateProjectsSection('title', val)} 
                component="span"
              />
            </motion.h2>
            <p className="text-slate-500 text-lg font-medium">
              <InlineEditable 
                value={data.projectsSection.subtitle} 
                onSave={(val) => updateProjectsSection('subtitle', val)} 
                component="span"
              />
            </p>
          </div>
          <div className="flex items-center gap-6">
            {isAdmin && (
              <button 
                onClick={() => { setEditingProject(null); setIsModalOpen(true); }}
                className="px-6 py-3 bg-brand-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
              >
                <Plus size={18} /> Add Project
              </button>
            )}
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
        </div>

        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={data.projects.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {data.projects.map((project, idx) => (
                <SortableProjectCard 
                  key={project.id} 
                  project={project} 
                  idx={idx} 
                  isAdmin={isAdmin}
                  onEdit={() => { setEditingProject(project); setIsModalOpen(true); }}
                  onDelete={() => handleDeleteProject(project.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingProject(null); }}
        project={editingProject}
        onSave={handleSaveProject}
      />
    </section>
  )
}

const SortableProjectCard = ({ project, idx, isAdmin, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project.id, disabled: !isAdmin });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {isAdmin && (
        <div className="absolute top-4 left-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div {...attributes} {...listeners} className="p-2 bg-white dark:bg-black rounded-lg shadow-xl cursor-grab active:cursor-grabbing">
            <GripVertical size={16} />
          </div>
          <button onClick={onEdit} className="p-2 bg-white dark:bg-black text-blue-500 rounded-lg shadow-xl hover:bg-blue-50 transition-colors">
            <Edit2 size={16} />
          </button>
          <button onClick={onDelete} className="p-2 bg-white dark:bg-black text-red-500 rounded-lg shadow-xl hover:bg-red-50 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      )}
      <ProjectCard project={project} idx={idx} />
    </div>
  );
};

const ProjectCard = ({ project, idx }) => {
  // Same animation logic as before, just using project props
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white dark:bg-black rounded-[40px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 h-full flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <a href={project.github} className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform"><Github size={24} /></a>
          <a href={project.link} className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"><ExternalLink size={24} /></a>
        </div>
      </div>
      
      <div className="p-10 flex-1 flex flex-col">
        <h3 className="text-3xl font-bold mb-4 tracking-tight">{project.title}</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-base leading-relaxed font-medium">{project.description}</p>
        
        {project.impact && (
          <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary mb-2">Key Impact</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">"{project.impact}"</p>
          </div>
        )}

        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 uppercase tracking-wider">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Projects
