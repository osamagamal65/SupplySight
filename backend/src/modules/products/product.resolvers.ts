import { products } from '../../data/mockData.js';
import { calculateStatus, isStatusType } from '../../types/status-type.js';

interface PaginationInput {
  page: number;
  perPage: number;
  search?: string;
  status?: string;
  warehouse?: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export const productResolvers = {
  Query: {
    products: (
      _: any,
      { 
        page = 1, 
        perPage = 10, 
        search, 
        status, 
        warehouse 
      }: PaginationInput
    ): PaginatedResponse<typeof products[number]> => {
      // Apply filters
      let filteredProducts = [...products].map(p => ({
        ...p,
        status: p.status || calculateStatus(p.stock, p.demand)
      }));

      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(searchLower) ||
            p.sku.toLowerCase().includes(searchLower)
        );
      }

      if (warehouse) {
        filteredProducts = filteredProducts.filter((p) => p.warehouse === warehouse);
      }

      if (status && isStatusType(status)) {
        filteredProducts = filteredProducts.filter((p) => p.status === status);
      }

      // Calculate pagination
      const total = filteredProducts.length;
      const totalPages = Math.ceil(total / perPage);
      const currentPage = Math.max(1, Math.min(page, totalPages));
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;

      // Get paginated results
      const paginatedItems = filteredProducts.slice(startIndex, endIndex);

      return {
        items: paginatedItems,
        total,
        page: currentPage,
        perPage,
        totalPages,
      };
    },
  },
  Mutation: {
    updateDemand: (_: any, { id, demand }: { id: string; demand: number }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error('Product not found');
      product.demand = demand;
      return {...product, status: calculateStatus(product.stock, product.demand)};
    },
    transferStock: (
      _: any,
      { id, from, to, qty }: { id: string; from: string; to: string; qty: number }
    ) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error('Product not found');
      if (product.warehouse !== from) throw new Error('Product not in source warehouse');
      if (product.stock < qty) throw new Error('Insufficient stock');

      product.warehouse = to;
      return {...product, status: calculateStatus(product.stock, product.demand)};
    },
  },
};