'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login page
    router.push('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo512.png"
            alt="Dabbzo Logo"
            width={64}
            height={64}
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dabbzo Vendor Portal</h1>
        <p className="text-gray-500 mb-8">Redirecting to login page...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
      </div>
    </div>
  );
}
