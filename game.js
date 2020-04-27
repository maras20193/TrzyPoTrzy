const gameResults = {
    gameNumber: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: '',
    aiHand: '',
    whoWin: '',
    playerHandImage: 'img/hand_rock.png',
    aiHandImage: 'img/hand_rock.png'
}
const handImages = ['img/hand_rock.png', 'img/hand_paper.png', 'img/hand_scissors.png']

btnPlay = document.querySelector('.play')
btnAgain = document.querySelector('.again')

const popup = document.querySelector('.popup')
const hands = [...document.querySelectorAll('.select .hand')]

const playerImage = document.querySelector('.popup .player');
const aiImage = document.querySelector('.popup .ai');

function handSelection() {
    game.playerHand = this.dataset.option
    hands.forEach(hand => {
        if (game.playerHand == hand.dataset.option) {
            hand.style.color = '#FF9F1C'
        } else {
            hand.style.color = ''
        }
    })
}

function aiSelection() {
    aiHand = Math.floor(Math.random() * hands.length)
    game.aiHand = hands[aiHand].dataset.option
}

function whoWin() {
    if (game.playerHand === game.aiHand) {
        game.whoWin = 'draw'
    } else if ((game.playerHand === 'rock' && game.aiHand === 'scissors') || (game.playerHand === 'paper' && game.aiHand === 'rock') || (game.playerHand === 'scissorsk' && game.aiHand === 'paper')) {
        game.whoWin = 'player';
    } else {
        game.whoWin = 'ai';
    }
}

function showResult(player, ai, who) {
    document.querySelector('.your_choice').textContent = player
    document.querySelector('.ai_choice').textContent = ai
    const winner = document.querySelector('.who_win');
    if (who === 'player') {
        winner.textContent = "Wygraleś :)";
        winner.style.color = "#20AE19";

    } else if (who === 'ai') {
        winner.textContent = "Przegrałeś :(";
        winner.style.color = "#E71D36";
    } else {
        winner.textContent = "Remis :|";
        winner.style.color = "#1927ad";
    }
}

function addPoints(who) {
    document.querySelector('.game_numbers').textContent++
    console.log(who);
    if (who === 'player') {
        console.log(document.querySelector('.wins-numbers').textContent);
        document.querySelector('.wins-numbers').textContent++
    } else if (who === 'ai') {
        document.querySelector('.losses_numbers').textContent++
    } else {
        document.querySelector('.draws_numbers').textContent++
    }

}


function showPopup() {
    popup.classList.add('active');
    playerImage.classList.toggle('anime');
    aiImage.classList.toggle('anime');
}

function changeImage() {
    if (game.playerHand === 'paper') {
        game.playerHandImage = handImages[1]
    } else if (game.playerHand === 'scissors') {
        game.playerHandImage = handImages[2]
    } else {
        game.playerHandImage = handImages[0]

    }
    if (game.aiHand === 'paper') {
        game.aiHandImage = handImages[1]
    } else if (game.aiHand === 'scissors') {
        game.aiHandImage = handImages[2]
    } else {
        game.aiHandImage = handImages[0]

    }
    playerImage.src = game.playerHandImage;
    aiImage.src = game.aiHandImage;

}

function summaryImage(who) {
    summary = document.querySelector('.popup .summary');
    if (who === 'player') {
        summary.textContent = 'Win :)'
        summary.style.color = "#20AE19"

    } else if (who === 'ai') {
        summary.textContent = 'Lose :('
        summary.style.color = "#E71D36"
    } else {
        summary.textContent = 'Draw :\)'
        summary.style.color = "#1927ad"
    }

    function delay() {
        summary.classList.add('active')
    }
    setTimeout(delay(), 3000)
    btnAgain.classList.add('active')
}

function startGame() {
    if (game.playerHand === '') return alert("Ręka nie została wybrana!")

    aiSelection()
    whoWin()
    showResult(game.playerHand, game.aiHand, game.whoWin)
    addPoints(game.whoWin)
    showPopup()
    setTimeout(changeImage, 3000)
    summaryImage(game.whoWin)


}

function endGame() {
    game.playerHand = ''
    game.aiHand = ''
    changeImage()
    hands.forEach((hand) => {
        hand.style.color = '';
    })
    popup.classList.remove('active')
    playerImage.classList.toggle('anime');
    aiImage.classList.toggle('anime');

}

///nasluchiwanie na wybor i button
hands.forEach(hand => hand.addEventListener('click', handSelection))

btnPlay.addEventListener('click', startGame);
btnAgain.addEventListener('click', endGame);