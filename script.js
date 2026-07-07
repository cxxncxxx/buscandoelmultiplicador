/* =========================================
   BUSCANDO EL MULTIPLICADOR
   SCRIPT.JS
   PARTE 1 - CONFIGURACIÓN Y TABLERO
========================================= */


// ================================
// ELEMENTOS HTML
// ================================

const board = document.getElementById("board");

const restartBtn = document.getElementById("restartBtn");

const attemptsContainer = document.getElementById("attempts");

const statusText = document.getElementById("status");

const winScreen = document.getElementById("winScreen");

const loseScreen = document.getElementById("loseScreen");

const playAgain = document.getElementById("playAgain");

const tryAgain = document.getElementById("tryAgain");


// ================================
// CONFIGURACIÓN DEL JUEGO
// ================================

const TOTAL_CELLS = 200;

const MAX_ATTEMPTS = 3;


// ================================
// VARIABLES
// ================================

let multiplierPosition;

let attempts;

let gameOver = false;

let cells = [];


// ================================
// INICIAR JUEGO
// ================================

function startGame(){

    board.innerHTML = "";

    cells = [];

    attempts = MAX_ATTEMPTS;

    gameOver = false;


    hideScreens();


    updateAttempts();


    statusText.textContent =
        "Elegí una casilla y encontrá el multiplicador";


    // posición aleatoria del multiplicador

    multiplierPosition =
        Math.floor(
            Math.random() * TOTAL_CELLS
        );


    createBoard();

}



// ================================
// CREAR TABLERO
// ================================

function createBoard(){


    for(
        let i = 0;
        i < TOTAL_CELLS;
        i++
    ){


        const cell =
            document.createElement("div");


        cell.classList.add("cell");


        cell.dataset.index = i;


        // Número visible de casilla
        cell.textContent = i + 1;



        cell.addEventListener(
            "click",
            () => selectCell(cell, i)
        );


        board.appendChild(cell);


        cells.push(cell);


    }


}



// ================================
// OCULTAR PANTALLAS
// ================================

function hideScreens(){


    winScreen.classList.add("hidden");

    loseScreen.classList.add("hidden");


}



// ================================
// EVENTOS
// ================================


restartBtn.addEventListener(
    "click",
    startGame
);


playAgain.addEventListener(
    "click",
    startGame
);


tryAgain.addEventListener(
    "click",
    startGame
);



// ================================
// ARRANCAR
// ================================

startGame();

/* =========================================
   PARTE 2 - LÓGICA DE CLICS Y RESULTADOS
========================================= */


// ================================
// SELECCIONAR CASILLA
// ================================

function selectCell(cell, index){


    // Si terminó el juego, no hace nada

    if(gameOver){

        return;

    }



    // Evitar seleccionar una casilla usada

    if(cell.classList.contains("selected")){

        return;

    }



    cell.classList.add("selected");



    // Comprobar multiplicador

    if(index === multiplierPosition){


        winGame(cell);


    }else{


        failCell(cell);


    }



}



// ================================
// CASILLA FALLIDA
// ================================

function failCell(cell){


    attempts--;


    cell.classList.add("fail");


    statusText.textContent =
        "❌ No encontraste el multiplicador";


    updateAttempts();



    // Vibración en móviles

    if(navigator.vibrate){

        navigator.vibrate(150);

    }



    // Si no quedan intentos

    if(attempts <= 0){


        endGame();


    }


}



// ================================
// ENCONTRAR ×2
// ================================

function winGame(cell){


    gameOver = true;


    cell.classList.add("win");


    statusText.textContent =
        "🎉 ¡Encontraste el ×2!";


    setTimeout(()=>{


        showWin();


    },700);



}



// ================================
// TERMINAR PARTIDA
// ================================

function endGame(){


    gameOver = true;


    board.classList.add("locked");


    statusText.textContent =
        "❌ Se terminaron los intentos";


    setTimeout(()=>{


        showLose();


    },700);



}



