import { ref, update, onValue, DataSnapshot } from 'firebase/database';
import { db } from './firebase';

interface AnalyticsData {
  [clueId: string]: number;
}

export const updateAnalytics = (userId: string, clueId: string, attempts: number): void => {
  const analyticsRef = ref(db, `analytics/${userId}`);
  update(analyticsRef, {
    [clueId]: attempts,
  });
};

export const getUserAnalytics = (userId: string): Promise<AnalyticsData | null> => {
  return new Promise((resolve, reject) => {
    const analyticsRef = ref(db, `analytics/${userId}`);
    onValue(
      analyticsRef,
      (snapshot: DataSnapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error: Error) => {
        reject(error);
      }
    );
  });
};

export const getAllUserAnalytics = (): Promise<AnalyticsData | null> => {
  return new Promise((resolve, reject) => {
    const analyticsRef = ref(db, 'analytics');
    onValue(
      analyticsRef,
      (snapshot: DataSnapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error: Error) => {
        reject(error);
      }
    );
  });
};