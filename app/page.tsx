'use client';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

interface User {
  uid: string;
  email: string | null;
}

const games = [
  { href: '/memory', name: 'Memory', desc: 'Find matching pairs' },
  { href: '/speed', name: 'Whack-a-Mole', desc: 'Hit the targets' },
  { href: '/analytical', name: 'Word Search', desc: 'Find hidden words' },
  { href: '/logical', name: 'Tower of Hanoi', desc: 'Solve the puzzle' },
  { href: '/pingpong', name: 'Ping Pong', desc: 'Classic paddle game' },
  { href: '/story', name: 'Story', desc: 'Mystery adventure' },
];

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ uid: currentUser.uid, email: currentUser.email });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (isLoading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Puzzle Game</h1>

      {user ? (
        <div style={{ marginBottom: '2rem' }}>
          <p>Welcome, {user.email}</p>
          <button
            type="button"
            onClick={handleSignOut}
            style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/login">
            <button type="button" style={{ marginRight: '0.5rem', padding: '0.5rem 1rem' }}>
              Log In
            </button>
          </Link>
          <Link href="/signup">
            <button type="button" style={{ padding: '0.5rem 1rem' }}>
              Sign Up
            </button>
          </Link>
        </div>
      )}

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Choose a Game</h2>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {games.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            style={{
              display: 'block',
              padding: '1.5rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#333',
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{game.name}</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>{game.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}