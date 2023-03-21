const rulesButton = document.querySelector('[data-btn-rules]')
const closeButton = document.querySelector('[data-btn-close]')
const btnRestart = document.querySelector('[data-btn-restart]')
const rulesModal = document.querySelector('[data-rules-modal]')
const selectionButtons = document.querySelectorAll('[data-selection]')
const yourScoreSpan = document.querySelector('[data-score]')
const resultContainer = document.querySelector('[data-result-step]')
const selectionsContainer = document.querySelector('[data-selections-container]')
const yourSelectionButton = document.querySelector('[data-your-selection]')
const computerSelectionButton = document.querySelector('[data-computer-selection]')
const loadingCircle = document.querySelector('[data-loading-circle]')
const winnerTextElement = document.querySelector('[data-text-winner]')
const SELECTIONS = [
  {
    name: 'rock',
    beats: 'scissors'
  },
  {
    name: 'paper',
    beats: 'rock'
  },
  {
    name: 'scissors',
    beats: 'paper'
  }
]

rulesButton.addEventListener('click', () => {
  rulesModal.classList.toggle('hidden')
})

closeButton.addEventListener('click', () => {
  rulesModal.classList.toggle('hidden')
})

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
  })
})

btnRestart.addEventListener('click', () => {
  selectionsContainer.classList.remove('hidden')
  resultContainer.classList.add('hidden')
  computerSelectionButton.classList = 'selection hidden'
  yourSelectionButton.classList = 'selection'
  loadingCircle.classList.remove('hidden')
})

function makeSelection(selection) {
  const computerSelection = randomSelection()
  if (computerSelection.name === selection.name) {
    return displayDraw(selection, computerSelection)
  }
  const yourWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  displayMySelection(selection)
  displayComputerSelection(computerSelection)

  if (yourWinner) updateScore(true)
  if (computerWinner) updateScore(false)
}

function displayMySelection(selection) {
  selectionsContainer.classList.add('hidden')
  resultContainer.classList.remove('hidden')
  yourSelectionButton.classList.add(`selection-${selection.name}`)
  yourSelectionButton.querySelector('img').src = `../images/icon-${selection.name}.svg`
}

function displayComputerSelection(computerSelection) {
  setTimeout(() => {
    loadingCircle.classList.add('hidden')
    computerSelectionButton.classList =  `selection selection-${computerSelection.name}`
    computerSelectionButton.querySelector('img').src = `../images/icon-${computerSelection.name}.svg`
  }, 500)
}

function displayDraw(mySelection, computerSelection) {
  displayComputerSelection(computerSelection)
  displayMySelection(mySelection)
  winnerTextElement.innerText = 'DRAW'
}

function updateScore(isMyWin) {
  if (isMyWin) {
    yourScoreSpan.innerText = parseInt(yourScoreSpan.innerText) + 1
    winnerTextElement.innerText = 'YOU WIN'
  } else {
    yourScoreSpan.innerText = parseInt(yourScoreSpan.innerText) - 1
    winnerTextElement.innerText = 'YOU LOSE'
  }
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]
}