import React from 'react';

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onSearch, 
  placeholder = "Search...",
  className = "" 
}) => (
  <div className={`relative w-full lg:max-w-[60%] flex-1 ${className}`}>
    <div className="absolute inset-y-0 right-2 pl-3 flex items-center pointer-events-none">
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-wasabi-500 focus:border-wasabi-500 sm:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);