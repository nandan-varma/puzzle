import { getDatabase, ref, get, update, Database } from 'firebase/database';
import { db } from './firebase';

interface Clue {
  id: string;
  solution: string;
}

interface Progress {
  [clueId: string]: string;
}

const generateClues = async (): Promise<Clue[] | null> => {
  const database = getDatabase();
  const snapshot = await get(ref(database, 'clues'));
  const clues = snapshot.val();
  return clues;
};

const getProgress = async (userId: string): Promise<Progress> => {
  const database = getDatabase();
  const snapshot = await get(ref(database, `progress/${userId}`));
  const progress = snapshot.val() || {};
  return progress;
};

const updateProgress = async (
  userId: string,
  clueId: string,
  answer: string
): Promise<void> => {
  const database = getDatabase();
  const newProgress: Progress = { [clueId]: answer };
  await update(ref(database, `progress/${userId}`), newProgress);
};

const checkSolution = async (userId: string): Promise<boolean> => {
  const progress = await getProgress(userId);
  const clues = await generateClues();

  if (!clues) {
    return false;
  }

  for (const clue of clues) {
    const answer = progress[clue.id];
    if (!answer || answer.toLowerCase() !== clue.solution.toLowerCase()) {
      return false;
    }
  }

  return true;
};

export { generateClues, getProgress, updateProgress, checkSolution };