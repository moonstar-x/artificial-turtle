const FRAMERATE = 30;
const KEY_W = 87;
const KEY_A = 65;
const KEY_D = 68;
const KEY_S = 83;

let bg;
let turtleImage;
let turtleImageInverted;
let playerImage;
let playerImageInverted;
let turtles = [];
let player;
let trust = 0;

function preload() {
  bg = loadImage('../assets/background.jpg');
  turtleImage = loadImage('../assets/turtle.png');
  turtleImageInverted = loadImage('../assets/turtle_inverted.png');
  playerImage = loadImage('../assets/player.png');
  playerImageInverted = loadImage('../assets/player_inverted.png');
}

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("#app-holder");
  
  turtlesSpawnHelper();
  player = playerSpawnHelper();

  frameRate(FRAMERATE);
}

function draw() {
  background(bg);
  drawTrustIndicator();
  
  player.update();
  turtles.forEach((turtle) => {
    turtle.update();
  });

  if (keyIsDown(UP_ARROW) || keyIsDown(KEY_W)) {
    player.moveForward();
  } if (keyIsDown(DOWN_ARROW) || keyIsDown(KEY_S)) {
    player.moveBackward();
  } if (keyIsDown(LEFT_ARROW) || keyIsDown(KEY_A)) {
    player.moveLeft();
  } if (keyIsDown(RIGHT_ARROW) || keyIsDown(KEY_D)) {
    player.moveRight();
  }
}

function playerSpawnHelper() {
  let player = new Player();
  while (player.clipsWithTurtles()) {
    player = new Player();
  }
  return player;
}

function turtlesSpawnHelper() {
  const numOfTurtles = random(2, 4);
  for (let i = 0; i < numOfTurtles; i++) {
    let turtle = new Turtle(i);

    while (turtle.clipsWithTurtles() || turtle.clipsWithPlayer()) {
      turtle = new Turtle(i);
    }

    turtles.push(turtle);
  }
}

function drawTrustIndicator() {
  fill('red');
  textSize(18);
  text(`Confianza: ${Math.abs(trust)}%`, 15, 30);
}
