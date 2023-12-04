const myCanvas = document.getElementById("canvas");
// I don't know why it took so long to find this, but this...
myCanvas.width = 2134; 
myCanvas.height = 1200;
myCanvas.style.width = "667px";
myCanvas.style.height = "600px";
myCanvas.getContext("2d").scale(2,2);
// ...is the way to fix the canvas resolution problem, as described succinctly in Eric Allam (eallam)'s article "How to make the canvas not look like crap on retina" on coderwall.com
// This is the fix for Apple's screens...if we want to come back to this issue, examine the page on devicePixelRatio to fix it for all screens: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
let i=0;
let counter = 0;

const bg = document.getElementById("bg");
const bg_titty_1 = document.getElementById("bg_titty_1");
const bg_titty_2 = document.getElementById("bg_titty_2");
const belly_1 = document.getElementById("belly_1");
const belly_2 = document.getElementById("belly_2");
const fg_titty_1 = document.getElementById("fg_titty_1");
const fg_titty_2 = document.getElementById("fg_titty_2");
const fg = document.getElementById("fg");


async function drawLayer(image_name) {
    const ctx = myCanvas.getContext("2d"); //this is necessary to have here
    ctx.drawImage(image_name, 0, 0, 1000, 900, 0, 0, 1067, 600);
}

async function drawBelly(image_name) {
    const ctx = myCanvas.getContext("2d"); 
    ctx.drawImage(image_name, -i, 0, 1000, 900, 0, 0, 1067, 600);
}

draw(); //this appears to be an acceptable way to call the function. 


function draw(image_name) {
    
    if (canvas.getContext) {
        const ctx = myCanvas.getContext("2d");
        
        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fillRect(50, 50, 50, 50);
        drawLayer(bg)    
       if (i <= 12) {
           drawLayer(bg_titty_1);
           drawBelly(belly_1);
           drawLayer(fg_titty_1);
        }
        else if (13 <= i && i <= 30) {
            drawLayer(bg_titty_2);
            drawBelly(belly_2);
            drawLayer(fg_titty_2);
        }
        else {          
        };        
//        drawLayer(fg_titty_1);
        drawLayer(fg);
        let counter_text = (counter/10).toString();
        ctx.fillText(counter_text, 20, 20);
    }
}

canvas.addEventListener("click", function(event) {
    counter++;
    i++;
    let counter_text = counter.toString();
    document.getElementById("demo").innerHTML = counter_text;
    draw();
});

function resetButton() {
    counter = 0;
    i = 0;
    let counter_text = counter.toString();
    document.getElementById("demo").innerHTML = counter_text;
    draw();
};

