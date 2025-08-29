import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { SearchBar } from './components/SearchBar';
import { StatusFilter } from './components/StatusFilter';
import { KPICard } from './components/KPICard';
import { ProductTable } from './components/ProductTable';
import { GET_PRODUCTS, GET_KPIS } from '../../graphql/queries';
import type { DateRange } from '../../shared/types';
import { LineChartComponent } from './components/linechart';
import { WarehouseFilter } from './components/WarehouseFilter';

export const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [warehouseFilter, setWarehouseFilter] = useState('ALL');
  const [dateRange, setDateRange] = useState<DateRange>('7d');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    loading: productsLoading,
    data: productsData,
    refetch: refetchProducts
  } = useQuery(GET_PRODUCTS, {
    variables: {
      search: search || undefined,
      status: statusFilter !== 'ALL' ? statusFilter : undefined,
      warehouse: warehouseFilter !== 'ALL' ? warehouseFilter : undefined,
      page: currentPage,
      perPage: itemsPerPage
    },
  });

  const { loading: kpisLoading, data: kpisData, refetch: refetchKPIs } = useQuery(GET_KPIS, {
    variables: { range: dateRange },
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, warehouseFilter]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleWarehouseChange = (warehouse: string) => {
    setWarehouseFilter(warehouse);
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    refetchKPIs();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const products = productsData?.products?.items || [];
  const totalItems = productsData?.products?.total || 0;
  const totalPages = productsData?.products?.totalPages || 1;
  const kpis = kpisData?.kpis || [];

  // Calculate KPIs from products data
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
  const fillRate = totalDemand > 0 ? Math.round((totalStock / totalDemand) * 100) : 0;

  return (
    <div className="min-h-screen bg-wasabi-50">
      <header className="bg-wasabi-500 text-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">SupplySight</h1>
            <div className="flex space-x-2">
              {(['7d', '14d', '30d'] as DateRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => handleDateRangeChange(range)}
                  disabled={kpisLoading}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    dateRange === range 
                      ? 'bg-wasabi-600' 
                      : 'hover:bg-wasabi-400 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container flex flex-col gap-6 mx-auto px-4 py-6">
      
        {(productsLoading || kpisLoading) && (
          <div className="fixed inset-0 bg-wasabi-50 opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wasabi-500 mb-4"></div>
              <p className="text-gray-700">Loading data...</p>
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <SearchBar onSearch={handleSearch} disabled={productsLoading} />
            <StatusFilter value={statusFilter} onChange={handleStatusChange} disabled={productsLoading} />
            <WarehouseFilter value={warehouseFilter} onChange={handleWarehouseChange} disabled={productsLoading} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard 
            title="Total Stock" 
            value={productsLoading ? '...' : totalStock.toString()} 
            trend={productsLoading ? 'none' : 'up'} 
            loading={productsLoading}
          />
          <KPICard 
            title="Total Demand" 
            value={productsLoading ? '...' : totalDemand.toString()} 
            trend={productsLoading ? 'none' : 'down'} 
            loading={productsLoading}
          />
          <KPICard 
            title="Fill Rate" 
            value={productsLoading ? '...' : `${fillRate}%`} 
            trend={productsLoading ? 'none' : fillRate > 80 ? 'up' : 'down'}
            loading={productsLoading}
          />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <LineChartComponent data={kpis} />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <ProductTable
            products={products}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
