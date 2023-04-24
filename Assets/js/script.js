var timerStarted = false;
var start = document.getElementById("start");

start.addEventListener("click", startTimer);

function startTimer() {
  if(!timerStarted) {
  var timer = document.getElementById("timer");
  var seconds = 75;

  setInterval(function () {
    seconds--;
    timer.textContent = seconds + " seconds";
    
    if (seconds == 0) {
      clearInterval();
    }
  }, 1000);
  
  timerStarted = true;
}
}