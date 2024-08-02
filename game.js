document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');
    let score = 0;
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    const cardsArray = [
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'G', img: 'G' },
        { name: 'H', img: 'H' },
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'G', img: 'G' },
        { name: 'H', img: 'H' }
    ];

    resetButton.addEventListener('click', resetGame);

    function createBoard() {
        gameBoard.innerHTML = '';
        cardsArray.sort(() => 0.5 - Math.random());
        cardsArray.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const frontFace = document.createElement('div');
            frontFace.classList.add('front');

            const backFace = document.createElement('div');
            backFace.classList.add('back');
            backFace.textContent = card.img;

            cardInner.appendChild(frontFace);
            cardInner.appendChild(backFace);
            cardElement.appendChild(cardInner);

            gameBoard.appendChild(cardElement);

            cardElement.addEventListener('click', flipCard);
        });
        matchedPairs = 0;
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        updateScore();
        resetBoard();
        matchedPairs++;
        if (matchedPairs === cardsArray.length / 2) {
            setTimeout(resetGame, 1000);
        }
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1000);
    }

    function updateScore() {
        score += 10;
        scoreDisplay.textContent = score;
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function resetGame() {
        score = 0;
        scoreDisplay.textContent = score;
        createBoard();
    }

    createBoard();
});
