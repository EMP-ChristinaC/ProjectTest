let p1, p2;
let bl = true;

let stages = [];
let chars = [];
let stageP1 = {};
let stageP2 = {};
let picks = [];
let randomI;
let chosen = {};
let menu = "pressme";
let pickedStage = false;
let pickedChar = false;
let instructDone= false;
let mainImg;
let stageImg;
let countdown = 4;
let font;
let tyler;
let tylerX = 1300;
let tylerY = 400;
let carlos;
let carlosX = 1300;
let carlosY = 400;


let MAXHEALTH = 100;
let PUNCHDAMAGE = 5;
let MOVESPEED = 10;

let screen = 0;
// 0 - Main screen
// 1 - character selection
// 2 - stage selection
// 3 - Fight
// 4 - KO
// 5 - Victory
// 6 - Reset

//Audio
let play = true;
let playSE = true;

function preload() {
  //Player Health
P1HealthImg = loadImage("images/Health/P1Health.png");
P2HealthImg = loadImage("images/Health/P2Health.png");
BoarderImg = loadImage("images/Health/BoarderHealth.png");

//Audio/SE/Music
mainscreenMusic = loadSound("music/MainScreenMusic.mp3");
fightscreenMusic1 = loadSound("music/FightingMusic1.mp3");
fightscreenMusic2 = loadSound("music/FightingMusic2.mp3");
fightscreenMusic3 = loadSound("music/FightingMusic3.mp3");
MainButtonSE = loadSound("music/MainScreenButton.mp3");
fight321SE = loadSound("music/321FightSE.mp3");
blockSE = loadSound("music/BlockSE.mp3");
punchSE = loadSound("music/PunchSE1.mp3");
crouchSE = loadSound("music/Crouch.mp3");
jumpSE = loadSound("music/JumpSE.mp3");
cButtonSE = loadSound("music/ButtonSE1.mp3");
p1ButtonSE = loadSound("music/ButtonSE2.mp3");
p2ButtonSE = loadSound("music/ButtonSE3.mp3");
fatalitySE = loadSound("music/FatalitySE.mp3");
walk1SE = loadSound("music/WalkingSE.mp3");
walk2SE = loadSound("music/WalkingSE2.mp3");

//Screens
mainImg = loadImage("images/Menus/mainmenu.png");
stageImg = loadImage("images/Menus/stageselect.png");
font = loadFont("fonts/Iceberg-Regular.ttf");
tyler = loadImage("images/Menus/tyler.png");
carlos = loadImage("images/Menus/carlos.png");
}

function unloadMusic() {
  if (menu != "main" || menu != "direct" || menu != "char" || menu != "stage") {
    mainscreenMusic.stop();
  }
  if (menu != "fight") {
    fightscreenMusic1.stop()
    fightscreenMusic2.stop();
    fightscreenMusic3.stop();
  }
}

function setup() {
  createCanvas(1200, 600);
  rectMode(CENTER);
  frameRate(30);
  stages[0] = loadImage("images/Menus/ballpit.png");
  stages[1] = loadImage("images/Menus/plane.png");
  stages[2] = loadImage("images/Menus/wafflehouse.png");
  chars[0] = loadImage("images/Menus/LJump.png");
  chars[1] = loadImage("images/Menus/RJump.png");
  chars[2] = loadImage("images/Menus/LPunch.png");
  chars[3] = loadImage("images/Menus/RPunch.png");
  stageP1.stage = 0;
  stageP2.stage = 0;
  stageP1.char = 0;
  stageP2.char = 0;
  textFont(font);
  stroke(255);
  // fighter(health, punch, moveX, playerNum)
  p1 = new fighter(MAXHEALTH, PUNCHDAMAGE, MOVESPEED, 1);
  p2 = new fighter(MAXHEALTH, PUNCHDAMAGE, MOVESPEED, 2);
}

