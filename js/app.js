/*
 * Create a list that holds all of your cards
 */
let iconList = ["fa fa-anchor" , "fa fa-anchor" , "fa fa-bicycle" , "fa fa-bicycle" , "fa fa-leaf" , "fa fa-leaf" , "fa fa-cube" , "fa fa-cube" , "fa fa-diamond" , "fa fa-diamond" , "fa fa-bomb" , "fa fa-bomb" , "fa fa-bolt" , "fa fa-bolt" , "fa fa-paper-plane-o" , "fa fa-paper-plane-o"];

// @description Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let cardsContainer = document.querySelector(".deck");

let shuffleIcons = shuffle(iconList);

let revealedCards = [];

let matchCount = 0;

let moves = document.querySelector('.moves');

let stars = document.querySelector(".stars");

var modal = $("#win-modal");

let gameStart = false;

let moveCount = 0;
	moves.innerHTML = 0;

let resetBtn = document.querySelector('.restart');

let timer = new Timer();
timer.addEventListener('secondsUpdated' , function(e) {
	$('#timer').html(timer.getTimeValues().toString());
});

// @description Create the cards
function initGame() {
	let stars = document.querySelector(".stars");
	stars.innerHTML =  `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
	for(let i = 0 ; i < shuffleIcons.length; i++) {
		let card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class="${shuffleIcons[i]}"></i>`;
		cardsContainer.appendChild(card);		
	 	// Card click event
	 	click(card);
	}	
}

// @description Loads the game
initGame();

// @description Card click event
function click(card){
	card.addEventListener("click" , function() {
		// We have an open card
		if(gameStart ==  false) {
			gameStart = true;
			timer.start();
		}
		if(revealedCards.length === 1) {
			card.classList.add("open" , "show" , "disable");
			revealedCards.push(this);
			compare(revealedCards);
			revealedCards = [];
		} else {
		// We don't have any open card	
			card.classList.add("open" , "show" , "disable");
			revealedCards.push(this);
		}
	});	
}

// @description Compare the two open cards
function compare(revealedCards) {
	addMove();
	if(revealedCards[1].innerHTML === revealedCards[0].innerHTML) {			
		for(var j = 0; j < revealedCards.length; j++){
			revealedCards[j].classList.add("match" , "animated" , "tada");
		}
		matchCount++;											//Increment the matches
		gameOver();		
		revealedCards = [];										//Check if the game is over	
	} else {
		setTimeout(function() {						
			for(var j = 0; j < revealedCards.length; j++) {
				revealedCards[j].classList.add("animated" , "shake");
				revealedCards[j].classList.remove("open" , "show" , "disable");					
			}
			revealedCards = [];	
		},500);			
	}	
}

// @description Toggles win modal on
function won() {
	timer.pause();
	var starRating = document.getElementById("starRating");
	starRating.innerHTML = stars.innerHTML;
	$("#finalTime").text(`${timer.getTimeValues().toString()}`);
	$("#finalMove").text(`${moveCount} Moves`);
    modal.css("display", "block");

}

// @description Resets game state and toggles win modal display off
var playAgain = function() {
    resetGame();
    modal.css("display", "none");
};

$(".play-again").click(playAgain);

//  @description Check if the game is over	 
function gameOver() {
	if(matchCount == 8){		
		won();
		console.log(moveCount);
	}
}

// @description Reset Game
function resetGame() {

	// Delete all cards
	cardsContainer.innerHTML = "";
	timer.stop();
	$('#timer').html("00:00:00");
	gameStart = false;

	// Call initGame to create new cards
	initGame();

	// Reset any related variables
	matchCount = 0;
	moveCount = 0;
	moves.innerHTML = moveCount;
}

resetBtn.addEventListener("click", resetGame);

//  @description Add moves
function addMove() {
	moveCount++;
	moves.innerHTML = moveCount;
	rating();
}

function rating() {
	if(moveCount > 12) {
		console.log("called");
		stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>`;
	}
	else if(moveCount > 25) {
		console.log("called");
		stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>`;	
	}
}
