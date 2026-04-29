'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';

interface UserProgress {
  level: number;
}

interface UserData {
  id: string;
  level: number;
}

export default function Puzzle() {
  const router = useRouter();
  const [progress, setProgress] = useState<UserProgress>({ level: 0 });

  const getUserId = (): string | null => {
    const user = auth.currentUser;
    return user?.uid ?? null;
  };

  const userId = getUserId();

  useEffect(() => {
    if (userId) {
      const progressRef = ref(db, `progress/${userId}`);
      get(progressRef).then((snapshot) => {
        setProgress(snapshot.val() || { level: 0 });
      });
    }
  }, [userId]);

  if (userId === null) {
    return (
      <>
        You need to login in order to play. <br></br>
        <Link role="button" className="fancy-button" href="/login">
          <button type="button">Log In</button>
        </Link>
        <br></br>or you can <br></br>
        <Link role="button" className="fancy-button" href="/signup">
          <button type="button">Sign Up</button>
        </Link>
      </>
    );
  }

  return (
    <div>
      <p> Redirecting you to next level</p>
      <br></br>
      <p> If you are stuck in this page contact with this ID : {userId}</p>
      <button
        type="button"
        onClick={() => {
          setProgress({ level: progress.level + 1 });
        }}
      >
        +++
      </button>
      <h1>Puzzle</h1>
    </div>
  );
}