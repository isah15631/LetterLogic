'use strict';


const board = document.querySelector('.board');
const playButton = document.querySelector('input');
const playButtonIcon =playButton.getAttribute('value');
const winSpace = document.querySelector('#wins');
const lossSpace = document.querySelector('#losses');
const hintSpace = document.querySelector('#hint');
const movesSpace = document.querySelector('#moves');
const difficultySpace = document.querySelector('#difficulty');
const alphabetButtons = document.querySelectorAll('button');
const container = document.querySelector(".container");


let planets = ['mercury','mars','earth','jupiter','venus','uranus','saturn','neptune','pluto'];
let fruits = ['apple','orange','tangerine','mango','pineapple','strawberry','pawpaw','grape','pear'];
let animals = ['giraffe','elephant','lion','zebra','hyena','hippopotamus','rhinoceros','cheetah','puma','cat','dog',
'buffalo','tiger','monkey','fox','wolf','impala','deer','bear','squirrel','rabbit','rat','tortoise'];
let fishes = ['shark','tilapia','catfish','whale','salmon','dolphin','seahorse','starfish','swordfish'];
let countries = ['nigeria','ghana','togo','england','america','brazil','morocco','tunisia','jamaica','india','pakistan','ukraine','russia','palestine','iraq','iran','zimbabwe','malaysia','madagascar','australia','italy','france','spain','iceland','ireland','elsalvador','botswana']
let carBrands = ['toyota','honda','mercedes','tesla','peugeot','ford','bmw','cheverolet','bugatti','mclaren'];
let grains = ['rice','beans','maize','wheat','millet','soyabean'];
let vegetables = ['carrot','lettuce','cabbage','waterleaf','bitterleaf','okro'];


let collection = [];

collection = collection.concat(carBrands,planets,fruits,animals,fishes,countries)

let category = {planets:planets,fruits:fruits,animals:animals,countries:countries,
cars:carBrands,fishes:fishes,grains:grains,vegetables:vegetables};

let categoryNames = ['planets','fruits','animals','countries','cars','fishes','grains','vegetables'];

let time = 1000; 


window.addEventListener("load",()=>{
    document.querySelector("body").style.transition='1000ms ease-in';
    document.querySelector("body").style.background='orangered';
    document.querySelector("body").style.opacity='1';
})

alphabetButtons.forEach((button)=>{   
    setTimeout(()=>{
        button.style.display='inline';
    },time)
    button.classList.add('btn');
    time+=70;

    button.addEventListener('click',(event)=>{
        event.preventDefault();
        validateLetter(button.innerText.toLowerCase());
    })
})


function effectOn(keyPressed) {
    alphabetButtons.forEach((buttonLetter)=>{
        if (buttonLetter.innerText.toLocaleLowerCase()===keyPressed) {
            
            buttonLetter.style.color='orangered';
            buttonLetter.style.background='white';

            
        }
    })
}


function effectOff(keyPressed) {
    alphabetButtons.forEach((buttonLetter)=>{
        if (buttonLetter.innerText.toLocaleLowerCase()===keyPressed) {
            
            buttonLetter.style.color='';
            buttonLetter.style.background='';
            
        }
    })
}

window.addEventListener('keydown',(event)=>{
    event.preventDefault();
    validateLetter(event.key)
    effectOn(event.key)

})

window.addEventListener('keyup',(event)=>{
    event.preventDefault();
    effectOff(event.key)
})


playButton.addEventListener('mouseover',()=>{
    playButton.setAttribute('value',"play"+playButton.getAttribute('value'));
})

playButton.addEventListener('mouseleave',()=>{
    playButton.setAttribute('value',playButtonIcon)
})





let randomWordPicker = ()=>{
    let randomWord = collection[Math.floor(Math.random()*collection.length)];
    return randomWord;
};

let currentWord;

let currentAnswer;
let winCount = 0;
let lossCount = 0;
let poppedIndices = [];
let poppedLetters = [];

let bonusMove = 0;
let poplimit = 0;


function difficultyDisplay(diffLevel) {
    difficultySpace.innerHTML = ''
    difficultySpace.prepend(" Difficulty | "+ diffLevel)
}

function winDisplay() {
    winSpace.innerHTML = ''
    winSpace.append('games won ( '+winCount+' )')
}

function lossDisplay() {
    lossSpace.innerHTML = ''
    lossSpace.append('games lost ( '+lossCount+' )')
}

function movesDisplay() {
    movesSpace.innerHTML = ''
    movesSpace.append('moves left ( '+bonusMove+' )')
}

//this is where you to program game hints

