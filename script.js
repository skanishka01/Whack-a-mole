// const cursor = document.querySelector('.cursor')
// const holes = [...document.querySelectorAll('.hole')]
// const scoreEl = document.querySelector('.score span')
// let score = 0

// const sound = new Audio("assets/smash.mp3")

// function run(){
//     const i = Math.floor(Math.random() * holes.length)
//     const hole = holes[i]
//     let timer = null

//     const img = document.createElement('img')
//     img.classList.add('mole')
//     img.src = 'assets/mole.png'

//     img.addEventListener('click', () => {
//         score += 10
//         sound.play()
//         scoreEl.textContent = score
//         img.src = 'assets/mole-whacked.png'
//         clearTimeout(timer)
//         setTimeout(() => {
//             hole.removeChild(img)
//             run()
//         }, 500)
//     })

//     hole.appendChild(img)

//     timer = setTimeout(() => {
//         hole.removeChild(img)
//         run()
//     }, 1500)
// }
// run()

// window.addEventListener('mousemove', e => {
//     cursor.style.top = e.pageY + 'px'
//     cursor.style.left = e.pageX + 'px'
// })
// window.addEventListener('mousedown', () => {
//     cursor.classList.add('active')
// })
// window.addEventListener('mouseup', () => {
//     cursor.classList.remove('active')
// })


const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const timerEl = document.querySelector('.timer span');
const gameOverEl = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');

let score = 0;
let timeLeft = 30; // Total game time in seconds
const sound = new Audio("assets/smash.mp3");

function run() {
    if (timeLeft <= 0) return; // Stop spawning moles when the timer ends

    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'assets/mole.png';

    img.addEventListener('click', () => {
        score += 10;
        sound.play();
        scoreEl.textContent = score;
        img.src = 'assets/mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            run();
        }, 500);
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
        if (hole.contains(img)) {
            hole.removeChild(img);
        }
        run();
    }, 1500);
}

function startTimer() {
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    finalScoreEl.textContent = score;
    gameOverEl.style.display = 'flex'; // Show the overlay
}

// Restart the game
function restartGame() {
    window.location.reload();
}

// Move the cursor with the mouse
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

// Add active class to the cursor on mousedown
window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

// Remove active class from the cursor on mouseup
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Start the game
run();
startTimer();
