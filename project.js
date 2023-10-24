let blinkingCursorSwitch = false 
let textCounter = 0 // keeps track of current text letter
let charX = 20;
let charY =  270;
let pressESwitch = false;
let endingScreenText = 0
let bottomBound = 320;
let topBound = 150;
let leftBound = 0;
let rightBound = 580;

let changeBackground = false;

let currentScreen = -1;
let openText = false;
let doorInteract = false;
let livingRoomDoorInteract = false;
let kpopInteractTrue = false;
let bedInteractTrue = false;
let photoInteractTrue = false;
let deskInteractTrue = false;
let teddybearInteractTrue =false;
let shirtInteractTrue = false;
let awaitTextDismiss = false;
let couchInteractTrue = false;
let tableFoodInteractTrue=false;
let bookShelfInteractTrue=false;
let phoneInteractTrue=false;
let windowInteractTrue=false;
let livingRoomDoorInteractTrue=false;
let cappyFunInteractTrue = false;
let guitarInteractTrue = false;
let plantFloorInteractTrue = false;
let basketballInteractTrue = false;
let phoneCall = false;
let changePhoneCallDialogue = false;
let phoneCallScreenText = 0;

let iceCreamInteractTrue=false;
let interactions = 0;

let majorObjectCounter=0;


let jumpState = false;
let jumpDown = false;

let lastDirection = 1; // 1 = foward, 2 = right, 3 = left, 4 = backward
let dx = 1.50;
let dy = 1.50;
let back, idle, left, right, walkFoward, walkLeft, walkRight, walkBack;
let bedroombg, bed, corkboard, curtains, desktop, twiceposter, teddybear, shirt;
let livingroombg, treehouse, dresser, table, sofa, phone, capyfun, basketball, guitar, icecream, plant;
let body, headboy, headgirl;
let normal, ending, angry, blank, bothered, frown, happy,bored;
let treehousesparkle

let dustX = [];
let dustY = [];
let dustDX = [];
let dustDY = [];

let ghostX = [];
let ghostY = [];
let ghostDX = [];
let ghostDY = [];
let headR = 0;
let headright = true;

let playOnceDoorAudio = false;
let dialogueIsRunning = false;

function preload() {
  // preload() runs once
  idle = loadImage("./mcsprites/idle.gif");
  back = loadImage("./mcsprites/back1.png");
  left = loadImage("./mcsprites/left1.png");
  right = loadImage("./mcsprites/right1.png");
  walkFoward = loadImage("./mcsprites/walkforward.gif");
  walkRight = loadImage("./mcsprites/walkright.gif");
  walkLeft = loadImage("./mcsprites/walkleft.gif");
  walkBack = loadImage("./mcsprites/walkback.gif");
  bedroombg = loadImage("./backgrounds/bedroomflat.png");
  bed = loadImage("./backgrounds/bed.png");
  corkboard = loadImage("./backgrounds/corkboard.png");
  curtains = loadImage("./backgrounds/curtains.png");
  desktop = loadImage("./backgrounds/desktop.png");
  twiceposter = loadImage("./backgrounds/twiceposter.png");
  shirt = loadImage("./backgrounds/shirt.png");
  teddybear = loadImage("./backgrounds/teddybear.png");
  livingroombg = loadImage("./backgrounds/livingroomflat.png");
  treehouse = loadImage("./backgrounds/treehouse.png");
  dresser = loadImage("./backgrounds/dresser.png");
  table = loadImage("./backgrounds/table.png");
  sofa = loadImage("./backgrounds/sofa.png");
  phone = loadImage("./backgrounds/phone.png");
  guitar = loadImage("./backgrounds/guitar.png");
  icecream = loadImage("./backgrounds/icecream.png");
  basketball = loadImage("./backgrounds/basketball.png");
  capyfun = loadImage("./backgrounds/capyfun.png");
  plant = loadImage("./backgrounds/plant.png");
  body = loadImage("./backgrounds/body.png");
  headboy = loadImage("./backgrounds/headboy.png");
  headgirl = loadImage("./backgrounds/headgirl.png");
  titleScreen = loadImage("./backgrounds/titlescreen.png");
  ending = loadImage("./backgrounds/ending1.png");
  angry = loadImage("./textbox/angry.png");
  blank = loadImage("./textbox/blank.png");
  happy = loadImage("./textbox/happy.png");
  frown = loadImage("./textbox/frown.png");
  bothered = loadImage("./textbox/bothered.png");
  bored = loadImage("./textbox/bored.png");
  treehousesparkle = loadImage("./backgrounds/treehousesparkle.gif");
   

  normal = loadImage("./textbox/normal.png");
  angry = loadImage("./textbox/angry.png");
  bored = loadImage("./textbox/bored.png");
  bothered = loadImage("./textbox/bothered.png");
  frown = loadImage("./textbox/frown.png");
  happy = loadImage("./textbox/happy.png");

  //preload(), audio
  audioFootsteps = loadSound("soundassets/kenney_rpg audio pack/footstep03.ogg");
  audioDoorOpen = loadSound("soundassets/kenney_rpg audio pack/doorOpen_1.ogg");
  audioDialogueBleep1 = loadSound("soundassets/Simple Bleeps/sfx_sounds_Blip7.wav")
}

