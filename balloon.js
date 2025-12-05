// let score = document.getElementById("score");
let score = 0;
let time = 30;
let timer;
let speed = 700;
let lives = 3;

function startGame() {
    score = 0;
    time = 30;
    speed = 700;
    lives = 3;
    document.getElementById("score").innerHTML = "Score: 0";
    document.getElementById("timer").innerHTML = "Time left: 30";
    document.getElementById("lives").innerHTML = "Lives: 💓 💓 💓";
    let area = document.getElementById("area");
    area.innerHTML = "";
    for (let i = 1; i <= 10; i++) {
        createBalloon();
        // let b = document.createElement("div");
        // b.innerHTML = "🎈";
        // b.style.position = "absolute";
        // b.style.top = Math.random()*250 + "px";
        // b.style.left = Math.random()*250 + "px";
        // b.style.cursor = "pointer";
        // b.style.fontSize = "25px";
        // b.onclick = function(){
        //     // allow scoring only while the time is running
        //     if(time > 0){
        //     b.remove();
        //     score++;
        //     document.getElementById("score").innerHTML = "Score: " + score;
        //     }
        // }
        // area.appendChild(b);

    }
    // timer funct 30s max

    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        document.getElementById("timer").innerHTML = "Time left: " + time;
        // Every 5 sec the speed should increase
        if (time % 5 === 0 && time !== 30) {
            speed = Math.max(150, speed - 150);
        }
        if (time <= 0) {
            // clearInterval(timer);
            // document.getElementById("area").innerHTML = "";
            // document.getElementById("timer").innerHTML = "Time Over";
            // document.getElementById("score").innerHTML = "Final Score: " + score + "🎊";
            endGame("Time Over");
        }
    }, 1000);
}

function createBalloon() {
    let b = document.createElement("div");
    // random chance of being bombed
    let isBomb = Math.random() < 0.2;
    let isGolden = Math.random() >= 0.20 && Math.random() < 0.30;
    if (isBomb) {
        b.innerHTML = "💣";
        b.style.color = "red";
    } else if (isGolden) {
        score += 5;
        b.innerHTML = "🎇";
        b.style.color = "gold";
    }
    else {
        b.innerHTML = "🎈";
    }
    // document.getElementById("score").innerHTML = "Score:" + score;
    // createBalloon();
    // b.innerHTML = "🎈";
    b.style.position = "absolute";
    b.style.top = Math.random() * 250 + "px";
    b.style.left = Math.random() * 250 + "px";
    b.style.cursor = "pointer";
    b.style.fontSize = "25px";
    b.onclick = function () {
        // allow scoring only while the time is running
        if (time > 0) {
            b.remove();
            if (isBomb) {
                // score -= 3;
                lives--;
                updateLives();
                if (lives <= 0) {
                    endGame("Out Of Lives");
                    return;
                }
            } else if (isGolden) {
                score += 5;
            }
            else {
                score++;
            }
            document.getElementById("score").innerHTML = "Score: " + score;
            createBalloon();
        }
    }
    // area.appendChild(b);
    document.getElementById("area").appendChild(b);

    // movement interval

    let move = setInterval(() => {
        if (time <= 0 || lives <= 0) {
            clearInterval(move);
            return;
        }
        b.style.top = Math.random() * 250 + "px";
        b.style.left = Math.random() * 250 + "px";
    }, speed);
}

// update lives display

function updateLives() {
    let hearts = "";
    for (let i = 0; i < lives; i++) {
        hearts += "💓";
    }
    document.getElementById("lives").innerHTML = "Lives:" + hearts;
}

function endGame(message) {
    clearInterval(
        timer
    )
    document.getElementById("area").innerHTML = "";
    document.getElementById("timer").innerHTML = message;
    document.getElementById("score").innerHTML = "Final score: " + score;
}
