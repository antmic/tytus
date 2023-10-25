const deck = [
	{ name: 'Ace of Spades', value: 11 },
	{ name: 'King of Spades', value: 10 },
	{ name: 'Queen of Spades', value: 10 },
	{ name: 'Jack of Spades', value: 10 },
	{ name: 'Ten of Spades', value: 10 },
	{ name: 'Nine of Spades', value: 9 },
	{ name: 'Eight of Spades', value: 8 },
	{ name: 'Seven of Spades', value: 7 },
	{ name: 'Six of Spades', value: 6 },
	{ name: 'Five of Spades', value: 5 },
	{ name: 'Four of Spades', value: 4 },
	{ name: 'Three of Spades', value: 3 },
	{ name: 'Two of Spades', value: 2 },
	{ name: 'Ace of Clubs', value: 11 },
	{ name: 'King of Clubs', value: 10 },
	{ name: 'Queen of Clubs', value: 10 },
	{ name: 'Jack of Clubs', value: 10 },
	{ name: 'Ten of Clubs', value: 10 },
	{ name: 'Nine of Clubs', value: 9 },
	{ name: 'Eight of Clubs', value: 8 },
	{ name: 'Seven of Clubs', value: 7 },
	{ name: 'Six of Clubs', value: 6 },
	{ name: 'Five of Clubs', value: 5 },
	{ name: 'Four of Clubs', value: 4 },
	{ name: 'Three of Clubs', value: 3 },
	{ name: 'Two of Clubs', value: 2 },
	{ name: 'Ace of Diamonds', value: 11 },
	{ name: 'King of Diamonds', value: 10 },
	{ name: 'Queen of Diamonds', value: 10 },
	{ name: 'Jack of Diamonds', value: 10 },
	{ name: 'Ten of Diamonds', value: 10 },
	{ name: 'Nine of Diamonds', value: 9 },
	{ name: 'Eight of Diamonds', value: 8 },
	{ name: 'Seven of Diamonds', value: 7 },
	{ name: 'Six of Diamonds', value: 6 },
	{ name: 'Five of Diamonds', value: 5 },
	{ name: 'Four of Diamonds', value: 4 },
	{ name: 'Three of Diamonds', value: 3 },
	{ name: 'Two of Diamonds', value: 2 },
	{ name: 'Ace of Hearts', value: 11 },
	{ name: 'King of Hearts', value: 10 },
	{ name: 'Queen of Hearts', value: 10 },
	{ name: 'Jack of Hearts', value: 10 },
	{ name: 'Ten of Hearts', value: 10 },
	{ name: 'Nine of Hearts', value: 9 },
	{ name: 'Eight of Hearts', value: 8 },
	{ name: 'Seven of Hearts', value: 7 },
	{ name: 'Six of Hearts', value: 6 },
	{ name: 'Five of Hearts', value: 5 },
	{ name: 'Four of Hearts', value: 4 },
	{ name: 'Three of Hearts', value: 3 },
	{ name: 'Two of Hearts', value: 2 },
];

const cards = [...deck];

const player = { hand: [], score: 0, aceCount: 0 };
const dealer = { hand: [], score: 0, aceCount: 0 };

const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', () => {
	location.reload();
});
const hitButton = document.querySelector('#hit');
const standButton = document.querySelector('#stand');

const playerScoreDisplay = document.querySelector('#player-score');
const dealerScoreDisplay = document.querySelector('#dealer-score');
const playerHandDisplay = document.querySelector('#player-hand');
const dealerHandDisplay = document.querySelector('#dealer-hand');
const messageDisplay = document.querySelector('#message');

let isDealerHidden = 1;

const getRandomCard = () => {
	if (cards.length === 0) {
		cards = [...deck];
		messageDisplay.innerHTML = 'New deck!';
	}
	const randomIndex = Math.floor(Math.random() * cards.length);
	let isAce = 0;
	if (cards[randomIndex].name.includes('Ace')) {
		isAce = 1;
	}
	return [cards[randomIndex], isAce];
};

