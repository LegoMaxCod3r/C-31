const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;


var ground;
var rope;
var fruit;
var fruit_con;
let bunny, blink, eat, sad;


var bg_img, food_img, rabbit_img, button;

function preload()
{

  bg_img = loadImage("./assets/background.png");
  food_img = loadImage("./assets/melon.png");
  rabbit_img = loadImage("./assets/Rabbit-01.png");
  blink = loadAnimation("./assets/blink_1.png","./assets/blink_2.png", "./assets/blink_3.png");
  eat = loadAnimation("./assets/eat_0.png","./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png");
  sad = loadAnimation("./assets/sad_1.png","./assets/sad_2.png", "./assets/sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;


  sad.looping = false;
  eat.looping = false;


}

function setup() 
{
  createCanvas(500,700); 
  frameRate(80); 

  engine = Engine.create(); 
  world = engine.world; 

  button = createImg('./assets/cut_button.png');
  button.position(200,30); 
  button.size(50,50); 
  button.mouseClicked(drop); 

  rope = new Rope(8,{x:220,y:30}); 

  ground = new Ground(200,690,600,20); 

  bunny = createSprite(200,620,100,100); 
  bunny.addImage(rabbit_img); 

  bunny.scale = 0.2;

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("sad", sad);

  bunny.changeAnimation("blinking");

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  fruit_con = new Link(rope,fruit);

  rectMode(CENTER); 
  ellipseMode(RADIUS); 
  textSize(50); 
  imageMode(CENTER);
}

function draw() 
{


  background(51); 
  image(bg_img,0,0,displayWidth+80,displayHeight);







  if(fruit!=null)
  { 
    image(food_img,fruit.position.x,fruit.position.y,70,70); 
  }

  rope.show(); 
  Engine.update(engine); 
  ground.show();
  
  
  if(collide(fruit, bunny) == true)
  {
    bunny.changeAnimation("eating");
  }

  if(collide(fruit, ground.body) == true)
  {
    bunny.changeAnimation("sad");
  }

  drawSprites();
  
}

function drop()
{

  rope.break();


  fruit_con.detach();
  fruit_con = null;

}

function collide(body,sprite) 
{ if(body!=null) 
  { var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    console.log(d); 
    if(d<=40) 
    { World.remove(engine.world,fruit); 
      fruit = null; 
      return true; }
       else
       { 
         return false; 
        } 
      } 
    }




/*function collide1(body, sprite)
{

  let poseSprite = sprite.position
  let posB = body.position

  if(body != null)
  {
    let d = dist(posB.x, posB.y, poseSprite.x, poseSprite.y);
    if(d<= 80)
    {

      World.remove(engine.world, fruit);
      fruit = null;
      return true;

    }
    else
    {
      return false;
    }
  }

}*/
