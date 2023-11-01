const lettersDiv = document.querySelector("#letter-buttons")
const categoryDiv = document.querySelector("#category")
const guessWordDiv = document.querySelector("#guess-word")
const hangman = document.querySelector("#hangman")
let lives = 0
let dashWordToGuess = []
let rendomWordArray = []
let category = ''

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

const categories ={
    city: ['belgrade','milan','chikago'],
    animal:['cat','dog','cow']
}

function resetGame(){
    lives = 0
    rendomWordArray = []
    dashWordToGuess = []
    guessWordDiv.innerHTML = ''
    category = ""
    renderHangman(lives) 
    let letterBtn = document.querySelectorAll('.letterBtn')
    letterBtn.forEach(b => {
        b.disabled=false
    })
}

function renderLetterAndCategoryButtons () {
    alphabet.forEach(letter => {
        lettersDiv.innerHTML += `<button id="${letter}" class="letterBtn" onclick = selectedLetter('${letter}')>${letter}</button>`
    })

    for (let category in categories) {
        categoryDiv.innerHTML +=`<button onclick = getRendomWord('${category}')>${category}</button>`
    } 
}
renderLetterAndCategoryButtons()

function getRendomWord (selectedCategory) {
    resetGame()
    category = selectedCategory
    const rendomWordIndex =  Math.floor(Math.random() * categories[category].length); 
    let rendomWord = categories[category][rendomWordIndex]

    rendomWordToArray(rendomWord)
}
function rendomWordToArray (rendomWord) {
    rendomWordArray = rendomWord.split('')
    // rendomWordArray.forEach(letter => 
    // array.push("_") )
    dashWordToGuess = new Array(rendomWordArray.length).fill('_')

    renderDashWordToGuess()
} 

function renderDashWordToGuess(){
    guessWordDiv.innerHTML = ''

    dashWordToGuess.forEach(el => {
        guessWordDiv.innerHTML += el+" "

    })
}

function selectedLetter(letter){
    if(category === "") return alert("Choose category")
    if(lives === 5) return alert('Game over')
    if (JSON.stringify(rendomWordArray)==JSON.stringify(dashWordToGuess)){
        return alert ("You win!")
    }

    let text

    if (rendomWordArray.includes(letter)){
        disableButton(letter)

        let index = rendomWordArray.indexOf(letter)
        dashWordToGuess[index]=letter

        renderDashWordToGuess()
   
        if (JSON.stringify(rendomWordArray)==JSON.stringify(dashWordToGuess)){
            text = "You win!"
            endGame(text)
        }

    } else{
        disableButton(letter)

        lives ++
        console.log(`lives:${lives}`)

        renderHangman(lives)

        if (lives === 5) {
            text = "Game over!"
            endGame(text)
        }
    }
}

function disableButton(letter) {
    let letterButton = document.getElementById(letter)
    letterButton.disabled = true
}

function endGame(text) {
    hangman.innerHTML += `<p>${text}</p>` 
    hangman.innerHTML += `<button onclick=resetGame()>Play Again</button>` 
}

function renderHangman (lives) {
    hangman.innerHTML = `<img src="./img/${lives}.png">`
}

