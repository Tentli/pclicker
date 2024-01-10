const myCanvas = document.getElementById("my_canvas");
var myCanvas_left = myCanvas.offsetLeft + myCanvas.clientLeft,
    myCanvas_top = myCanvas.offsetTop + myCanvas.clientTop, 
    threshold_elements = [],
    bedroom_1_elements = [],
    bedroom_2_elements = [],
    front_door_elements = [],
    pantry_elements = [],
    shelves_elements = [],
    rooms_with_elements = [threshold_elements, bedroom_1_elements, bedroom_2_elements, front_door_elements, pantry_elements, shelves_elements],
    current_bedroom_1_resident = "genevieve", // hopefully this can change when we accept a new resident
    current_room = "bedroom_1",
    current_room_index = 1, // we have to change both
    time_of_day = 0,
    are_zones_on = 0; // change to 0 to disable visible click zones


var bedroom_1_counter = 0, // I'm thinking maybe we have this value as separate from the general counter? but the setInterval deal still intimidates me, so for now we have a bunch of random variables that aren't really doing anything.
    progression_counter_genevieve = 0,
    lola_progression_counter = 0;

const DPR = window.devicePixelRatio;

let canvas_style_width = 100;
let canvas_style_height = 100; // arbitrary starting values. 

let is_auto_grow_on = false;
let intervalTimer = ""; // we need this to be up here, then made into a "setInterval" only later, within startTime(); we can clear this variable also by activating stopTime().

let resize_ratio = canvas_style_width / 1200; // after we've calculated how wide the actual canvas should be, we now scale the 900:1200 images with this ratio. This real calculation happens in calculateResizeRatio().

myCanvas.getContext("2d").scale(1,1);


let i=0;
let counter=0;

$(window).on("load", function() {  
    draw();
    drawZones();
});

 $(document).ready(function(){
     
     $("#pause_button").click(function(){
         switchAutoGrowButton();
         draw();
     });
     
     $("#reset_button").click(function(){
         counter = 0;
         i = 0;
         are_zones_on = !are_zones_on;
         draw();
         drawZones();
     });
     
     $("#info_button").click(function(){  
         $("#main_text").slideToggle(500);
         // hehe this is fun
     });
     
     $("#go_to_bedroom_1_button").click(function(){
         current_room = "bedroom_1";
         current_room_index = 1;
         draw();
     });
     $("#go_to_threshold_button").click(function(){
         current_room = "threshold";
         current_room_index = 0;
         draw();
     });
     
     $("#test_button_1").click(function(){
         time_of_day = !time_of_day;
         draw();
     });
     $("#test_button_2").click(function(){
         draw();
     });
    
}); 

const light_0 = document.getElementById("light_0"),
      light_1 = document.getElementById("light_1"),
      glowgloom = document.getElementById("glowgloom");

const threshold_main = document.getElementById("threshold_main"),
      threshold_rubble_staircase = document.getElementById("threshold_rubble_staircase"),
      threshold_rubble_bedroom_2 = document.getElementById("threshold_rubble_bedroom_2"),
      threshold_dayglow = document.getElementById("threshold_dayglow");

const bedroom_1_main = document.getElementById("bedroom_1_main"),
      bedroom_1_dayglow = document.getElementById("bedroom_1_dayglow");

const genevieve_back = document.getElementById("genevieve_back"),
      genevieve_belly1 = document.getElementById("genevieve_belly1"),
      genevieve_belly2 = document.getElementById("genevieve_belly2"),
      genevieve_front1 = document.getElementById("genevieve_front1"),
      genevieve_belly3 = document.getElementById("genevieve_belly3"),
      genevieve_front2 = document.getElementById("genevieve_front2"),
      genevieve_belly4 = document.getElementById("genevieve_belly4"),
      genevieve_front3 = document.getElementById("genevieve_front3"),
      genevieve_front5 = document.getElementById("genevieve_front5");

const pantry = document.getElementById("pantry");
const shelves = document.getElementById("shelves");

