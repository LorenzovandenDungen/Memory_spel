const cardsArray = [
    { name: 'cat', img: 'images/cat.png' },
    { name: 'flower', img: 'images/flower.png' },
    { name: 'soccer', img: 'images/soccer.png' },
    { name: 'sun', img: 'images/sun.png' },
    { name: 'apple', img: 'images/apple.png' },
    { name: 'star', img: 'images/star.png' }
];

let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

const board = document.getElementById('board');
const player1Score = document.getElementById('score1');
const player2Score = document.getElementById('score2');
const restartButton = document.getElementById('restart');
const winnerDiv = document.getElementById('winner');

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let playerTurn = 1;

player1Score.textContent = 0;
player2Score.textContent = 0;

function createBoard() {
    gameGrid.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;
        card.dataset.initials = 'AB'; // Voeg hier je initialen toe
        const front = document.createElement('div');
        front.classList.add('front');
        front.style.backgroundImage = "url('images/back.png')";
        const back = document.createElement('img');
        back.classList.add('back');
        back.src = item.img;
        board.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    });
}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    document.querySelectorAll('.selected').forEach(card => {
        card.classList.remove('selected');
    });
}

function match() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
}

board.addEventListener('click', event => {
    const clicked = event.target;

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                if (playerTurn === 1) {
                    player1Score.textContent = parseInt(player1Score.textContent) + 1;
                } else {
                    player2Score.textContent = parseInt(player2Score.textContent) + 1;
                }
            }
            setTimeout(resetGuesses, delay);
            playerTurn = playerTurn === 1 ? 2 : 1;
        }
        previousTarget = clicked;
    }
    if (document.querySelectorAll('.match').length === gameGrid.length) {
        if (player1Score.textContent > player2Score.textContent) {
            winnerDiv.textContent = 'Speler 1 wint!';
        } else if (player2Score.textContent > player1Score.textContent) {
            winnerDiv.textContent = 'Speler 2 wint!';
        } else {
            winnerDiv.textContent = 'Gelijkspel!';
        }
    }
});

restartButton.addEventListener('click', () => {
    board.innerHTML = '';
    gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
    createBoard();
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    winnerDiv.textContent = '';
});

createBoard();