function draw() {

  // Experiment (When player blocks, don't move)
  // if(!bl){
  //move
  //else don't move
  // }
  if (menu == "pressme") {
    background(100);
    textAlign(CENTER);
    textSize(100);
    text("Press Space to Load.", 600, 300);
    if (keyIsDown(32)) {
      //Button Sound Effect
      MainButtonSE.play();
            
      noLoop();
      background(100);
      text("Loading...", 600, 300);

      setTimeout(
      () => {
        menu = "main";
        loop();
      }, 3000);
      
    }
    
  }



  if (menu == "main") {    // insert main screen code here, replace below
    if (play) { 
      mainscreenMusic.play();
      mainscreenMusic.loop();
      play = false;
    }
    background(100);
    imageMode(CORNER);
    image(mainImg, 0, 0);
    console.log(screen);
    console.log(menu);
    if (keyIsDown(32)) {
      //Button Sound Effect
      MainButtonSE.play();
      //space bar
       // Change number to 1 after input character and stage selection screen
      menu = "direct";
    }
    
  }
  if(menu == "direct"){
    imageMode(CORNER);
    image(stageImg, 0, 0);
    textAlign(CENTER);
    fill(255);
    textSize(75);
    text('CONTROLS', width/2, 75);
    textSize(50);
    text('Player 1', width/4, 125);
    text('Move: WASD', width/4, 200);
    text('Punch: T', width/4, 275);
    text('Block: Y', width/4, 350);
    text('Player 2', 3*width/4, 125);
    text('Arrow Keys', 3*width/4, 200);
    text(']', 3*width/4, 275);
    text('Backslash', 3*width/4, 350);
    text('C to Confirm. SPACE to Continue.', width/2, 575);
    if (keyIsDown(32) && instructDone == true) { 
      //Button Sound Effect
      MainButtonSE.play();
      
      // Change number to 1 after input character and stage selection screen
     menu = "char";
   }
  }
if (menu == "char") { // insert character selection screen code here

  displayCharSelect();

  textAlign(LEFT);
  textSize(30);
  text('C to Confirm. \nSPACE to Continue.', 20, 500);
  console.log(screen);
  console.log(menu);
  if (keyIsDown(32) && pickedChar == true) { //space bar
    //Button Sound Effect

    MainButtonSE.play();
    menu = "stage"; // Change number to 1 after input character and stage selection screen
  }
}

if (menu == "stage") { // insert stage selection screen code here
  displayStageSelect();
  textAlign(LEFT);
  textSize(30);
  text('C to Confirm. \nSPACE to Continue.', 20, 500);
  console.log(screen);
  console.log(menu);
  if (keyIsDown(32) && pickedStage == true) {
          //Button Sound Effect
    MainButtonSE.play();
    //space bar
    picks[0] = stageP1.stage;
    picks[1] = stageP2.stage;
    randomI = int(random(0, picks.length));
    chosen.num = picks[randomI];
    chosen.name = setStageName(chosen.num);
    menu = "fight" // Change number to 1 after input character and stage selection screen
  }
}

  // Fighting Arena screen
  if (menu == "fight") {

    if (playSE) {
      fight321SE.play();
      playSE = false;
    }


    background(220);
    imageMode(CORNER);
    image(stages[chosen.num], 0, 0);
    //Player Moves
    textAlign(CENTER, CENTER);
    textSize(100);
    text("Stage: " + chosen.name, width/2, height/2 - 100);
    if(countdown == 1){
      text("FIGHT!", width/2, height/2);
    }
    else{
      text(countdown - 1, width/2, height/2);
    }
    
    

    if(frameCount % 30 == 0 && countdown > 0){
      countdown--;
      unloadMusic();
      play = true;
    }
    if(countdown == 0){

      if (play) {
        fightscreenMusic1.play();
        fightscreenMusic1.loop();
        play = false;
      }
      text("FIGHT!", width/2, height*0.7);
      background(220);
      imageMode(CORNER);
      image(stages[chosen.num], 0, 0);
      p1.move();
      p2.move();
      console.log(screen);
      console.log(menu);
      //Player attacks
      if (p1.attack(p2.plPosition()) && !p2.playerBlock) {
        p2.takeDamage();
      }
      if (p2.attack(p1.plPosition()))
        p1.takeDamage();

      if(chosen.num == 1){
        if(tylerX <= 0){
          tylerX = 1600;
          tylerY = int(random(150, 350));
        }
        imageMode(CENTER);
        image(tyler, tylerX, tylerY);
        tylerX-=2;
      }
      if(chosen.num == 0){
        if(carlosX <= 0){
          carlosX = 1200;
          carlosY = int(random(150, 350));
        }
        imageMode(CENTER);
        image(carlos, carlosX, carlosY);
        carlosX-=2;
      }
      imageMode(CORNER);  
    //Player Health
    P1Health();
    P2Health();

    if (p1.getHealth() == 0 || p2.getHealth() == 0)
      menu = "ko";
    }
    

  }

  // KO image popup 
  //freeze frame the Fighting Arena
  if (menu == "ko") { // remove code, insert K.O gif below
    unloadMusic();
    play = true;
    textSize(200);
    fill(255);
    textAlign(CENTER);
    text('FATALITY',600, 300);
    fatalitySE.play();

    noLoop();
    setTimeout(
      () => {
        menu = "win";
        loop();
      }, 3000);
  }

  // victory screen
  //display the winner text 
  //will be changed later for the character image + text
  if (menu == "win") { // remove some code
    let winner;

    background(100);
    imageMode(CORNER);
    image(stageImg, 0, 0);
    textSize(200);
    textAlign(CENTER);

    if (p1.getHealth() == 0) {
      winner = 'Player 2';
    }
    else
      winner = 'Player 1';

    text(winner + " wins!",600, 300);
    textSize(50);
    text("Press SPACE to restart",600, 500);
    if (keyIsDown(32)) {
      menu = "reset";
                  //Button Sound Effect            
      MainButtonSE.play();      
    }
  }

  //Resetting screen
  //resets back to main menu screen
  //Can be changed to character selection
  if (menu == "reset") {
    background(50);
    imageMode(CORNER);
    image(stageImg, 0, 0);
    textSize(200);
    textAlign(CENTER);

    text("Resetting...", 600, 300);

    noLoop();

    p1 = new fighter(MAXHEALTH, PUNCHDAMAGE, MOVESPEED, 1);
    p2 = new fighter(MAXHEALTH, PUNCHDAMAGE, MOVESPEED, 2);

    setTimeout(
      () => {
        menu = "main";
        pickedChar = false;
        pickedStage = false;
        instructDone = false;
        countdown = 4;
        playSE = true;
        play = true;
        loop();
      }, 3000);
  }

}