const front_door_back = document.getElementById("front_door_back");
const front_door_room = document.getElementById("front_door_room");
const front_door_door = document.getElementById("front_door_door");


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
    ctx.drawImage(image_name, 0, 0, 1200, 900, 0, 0, canvas_style_width, canvas_style_height);
}

async function drawLight() {
    if (time_of_day == 0) {
        drawLayer(light_0);
    }
    else if (time_of_day == 1) {
        drawLayer(light_1);
    }
    else {
        alert("There's no time of day of that value.");
    }
}

async function drawLightTop() {
    if (time_of_day == 0) {
        if (current_room == "threshold") {
            drawLayer(threshold_dayglow);
        }
        else if (current_room == "bedroom_1") {
            drawLayer(bedroom_1_dayglow);
        }
        else {}
    }
    else if (time_of_day == 1) {
        drawLayer(glowgloom);
    }
    else {
        alert("There's no time of day of that value.");
    }
}

async function drawBelly(image_name) {
    const ctx = myCanvas.getContext("2d"); 
    ctx.drawImage(image_name, -i/1.8, 0, 1200, 900, 0, 0, canvas_style_width, canvas_style_height);    
}

function calculateResizeRatio() {
    resize_ratio = canvas_style_width / 1200;
    return resize_ratio;
}


function draw(image_name) {
    $("#tester").text(counter.toString());
    if (my_canvas.getContext) {
        
        let window_width = window.innerWidth; 
        let window_height = window.innerHeight;
        
        if (window_height/window_width >= 0.75) {
            canvas_style_width = window_width - 40;
            canvas_style_height = canvas_style_width*3/4;
        }
        else if (window_height/window_width < 0.75) {
            canvas_style_height = window.innerHeight - 40;
            canvas_style_width = canvas_style_height*4/3;
        }
        
        resize_ratio = canvas_style_width / 1200;
        
        const canvas_width = canvas_style_width*DPR;
        const canvas_height = canvas_style_height*DPR;
        
        myCanvas.width = canvas_width;
        myCanvas.height = canvas_height;
        myCanvas.style.width = canvas_style_width.toString() + "px";
        myCanvas.style.height = canvas_style_height.toString() + "px";
        
        
        myCanvas_left = myCanvas.offsetLeft + myCanvas.clientLeft,
        myCanvas_top = myCanvas.offsetTop + myCanvas.clientTop,
        
        
        myCanvas.getContext("2d").scale(DPR,DPR);
        
        const ctx = myCanvas.getContext("2d");
        
        //$("#tester2").text(resize_ratio.toString());
        
    switch (current_room) {
        case "threshold" :
            drawLight();
            drawLayer(threshold_main);
            drawLayer(threshold_rubble_bedroom_2);
            drawLayer(threshold_rubble_staircase);
            drawLightTop();
            drawZones();
            
            break;
        
        case "front_door" :
            drawLight();
            //drawLayer(front_door_back);
            drawLayer(front_door_room);
            if (front_door_elements[1].toggle_state == 1) {
                drawLayer(front_door_door);
            }
            else {};
            drawLightTop();
            drawZones();
            
            break;
            
        case "pantry" :
            drawLayer(pantry);
            drawZones();
            
            break;
            
        case "shelves" :
            drawLayer(shelves);
            drawZones();
            
            break;
            
        case "bedroom_1" :
            drawLight();
            drawLayer(bedroom_1_main);
            drawLightTop();
            drawZones();
            
            switch(current_bedroom_1_resident) {
                case "genevieve" :
                    drawGenevieve();
                    break;
                default:
                    drawLayer(genevieve_belly1);
            }
                
            break;

        case "lola" :
            drawLola();

            break;
            
        default: 
            alert("There's no room of that name.");
            
    } // end of switch statement
    } // end of "if (myCanvas.getContext)"
    else {
        alert("Something went wrong. Please refresh the page and try again.");
    }
} // end of function draw()





