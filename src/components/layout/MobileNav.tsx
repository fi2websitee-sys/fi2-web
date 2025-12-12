'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { useNavigation } from '@/hooks/useNavigation';
import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';

export default function MobileNav() {
  const { pathname, isActive, isExpanded, toggleExpanded } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-3px left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-800 hover:bg-primary/5 rounded-lg transition-smooth"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/fi2-logo.svg"
              alt="FI2 Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <h1 className="text-lg font-heading font-bold text-primary leading-tight">FI2</h1>
              <span className="text-[10px] text-gray-600">Student Committee</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-dark/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={cn(
          'lg:hidden fixed top-0 left-0 h-screen w-[280px] bg-white z-50 transform transition-transform duration-300 ease-out overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 pt-3">
          {/* Logo */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex flex-col items-center flex-1">
              <Image
                src="/images/fi2-logo.svg"
                alt="FI2 Student Committee Logo"
                width={80}
                height={80}
                className="object-contain mb-2"
              />
              <p className="text-sm font-medium text-gray-600">Student Committee</p>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-800 hover:bg-primary/5 rounded-lg transition-smooth self-start"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                isActiveItem={isActive}
                isExpandedItem={isExpanded}
                onToggle={toggleExpanded}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
