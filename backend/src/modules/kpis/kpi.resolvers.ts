import { generateKPI } from './kpi.service.js';

export const kpiResolvers = {
  Query: {
    kpis: (_: any, { range }: { range: string }) => {
      if (!['7d', '14d', '30d'].includes(range)) {
        throw new Error('Invalid range. Must be one of: 7d, 14d, 30d');
      }
      return generateKPI(range as '7d' | '14d' | '30d');
    },
  },
};