'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Card {
  value: string;
  flipped: boolean;
}

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
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
    if (startTime) {
      const intervalId = setInterval(() => {
        setElapsedTime((Date.now() - startTime) / 1000);
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [startTime]);

  useEffect(() => {
    if (cards.every((card) => card.flipped)) {
      router.push('/analytical');
    }
  }, [cards, router]);

  const handleCardClick = (cardIndex: number) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    if (flippedCards.length === 2) {
      return;
    }

    const newCards = [...cards];
    newCards[cardIndex].flipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const firstCard = cards[newFlippedCards[0]];
      const secondCard = cards[newFlippedCards[1]];

      if (firstCard.value === secondCard.value) {
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          newCards[newFlippedCards[0]].flipped = false;
          newCards[newFlippedCards[1]].flipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <>
      <div className="game-container">
        <div>Time: {elapsedTime.toFixed(1)}s</div>
        <div className="game-board">
          {cards.map((card, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              className={`card ${card.flipped ? '' : 'flipped'}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-front">{card.value}</div>
              <div className="card-back"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}