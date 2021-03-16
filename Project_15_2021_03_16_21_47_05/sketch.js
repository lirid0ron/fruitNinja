var PLAY = 1;
var END = 0;
var gameState = PLAY;
var position;
var f1,f2,f3,f4, a1,a2, gameOver, sword, swordI,gameOverI, restart, restartI;
var gameOverSound, swordSound;

var score = 0;

function preload(){
  f1 = loadImage("fruit1.png");
  f2 = loadImage("fruit2.png");
  f3 = loadImage("fruit3.png");
  f4 = loadImage("fruit4.png");

  a1 = loadImage("alien1.png");
  a2 = loadImage("alien2.png");

  gameOverI = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");

  swordI = loadImage("sword.png");
  swordSound = loadSound("knifeSwooshSound.mp3");

  restartI = loadImage("restart.png");
}

function setup(){
  createCanvas(500,500);
  
  fruitGroup = new Group();
  alienGroup = new Group();
  
  sword = createSprite(15,25,1,1);
  sword.addAnimation("sword", swordI);
  sword.scale = 0.5;

  gameover = createSprite(250,220,1,1);
  gameover.addAnimation("gameover", gameOverI);
  
  restart = createSprite(250,260,1,1);
  restart.addAnimation("restart", restartI);
}

function draw(){
  background("lightblue");
  
  stroke("green");
  fill("blue");
  textFont("High Tower Text");
  textSize(20);
  text("Score: "+ score,20,30);
  
  if (gameState === PLAY) {
      spawnFruits();
      spawnAliens();

      sword.y = World.mouseY;
      sword.x = World.mouseX;

    if (sword.isTouching(fruitGroup)) {
      score = score + 1;
      swordSound.play();
      fruitGroup.destroyEach();
    }

    if (sword.isTouching(alienGroup)) {
      gameOverSound.play();
      gameState = END;
    
    }
    
    gameover.visible = false;
    restart.visible = false;
  }
  
  if (gameState === END) {
      gameover.visible = true;
      restart.visible = true;
      fruitGroup.setVelocityXEach(0);
      alienGroup.setVelocityXEach(0);
      fruitGroup.setLifetimeEach(-1);
      alienGroup.setLifetimeEach(-1);
  }
  
  if (mousePressedOver(restart)) {
    Restart();
  }
  
  drawSprites();
}

function spawnFruits() {
 if (frameCount % 60 === 0){
   position = Math.round(random(1,2));
   var fruit = createSprite(550,250,10,10);
   fruit.y = Math.round(random(60,440));
   fruit.scale = 0.2;
   var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(f1);
              break;
      case 2: fruit.addImage(f2);
              break;
      case 3: fruit.addImage(f3);
              break;
      case 4: fruit.addImage(f4);
              break;
      default: break;
    }
   if (position == 1) {
     fruit.x = -50;
     fruit.velocityX = (6 + score/4);
   }
   else {
     if (position == 2) {
       fruit.x = 550;
       fruit.velocityX = -(6 + score/4);
     }
   }
   fruitGroup.add(fruit);
  }
}
function spawnAliens() {
 if (frameCount % 100 === 0){
   var alien = createSprite(550,250,10,10);
   alien.y = Math.round(random(60,440));
   alien.velocityX = -(6 + score/10);
   alien.setLifetime = 100
   var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: alien.addImage(a1);
              break;
      case 2: alien.addImage(a2);
              break;
      default: break;
    }
   alienGroup.add(alien);
  }
}
function Restart() {
  alienGroup.destroyEach();
  fruitGroup.destroyEach();
  score = 0;
  gameState = PLAY;
}