import { useState, useEffect, use } from 'react'
import { auth ,db } from '@/lib/firebase'
import Link  from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Clue from '@/components/clue'
import { getDatabase, get, ref, child, onValue} from 'firebase/database';


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
  useEffect(() => {
    const getClues = async () => {
        get(child(ref(db), `clues`)).then((snapshot) => {
        const clues = snapshot.val()
        console.log(clues);
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

    // getClues()
    // TODO
    // getProgress()
  }, [])
  const handleClueChange = (clueId, answer) => {
    // const userId = currentUser()
    const newProgress = { ...progress, [clueId]: answer }
    db.ref(`progress/${userId}`).set(newProgress)
    setProgress(newProgress)
  }

  return (
    <div>
      <Head>
        <title>Mystery Mansion</title>
      </Head>
      <div className="header">
        <h1>Mystery Mansion</h1>
        <img src="/mansion.jpg" alt="Mansion" />
      </div>
      <div className="description">
        <p>Welcome to the Mystery Mansion, where every door has a puzzle that needs to be solved to move forward. You are a detective who has been called in to investigate a strange disappearance in a mansion located on the outskirts of town. The owner of the mansion, Mr. Arthur Smith, had invited his closest friends and family members for a party, and when everyone arrived, they found that Mr. Smith was nowhere to be seen. The only clue to his whereabouts is a note that he had left behind, which reads: "Follow the path, solve the puzzles, and you shall find me."</p>
        <p>As you enter the mansion, you find yourself in a room with four doors, each with a puzzle that needs to be solved to open it. You know that each door will lead you to another room, and eventually, you will reach Mr. Smith. You need to solve all the puzzles to find him and solve the mystery of his disappearance.</p>
      </div>
      <div className="start-button">
      <Link role="button" className="fancy-button"href="/memory"><button>Start</button></Link>

      </div>
    </div>
    // <div>
    //   <p>userid : {userId}</p>
    //   <h1>Puzzle</h1>
    //   {clues.map(clue => (
    //     <Clue
    //       key={clue.id}
    //       id={clue.id}
    //       text={clue.text}
    //       answer={progress[clue.id]}
    //       onChange={handleClueChange}
    //     />
    //   ))}
    // </div>
  )
}

export default Puzzle
