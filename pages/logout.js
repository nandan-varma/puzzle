import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth } from '@/lib/firebase'

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    const handleLogout = async () => {
      await auth.signOut()
      router.push('/')
    }

    handleLogout()
  }, [])

  return null
}

export default Logout
