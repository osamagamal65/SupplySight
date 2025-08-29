import { StatusType, calculateStatus } from '../../types/status-type.js';

export interface Product {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
  status?: StatusType;
}

