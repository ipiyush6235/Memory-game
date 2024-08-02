document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');
    let score = 0;
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    const cards = [
        '🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉',
        '🍒', '🍒', '🍍', '🍍', '🥝', '🥝', '🍓', '🍓'
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffle(cards);
        gameBoard.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = card;
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        const card = this;
        if (card === firstCard) return;

        card.classList.add('flipped');
        card.textContent = card.dataset.value;

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        checkMatch();
    }

    function checkMatch() {
        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            score++;
            scoreDisplay.textContent = score;
            resetBoard();
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                firstCard.textContent = '';
                secondCard.classList.remove('flipped');
                secondCard.textContent = '';
                resetBoard();
            }, 1000);
        }
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    resetButton.addEventListener('click', () => {
        score = 0;
        scoreDisplay.textContent = score;
        createBoard();
    });

    createBoard();
});
