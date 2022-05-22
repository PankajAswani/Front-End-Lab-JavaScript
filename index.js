/**
 * Question class
 * data members
 * - text
 * - choices (array of string)
 * - answer
 */

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (answer) {
    return this.answer === answer;
}

/**
 * Quiz class
 * data members
 * - questions (input in constructor - array of question)
 * - score (initially 0)
 * - questionIndex (initially 0)
 */

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.done = function () {
    return this.questionIndex >= this.questions.length;
}

function loadQuestion() {
    if (quiz.done()) {
        showScore();
        return;
    }

    const currentQuestion = quiz.getCurrentQuestion();
    const questionEl = document.getElementById("question");
    questionEl.textContent = currentQuestion.text;

    for (let i = 0; i < currentQuestion.choices.length; i++) {
        const currentChoice = currentQuestion.choices[i];
        document.getElementById(`choice${i}`).textContent = currentChoice;
        handleSelect(`btn${i}`, currentChoice);
    }

    showProgress();
}

function handleSelect(id, choice) {
    document.getElementById(id).onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestion();
    };
}

function showProgress() {
    document.getElementById("progress").textContent = `Question ${quiz.questionIndex + 1} of ${quiz.questions.length}`;
}

function showScore() {
    document.getElementById("quiz").innerHTML = `
        <h1>Result</h1>
        <h2 id="score">You scored ${quiz.score}</h2>
    `;
}

const questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

const quiz = new Quiz(questions);

loadQuestion();