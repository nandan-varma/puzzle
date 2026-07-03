'use client';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Card, Container, GameCard } from '@/components/ui';
import { auth } from '@/lib/firebase';

interface User {
  uid: string;
  email: string | null;
}

const games = [
  {
    href: '/memory',
    name: 'Memory',
    desc: 'Find matching pairs',
    color: '#10b981',
  },
  {
    href: '/speed',
    name: 'Whack-a-Mole',
    desc: 'Hit the targets',
    color: '#f59e0b',
  },
  {
    href: '/analytical',
    name: 'Word Search',
    desc: 'Find hidden words',
    color: '#3b82f6',
  },
  {
    href: '/logical',
    name: 'Tower of Hanoi',
    desc: 'Solve the puzzle',
    color: '#8b5cf6',
  },
  {
    href: '/pingpong',
    name: 'Ping Pong',
    desc: 'Classic paddle',
    color: '#ec4899',
  },
  {
    href: '/story',
    name: 'Story',
    desc: 'Mystery adventure',
    color: '#ef4444',
  },
];

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(
        currentUser ? { uid: currentUser.uid, email: currentUser.email } : null
      );
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (isLoading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Brain Games</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Challenge your mind with fun puzzles
      </p>

      {user ? (
        <Card style={{ marginBottom: '2rem', backgroundColor: '#f0f9ff' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Welcome back, <strong>{user.email}</strong>
          </p>
          <Button onClick={handleSignOut} variant="secondary">
            Sign Out
          </Button>
        </Card>
      ) : (
        <Card style={{ marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}>Sign in to track your progress</p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/login" style={{ flex: 1, textAlign: 'center' }}>
              <Button>Sign In</Button>
            </Link>
            <Link href="/signup" style={{ flex: 1, textAlign: 'center' }}>
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </Card>
      )}

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
        Choose a Game
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
        }}
      >
        {games.map((game) => (
          <GameCard key={game.href} {...game} />
        ))}
      </div>
    </Container>
  );
}
