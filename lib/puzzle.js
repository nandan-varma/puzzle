import { db } from './firebase'

const generateClues = async () => {
  const snapshot = await db.ref('clues').once('value')
  const clues = snapshot.val()
  return clues
}

const getProgress = async (userId) => {
  const snapshot = await db.ref(`progress/${userId}`).once('value')
  const progress = snapshot.val() || {}
  return progress
}

const updateProgress = async (userId, clueId, answer) => {
  const newProgress = { [clueId]: answer }
  await db.ref(`progress/${userId}`).update(newProgress)
}

const checkSolution = async (userId) => {
  const progress = await getProgress(userId)
  const clues = await generateClues()

  for (const clue of clues) {
    const answer = progress[clue.id]
    if (!answer || answer.toLowerCase() !== clue.solution.toLowerCase()) {
      return false
    }
  }

  return true
}

export { generateClues, getProgress, updateProgress, checkSolution }
