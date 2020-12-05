var secondsLeft = 76;
let time = document.getElementById("timer");

var header = document.querySelector("header");
var startContainer = document.querySelector(".start-container");
var quizContainer = document.getElementById("quiz-container");
var questionTitle = document.getElementById("question-title");
var answerIs = document.querySelector(".answer-type");

let score = 0;
let currentQuestion = 0;

var startQuizButton = document.querySelector("#start-quiz");
var viewHighscoreButton = document.getElementById("highscores");
var answerButton =  document.querySelector(".answer-button");
console.log(answerButton);

quizContainer.hidden = true;

let questions = [
        {
            question: "1. The following is NOT a data type: ",
            choiceA: "A. strings", 
            choiceB: "B. booleans",
            choiceC: "C. alerts",
            choiceD: "D. numbers",
            correctAnswer: "C"
        },
        {
            question: "2. What do we use to enclose the condition of an if/else statment?",
            choiceA: "A. quotes",
            choiceB: "B. curly brackets",
            choiceC: "C. parentheses",
            choiceD: "D. square brackets",
            correctAnswer: "C"
        },
        {
            question: "3.  _______ can be stored in arrays in Javascript. ",
            choiceA: "A. numbers and strings",
            choiceB: "B. other arrays",
            choiceC: "C. booleans",
            choiceD: "D. all of the above",
            correctAnswer: "D"
        },
        {
            question: "4.  _____ are typically used to enclose string values.",
            choiceA: "A. commas",
            choiceB: "B. quotes",
            choiceC: "C. curly brackets",
            choiceD: "D. parentheses",
            correctAnswer: "B"
        },
        {
            question: "5. The most commonly used debugging tool in Javascript is:",
            choiceA: "A. console log",
            choiceB: "B. for loops",
            choiceC: "C. JavaScript",
            choiceD: "D. terminal/bash",
            correctAnswer: "A"
        },

];

// Buttons event listeners
startQuizButton.addEventListener('click', startQuiz);
answerButton.addEventListener('click', handleAnswer);
viewHighscoreButton.addEventListener('click', highscores);


// Start quiz
function startQuiz () {
    var timerInterval = setInterval(function () {
        // Clears timer and goes to endGame when it hits 0
        if (secondsLeft <= 0) {
           clearInterval(timerInterval);
           endGame();
       } 
         secondsLeft--;
   
         // Timer display
         time.textContent = "Timer: " + secondsLeft;
         header.appendChild(time);
     },1000);
    renderQuestion();
}


  // Render question and answer choices
  function renderQuestion () {
        // Hide start-container and show quiz-container
        startContainer.hidden = true;
        quizContainer.hidden = false;

        // Set answerIs div to empty
        answerIs.textContent = "";

        //Render questions and answers
        questionTitle.textContent = questions[currentQuestion].question;
        document.getElementById("A").textContent = questions[currentQuestion].choiceA;
        document.getElementById("B").textContent = questions[currentQuestion].choiceB;
        document.getElementById("C").textContent = questions[currentQuestion].choiceC;
        document.getElementById("D").textContent = questions[currentQuestion].choiceD;
  }

// Handle answer
function handleAnswer () {
   if (event.target  !== questions[currentQuestion].correctAnswer) {
       userRight();
   } else {
       userWrong();
   }
   currentQuestion += 1;
   if (currentQuestion === questions.length) {
        endGame();
        return
   }
   setTimeout(renderQuestion, 1000);
}

// If user clicks correct answer userRight is executed
function userRight() {
    // Adds 10 points to score
    score += 10;

    // Prints 'correct answer!'
    var line = document.createElement('hr');
    answerIs.appendChild(line);
    var rightAnswer = document.createElement('p');
    rightAnswer.setAttribute('style', 'font-style: italic');
    rightAnswer.textContent = 'Correct Answer!'
    answerIs.appendChild(rightAnswer);
}

// If user clicks wrong answer userWrong is executed
function userWrong () {
    // Subtracts 5 points from score
    score -= 5;

    // Subtracts 10 seconds from time
    secondsLeft = secondsLeft - 10;

    // Prints 'wrong answer!'
    var line = document.createElement('hr');
    answerIs.appendChild(line);
    var wrongAnswer = document.createElement('p');
    wrongAnswer.setAttribute('style', 'font-style: italic');
    wrongAnswer.textContent = 'Wrong Answer!'
    answerIs.appendChild(wrongAnswer);

    // Waits 900 milliseconds, then calls next question
    setTimeout(renderQuestion, 900);
}

function endGame () {
    // Clears container
    document.querySelector("h5").hidden = true;
    document.querySelector("ol").setAttribute("class", "hide");
    answerIs.textContent = "";

    // Creates end game page and buttons
   questionTitle.textContent = "Game over!";
   document.getElementById("empty-paragraph").textContent = "Your score is: " + score;
   document.querySelector("form").setAttribute("class", " ");
   var submit = document.querySelector(".submit");

  submit.addEventListener('click', function(event){ 
      event.preventDefault();
    var initials = document.querySelector('input').value;  
    localStorage.setItem('user', initials);
    localStorage.setItem('score', score);

        // Sets condition if user does not enter initials
        if (initials === '') {
        localStorage.clear();
        alert('You did not enter your intitials! So your highscore cannot not be saved!')
        return
        }

    // Calls function highscores page after button is clicked
    highscores();
    })
}

function highscores () {
    // Clears container
    document.getElementById("empty-paragraph").textContent = "";
    document.querySelector("ol").setAttribute("class", "hide");
    answerIs.textContent = "";
    document.querySelector("form").setAttribute("class", "hide");

    // Create highscores list elements by retrieving user info from local storage
   var user = localStorage.getItem("user");
   var userScore = localStorage.getItem("score");
   var listEl = document.createElement("ul");
   quizContainer.appendChild(listEl);
   var list = document.createElement("li");
   listEl.appendChild(list);

      // Sets condition for first time user viewing highscores
      if (user === null) {
        list.textContent = 'No highscores Yet! Click Go Back Button to play!'
      } else {
        list.textContent = user + " | " + parseInt( userScore);
      }

    // Create highscores page and buttons
    startContainer.hidden = true;
    quizContainer.hidden = false;
    questionTitle.textContent = "Highscores";
    var formEl = document.createElement("form");
    formEl.setAttribute("type", "form");
    quizContainer.appendChild(formEl);
    var goBack = document.createElement("button");
   goBack.textContent = "Go Back";
   goBack.setAttribute("type", "submit");
   formEl.appendChild(goBack);
   var clearHighscores = document.createElement("button");
   clearHighscores.textContent = "Clear Highscores";
   formEl.appendChild(clearHighscores);

   clearHighscores.addEventListener('click', function(event) {
    localStorage.clear();
  })
}
