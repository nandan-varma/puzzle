'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Container } from '@/components/ui';

function shuffle<T>(arr: T[]): T[] {
  const a: T[] = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i];
    const swap = a[j];
    if (temp !== undefined && swap !== undefined) {
      a[i] = swap;
      a[j] = temp;
    }
  }
  return a;
}

interface Card {
  value: string;
  flipped: boolean;
}

export default function Memory() {
  const router = useRouter();
  const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const [cards, setCards] = useState<Card[]>([]);
  const [start, setStart] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [flipped, setFlipped] = useState<number[]>([]);

  useEffect(() => {
    const shuffled = shuffle([...values, ...values]) as string[];
    setCards(shuffled.map((v) => ({ value: v, flipped: false })));
  }, []);

  useEffect(() => {
    if (start) {
      const id = setInterval(() => setTime((Date.now() - start) / 1000), 100);
      return () => clearInterval(id);
    }
    return undefined;
  }, [start]);

  useEffect(() => {
    if (cards.length && cards.every((c) => c.flipped)) {
      router.push('/analytical');
    }
  }, [cards, router]);

  const click = (i: number) => {
    if (flipped.length === 2) return;
    const currentCard = cards[i];
    if (!currentCard || currentCard.flipped) return;
    if (!start) setStart(Date.now());

    const next = cards.map((c, idx) => (idx === i ? { ...c, flipped: true } : c));
    setCards(next);

    const nextFlipped = [...flipped, i];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      const a = nextFlipped[0];
      const b = nextFlipped[1];
      const c1 = a !== undefined ? cards[a] : undefined;
      const c2 = b !== undefined ? cards[b] : undefined;
      if (c1 && c2 && c1.value === c2.value) {
        setFlipped([]);
      } else {
        setTimeout(() => {
          const reset = cards.map((c, idx) => (idx === a || idx === b ? { ...c, flipped: false } : c));
          setCards(reset);
          setFlipped([]);
        }, 800);
      }
    }
  };

  const reset = () => {
    const shuffled = shuffle([...values, ...values]) as string[];
    setCards(shuffled.map((v) => ({ value: v, flipped: false })));
    setStart(null);
    setTime(0);
    setFlipped([]);
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '0.25rem' }}>Memory</h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Find all matching pairs</p>

      <p style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
        Time: <strong>{time.toFixed(1)}s</strong>
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
          margin: '0 auto 2rem',
          width: '100%',
          maxWidth: '400px',
          aspectRatio: '1',
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => click(i)}
            style={{
              aspectRatio: '1',
              backgroundColor: card.flipped ? '#10b981' : '#374151',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(1rem, 5vw, 1.5rem)',
              fontWeight: 'bold',
              borderRadius: '12px',
              cursor: card.flipped ? 'default' : 'pointer',
            }}
          >
            {card.flipped ? card.value : '?'}
          </div>
        ))}
      </div>

      <Button onClick={reset} variant="secondary" style={{ marginRight: '1rem' }}>
        Reset
      </Button>
      <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
        Back to Home
      </Link>
    </Container>
  );
}