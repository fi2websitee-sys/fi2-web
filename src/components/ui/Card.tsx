import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  titleColor?: 'default' | 'primary';
  hover?: boolean;
  children: React.ReactNode;
  accent?: boolean;
}

export default function Card({
  title,
  titleColor = 'default',
  hover = true,
  accent = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md p-6 transition-smooth',
        hover && 'hover-lift hover:shadow-lg',
        accent && 'border-t-4 border-primary',
        className
      )}
      {...props}
    >
      {title && (
        <h3
          className={cn(
            'text-xl font-heading font-bold mb-4',
            titleColor === 'primary' ? 'text-primary' : 'text-gray-800'
          )}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
