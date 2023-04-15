import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <main>
            <br></br>
            404 : Page not found
            <br></br>
            <Link role="button" className="fancy-button" href="/"><button>Go To HomePage</button></Link>
        </main>
    )
}