function setup() {
  createCanvas(680, 400);
  dustNum = random(20, 40);
  ghostNum = random(3, 5);
   
   for (let i = 0; i < dustNum; i++)
   {
      dustX.push(random(width));
      dustY.push(random(height));
      dustDX.push(random(.2, .55));
      dustDY.push(random(.2, .55));
   }
  for (let i = 0; i < ghostNum; i++)
   {
      ghostX.push(random(width));
      ghostY.push(random(height));
      ghostDX.push(random(.2, .5));
      ghostDY.push(random(.2, .25));
   }
}


function loopAudio() {
  if(!audioDialogueBleep1.isPlaying() == true){
    audioDialogueBleep1.play();
    dialogueIsRunning == true;
  }
  
  dialogueIsRunning = false;
}

function draw() { 
  currentBackgroundChanger();  
  
  
  changeBackgroundTransition(); 

 console.log(interactions)
  
  
  
  playAudioInteractions();
  setAudioConditionsDefault();

  majorObjectFunction();
}

function mousePressed(){
  console.log(mouseX,mouseY);
}

function displayIdle(){
  if(awaitTextDismiss){

    switch (lastDirection) {
      case 1:
        image(idle, charX, charY);
        playerMoving=false;
        break;
      case 2:
        image(right, charX, charY);
        playerMoving=false;
        break;
      case 3:
        image(left, charX, charY);
        playerMoving=false;
        break;
      case 4:
        image(back, charX, charY);
        playerMoving=false;
        break;
    }
  }
}
function movement() {
  const D_KEY = keyIsDown(68);
  const A_KEY = keyIsDown(65);
  const W_KEY = keyIsDown(87);
  const S_KEY = keyIsDown(83);
  updateCharacterBounds();
  if(awaitTextDismiss){return}
  
  //right movement
  if (D_KEY && !S_KEY && !W_KEY) {
    if(charX <= rightBound){
      charX += dx;
    }
    image(walkRight, charX, charY); 
    playerMoving=true;
    lastDirection = 2;
  }

  // left movement, a key
  if (A_KEY && !S_KEY && !W_KEY && !D_KEY) {
    if(charX >= leftBound){
      charX -= dy;
    }
    image(walkLeft, charX, charY);
    playerMoving=true;
    lastDirection = 3;
  }

  // back movement, w key
  if (W_KEY && !A_KEY && !D_KEY) {
    if(charY >= topBound ){
      charY -= dy;
    }
    image(walkBack, charX, charY);
    playerMoving=true;
    lastDirection = 4;
  }

  // foward movement, s key
  if (S_KEY && !D_KEY && !A_KEY) {
    if (charY <= bottomBound) {
      charY += dy;
    }
    image(walkFoward, charX, charY);
    playerMoving=true;
    lastDirection = 1;
  }

  // foward right direction
  if (S_KEY && D_KEY) {
    if (charY <= bottomBound && charX <= rightBound ) {
      charX += dx;
      charY += dy;
    }
    image(walkFoward, charX, charY);
  }
  
  // foward left direction
  if (S_KEY && A_KEY) {
    if (charY <= bottomBound && charX >= leftBound) {
      charX -= dx;
      charY += dy;
    }
    image(walkFoward, charX, charY);
    playerMoving=true;
  }

  // backward left direction
  if (W_KEY && A_KEY) {
    if(charY >= topBound && charX >= leftBound){
      charX -= dx;
      charY -= dy;
    }
    image(walkBack, charX, charY);
    playerMoving=true;
  }

  // backward right direction
  if (W_KEY && D_KEY) {
    if(charY >= topBound && charX <= rightBound ){
      charX += dx;
      charY  -= dy;
    }
    image(walkBack, charX, charY);
    playerMoving=true;
  }
  
  //idle direction
  if (!(S_KEY || A_KEY || D_KEY || W_KEY)){
    switch (lastDirection) {
      case 1:
        image(idle, charX, charY);
        playerMoving=false;
        break;
      case 2:
        image(right, charX, charY);
        playerMoving=false;
        break;
      case 3:
        image(left, charX, charY);
        playerMoving=false;
        break;
      case 4:
        image(back, charX, charY);
        playerMoving=false;
        break;
    }
  }

  //jump
  if (jumpState) {
    setTimeout(() => {
      charY -= 5;
      jumpState = false;
      jumpDown = true;
    }, 200);


  }

  if (jumpDown) {
    setTimeout(() => {
      charY += 5;
      jumpDown = false;
    }, 200);
  }
}

