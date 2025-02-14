"use strict";

const style = document.createElement('style');
style.textContent = `
    #countdown {
        background-color: white; 
        padding: 40px;
        padding-left: 300px;
        padding-right: 300px;
        border-radius: 20px; 
        border: 2px solidrgb(54, 73, 92); 
        font-size: 50px; 
        color:rgb(20, 17, 17); 
        text-align: center; 
        // margin: 30px; 
    }
`;
document.head.appendChild(style);

const Click1 = document.getElementById('click1');
const Click2 = document.getElementById('click2');
const Click3 = document.getElementById('click3');

Click1.addEventListener('click', () => {
    const outEl = document.getElementById('out');

    outEl.style.display = 'none';

    const countdownEl = document.createElement('h1');
    countdownEl.id = 'countdown';
    document.body.appendChild(countdownEl);

    let countdown = 3;
    countdownEl.textContent = countdown;
    const countdownIn = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
            countdownEl.textContent = countdown;
        } else if (countdown === 0) {
            countdownEl.textContent = 'Start';
        } else {
            clearInterval(countdownIn);
            window.location.href = 'finish1.html';
        }
    }, 1000);
});

Click2.addEventListener('click', () => {
    const outEl = document.getElementById('out');

    outEl.style.display = 'none';

    const countdownEl = document.createElement('h1');
    countdownEl.id = 'countdown';
    document.body.appendChild(countdownEl);

    let countdown = 3;
    countdownEl.textContent = countdown;
    const countdownIn = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
            countdownEl.textContent = countdown;
        } else if (countdown === 0) {
            countdownEl.textContent = 'Start';
        } else {
            clearInterval(countdownIn);
            window.location.href = 'finish2.html';
        }
    }, 1000);
});

Click3.addEventListener('click', () => {
    const outEl = document.getElementById('out');

    outEl.style.display = 'none';

    const countdownEl = document.createElement('h1');
    countdownEl.id = 'countdown';
    document.body.appendChild(countdownEl);

    let countdown = 3;
    countdownEl.textContent = countdown;
    const countdownIn = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
            countdownEl.textContent = countdown;
        } else if (countdown === 0) {
            countdownEl.textContent = 'Start';
        } else {
            clearInterval(countdownIn);
            window.location.href = 'finish3.html';
        }
    }, 1000);
});

