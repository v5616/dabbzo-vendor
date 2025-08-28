'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KYC() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Document states
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [fssaiFile, setFssaiFile] = useState<File | null>(null);
  const [kitchenPhotos, setKitchenPhotos] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setKitchenPhotos(filesArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for document upload
    setTimeout(() => {
      router.push('/dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">KYC Verification</h1>
            <p className="mt-2 text-gray-600">Upload your documents for verification</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Aadhar Card */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Aadhar Card</label>
              <div className="mt-1 flex items-center">
                <div className="flex-grow">
                  <input
                    type="file"
                    className="sr-only"
                    id="aadhar-upload"
                    onChange={(e) => handleFileChange(e, setAadharFile)}
                    accept="image/*,.pdf"
                  />
                  <label
                    htmlFor="aadhar-upload"
                    className="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 flex items-center"
                  >
                    <span>Upload Aadhar Card</span>
                  </label>
                </div>
                {aadharFile && (
                  <span className="ml-3 text-sm text-gray-500">
                    {aadharFile.name}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">Upload a clear scan or photo of your Aadhar Card</p>
            </div>

            {/* PAN Card */}
            <div>
              <label className="block text-sm font-medium text-gray-700">PAN Card</label>
              <div className="mt-1 flex items-center">
                <div className="flex-grow">
                  <input
                    type="file"
                    className="sr-only"
                    id="pan-upload"
                    onChange={(e) => handleFileChange(e, setPanFile)}
                    accept="image/*,.pdf"
                  />
                  <label
                    htmlFor="pan-upload"
                    className="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 flex items-center"
                  >
                    <span>Upload PAN Card</span>
                  </label>
                </div>
                {panFile && (
                  <span className="ml-3 text-sm text-gray-500">
                    {panFile.name}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">Upload a clear scan or photo of your PAN Card</p>
            </div>

            {/* FSSAI License */}
            <div>
              <label className="block text-sm font-medium text-gray-700">FSSAI License</label>
              <div className="mt-1 flex items-center">
                <div className="flex-grow">
                  <input
                    type="file"
                    className="sr-only"
                    id="fssai-upload"
                    onChange={(e) => handleFileChange(e, setFssaiFile)}
                    accept="image/*,.pdf"
                  />
                  <label
                    htmlFor="fssai-upload"
                    className="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 flex items-center"
                  >
                    <span>Upload FSSAI License</span>
                  </label>
                </div>
                {fssaiFile && (
                  <span className="ml-3 text-sm text-gray-500">
                    {fssaiFile.name}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">Upload your FSSAI license or certificate</p>
            </div>

            {/* Kitchen Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Kitchen Photos</label>
              <div className="mt-1">
                <input
                  type="file"
                  className="sr-only"
                  id="kitchen-photos-upload"
                  onChange={handleMultipleFileChange}
                  accept="image/*"
                  multiple
                />
                <label
                  htmlFor="kitchen-photos-upload"
                  className="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 inline-block"
                >
                  <span>Upload Kitchen Photos</span>
                </label>
              </div>
              {kitchenPhotos.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500">{kitchenPhotos.length} photos selected</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {kitchenPhotos.map((photo, index) => (
                      <div key={index} className="h-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                        {photo.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="mt-1 text-sm text-gray-500">Upload at least 3 photos of your kitchen</p>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !aadharFile || !panFile || !fssaiFile || kitchenPhotos.length < 1}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Uploading...' : 'Submit Documents'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}