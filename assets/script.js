//Selected elements from HTML and global variables
var timeEl = document.querySelector("#time"); //timer
var question = document.querySelector(".start"); //starting class of main section
var header = document.querySelector(".head"); //main tile that switches to questions
var start = document.querySelector("#startBtn"); //Start button
var text = document.querySelector("p"); //Text to start quiz
var ul = document.querySelector("ul"); //List of answer buttons
var endScore = document.querySelector("#end score"); //final score display
var initials = document.querySelector("#initials"); //initials input
var entr = document.querySelector("#enter"); //enter button to save score
var score = 0;
var time = 60;
var currentQuestion = 0;
var correctAnswer = "";
var chosenAnswer = "";

//Creates buttons for answers to questions
var a1 = document.createElement("button");
a1.setAttribute("name","ans1");
var a2 = document.createElement("button");
a2.setAttribute("name","ans2");
var a3 = document.createElement("button");
a3.setAttribute("name","ans3");
var a4 = document.createElement("button");
a4.setAttribute("name","ans4");

//Questions to be asked during the quiz
var q0 = {
    question: "What index does an array start at?",
    answer1: "index 0",
    answer2: "index 1",
    answer3: "index -1",
    answer4: "it doesn't",
    key: "ans1"
}

var q1 = {
    question: "What data type can be stored in a browser's local memory?",
    answer1: "number",
    answer2: "boolean",
    answer3: "string",
    answer4: "array",
    key: "ans3"
}

var q2 = {
    question: "What is used to repeat lines of code muliple times?",
    answer1: "if statement",
    answer2: "for loop",
    answer3: "else statement",
    answer4: "function",
    key: "ans2"
}

var q3 = {
    question: "What is used to make viewport changes for different screen sizes?",
    answer1: "HTML",
    answer2: "JSONs",
    answer3: "media quiries",
    answer4: "git",
    key: "ans3"
}

var q4 = {
    question: "This data type can be stored in an array.",
    answer1: "numbers",
    answer2: "strings",
    answer3: "booleans",
    answer4: "all of the above",
    key: "ans4"
}

var q5 = {
    question: "String values are opened and closed with...",
    answer1: "curly brackets",
    answer2: "parenthesis",
    answer3: "commas",
    answer4: "square brackets",
    key: "ans2"
}

var q6 = {
    question: "What command prints the argument to the console in javaScript?",
    answer1: "console.log",
    answer2: "Math.random",
    answer3: "System.out.print",
    answer4: "else if",
    key: "ans1"
}

var quizQuestions = [q0,q1,q2,q3,q4,q5,q6];

//Starts timer when quiz starts and ends quiz when time is up
function startTime(){
    var timerInterval = setInterval(function() {
        time--;
        timeEl.textContent = "Time: " + time;
    
        if(time === 0) {
          clearInterval(timerInterval);
          end();
        }
    
      }, 1000);
}

//Checks if answers are correct and adds to score
function checkCorrect(){
    if(chosenAnswer == correctAnswer){
        score++;
    } else{
        time = time - 5;
    }
    
    currentQuestion++;
    if(currentQuestion >= quizQuestions.length || time === 0){
        end();
    } else{
        nextQuestion();
    }
}

//Creates buttons with answers to questions
function startQuestions(){
    question.setAttribute("class","quiz");
    //Adds buttons for question answers
    ul.appendChild(a1);
    ul.appendChild(a2);
    ul.appendChild(a3);
    ul.appendChild(a4);
    
    //Removes starting text promt and original start button
    start.remove();
    text.remove();

    startTime();
    nextQuestion();
}

//Pulls up the next question
function nextQuestion(){
    var i = quizQuestions[currentQuestion];
    var x = document.getElementById("question");
    x.innerHTML = i.question;

    a1.innerHTML = i.answer1;
    a2.innerHTML = i.answer2;
    a3.innerHTML = i.answer3;
    a4.innerHTML = i.answer4;
    
    correctAnswer = i.key;
    console.log(i.key);
    console.log(chosenAnswer);
    console.log(correctAnswer);
    console.log(score);
}

//Send player to high score page at the end of the quiz
function end(){
    location.href="./assets/highScores.html";
}

//Adds new score to high scores list
function saveScore(){
    endScore.innerHTML = score;
    var playerScore = {
        name: initials,
        playerScore: score
    }
    console.log(playerScore);
    localStorage.setItem("highScore", JSON.stringify(playerScore));
    
    //Displys high score on the page
    var x = getElementById("scoreList");
    x.appendChild(playerScore);
}

//Actions on button presses
start.addEventListener("click", startQuestions);
a1.addEventListener("click",function(){chosenAnswer = a1.getAttribute("name");});
a1.addEventListener("click", checkCorrect);
a2.addEventListener("click",function(){chosenAnswer = a2.getAttribute("name");});
a2.addEventListener("click", checkCorrect);
a3.addEventListener("click",function(){chosenAnswer = a3.getAttribute("name");});
a3.addEventListener("click", checkCorrect);
a4.addEventListener("click",function(){chosenAnswer = a4.getAttribute("name");});
a4.addEventListener("click", checkCorrect);

entr.addEventListener("click", saveScore());