function majorObjectFunction(){
  //make physical counter
  if(majorObjectCounter==8){
    unlockWindowInteraction();
  }
}

function unlockWindowInteraction(){

}

function updateCharacterBounds(){
  
  if(currentScreen == 0 ){
    //bed bounding
    if(charY < 213){
      leftBound = 175;
    }
    if(charY > 213){
      leftBound = 0;
      if(charX < 142){
        topBound = 225;
      }
      else{
        topBound = 150;
      }
    }
  }

  if(currentScreen == 1){
    //dining table bounding
    if(charX > 147 && charX < 248 ){
      bottomBound =  260;
    }

    if (charX  < 147 || charX > 268){
     bottomBound = 320;
     
    }


    if(charY > 264 && charX < 147){
       rightBound = 120
     }
     else{
       rightBound = 600
     }
  

    if(charX > 248 && charY > 262){
      leftBound = 272;
    }
    else {
      leftBound = 0;
    }
    

    //phone table bounding
    if(charX < 448 && charX > 272 && charY > 285){
      rightBound = 435;
    }
   
    if(charX > 520 && charY > 285){
      leftBound = 540
    }

    if(charX > 448 && charX < 525){
      bottomBound = 281;
    }

    

  }
  
}

function bedroomBackground(){
  
  image(bedroombg, 0, 0);
  image(curtains, 0, 30);
  image(bed, 0, 160);
  image(desktop, 480, 100);
  image(corkboard, 320, 40);
  image(twiceposter, 230, 80);
  image(teddybear, 350, 300);
  image(shirt, 100, 320)
}

function livingroomBackground(){
  
  image(livingroombg, 0, 0);
  

  
  image(treehouse, 220,30);

  image(dresser, 480, 80);
  image(table, 120, 340);
  image(phone, 480, 358);
  image(sofa, 47, 130);
  image(guitar, 400, 280);
  image(basketball, 370, 380);
  image(plant, 430, 150);
  image(icecream, 275, 340);
  image(capyfun, 275, 250);
  if(interactions > 9){
    image(treehousesparkle, 220, 30)
   
  }
  updateDust();
}

function bedroomDoor(){
 
  //door interaction
  if((charX >= 570 && charX <= 600 && charY >= 228 && charY <= 272) ){
    interactionBubble("F");

    if(doorInteract && interactions >= 4){
      currentScreen = 1;
      charX = leftBound;
      charY = 200;
      doorInteract = false;
      changeBackground = true;
      playOnceDoorAudio = true;

    }
    if(doorInteract && interactions < 4){
      awaitTextDismiss = true;
      if(awaitTextDismiss){
      dialogue("Looking around my room always helps me calm down. I should \n focus on that for now.", frown)
        if(keyCode == 69){
          doorInteract = false;
          awaitTextDismiss = false;
          
        }
      }
    
    } 
  
  }
  
}

function interactionBubble(letter){
  noStroke();
  fill(20);
  ellipse(charX + 40, charY - 35, 40)
  push();
    fill(200);
    textSize(30)
    textFont("Helvetica")
    text(letter, charX  + 30, charY - 25, )
  pop();


}

