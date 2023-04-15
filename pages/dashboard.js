import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import UserAnalytics from '@/components/userAnalytics'
import UserProgress from '@/components/userProgress'


const Dashboard = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await db.ref('users').once('value')
      const usersObject = snapshot.val()
      const usersArray = Object.entries(usersObject || {}).map(([key, value]) => {
        return {
          id: key,
          ...value,
        }
      })
      setUsers(usersArray)
    }
    // TODO
    // fetchUsers()
  }, [])

  const handleSignOut = () => {
    signOut(auth)
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleSignOut}>Sign out</button>
      <h2>User Analytics</h2>
      {users.map((user) => (
        <UserAnalytics key={user.id} user={user} />
      ))}
      <h2>User Progress</h2>
      {users.map((user) => (
        <UserProgress key={user.id} user={user} />
      ))}
    </div>
  )
}

export default Dashboard
