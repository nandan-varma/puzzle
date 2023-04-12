import { useState, useEffect } from 'react'
import { auth } from './firebase'

export const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [])

  const signUp = async (email, password) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }

  return { user, signUp, login, logout }
}