function currentBackgroundChanger(){
  if(currentScreen === -1){
    titleScreenControl();
  }
  
  if(currentScreen === 0 && !changeBackground){
   
    bedroomBackground();
    bedroomDoor(); 
    generateGhost();
    displayIdle();
    movement(); 
    openingDialogue();
    dialogueTextRoom1();
    simpleInteractions1();
    
    
  }
  if(currentScreen === 1 && !changeBackground){
    livingroomBackground();
    movement();
    displayIdle();
    simpleInteractions2();
    dialogueTextRoom2();
    livingRoomDoorInteraction();

  }
  if(currentScreen === 2 && !changeBackground){
    
    endingScreenControl();
  }
}

function changeBackgroundTransition(){
  if(changeBackground){
    fill(0);
    background(0);
    
    setTimeout(()=>{
      changeBackground = false
    }, 500)
  }
}

function dialogue(sentence, expression) {
  image(expression, 0, 0);
  fill('white');
  textSize(15);
  textFont('Courier');

  if(textCounter < sentence.length + 1 ){
    
    text(sentence.slice(0, textCounter) + "█", 50, 305);
    setTimeout(()=>{textCounter++},400)
    setTimeout(()=>{loopAudio()},400)
  
  }
  else{
    text(sentence + blinkingTextCursor() , 50, 305);
    text(""+ flashingPressE(), 550, 360);
  }
}


function keyPressed() {
      if((keyIsDown(65) || keyIsDown(68) || keyIsDown(83) || keyIsDown(87)) && currentScreen != -1 && !awaitTextDismiss){
        audioFootsteps.pause();
        audioFootsteps.loop(0, 1);
      }

  // space key
  if (keyCode === 32) {
    jumpState = true;
  }

  // door interact
  if(keyCode === 70 && (charX >= 570 && charX <= 600 && charY >= 228 && charY <= 272) && lastDirection == 2){
    doorInteract = true;
    
   

  
  }
  //interaction dismiss
  if(keyCode == 69 && awaitTextDismiss){
    awaitTextDismiss = false
    textCounter = 0
    kpopInteractTrue = false;
    bedInteractTrue = false;
    deskInteractTrue = false;
    photoInteractTrue = false;
    couchInteractTrue = false;
    tableFoodnteractTrue=false;
    bookShelfInteractTrue=false;
    phoneIntereactTrue=false;
    windowInteractTrue=false;
    livingRoomDoorInteractTrue=false;
    guitarInteractTrue = false;
    shirtInteractTrue = false;
    plantFloorInteractTrue = false;
    basketballInteractTrue = false;
    cappyFunInteractTrue = false;
    iceCreamInteractTrue=false;
    teddybearInteractTrue = false;
    if(!doorInteract){ 
    interactions ++
    }
  }

  if(currentScreen == -1 && keyCode == 13){
    currentScreen ++
    changeBackground = true
    openText = true;
    interactions --;

  }

  if(keyCode == 69 && openText){
    openText = false;
    textCounter = 0;
    awaitTextDismiss = false;
    
  }
  if(keyCode == 69 && phoneCall ){
    if(phoneCallScreenText < 10 ){
      phoneCallScreenText ++
      awaitTextDismiss = true;
    }
    else {
      awaitTextDismiss = false;
      textCounter = 0;
    }
  }
  if(charX > 560 && charX < 650 && charY > 200 && charY < 275 && lastDirection == 2 && currentScreen == 1 && keyCode == 70){
    livingRoomDoorInteract = true;


  }

  if(currentScreen == 2 && keyCode == 69){
    if(endingScreenText < 2 ){
      endingScreenText ++
    }
    else{
    currentScreen = -1;
    textCounter = 0;
    changeBackground = true;

    awaitTextDismiss = false
    
    kpopInteractTrue = false;
    bedInteractTrue = false;
    deskInteractTrue = false;
    photoInteractTrue = false;
    couchInteractTrue = false;
    tableFoodnteractTrue=false;
    bookShelfInteractTrue=false;
    phoneIntereactTrue=false;
    windowInteractTrue=false;
    livingRoomDoorInteractTrue=false;
    guitarInteractTrue = false;
    shirtInteractTrue = false;
    plantFloorInteractTrue = false;
    basketballInteractTrue = false;
    cappyFunInteractTrue = false;
    iceCreamInteractTrue=false;
    teddybearInteractTrue = false;
    interactions = 0

    charX = 20;
    charY =  270;
    ß
    }
  }
  


}

