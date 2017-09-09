
//The ready event occurs when the DOM (document object model) has been loaded (all the html etc,
//so the page can start to load w/o processing all the javascript).
//Because this event occurs after the document is ready, it is a good place to have all other jQuery events 
//and functions.  The ready() method specifies what happens when a ready event occurs.

$(document).ready(function () {


////////////////////////////////////////////////////
//VARIABLES: declares ALL the game variables////////
////////////////////////////////////////////////////
var triviaRandomBank=[];
var wordArray=new Array;
var questionList=new Array;
var currentQuestion;
var currentA;
var currentB;
var currentC;
var currentD;
var currentAnswer;
var kiwi="";
var fruits = ["Banana", "Orange", "Apple", "Mango"];



var numberOfCrystalGems=4;
var crystalGemImages=['assets/images/greenGod.png','assets/images/heartGem.png','assets/images/monkeyGem.png','assets/images/unicornGem.png'];
//var crystalGemImages=['apple','strawberry','blueberry','peach'];
//var randomNumber;
var targetNumber = 0;
var userNumber=88;
var wrongAnswerCount;
var counter = 0;
var wins = 0;
var losses = 0;
$('#win').text(wins);
$('#loss').text(losses);



////////////////////////////////////////////////////
//EXTERNAL DATA CALL: gets json data////////////////
////////////////////////////////////////////////////


//selects the words from json from triviaRandomBank file 
$.getJSON('triviaRandomBank.json', function(data) { 
//maps sub-arrays to index values
for(i=0;i<data.questionList.length;i++){ 
	console.log("data.questionList.length: " + data.questionList.length);
	triviaRandomBank[i]=new Array;
//	console.log("triviaRandomBank.length: " + triviaRandomBank.length);
	triviaRandomBank[i][0]=data.questionList[i].question;
//	console.log(triviaRandomBank[i][0]=data.questionList[i].question);
	triviaRandomBank[i][1]=data.questionList[i].A;
//	console.log(triviaRandomBank[i][1]=data.questionList[i].A);	
	triviaRandomBank[i][2]=data.questionList[i].B;
//	console.log(triviaRandomBank[i][2]=data.questionList[i].B);	
	triviaRandomBank[i][3]=data.questionList[i].C;
//	console.log(triviaRandomBank[i][3]=data.questionList[i].C);	
	triviaRandomBank[i][4]=data.questionList[i].D;
//	console.log(triviaRandomBank[i][4]=data.questionList[i].D);	
	triviaRandomBank[i][5]=data.questionList[i].answer;
//	console.log(triviaRandomBank[i][5]=data.questionList[i].answer);	

}

/*
var rnd=Math.floor(Math.random()*triviaRandomBank.length);
console.log("triviaRandomBank.length: " + triviaRandomBank.length);
console.log("rnd value: " + rnd);
currentQuestion=triviaRandomBank[rnd][0];
console.log("currentQuestion: " + currentQuestion);
currentA=triviaRandomBank[rnd][1];
console.log("currentA: " + currentA);
currentB=triviaRandomBank[rnd][2];
console.log("currentB: " + currentB);
currentC=triviaRandomBank[rnd][3];
console.log("currentC: " + currentC);
currentD=triviaRandomBank[rnd][4];
console.log("currentD: " + currentD);
currentAnswer=triviaRandomBank[rnd][5];
console.log("currentAnswer: " + currentAnswer);
*/

})//gtjson

////////////////////////////////////////////////////
////////////////////////////////////////////////////
//FUNCTIONS: declares all the game functions////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////



////////////////////////////////////////////////////
//FUNCTION getQuestion() BEGINS/////////////////////////
////////////////////////////////////////////////////
//selects random from the triviaRandomBank, then sets currentWord equal to index [0] of JSON subarray (declared at top), 
//splits it up and creates a wordArray, variable defined at the top, to be used in the handleKeyUp option.			
//split() method is used to split a string into an array of substrings, and returns the new array.
//If an empty string ("") is used as the separator, the string is split between each character.


function getQuestion(){

var rnd=Math.floor(Math.random()*triviaRandomBank.length);
console.log("triviaRandomBank.length: " + triviaRandomBank.length);
console.log("rnd value: " + rnd);
currentQuestion=triviaRandomBank[rnd][0];
console.log("currentQuestion: " + currentQuestion);
currentA=triviaRandomBank[rnd][1];
console.log("currentA: " + currentA);
currentB=triviaRandomBank[rnd][2];
console.log("currentB: " + currentB);
currentC=triviaRandomBank[rnd][3];
console.log("currentC: " + currentC);
currentD=triviaRandomBank[rnd][4];
console.log("currentD: " + currentD);
currentAnswer=triviaRandomBank[rnd][5];
console.log("currentAnswer: " + currentAnswer);

//	var triviaRandomBank = [];
//	var rnd=Math.floor(Math.random()*questionList.length);
//	console.log("triviaRandomBank.length: " + triviaRandomBank.length);
//	console.log("rnd value: " + rnd);
//	currentQuestion=triviaRandomBank[rnd][0];
//	currentA=triviaRandomBank[rnd][1];
//	currentB=triviaRandomBank[rnd][2];
//	currentC=triviaRandomBank[rnd][3];
//	currentD=triviaRandomBank[rnd][4];
//	currentAnswer=triviaRandomBank[rnd][5];

/////////////////
//	triviaRandomBank.splice(rnd,1); 
//	wordArray=currentWord.split("");
/////////////////

//	console.log("Current Question:" + currentQuestion);			
}//getQuestion

////////////////////////////////////////////////////
//FUNCTION getQuestion() ENDS/////////////////////////
////////////////////////////////////////////////////


////////////////////////////////////////////////////
//FUNCTION titleScreen() BEGINS/////////////////////
////////////////////////////////////////////////////
//title screen provides intentional entry into game screen
function titleScreen(){
	$('#gameContent').append('<div id="gameTitle">CRYSTAL GEM COLLECTOR</div><div id="startButton" class="button" background-color: red>BEGIN</div>');		
	$('#startButton').on("click",function (){gameScreen()});
	$('#gameContent').append('<div id="gamePlay"><p> Try to match the "Target Number" by clicking on the four crystals.</p><p> Each crystal adds a specific amount of points to your total score.</p><p> Match the "Target Number" and win the round, overshoot it and lose the round </p><p> Crystal values change each round.</p></div>');
	getQuestion();

}//display game
////////////////////////////////////////////////////
//FUNCTION titleScreen() ENDS///////////////////////
////////////////////////////////////////////////////


////////////////////////////////////////////////////
//FUNCTION gameScreen() BEGINS//////////////////////
////////////////////////////////////////////////////
//empties out the titleScreen from game content, and creates the gameScreen by appending relevant divs to the gameContent main div	
function gameScreen(){

	$('#gameContent').empty();
	$('#gameContent').append('<div id="randomNumberContainer"><div id="randomNumberLabel">Target Number:</div><div id="randomNumberHolder"></div></div>');
	$('#gameContent').append('<div id="playerNumberContainer"><div id="playerNumberLabel">Your Number:</div><div id="playerNumberHolder"></div></div>');
	$('#gameContent').append('<div id="crystalGemContainer"><div id="crystalGemHolder"></div></div>');
	$('#gameContent').append('<div id="feedback"></div>');
	$('#gameContent').append('<form><input type="text" id="dummy" ></form>');


//the getQuestion function, and then creates the approptiate number of tiles
//this block also initiates the WAC count and the PG array. 			
getQuestion();




//function crystalGemGenorator() {

//this block resets all the values for a new game..
//Each crystal should have a random hidden value between 1 - 12.
//The random number shown at the start of the game should be between 19 - 120.
//random non-repeating number



//declare numbers varialbe as an array
var cgnumbers = []

//repeat until condition is met: 4 unique numbers between 1 and 12
while(cgnumbers.length < 4){
			//random number generator		
			var uniqueRandomNumber = Math.floor(Math.random()*12+1)
			
			//var to check the condition of unique element of four  
			var found = false;
			//check the random number against the numbers in the array  
			for (var i=0; i< cgnumbers.length; i++){
				if (cgnumbers[i] == uniqueRandomNumber){
					found = true; break
				}//break out of loop if randomNumber isn't 
//unique--found in array is true...so go to top of loop and regenerate random number..
}
			  //similar to hangman--if not found in the array
			  if(!found)cgnumbers[cgnumbers.length]=uniqueRandomNumber;
			}//the if above is like an otherwise
//leave the loop when have 4 unique and random numbers between 1 and 12.



//console.log(cgnumbers);		
var cgImages=[];

for (i = 0; i < cgnumbers.length; i++) {
	//var cgImage = $('<img>');
	var cgImage = $('<img id="cgImages">');
	cgImage.attr('data-num', cgnumbers[i]);
	cgImage.attr('src', crystalGemImages[i]);
	cgImage.addClass('crystalGemImage');
	cgImages.push(cgImage);
	$('#crystalGemHolder').append(cgImages);
};
//console.log(cgImages);		




counter = 0;
$('#playerNumberHolder').text(counter);

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//var targetNumber = getRandomInt(19,120);
//NOTE that by declaring targetNumber here without 'var' and
//by not declaring it at the top, javascript by default
//treats it as a global variable, which was crucial in 
//making it available to my checkAnswer function below.. will
//need to see why this is the case because 'counter' was declared
//at the top (globally) and didn't encounter problems..
//maybe because 'counter' was set to zero and targetNumber wasn't
//test that theory later...


targetNumber = getRandomInt(19,120);
//console.log(targetNumber);

$('#randomNumberHolder').text(targetNumber);

$('.crystalGemImage').on('click', function(){
	counter = counter + parseInt($(this).data('num'));
	console.log('num');
	$('#playerNumberHolder').text(counter);
	console.log(counter);
	checkAnswer();
});



}//gamescreen
////////////////////////////////////////////////////
//FUNCTION gameScreen() ENDS////////////////////////
////////////////////////////////////////////////////


////////////////////////////////////////////////////
//FUNCTION checkAnswer() BEGINS/////////////////////
////////////////////////////////////////////////////
function checkAnswer(){
	console.log(counter);
	console.log(targetNumber);
	if (counter == targetNumber){
		victoryMessage();}
		else if (counter > targetNumber){
			defeatMessage();}
		}


////////////////////////////////////////////////////
//FUNCTION checkAnswer() ENDS///////////////////////
////////////////////////////////////////////////////


////////////////////////////////////////////////////
//FUNCTION victoryMessage() BEGINS//////////////////
////////////////////////////////////////////////////
function victoryMessage(){
	$('#status').text('Good Job!!!!');
	wins ++;
	$('#win').text(wins);
	console.log(wins)

	newGame();


}//victory
////////////////////////////////////////////////////
//FUNCTION victoryMessage() ENDS////////////////////
////////////////////////////////////////////////////


////////////////////////////////////////////////////
//FUNCTION defeatMessage() BEGINS///////////////////
////////////////////////////////////////////////////
//same code aas victoryMessage, except for defeat scenario		
function defeatMessage(){
	$('#status').text('You are not very smart!')
	losses ++;
	$('#loss').text(losses);
	console.log(losses)

	newGame();


}//defeat
////////////////////////////////////////////////////
//FUNCTION defeatMessage() ENDS/////////////////////
////////////////////////////////////////////////////


////////////////////////////////////////////////////
//FUNCTION newGame() BEGINS/////////////////////////
////////////////////////////////////////////////////
function newGame(){
	gameScreen();
};//finalpage
////////////////////////////////////////////////////
//FUNCTION newGame() ENDS///////////////////////////
////////////////////////////////////////////////////



////////////////////////////////////////////////////
////////////////////////////////////////////////////
//ACTUAL GAME CODE TO START GAME////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

/////HERE
//getQuestion();
/////HERE


titleScreen();
console.log(triviaRandomBank.length);



});//doc ready