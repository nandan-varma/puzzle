import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'

const UserAnalytics = ({ user }) => {
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    const userAnalyticsRef = db.ref(`analytics/${user.id}`)
    userAnalyticsRef.on('value', (snapshot) => {
      const data = snapshot.val()
      setAnalytics(data)
    })

    return () => {
      userAnalyticsRef.off('value')
    }
  }, [user.id])

  if (!analytics) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>{user.displayName}</h3>
      {user.email}
      <br />
      <p>Clue 1 attempts: {analytics.clue1 || 0}</p>
      <p>Clue 2 attempts: {analytics.clue2 || 0}</p>
      <p>Total attempts: {analytics.clue1 + analytics.clue2 || 0}</p>
    </div>
  )
}

export default UserAnalytics
