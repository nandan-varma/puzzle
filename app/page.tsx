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

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
        });
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
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main>
      {user ? (
        <>
          <p>Welcome! {user.email}</p>
          <button type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link href="/login">
            <button type="button">Log In</button>
          </Link>
          <br></br>
          <Link href="/signup">
            <button type="button">Sign Up</button>
          </Link>
        </>
      )}
      <br></br>
      <p>Choose a game:</p>
      <Link href="/analytical">
        <button type="button">Word Search</button>
      </Link>
      <Link href="/speed">
        <button type="button">Whack-a-Mole</button>
      </Link>
      <Link href="/memory">
        <button type="button">Memory</button>
      </Link>
      <Link href="/logical">
        <button type="button">Tower of Hanoi</button>
      </Link>
      <Link href="/pingpong">
        <button type="button">Ping Pong</button>
      </Link>
    </main>
  );
}
