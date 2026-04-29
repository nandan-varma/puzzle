'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Card {
  value: string;
  flipped: boolean;
}

function shuffle<T>(array: readonly T[]): T[] {
  const shuffledArray: T[] = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledArray[i];
    const swapItem = shuffledArray[j];
    if (temp !== undefined && swapItem !== undefined) {
      shuffledArray[i] = swapItem;
      shuffledArray[j] = temp;
    }
  }
  return shuffledArray;
}

export default function Memory() {
  const router = useRouter();
  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const doubledCardValues = [...cardValues, ...cardValues];
  const shuffledCardValues = shuffle(doubledCardValues);

  const [cards, setCards] = useState<Card[]>(() =>
    shuffledCardValues.map((value) => ({ value, flipped: false }))
  );
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    if (startTime === null) {
      return;
    }
    const intervalId = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000);
    }, 100);
    return () => clearInterval(intervalId);
  }, [startTime]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.flipped)) {
      router.push('/analytical');
    }
  }, [cards, router]);

  const handleCardClick = (cardIndex: number) => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
    if (flippedCards.length === 2) {
      return;
    }

    const newCards = [...cards];
    const card = newCards[cardIndex];
    if (card === undefined) {
      return;
    }
    card.flipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const firstIndex = newFlippedCards[0];
      const secondIndex = newFlippedCards[1];
      if (firstIndex === undefined || secondIndex === undefined) {
        return;
      }
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard === undefined || secondCard === undefined) {
        return;
      }

      if (firstCard.value === secondCard.value) {
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const cardAtFirst = newCards[firstIndex];
          const cardAtSecond = newCards[secondIndex];
          if (cardAtFirst !== undefined) {
            cardAtFirst.flipped = false;
          }
          if (cardAtSecond !== undefined) {
            cardAtSecond.flipped = false;
          }
          setCards([...newCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const reset = () => {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const doubledCardValues = [...cardValues, ...cardValues];
    const shuffledCardValues = shuffle(doubledCardValues);
    setCards(shuffledCardValues.map((value) => ({ value, flipped: false })));
    setStartTime(null);
    setElapsedTime(0);
    setFlippedCards([]);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Memory</h1>
      <p style={{ marginBottom: '1rem', color: '#666' }}>Find all matching pairs</p>

      <div style={{ marginBottom: '1rem' }}>Time: {elapsedTime.toFixed(1)}s</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            style={{
              aspectRatio: '1',
              backgroundColor: card.flipped ? '#2980b9' : '#333',
              color: card.flipped ? '#fff' : '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              transform: card.flipped ? 'rotateY(180deg)' : 'rotateY(0)',
            }}
          >
            {card.flipped ? card.value : '?'}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={reset}
        style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}
      >
        Reset
      </button>

      <Link href="/" style={{ padding: '0.5rem 1rem' }}>
        Back to Home
      </Link>
    </div>
  );
}