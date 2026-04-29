import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mystery Mansion',
};

export default function Story() {
  return (
    <div>
      <div className="header">
        <h1>Mystery Mansion</h1>
        <img src="/mansion.jpg" alt="Mansion" />
      </div>
      <div className="description">
        <p>
          Welcome to the Mystery Mansion, where every door has a puzzle that
          needs to be solved to move forward. You are a detective who has been
          called in to investigate a strange disappearance in a mansion located
          on the outskirts of town. The owner of the mansion, Mr. Arthur Smith,
          had invited his closest friends and family members for a party, and
          when everyone arrived, they found that Mr. Smith was nowhere to be
          seen. The only clue to his whereabouts is a note that he had left
          behind, which reads: "Follow the path, solve the puzzles, and you
          shall find me."
        </p>
        <p>
          As you enter the mansion, you find yourself in a room with four doors,
          each with a puzzle that needs to be solved to open it. You know that
          each door will lead you to another room, and eventually, you will
          reach Mr. Smith. You need to solve all the puzzles to find him and
          solve the mystery of his disappearance.
        </p>
      </div>
      <div className="start-button">
        <Link href="/puzzle-1">
          <button type="button" className="button">Start</button>
        </Link>
      </div>
    </div>
  );
}