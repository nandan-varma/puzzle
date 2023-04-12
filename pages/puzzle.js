import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import Clue from '../components/clue'
import {currentUser} from 'firebase/auth'

const Puzzle = () => {
  const [clues, setClues] = useState([])
  const [progress, setProgress] = useState({})

  useEffect(() => {
    const getClues = async () => {
      const snapshot = await db.ref('clues').once('value')
      const clues = snapshot.val()
      setClues(clues)
    }

    const getProgress = async () => {
      // const userId = getUserId() 
      // TODO
      // implement getUserId function to get the user's unique ID
      const snapshot = await db.ref(`progress/${userId}`).once('value')
      const progress = snapshot.val() || {}
      setProgress(progress)
    }

    // getClues()
    // TODO
    // getProgress()
  }, [])

  const handleClueChange = (clueId, answer) => {
    // const userId = getUserId()
    const userId = currentUser()
    const newProgress = { ...progress, [clueId]: answer }
    db.ref(`progress/${userId}`).set(newProgress)
    setProgress(newProgress)
  }

  return (
    <div>
      <h1>Puzzle</h1>
      {clues.map(clue => (
        <Clue
          key={clue.id}
          id={clue.id}
          text={clue.text}
          answer={progress[clue.id]}
          onChange={handleClueChange}
        />
      ))}
    </div>
  )
}

export default Puzzle
