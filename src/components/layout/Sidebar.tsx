'use client';

import Link from 'next/link';
import Image from 'next/image';
import { navigation } from '@/data/navigation';
import { useNavigation } from '@/hooks/useNavigation';
import { NavItem } from './NavItem';

export default function Sidebar() {
  const { isActive, isExpanded, toggleExpanded } = useNavigation();

  return (
    <aside className="hidden lg:block fixed left-0 top-3px h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Logo - Red ring provides persistent red presence */}
        <Link href="/" className="flex flex-col items-center mb-8 group">
          <div className="relative w-[100px] h-[100px] mb-3 transition-all duration-300 group-hover:scale-[1.03] group-hover:drop-shadow-[0_4px_12px_rgba(200,16,46,0.15)]">
            <Image
              src="/images/fi2-logo.svg"
              alt="FI2 Student Committee Logo"
              width={100}
              height={100}
              priority
              className="object-contain"
            />
          </div>
          <p className="text-sm font-medium text-gray-600 tracking-wide">
            Student Committee
          </p>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActiveItem={isActive}
              isExpandedItem={isExpanded}
              onToggle={toggleExpanded}
              showRedPip={true}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
