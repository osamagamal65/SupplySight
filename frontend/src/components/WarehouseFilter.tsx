// src/components/WarehouseFilter.tsx
import React from 'react';
import { GET_WAREHOUSES } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';

interface Warehouse {
  code: string;
  name: string;
}

interface WarehouseFilterProps {
  value: string;
  onChange: (value: string) => void;
  warehouses?: Warehouse[];
  className?: string;
}

export const WarehouseFilter: React.FC<WarehouseFilterProps> = ({ 
  value, 
  onChange, 
  className = "" 
}) => {
    const { data } = useQuery<{ warehouses: Warehouse[] }>(GET_WAREHOUSES);
    const warehouses = data?.warehouses || [];
  return (
  <select
    className={`block lg:max-w-[20%] w-full sm:w-48 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-wasabi-500 focus:border-wasabi-500 sm:text-sm rounded-md ${className}`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={!warehouses.length}
  >
    <option value="ALL">All Warehouses</option>
    {warehouses.map((warehouse) => (
      <option key={warehouse.code} value={warehouse.code}>
        {warehouse.name}
      </option>
    ))}
  </select>
    )};