import React from 'react';

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ 
  value, 
  onChange, 
  className = "" 
}) => (
  <select
    className={`block lg:max-w-[20%]  w-full sm:w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-wasabi-500 focus:border-wasabi-500 sm:text-sm rounded-md ${className}`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="ALL">All Statuses</option>
    <option value="HEALTHY">Healthy</option>
    <option value="LOW">Low</option>
    <option value="CRITICAL">Critical</option>
  </select>
);