const trous = document.querySelectorAll(".trou");
const scoreBoard = document.querySelector(".score");
const taupes = document.querySelectorAll(".taupe");
let lastTrou;
let timeUp = false;
let score = 0;



function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomTrou(trous) {
    const i = Math.floor(Math.random() * trous.length);
    const trou = trous[i];
    if (trou === lastTrou) {
        console.log("C'est toujours le même trou !");
        return randomTrou(trous);
    }
    lastTrou = trou;
    return trou;
}

function peep() {
    const time = randomTime(400, 1000);
    const trou = randomTrou(trous);
    trou.classList.add("up");
    setTimeout(() => {
        trou.classList.remove("up");
        if(!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.classList.remove("up");
    scoreBoard.textContent = score;
}

taupes.forEach(taupe => taupe.addEventListener("click", bonk));