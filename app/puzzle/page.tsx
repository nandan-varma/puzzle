'use client';

import { get, ref } from 'firebase/database';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';

interface UserProgress {
  level: number;
}

export default function Puzzle() {
  const [progress, setProgress] = useState<UserProgress>({ level: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const getUserId = (): string | null => {
    const user = auth.currentUser;
    return user?.uid ?? null;
  };

  const userId = getUserId();

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
        <br></br>
        <Link href="/signup">
          <button type="button">Sign Up</button>
        </Link>
        <br></br>
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
      <br></br>
      <Link href="/logout">
        <button type="button">Sign Out</button>
      </Link>
    </div>
  );
}
