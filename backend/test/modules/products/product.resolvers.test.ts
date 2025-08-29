import { describe, it, expect, beforeEach, vi } from 'vitest';
import { productResolvers } from '../../../src/modules/products/product.resolvers.js';
import { products } from '../../../src/data/mockData.js';
import { calculateStatus } from '../../../src/types/status-type.js';

// Mock the products data
vi.mock('../../../src/data/mockData.js', () => ({
  products: [
    {
      id: '1',
      sku: 'SKU001',
      name: 'Test Product 1',
      stock: 10,
      demand: 5,
      warehouse: 'WH1',
      status: 'HEALTHY'
    },
    {
      id: '2',
      sku: 'SKU002',
      name: 'Test Product 2',
      stock: 3,
      demand: 5,
      warehouse: 'WH2',
      status: 'LOW_STOCK'
    },
  ]
}));

describe('Product Resolvers', () => {
  describe('Query.products', () => {
    it('should return all products when no filters are applied', () => {
      const result = productResolvers.Query.products(
        {}, 
        { page: 1, perPage: 10 }
      );
      
      expect(result.items).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it('should filter products by search term', () => {
      const result = productResolvers.Query.products(
        {},
        { page: 1, perPage: 10, search: 'Test Product 1' }
      );
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('Test Product 1');
    });

    it('should filter products by warehouse', () => {
      const result = productResolvers.Query.products(
        {},
        { page: 1, perPage: 10, warehouse: 'WH1' }
      );
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].warehouse).toBe('WH1');
    });

    it('should paginate results correctly', () => {
      const result = productResolvers.Query.products(
        {},
        { page: 1, perPage: 1 }
      );
      
      expect(result.items).toHaveLength(1);
      expect(result.totalPages).toBe(2);
    });
  });

  describe('Mutation.updateDemand', () => {
    it('should update product demand and recalculate status', () => {
      const result = productResolvers.Mutation.updateDemand(
        {},
        { id: '1', demand: 15 },
        {}
      );
      
      expect(result.demand).toBe(15);
      expect(result.status).toBe(calculateStatus(10, 15));
    });

    it('should throw error for non-existent product', () => {
      expect(() => {
        productResolvers.Mutation.updateDemand(
          {},
          { id: '999', demand: 15 },
          {}
        );
      }).toThrow('Product not found');
    });
  });

  describe('Mutation.transferStock', () => {
    it('should transfer stock between warehouses', () => {
      const result = productResolvers.Mutation.transferStock(
        {},
        { id: '1', from: 'WH1', to: 'WH2', qty: 5 },
        {}
      );
      
      expect(result.warehouse).toBe('WH2');
    });

    it('should throw error for insufficient stock', () => {
      // First, ensure the product is in the source warehouse
      const product = products.find(p => p.id === '1');
      if (product) {
        product.warehouse = 'WH1';
      }
      
      expect(() => {
        productResolvers.Mutation.transferStock(
          {},
          { id: '1', from: 'WH1', to: 'WH2', qty: 100 },
          {}
        );
      }).toThrow('Insufficient stock');
    });

    it('should throw error for wrong source warehouse', () => {
      expect(() => {
        productResolvers.Mutation.transferStock(
          {},
          { id: '1', from: 'WRONG_WH', to: 'WH2', qty: 1 },
          {}
        );
      }).toThrow('Product not in source warehouse');
    });
  });
});
