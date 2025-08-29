import { describe, it, expect, vi, beforeEach } from 'vitest';
import { kpiResolvers } from '../../../src/modules/kpis/kpi.resolvers.js';
import { generateKPI } from '../../../src/modules/kpis/kpi.service.js';

// Mock the KPI service
vi.mock('../../../src/modules/kpis/kpi.service.js', () => ({
  generateKPI: vi.fn()
}));

describe('KPI Resolvers', () => {
  const mockKpiData = [
    { date: '2025-01-15', stock: 100, demand: 80 },
    { date: '2025-01-14', stock: 95, demand: 85 }
  ];

  beforeEach(() => {
    vi.mocked(generateKPI).mockClear();
    vi.mocked(generateKPI).mockReturnValue(mockKpiData);
  });

  describe('Query.kpis', () => {
    it('should return KPI data for valid range', async () => {
      const result = await kpiResolvers.Query.kpis(
        {},
        { range: '7d' },
        {}
      );

      expect(generateKPI).toHaveBeenCalledWith('7d');
      expect(result).toEqual(mockKpiData);
    });

    it('should throw error for invalid range', async () => {
      expect(() => {
        kpiResolvers.Query.kpis(
          {},
          { range: 'invalid' },
          {}
        );
      }).toThrow('Invalid range. Must be one of: 7d, 14d, 30d');
    });

    it('should pass the correct range to generateKPI', async () => {
      const ranges = ['7d', '14d', '30d'] as const;
      
      for (const range of ranges) {
        await kpiResolvers.Query.kpis({}, { range }, {});
        expect(generateKPI).toHaveBeenCalledWith(range);
        vi.mocked(generateKPI).mockClear();
      }
    });
  });
});
