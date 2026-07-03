'use client';

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Container } from '@/components/ui';
import { auth } from '@/lib/firebase';

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    await signOut(auth);
    router.push('/');
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '0.5rem' }}>Sign Out</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Are you sure you want to sign out?
      </p>

      <Button onClick={handle} disabled={loading}>
        {loading ? 'Signing out...' : 'Sign Out'}
      </Button>

      <p style={{ marginTop: '1rem' }}>
        <a href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
          Back to Home
        </a>
      </p>
    </Container>
  );
}
