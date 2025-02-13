"use strict";

const style = document.createElement('style');
style.textContent = `
    body {
        text-align: center;
        margin-top: 120px;
        background-color:rgb(248, 213, 214); 
    }
    .ty {
        margin: 0;
    }
    .timer {
        font-size: 30px;
        margin: 0;
        margin-bottom: 10px;
    }
    .return {
        color: black;
        font-size: 30px;S
        border: 3px solid black;
    }
    .stop {
        font-size: 25px;
        margin: 20px;
        background-color:rgb(124, 191, 224); 
        color: white;
        border-radius: 15px;
        width: 150px;
        height: 60px;
    }
    .textbox {
        font-size: 30px;
        text-align: center;
        border-radius: 15px;
        width: 500px;
        height: 50px;
    }
    .correct {
        color: green;
    }
    .incorrect {
        color: red;
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
        z-index: 1000;
    }
    .overlay-button {
        margin: 10px;
        padding: 10px 20px;
        font-size: 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .overlay-button.resume {
        background-color: #4fc3f7; 
        color: white;
    }
    .overlay-button.top {
        background-color:rgb(41, 246, 167); 
        color: white;
    }
`;
document.head.appendChild(style);

let list = ['apple', 'grape', 'banana', 'cherry', 'orange', 'melon', 'peach', 'strawberry', 'kiwi', 'blueberry'];

let usedWords = [];  
let currentIndex = 0;
let misTypingCount = 0;
let startTime;
let timerInterval;
let previousLength = 0;

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    input.setAttribute('autocomplete', 'off');
    input.addEventListener('input', checkType);
    document.getElementById('pauseDown').addEventListener('click', pauseGame);

    currentIndex = getNextWord();  
    document.getElementById('display').innerText = list[currentIndex];

    input.focus();
    input.select();

    startGame();
});

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

function getNextWord() {
    if (usedWords.length === list.length) {
        return null;  
    }

    let randomIndex;
    do {
        randomIndex = getRandomIndex(list.length);  
    } while (usedWords.includes(randomIndex));  

    usedWords.push(randomIndex);  

    return randomIndex;  
}

function startGame() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function checkType() {
    const input = document.getElementById('input');
    const display = document.getElementById('display');
    let displayText = '';
    let isMistyped = false;

    for (let i = 0; i < list[currentIndex].length; i++) {
        if (i < input.value.length) {
            if (input.value[i] === list[currentIndex][i]) {
                displayText += `<span class="correct">${list[currentIndex][i]}</span>`;
            } else {
                displayText += `<span class="incorrect">${list[currentIndex][i]}</span>`;
                isMistyped = true;
            }
        } else {
            displayText += list[currentIndex][i];
        }
    }

    display.innerHTML = displayText;

    if (input.value.length > previousLength && isMistyped) {
        misTypingCount++;
        document.getElementById('mis').innerText = `ミスタイピング数: ${misTypingCount}`;
    }

    previousLength = input.value.length;

    if (input.value === list[currentIndex]) {
        currentIndex = getNextWord();  
        if (currentIndex !== null) {
            input.value = '';  
            previousLength = 0;
            document.getElementById('display').innerText = list[currentIndex];

            input.focus();
            input.select();
        } else {
            endcopGame()
        }
    }
}

function updateTimer() {
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000);
    const remainingTime = 50 - elapsed;
    document.getElementById('downTimer').innerText = `残り時間: ${remainingTime}秒`;
    if (remainingTime <= 0) {
        endoverGame();
    }
}

function pauseGame() {
    clearInterval(timerInterval);

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    overlay.style.display = 'flex';

    const overContent = document.createElement('div');
    const pauseMessage = document.createElement('h2');
    pauseMessage.textContent = '一時停止中';

    const reButton = document.createElement('button');
    reButton.className = 'overlay-button resume';
    reButton.textContent = '再開';
    reButton.addEventListener('click', reGame);

    const topButton = document.createElement('button');
    topButton.className = 'overlay-button top';
    topButton.textContent = 'トップへ戻る';
    topButton.addEventListener('click', goToTop);

    overContent.appendChild(pauseMessage);
    overContent.appendChild(reButton);
    overContent.appendChild(topButton);

    overlay.appendChild(overContent);
    document.body.appendChild(overlay);
}

function reGame() {
    input.focus();
    input.select();
    document.getElementById('overlay').remove();
    startTime = new Date(new Date() - (50 - parseInt(document.getElementById('downTimer').innerText.split(' ')[1])) * 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

function goToTop() {
    document.getElementById('overlay').remove();
    window.scrollTo({top: 0, behavior: 'smooth'});
    window.location.href = 'finish.html'; 
}

function endoverGame() {
    clearInterval(timerInterval);

    const resultOver = document.createElement('div');
    resultOver.id = 'resultOver';
    resultOver.className = 'overlay';
    resultOver.style.display = 'flex';

    const resultContent = document.createElement('div');
    const resultMessage = document.createElement('h2');
    resultMessage.textContent = '時間切れ';

    const topButton = document.createElement('button');
    topButton.className = 'overlay-button top';
    topButton.textContent = 'トップへ戻る';
    topButton.addEventListener('click', () => {
        window.location.href = 'finish.html';
    });

    resultContent.appendChild(resultMessage);
    resultContent.appendChild(topButton);
    resultOver.appendChild(resultContent);
    document.body.appendChild(resultOver);
}

function endcopGame() {
    clearInterval(timerInterval);  
  
    const resultOver = document.createElement('div');
    resultOver.id = 'resultOver';
    resultOver.className = 'overlay';
    resultOver.style.display = 'flex';
  
    const resultContent = document.createElement('div');
    const resultMessage = document.createElement('h2');
    resultMessage.textContent = 'ゲーム終了';
  
    const timeElapsed = Math.floor((new Date() - startTime) / 1000);  
    const resultText = document.createElement('p');
    resultText.innerHTML = `ミスタイピング数: ${misTypingCount} <br> 経過時間: ${timeElapsed}秒`;
  
    const topButton = document.createElement('button');
    topButton.className = 'overlay-button top';
    topButton.textContent = 'トップへ戻る';
    topButton.addEventListener('click', () => {
      window.location.href = 'finish.html';  
    });
    
  
    resultContent.appendChild(resultMessage);
    resultContent.appendChild(resultText);
    resultContent.appendChild(topButton);
    resultOver.appendChild(resultContent);
    document.body.appendChild(resultOver);
}
