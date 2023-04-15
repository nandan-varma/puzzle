import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link  from 'next/link'
import { db } from "@/lib/firebase";
import { getDatabase, ref, child, push, update } from 'firebase/database';
function addClue(clue) {
  push(ref(db,"clues"),clue);
}
const newClue = {
  title: "Clue 1",
  description: "This is the first clue.",
  solved: false
};
addClue(newClue);
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