function drawZones(element) {
    calculateResizeRatio();
    
    ctx = myCanvas.getContext("2d");
    
    if (are_zones_on == true) {
        rooms_with_elements[current_room_index].forEach(function(element) {
            ctx.fillStyle = "blue";
            ctx.fillRect(resize_ratio*element.left, resize_ratio*element.top, resize_ratio*element.width, resize_ratio*element.height);
        });  
    }
}


window.addEventListener("resize", draw);

my_canvas.addEventListener("click", function(event) {
    var mouse_x = event.pageX - myCanvas_left,
        mouse_y = event.pageY - myCanvas_top;
    
    rooms_with_elements[current_room_index].forEach(function(element) {
        
        if (mouse_x > resize_ratio*element.left && mouse_x < resize_ratio*element.left + resize_ratio*element.width
        && mouse_y > resize_ratio*element.top && mouse_y < resize_ratio*element.top + resize_ratio*element.height) {
            if (element.type == "door") {
                current_room = element.name;
                current_room_index = element.index;
            }
            else if (element.type == "trigger") {
                $("#tester3").text(element.name + " triggered!");
                //triggerResident(element.name);
                
            }
            else if (element.type == "toggle") {
                element.toggle_state = !element.toggle_state;
            }
            else {
                alert("I don't recognize this element type")
            }
            
            $("#tester2").text(element.name + " clicked!");
        }
    });
     
    counter++;
    i++;
    draw();
});

// I think the plan with this function was to trigger different talkToResident functions, depending on which resident is currently in the room. It's super confused rn. 
function triggerResident(trigger_name) { 
    if (current_room == trigger_name) {
        alert("things are working??");
    }
    else {
        alert("aaaaaaa");
    }   
}

// talking to characters:

function talkToGenevieve() {
    if (current_bedroom_1_resident == "genevieve" || current_bedroom_2_resident == "genevieve") {
        // run the inside code
    }
    else {
        // run the outside code
    }
}


// drawing characters:
// this makes the code SO much more readable; this way, we can move all the animation info into functions. 
// we can also alter this to require certain inventory items, to stop at certain points...but it's good, it's working. 

function drawGenevieve() {
    bedroom_1_counter = counter;
    progression_counter_genevieve = bedroom_1_counter;
    drawLayer(genevieve_back);
    if (progression_counter_genevieve <= 60) {
        drawBelly(genevieve_belly1);
        drawLayer(genevieve_front1);
    } 
    else if (progression_counter_genevieve >= 61 && progression_counter_genevieve <= 100) {
        if (progression_counter_genevieve == 61) {
            i = 0;
        }
        drawBelly(genevieve_belly2);
        drawLayer(genevieve_front1);
    }
    else if (progression_counter_genevieve >= 101 && progression_counter_genevieve <= 130) {
        if (progression_counter_genevieve == 101) {
            i = 0;
        }
        drawBelly(genevieve_belly3);
        drawLayer(genevieve_front2);
    }
    else if (progression_counter_genevieve >= 131 && progression_counter_genevieve <= 190) {
        if (progression_counter_genevieve == 131) {
            i = 0;
        }
        drawBelly(genevieve_belly4);
        drawLayer(genevieve_front3);
    }
    else if (progression_counter_genevieve >= 191) {
        if (progression_counter_genevieve == 191) {
            i = 0;
        }
        drawLayer(genevieve_front4);
        stopTime();
        //switchAutoGrowButton();
    }
}
               
