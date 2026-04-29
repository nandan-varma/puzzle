import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link role="button" className="fancy-button" href="/puzzle">
        <button type="button">Enter Game</button>
      </Link>

      <br></br>
      <Link role="button" className="fancy-button" href="/login">
        <button type="button">Log In</button>
      </Link>
      <br></br>
      <Link role="button" className="fancy-button" href="/signup">
        <button type="button">Sign Up</button>
      </Link>
      <br></br>
      <p>Jump into action instead ?</p>

      <Link role="button" className="fancy-button" href="/analytical">
        <button type="button">Analytical</button>
      </Link>
      <Link role="button" className="fancy-button" href="/speed">
        <button type="button">Speed</button>
      </Link>
      <Link role="button" className="fancy-button" href="/memory">
        <button type="button">Memory</button>
      </Link>
      <Link role="button" className="fancy-button" href="/logical">
        <button type="button">Logical</button>
      </Link>
      <Link role="button" className="fancy-button" href="/pingpong">
        <button type="button">Ping Pong</button>
      </Link>
    </main>
  );
}
