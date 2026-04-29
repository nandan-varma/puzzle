import type { Metadata } from 'next';
import Link from 'next/link';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Mystery Mansion',
  description: 'Solve puzzles to find the missing person',
};

export default function Story() {
  return (
    <div>
      <h1>Mystery Mansion</h1>
      <p>
        Welcome to the Mystery Mansion, where every door has a puzzle that needs
        to be solved to move forward.
      </p>
      <p>
        You are a detective called to investigate a strange disappearance. The
        owner, Mr. Arthur Smith, vanished after inviting guests to a party. The
        only clue: &quot;Follow the path, solve the puzzles, and you shall find
        me.&quot;
      </p>
      <p>Solve all the puzzles to find Mr. Smith and solve the mystery!</p>
      <Link href="/memory">
        <button type="button">Start Game</button>
      </Link>
      <br></br>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