function drawLola() {
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
        stopTime();
        switchAutoGrowButton();
    } 
    drawLayer(fg);
    drawZones();    

    ctx.strokeRect(10, 10, 157, 30);
    ctx.font = "17px serif";
    ctx.fillStyle = "black";

    if (counter < 270) {
        ctx.fillText("Month " + (Math.ceil((counter)/30)).toString() + ", Day " + counter.toString(), 15, 32);
    }
    else if (270 <= counter && counter <= 280) {
        ctx.fillText("Month 9" + ", Day " + counter.toString(), 15, 32);
    }
    else if (280 <= counter && counter <= 285) {
        ctx.fillStyle = "white";
        ctx.fillRect((canvas_style_width*0.5) - 200, (canvas_style_height*0.5) - 100, 400, 100);
        ctx.fillStyle = "black";
        ctx.strokeRect((canvas_style_width*0.5) - 200, (canvas_style_height*0.5) - 100, 400, 100);
        ctx.fillText("Thanks for playing the demo of Preggo Clicker!", (canvas_style_width*0.5) - 165, (canvas_style_height*0.5) - 70);
        ctx.fillText("Please tell me if you run into bugs or have suggestions.", (canvas_style_width*0.5) - 185, (canvas_style_height*0.5) - 45);
        ctx.fillText("Where should the game go next?", (canvas_style_width*0.5) - 115, (canvas_style_height*0.5) - 20);
    }
    else {
        ctx.fillText("Congratulations!", 15, 32);
    }
}



// dev button:
function resetGame() {
    counter = 0;
    i = 0;
    draw();
}






// The following 4 functions are for auto-grow:
function switchAutoGrowButton() {
    is_auto_grow_on = !is_auto_grow_on;
         
     if (is_auto_grow_on == true) {
         startTime();
         $("#pause_button_text").css("background-color", "#F0F0F0").text("Auto-Grow On");
     }
     else if (is_auto_grow_on == false) {
         stopTime();
         $("#pause_button_text").css("background-color", "transparent").text("Auto-Grow Off");
     }
}

function advanceTime() { 
    bedroom_1_counter++; // using this for now as a stopgap, until I implement the shop/inventory system, which will trip this system in a different way...it will also stop the growth at each step. 
    counter++;
    i++;
    draw();
}

function stopTime() { // stops the auto interval
    clearInterval(intervalTimer);
}

function startTime() {
    intervalTimer = setInterval(advanceTime,100); // be EXTREMELY careful with "setInterval". infinite loops galore. 
}

     
// all the clickable zones in each room:

threshold_elements.push({
    name: "front_door",
    index: 3,
    type: "door",
    left: 1100,
    top: 380,
    width: 100,
    height: 470
    }, {
    name: "bedroom_1",
    index: 1,
    type: "door",
    left: 746,
    top: 302,
    width: 150,
    height: 290
    }, {
    name: "bedroom_2",
    index: 2,
    type: "door",
    left: 276,
    top: 290,
    width: 130,
    height: 310
    }, {
    name: "upstairs",
    index: 3,
    type: "door",
    left: 91,
    top: 302,
    width: 100,
    height: 380
    }, {
    name: "pantry",
    index: 4,
    type: "door",
    left: 22,
    top: 696,
    width: 270,
    height: 180
    }, {
    name: "lola",
    index: -1,
    type: "door",
    left: 543,
    top: 192,
    width: 80,
    height: 115
}
);


bedroom_1_elements.push({
    name: "threshold",
    type: "door",
    index: 0,
    left: 1010,
    top: 110,
    width: 190,
    height: 790
    }, {
    name: "bedroom_1", // you gotta name the trigger after the room itself. that seems...unnecessary.
    type: "trigger",
    left: 225,
    top: 150,
    width: 450,
    height: 700
});

front_door_elements.push({
    name: "threshold",
    index: 0,
    type: "door",
    left: 100,
    top: 50,
    width: 250,
    height: 380
}, {
    name: "front_door_door",
    type: "toggle",
    toggle_state: 1,
    left: 464,
    top: 220,
    width: 280,
    height: 586
});

pantry_elements.push({
    name: "threshold", 
    type: "door",
    index: 0,
    left: 988,
    top: 0,
    width: 164,
    height: 834 
}, {
    name: "shelves",
    type: "door",
    index: 5,
    left: 780,
    top: 144,
    width: 210,
    height: 290
});

shelves_elements.push({
    name: "pantry",
    type: "door",
    index: 4,
    left: 282,
    top: 75,
    width: 262,
    height: 242
});





/* 
Rooms:
-1: lola
0. threshold
1. bedroom_1
2. bedroom_2
3. front_door
4. pantry
5. shelves

*/

