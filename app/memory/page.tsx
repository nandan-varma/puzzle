'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  return (
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
  );
}
