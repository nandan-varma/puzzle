import { useState, useEffect, use } from 'react'
import { auth ,db } from '@/lib/firebase'
import Link  from 'next/link'
import { useRouter } from 'next/router'
import Clue from '@/components/clue'
import { getDatabase, ref, child, onValue} from 'firebase/database';


const Puzzle = () => {
  
  function getUserId(){
    const user = auth.currentUser
    if(user === null){
      return null
    }
    return user.uid;
  }
  const router = useRouter()
  const [clues, setClues] = useState([])
  const [progress, setProgress] = useState({})

  useEffect(() => {
    const getClues = async () => {
      onValue(ref(db,'clues'),(snapshot) => {
        const clues = snapshot.val()
        console.log(cluse);
        setClues(clues)
      })
    }

    const getProgress = async () => {
      // TODO
      // implement getUserId function to get the user's unique ID
      const snapshot = await db.ref(`progress/${userId}`).once('value')
      const progress = snapshot.val() || {}
      setProgress(progress)
    }

    getClues()
    // TODO
    // getProgress()
  }, [])

  const userId = getUserId()
  if(userId === null){
    return (
      <>
      You need to login in order to play. <br></br>
      <Link role="button" className="fancy-button"href="/login"><button>Log In</button></Link>
      <br></br>or you can  <br></br>
      <Link role="button" className="fancy-button"href="/signup"><button>Sign Up</button></Link>
      </>
    )
  }
  const handleClueChange = (clueId, answer) => {
    // const userId = currentUser()
    const newProgress = { ...progress, [clueId]: answer }
    db.ref(`progress/${userId}`).set(newProgress)
    setProgress(newProgress)
  }

  return (
    <div>
      <p>userid : {userId}</p>
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
