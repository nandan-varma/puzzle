'use client';

import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function Logout() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div>
      <h1>Logout</h1>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
      <Link href="/">Home</Link>
    </div>
  );
}
