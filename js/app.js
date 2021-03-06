// const var
const qwerty = document.getElementById("qwerty");
const overlay = document.getElementById("overlay");
const phrase = document.getElementById('phrase');
const buttons = qwerty.querySelectorAll('button');

// missed var
let missed = 0;


// my phrases
const phrases = [
"go out and play",
"today is the day",
"dont let it waste away",
"life is good today",
"grab a guitar"
];

// get random phrase as array function
function getRandomPhraseAsArray( arr ) {
	return arr[ Math.floor( Math.random() * phrases.length ) ].split('');
}

let splitPhrase = getRandomPhraseAsArray( phrases );

function addPhraseToDisplay( arr ) {
	for ( let i = 0; i < arr.length; i++ ) {

		const liElement = document.createElement('li');
		liElement.textContent = arr[i];

		if ( arr[i] !== ' ' ) {
			liElement.className = 'letter';
		} else {
			liElement.className = 'space';
		}

		phrase.firstElementChild.appendChild( liElement );
	}
}

addPhraseToDisplay( splitPhrase );

let liLetter = document.querySelectorAll('.letter');

//check letter function
function checkLetter( btn ) {
	let matchLetter = null;

	for ( let i = 0; i < liLetter.length; i++ ) {

		if ( btn.textContent == liLetter[i].textContent ) {
			matchLetter = btn.textContent;
			liLetter[i].className += ' show';
		}
	}

	return matchLetter;
}

let scoreboard = document.getElementById('scoreboard').querySelectorAll('ol li');

// listen for button clicks
qwerty.addEventListener('click', ( e ) => {
	if ( e.target.tagName == 'BUTTON' ) {
		e.target.disabled = 'true';
		e.target.className += 'chosen';

		const letterFound = checkLetter( e.target );

		if ( letterFound == null ) {
			missed++;
			scoreboard[ scoreboard.length - missed ].firstElementChild.src = 'images/lostHeart.png';
		}
	}

	checkWin();
})

//check for win/loss
function checkWin() {
	const liShow = document.querySelectorAll('.show');

	if ( liLetter.length == liShow.length ) {
		printScreen('win');
	} else if ( missed == 5 ) {
		printScreen('lose');
	}
}

function printScreen( msg ) {
	overlay.className = msg;

	if ( msg == 'win' ) {
		overlay.querySelector('.title').textContent = 'You win!';
		overlay.querySelector('.btn__reset').textContent = 'Play Again?';
	} else if ( msg == 'lose' ) {
		document.querySelector('#overlay .title').textContent = 'You lose.';
		document.querySelector('.btn__reset').textContent = 'Play Again';
	}

	overlay.style.display = '';
}


overlay.querySelector('.btn__reset').addEventListener('click', () => {
	overlay.style.display = 'none';

	if ( document.querySelector('.btn__reset').textContent != 'Start Game' ) {
		missed = 0;

		while ( phrase.firstElementChild.firstElementChild ) {
			phrase.firstElementChild.firstElementChild.remove();
		}

		splitPhrase = getRandomPhraseAsArray( phrases );

		addPhraseToDisplay( splitPhrase );

		scoreboard = scoreboard;

		liLetter = document.querySelectorAll('.letter');

		const buttons = qwerty.querySelectorAll('button');

		for ( var i = 0; i < buttons.length; i++ ) {
			buttons[i].className = '';
			buttons[i].removeAttribute('disabled');
		}

		for ( var i = 0; i < scoreboard.length; i++ ) {
			scoreboard[i].firstElementChild.src = 'images/liveHeart.png';
		}
	}
})
