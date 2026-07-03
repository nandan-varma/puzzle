'use client';

import { signOut } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';

export default function Puzzle() {
  const [progress, setProgress] = useState({ level: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const userId = auth.currentUser?.uid ?? null;

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const progressRef = ref(db, `progress/${userId}`);
    get(progressRef).then((snapshot) => {
      setProgress(snapshot.val() || { level: 0 });
      setIsLoading(false);
    });
  }, [userId]);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (userId === null) {
    return (
      <div>
        <h1>Please Login</h1>
        <p>Login to track your progress</p>
        <Link href="/login">
          <button type="button">Log In</button>
        </Link>
        <br />
        <Link href="/signup">
          <button type="button">Sign Up</button>
        </Link>
        <br />
        <Link href="/">Browse Games (No Progress)</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Progress</h1>
      <p>Current Level: {progress.level}</p>
      <p>Keep playing games to level up!</p>
      <Link href="/">
        <button type="button">Play Games</button>
      </Link>
      <br />
      <button type="button" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
}
