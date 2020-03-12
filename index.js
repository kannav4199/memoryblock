
var blocks=["green" , "red","yellow","blue"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function(event) {
  if (!started) {
    $("#level").text("Level " + level);
    nextSequence();
    started = true;
  }


});


function nextSequence()
{
		 userClickedPattern = [];
  level++;
  $("#level").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = blocks[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);



}



function playSound(key)
{
	var r=new Audio("sounds/"+key+".mp3");
	r.play();
}




$(".block").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});



function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}




function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}



function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
