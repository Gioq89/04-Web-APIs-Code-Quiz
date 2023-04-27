// variable of questions
var questions = [
  {
    question: "Which is NOT a primitive type?",
    options: ["a. string", "b. number", "c. alerts", "d. boolean"],
    answer: "c. alerts"
  },
  {
    question: "The condition in an if / else statement is enclosed within _____.",
    options: ["a. quotes", "b. curly brackets", "c. parentheses", "d. square brackets"],
    answer: "c. parentheses"
  },
  {
    question: "Arrays in Javascript can be used to store _____.",
    options: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
    answer: "d. all of the above"
  },
  {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    options: ["a. comma", "b. curly brackets", "c. quotes", "d. parentheses"],
    answer: "c. quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["a. JavaScript", "b. terminal / bash", "c. for loops", "d. console.log"],
    answer: "d. console.log"
  }
];

// creating variables
var timerStarted = false;
var start = document.getElementById("start");

// event listener waiting for start quiz button to be clicked
start.addEventListener("click", function() {
  startTimer();
  startQuiz();
});

// Function to start timer when Button is clicked
function startTimer() {
  if (!timerStarted) {
    var timer = document.getElementById("timer");
    var seconds = 75;
    var intervalId = setInterval(function () {
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
  var questionIndex = 0;
  var questionContainer = document.getElementById("questions-container");
  var currentQuestion = questions[questionIndex];

  var questionElement = document.createElement("h2");
  questionElement.textContent = currentQuestion.question;
  questionContainer.appendChild(questionElement);

  for (var i = 0; i < currentQuestion.options.length; i++) {
    var optionElement = document.createElement("button");
    optionElement.textContent = currentQuestion.options[i];
    questionContainer.appendChild(optionElement);
  }
}
