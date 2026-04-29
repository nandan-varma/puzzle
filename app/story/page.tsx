import Link from 'next/link';

export default function Story() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Mystery Mansion</h1>
      <p style={{ marginBottom: '1rem' }}>
        Welcome to the Mystery Mansion, where every door has a puzzle
        that needs to be solved to move forward.
      </p>
      <p style={{ marginBottom: '1rem' }}>
        You are a detective called to investigate a strange disappearance.
        The owner, Mr. Arthur Smith, vanished after inviting guests
        to a party. The only clue: &quot;Follow the path, solve the puzzles,
        and you shall find me.&quot;
      </p>
      <p style={{ marginBottom: '2rem' }}>
        Solve all the puzzles to find Mr. Smith!
      </p>

      <Link href="/memory">
        <button type="button" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
          Start Game
        </button>
      </Link>

      <p style={{ marginTop: '2rem' }}>
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
}