import React from 'react';
import { NAV_ITEMS } from '../constants';
import type { ScreenName } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface BottomNavProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const { user } = useAuth();

  if (!user) return null;

  const visibleNavItems = NAV_ITEMS.filter(item => item.roles.includes(user.role));

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
      <div className="flex justify-around items-center h-16 px-2">
        {visibleNavItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.name)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm transition-colors duration-200 ${
              activeScreen === item.name
                ? 'text-indigo-500'
                : 'text-gray-500 hover:text-indigo-500'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;