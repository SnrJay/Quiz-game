const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  console.log('started')
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedbutton = e.target
  const correct = selectedbutton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the name of this program?',
    answers: [
      {text: 'start.ng', correct: true},
      {text: 'hotels.ng', correct: false},
      {text: 'NCDC', correct: false}
    ]
  },
  {
    question: 'Why can we not go outside?',
    answers: [
      {text: 'Covid-19', correct: true},
      {text: 'Ebola', correct: false},
      {text: 'The flu', correct: false}
    ]
  },
  {
    question: 'Steve Jobs is the founder of?',
    answers: [
      {text: 'Apple', correct: true},
      {text: 'Samsung', correct: false},
      {text: 'Nokia', correct: false}
    ]
  },
  {
    question: 'The Legal age of Consent in Nigeria is?',
    answers: [
      {text: '16', correct: false},
      {text: '18', correct: true},
      {text: '21', correct: false}
    ]
  },
  {
    question: 'Who is responsible for the outbreak?',
    answers: [
      {text: 'I do not know', correct: true},
      {text: 'China', correct: false},
      {text: 'United States', correct: false}
    ]
  },
]