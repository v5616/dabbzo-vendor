'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  orderTime: string;
  specialInstructions?: string;
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'pending');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Simulate fetching orders data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD2023001',
          customer: {
            name: 'Rahul Sharma',
            phone: '+91 9876543210',
          },
          items: [
            { name: 'Butter Chicken', quantity: 1, price: 250 },
            { name: 'Naan', quantity: 2, price: 30 },
          ],
          total: 310,
          status: 'pending',
          orderTime: '2023-06-15T12:30:00',
          specialInstructions: 'Less spicy please',
        },
        {
          id: 'ORD2023002',
          customer: {
            name: 'Priya Patel',
            phone: '+91 9876543211',
          },
          items: [
            { name: 'Paneer Tikka', quantity: 1, price: 200 },
            { name: 'Roti', quantity: 3, price: 15 },
          ],
          total: 245,
          status: 'accepted',
          orderTime: '2023-06-15T12:15:00',
        },
        {
          id: 'ORD2023003',
          customer: {
            name: 'Amit Kumar',
            phone: '+91 9876543212',
          },
          items: [
            { name: 'Masala Dosa', quantity: 2, price: 120 },
          ],
          total: 240,
          status: 'completed',
          orderTime: '2023-06-15T11:30:00',
        },
        {
          id: 'ORD2023004',
          customer: {
            name: 'Sneha Gupta',
            phone: '+91 9876543213',
          },
          items: [
            { name: 'Samosa', quantity: 4, price: 30 },
            { name: 'Chai', quantity: 2, price: 20 },
          ],
          total: 160,
          status: 'rejected',
          orderTime: '2023-06-15T11:00:00',
          specialInstructions: 'Extra chutney',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Update URL when tab changes
    router.push(`/orders?tab=${activeTab}`, { scroll: false });
  }, [activeTab, router]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setRejectReason('');
  };

  const handleAcceptOrder = (orderId: string) => {
    // In a real app, this would be an API call
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
    closeModal();
  };

  const handleRejectOrder = (orderId: string) => {
    // In a real app, this would be an API call
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
    closeModal();
  };

  const handleCompleteOrder = (orderId: string) => {
    // In a real app, this would be an API call
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'completed' } : order
    ));
    closeModal();
  };

  const filteredOrders = orders.filter(order => order.status === activeTab);

  return (
    <>
      {/* Tabs */}
      <div className="mt-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {['pending', 'accepted', 'rejected', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {tab}
              {tab === 'pending' && (
                <span className="ml-2 py-0.5 px-2.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  {orders.filter(order => order.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="mt-6 text-center py-10">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="mt-6 text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500">No {activeTab} orders found.</p>
        </div>
      ) : (
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <li key={order.id}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-indigo-600 truncate">{order.id}</p>
                        <p className="ml-4 text-sm text-gray-500">
                          {new Date(order.orderTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <button
                          onClick={() => openOrderDetails(order)}
                          className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {order.customer.name} • {order.customer.phone}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>₹{order.total.toFixed(2)} • {order.items.length} items</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Order Details - {selectedOrder.id}
                    </h3>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Customer:</span> {selectedOrder.customer.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Phone:</span> {selectedOrder.customer.phone}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Order Time:</span> {new Date(selectedOrder.orderTime).toLocaleString()}
                      </p>
                      
                      {selectedOrder.specialInstructions && (
                        <div className="mt-2 p-2 bg-yellow-50 rounded-md">
                          <p className="text-sm text-yellow-800">
                            <span className="font-medium">Special Instructions:</span> {selectedOrder.specialInstructions}
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Order Items</h4>
                        <ul className="mt-2 divide-y divide-gray-200">
                          {selectedOrder.items.map((item, index) => (
                            <li key={index} className="py-2 flex justify-between">
                              <div className="flex">
                                <span className="text-sm text-gray-900">{item.quantity} x {item.name}</span>
                              </div>
                              <span className="text-sm text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between">
                          <span className="font-medium text-gray-900">Total</span>
                          <span className="font-medium text-gray-900">₹{selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {selectedOrder.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleAcceptOrder(selectedOrder.id)}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Accept Order
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const reasonElement = document.getElementById('reject-reason') as HTMLTextAreaElement;
                        if (reasonElement && reasonElement.style.display === 'none') {
                          reasonElement.style.display = 'block';
                        } else {
                          handleRejectOrder(selectedOrder.id);
                        }
                      }}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Reject Order
                    </button>
                    <div id="reject-reason" className="mt-3 w-full sm:mt-0" style={{ display: 'none' }}>
                      <textarea
                        placeholder="Reason for rejection"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        rows={2}
                      />
                    </div>
                  </>
                )}
                
                {selectedOrder.status === 'accepted' && (
                  <button
                    type="button"
                    onClick={() => handleCompleteOrder(selectedOrder.id)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Mark as Completed
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Orders() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Orders Management</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <Suspense fallback={<div>Loading orders...</div>}>
            <OrdersContent />
          </Suspense>
        </div>
      </div>
    </DashboardLayout>
  );
}