import React from 'react';
import { CATEGORIES } from '../../../constants';
import type { ScreenName } from '../../../types';
import PageHeader from '../../common/PageHeader';

interface SeeAllScreenProps {
    onNavigate: (screen: ScreenName) => void;
}

const SeeAllScreen: React.FC<SeeAllScreenProps> = ({ onNavigate }) => {
    const allCategories = CATEGORIES.filter(c => c.name !== 'See all');
    return (
        <div className="space-y-6">
            <PageHeader title="All Features" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {allCategories.map((category) => (
                    <button
                        key={category.name}
                        onClick={() => onNavigate(category.name as ScreenName)}
                        className="flex flex-col items-center justify-center p-4 space-y-3 rounded-lg bg-white shadow hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-100 text-indigo-500">
                            <category.icon className="h-8 w-8" />
                        </div>
                        <span className="text-sm text-gray-800 font-semibold text-center">{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SeeAllScreen;