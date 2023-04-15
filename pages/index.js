import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Link  from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      

      <Link role="button" className="fancy-button"href="/puzzle"><button>Enter Game</button></Link>
      
      <br></br>
      <Link role="button" className="fancy-button"href="/login"><button>Log In</button></Link>
      <br></br>
      <Link role="button" className="fancy-button"href="/signup"><button>Sign Up</button></Link>
    </main>
  )
}
