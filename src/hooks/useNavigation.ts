import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NavItem } from '@/types';

export function useNavigation() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]
    );
  };

  const isActive = (item: NavItem): boolean => {
    if (item.href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(item.href) && item.href !== '#';
  };

  const isExpanded = (href: string) => expandedItems.includes(href);

  return {
    pathname,
    expandedItems,
    toggleExpanded,
    isActive,
    isExpanded,
  };
}
