'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-primary/5 hover:bg-primary/10 transition-smooth text-left"
      >
        <h3 className="text-lg font-heading font-bold text-primary">{title}</h3>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-primary transition-transform duration-300',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white accordion-content">
          {children}
        </div>
      )}
    </div>
  );
}
