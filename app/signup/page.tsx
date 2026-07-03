'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Container, Input } from '@/components/ui';
import { auth } from '@/lib/firebase';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '0.5rem' }}>Create Account</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Sign up to start playing
      </p>

      <form onSubmit={handleSignup}>
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
          placeholder="At least 6 characters"
        />

        {error && (
          <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>
        )}

        <Button type="submit" disabled={isLoading} style={{ width: '100%' }}>
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>

      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280' }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          Sign in
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