function keyPressed(){
  if(key == 'b'){
    if(menu == "next"){
      menu = "stage";
      pickedStage = false;
    }
    if(menu == "stage"){
      menu = "char";
    }
  }
  if(key == 'e'){
    if(menu == "char"){
      menu = "stage";
    }
    if(menu == "stage" && pickedStage == true){
      
    }
      
  }
  if(key == 'd'){
    p1ButtonSE.play();
    if(menu == "stage"){
      if(stageP1.stage == 2){
        stageP1.stage = 0;
      }
      else{
        stageP1.stage++;
      }
    }
    if(menu == "char"){
      if(stageP1.char == 3){
        stageP1.char = 0;
      }
      else{
        stageP1.char++;
      }
    }
  }
  if(key == 'a'){
    p1ButtonSE.play();
    if(menu == "stage"){
      if(stageP1.stage == 0){
        stageP1.stage = 2;
      }
      else{
        stageP1.stage--;
      }
    }
    if(menu == "char"){
      if(stageP1.char == 0){
        stageP1.char = 3;
      }
      else{
        stageP1.char--;
      }
    }
  }

  if(keyCode == RIGHT_ARROW){
    p2ButtonSE.play();
    if(menu == "stage"){
      p2ButtonSE.play();
      if(stageP2.stage == 2){
        stageP2.stage = 0;
      }
      else{
        stageP2.stage++;
      }
    }
    if(menu == "char"){
      if(stageP2.char == 3){
        stageP2.char = 0;
      }
      else{
        stageP2.char++;
      }
    }
  }
  if(keyCode == LEFT_ARROW){
    p2ButtonSE.play();
    if(menu == "stage"){
      if(stageP2.stage == 0){
        stageP2.stage = 2;
      }
      else{
        stageP2.stage--;
      }
    }
    if(menu == "char"){
      if(stageP2.char == 0){
        stageP2.char = 3;
      }
      else{
        stageP2.char--;
      }
    }
  }
  if(key == 'c'){
    if(menu == "char"){
      if (!pickedChar) 
        cButtonSE.play();
      pickedChar = true;
    }
    if(menu == "stage"){
      if (!pickedStage)
        cButtonSE.play();
      pickedStage = true;
    }
    if(menu == "direct"){
      if (instructDone)
        cButtonSE.play();
      instructDone = true;
    }
  }
}
function setStageName(number){
  if(number == 0){
    return "Pit of Balls";
  }
  if(number == 1){
    return "Air Tyler";
  }
  if(number == 2){
    return "The Dark Waffle";
  }
}

