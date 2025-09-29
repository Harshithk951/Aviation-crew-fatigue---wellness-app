import React from 'react';
import type { CarouselItem } from '../types';

interface CarouselProps {
    items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  }, [items.length]);

  React.useEffect(() => {
    if (items.length > 1) {
        const timer = setTimeout(goToNext, 5000);
        return () => clearTimeout(timer);
    }
  }, [currentIndex, items.length, goToNext]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-xl shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <img
            key={item.id}
            src={item.imageUrl}
            alt={item.alt}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                    currentIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
            ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
