const guessButton = document.querySelector('.guess');
const inputField = document.querySelector('input');
const wordList = [
	'vis',
	'toeter',
	'developer',
	'telefoon',
	'moeder',
	'snoer',
	'geeuw'
];

const startTheGame = () => {
	initGame();
	secretWord = chooseRandomWord(wordList).split('');
	solveTheWord(secretWord, arrayOfGuessedLetters);
	triedLetters(secretWord, arrayOfGuessedLetters);
};

//reset dom en variables
const initGame = () => {
	tries = 0;
	arrayOfGuessedLetters = [];
	inputField.disabled = false;
	document.querySelector('.win').style.display = 'none';
	document.querySelector('.lose').style.display = 'none';
	document.querySelector('.lives span').innerHTML = 5;
	inputField.value = '';
};

const chooseRandomWord = list => {
	return list[Math.floor(Math.random() * list.length)];
};

const validateInput = () => {
	let userGuess = document.querySelector('input').value;
	document.querySelector('input').value = '';
	//previously guessed letter of empty input
	if (arrayOfGuessedLetters.includes(userGuess) || userGuess === '') {
		return;
	}
	//wrong guess
	if (!secretWord.includes(userGuess)) {
		document.querySelector('.lives span').innerHTML = failedTry();
	}
	processGuessedLetter(userGuess);
};

//if the user guessed wrong, the user has one less try remaining
const failedTry = () => {
	tries++;
	return 5 - tries;
};

const processGuessedLetter = userGuess => {
	arrayOfGuessedLetters.push(userGuess);
	solveTheWord(secretWord, arrayOfGuessedLetters);
	triedLetters(secretWord, arrayOfGuessedLetters);
	gameStatus(secretWord, arrayOfGuessedLetters);
};
//check if game is won or lost
const gameStatus = (secretWord, arrayOfGuessedLetters) => {
	if (wordGuessed(secretWord, arrayOfGuessedLetters)) {
		gameEnd(true);
	} else if (tries >= 5) {
		gameEnd(false);
	}
};

const wordGuessed = (secretWord, arrayOfGuessedLetters) => {
	let remainingLetters = secretWord.filter(letter => {
		return !arrayOfGuessedLetters.includes(letter);
	});
	return !remainingLetters.length > 0;
};

const gameEnd = winLose => {
	inputField.disabled = true;
	if (winLose) {
		document.querySelector('.win').style.display = 'block';
	} else {
		document.querySelector('.lose p span').innerHTML = secretWord.join('');
		document.querySelector('.lose').style.display = 'block';
	}
};

const triedLetters = (secretWord, arrayOfGuessedLetters) => {
	let wrongLetters = arrayOfGuessedLetters.filter(function(letter) {
		return !secretWord.includes(letter);
	});
	document.querySelector('.guessed_letters').innerHTML = wrongLetters.join(' ');
};

const solveTheWord = (secretWord, inputLetterWords) => {
	let displayLettersInWord = secretWord.map(letter => {
		if (inputLetterWords.includes(letter)) {
			return letter;
		} else {
			return '_';
		}
	});
	document.querySelector('.the_word').innerHTML = displayLettersInWord.join(
		' '
	);
};

document.addEventListener('DOMContentLoaded', function() {
	guessButton.addEventListener('click', validateInput);
	document.querySelector('.restart').addEventListener('click', startTheGame);
	startTheGame();
});
module.exports = triedLetters;