function keyReleased() {
  if(!(keyIsDown(65) || keyIsDown(68) || keyIsDown(83) || keyIsDown(87))){
    audioFootsteps.pause();
  }
}

function blinkingTextCursor(){

  if(blinkingCursorSwitch){
    setTimeout(()=>{blinkingCursorSwitch = false}, 500)
    return " █"
  }
  else{
    setTimeout(()=>{blinkingCursorSwitch = true}, 500)
    return ""
  }
}

function updateDust(){
  for (let i = 0; i < dustNum; i++)
   {
     noStroke();
     fill(color(random(244, 255), random(180, 229), random(120, 150), 102));
     ellipse(dustX[i], dustY[i], 2.5);
     
    dustX[i] += dustDX[i];
    dustY[i] += dustDY[i];
     
      if (dustX[i] >= width || dustX[i] <= 0){
        dustDX[i] = -dustDX[i];
        dustDY[i] = -dustDY[i];
      }

      if (dustY[i] >= height || dustY[i] <= 0){
        dustDX[i] = -dustDX[i];
        dustDY[i] = -dustDY[i];
      }
   }
}

function dialogueTextRoom1(){
  //if the player interacts with the kpop poster while standing completely still, dialogue appears and if the player moves again, the dialogue disappears
  if(kpopInteractTrue){
    if(awaitTextDismiss){
    dialogue("Love their music. I wonder what the superfan, Eric Berber, is up to. \nI remember he got arrested for trying to break into the \n idols' houses", happy);
   
    }
    
  }

  if(bedInteractTrue){
    if(awaitTextDismiss){
    dialogue("I had a horrible sleep last night. Maybe later...", bothered);
    }
    
  }

  if(photoInteractTrue){
    if(awaitTextDismiss){
    dialogue("Jamie, Ria, Thomas, and Marco. We all used to hang out everyday \n after school doing whatever we wanted... \nIt was all my fault", frown);
    }
    
  }

  if(deskInteractTrue){
    
    if(awaitTextDismiss){
    dialogue("How do I not feel pathetic? I sit here all day while everyone \n else... Let's move away.", normal);
    }
    
  }
  if(shirtInteractTrue){
    if(awaitTextDismiss){
      dialogue("The shirt's unclean. I rememeber Ria gave this to me as a souvenir \n for when she went to New York. I hope she's okay", normal);
    }
  }
  if(teddybearInteractTrue){
    if(awaitTextDismiss){
      dialogue("A birthday present from a few years ago. \nKind of reminds me of how we all broke off.", normal);
    }
  }

}

function dialogueTextRoom2(){
  if(phoneInteractTrue){
    tableFoodInteractTrue =false;

    if(awaitTextDismiss && !changePhoneCallDialogue){
      dialogue("I have no one to call.", normal);
    }
    if(awaitTextDismiss && changePhoneCallDialogue){
      phoneCall = true;
      phoneCallDialogue();
    }
  }

  if(couchInteractTrue){
    tableFoodInteractTrue = false;
    phoneInteractTrue =false
    if(awaitTextDismiss){
      dialogue("Morne is sleeping cutely.", normal);
      }
  }

  if(tableFoodInteractTrue){
    phoneInteractTrue =false;
    if(awaitTextDismiss){
      dialogue("Mom probably left these eggs for me. They're cold now.", normal);
      }
  }

  if(bookShelfInteractTrue){
    if(awaitTextDismiss){
      dialogue("Some of the books are heavily damaged by water or just ripped to \n shreds. It's all gone downhill since that fight...", angry);
      }
  }


  if(windowInteractTrue){
    if(awaitTextDismiss && interactions < 9){
      dialogue("That treehouse hasn't been used in ages", normal);
      }
    if(awaitTextDismiss && interactions > 9){
      changePhoneCallDialogue = true
      phoneInteractTrue =false;
      dialogue("Something's different about today. I been confronting too \n many things... Damn, I miss my friends so bad. I know what I did to \n Sandra was inexcusable... But I want to use the phone.", normal);
    }
  }
  
  if(iceCreamInteractTrue){
    if(awaitTextDismiss){
      dialogue("BING CHILLING +100 social credit", normal);
      }
  }
  if(basketballInteractTrue){
    if(awaitTextDismiss){
      dialogue("It all started in the basketball court. Sandra was crying like \nalways so I decided to what I always did \nJamie was the first one to confront me about my behavior",normal);
    }
  }
  if(plantFloorInteractTrue){
    if(awaitTextDismiss){
      dialogue("Marco's plant for me. He probably hates me the most.\n I felt isolated and rejected, of \ncourse I would...", normal);
    }
  }
  if(guitarInteractTrue){
    if(awaitTextDismiss){
      dialogue("Even after all that, Ria still followed through and gave me the \nguitar she promised. Does she still care about me?", happy);
    }
  }
  if(cappyFunInteractTrue){
    if(awaitTextDismiss){
      dialogue("Jamie and I loved this game. \nWe would lose track of time playing this all day as kids.", happy);
    }
  }
 

}

