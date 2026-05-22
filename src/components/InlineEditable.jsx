'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const InlineEditable = ({ value, onSave, className, component: Component = 'span', multiline = false }) => {
  const { isAdmin } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onSave(tempValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setValue(value);
    }
  };

  if (!isAdmin) {
    return <Component className={className}>{value}</Component>;
  }

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={inputRef}
        value={tempValue}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} outline-none ring-2 ring-brand-primary rounded bg-transparent w-full`}
      />
    ) : (
      <input
        ref={inputRef}
        type="text"
        value={tempValue}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} outline-none ring-2 ring-brand-primary rounded bg-transparent`}
      />
    );
  }

  return (
    <Component
      className={`${className} cursor-pointer hover:bg-brand-primary/10 rounded px-1 transition-colors border border-dashed border-transparent hover:border-brand-primary`}
      onClick={() => setIsEditing(true)}
    >
      {value}
    </Component>
  );
};

export default InlineEditable;