function hintDisplay() {
    if (category.planets.includes(currentAnswer)) {
        hintSpace.innerHTML = ''
        hintSpace.append('hint | '+categoryNames[0]+' ')
    }else if (category.fruits.includes(currentAnswer)) {
        hintSpace.innerHTML = ''
        hintSpace.append('hint | '+categoryNames[1]+' ')
    }else if (category.animals.includes(currentAnswer)) {
        hintSpace.innerHTML = ''
        hintSpace.append('hint | '+categoryNames[2]+' ')
    }else if (category.countries.includes(currentAnswer)) {
        hintSpace.innerHTML = ''
        hintSpace.append('hint | '+categoryNames[3]+' ')
    }else if (category.cars.includes(currentAnswer)) {
        hintSpace.innerHTML = ''
        hintSpace.append('hint | '+categoryNames[4]+' ')
    }else if (category.fishes.includes(currentAnswer)) {
        hintSpace.innerHTML = ''
        hintSpace.append('hint | '+categoryNames[5]+' ')
    }else if (category.grains.includes(currentAnswer)) {
        hintSpace.innerHTML = ''
        hintSpace.append('hint | '+categoryNames[6]+' ')
    }else{
        hintSpace.innerHTML = ''
        hintSpace.append('hint | '+categoryNames[7]+' ')
    }
}


function pickWordAndUpdateCollection(word) {

    collection.splice(collection.indexOf(word),1)
    
}

function displayWord(word) {
    board.innerHTML=word.join(' ');
    currentWord= currentWord.join('');
}

function endGame() {
    board.innerHTML='GAME COMPLETED ! ! !';

    setTimeout(()=>{
            window.location.reload()
    },5000)
}


function wordSplitterAndPopLimiter(word) {
    
    if(word.length<=3){
        poplimit = 1;
        bonusMove = 2;
        difficultyDisplay('cheap');
    }else if (word.length<=5) {
        poplimit = 2;
        bonusMove = 3;
        difficultyDisplay('easy');
    }else if (word.length<=7) {
        poplimit = 3;
        bonusMove = 5;
        difficultyDisplay('moderate');
    }else if (word.length<=9) {
        poplimit = 4;
        bonusMove = 6;
        difficultyDisplay('hard');
    }else{
        poplimit = 5;
        bonusMove = 7;
        difficultyDisplay('difficult');
    }
    
    movesDisplay()
    currentWord = word.split('');

    let loopCount = 0;

    while (loopCount<poplimit) {

        let randomPositionOfLetter = Math.floor(Math.random()*word.length);

        if (currentWord[currentWord.indexOf(currentWord[randomPositionOfLetter])]==='_') {

        } else {
            currentWord[currentWord.indexOf(currentWord[randomPositionOfLetter])]='_';
            loopCount++;
        }
    }
    for (let index = 0; index < currentWord.length; index++) {
        const element = currentWord[index];
        if (element==='_') {
            poppedIndices.push(index)
            poppedLetters.push(currentAnswer[index])
        }
        
    }

    displayWord(currentWord)
}

function gameLogic() {
    if (collection.length>=1) {
        
    poppedIndices = [];
    poppedLetters = [];
    currentWord = randomWordPicker();
    pickWordAndUpdateCollection(currentWord);
    currentAnswer = currentWord;
    wordSplitterAndPopLimiter(currentWord)
    hintDisplay()
    } else {
        endGame()
    }
}

playButton.addEventListener('click',(event)=>{
    event.preventDefault()
    gameLogic()
})


function gameFlow() {
    if (poppedLetters.length==0 && bonusMove!=0) {
        setTimeout(()=>{board.innerHTML=' you win !!! ';},1200)
        winCount++;
        winDisplay();
        setTimeout(()=>{
            gameLogic();
        },3000)
    } else {
        
        if (bonusMove<=1) {
            bonusMove = 0
            movesDisplay()
            setTimeout(()=>{board.innerHTML=' you lose !!! ';},1200)
            lossCount++;
            lossDisplay();
            setTimeout(()=>{
                gameLogic();
            },3000)
            
        } else {
            bonusMove--;
            movesDisplay();
        }

    }

}

function validateLetter(letter) {

    currentWord = currentWord.split('')
    let correctLetterIndex = 0; 

    while(correctLetterIndex < poppedIndices.length){

        if (poppedLetters[correctLetterIndex] === letter) {

            let missingLetterIndex = poppedIndices[poppedLetters.indexOf(letter)]
            currentWord[missingLetterIndex] = letter
            poppedLetters.splice(correctLetterIndex,1)
            poppedIndices.splice(correctLetterIndex,1)
            correctLetterIndex = poppedIndices.length

        } else {
            correctLetterIndex++;
        }
        
    }
    displayWord(currentWord);
    gameFlow();
}


