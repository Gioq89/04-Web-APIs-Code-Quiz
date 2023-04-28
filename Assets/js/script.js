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
var navbar = document.getElementsByClassName("navbar");
var questionsArea = document.getElementById("questions");
var highscoreArea = document.getElementById("highscoreArea");
var correctSound = new Audio("Assets/sounds/correct.wav");
var incorrectSound = new Audio("Assets/sounds/incorrect.wav");
var submitButton = document.getElementById("submit");
var gobackButton = document.getElementById("goback");
var clearHighScoresButton = document.getElementById("clear");
var viewScoresLink = document.getElementById("viewscores");
var landingArea = document.getElementById("landing-area");
var usersList = localStorage.getItem("users");
var usersArray = [];
var scores = document.getElementById("scores");
var header = document.getElementById("header");

// event listener waiting for start quiz button to be clicked
start.addEventListener("click", function () {
  startTimer();
  startQuiz();
});

function showEl(element, show) {
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
  var questionContainer = document.getElementById("questions-container");
  var currentQuestion = questions[questionIndex];

  showEl(landingArea, false);

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
    showEl(result, true);
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
    showEl(questionsArea, false);
    showEl(submitArea, true);
    clearInterval(intervalId);
  }
}

function displayHighscores() {
  var parsedArray = JSON.parse(usersList);
  if (usersArray.length) {
    for (var i = 0; i < usersArray.length; i++) {
      scores.innerHTML += `
    <div class="userInfoContainer">
      <div class="userInfo">${usersArray[i].intials}</div>
      <div class="userInfo">${usersArray[i].score}</div>
      </div>
      `;
    }
  } else {
    for (var i = 0; i < parsedArray.length; i++) {
      scores.innerHTML += `
  <div class="userInfoContainer">
    <div class="userInfo">${parsedArray[i].intials}</div>
    <div class="userInfo">${parsedArray[i].score}</div>
    </div>
    `;
    }
  }
  showEl(header, false);
}

gobackButton.addEventListener("click", function () {
  window.location.reload();
});

clearHighScoresButton.addEventListener("click", function () {
  localStorage.clear();
  scores.innerHTML = null;
});

viewScoresLink.addEventListener("click", function () {
  showEl(landingArea, false);
  showEl(highscoreArea, true);
  displayHighscores();
});

submitButton.addEventListener("click", function () {
  var userInitials = document.getElementById("name").value;

  if (usersList) {
    usersArray = JSON.parse(usersList);
  }

  var highscoreTable = {
    intials: userInitials,
    score: seconds,
  };

  usersArray.push(highscoreTable);
  localStorage.setItem("users", JSON.stringify(usersArray));
  showEl(submitArea, false);
  showEl(highscoreArea, true);
  displayHighscores();
});
