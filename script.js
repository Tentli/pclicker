const myCanvas = document.getElementById("canvas");

myCanvas.width = 1334; 
myCanvas.height = 1200;
myCanvas.style.width = "667px";
myCanvas.style.height = "600px";
myCanvas.getContext("2d").scale(2,2);
// This is the fix for Apple's screens...if we want to come back to this issue, examine the page on devicePixelRatio to fix it for all screens: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio

let i=0;
let counter=0;


const bg = document.getElementById("bg");
const bg_titty_1 = document.getElementById("bg_titty_1");
const bg_titty_2 = document.getElementById("bg_titty_2");
const bg_titty_3 = document.getElementById("bg_titty_3");
const bg_titty_4 = document.getElementById("bg_titty_4");
const belly_1 = document.getElementById("belly_1");
const belly_2 = document.getElementById("belly_2");
const belly_3 = document.getElementById("belly_3");
const belly_4 = document.getElementById("belly_4");
const belly_5 = document.getElementById("belly_5");
const belly_6 = document.getElementById("belly_6");
const fg_titty_1 = document.getElementById("fg_titty_1");
const fg_titty_2 = document.getElementById("fg_titty_2");
const fg_titty_3 = document.getElementById("fg_titty_3");
const fg_titty_4 = document.getElementById("fg_titty_4");
const fg = document.getElementById("fg");


async function drawLayer(image_name) {
    const ctx = myCanvas.getContext("2d"); //this is necessary to have here
    ctx.drawImage(image_name, 0, 0, 1000, 900, 0, 0, 667, 600);
}

async function drawBelly(image_name) {
    const ctx = myCanvas.getContext("2d"); 
    ctx.drawImage(image_name, 0, 0, 1000, 900, i/3, 0, 667, 600);
}

function draw(image_name) {
    
    if (canvas.getContext) {
        const ctx = myCanvas.getContext("2d");
 
        drawLayer(bg)
        if (counter <= 23) {
           drawLayer(bg_titty_1);
           drawBelly(belly_1);
           drawLayer(fg_titty_1);
        }
        else if (24 <= counter && counter <= 68) {
            if (counter == 24) { 
                i = 0;
            };
            drawLayer(bg_titty_1);
            drawBelly(belly_2);
            drawLayer(fg_titty_1);
        }
        else if (69 <= counter && counter <= 113) {
            if (counter == 69) { 
                i = 0;
            };
            drawLayer(bg_titty_2);
            drawBelly(belly_3);
            drawLayer(fg_titty_2);
        }
        else if (114 <= counter && counter <= 169) {
            if (counter == 114) { 
                i = 0;
            };
            drawLayer(bg_titty_2);
            drawBelly(belly_4);
            drawLayer(fg_titty_2);
        }
        else if (170 <= counter && counter <= 220) {
            if (counter == 170) { 
                i = 0;
            };
            drawLayer(bg_titty_3);
            drawBelly(belly_5);
            drawLayer(fg_titty_3);
        }
        else if (221 <= counter && counter <= 280) {
            if (counter == 221) { 
                i = 0;
            };
            drawLayer(bg_titty_4);
            drawBelly(belly_6);
            drawLayer(fg_titty_4);
        }
        
        else {
            i = 0;
            drawLayer(bg_titty_3);
            drawBelly(belly_2);
            drawLayer(fg_titty_3);
        };        
        drawLayer(fg);
        
        ctx.strokeRect(10, 10, 157, 30);
        ctx.font = "20px serif";
 
        if (counter < 270) {
            ctx.fillText("Month " + (Math.ceil((counter)/30)).toString() + ", Day " + counter.toString(), 15, 32);
        }
        else if (270 <= counter && counter <= 280) {
            ctx.fillText("Month 9" + ", Day " + counter.toString(), 15, 32);
        }
        else if (280 <= counter && counter <= 285) {
            ctx.fillStyle = "white";
            ctx.fillRect(100, 220, 475, 100);
            ctx.fillStyle = "black";
            ctx.strokeRect(100, 220, 475, 100);
            ctx.fillText("Thanks for playing the demo of Preggo Clicker!", 140, 250);
            ctx.fillText("Please tell me if you run into bugs or have suggestions.", 120, 275);
            ctx.fillText("Where should the game go next?", 200, 300);
        }
        else {
            ctx.fillText("Congratulations!", 15, 32);
            
        }
        
    }
}

canvas.addEventListener("click", function(event) {
    counter++;
    i++;
    draw();
});


// side buttons:

function startGame() {
    draw();
}

function resetGame() {
    counter = 0;
    i = 0;
    draw();
}




// Dev Tools: 
/* Dev Tools:
function addTen() {
    counter+=10;
    i+=10;
    document.getElementById("demo").innerHTML = counter.toString();
    document.getElementById("eye").innerHTML = i.toString();
    draw();
}
function resetButton() {
    counter = 0;
    i = 0;
    document.getElementById("demo").innerHTML = counter.toString();
    document.getElementById("eye").innerHTML = i.toString();
    draw();
};
function startAt2() {
    counter = 24;
    i = 0;
    document.getElementById("demo").innerHTML = counter.toString();
    document.getElementById("eye").innerHTML = i.toString();
    draw();
} 
function startAt3() {
    counter = 69;
    i = 0;
    document.getElementById("demo").innerHTML = counter.toString();
    document.getElementById("eye").innerHTML = i.toString();
    draw();
} 
function startAt4() {
    counter = 114;
    i = 0;
    document.getElementById("demo").innerHTML = counter.toString();
    document.getElementById("eye").innerHTML = i.toString();
    draw();
} 
function startAt5() {
    counter = 170;
    i = 0;
    document.getElementById("demo").innerHTML = counter.toString();
    document.getElementById("eye").innerHTML = i.toString();
    draw();
} 
function startAt6() {
    counter = 221;
    i = 0;
    document.getElementById("demo").innerHTML = counter.toString();
    document.getElementById("eye").innerHTML = i.toString();
    draw();
} 
function goBack() {
    counter--;
    i--;
    document.getElementById("demo").innerHTML = counter.toString();
    document.getElementById("eye").innerHTML = i.toString();
    draw();
}
*/






