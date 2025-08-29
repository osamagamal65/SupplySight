import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import type { Product } from '@shared/types';
import { TRANSFER_STOCK, UPDATE_DEMAND, GET_WAREHOUSES } from '../../graphql/queries';

type TabType = 'details' | 'updateDemand' | 'transferStock';

interface ProductDetailsSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onProductUpdate: (updatedProduct: Product) => void;
}

export const ProductDetailsSidebar: React.FC<ProductDetailsSidebarProps> = ({
    isOpen,
    onClose,
    product,
    onProductUpdate,
}) => {
    const [activeTab, setActiveTab] = useState<TabType>('details');
    const [demand, setDemand] = useState(0);
    const [transferQty, setTransferQty] = useState(1);
    const [transferTo, setTransferTo] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Handle click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                handleClose();
            }
        }

        // Add event listener when sidebar is open
        if (isOpen) {
            // Small delay to prevent immediate close when opening
            const timer = setTimeout(() => {
                setIsVisible(true);
                document.addEventListener('mousedown', handleClickOutside);
            }, 10);

            return () => {
                clearTimeout(timer);
                document.removeEventListener('mousedown', handleClickOutside);
            };
        } else {
            setIsVisible(false);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const resetForms = () => {
        setDemand(0);
        setTransferQty(1);
        setTransferTo('');
        setError('');
    };

    const handleTabChange = (tab: TabType) => {
        resetForms();
        setActiveTab(tab);
    };

    const handleClose = () => {
        resetForms();
        setActiveTab('details');
        onClose();
    };

    const [updateDemand] = useMutation(UPDATE_DEMAND, {
        onCompleted: (data: any) => {
            onProductUpdate(data.updateDemand);
            resetForms();
            setActiveTab('details');
        },
        onError: (err: any) => setError(err.message),
    });

    const [transferStock] = useMutation(TRANSFER_STOCK, {
        onCompleted: (data: any) => {
            onProductUpdate(data.transferStock);
            resetForms();
            setActiveTab('details');
        },
        onError: (err: any) => setError(err.message),
    });

    // Add query to fetch warehouses
    const { data: warehousesData, loading: warehousesLoading, error: warehousesError } = useQuery(GET_WAREHOUSES);

    if (!isOpen) return null;

    const handleUpdateDemand = (e: React.FormEvent) => {
        e.preventDefault();
        if (demand < 0) {
            setError('Demand cannot be negative');
            return;
        }
        updateDemand({ variables: { id: product.id, demand } });
    };

    const handleTransferStock = (e: React.FormEvent) => {
        e.preventDefault();
        if (!transferTo) {
            setError('Please select a destination warehouse');
            return;
        }
        if (transferQty <= 0 || transferQty > product.stock) {
            setError(`Quantity must be between 1 and ${product.stock}`);
            return;
        }
        if (transferTo === product.warehouse) {
            setError('Cannot transfer to the same warehouse');
            return;
        }
        transferStock({
            variables: {
                id: product.id,
                from: product.warehouse,
                to: transferTo,
                qty: transferQty,
            },
        });
    };

    const renderTransferTab = () => (
        <form onSubmit={handleTransferStock} className="space-y-4">
            <div>
                <p className="text-sm text-gray-500">
                    Transfer stock from <span className="font-medium">{product.warehouse}</span> to another warehouse.
                </p>
            </div>

            <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity to Transfer (Max: {product.stock})
                </label>
                <div className="mt-1">
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        max={product.stock}
                        value={transferQty}
                        onChange={(e) => setTransferQty(parseInt(e.target.value) || 1)}
                        className="shadow-sm focus:ring-wasabi-500 focus:border-wasabi-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                    Destination Warehouse
                </label>
                <select
                    id="destination"
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-wasabi-500 focus:border-wasabi-500 sm:text-sm rounded-md"
                    disabled={warehousesLoading}
                >
                    <option value="">
                        {warehousesLoading ? 'Loading warehouses...' : 'Select a warehouse'}
                    </option>
                    {warehousesLoading ? (
                        <option disabled>Loading...</option>
                    ) : warehousesData?.warehouses?.filter((warehouse: any) => warehouse.code !== product.warehouse).length === 0 ? (
                        <option disabled>No other warehouses available</option>
                    ) : (
                        warehousesData?.warehouses
                            ?.filter((warehouse: any) => warehouse.code !== product.warehouse)
                            .map((warehouse: any) => (
                                <option key={warehouse.code} value={warehouse.code}>
                                    {warehouse.name} ({warehouse.city}, {warehouse.country})
                                </option>
                            ))
                    )}
                </select>
                {warehousesError && (
                    <p className="mt-2 text-sm text-red-600">
                        Error loading warehouses: {warehousesError.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end space-x-3 pt-2">
                <button
                    type="button"
                    onClick={() => handleTabChange('details')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wasabi-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!transferTo || transferQty <= 0 || transferQty > product.stock || warehousesLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-wasabi-600 hover:bg-wasabi-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wasabi-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {warehousesLoading ? 'Loading...' : 'Transfer Stock'}
                </button>
            </div>
        </form>
    );

    return (
        <>
            {/* Backdrop */}
            <div className={`fixed inset-0 bg-wasabi-50 bg-opacity-50 z-40 transition-opacity duration-300 ${
                isVisible ? 'opacity-50' : 'opacity-0'
            }`} />
            
            {/* Sidebar */}
            <div 
                ref={sidebarRef}
                className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isVisible ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Product Details</h2>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <span className="sr-only">Close panel</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="mt-4 border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                                <button
                                    onClick={() => handleTabChange('details')}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details'
                                            ? 'border-wasabi-500 text-wasabi-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => handleTabChange('updateDemand')}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'updateDemand'
                                            ? 'border-wasabi-500 text-wasabi-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Update Demand
                                </button>
                                <button
                                    onClick={() => handleTabChange('transferStock')}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'transferStock'
                                            ? 'border-wasabi-500 text-wasabi-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Transfer Stock
                                </button>
                            </nav>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        {activeTab === 'details' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500">SKU: {product.sku}</p>
                                </div>

                                <div className="border-t border-b border-gray-200 py-6">
                                    <dl className="space-y-4">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt className="text-sm font-medium text-gray-500">Warehouse</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                {product.warehouse}
                                            </dd>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt className="text-sm font-medium text-gray-500">Current Stock</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                {product.stock} units
                                            </dd>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt className="text-sm font-medium text-gray-500">Current Demand</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                {product.demand} units
                                            </dd>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1 text-sm sm:col-span-2">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'HEALTHY'
                                                        ? 'bg-green-100 text-green-800'
                                                        : product.status === 'LOW'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        )}

                        {activeTab === 'updateDemand' && (
                            <form onSubmit={handleUpdateDemand} className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Update Demand</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Current demand: {product.demand} units
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="demand" className="block text-sm font-medium text-gray-700">
                                        New Demand
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="number"
                                            id="demand"
                                            min="0"
                                            value={demand}
                                            onChange={(e) => setDemand(parseInt(e.target.value) || 0)}
                                            className="shadow-sm focus:ring-wasabi-500 focus:border-wasabi-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Enter new demand"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => handleTabChange('details')}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wasabi-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-wasabi-600 hover:bg-wasabi-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wasabi-500"
                                    >
                                        Update Demand
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'transferStock' && renderTransferTab()}
                    </div>
                </div>
            </div>
        </>
    );
};
