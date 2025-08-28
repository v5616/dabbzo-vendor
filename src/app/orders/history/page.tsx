'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'completed' | 'rejected' | 'cancelled';
  orderDate: string;
  deliveryAddress: string;
  paymentMethod: string;
  specialInstructions?: string;
}

export default function OrderHistory() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Simulate fetching orders
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: 'ORD001',
          customerName: 'Amit Sharma',
          customerPhone: '9876543210',
          items: [
            { id: '1', name: 'Paneer Butter Masala', quantity: 1, price: 180 },
            { id: '2', name: 'Butter Naan', quantity: 2, price: 30 }
          ],
          total: 240,
          status: 'completed',
          orderDate: '2023-06-15T10:30:00',
          deliveryAddress: '123, ABC Colony, Sector 15, Gurgaon',
          paymentMethod: 'Online Payment'
        },
        {
          id: 'ORD002',
          customerName: 'Priya Patel',
          customerPhone: '9876543211',
          items: [
            { id: '3', name: 'Veg Biryani', quantity: 1, price: 150 },
            { id: '4', name: 'Raita', quantity: 1, price: 30 }
          ],
          total: 180,
          status: 'completed',
          orderDate: '2023-06-14T13:45:00',
          deliveryAddress: '456, XYZ Society, Sector 10, Gurgaon',
          paymentMethod: 'Cash on Delivery',
          specialInstructions: 'Less spicy please'
        },
        {
          id: 'ORD003',
          customerName: 'Rahul Gupta',
          customerPhone: '9876543212',
          items: [
            { id: '5', name: 'Chole Bhature', quantity: 2, price: 120 }
          ],
          total: 240,
          status: 'rejected',
          orderDate: '2023-06-13T19:15:00',
          deliveryAddress: '789, PQR Apartments, Sector 22, Gurgaon',
          paymentMethod: 'Online Payment'
        },
        {
          id: 'ORD004',
          customerName: 'Neha Singh',
          customerPhone: '9876543213',
          items: [
            { id: '6', name: 'Dal Makhani', quantity: 1, price: 140 },
            { id: '7', name: 'Jeera Rice', quantity: 1, price: 90 }
          ],
          total: 230,
          status: 'completed',
          orderDate: '2023-06-12T12:30:00',
          deliveryAddress: '101, LMN Heights, Sector 30, Gurgaon',
          paymentMethod: 'Online Payment'
        },
        {
          id: 'ORD005',
          customerName: 'Vikram Malhotra',
          customerPhone: '9876543214',
          items: [
            { id: '8', name: 'Masala Dosa', quantity: 2, price: 100 },
            { id: '9', name: 'Filter Coffee', quantity: 2, price: 40 }
          ],
          total: 280,
          status: 'cancelled',
          orderDate: '2023-06-11T08:45:00',
          deliveryAddress: '202, EFG Residency, Sector 45, Gurgaon',
          paymentMethod: 'Cash on Delivery'
        }
      ];
      
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...orders];
    
    // Apply search term
    if (searchTerm) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm)
      );
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      result = result.filter(order => {
        const orderDate = new Date(order.orderDate);
        if (dateFilter === 'today') {
          return orderDate >= startOfDay;
        } else if (dateFilter === 'week') {
          return orderDate >= startOfWeek;
        } else if (dateFilter === 'month') {
          return orderDate >= startOfMonth;
        }
        return true;
      });
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(result);
  }, [orders, searchTerm, dateFilter, statusFilter]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Order History</h1>
            <button
              onClick={() => router.push('/orders')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Current Orders
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Filters */}
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Order ID, Customer name, Phone"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              {/* Date Filter */}
              <div>
                <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">Date Range</label>
                <select
                  id="date-filter"
                  name="date-filter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status-filter"
                  name="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Orders List */}
          <div className="mt-6">
            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Loading orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-10 bg-white shadow overflow-hidden sm:rounded-lg">
                <p className="text-gray-500">No orders found matching your filters.</p>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{order.customerName}</div>
                          <div className="text-xs">{order.customerPhone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.orderDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Order Details - {selectedOrder.id}
                    </h3>
                    <div className="mt-4">
                      <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Customer</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {selectedOrder.customerName} ({selectedOrder.customerPhone})
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Order Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {formatDate(selectedOrder.orderDate)}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Delivery Address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {selectedOrder.deliveryAddress}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {selectedOrder.paymentMethod}
                        </dd>
                      </div>
                      {selectedOrder.specialInstructions && (
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Special Instructions</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {selectedOrder.specialInstructions}
                          </dd>
                        </div>
                      )}
                      <div className="bg-white px-4 py-3 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 mb-2">Order Items</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {selectedOrder.items.map((item) => (
                              <li key={item.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                <div className="w-0 flex-1 flex items-center">
                                  <span className="ml-2 flex-1 w-0 truncate">
                                    {item.name} x {item.quantity}
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                        <div className="mt-4 text-right">
                          <span className="text-sm font-medium text-gray-500">Total: </span>
                          <span className="text-lg font-bold text-gray-900">₹{selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}