// ================================
// ACTUALIZAR INTENTOS
// ================================

function updateAttempts(){


    const lives =
        document.querySelectorAll(".life");



    lives.forEach((life,index)=>{


        if(index < attempts){


            life.classList.add("active");

            life.classList.remove("used");


        }else{


            life.classList.remove("active");

            life.classList.add("used");


        }


    });


}

/* =========================================
   PARTE 3 - PANTALLAS Y EFECTOS VISUALES
========================================= */


/* ================================
   MOSTRAR VICTORIA
================================ */


function showWin(){


    winScreen.classList.remove("hidden");


    createConfetti();


    createFlash();



}



/* ================================
   MOSTRAR DERROTA
================================ */


function showLose(){


    loseScreen.classList.remove("hidden");


}



/* ================================
   PARTÍCULAS DE ERROR
================================ */


function createParticles(cell){


    const rect =
        cell.getBoundingClientRect();



    for(
        let i = 0;
        i < 12;
        i++
    ){


        const particle =
            document.createElement("span");



        particle.classList.add(
            "particle"
        );



        particle.style.left =
            rect.left +
            rect.width / 2 +
            "px";



        particle.style.top =
            rect.top +
            rect.height / 2 +
            "px";



        particle.style.setProperty(
            "--x",
            `${Math.random()*160-80}px`
        );


        particle.style.setProperty(
            "--y",
            `${Math.random()*160-80}px`
        );



        document
            .getElementById("particles")
            .appendChild(particle);



        setTimeout(()=>{


            particle.remove();


        },800);


    }


}



// ================================
// CONFETI GANADOR
// ================================


function createConfetti(){


    const container =
        document.getElementById("particles");



    for(
        let i = 0;
        i < 80;
        i++
    ){


        const piece =
            document.createElement("span");



        piece.classList.add(
            "confetti"
        );



        piece.style.left =
            Math.random()*100 +
            "%";



        piece.style.animationDelay =
            Math.random()*2 +
            "s";



        piece.style.transform =
            `
            rotate(
                ${Math.random()*360}deg
            )
            `;



        container.appendChild(piece);



        setTimeout(()=>{


            piece.remove();


        },4000);



    }


}



// ================================
// FLASH DORADO
// ================================


function createFlash(){


    const flash =
        document.createElement("div");


    flash.classList.add(
        "gold-flash"
    );



    document.body.appendChild(flash);



    setTimeout(()=>{


        flash.remove();


    },800);



}

/* =========================================
   PARTE 4 - SONIDOS Y DETALLES FINALES
========================================= */


// ================================
// AUDIOS
// ================================

const clickSound =
    document.getElementById("clickSound");

const failSound =
    document.getElementById("failSound");

const winSound =
    document.getElementById("winSound");

const restartSound =
    document.getElementById("restartSound");



// ================================
// REPRODUCIR SONIDO
// ================================

function playSound(sound){


    if(!sound){

        return;

    }


    sound.currentTime = 0;


    sound.play()
    .catch(()=>{});


}



// ================================
// MODIFICAR FAILCELL
// ================================

// Guardamos la función anterior

const oldFailCell = failCell;



failCell = function(cell){


    oldFailCell(cell);


    playSound(failSound);


    createParticles(cell);


};




// ================================
// MODIFICAR WIN
// ================================


const oldWinGame = winGame;



winGame = function(cell){


    oldWinGame(cell);


    playSound(winSound);


};




// ================================
// REINICIO CON SONIDO
// ================================


const oldStartGame = startGame;



startGame = function(){


    playSound(restartSound);


    oldStartGame();


};




// ================================
// CLICK GENERAL
// ================================


board.addEventListener(
    "click",
    (e)=>{


        if(
            e.target.classList.contains("cell")
        ){

            playSound(clickSound);

        }


    }

);