function simpleInteractions1(){
  
    console.log("currentScreen0")
  //kpop interact
    //(235, 188) (262,136)
    if(keyCode == 70 && (charX >= 205 && charX <= 235 && charY >= 132 && charY <= 151) && lastDirection == 4){
      console.log("kpop poster");
      kpopInteractTrue=true;
      awaitTextDismiss = true;
  }

  //bed interact
    //(172,283) (175,186) (211,185) (192,281)
    if(keyCode == 70 && (charX >= 150 && charX <= 188 && charY >= 145 && charY <= 219) && lastDirection == 3){
      console.log("bed");
      bedInteractTrue=true;
      awaitTextDismiss = true;
    }
    

  //photos interact
  //(333,183) (458,183)
  if(keyCode == 70 && (charX >= 308 && charX <= 422 && charY >= 138 && charY <= 152) && lastDirection == 4){
    console.log("photos");
    photoInteractTrue=true;
    awaitTextDismiss =true;
  }


  //desk interact
  //(488,219) (592,219)
  if(keyCode == 70 && (charX >= 474 && charX <= 558 && charY >= 138 && charY <= 152) && lastDirection == 4){
    console.log("desk");
    deskInteractTrue=true;
    awaitTextDismiss = true;
    }
    
    //shirt interact
    if(keyCode == 70 &&(charX >= 65 && charX <= 137 && charY >= 250 && charY <= 315 )){
      shirtInteractTrue = true;
      awaitTextDismiss = true;
    }

    if(keyCode == 70 && (charX >= 300 && charX <= 365 && charY >= 230 && charY <= 286)){
      teddybearInteractTrue =true;
      awaitTextDismiss = true;
    }

    //desk
    if((charX >= 474 && charX <= 558 && charY >= 138 && charY <= 152) && lastDirection == 4 && !awaitTextDismiss){
      interactionBubble('F'); 
    }
    //photos
    if((charX >= 308 && charX <= 422 && charY >= 138 && charY <= 152) && lastDirection == 4 && !awaitTextDismiss){
      interactionBubble('F');
    }
    //bed
    if((charX >= 150 && charX <= 188 && charY >= 145 && charY <= 219) && lastDirection == 3 && !awaitTextDismiss){
      interactionBubble('F');
    }
    //poster
    if((charX >= 205 && charX <= 235 && charY >= 132 && charY <= 151) && lastDirection == 4 && !awaitTextDismiss){
      interactionBubble('F')
  
     }
    //shirt
    if((charX >= 65 && charX <= 137 && charY >= 250 && charY <= 315 ) && !awaitTextDismiss){
      interactionBubble("F")
    }

    //teddy bear
    
    if((charX >= 300 && charX <= 365 && charY >= 230 && charY <= 286) && !awaitTextDismiss){
      interactionBubble('F');
      }
} 
function simpleInteractions2(){
  if(currentScreen == 1){

    console.log("currentScreen1");
  //---------------
    //couch interact
    if(keyCode == 70 && (charX >= 26 && charX <= 161 && charY >= 149 && charY <= 169) && lastDirection == 4){
      console.log("couch");
      couchInteractTrue=true;
      awaitTextDismiss = true;
    }


    //window interact
    if(keyCode == 70 && (charX >= 230 && charX <= 372 && charY >= 138 && charY <= 158) && lastDirection == 4){
      console.log("window");
      windowInteractTrue=true;
      awaitTextDismiss = true;
    }


    //iceCream interact
    if(keyCode == 70 && (charX >= 251 && charX <= 275 && charY >= 260 && charY <= 305) && lastDirection == 1 ){
      console.log("ice cream");
      iceCreamInteract=true;
      awaitTextDismiss = true;
    }

    //guitar interact
    if(keyCode == 70 && (charX >= 360 && charX <= 418 && charY >= 216 && charY <= 256)) {
    console.log("guitar");
    guitarInteractTrue = true;
    awaitTextDismiss = true;
  }

  //plant on floor interact
  if(keyCode == 70 && (charX >= 383 && charX <= 433 && charY >= 149 && charY <= 189) && lastDirection == 4) {
    console.log("potted plant, floor");
    plantFloorInteractTrue = true;
    awaitTextDismiss = true;
  }

  //basketball interact
  if(keyCode == 70 &&(charX >= 328 && charX <= 356 && charY >= 275 && charY <= 321)) {
    console.log("basketball");
    basketballInteractTrue = true;
    awaitTextDismiss = true;
  }
  //table food 
  if(keyCode == 70 && (charX >= 85 && charX <= 121 && charY >= 270 && charY <= 321 ) && lastDirection == 2){
    console.log("table food interact")
    phoneInteractTrue =false;

    tableFoodInteractTrue =true;
    awaitTextDismiss = true;
  }
  // bookshelf
  if(keyCode == 70 && (charX >= 450 && charX <= 525 && charY >= 149 && charY <= 180) && lastDirection == 4){
    console.log("bookshelf")
    bookShelfInteractTrue =true;
    awaitTextDismiss = true;
  }

  //phone interact
  if(keyCode == 70 && (charX >= 410 && charX <= 500 && charY >= 273 && charY <= 321) && (lastDirection == 1 || lastDirection == 2)){
    phoneInteractTrue = true;
    awaitTextDismiss = true;
  }

  //icecream
  if(keyCode == 70 && (charX >= 215 && charX <= 245 && charY >= 245 && charY <= 265) && lastDirection == 1 ){
    iceCreamInteractTrue = true;
    awaitTextDismiss = true;
  }
  if(keyCode == 70 && (charX >= 230 && charX <= 280  && charY >= 180 && charY <= 220) && !awaitTextDismiss){
    cappyFunInteractTrue = true;
    awaitTextDismiss = true;
  }
  //cappyfun
  if((charX >= 230 && charX <= 280 && charY >= 180 && charY <= 220) && !awaitTextDismiss){
    interactionBubble('F')
  }

  //icecream
  if((charX >= 215 && charX <= 245 && charY >= 245 && charY <= 265) && lastDirection == 1 && !awaitTextDismiss){
    interactionBubble("F");
  }
  
  

  //bookshelf
  if((charX >= 450 && charX <= 525 && charY >= 149 && charY <= 180) && lastDirection == 4 && !awaitTextDismiss){
    interactionBubble('F');
  }
  
 
  //guitar
  if((charX >= 360 && charX <= 418 && charY >= 216 && charY <= 256) && !awaitTextDismiss){
    interactionBubble('F'); 
  }

  //plant on floor
  if((charX >= 383 && charX <= 433 && charY >= 149 && charY <= 182) && lastDirection == 4 && !awaitTextDismiss){
    interactionBubble('F'); 
  }
  
  //basketball
  if((charX >= 328 && charX <= 356 && charY >= 275 && charY <= 321) && lastDirection == 1 && !awaitTextDismiss){
    interactionBubble('F'); 
  }
  //couch
  if((charX >= 26 && charX <= 161 && charY >= 149 && charY <= 169) && lastDirection == 4 && !awaitTextDismiss){
    interactionBubble('F')
  }
  //phone
  if((charX >= 410 && charX <= 500 && charY >= 273 && charY <= 321) && (lastDirection == 1 || lastDirection == 2)){
    interactionBubble('F')
  }
  //table food
  if((charX >= 85 && charX <= 121 && charY >= 270 && charY <= 321 ) && !awaitTextDismiss && lastDirection == 2){
    interactionBubble("F");
  }
  //window
  
  if((charX >= 230 && charX <= 372 && charY >= 138 && charY <= 158) && lastDirection == 4 && !awaitTextDismiss){
   interactionBubble("F");
    }
  }
}

