import React, { useState, useEffect, useRef } from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { ScreenName } from '../types';
import { useSearch } from '../hooks/useSearch';

interface HeaderProps {
  onNavigate: (screen: ScreenName) => void;
  unreadCount: number;
}

const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19L19 12L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 19L12 12L5 5" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SearchResultsDropdown: React.FC<{
    results: ReturnType<typeof useSearch>['results'];
    isLoading: boolean;
    query: string;
    onNavigate: (screen: ScreenName) => void;
    onClose: () => void;
}> = ({ results, isLoading, query, onNavigate, onClose }) => {
    
    const handleResultClick = (screen: ScreenName) => {
        onNavigate(screen);
        onClose();
    }
    
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-2 sm:mx-4 lg:mx-0">
            {isLoading && (
                <div className="p-4 text-center text-gray-500">Searching...</div>
            )}
            {!isLoading && results.length === 0 && query && (
                <div className="p-4 text-center text-gray-500">No results found.</div>
            )}
            {!isLoading && results.map((result) => (
                <button
                    key={result.id}
                    onClick={() => handleResultClick(result.source)}
                    className="w-full text-left p-3 hover:bg-gray-50 transition-colors flex items-start space-x-3 border-b last:border-b-0"
                >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                        <result.icon className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{result.title}</h3>
                        <p className="text-xs text-gray-600">{result.snippet}</p>
                    </div>
                </button>
            ))}
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ onNavigate, unreadCount }) => {
  const { query, setQuery, isLoading, results, performSearch, clearSearch } = useSearch();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        performSearch(query);
      }
    }, 300); // Debounce search input

    return () => clearTimeout(handler);
  }, [query, performSearch]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        clearSearch();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clearSearch]);

  return (
    <header ref={headerRef} className="bg-white shadow-sm sticky top-0 z-30">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          
          {/* Left Branding: Visible on mobile */}
          <div className="flex items-center lg:hidden">
            <Logo className="h-7 w-7 text-indigo-500" />
            <span className="font-bold text-xl text-gray-800 ml-2 hidden sm:block">CrewLink</span>
          </div>
          
          {/* Desktop Spacer */}
          <div className="hidden lg:block lg:flex-1"></div>

          {/* Search Bar: Takes remaining space on mobile, centered on desktop */}
          <div className="flex-1 lg:flex-none lg:w-full lg:max-w-md ml-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
            />
            {(query || isLoading) && (
              <div className="absolute top-full w-full mt-2">
                <SearchResultsDropdown 
                    results={results} 
                    isLoading={isLoading} 
                    query={query} 
                    onNavigate={onNavigate} 
                    onClose={clearSearch} 
                />
              </div>
            )}
          </div>
          
          {/* Actions & Desktop Spacer */}
          <div className="flex items-center justify-end ml-4 lg:flex-1">
            <button
              onClick={() => onNavigate('Notifications')}
              className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 block h-4 w-4 rounded-full text-white bg-red-500 text-xs font-medium text-center" style={{ fontSize: '0.65rem', lineHeight: '1rem' }}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;