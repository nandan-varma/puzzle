import { useState } from 'react'
import { auth } from '../lib/firebase'
import { useRouter } from 'next/router'
import {signInWithEmailAndPassword} from 'firebase/auth'
import Link  from 'next/link'


console.log(auth)

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await signInWithEmailAndPassword(auth , email, password).then((userCredential) => {
        router.push('/puzzle')
      })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link href="/signup"><button>Sign Up</button></Link>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login
