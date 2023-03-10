let card_count = 0;
let mode_area = document.getElementById("select-mode-area");
let game_area = document.getElementById("game-area");
let seconds = 0;
let time = document.getElementById("time");
let time_interval;
let current_cards = [];
let game = [];
let opened_cards = [];

let cards = document.getElementsByClassName("card");
let IsOver = false;



//////////////////////Confetti///////////////////////////////////////


//-----------Var Inits--------------


let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' }];


//-----------Functions--------------
resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width;
    cy = ctx.canvas.height;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            color: colors[Math.floor(randomRange(0, colors.length))],
            dimensions: {
                x: randomRange(10, 20),
                y: randomRange(10, 30)
            },

            position: {
                x: randomRange(0, canvas.width),
                y: canvas.height - 1
            },

            rotation: randomRange(0, 2 * Math.PI),
            scale: {
                x: 1,
                y: 1
            },

            velocity: {
                x: randomRange(-25, 25),
                y: randomRange(0, -50)
            }
        });


    }
};

//---------Render-----------
render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        // Move canvas to position and rotate
        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);

        // Apply forces to velocity
        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

        // Set position
        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;

        // Delete confetti when out of frame
        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

        // Loop confetto x position
        if (confetto.position.x > canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvas.width;

        // Spin confetto by scaling y
        confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

        // Draw confetto
        ctx.fillRect(-width / 2, -height / 2, width, height);

        // Reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    });

    // Fire off another round of confetti
    if (confetti.length <= 10) initConfetti();

    window.requestAnimationFrame(render);
};


//----------Resize----------
window.addEventListener('resize', function () {
    resizeCanvas();
});

//////////////////////Confetti///////////////////////////////////////









//////////////////////////////////////////////////////////////////////////////////////////


function shuffle2DArray(array, row_count) {
    arr1D = array.flat();
    arr1D.sort(() => Math.random() - 0.5);

    const size = row_count; // set the size of the sub-arrays
    const arr2D = [];

    while (arr1D.length > 0) {
        arr2D.push(arr1D.splice(0, size)); // divide the shuffled array into sub-arrays
    }

    return arr2D;
}

function CheckCards() {
    let card_id1 = current_cards[0];
    let card_id2 = current_cards[1];
    let i_index1;
    let k_index1;
    let l = Math.sqrt(card_count);

    for (let i = 0; i < l; i++) {
        for (let k = 0; k < l; k++) {
            if (i * l + k + 1 == card_id1) {
                i_index1 = i;
                k_index1 = k;
                break;
            }
        }
    }
    for (let i = 0; i < l; i++) {
        for (let k = 0; k < l; k++) {
            if (i * l + k + 1 == card_id2) {
                i_index2 = i;
                k_index2 = k;
                break;
            }
        }
    }
    if (game[i_index1][k_index1] == game[i_index2][k_index2]) {
        opened_cards.push(card_id1);
        opened_cards.push(card_id2);

        let element1 = document.getElementById(card_id1);
        element1.style.visibility = "hidden";

        let element2 = document.getElementById(card_id2);
        element2.style.visibility = "hidden";


    }
}

function CheckWin() {
    if (IsOver) {
        time.innerHTML = "";
        game_area.style.color = "red";
        game_area.innerHTML = "<h1>GAME OVER</h1>";
    }
    else {
        if (opened_cards.length == card_count) {
            clearInterval(time_interval);
            time.innerHTML = "";
            game_area.style.color = "green";
            game_area.innerHTML = `<h1>YOU WIN</h1> <canvas class="confetti" id="canvas"></canvas>`;
            //---------Execution--------
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            cx = ctx.canvas.width;
            cy = ctx.canvas.height;

            initConfetti();
            render();
        }
    }
}

