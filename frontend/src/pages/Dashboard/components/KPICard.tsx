import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value,
  className = "" 
}) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-3xl font-bold text-wasabi-600">{value}</p>
  </div>
);