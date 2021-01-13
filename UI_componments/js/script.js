var canvas = document.getElementById("game");

var context = canvas.getContext("2d");

var image = new Image();
image.src = "./knightImages/knightSheet.png";
var background= new Image();
background.src ="./knightImages/caveBackground.png"

function GameObject(name, img)
{
    this.name = name;
	this.img = image;
    this.x = 0;
    this.y = 0;
}

function GamerInput(input) 
{
    this.action = input;
}

var player = new GameObject("Player", image);
var NPC = new GameObject("NPC", "./knightImages/spikes.png");

var gameobjects = [player, NPC];

function input(event) 
{
    // Take Input from the Player
    if (event.type === "keydown") 
	{
        switch (event.keyCode) 
		{
            case 37:
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");
				//console.log("Up");
                break; //Up key
            case 39:
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else 
	{
        gamerInput = new GamerInput("None"); //No Input
    }
}

function buttonOnClickUp()
{
	gameobjects[0].y -=10;
}
function buttonOnClickDown()
{
	gameobjects[0].y +=10;
}
function buttonOnClickLeft()
{
	gameobjects[0].x += 10;
}
function buttonOnClickRight()
{
	gameobjects[0].x -= 10;
}

var x=0,
	y =1300;

function draw()
{
	//sprite.src = "./knightImages/axe.png";
	//context.clearRect(0, 0, canvas.width, canvas.height); 
	//context.drawImage(gameobjects[0].img, 0, 0, 256, 256, gameobjects[0].x, gameobjects[0].y, 256, 256);
	 if (x < (800 + (image.width / 2))) 
	{
        x += 20;
    }
	animate();
}
 // Update Heads Up Display with Weapon Information

function weaponSelection() 
{
  var selection = document.getElementById("equipment").value;
  var active = document.getElementById("active");
  if (active.checked == true) 
  {
    document.getElementById("HUD").innerHTML = selection + " active ";
    console.log("Weapon Active");
  } 
  else 
  {
	  
    document.getElementById("HUD").innerHTML = selection + " selected ";
    console.log("Weapon Selected");
  }
}

function drawHealthbar() 
{
  var width = 100;
  var height = 20;
  var max = 100;
  var val = 10;

  // Draw the background
  context.fillStyle = "#000000";
  //context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(700, 0, width, height);

  // Draw the fill
  context.fillStyle = "#00FF00";
  var fillVal = Math.min(Math.max(val / max, 0), 1);
  context.fillRect(700, 0, fillVal * width, height);
}
//
// Array of Weapon Options
var options = 
[
{
    "text": "Select a Weapon",
    "value": "No Weapon",
    "selected": true
  },
  {
    "text": "scythe",
    "value": "scythe",
  },
  {
    "text": "Sword & shield",
    "value": "Sword & shield",
  },
  {
    "text": "bow and arrow",
    "value": "bow and arrow",
  }
];


var selectBox = document.getElementById('equipment');

for (var i = 0; i < options.length; i++)
{
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected,option.image));
}

// Total Frames
var frames = 3;

// Current Frame
var currentFrame = 0;


var initial = new Date().getTime();
var current; // current time

var npc = new Image();
npc.src = "./knightImages/spikes.png";
NPC.x = 600;
NPC.y = 700;


function animate() 
{
    current = new Date().getTime(); // update current
    if (current - initial >= 500) 
	{ // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 
	  context.clearRect(0, 0, canvas.width, canvas.height); 
    // Draw sprite frame
	context.drawImage(background,0,0,800,800);
    context.drawImage(image,(image.width /3) * currentFrame, 0, 200, 200,gameobjects[0].x, (gameobjects[0].y + 500), 256, 256);
	
	// drawing the second character aka the NPC
	context.drawImage(npc,600,700,125,50);
    context.font = '36pt Orbitron';
}
function ifHitting()
{
	if(gameobjects[0].x == gameobjects[1].x || gameobjects[0].y == gameobjects[1].y)
	{
		console.log("game over");
	}
}

function gameloop()
{
	ifHitting();
	//drawHealthbar();
    draw();
	drawHealthbar();
    window.requestAnimationFrame(gameloop);
}
window.requestAnimationFrame(gameloop);
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);