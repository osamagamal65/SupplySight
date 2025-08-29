export type DateRange = '7d' | '14d' | '30d';

export interface Product {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
  status: 'HEALTHY' | 'LOW' | 'CRITICAL';
}

export interface Warehouse {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface KPI {
  date: string;
  stock: number;
  demand: number;
}