function drawGhost(x, y){
  push();
    translate(x, y);
    image(body, 0, 0);
  
    push();
      translate(-15, -30);
      rotate(headR);
      image(headboy, 0, -12);
    pop();
  pop();

  if (!headright)
  {
    headR -= PI/1000;
  } else
  {
    headR += PI/1020;
  }
  
  if(headR > PI/20)
    {
      headright = false;
    }
  if (headR < -PI/42)
    {
      headright = true;
    }
}
  
function generateGhost(){
  for (let i = 0; i < ghostNum; i++)
   {
     drawGhost(ghostX[i], ghostY[i]);

     ghostX[i] += ghostDX[i]
     ghostY[i] += ghostDY[i]
     if (ghostX[i] >= width || ghostX[i] <= 0){
      ghostDX[i] = -ghostDX[i];
      ghostDY[i] = -ghostDY[i];
    }

    if (ghostY[i] >= height || ghostY[i] <= 0){
      ghostDX[i] = -ghostDX[i];
      ghostDY[i] = -ghostDY[i];
    }
   }
}

function titleScreenControl(){
  image(titleScreen, 0, 0)
  
}
function playAudioInteractions() {
  if (playOnceDoorAudio == true) {
    audioDoorOpen.play();
  }
}

function setAudioConditionsDefault() {
  playOnceDoorAudio = false;
}

