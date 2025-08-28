'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data
  const [kitchenName, setKitchenName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [address, setAddress] = useState('');
  const [businessHours, setBusinessHours] = useState({
    monday: { open: '09:00', close: '18:00', isOpen: true },
    tuesday: { open: '09:00', close: '18:00', isOpen: true },
    wednesday: { open: '09:00', close: '18:00', isOpen: true },
    thursday: { open: '09:00', close: '18:00', isOpen: true },
    friday: { open: '09:00', close: '18:00', isOpen: true },
    saturday: { open: '09:00', close: '18:00', isOpen: true },
    sunday: { open: '09:00', close: '18:00', isOpen: false },
  });

  const cuisineOptions = [
    'North Indian', 'South Indian', 'Chinese', 'Italian', 
    'Continental', 'Fast Food', 'Healthy Food', 'Desserts',
    'Beverages', 'Bakery', 'Other'
  ];

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      router.push('/kyc');
      setLoading(false);
    }, 1500);
  };

  const updateBusinessHours = (day: string, field: string, value: string | boolean) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day as keyof typeof businessHours],
        [field]: value
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Set Up Your Kitchen Profile</h1>
            <p className="mt-2 text-gray-600">Step {step} of 3</p>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="kitchenName" className="block text-sm font-medium text-gray-700">Kitchen&apos;s Name</label>
                  <input
                    type="text"
                    id="kitchenName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={kitchenName}
                    onChange={(e) => setKitchenName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700">Cuisine Type</label>
                  <select
                    id="cuisineType"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={cuisineType}
                    onChange={(e) => setCuisineType(e.target.value)}
                    required
                  >
                    <option value="">Select Cuisine Type</option>
                    {cuisineOptions.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>
                
                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    id="address"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-2">Map Location</p>
                  <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Google Maps integration will be implemented here</p>
                  </div>
                </div>
                
                <div className="pt-5">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Step 3: Business Hours */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                  <p className="mt-1 text-sm text-gray-500">Set your kitchen&apos;s operating hours</p>
                  
                  <div className="mt-4 space-y-4">
                    {Object.entries(businessHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="w-24 font-medium capitalize">{day}</div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${day}-open`}
                            checked={hours.isOpen}
                            onChange={(e) => updateBusinessHours(day, 'isOpen', e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`${day}-open`} className="ml-2 text-sm text-gray-700">Open</label>
                        </div>
                        
                        {hours.isOpen && (
                          <>
                            <div className="flex items-center">
                              <label htmlFor={`${day}-open-time`} className="sr-only">Opening Time</label>
                              <input
                                type="time"
                                id={`${day}-open-time`}
                                value={hours.open}
                                onChange={(e) => updateBusinessHours(day, 'open', e.target.value)}
                                className="block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </div>
                            <span>to</span>
                            <div className="flex items-center">
                              <label htmlFor={`${day}-close-time`} className="sr-only">Closing Time</label>
                              <input
                                type="time"
                                id={`${day}-close-time`}
                                value={hours.close}
                                onChange={(e) => updateBusinessHours(day, 'close', e.target.value)}
                                className="block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-5">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {loading ? 'Saving...' : 'Save and Continue'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}