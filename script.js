const answer = document.querySelector('.answer')
const hangman = document.querySelector('img')

const applyBtn = document.querySelector('.apply');
const reset = document.querySelector('.reset')
const input = document.querySelector('input');

const info = document.querySelector('.info')
const lifesLeft = document.querySelector('.lifes-left')
const wrongLettersDisplay = document.querySelector('.wrong')

const status = document.querySelector('.status') // wygrana/przegrana

const words = ['javascript', 'function', 'closure', 'selector', 'string', 'number', 'switch', 'ajax']
let searchWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
const letters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9\-\/]+/;

const wrongLetters = [];
const correctLetters = [];
let fillLetters = [];

let lifes = 6;
lifesLeft.textContent = lifes;




// Funkcje do przekazywania

function hideLetters() {
    for (let i = 0; i < searchWord.length; i++) {
        fillLetters[i] = '_'
    }
}

function inputUpperCase() {
    return input.value.toUpperCase()
}

function addLetters() {
    answer.innerHTML = `<h1>${fillLetters.join(' ')}</h1>`;
}


//Funkcje do wywołania

let restart = () => {
    input.value = ''
    searchWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    lifes = 6;
    lifesLeft.textContent = 6;
    info.textContent = ''
    wrongLetters.splice(0, wrongLetters.length);
    correctLetters.splice(0, correctLetters.length);
    fillLetters.splice(0, searchWord.length)
    wrongLettersDisplay.textContent = '';
    status.textContent = '';
    hangman.setAttribute('src', `img/${lifes}-lifes.png`)
    hideLetters();
    addLetters();
}


let checkLetter = () => {
    if (lifes === 0) {
        return;
    } else if (fillLetters.join('') === searchWord) {
        return;
    } else {
        if (input.value.match(letters) || input.value.length > 1 || input.value == "") {
            info.textContent = `nieprawidłowy znak`;
        } else {
            if (searchWord.includes(inputUpperCase())) {
                for (let i = 0; i < searchWord.length; i++) {
                    if (searchWord[i].includes(inputUpperCase())) {
                        fillLetters[i] = (inputUpperCase())
                    }
                }
                addLetters()
                info.textContent = `Litera "${inputUpperCase()}" jest prawidłowa`;
                if (correctLetters.includes(inputUpperCase())) {
                    info.textContent = `Już podałeś literę "${inputUpperCase()}"`
                    lifes--
                    lifesLeft.textContent = lifes
                } else {
                    correctLetters.push(inputUpperCase())
                }
                input.value = ''
            } else {
                info.textContent = `litera "${inputUpperCase()}" jest nieprawidłowa`
                lifes--
                lifesLeft.textContent = lifes
                if (wrongLetters.includes(inputUpperCase())) {
                    info.textContent = `Już podałeś literę "${inputUpperCase()}"`
                } else {
                    wrongLetters.push(inputUpperCase())
                    wrongLettersDisplay.textContent = wrongLetters.join(', ');
                }
                input.value = '';
            }
            if (lifes === 0) {
                status.textContent = 'PRZEGRAŁEŚ';
            } else if (fillLetters.join('') === searchWord) {
                status.textContent = 'WYGRAŁEŚ';
            }
        }
        hangman.setAttribute('src', `img/${lifes}-lifes.png`)

    }

}



hideLetters();
addLetters();
reset.addEventListener('click', restart);
applyBtn.addEventListener('click', checkLetter)