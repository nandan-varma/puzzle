import { useState, useEffect } from "react";
import GameBoard from "@/components/gameboard";
import { useRouter } from "next/router";
function shuffle(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export async function getServerSideProps({ context }) {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const doubleCardValues = [...cardValues, ...cardValues];
    const shuffledArray = shuffle(doubleCardValues);

    // Pass data to the page via props
    return { props: { shuffledArray } };
}

const MemoryGamePage = ({ shuffledArray }) => {
    const router = useRouter();
    const [cards, setCards] = useState(() => {
        const shuffledCardValues = shuffledArray
        return shuffledCardValues.map((value) => ({ value, flipped: true }));
    });
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
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
            // TODO game completed
            router.push({ pathname:'/analytical'});
        }
    }, [cards]);
    const [flippedCards, setFlippedCards] = useState([]);


    const handleCardClick = (cardIndex) => {
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
                // cards match
                
                setFlippedCards([]);
            } else {
                // cards do not match
                setTimeout(() => {
                    newCards[newFlippedCards[0]].flipped = false;
                    newCards[newFlippedCards[1]].flipped = false;
                    setCards(newCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <>
        <div  className="game-container">
            <div>Time: {elapsedTime.toFixed(1)}s</div>
        <div className="game-board">
            <GameBoard cards={cards} onCardClick={handleCardClick} />

        </div>
        </div>
        </>
    );
};

export default MemoryGamePage;