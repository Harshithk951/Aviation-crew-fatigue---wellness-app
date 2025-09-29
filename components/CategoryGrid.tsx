import React from 'react';
import type { Category, ScreenName } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (screen: ScreenName) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategoryClick(category.name as ScreenName)}
          className="flex flex-col items-center p-2 space-y-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-500">
            <category.icon className="h-6 w-6" />
          </div>
          <span className="text-xs text-gray-700 font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;