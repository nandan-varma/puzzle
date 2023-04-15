import { useState } from 'react'
import { db } from '@/lib/firebase'

const UserProgress = ({ user }) => {
  const [progress, setProgress] = useState(user.progress || {})

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setProgress((prevProgress) => ({
      ...prevProgress,
      [name]: value,
    }))
  }

  const handleSaveProgress = () => {
    db.ref(`users/${user.id}`).update({
      progress,
    })
  }

  return (
    <div>
      <h3>{user.displayName}</h3>
      {user.email}
      <br />
      <label>
        Clue 1:
        <input type="text" name="clue1" value={progress.clue1 || ''} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Clue 2:
        <input type="text" name="clue2" value={progress.clue2 || ''} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleSaveProgress}>Save Progress</button>
    </div>
  )
}

export default UserProgress