function ShowCard(card_id) {
    if (!IsOver) {
        let image_ = document.getElementById("img-" + card_id);
        if (current_cards.length == 2) {

        }
        else if (current_cards.length == 1) {
            if (current_cards[0] != card_id) {

                current_cards.push(card_id);
                let i_index;
                let k_index;
                let l = Math.sqrt(card_count);

                for (let i = 0; i < l; i++) {
                    for (let k = 0; k < l; k++) {
                        if (i * l + k + 1 == card_id) {
                            i_index = i;
                            k_index = k;
                            break;
                        }
                    }
                }
                image_.classList.add("animate__flipInY");
                image_.src = `images/${game[i_index][k_index]}.png`;


                setTimeout(() => {

                    let img1 = document.getElementById("img-" + current_cards[0]);
                    let img2 = document.getElementById("img-" + current_cards[1]);
                    for (let i = 0; i < 2; i++) {
                        let c_img = document.getElementById(`img-${current_cards[i]}`)
                        // c_img.classList.remove("animate__flipInY");
                        //c_img.classList.add("animate__fadeOutLeftBig");

                    }
                    img1.src = "images/white.png";
                    img2.src = "images/white.png";
                    CheckCards();
                    current_cards = [];
                    CheckWin();
                }, 2000);

            }
        }
        // 1    2    3    4

        // 00   01   10   11

        // i*card_count+k=3
        else {
            let i_index;
            let k_index;
            let l = Math.sqrt(card_count);
            for (let i = 0; i < l; i++) {
                for (let k = 0; k < l; k++) {
                    if (i * l + k + 1 == card_id) {
                        i_index = i;
                        k_index = k;
                        break;
                    }
                }
            }
            image_.classList.add("animate__flipInY");
            image_.src = `images/${game[i_index][k_index]}.png`;

            current_cards.push(card_id);
        }

    }
}
const css = window.document.styleSheets[0];

function Show2DArray(game, row_count) {
    game_area.innerHTML = "";
    for (let i = 0; i < row_count; i++) {
        for (let k = 0; k < row_count; k++) {
            game_area.innerHTML += `<button id="${i * row_count + k + 1}" class="card" onclick="ShowCard(${i * row_count + k + 1})" >
            <img id="img-${i * row_count + k + 1}" src="images/white.png" alt="">
        </button>`
        }
        game_area.innerHTML += "<br>";
    }
    if (card_count == 16) {
        let cards = document.getElementsByClassName("card");
        let imgs = document.getElementsByName("img");
        Array.from(cards).forEach(function (card) {
            card.style.width = game_area.style.width * 25 / 100 - 20 + "px";
            card.style.height = "25%";

        });
    }
    else if (card_count == 36) {
        let cards = document.getElementsByClassName("card");
        let imgs = document.getElementsByName("img");
        Array.from(cards).forEach(function (card) {
            card.style.width = game_area.style.width * 15 / 100 - 20 + "px";
            card.style.height = "15%";
        });
    }
}



function StartGame() {
    mode_area.style.display = "none";
    game_area.style.display = "block";

    let image_count = card_count / 2;
    let row_count = Math.sqrt(card_count);
    //create array
    let counter = 1;
    for (let i = 0; i < row_count; i++) {
        let arr = [];
        for (let k = 0; k < row_count; k++) {
            arr.push(counter);
            if (counter == image_count) counter = 0;
            counter++;

        }
        game.push(arr);
    }
    game = shuffle2DArray(game, row_count)
    console.log(game);
    Show2DArray(game, row_count);


    time_interval = setInterval(() => {

        minute = parseInt(time.innerHTML[0]) * 10 + parseInt(time.innerHTML[1]);

        seconds = parseInt(time.innerHTML[3]) * 10 + parseInt(time.innerHTML[4]);

        if (seconds > 0) {
            seconds -= 1;
        }
        else if (seconds == 0) {
            if (minute > 0) {
                seconds = 59;
                minute -= 1;
            }
            else {
                // alert("game over");
                IsOver = true;
                CheckWin();
                clearInterval(time_interval);
            }
        }
        let content = "";
        if (minute < 10) content += "0";
        content += minute;
        content += ":";
        if (seconds < 10) content += "0";
        content += seconds;
        time.innerHTML = content;
    }, 1000);




}

function EasyMode() {
    card_count = 4;
    time.innerHTML = "00:30";
    StartGame();

}
function NormalMode() {
    card_count = 16;
    time.innerHTML = "01:30";
    StartGame();
}

function HardMode() {
    card_count = 36;
    time.innerHTML = "02:30";
    StartGame();
}