function displayStageSelect(){
  imageMode(CORNER);
  image(stageImg, 0, 0);
  fill(0);
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text('Choose a stage!', width/2, 50);
  
  imageMode(CENTER);
  image(stages[stageP1.stage], width/4, height/2, 600, 300);
  image(stages[stageP2.stage], 3*width/4, height/2, 600, 300);
  textSize(40);
  text('Player 1: A and D Buttons', width/4, 125);
  text('Player 2: Left and Right Arrows', 3*width/4, 125);
  for(let i = 0; i < stages.length; i++){
    image(stages[i], width/3 + 200*i, 525, 200, 100);
  }
  textAlign(RIGHT);
  fill(0, 0, 255);
  ellipse(width/3 + 200*stageP1.stage - 70, 460, 75, 75, 50);
  fill(255);
  text('P1', width/3 + 200*stageP1.stage - 150, 525, 200, 100, 50);
  fill(255, 0, 0);
  ellipse(width/3 + 200*stageP2.stage + 30, 460, 75, 75, 50);
  fill(255);
  text('P2', width/3 + 200*stageP2.stage - 50, 525, 200, 100, 50);
  text("Press C to confirm", )
}
function displayCharSelect(){
  imageMode(CORNER);
  image(stageImg, 0, 0);
  fill(0);
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text('Choose a character!', width/2, 50);
  textSize(40);

  imageMode(CENTER);
  image(chars[stageP1.char], width/4, height/2, 320, 320);
  image(chars[stageP2.char], 3*width/4, height/2, 320, 320);
  text('Player 1: A and D Buttons', width/4, 125);
  text('Player 2: Left and Right Arrows', 3*width/4, 125);
  for(let i = 0; i < chars.length; i++){
    image(chars[i], width/3 + 160*i, 525, 160, 160);
  }
  textAlign(RIGHT);
  fill(0, 0, 255);
  ellipse(width/3 + 160*stageP1.char - 70, 460, 75, 75, 50);
  fill(255);
  text('P1', width/3 + 160*stageP1.char - 150, 525, 200, 100, 50);
  fill(255, 0, 0);
  ellipse(width/3 + 160*stageP2.char + 30, 460, 75, 75, 50);
  fill(255);
  text('P2', width/3 + 160*stageP2.char - 50, 525, 200, 100, 50);
}

