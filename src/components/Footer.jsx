const Footer = () => {
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-black">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-bold tracking-tighter">
          ALANWOKO<span className="text-brand-primary">.</span>
        </div>
        
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Alanwoko Chikanma. Built with React 19 & Tailwind v4.
        </p>

        <div className="flex space-x-6 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-brand-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Github</a>
          <a href="#" className="hover:text-brand-primary transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
