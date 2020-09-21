var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var ground,invisibleGround;
var bananaGroup, obstaclesGroup;
var score;

function preload()
{  
 //loading animation and images to the variable 
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png",  "sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png",
 "sprite_7.png","sprite_8.png");            
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() 
{
  createCanvas(400,400)

  //creating monkey,ground,invisibleGround and groups
  monkey = createSprite(40,315,22,22);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.13;
  
  ground = createSprite(400,355,900,3);
  ground.velocityX = -4;
  ground.x = ground.width/2;

  invisibleGround = createSprite(400,357,900,2);
  invisibleGround.visible = false;
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup(); 
}


function draw() 
{
  //setting background colour
  background("lightBlue");
   
  //displaying survival time
  textSize(20);
  fill("black");
  text("Survival Time = " +score ,130,50)
  
  //creating gamestates
  if (gameState === PLAY)
    {
      //assigning score for survival time  
      score = 0;
      score = Math.ceil(frameCount/frameRate());      

      //making the ground continuous
      if (ground.x < 0)
      {
        ground.x = ground.width/2;
      }  
    
      //making the monkey jump
      if(keyDown("space")&& monkey.y >= 200)
      {
        monkey.velocityY = -12;
      }
    
      //giving gravity
      monkey.velocityY = monkey.velocityY + 0.8;

      //calling the functions to the game
      food();
      spawnObstacles();
      
      //destroying the banana when the monkey touches it
      if(bananaGroup.isTouching(monkey))
      {
        bananaGroup.destroyEach();
      }

      //ending the game
      if(obstaclesGroup.isTouching(monkey))
      {
          gameState = END;    
      }
  }
  
  else if (gameState === END)
  {
    //stopping the ground and monkey from moving
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    //setting the lifetime
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    //stopping the groups
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    //displaying game over
    textSize(23);
    fill("red");
    text("Game Over",150,200);    
  }
  
  //making the monkey collide with the ground
  monkey.collide(invisibleGround);

  //drawing all the sprites
  drawSprites();
}

function food()
{
  if (frameCount % 80 === 0)
  {
    var banana = 
    createSprite(390,Math.round(random(120,200)));
    //adding image
    banana.addImage("eating",bananaImage);
    //adding velocity
    banana.velocityX = -4;
    //scaling
    banana.scale = 0.12;
    //adding lifetime
    banana.lifetime = 100;
    //adding it to the group
    bananaGroup.add(banana);    
  }
}

function spawnObstacles()
{
  if (frameCount %300 === 0)
  {
    var obstacle = createSprite(300,332,22,22); 
    //adding image
    obstacle.addImage(obstacleImage);
    //adding velocity
    obstacle.velocityX = -4;
    //scaling
    obstacle.scale = 0.12;
    //adding lifetime
    obstacle.lifetime = 65;
    //adding it to the group
    obstaclesGroup.add(obstacle);
  }
}





