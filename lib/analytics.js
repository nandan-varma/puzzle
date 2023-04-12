import { db } from './firebase'

// Updates the analytics data for a specific user and clue
export const updateAnalytics = (userId, clueId, attempts) => {
  const analyticsRef = db.ref(`analytics/${userId}`)
  analyticsRef.update({
    [clueId]: attempts,
  })
}

// Retrieves the analytics data for a specific user
export const getUserAnalytics = (userId) => {
  return new Promise((resolve, reject) => {
    const analyticsRef = db.ref(`analytics/${userId}`)
    analyticsRef.on('value', (snapshot) => {
      const data = snapshot.val()
      resolve(data)
    }, (error) => {
      reject(error)
    })
  })
}

// Retrieves the analytics data for all users
export const getAllUserAnalytics = () => {
  return new Promise((resolve, reject) => {
    const analyticsRef = db.ref('analytics')
    analyticsRef.on('value', (snapshot) => {
      const data = snapshot.val()
      resolve(data)
    }, (error) => {
      reject(error)
    })
  })
}
