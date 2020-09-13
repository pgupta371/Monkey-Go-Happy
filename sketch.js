
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground, invisibleGround;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400,400);

  monkey = createSprite(50,100,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,385,1200,40);
  
  invisibleGround = createSprite(300,390,600,40);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("circle",0,0,320);
  
}


function draw() {
  background(rgb(10,150,300));  
  
  //score
  score = Math.ceil(frameCount/frameRate());
  textSize(15);
  fill("balck");
  text("Survival Time: "+score,270,30);
  
  ground.shapeColor = "green";
  

  //jump when the space key is pressed
      if(keyDown("space")&& monkey.y >= 300) {
            monkey.velocityY = -12;
        }
   //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  ground.velocityX = -4;
      if (ground.x < 0){
          ground.x = ground.width/2;
        }
  monkey.collide(invisibleGround);
  
  spawnfood();
  spawnobstacles();
    
    if (bananaGroup.isTouching(monkey)){ 
      bananaGroup.destroyEach(); 
      score=score+2;
    } 
    else if(obstacleGroup.isTouching(monkey)){
      ground.velocityX = 0;
      monkey.velocityY = 0;
    
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    
    textSize(30);
    text("Game Over!", 130,200);
    score=0;
     } 

  
  
  drawSprites();
}

function spawnfood() {
   if (frameCount % 80 === 0) {
     banana = createSprite(600,360,10,10);
     banana.y = Math.round(random(250,300));
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -5;
     banana.lifetime = 300;
     bananaGroup.add(banana);
    
   }
}

function spawnobstacles() {
if (frameCount % 300 === 0) {
     obstacle = createSprite(600,350,10,10);   
     obstacle.addImage(obstaceImage);
     obstacle.scale = 0.15;
     obstacle.velocityX = -5;
     obstacle.lifetime = 120
     obstacle.setCollider("circle",0,0,180);
       
    obstacleGroup.add(obstacle);
   }
}
