(function(){

var winningNumber = null;
var playerGuessCount = 5;
var pastGuesses = [];
var alreadyGuessed  = false;
var update = document.getElementById("update");
var numGuess = document.getElementById("guess-count");
var playersGuess;
var playersName = null;
var gameOver = false;
var hintGiven = false;
var nameNotSubmitted = true;

function startGame() {
	winningNumber = Math.floor(100 * Math.random() + 1);
	numGuess.style.display = "block";
	numGuess.innerHTML = "You have " + playerGuessCount + " guesses remaining, " + playersName; 
    
}


function updateStatus(str) {
    update.style.display = "block";
    update.innerHTML = str;
}



function notLegit()
{
	pastGuesses.forEach(function(a){
		if(playersGuess == a)
			alreadyGuessed = true;
	});
	pastGuesses.push(playersGuess);
	return alreadyGuessed;
}



function checkAnswer(){	

	if(notLegit())
	{
		alert("You already guessed that number. Please choose a new guess.");
		return;
	}

	if(playersGuess == winningNumber){
		
		updateStatus("Congrats, " + playersName +"! You won!");
		numGuess.style.display = "none";
		gameOver = true;
		gameWon();
		return '#ff0000';

	}
		guessesRemaining();
	if(playersGuess>winningNumber)
		updateStatus(playersGuess + " is too High!");
	if(playersGuess<winningNumber)
		updateStatus(playersGuess + " is too Low!");

	var diff = Math.abs(winningNumber-playersGuess);

		if(diff<=5)
		{
			return '#ff6600';
		}
		
		if (diff<=10)
		{
			return '#ff9933';
		}
		
		if (diff<=25)
		{
			return '#ffff66';
		}
		
		if (diff<=50)
		{
			return '#99ccff';
		}
		
		if (diff<=75)
		{
			return '#3366ff';
		}
		
		else 
		{
			return '#0000cc';
		}
}


function guessesRemaining() {
	
	playerGuessCount--;

	if(playerGuessCount >1)
	{
		numGuess.innerHTML = "You have " + playerGuessCount + " guesses remaining, " + playersName +".";
		return; 
	}
    
    if(playerGuessCount == 1)
    {
    	numGuess.innerHTML = "You have " + playerGuessCount + " guess remaining, " + playersName +"."; 
    }

    else
    {
    	numGuess.innerHTML = "Sorry, " + playersName + ". You've lost! The winning number was " + winningNumber +"."; 
    	document.getElementById(winningNumber).style.backgroundColor = "#ff0000";
    	gameOver = true;
    }
    


}

function playAgain() {
	playerGuessCount = 5;
	pastGuesses = [];
	alreadyGuessed  = false;
	playersGuess;
	playersName = null;
	gameOver = false;

    updateStatus("New game! Start guessing!");
    $('.row button').css({'background': '#99FF66'});
    numGuess.style.display = "none";
    update.style.display = "none";
}

function hint() {
	hintGiven = true;
	document.getElementById(winningNumber).style.backgroundColor = "#33CC33";
	for(var j =0; j<playerGuessCount;j++)
	{
		numID = Math.floor((Math.random()* 100) + 1);
		document.getElementById(numID).style.backgroundColor = "#33CC33";
	}
	
	updateStatus("Choose from the dark green numbers");

}

function getName(){
	
	playersName=document.getElementById('playName').value;

	if(playersName == "")
	{
		alert("Please enter a name to play");
		return;
	}
	nameNotSubmitted = false;
	document.getElementById('playName').value ="";

	startGame();
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){

	$('#submit').on('click', function(){
	if(nameNotSubmitted)
		getName();
	});


	$('input').keypress(function(event) {	
    if (event.which == 13) {
        event.preventDefault();
        if(nameNotSubmitted){
        	getName();
        	}
    	}
	});


	$('.row button').on('click', function(){
	if(gameOver)
	{
		updateStatus("The game is over! Please play again.");
		return;
	}	
	if(playersName == null)
	{
		alert("Please enter a name to play");
		return;
	}
	
	playersGuess = $(this).text();
	
	var newColor = checkAnswer();
	$(this).css({'background': newColor});
	
	});

	$('#hint').on('click', function(){
	if(playersName == null)
	{	alert("Please enter a name to play");
		return;
	}
	if(hintGiven)
	{
		alert("Sorry, only one hint per game");
		return;
	}
	if(gameOver)
		{
			updateStatus("The game is over! Please play again.");
			return;
		}
		hint();
	
	
	});

	$('#play').on('click', function(){
		playAgain();
	});
});


}());