//Player 1 Health Bar
function P1Health() {
  //P1
  image(P1HealthImg, -10, 8, 515, 75);
  rectMode(CORNER);
  strokeWeight(0);
  fill(255, 0, 0);
  let healthWidth = map(p1.getHealth(), 0, MAXHEALTH, 0, 470);
  rect(15, 15, healthWidth, 32);

  strokeWeight(4);
  noFill();
  rectMode(CENTER);
  imageMode(CORNER);
  image(BoarderImg, -5, 10, 510, 40);
}

//Player 2 Health Bar
function P2Health() {
  //P2
  image(P2HealthImg, 690, 8, 515, 75);
  rectMode(CORNER);
  strokeWeight(0);
  fill(3, 44, 252);
  let healthWidth = map(p2.getHealth(), 0, MAXHEALTH, 0, -470);
  rect(1180, 15, healthWidth, 32);

  stroke(0);
  strokeWeight(4);
  noFill();
  rectMode(CENTER);
  imageMode(CORNER);
  image(BoarderImg, 690, 10, 510, 40);
}


//Creates character stats
class fighter {
  constructor(health, punch, moveX, playerNum) {
    this.health = health;
    this.punch = punch;
    this.block = false;
    this.moveX = moveX;
    // this.moveY = 500;
    this.jump = false;
    this.jumpingSpeed = 5;
    this.jmpUP = true;
    this.playerNum = playerNum;
    this.atkCooldown = true;
    this.playerBlock = false;
    this.walkCooldown = 0;

    //Defines the starting players position
    if (this.playerNum === 1) {
      this.x = 200;
      this.y = 500;
    } else if (this.playerNum === 2) {
      this.x = 800;
      this.y = 500;
    }

    // defines the controls based on the player
    if (this.playerNum === 1) {
      this.control = {
        up: 87, // W
        down: 83, // S
        left: 65, // A
        right: 68, // D
        punch: 84, //T
        block: 89 // Y
      };
      // this.ctrUp = 87;
      // this.ctrDown = 83;
      // this.ctrlLef = 65;
      // this.ctrRight = 68;
    } else if (this.playerNum === 2) {
      this.control = {
        up: 38, // Arrow UP
        down: 40, // Arrow Down
        left: 37, // Arrow Left
        right: 39, // Arrow Right
        punch: 221, // KEY ]
        block: 220 // KEY \
      };
      // this.ctrUp = 38;
      // this.ctrDown = 40;
      // this.ctrlLef = 37;
      // this.ctrRight = 39;
    }
  }

  //Returns the players X position on the screen
  plPosition() {
    let x = this.x;
    let y = this.y;
    return [x,y];
  }

  walkSound() {
    if (this.walkCooldown == 0 && this.jump == false) {
      if (this.playerNum === 1) 
        walk1SE.play();
      else
        walk2SE.play();
    }
    this.walkCooldown++;
    if (this.walkCooldown >= 10)
      this.walkCooldown = 0;
  }

  // Movement Controls
  move() {

    // Player
    if(keyIsDown(this.control.block)) {
      if (!this.playerBlock)
        blockSE.play();
      this.playerBlock = true;
    } else {
      this.playerBlock = false;
    }


    // Movements: left, rigth, and jump
    if (keyIsDown(this.control.left) && this.x > 50 && !this.playerBlock) {
      this.x -= this.moveX;
      this.walkSound();
    } else if (keyIsDown(this.control.right) && this.x < width - 50 && !this.playerBlock) {
      this.x += this.moveX;
      this.walkSound();
    } else if (keyIsDown(this.control.up) && !this.jump && !this.playerBlock) {
      this.jump = true;
      this.jumpingSpeed = -300;
      jumpSE.play();
    }

    // Movement: down
    if (keyIsDown(this.control.down)) {
      if (this.y != 600)
        crouchSE.play();
      this.y = 600;
    } else {
      this.y = 500;
    }

    // Jump Mech.
    if (this.jump) {
      this.y += this.jumpingSpeed;
      this.jumpingSpeed += 9.1; // Gravity effect

      // Check if player landed
      if (this.y >= 500) {
        this.y = 500;
        this.jump = false;
        this.jumpingSpeed = 0;
      }
    }

    // Updates the visual drawing
    rect(this.x, this.y, 100, 200);
  }

