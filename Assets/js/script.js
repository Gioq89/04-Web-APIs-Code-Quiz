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

var timerStarted = false;
var start = document.getElementById("start");

start.addEventListener("click", startTimer);

function startTimer() {
  if (!timerStarted) {
    var timer = document.getElementById("timer");
    var seconds = 75;

    setInterval(function () {
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
