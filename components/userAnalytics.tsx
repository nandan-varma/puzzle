import { useEffect, useState } from 'react';
import { ref, onValue, off, DataSnapshot } from 'firebase/database';
import { db } from '@/lib/firebase';

interface User {
  id: string;
  displayName: string | null;
  email: string | null;
}

interface UserAnalyticsProps {
  user: User;
}

interface AnalyticsData {
  clue1?: number;
  clue2?: number;
}

const UserAnalytics = ({ user }: UserAnalyticsProps) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const userAnalyticsRef = ref(db, `analytics/${user.id}`);
    const unsubscribe = onValue(userAnalyticsRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      setAnalytics(data);
    });

    return () => {
      off(userAnalyticsRef);
    };
  }, [user.id]);

  if (!analytics) {
    return <div>Loading...</div>;
  }

  const totalAttempts = (analytics.clue1 || 0) + (analytics.clue2 || 0);

  return (
    <div>
      <h3>{user.displayName}</h3>
      {user.email}
      <br />
      <p>Clue 1 attempts: {analytics.clue1 || 0}</p>
      <p>Clue 2 attempts: {analytics.clue2 || 0}</p>
      <p>Total attempts: {totalAttempts}</p>
    </div>
  );
};

export default UserAnalytics;