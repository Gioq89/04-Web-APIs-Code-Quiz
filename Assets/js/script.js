// variable of questions

var questions = [
  {
    question: "Which is NOT a primitive type?",
    options: ["a. string", "b. number", "c. alerts", "d. boolean"],
    answer: "c. alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within _____.",
    options: [
      "a. quotes",
      "b. curly brackets",
      "c. parentheses",
      "d. square brackets",
    ],
    answer: "c. parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store _____.",
    options: [
      "a. numbers and strings",
      "b. other arrays",
      "c. booleans",
      "d. all of the above",
    ],
    answer: "d. all of the above",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["a. comma", "b. curly brackets", "c. quotes", "d. parentheses"],
    answer: "c. quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "a. JavaScript",
      "b. terminal / bash",
      "c. for loops",
      "d. console.log",
    ],
    answer: "d. console.log",
  },
];

// creating variables
var timerStarted = false;
var start = document.getElementById("start");
var seconds = 75;
var questionIndex = 0;
var intervalId;
var submitArea = document.getElementById("submitArea");
var result = document.getElementById("result");
var questionsArea = document.getElementById("questions");
var correctSound = new Audio("Assets/sounds/correct.wav");
var incorrectSound = new Audio("Assets/sounds/incorrect.wav");
var submitButton = document.getElementById("submit");
var usersArray = [];

submitButton.addEventListener("click", function () {
  var userInitials = document.getElementById("name").value;
  var highscoreTable = {
    intials: userInitials,
    score: seconds,
  };
  usersArray.push(highscoreTable);
  window.localStorage.setItem("pop", JSON.stringify(usersArray));
  showOrHide(submitArea, false);
});
// event listener waiting for start quiz button to be clicked
start.addEventListener("click", function () {
  startTimer();
  startQuiz();
});

function showOrHide(element, show) {
  if (show) {
    element.removeAttribute("class", "hide");
  } else {
    element.setAttribute("class", "hide");
  }
}

// Function to start timer when Button is clicked
function startTimer() {
  if (!timerStarted) {
    var timer = document.getElementById("timer");
    intervalId = setInterval(function () {
      seconds--;
      if (seconds < 0) {
        clearInterval();
        timer.textContent = "Time's up!";
      } else {
        timer.textContent = seconds + " seconds";
      }
    }, 1000);

    timerStarted = true;
  }
}

// Function to have questions appear when Button is clicked
function startQuiz() {
  var landingArea = document.getElementById("landing-area");
  var questionContainer = document.getElementById("questions-container");
  var currentQuestion = questions[questionIndex];

  showOrHide(landingArea, false);

  displayQuestion(currentQuestion, questionContainer);

  // display the next question once an answer is selected
  function displayQuestion(question, nextQuestion) {
    nextQuestion.textContent = "";
    var questionEl = document.createElement("div");
    questionEl.textContent = question.question;
    questionEl.classList.add("question-text");
    nextQuestion.appendChild(questionEl);

    for (var i = 0; i < question.options.length; i++) {
      var optionEl = document.createElement("button");
      optionEl.textContent = question.options[i];
      questionContainer.appendChild(optionEl);

      optionEl.addEventListener("click", function () {
        checkAnswer(this.textContent, question.answer);
      });
    }
  }

  // checks for correct answer
  function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
      // answer is correct, move on to the next question
      result.innerText = "Correct!";
      result.setAttribute("class", "correct result");
      correctSound.play();
    } else {
      // answer is incorrect, deduct 10 seconds from the timer
      result.innerText = "Incorrect!";
      result.setAttribute("class", "incorrect result");
      incorrectSound.play();
      seconds -= 10;
    }
    // move on to next question either way
    questionIndex++;
    if (questionIndex < questions.length) {
      var currentQuestion = questions[questionIndex];
      displayQuestion(currentQuestion, questionContainer);
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    showOrHide(questionsArea, false);
    clearInterval(intervalId);
  }
}
