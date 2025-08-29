import { Product } from '../products/product.model.js';

interface KPI {
  date: string;
  stock: number;
  demand: number;
}

export function generateKPI(range: '7d' | '14d' | '30d'): KPI[] {
  const days = parseInt(range, 10);
  return Array(days).fill(0).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      stock: Math.floor(Math.random() * 1000),
      demand: Math.floor(Math.random() * 1000)
    };
  }).reverse(); // Sort from oldest to newest
}

export function calculateKPIs(products: Product[]) {
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
  const fillRate = totalDemand > 0 ? (totalStock / totalDemand) * 100 : 0;

  return {
    totalStock,
    totalDemand,
    fillRate: Math.round(fillRate * 100) / 100 // Round to 2 decimal places
  };
}