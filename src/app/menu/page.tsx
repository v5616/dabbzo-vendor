'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface Dish {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isAvailable: boolean;
}

export default function Menu() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Simulate fetching menu data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setDishes([
        {
          id: '1',
          name: 'Butter Chicken',
          category: 'Lunch',
          price: 250,
          image: '/placeholder.jpg',
          isAvailable: true,
        },
        {
          id: '2',
          name: 'Paneer Tikka',
          category: 'Dinner',
          price: 200,
          image: '/placeholder.jpg',
          isAvailable: true,
        },
        {
          id: '3',
          name: 'Masala Dosa',
          category: 'Breakfast',
          price: 120,
          image: '/placeholder.jpg',
          isAvailable: false,
        },
        {
          id: '4',
          name: 'Samosa',
          category: 'Snacks',
          price: 30,
          image: '/placeholder.jpg',
          isAvailable: true,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleAvailability = (id: string) => {
    setDishes(dishes.map(dish => 
      dish.id === id ? { ...dish, isAvailable: !dish.isAvailable } : dish
    ));
  };

  const filteredDishes = filter === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.category.toLowerCase() === filter);

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Menu Management</h1>
            <Link 
              href="/menu/add" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add New Dish
            </Link>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Category Filter */}
          <div className="mt-6">
            <div className="sm:hidden">
              <label htmlFor="category-filter" className="sr-only">Select a category</label>
              <select
                id="category-filter"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {['all', 'breakfast', 'lunch', 'dinner', 'snacks'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`${
                      filter === category
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-500 hover:text-gray-700'
                    } px-3 py-2 font-medium text-sm rounded-md capitalize`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Dish Grid */}
          {loading ? (
            <div className="mt-6 text-center py-10">
              <p className="text-gray-500">Loading dishes...</p>
            </div>
          ) : filteredDishes.length === 0 ? (
            <div className="mt-6 text-center py-10 bg-white rounded-lg shadow">
              <p className="text-gray-500">No dishes found in this category.</p>
              <Link 
                href="/menu/add" 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add your first dish
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDishes.map((dish) => (
                <div key={dish.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Dish Image Placeholder</p>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{dish.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{dish.category}</p>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">₹{dish.price}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleAvailability(dish.id)}
                          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                            dish.isAvailable ? 'bg-indigo-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className="sr-only">Toggle availability</span>
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                              dish.isAvailable ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <span className="ml-2 text-sm text-gray-500">
                          {dish.isAvailable ? 'Available' : 'Sold Out'}
                        </span>
                      </div>
                      
                      <Link
                        href={`/menu/edit/${dish.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}