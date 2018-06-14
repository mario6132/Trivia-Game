
$(".qanda").hide();
$("#imgGif").hide();
var rightAnswers = 0;
var wrongAnswers = 0;
var i = 0;
var rightAnswerRandom = 0;
var counter = 60;
var clockRunning = false;
var intervalId;
var converted;

var rightAnswerGifs = ['Assets/Images/Right 1.gif', 'Assets/Images/Right 2.gif', 'Assets/Images/Right 3.gif','Assets/Images/Right 4.gif' ];

var wrongAnswerGifs = ['Assets/Images/Incorrect 1.gif','Assets/Images/Incorrect 2.gif','Assets/Images/Incorrect 3.gif','Assets/Images/Incorrect 4.gif'];
//Questions
var questions = [{
    question: "What villain broke Batman's back ?",
    answers: ["Joker", "Poison Ivy", "Bane", "Two-Face"],
    correctAnswer: "Bane"
}, {
    question: "Which of the following is NOT a nickname for batman?",
    answers: ["The Dark Night", "The Cape Crusader", "The Bat", "The Shadow"],
    correctAnswer: "The Shadow"
}, {
    question: "What color is the Bat-phone?",
    answers: ["Blue", "Gray", "Black", "Red"],
    correctAnswer: "Red"
}, {
    question: "What car make and model was the Batmobile modeled after",
    answers: ["Lincoln Futura", "Ferrari F40", "Maclaren F1", "Ford GT"],
    correctAnswer: "Lincoln Futura"
}, {
    question: "First network that aired Batman episodes?",
    answers: ["Cartoon Network", "NBC", "ABC", "Food Network Channel"],
    correctAnswer: "ABC"
}, {
    question: "Distance between the Batcave and Gotham City?",
    answers: ["20 miles", "Around the corner", "14 miles", "One button away"],
    correctAnswer: "14 miles"
}];

var stopwatch = {

  time: 0,
 
    start: function(){
    
    if (!clockRunning) {
      
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
      
    }
  },

  count: function() {
    stopwatch.time--;

    converted = stopwatch.timeConverter(stopwatch.time);
    $('#quiz-time-left').html("Time Left: " + converted);

    if(converted === "00:00"){
      
      setTimeout(function (){
        $(".qanda").hide();
        $('#timeUp').html("Time's Up!");
        $('#timeUp').show();
    },1000);
      timerStop();
         
  }
  },
  
  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = + minutes;
    }

    return minutes + ":" + seconds;
  }
};


function displayQuestions() {
    var displayQuestion = questions[i].question;
    var displayAnswers = questions[i].answers;
    $("#question").html(displayQuestion);
    $("#answer1").html(displayAnswers[0]);
    $("#answer2").html(displayAnswers[1]);
    $("#answer3").html(displayAnswers[2]);
    $("#answer4").html(displayAnswers[3]);
}

function timerStop() {
    clearInterval(intervalId);
}
// setTimeout("checkTime()", 1000);
//runs random gifs if answers are right
function questionAnswerGifsRight (){
    rightAnswerRandom = Math.floor(Math.random()* rightAnswerGifs.length);
    document.getElementById('imgGif').src= rightAnswerGifs[rightAnswerRandom];   
}
//runs random gifs if answers are wrong
function questionAnswerGifsWrong (){
    wrongAnswerRandom = Math.floor(Math.random()* wrongAnswerGifs.length);
    document.getElementById('imgGif').src= wrongAnswerGifs[wrongAnswerRandom];   
}
//displays the questions after start is pressed
$('#start').click(function () {
    timerStop();
    clockRunning = false;
    stopwatch.time= 60;
    i = 0;
    displayQuestions();

    $('.qanda').show();
    $('#timeUp').hide();
    $('#allDone').hide();

    $('#quiz-time-left').text("Time Left: 01:00");
    rightAnswers = 0;
    $('#rAnswers').text(rightAnswers);
    wrongAnswers = 0;
    $('#wAnswers').text(wrongAnswers);
    stopwatch.start();
 });
    
//player selects answer by clicking on button with the class of .button (A,B,C, or D).    
$('.answer').click(function () {

    var answerChosen = $(this).attr('value');
    console.log(answerChosen);
    console.log(questions[i].answers[answerChosen]);
    //if the answer chosen is correct
    if (questions[i].answers[answerChosen] === questions[i].correctAnswer) {
        console.log("Yes");
        rightAnswers++;
        $('#rAnswers').text(rightAnswers);
        questionAnswerGifsRight();
        $("#imgGif").show(); 
        setTimeout(function questionAnswerGifsRight(){
            $("#imgGif").hide(); 
        },3000);

        //checks to see if there is another question
        if (i < questions.length-1){
            i=i+1;
            displayQuestions();
            
            
        }
        //if there are no more questions
        else{
            console.log("All Done!");
            timerStop();
            $(".qanda").hide();
            $('#allDone').html("All Done!");
            $('#allDone').show();

        }
    }
    //if answer is wrong
    else {
        console.log("No");
        wrongAnswers++;
        $('#wAnswers').text(wrongAnswers);
        if (i < questions.length-1){
            i=i+1;
            displayQuestions(questions.length);
            questionAnswerGifsWrong();
            $("#imgGif").show();
            setTimeout(function questionAnswerGifsWrong(){
                $("#imgGif").hide(); 
            },3000);
        }
        else{
            console.log("All Done!");
            timerStop();
            $(".qanda").hide();

        }
    }
    
});


