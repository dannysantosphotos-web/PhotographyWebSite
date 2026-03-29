import { useState } from 'react';
import type { PrintData } from '@/lib/prints-data';

interface PhotoCarouselProps {
  prints: PrintData[];
}

export default function PhotoCarousel({ prints }: PhotoCarouselProps) {
  const [centerIndex, setCenterIndex] = useState(0);

  const getVisibleIndices = () => {
    const total = prints.length;
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      indices.push((centerIndex + i + total) % total);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  const handleNext = () => {
    setCenterIndex((prev) => (prev + 1) % prints.length);
  };

  const handlePrev = () => {
    setCenterIndex((prev) => (prev - 1 + prints.length) % prints.length);
  };

  const getPositionStyle = (position: number) => {
    const angle = position * -30; // inverted: 30 degrees apart, negative for left-side center
    const radius = 600; // distance from center
    const scale = position === 0 ? 1 : 0.7;
    const opacity = position === 0 ? 1 : 0.5;
    const zIndex = 10 - Math.abs(position);
    return {
      transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <div className="relative w-full h-[600px] flex justify-center overflow-hidden mb-12">
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          ‹
        </button>
        <div className="relative flex items-center justify-center w-full h-full">
          {visibleIndices.map((index, pos) => {
            const print = prints[index];
            const position = pos - 2; // -2, -1, 0, 1, 2
            return (
              <div
                key={print.id}
                className="absolute transition-all duration-500 ease-in-out origin-center"
                style={getPositionStyle(position)}
              >
                <img
                  src={print.image}
                  alt={print.title}
                  className="w-[300px] h-[500px] object-cover rounded-[24px] shadow-lg"
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
}