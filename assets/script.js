
// Question array to hold questions and answers
var questionArr = [
  {
    question: "what color is the ocean?",
    choices: ['yellow', 'purple', 'pink', 'blue'],
    correctAnswer: 'blue'
  },
  {
    question: "what color is the apple?",
    choices: ['black', 'purple', 'green', 'blue'],
    correctAnswer: 'green'
  },
  {
    question: "what color is the sky?",
    choices: ['yellow', 'purple', 'pink', 'sky blue'],
    correctAnswer: 'sky blue'
  },
  {
    question: "what color is the ground?",
    choices: ['brown', 'purple', 'green', 'blue'],
    correctAnswer: 'brown'
  },
]

// Selects element by id
var timeEl = document.getElementById("time");
var startBtn = document.getElementById("startBtn");
var quizScreen = document.getElementById("quizScreen");
var choiceEl = document.getElementById('choices');
var quizStatus = document.getElementById('status');
var viewHighscores = document.getElementById ('viewScore');
var timerLabel = document.getElementById('timerLabel');
var wins = document.getElementById('correctQuesions');
var losses = document.getElementById('incorrectQuesions')


// sets time to take the quiz
var secondsLeft = 51;

// sets the question index
var questionIndex = 0;

// sets the wins and losses to start
var winsStart = 0
var lossesStart = 0

// function to control the timer with the quiz
function setTime() {
  // Sets interval in variable
  console.log('working')

  var startScreen = document.getElementById('startScreen');

  startScreen.setAttribute('class', 'hide');

  quizScreen.removeAttribute('class')

  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
  
      sendMessage();
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
  if (this.value !== questionArr[questionIndex].correctAnswer) {
    console.log('wrong');
    secondsLeft -= 5;
    timeEl.textContent = secondsLeft;
    quizStatus.textContent = 'You are wrong.';
    
  }

  //  if answer is right, tell them they are right
  else {
    console.log('right')
    quizStatus.textContent = 'You are right.';
    // winsStart++;
    // wins.textContent = winsStart;
   
  }

  // moves onto the next question in the question array by adding to the question index
  questionIndex++;


  // looks to see if there are more questions to see if the question index matches the question array length

  if (questionIndex === questionArr.length) {
    //need to add code to call a fucntion to end the quiz
    console.log('end quiz')
    timeEl.setAttribute ('class','hide');
    timerLabel.textContent ='Game Over';
    // quizStatus.textContent = 'Click view highscores to save your score';
    quizScreen.setAttribute('class','hide');
    return

  } else {
    // code that calls the get Questions function if there are more questions
    getQuestions();
  }



}



startBtn.addEventListener("click", setTime)

//TO DO : stop the time when the game is over and display users score and put that in local storage

// All done! Your final score is, enter intials submit, display high scores