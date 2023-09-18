// Create functions for starting game, the timer, displaying questions, picking and scoring answers, and displaying and storing scores.
const questions = [{
    question: 'Which of the following is not a data type in Javascript?',
    answers: [
        { text: "Number", correct: false},
        { text: "Float", correct: true},
        { text: "Boolean", correct: false},
        { text: "String", correct: false},
    ]},{
    question: 'What does the NaN value represent in Javascript?',
    answers: [
        { text: "Null Value", correct: false},
        { text: "undefined", correct: false},
        { text: "Not a Number", correct: true},
        { text: "Noob at Networking", correct: false},
    ]},{
    question: 'What is the correct way to declare a variable in Javascript',
    answers: [
        { text: "var x = 5", correct: true},
        { text: "x = 5", correct: false},
        { text: "x: 5", correct: false},
        { text: "heretofore x shall be 5", correct: false},
    ]},{
    question: 'What does the "this" keyword mean in Javascript?',
    answers: [
        { text: "The current function.", correct: false},
        { text: "The global object.", correct: false},
        { text: "The object that the function belongs to.", correct: true},
        { text: "the parent of the current object.", correct: false},
    ]},{
    question: 'What is the difference between "==" and "===" in Javascript',
    answers: [
        { text: '"===" performs a strict comparison, while "==" performs a loose comparison.', correct: true},
        { text: '"==" performs a strict comparison, while "===" performs a loose comparison.', correct: false},
        { text: 'They are interchangable.', correct: false},
        { text: 'The longer one is for emphasis.', correct: false},
    ]},{
    question: 'What is the difference between "let" and "const" in Javascript',
    answers: [
        { text: '"Let" variables cannot be reassigned, while "const" variables can.', correct: false},
        { text: '"Const" variables cannot be reassigned, while "let" variables can.', correct: true},
        { text: 'They are interchangable.', correct: false},
        { text: '"Let" is more formal than "const", for more polite code.', correct: false},
    ]},{
    question: 'Which of the following is not a loop in Javascript',
    answers: [
        { text: 'for', correct: false},
        { text: 'do...while', correct: false},
        { text: 'while', correct: false},
        { text: 'whenever', correct: true},
    ]},{
    question: 'What is the difference between "var" and "let" in Javascript',
    answers: [
        { text: '"Let" variables have a block scope, while "var" variables have a function scope.', correct: true},
        { text: '"Var" variables have a block scope, while "let" variables have a function scope.', correct: false},
        { text: 'They are interchangable.', correct: false},
        { text: '"Var" variables cannot be reassigned, while "let" variables can.', correct: false},
    ]},{
    question: 'What does the "forEach" method do in Javascript?',
    answers: [
        { text: 'Adds a new element to the end of an array.', correct: false},
        { text: 'Removes an element from the beginning of an array.', correct: false},
        { text: 'Executes a function once for each element in an array.', correct: true},
        { text: 'Reverses the order of the elements in an array.', correct: false},
    ]},{
    question: 'Which of the following type of variable takes precedence over the other if the names are the same?',
    answers: [
        { text: 'global variable', correct: false},
        { text: 'local variable', correct: true},
        { text: 'both are used', correct: false},
        { text: 'neither are used', correct: false},
    ]}]

const userScores = JSON.parse(localStorage.getItem("userScoreStored")) || [];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answerButtons");
const nextButton = document.getElementById("nextButton");
const startButton = document.getElementById("startButton");
var timerEl = document.getElementById("countdown");
let score = 0;
let currentQuestionIndex = 0;
var timeLeft = 90;
var timeInterval = 0;

startButton.addEventListener('click', startGame)

function countdown() {
    console.log(timerEl);
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            endScore();
        }
    }, 1000);
}

function showQuestion() {
    resetFields ();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButtonsElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;}
        button.addEventListener("click", selectAnswer);
    })
}

function resetFields (){
    nextButton.style.display = "none";
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(i) {
    const selectedBtn = i.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score = score + 10;
    }else{
        selectedBtn.classList.add('incorrect');
        timeLeft = timeLeft - 10;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function endScore() {
    clearInterval(timeInterval);
    resetFields();
    score = score + timeLeft;
    console.log(score);
    var input=document.createElement("input");
    input.id="userInitials";
    questionElement.innerHTML = `You scored ${score}! <br> Please enter your Initials: <br>`
    var saveButton = document.createElement("button");
    saveButton.id = "save";
    saveButton.textContent = "Submit Score"
    saveButton.addEventListener ("click", submitScore);
    questionElement.appendChild(input);
    questionElement.appendChild(saveButton);
    nextButton.innerHTML = "Play Again?"
    nextButton.addEventListener("click", startGame)
    nextButton.style.display = "block"
}

function submitScore (){
    var user = {
        initial:document.getElementById("userInitials").value ,
        score
    }
    userScores.push(user);
    localStorage.setItem("userScoreStored" , JSON.stringify(userScores))
}


function nextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        endScore();
    }
}

nextButton.addEventListener("click", () =>{
    nextQuestion();
});

function startGame() {
    startButton.style.display = "none";
    currentQuestionIndex = 0;
    score = 0; 
    countdown();
    showQuestion();
}