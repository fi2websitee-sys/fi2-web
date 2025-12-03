import Link from 'next/link';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { NavItem as NavItemType } from '@/types';
import { cn } from '@/lib/utils';

interface NavItemProps {
  item: NavItemType;
  level?: number;
  isActiveItem: (item: NavItemType) => boolean;
  isExpandedItem: (href: string) => boolean;
  onToggle: (href: string) => void;
  showRedPip?: boolean;
}

export function NavItem({
  item,
  level = 0,
  isActiveItem,
  isExpandedItem,
  onToggle,
  showRedPip = false,
}: NavItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = isActiveItem(item);
  const isExpanded = isExpandedItem(item.href);

  if (hasChildren) {
    return (
      <div className={cn('mb-1', level > 0 && 'ml-4')}>
        <button
          onClick={() => onToggle(item.href)}
          className={cn(
            'w-full flex items-center justify-between px-4 py-3 rounded-lg transition-smooth text-left',
            'hover:bg-primary/5',
            isActive && 'bg-primary/10 text-primary font-semibold',
            !isActive && 'text-gray-800'
          )}
        >
          <span className="text-sm">{item.label}</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 ml-2 flex-shrink-0" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-1 ml-2">
            {item.children!.map((child) => (
              <NavItem
                key={child.href}
                item={child}
                level={level + 1}
                isActiveItem={isActiveItem}
                isExpandedItem={isExpandedItem}
                onToggle={onToggle}
                showRedPip={showRedPip}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex items-center justify-between px-4 py-3 mb-1 rounded-lg transition-smooth',
          'hover:bg-primary/5',
          level > 0 && 'ml-4',
          'text-gray-800 text-sm'
        )}
      >
        <span>{item.label}</span>
        <ExternalLink className="w-3 h-3 ml-2 flex-shrink-0" />
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'block px-4 py-3 mb-1 rounded-lg transition-smooth text-sm relative',
        'hover:bg-primary/5',
        level > 0 && 'ml-4',
        isActive && 'bg-primary/10 text-primary font-semibold',
        !isActive && 'text-gray-800'
      )}
    >
      {showRedPip && isActive && level === 0 && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-red-primary rounded-full shadow-red-glow animate-[pipPulse_2s_ease-in-out_infinite]" />
      )}
      <span className={cn(showRedPip && isActive && level === 0 && 'ml-3')}>
        {item.label}
      </span>
    </Link>
  );
}
