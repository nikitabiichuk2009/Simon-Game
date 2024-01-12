var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var allowLevelChange = true; // Flag to control level change
var gameStarted = false;
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function buttonAnimation(colour) {
    $("#" + colour).addClass("pressed");
    $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
    setTimeout(function() {
        $("#" + colour).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    level = level + 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    var audio_src = "sounds/" + randomChosenColour + ".mp3";
    console.log(audio_src);
    playSound(randomChosenColour);
    buttonAnimation(randomChosenColour);
}

function checkAnswer(current_level) {
    if (userClickedPattern[current_level] === gamePattern[current_level]) {
        console.log("SUCCESS");
        if (userClickedPattern.length === gamePattern.length) {
            gameStarted = false;
            setTimeout(function() {
                nextSequence(); 
                userClickedPattern = [];
                gameStarted = true;
            }, 1000);
            
        }
    } else {
        console.log("WRONG");
        var new_audio = new Audio("sounds/wrong.mp3");
        new_audio.play()
        $('body').addClass('game-over');
        $('h1').text("Game Over, Press Any Key to Restart");
        gameStarted = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        allowLevelChange = true;
    }
}

function startGame() {
    console.log("YES!");
    console.log(event.key);
    allowLevelChange = false;
    $('body').removeClass('game-over');
    gameStarted = true;
    nextSequence();
}

$(document).keypress(function(event) {
    if (allowLevelChange === true) {
        startGame();
    }
});

$(".btn").click(function() {
    if (gameStarted === true) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log('USER:' + userClickedPattern);
        playSound(userChosenColour);
        buttonAnimation(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);}
});
