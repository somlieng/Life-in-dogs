// JSON and API to load
let dogNames;
let dogBreeds;
let lifeExpect;

//variables to changes after calculation
let numdogs = 0;
let myDogNames = [];

function preload(){
    let dogNameURL = "https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dog_names.json";
    dogNames = loadJSON(dogNameURL);
}

function setup() {
    createCanvas(windowWidth, windowHeight); 
        //create canvas full window size
    numdogs = 5;
        //how dogs can you have until you die
    for(i = 0; i < numdogs; i++){
        let rand = dogNames.dog_names.length;
        let randName = random(0,rand-1);
        myDogNames.push(dogNames.dog_names[floor(randName)]);
    }
}

function draw() {
    background(220);
    text(myDogNames,100,100);
}

function windowResized (){
    resizeCanvas(windowWidth,windowHeight);
}