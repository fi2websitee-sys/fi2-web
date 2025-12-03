import { cn } from '@/lib/utils';
import AnimatedBackground from './AnimatedBackground';

export interface HeroBannerProps {
  title: string;
  titleAr?: string;
  subtitle?: string;
  backgroundImage?: string;
  overlay?: boolean;
  className?: string;
  animated?: boolean;
}

export default function HeroBanner({
  title,
  titleAr,
  subtitle,
  backgroundImage,
  overlay = true,
  className,
  animated = true,
}: HeroBannerProps) {
  return (
    <div
      className={cn(
        'relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden',
        !backgroundImage && 'hero-atmosphere',
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Overlay */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-dark/60" />
      )}

      {/* 3D Animated Background */}
      {!backgroundImage && animated && (
        <AnimatedBackground variant="green" intensity="medium" />
      )}

      {/* Gradient Mesh */}
      {!backgroundImage && <div className="absolute inset-0 gradient-mesh" />}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto text-center">
        <h1
          className={cn(
            'text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4 reveal reveal-1',
            backgroundImage ? 'text-white' : 'text-primary accent-underline inline-block'
          )}
        >
          {title}
        </h1>
        {titleAr && (
          <p
            className={cn(
              'text-2xl sm:text-3xl font-arabic mb-4 reveal reveal-2',
              backgroundImage ? 'text-white/90' : 'text-primary-light'
            )}
            dir="rtl"
          >
            {titleAr}
          </p>
        )}
        {subtitle && (
          <p
            className={cn(
              'text-lg sm:text-xl max-w-3xl mx-auto reveal reveal-3',
              backgroundImage ? 'text-white/80' : 'text-gray-600'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
