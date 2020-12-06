class Food {
  constructor(){
      this.image = loadImage("images/Food Stock.png");
      this.garden = loadImage("images/Garden.png");
      this.livingRoom = loadImage("images/Living Room.png");
      this.foodStock = 20;
      this.lastFed;
      this.currentTime;
  }
  
  getFoodStock(){
      database.ref("Food").on("value",(data)=>{
          this.foodStock = data.val();
      });
  }

  updateFoodStock(){
      database.ref("/").update({"Food":this.foodStock});
  }

  deductFood(){
      if(this.foodStock > 0){
          this.foodStock = this.foodStock - 1;
          database.ref("/").update({"Food":this.foodStock, "FeedTime": hour()});
          database.ref("FeedTime").on("value",(data)=>{
              this.lastFed = data.val();
          });

          database.ref("/").update({"CurrentTime": hour()});
          database.ref("CurrentTime").on("value",(data)=>{
              this.currentTime = data.val();
          });

      }
  }


  display(){
      var x = 80;
      var y = 100;

      
      database.ref("/").update({"CurrentTime": hour()});
      database.ref("CurrentTime").on("value",(data)=>{
          this.currentTime = data.val();
      });
      
      imageMode(CENTER);


      if(this.foodStock != 0){
          for(var i =0; i < this.foodStock; i++){
              if(i % 10 == 0){
                  x = 50;
                  y = y + 70;
              }
              image(this.image,x,y,50,50);
              x = x + 50;
          }
      }
  }
}