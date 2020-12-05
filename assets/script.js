var secondsLeft = 76;
let time = document.getElementById("timer");

var startContainer = document.querySelector(".start-container");
var quizContainer = document.getElementById("quiz-container");
var questionTitle = document.getElementById("question-title");
var answerIs = document.querySelector(".answer-type");

let score = 0;
let currentQuestion = 0;

var startQuizButton = document.querySelector("#start-quiz");
var viewHighscoreButton = document.getElementById("highscores");
var answerButton =  document.querySelector(".answer-button");

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
    


// Start quiz
function startQuiz () {
    timerBegin();
    renderQuestion();
}


// Start timer
function timerBegin() {
    var timerInterval = setInterval(function () {
      secondsLeft--;

      // Timer display
      time.textContent = "Timer: " + secondsLeft;
      header.appendChild(time);
  
      // Clears timer and goes to endGame when it hits 0
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        } 
    }, 1000);
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
answerButton.addEventListener('click', handleAnswer);
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

}


