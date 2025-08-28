'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface VendorProfile {
  name: string;
  email: string;
  phone: string;
  kitchenName: string;
  cuisineType: string;
  address: string;
  fssaiNumber: string;
  businessHours: {
    [key: string]: {
      open: boolean;
      startTime: string;
      endTime: string;
    }
  };
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    accountName: string;
    bankName: string;
  };
}

export default function Profile() {
  const [profile, setProfile] = useState<VendorProfile>({
    name: '',
    email: '',
    phone: '',
    kitchenName: '',
    cuisineType: '',
    address: '',
    fssaiNumber: '',
    businessHours: {
      monday: { open: true, startTime: '09:00', endTime: '21:00' },
      tuesday: { open: true, startTime: '09:00', endTime: '21:00' },
      wednesday: { open: true, startTime: '09:00', endTime: '21:00' },
      thursday: { open: true, startTime: '09:00', endTime: '21:00' },
      friday: { open: true, startTime: '09:00', endTime: '21:00' },
      saturday: { open: true, startTime: '09:00', endTime: '21:00' },
      sunday: { open: true, startTime: '09:00', endTime: '21:00' },
    },
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      accountName: '',
      bankName: '',
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<VendorProfile | null>(null);

  // Simulate fetching profile data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setProfile({
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        kitchenName: 'Rajesh\'s Kitchen',
        cuisineType: 'North Indian, Punjabi',
        address: '123, ABC Colony, Sector 15, Gurgaon, Haryana - 122001',
        fssaiNumber: '12345678901234',
        businessHours: {
          monday: { open: true, startTime: '09:00', endTime: '21:00' },
          tuesday: { open: true, startTime: '09:00', endTime: '21:00' },
          wednesday: { open: true, startTime: '09:00', endTime: '21:00' },
          thursday: { open: true, startTime: '09:00', endTime: '21:00' },
          friday: { open: true, startTime: '09:00', endTime: '21:00' },
          saturday: { open: true, startTime: '10:00', endTime: '22:00' },
          sunday: { open: true, startTime: '10:00', endTime: '22:00' },
        },
        bankDetails: {
          accountNumber: '1234567890',
          ifscCode: 'HDFC0001234',
          accountName: 'Rajesh Kumar',
          bankName: 'HDFC Bank',
        }
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({...profile});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(null);
  };

  const handleSave = () => {
    if (!editedProfile) return;
    
    // In a real app, this would be an API call
    setLoading(true);
    setTimeout(() => {
      setProfile(editedProfile);
      setIsEditing(false);
      setEditedProfile(null);
      setLoading(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editedProfile) return;
    
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      const parentKey = parent as keyof VendorProfile;
      const parentObj = editedProfile[parentKey] as Record<string, any>;
      
      setEditedProfile({
        ...editedProfile,
        [parent]: {
          ...parentObj,
          [child]: value
        }
      });
    } else {
      setEditedProfile({
        ...editedProfile,
        [name]: value
      });
    }
  };

  const handleBusinessHoursChange = (day: string, field: string, value: any) => {
    if (!editedProfile) return;
    
    setEditedProfile({
      ...editedProfile,
      businessHours: {
        ...editedProfile.businessHours,
        [day]: {
          ...editedProfile.businessHours[day],
          [field]: field === 'open' ? value : value
        }
      }
    });
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels: {[key: string]: string} = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Loading profile...</p>
            </div>
          ) : (
            <div className="mt-6">
              {/* Profile Header */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{profile.kitchenName}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{profile.cuisineType}</p>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {['basic', 'business', 'bank'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                        ${activeTab === tab
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                      `}
                    >
                      {tab === 'basic' && 'Basic Information'}
                      {tab === 'business' && 'Business Hours'}
                      {tab === 'bank' && 'Bank Details'}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                {/* Basic Information */}
                {activeTab === 'basic' && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={editedProfile?.name || ''}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            profile.name
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={editedProfile?.email || ''}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            profile.email
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phone"
                              value={editedProfile?.phone || ''}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            profile.phone
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Kitchen name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <input
                              type="text"
                              name="kitchenName"
                              value={editedProfile?.kitchenName || ''}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            profile.kitchenName
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Cuisine type</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <input
                              type="text"
                              name="cuisineType"
                              value={editedProfile?.cuisineType || ''}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            profile.cuisineType
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <textarea
                              name="address"
                              value={editedProfile?.address || ''}
                              onChange={handleChange}
                              rows={3}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            profile.address
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">FSSAI Number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <input
                              type="text"
                              name="fssaiNumber"
                              value={editedProfile?.fssaiNumber || ''}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            profile.fssaiNumber
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}
                
                {/* Business Hours */}
                {activeTab === 'business' && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <div className="sm:divide-y sm:divide-gray-200">
                      {days.map((day) => (
                        <div key={day} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">{dayLabels[day]}</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {isEditing ? (
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`open-${day}`}
                                    checked={editedProfile?.businessHours[day].open}
                                    onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                  />
                                  <label htmlFor={`open-${day}`} className="ml-2 block text-sm text-gray-900">
                                    Open
                                  </label>
                                </div>
                                
                                {editedProfile?.businessHours[day].open && (
                                  <>
                                    <div>
                                      <label htmlFor={`start-${day}`} className="block text-sm text-gray-700">
                                        From
                                      </label>
                                      <input
                                        type="time"
                                        id={`start-${day}`}
                                        value={editedProfile?.businessHours[day].startTime}
                                        onChange={(e) => handleBusinessHoursChange(day, 'startTime', e.target.value)}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor={`end-${day}`} className="block text-sm text-gray-700">
                                        To
                                      </label>
                                      <input
                                        type="time"
                                        id={`end-${day}`}
                                        value={editedProfile?.businessHours[day].endTime}
                                        onChange={(e) => handleBusinessHoursChange(day, 'endTime', e.target.value)}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            ) : (
                              <div>
                                {profile.businessHours[day].open ? (
                                  <span>
                                    {profile.businessHours[day].startTime} - {profile.businessHours[day].endTime}
                                  </span>
                                ) : (
                                  <span className="text-red-500">Closed</span>
                                )}
                              </div>
                            )}
                          </dd>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Bank Details */}
                {activeTab === 'bank' && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Account Holder Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <input
                              type="text"
                              name="bankDetails.accountName"
                              value={editedProfile?.bankDetails.accountName || ''}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            profile.bankDetails.accountName
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <input
                              type="text"
                              name="bankDetails.bankName"
                              value={editedProfile?.bankDetails.bankName || ''}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            profile.bankDetails.bankName
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <input
                              type="text"
                              name="bankDetails.accountNumber"
                              value={editedProfile?.bankDetails.accountNumber || ''}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            `XXXX${profile.bankDetails.accountNumber.slice(-4)}`
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">IFSC Code</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {isEditing ? (
                            <input
                              type="text"
                              name="bankDetails.ifscCode"
                              value={editedProfile?.bankDetails.ifscCode || ''}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          ) : (
                            profile.bankDetails.ifscCode
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}