import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateKPI, calculateKPIs } from '../../../src/modules/kpis/kpi.service.js';

describe('KPI Service', () => {
  // Mock Date to ensure consistent test results
  beforeEach(() => {
    const mockDate = new Date('2025-01-15T12:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('generateKPI', () => {
    it('should generate KPI data for 7 days', () => {
      const result = generateKPI('7d');
      
      expect(result).toHaveLength(7);
      expect(result[0]).toHaveProperty('date');
      expect(result[0]).toHaveProperty('stock');
      expect(result[0]).toHaveProperty('demand');
      
      // Check if dates are in correct order (oldest first)
      const dates = result.map(r => new Date(r.date).getTime());
      const sortedDates = [...dates].sort((a, b) => a - b);
      expect(dates).toEqual(sortedDates);
    });

    it('should generate KPI data for 14 days', () => {
      const result = generateKPI('14d');
      expect(result).toHaveLength(14);
    });

    it('should generate KPI data for 30 days', () => {
      const result = generateKPI('30d');
      expect(result).toHaveLength(30);
    });
  });

  describe('calculateKPIs', () => {
    it('should calculate correct KPIs for empty products array', () => {
      const result = calculateKPIs([]);
      
      expect(result).toEqual({
        totalStock: 0,
        totalDemand: 0,
        fillRate: 0
      });
    });

    it('should calculate correct KPIs for products', () => {
      const mockProducts = [
        { id: '1', stock: 10, demand: 5 } as any,
        { id: '2', stock: 20, demand: 10 } as any,
      ];
      
      const result = calculateKPIs(mockProducts);
      
      expect(result.totalStock).toBe(30);
      expect(result.totalDemand).toBe(15);
      expect(result.fillRate).toBe(200); // (30/15)*100 = 200
    });

    it('should handle zero demand case', () => {
      const mockProducts = [
        { id: '1', stock: 10, demand: 0 } as any,
      ];
      
      const result = calculateKPIs(mockProducts);
      
      expect(result.fillRate).toBe(0);
    });
  });
});
