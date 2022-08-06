
// Question array to hold questions and answers
var questionArr = [
  {
    question: "Commonly used data types in Javascript DO NOT include:",
    choices: ['boolean', 'numbers', 'strings', 'commas'],
    correctAnswer: 'commas'
  },
  {
    question: "If/else statements are enclosed with:",
    choices: ['commas', 'periods', 'straight brackets', 'curly brackets'],
    correctAnswer: 'curly brackets'
  },
  {
    question: "Arrays in JavaScript are stored in what:",
    choices: ['commas', 'periods', 'straight brackets', 'curly brackets'],
    correctAnswer: 'straight brackets'
  },
  {
    question: "Where do you link to your JavaScript file?",
    choices: ['in css file', 'in JavaScript file', 'at start of HTML file', 'at end of HTML file'],
    correctAnswer: 'at end of HTML file'
  },
]

// Selects element by id
var timeEl = document.getElementById("time");
var startBtn = document.getElementById("startBtn");
var quizScreen = document.getElementById("quizScreen");
var choiceEl = document.getElementById('choices');
var quizStatus = document.getElementById('status');
var localStoragescores = document.getElementById ('localStoragescores');
var viewHighscores = document.getElementById('viewScore');
var showScores = document.getElementById('scoreResults')
var timerLabel = document.getElementById('timerLabel');
var wins = document.getElementById('correctQuestions');
var losses = document.getElementById('incorrectQuestions');
var showInitials = document.getElementById("showInitials");
var showWins = document.getElementById("showWins");
var showLosses = document.getElementById("showLosses");




// sets time to take the quiz
var secondsLeft = 51;

// sets the question index
var questionIndex = 0;

// sets the wins and losses to start and console logs the result each time it runs

var winsStart = 0
var lossesStart = 0



function countWins() {
  winsStart++;
  console.log(winsStart)
}

function countLosses() {
  lossesStart++;
  console.log(lossesStart)
}



// function to control the timer with the quiz
function setTime() {

  // Sets interval in variable
  console.log('working')

  var startScreen = document.getElementById('startScreen');

  startScreen.setAttribute('class', 'hide');

  quizScreen.removeAttribute('class')

  viewHighscores.setAttribute('class', 'hide')
  showScores.setAttribute('class', 'hide')

  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);

      // runs all code to end the game and show the results of the game, details for each line of code commented below
      console.log('end quiz');
      console.log(winsStart);
      wins.textContent = winsStart;
      localStorage.setItem("wins", winsStart);
      console.log(lossesStart);
      losses.textContent = lossesStart;
      localStorage.setItem("losses", lossesStart)
      timeEl.setAttribute('class', 'hide');
      timerLabel.textContent = 'Game Over';
      quizScreen.setAttribute('class', 'hide');
      quizStatus.setAttribute('class', 'hide');
      viewHighscores.setAttribute('class', 'show');
      showScores.setAttribute('class', 'show');


    }

  }, 1000);

  //if question index is less than array length run get Questions

  if (questionIndex < questionArr.length) {
    getQuestions();
  }

}

// gets questions for quiz
function getQuestions() {

  if (questionIndex <= questionArr.length) {

    // assigns the current question from the questions array
    var currentQuest = questionArr[questionIndex]
    //console.log(currentQuest.question)

    // displays current question in question id in html
    var questionEl = document.getElementById('question');
    questionEl.textContent = currentQuest.question;

    // clears text content for the choices after the question is answered
    choiceEl.textContent = "";

    // creates buttons for each of the choices so user can click on them
    currentQuest.choices.forEach(function (choice, i) {
      // console.log(choice)
      var choiceBtn = document.createElement('button');
      choiceBtn.setAttribute('class', 'choice');
      choiceBtn.setAttribute('value', choice)

      choiceBtn.textContent = choice;

      // on click runs function choiceClick
      choiceBtn.onclick = choiceClick;

      // appends choice button to choice element
      choiceEl.appendChild(choiceBtn)


    })

  }

}


function choiceClick() {
  //console.log('clicked', this.value);


  // if answer is wrong decrement timer by 5 seconds, tell them they are wrong


  var rightAnswer = this.value;
  if (rightAnswer !== questionArr[questionIndex].correctAnswer) {
    console.log('wrong');
    secondsLeft -= 5;
    timeEl.textContent = secondsLeft;
    quizStatus.textContent = 'Previous answer was wrong.';
    countLosses();
  }

  //  if answer is right, tell them they are right
  else {
    console.log('right')
    quizStatus.textContent = 'Previous answer was right.';
    countWins();

  }

  // moves onto the next question in the question array by adding to the question index
  questionIndex++;



  // looks to see if there are more questions to see if the question index matches the question array length

  if (questionIndex === questionArr.length) {

    console.log('end quiz');

    // records wins and writes them to var- and to local storage
    console.log(winsStart);
    wins.textContent = winsStart;
    localStorage.setItem("wins", winsStart);

    // records losses and writes them to var and to local storage
    console.log(lossesStart);
    losses.textContent = lossesStart;
    localStorage.setItem("losses", lossesStart)

    // hides timer
    timeEl.setAttribute('class', 'hide');
    // shows gam is over text in place of timer
    timerLabel.textContent = 'Game Over';

    // hides quiz quesionts
    quizScreen.setAttribute('class', 'hide');
    quizStatus.setAttribute('class', 'hide');

    // shows scores
    viewHighscores.setAttribute('class', 'show');
    showScores.setAttribute('class', 'show');
    

    return

  } else {
    // code that calls the get Questions function if there are more questions
    getQuestions();
  }



}


startBtn.addEventListener("click", setTime);

// Logging initials to local storage NOT WORKING

//  Form submission code for adding intials and saving to local storage





// Path 1 for logging initials (working)

function localInitialsalt(event) {
  event.preventDefault();
  var showInitials = document.getElementById("showInitials");
  var initialsBtn = document.getElementById('initialsBtn');
  var initials = ''
  var initialsInput = document.getElementById('initials-text');
 
  initials=initialsInput.value;
  console.log(initials);

  localStorage.setItem("initials", JSON.stringify(initials));
    
  showLocalScores();
  
}

initialsBtn.addEventListener("click", localInitialsalt);







// When I put the show scores in a function it doesn't work, but when I turn on the function and then turn off the function, the scores display. Get help on this.


function showLocalScores() {

localStoragescores.setAttribute('class', 'show');

var getInitials = localStorage.getItem("initials");

var getWins = localStorage.getItem("wins");

var getLosses = localStorage.getItem("losses");

showInitials.textContent = getInitials;
showWins.textContent = getWins;
showLosses.textContent = getLosses;

return
}




 

// // var counter = document.querySelector("#counter");
// var addButton = document.querySelector("#add");
// var subtractButton = document.querySelector("#subtract");

// var count = localStorage.getItem("count");

// counter.textContent = count;



// For div = status, that section would show at the end of the game and would pull the wins and losses from localstorage and display it in this section with initial, but couldn't get initials into local storage so couldn't key the values in local storage to anything



