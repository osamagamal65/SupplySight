import { warehouses } from '../../data/mockData.js';

export const warehouseResolvers = {
  Query: {
    warehouses: () => warehouses,
  },
};