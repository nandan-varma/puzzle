import { useState, useEffect , React , Suspense } from 'react'
import { auth, db } from '@/lib/firebase'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getDatabase, get, set, ref, child, onValue } from 'firebase/database';



const Puzzle = () => {

  function getUserId() {
    const user = auth.currentUser
    if (user === null) {
      return null
    }
    return user.uid;
  }
  const levels = {
    1 : "/memory"
  }
  const [progress,setProgress] = useState({"level" : 0})
  const userId = getUserId()
  const progressRef = ref(db, `progress/${userId}`);
  const router = useRouter()
  const getProgress = async () => {
    const snapshot = await get(progressRef);
    setProgress(snapshot.val() || {"level" : 0})
  }
  console.log(progress)
  if (userId === null) {
    return (
      <>
        You need to login in order to play. <br></br>
        <Link role="button" className="fancy-button" href="/login"><button>Log In</button></Link>
        <br></br>or you can  <br></br>
        <Link role="button" className="fancy-button" href="/signup"><button>Sign Up</button></Link>
      </>
    )
  }

  useEffect(() => {
    set(progressRef, progress)
  }, [progress])

  router.push({ pathname: "/memory"});


  return (

    <div>
      <p> Redirecting you to next level</p><br></br>
      <p> If you are stuck in this page contact with this ID : {userId}</p>
      <button onClick={() => {setProgress({"level" : progress["level"]+1})}}>+++</button>
      <h1>Puzzle</h1>
    </div>
  )
}

export default Puzzle

