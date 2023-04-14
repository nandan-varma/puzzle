import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link  from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      
      <Link href="/puzzle"><button>Enter Game</button></Link>
      
      <br></br>
      <Link href="/login"><button>Log In</button></Link>
      <br></br>
      <Link href="/signup"><button>Sign Up</button></Link>
    </main>
  )
}
