//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;
var database;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  dog=createSprite(width/2, 80, 10,10);
	dog.addImage(dogImg);
	dog.scale=0.2
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
   dog.addImage(happyDogImg);
  }

  drawSprites();

  textSize(18);
  fill("black");
  text("PRESS UP ARROW KEY TO PLAY",150,250);

  text("Food Remaining:"+ foodS , 40,450);
  
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
   food:x 
  })
}