function flashingPressE(){
  if(pressESwitch){
    setTimeout(()=>{pressESwitch = false}, 500);
    return "Press E"
  }
  else{
    setTimeout(()=>{pressESwitch = true}, 500);
    return ""
  }
}

function openingDialogue() {
  
  if(openText && !changeBackground){
    awaitTextDismiss = true
    dialogue("They are all bothering me again. I can't handle this. \n I need to distract myself.",normal);
    
  }
  


}

function livingRoomDoorInteraction(){
  if(charX > 560 && charX < 650 && charY > 200 && charY < 275 && lastDirection == 2 ){
    interactionBubble('F')
    if(livingRoomDoorInteract && phoneCall){
      changeBackground = true;
      currentScreen = 2;
 
    }
    if(livingRoomDoorInteract && !phoneCall){
      awaitTextDismiss = true;
      if(awaitTextDismiss){

        dialogue("I don't want to go outside", angry);
        if(keyCode == 69){
    
          livingRoomDoorInteract =false;
          doorInteract = false
          awaitTextDismiss =false;
          
        }
      }
    }
  }
}

function endingScreenControl(){
  image(ending, 0, 0)
  awaitTextDismiss = true
  if(awaitTextDismiss && endingScreenText == 0){
  dialogue("Will I be fine? Will everything be okay?", blank);
  }
  
 if(awaitTextDismiss && endingScreenText == 1) {
    dialogue("This is everything that I've sheltered myself \n from so long. The colors are so bright and\n the light is making me hazy", blank);
 }

 if(awaitTextDismiss && endingScreenText == 2){
   dialogue("The brightness yearns me forward...", blank);
 }
 
 

}

function phoneCallDialogue(){
  if(awaitTextDismiss && phoneCallScreenText == 0){
    dialogue("Is that okay of me? Should I be doing this?", blank);
  }
  if(awaitTextDismiss && phoneCallScreenText == 1){
    dialogue(".......................", blank)
  }
  if(awaitTextDismiss && phoneCallScreenText == 2){
    dialogue("Hello...?", blank)
  }
  if(awaitTextDismiss && phoneCallScreenText == 3){
    dialogue("Hey....", frown)
  }
  if(awaitTextDismiss && phoneCallScreenText == 4){
    dialogue("It's me, Marco.", normal)
  }
  if(awaitTextDismiss && phoneCallScreenText == 5){
    dialogue("Oh... Dang it, I'll just do it. Dude I'm\n sorry for what happened. We were younger, we didn't\n know better. We escalated things too far.", blank)
  }
  if(awaitTextDismiss && phoneCallScreenText == 6){
    dialogue("Yea, I messed up big time Marco. I didn't know what I\n was thinking... How is Sandra now?", bothered )
  }
  if(awaitTextDismiss && phoneCallScreenText == 7){
    dialogue("It's a mixed bag. I think you understand that \nyou really messed up on that. I don't \nthink Jamie has forgiven you yet... ", blank)
  }
  if(awaitTextDismiss && phoneCallScreenText == 8){
    dialogue("By the way, wanna hang for a bit? I'm actually nearby.", blank)
  }
  if(awaitTextDismiss && phoneCallScreenText == 9){
    dialogue("Yea that sounds good. I'm down, I'll head outside.", blank)
  }
  if(awaitTextDismiss && phoneCallScreenText == 10 ){
    awaitTextDismiss = false
  }
}

