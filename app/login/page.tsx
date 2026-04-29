'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { Button, Container, Input } from '@/components/ui';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '0.5rem' }}>Welcome Back</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Sign in to continue playing
      </p>

      <form onSubmit={handleLogin}>
        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={setEmail}
          disabled={isLoading}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={setPassword}
          disabled={isLoading}
          placeholder="Enter your password"
        />

        {error && (
          <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>
        )}

        <Button type="submit" disabled={isLoading} style={{ width: '100%' }}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280' }}>
        Don&apos;t have an account?{' '}
        <a href="/signup" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          Sign up
        </a>
      </p>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        <a href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
          Back to Home
        </a>
      </p>
    </Container>
  );
}