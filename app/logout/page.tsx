'use client';

import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '@/lib/firebase';

export default function Logout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut(auth);
    router.push('/');
  };

  return (
    <div>
      <h1>Logout</h1>
      <button type="button" onClick={handleSignOut} disabled={isLoading}>
        {isLoading ? 'Signing out...' : 'Sign Out'}
      </button>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
