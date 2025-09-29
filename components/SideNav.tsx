import React from 'react';
import { NAV_ITEMS, CATEGORIES } from '../constants';
import type { ScreenName } from '../types';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

interface SideNavProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19L19 12L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 19L12 12L5 5" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const SideNav: React.FC<SideNavProps> = ({ activeScreen, onNavigate }) => {
    const { user, logout } = useAuth();
    if (!user) return null;
    
    const isAdmin = user.role === 'Admin';

    // --- Corrected RBAC Filtering Logic ---
    const ADMIN_SCREENS: ScreenName[] = ['System Analytics', 'App Settings'];

    const visibleCategories = CATEGORIES.filter(item => item.roles.includes(user.role));
    const mainNavItems = NAV_ITEMS.filter(item => item.roles.includes(user.role));
    
    const adminNavItems = visibleCategories.filter(item => ADMIN_SCREENS.includes(item.name));
        
    const featureNavItems = visibleCategories.filter(item => 
        !ADMIN_SCREENS.includes(item.name) &&
        item.name !== 'See all' && 
        item.name !== 'Help & Support'
    );
    
    const supportNavItem = visibleCategories.find(item => item.name === 'Help & Support');


  return (
    <div className="h-screen bg-white shadow-md flex flex-col fixed w-64">
        <div className="flex items-center justify-center h-20 border-b px-4">
             <Logo className="h-9 w-9 text-indigo-500" />
             <span className="font-bold text-2xl ml-3 text-gray-800">CrewLink</span>
        </div>
      <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</h3>
            <div className="mt-2 space-y-1">
                {mainNavItems.map((item) => (
                <button
                    key={item.name}
                    onClick={() => onNavigate(item.name)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 text-left ${
                    activeScreen === item.name
                        ? 'bg-indigo-50 text-indigo-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                    <item.icon className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>{item.name}</span>
                </button>
                ))}
            </div>
        </div>

        {featureNavItems.length > 0 && (
          <div className="pt-4">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Features</h3>
              <div className="mt-2 space-y-1">
                  {featureNavItems.map((item) => (
                  <button
                      key={item.name}
                      onClick={() => onNavigate(item.name)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 text-left ${
                      activeScreen === item.name
                          ? 'bg-indigo-50 text-indigo-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                      <item.icon className="h-6 w-6 mr-3 flex-shrink-0" />
                      <span>{item.name}</span>
                  </button>
                  ))}
              </div>
          </div>
        )}
        
        {isAdmin && adminNavItems.length > 0 && (
          <div className="pt-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</h3>
            <div className="mt-2 space-y-1">
                {adminNavItems.map((item) => (
                <button
                    key={item.name}
                    onClick={() => onNavigate(item.name)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 text-left ${
                    activeScreen === item.name
                        ? 'bg-indigo-50 text-indigo-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                    <item.icon className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>{item.name}</span>
                </button>
                ))}
            </div>
          </div>
        )}
      </nav>
      <div className="px-4 py-4 border-t">
        {supportNavItem && (
            <button
                key={supportNavItem.name}
                onClick={() => onNavigate(supportNavItem.name)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 text-left ${
                activeScreen === supportNavItem.name
                    ? 'bg-indigo-50 text-indigo-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
                <supportNavItem.icon className="h-6 w-6 mr-3 flex-shrink-0" />
                <span>{supportNavItem.name}</span>
            </button>
        )}
        <button
            onClick={logout}
            className="w-full flex items-center mt-2 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-left"
        >
            <PowerIcon className="h-6 w-6 mr-3 flex-shrink-0 text-red-500" />
            <span className="text-red-500 font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNav;