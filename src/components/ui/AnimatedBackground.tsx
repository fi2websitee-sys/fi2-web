'use client';

import { useMemo } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'green' | 'dark';
  intensity?: 'subtle' | 'medium' | 'strong';
}

interface ShapeConfig {
  size: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  color: string;
  shape: string;
}

// Deterministic shape generation using index as seed
const generateShapeConfig = (index: number, colorArray: string[]): ShapeConfig => {
  // Use index to create pseudo-random but deterministic values
  const seed1 = (index * 2654435761) % 2147483647;
  const seed2 = (index * 1103515245 + 12345) % 2147483647;
  const seed3 = (index * 48271) % 2147483647;

  return {
    size: 100 + (seed1 % 200),
    left: seed1 % 100,
    top: seed2 % 100,
    delay: (seed3 % 5000) / 1000,
    duration: 15 + (seed1 % 15),
    color: colorArray[index % colorArray.length],
    shape: ['circle', 'triangle', 'square'][index % 3],
  };
};

export default function AnimatedBackground({
  variant = 'green',
  intensity = 'medium'
}: AnimatedBackgroundProps) {
  const shapeConfigs = useMemo(() => {
    const count = intensity === 'subtle' ? 8 : intensity === 'medium' ? 12 : 16;

    const colors = variant === 'dark'
      ? ['rgba(13, 92, 70, 0.08)', 'rgba(212, 168, 83, 0.06)', 'rgba(200, 16, 46, 0.04)']
      : ['rgba(13, 92, 70, 0.06)', 'rgba(212, 168, 83, 0.05)', 'rgba(200, 16, 46, 0.03)'];

    return Array.from({ length: count }, (_, i) => generateShapeConfig(i, colors));
  }, [variant, intensity]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 animate-background-shift">
        {shapeConfigs.map((config, i) => (
          <div
            key={i}
            className={`absolute animated-shape shape-${config.shape}`}
            style={{
              left: `${config.left}%`,
              top: `${config.top}%`,
              width: `${config.size}px`,
              height: `${config.size}px`,
              backgroundColor: config.color,
              animationDelay: `${config.delay}s`,
              animationDuration: `${config.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
