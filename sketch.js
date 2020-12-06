var bg;

var dog, normalDog,happyDog, database, foodS, foodStock;

var feed,addFood,fedTime,lastFed,foodObject,bath,bathroom,napy,player,living;

function preload(){

  bg = loadImage("images/bg.jpg");
  
  happyDog = loadImage("images/dogImg.png");

  normalDog = loadImage("images/dogImg1.png");

  sleepyDog = loadImage("images/Bed Room.png");

  bathroom = loadImage("images/Wash Room.png");

  living = loadImage("images/Living Room.png")
}

function setup() {
  createCanvas(1200,500);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock,showError);
  
  dog = createSprite(900,300,20,20);
  dog.addImage(normalDog);

  dog.scale = 0.27;

  feed = createButton("Feed the dog");
  feed.position(670,50);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(790,50);
  addFood.mousePressed(addFoods);

  bath = createButton("Give Bath")
  bath.position(890,50);
  bath.mousePressed(giveBath);

  napy = createButton("Take a nap")
  napy.position(990,50);
  napy.mousePressed(nap);

  player = createButton("Play")
  player.position(1090,50);
  player.mousePressed(play);

  foodObject = new Food();
}


function draw() {  
  background(bg);

  foodObject.display();

  drawSprites();

  textSize(25);
  stroke("red");
  strokeWeight(5);
  fill("white");
  text("Food Remaining: " + foodObject.foodStock,100,400);
    
    text("Last Fed : "+ 12 + " PM", 300,40);

  if(foodObject.currentTime > foodObject.lastFed){
    if(foodObject.lastFed + 2 == foodObject.currentTime){
        imageMode(CENTER);
        image(foodObject.livingRoom,180,200,200,300);
    }else if(foodObject.lastFed + 1 == foodObject.currentTime){
        imageMode(CENTER);
        image(foodObject.garden,180,200,200,300);
    }else{

    }

}

}

function feedDog(){
  dog.addImage(happyDog);
  foodObject.deductFood();
}

function addFoods(){
  foodObject.foodStock++;
  dog.addImage(normalDog);
  foodObject.updateFoodStock();
}


function showError(){
  console.log("ERROR");
}

function readStock(){
  foodObject.updateFoodStock();
}

function giveBath(){
  dog.addImage(bathroom);
}

function nap(){
      dog.addImage(sleepyDog);
}

function play(){
  dog.addImage(living);
}