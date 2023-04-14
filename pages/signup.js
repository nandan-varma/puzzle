import { useState } from 'react'
import { auth } from '../lib/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSignup = async (event) => {
    event.preventDefault()

    try {
      console.log(email)
      console.log(password)
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const uid = userCredential.user.uid;
        // ...
      })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Signup
