
var blocks=["green" , "red","yellow","blue"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

if(level===0){
$("#blocks").css("display","none");
  $(".instruction").css("display","block");
  $(".title").css("color","red");
      $(".title").css("text-shadow","4px 2px black");
      
}

$("#white").click(function() {
  if (!started) {
 userClickedPattern = [];
    
     $("#white").css("display", "none");
     $(".instruction").css("display","none");
     $("#blocks").css("display","block");
      
      setTimeout(nextSequence()
    ,2000);
    started = true;

  }


});




function nextSequence()
{
     userClickedPattern = [];
  level++;
  $(".title").css("color","red");
      $(".title").css("text-shadow","4px 2px black");
      
  $("#level").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = blocks[randomNumber];
  gamePattern.push(randomChosenColour);

  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);



}

$(".block").click(function() {

  var userChosenColour = $(this).attr("id");
  
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

}
);





function playSound(key)
{
	var r=new Audio("sounds/"+key+".mp3");
	r.play();
}





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
        }, 1500);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
        $(".instruction").css("display","block");
      $("#level").text("Game Over, Click to Restart");
      $(".title").css("color","black");
      $(".title").css("text-shadow","none");

      $("#blocks").css("display","none");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 1000);

      startOver();
    }
}



function startOver() {
  level = 0;
  gamePattern = [];


  $("#white").css("display","inline-block");
   $("#blocks").css("display","none");
   $(".instruction").css("display","block");
  started = false;
}
