import { Button, Container } from '@/components/ui';

export default function Story() {
  return (
    <Container>
      <h1 style={{ marginBottom: '0.5rem' }}>Mystery Mansion</h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        A mystery adventure awaits
      </p>

      <div style={{ textAlign: 'left', marginBottom: '2rem', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '1rem' }}>
          Welcome to the Mystery Mansion, where every door has a puzzle that needs to be
          solved to move forward.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          You are a detective called to investigate a strange disappearance. The owner, Mr. Arthur
          Smith, vanished after inviting guests to a party. The only clue: &quot;Follow the
          path, solve the puzzles, and you shall find me.&quot;
        </p>
        <p> Solve all the puzzles to find Mr. Smith!</p>
      </div>

      <a
        href="/memory"
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          backgroundColor: '#3b82f6',
          color: '#fff',
          textDecoration: 'none',
        }}
      >
        Start Game
      </a>

      <p style={{ marginTop: '2rem' }}>
        <a href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
          Back to Home
        </a>
      </p>
    </Container>
  );
}