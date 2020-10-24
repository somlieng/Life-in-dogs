let dogNames;

function preload(){
    let dogNameURL = "https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dog_names.json";
    dogNames = loadJSON(dogNameURL);
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
    //create canvas full window size
}

function draw() {
    background(220);
    let rand = dogNames.dog_names.length;
    let randName = random(0,rand-1);
    let name = dogNames.dog_names[floor(randName)];
    print(name);
    print (randName);
    text(name,100,100);
    noLoop();
}

function windowResized (){
    resizeCanvas(windowWidth,windowHeight);
}