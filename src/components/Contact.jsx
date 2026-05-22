'use client';

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import InlineEditable from './InlineEditable'

const Contact = () => {
  const { data, updateData } = usePortfolio();

  if (!data) return null;

  const updateContact = (field, value) => {
    updateData({ ...data, contact: { ...data.contact, [field]: value } });
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold tracking-tighter mb-6">Let's build something <br /> amazing together.</h2>
            <p className="text-slate-500 mb-10 text-lg">Currently available for freelance projects and full-time opportunities. I respond within 24 hours.</p>
            
            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-slate-800 flex items-center justify-center mr-4 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Email</p>
                  <p className="text-lg font-bold">
                    <InlineEditable value={data.contact.email} onSave={(val) => updateContact('email', val)} />
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <a href={data.contact.github} className="w-12 h-12 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                  <Github size={20} />
                </a>
                <a href={data.contact.linkedin} className="w-12 h-12 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 rounded-[32px] bg-white dark:bg-black border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">First Name</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Last Name</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary transition-all outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                <input type="email" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Message</label>
                <textarea rows="4" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary transition-all outline-none resize-none"></textarea>
              </div>
              <button className="w-full py-4 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-primary/90 transition-all flex items-center justify-center group">
                Send Message
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
