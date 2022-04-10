var wallpaperImg, wallpaper;
var rocketImg, rocket;
var meteorImg, meteor;
var meteorsGroup;
var  meteor1img,meteor1,meteor1group
var gameState = "play";
var score = 0;
function preload() {
  wallpaperImg = loadImage("bg3.jpg");
  rocketImg = loadImage("rocket-removebg-preview.png");
  meteorImg = loadImage("m-removebg-preview.png");
  meteor1img= loadImage("meteor_sprite-removebg-preview.png")
}

function setup() {
  createCanvas(600, 600);

  wallpaper = createSprite(300, 300, 600, 600);
  wallpaper.addImage("background", wallpaperImg);
  wallpaper.scale = 1;
  wallpaper.velocityY = 1;

  meteorsGroup = new Group();
  meteor1group = new Group()

  rocket = createSprite(200, 200, 50, 50);
  rocket.addImage("rocket", rocketImg);
  rocket.scale = 0.5;
}

function draw() {
  background(0);

  if (gameState === "play") {
    if (frameCount % 20 === 0) {
      score = score + 1;
    }
    if (keyIsDown(LEFT_ARROW)) {
      rocket.x -= 2;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      rocket.x += 2;
    }
    if (keyDown("space")) {
      rocket.velocityY = -5;
    }

    rocket.velocityY = rocket.velocityY + 0.8;

    if (wallpaper.y > 600) {
      wallpaper.y = 300;
    }

    spawnMeteors();
    spawnMeteors1();


    if (rocket.y > 600 || meteorsGroup.isTouching(rocket)|| meteor1group.isTouching(rocket)) {
      rocket.destroy();
      gameState = "end";
    }

    drawSprites();
  } else if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
  textSize(30);
  text("Score: " + score, 450, 50);
}

function spawnMeteors() {
  if (frameCount % 200 === 0) {
    meteor = createSprite(200, -50);
    meteor.addImage("meteor", meteorImg);
    meteor.velocityY = 2;
    meteor.scale = random(0.1, 0.5);
    meteor.x = Math.round(random(100, 400));
    rocket.depth = meteor.depth;
    meteor.lifetime = 600;
    meteorsGroup.add(meteor);
  }
}
function spawnMeteors1() {
  if (frameCount % 200 === 0) {
    meteor1 = createSprite(200, -50);
    meteor1.addImage("meteor", meteor1img);
    meteor1.velocityY = 2;
    meteor1.scale = random(0.1, 0.5);
    meteor1.x = Math.round(random(100, 400));
    rocket.depth = meteor1.depth;
    meteor1.lifetime = 600;
    meteor1group.add(meteor1);
  }
}