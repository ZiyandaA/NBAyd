'use strict'; 
const questionObj = {
  text:"",
  answers:[],
  answer:"",
  checkAnswer:function(useranswer){return this.answer==useranswer;}
}
function createQuestion(text,answers,answer){
  let q=Object.create(questionObj);
  q.text=text;
  q.answers=answers;
  q.answer=answer;
  return q;
}
const questionSet=[
createQuestion(
  `Whose the only player to play with both Bill Russell and Larry Bird?`,[ `Dave Cowens`,`Kevin McHale`, `Nate Archibald`, `Don Chaney`], `Don Chaney`),
createQuestion(
  `How many titles did Lew Alcindor Win? `,[
    `6`, 
    `5`, 
    `1`, 
   `3`],"1"),
   createQuestion(
     `Which of These Hall of Fame Forwards Scored the Most Points?`,[
    `Larry Bird`, 
   `Charles Barkley`, 
    `Tim Duncan`, 
    `Elvin Hayes`],`Elvin Hayes`),
 
   createQuestion(
 `Which team Drafted Kobe Bryant?`,
    [`The Lakers`, 
    `The Bobcats`, 
   `The Hornets`, 
 `The Bulls`],
 `The Hornets`),
 
    createQuestion( 
      `Before Russell Westbrook last Year who was the only player to average a triple double for an whole season?`,
  [`Michael Jordan`, 
  `Lebron James`, 
  `Wilt Chamberlain`, 
    `Oscar Robertson`],
     `Oscar Robertson`),
  createQuestion( 
 `What was the final score of the lowest scoring game in NBA History?`,
    [`30-27`,
    `19-18`, 
    `10-7`, 
    `40-36`],
    `19-18`),
  createQuestion(
   `What is the hometown of Hall of Fame Coach Chuck Daly? `,
 [`Rochester NY`, 
    `Detroit MI`, 
    `Kane PA`, 
   `Los Angeles CA`],
    `Kane PA`),
  createQuestion(
  `Who is the Lakers all-time leading Rebounder?`,
  [`Shaq`, 
  `Wilt`, 
  `Baylor`, 
  `Mikan`],
  `Baylor`),  
  
 createQuestion(
    `Which player scored the most points during the 1980s?`,
   [ `Michael Jordan`, 
     `Larry Bird`, 
    `Alex English`, 
   `Bernard King`],
    `Alex English`),
    
createQuestion(
  `Who is the only player ever with at least 30,000 points, 7,000 rebounds and 7,000 assists?`,
 [`Michael Jordan`, 
  `Lebron James`, 
  `Wilt Chamberlain`, 
 `Oscar Robertson`],
 `Lebron James`)

];

// const ANSWERS = [ 
//   `Don Chaney`, 
//   `1`, 
//   `Elvin Hayes`, 
//   `The Hornets`, 
//   `Oscar Robertson`, 
//   `19-18`, 
//   `Kane PA`, 
//   `Baylor`, 
//   `Alex English`, 
// //   `Lebron James`,
 
// ];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form >
      <fieldset class="answerbox">
      <legend> Select an Answer 
      </lengend>
        <label class="answer">
          <input type="radio"  name="option" checked></input>
          <span class="answerlabel">${question.answers[0]}</span>
        </label>
  
        <label class="answer">
          <input  type="radio" name="option"></input>
          <span class="answerlabel">${question.answers[1]}</span>
        </label>
  
        <label class="answer">
          <input type="radio" name="option"></input>
          <span class="answerlabel">${question.answers[2]}</span>
        </label>
  
        <label class="answer">
          <input  type="radio" name="option"></input>
          <span class="answerlabel">${question.answers[3]}</span>
        </label>
      </fieldset>  
      <button class ="submitbutton" id="js-submit-button" aria-label="Submit Answer">Submit</button>

    </form>

    <div class = "score" id="status-bar">
      <span id="question-count">Question: ${questionNum}/${questionSet.length}</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('#app').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#app').on('click', '#js-next-button', function(event) {

    if(questionNum === questionSet.length) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#app').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#app').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  return questionSet[questionNum - 1].checkAnswer(answer.text())

}

function generateCorrectFeedback() {
  $('#app').html(correctFeedback);
  $('.correct').focus();
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2 class="correct" tabindex="0">Correct!</h2>
    <img alt="Yes!!" title="Yes" src="https://media1.giphy.com/media/ilqOZQ3p8WwlFbsCLm/giphy.gif">
    <button id="js-next-button" aria-label="Next question">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#app').html(incorrectFeedbackTemplate(questionNum));
  $('.incorrect').focus();
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2 class="incorrect" tabindex="0">Nope! It was ${questionSet[questionNum - 1].answer}!</h2>
      <img alt="No no no" title="No no no" src="http://assets.sbnation.com/assets/2745745/lefrown.gif">
      <button id="js-next-button" aria-label="Next question">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#app').html(`
    <section id="final-page">
      <h2 class="final-score" tabindex="0">Final Score: ${correctAnswers} out of ${questionSet.length}</h2>
      <button id="js-restart-button">Play Again?</button>
    </section>
  `);
  $('.final-score').focus();
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();