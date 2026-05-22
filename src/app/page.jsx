'use client';

import React, { useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import CV from '../components/CV';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function PortfolioContent() {
  const { isAdmin, toggleAdmin, loading } = usePortfolio();

  useEffect(() => {
    let ctrlAPressed = false;

    const handleKeyDown = (e) => {
      // Check for Ctrl + A
      if (e.ctrlKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        ctrlAPressed = true;
      } 
      // If Ctrl + A was pressed, wait for C
      else if (ctrlAPressed && e.key.toLowerCase() === 'c') {
        ctrlAPressed = false;
        const code = prompt('Enter Admin Code:');
        if (code === 'Kamal.08032001') {
          toggleAdmin(true);
          window.location.reload();
        }
      } 
      // Reset if any other key is pressed
      else {
        ctrlAPressed = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleAdmin]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="bg-white dark:bg-black min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CV />
      <Contact />
      <Footer />

      {isAdmin && (
        <button 
          onClick={() => {
            toggleAdmin(false);
            window.location.reload();
          }}
          className="fixed bottom-8 right-8 z-[90] px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-2xl hover:bg-red-600 transition-all flex items-center gap-2"
        >
          Disable Admin Mode
        </button>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
