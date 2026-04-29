import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { db } from '@/lib/firebase';

interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  progress?: Record<string, string>;
}

interface UserProgressProps {
  user: User;
}

interface Progress {
  clue1?: string;
  clue2?: string;
}

const UserProgress = ({ user }: UserProgressProps) => {
  const [progress, setProgress] = useState<Progress>(user.progress || {});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProgress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProgress = () => {
    const userRef = ref(db, `users/${user.id}`);
    update(userRef, { progress });
  };

  return (
    <div>
      <h3>{user.displayName}</h3>
      {user.email}
      <br />
      <label>
        Clue 1:
        <input
          type="text"
          name="clue1"
          value={progress.clue1 || ''}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Clue 2:
        <input
          type="text"
          name="clue2"
          value={progress.clue2 || ''}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="button" onClick={handleSaveProgress}>Save Progress</button>
    </div>
  );
};

export default UserProgress;