const pushCard = person => {
	const [card, isAce] = getRandomCard();
	person.hand.push(card);
	person.aceCount += isAce;
	person.score += card.value;
};

const dealCards = () => {
	for (let i = 0; i < 2; i++) {
		pushCard(player);
		pushCard(dealer);
	}
};

const calculateScore = () => {
	[player, dealer].forEach(person => {
		let score = person.score;
		let aceCount = person.aceCount;
		person.hand.forEach(card => {});
		while (score > 21 && aceCount > 0) {
			score -= 10;
			aceCount--;
		}
		person.score = score;
		person.aceCount = aceCount;
	});
};

const displayCards = () => {
	playerHandDisplay.innerHTML = '';
	player.hand.forEach(card => {
		const cardDisplay = document.createElement('div');
		cardDisplay.classList.add('card');
		cardDisplay.innerHTML = card.name;
		playerHandDisplay.appendChild(cardDisplay);
	});
	playerScoreDisplay.innerHTML = player.score;

	//dealer hides one card
	dealerHandDisplay.innerHTML = '';
	if (isDealerHidden) {
		const cardDisplay = document.createElement('div');
		cardDisplay.classList.add('card', 'hidden');
		cardDisplay.innerHTML = 'Hidden';
		dealerHandDisplay.appendChild(cardDisplay);
		dealerScoreDisplay.innerHTML = dealer.score - dealer.hand[0].value + ' + ?';
	} else {
		dealerScoreDisplay.innerHTML = dealer.score;
	}
	for (let i = isDealerHidden; i < dealer.hand.length; i++) {
		const cardDisplay = document.createElement('div');
		cardDisplay.classList.add('card');
		cardDisplay.innerHTML = dealer.hand[i].name;
		dealerHandDisplay.appendChild(cardDisplay);
	}
};

const playerMove = () => {
	if (player.score === 21) {
		finishGame();
	} else {
		messageDisplay.innerHTML = 'Hit or stand?';
	}
};

const dealerMove = () => {
	while (dealer.score < 17) {
		pushCard(dealer);
		calculateScore();
		displayCards();
	}
	finishGame();
};

const hit = () => {
	messageDisplay.innerHTML = 'You hit!';
	pushCard(player);
	calculateScore();
	displayCards();
	if (player.score >= 21) {
		finishGame();
	} else {
		playerMove();
	}
};

const stand = () => {
	disableButtons(true);
	messageDisplay.innerHTML = 'Dealer moves...';
	dealerMove();
};

const finishGame = () => {
	disableButtons(true);
	isDealerHidden = 0;
	calculateScore();
	displayCards();
	switch (true) {
		case player.score > 21:
			messageDisplay.innerHTML = 'Bust! You lose!';
			break;
		case player.score === 21:
			messageDisplay.innerHTML = 'Blackjack! You win!';
			break;
		case dealer.score > 21:
			messageDisplay.innerHTML = 'Dealer busts! You win!';
			break;
		case dealer.score > player.score:
			messageDisplay.innerHTML = 'Dealer wins!';
			break;
		case dealer.score < player.score:
			messageDisplay.innerHTML = 'You win!';
			break;
		case dealer.score === player.score:
			messageDisplay.innerHTML = "It's a draw!";
			break;
		default:
			messageDisplay.innerHTML = 'Error! Please restart the game.';
			break;
	}
	messageDisplay.innerHTML += ' Play again?';
};

const clearTable = () => {
	player.hand = [];
	dealer.hand = [];
	player.score = 0;
	dealer.score = 0;
	player.aceCount = 0;
	dealer.aceCount = 0;
	isDealerHidden = 1;
};

const disableButtons = trueOrFalse => {
	hitButton.disabled = trueOrFalse;
	standButton.disabled = trueOrFalse;
};

const game = () => {
	clearTable();
	dealCards();
	calculateScore();
	displayCards();
	disableButtons(false);
	playerMove();
};
startButton.addEventListener('click', game);
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);