  // Creates the players attack hitbox
  // Returns the hitbox
  attack(pos) {
    let connected = false;
    if (keyIsDown(this.control.punch) && this.atkCooldown) {
      punchSE.play();
      rectMode(CORNER);
      fill(0);
      if (pos[0] > this.x) {
        rect(this.x - 50, this.y, 200, 25);
        connected = this.hitboxTest(pos, 1);
      } else if (pos[0] < this.x) {
        rect(this.x + 50, this.y, -200, 25);
        connected = this.hitboxTest(pos, 2);
      } else {
        console.log("No position");
      }

      this.atkCooldown = false; 
    }
    rectMode(CENTER);
    return connected;
  }
//Grabs player health
  getHealth() {
    return this.health;
  }
//Takes damage
  takeDamage() {
    this.health -= this.punch;
    if (this.health <= 0)
      this.health = 0;
  }

//checks player pos hitbox and player pos attack hitbox
//when overlaped, it because true.
//ellipse shows where the overlap happends
  hitboxTest(pos, number) {
    if (number == 1) {
      ellipse(this.x + 50, this.y, 5,5);

      if (this.x + 50 >= pos[0] - 50 &&
        this.y <= pos[1] + 100 &&
        this.y >= pos[1] - 100
      )
      return true;

      ellipse(this.x + 50, this.y + 25, 5,5);

      if (this.x + 50 >= pos[0] - 50 &&
        this.y + 25 <= pos[1] + 100 &&
        this.y + 25 >= pos[1] - 100
      )
      return true;

      ellipse(this.x + 150, this.y, 5,5);

      if (this.x + 150 >= pos[0] - 50 &&
        this.y <= pos[1] + 100 &&
        this.y >= pos[1] - 100
      )
      return true;
      
      ellipse(this.x + 150, this.y + 25, 5,5);

      if (this.x + 150 >= pos[0] - 50 &&
        this.y + 25 <= pos[1] + 100 &&
        this.y + 25 >= pos[1] - 100
      )
      return true;
    }
    else {
      ellipse(this.x - 50, this.y, 5,5);

      if (this.x - 50 <= pos[0] + 50 &&
        this.y <= pos[1] + 100 &&
        this.y >= pos[1] - 100
      )

      return true;

      ellipse(this.x - 50, this.y + 25, 5,5);

      if (this.x - 50 <= pos[0] + 50 &&
        this.y + 25 <= pos[1] + 100 &&
        this.y + 25 >= pos[1] - 100
      )

      return true;

      ellipse(this.x - 150, this.y, 5,5);

      if (this.x - 150 <= pos[0] + 50 &&
        this.y <= pos[1] + 100 &&
        this.y >= pos[1] - 100
      )

      return true;

      ellipse(this.x - 150, this.y + 25, 5,5);

      if (this.x - 150 <= pos[0] + 50 &&
        this.y + 25 <= pos[1] + 100 &&
        this.y + 25 >= pos[1] - 100
      )

      return true;
      
    }

  }

  //Experiment (block function)
  block() {
    // if(keyIsDown(this.control.block)){
    //   fill('blue');
    // } else
  }
}

// This function is called once when the key is released
function keyReleased() {
  // Player 1 Attack (F)
  if(keyCode === p1.control.punch) {
    p1.atkCooldown = true; // Allow attack again after key release
  }

  // Player 2 Attack (Down Arrow)
  if(keyCode === p2.control.punch) {
    p2.atkCooldown = true; // Allow attack again after key release
  }
}

// function keyPressed(){ 
//   // Player 1 Block (Y)
//   if(keyCode === p1.control.block){

//   }
// }
