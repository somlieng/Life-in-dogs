// JSON and API to load
let dogNames;
let dogBreeds = [];
let lifeExpect;

//variables to changes after calculation
let numdogs = 0;
let myDogNames = [];

function preload(){
    let dogNameURL = "https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dog_names.json";
        //JSON url for dog names
    let dogBreedURL = "https://api.thedogapi.com/v1/breeds?api_key=397d2dd2-8104-4b15-9587-3c9ed27b6a5c";
        //JSON url for list of dog breed information
    dogNames = loadJSON(dogNameURL);
        //Loads dog names
    let tempBreed = loadJSON(dogBreedURL,makeBreedlist);
        //Loads dog breeds with a callback function to create a new array for just the information we want
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
    print(dogBreeds);
}

//callback function for JSON call to create a new array of dog breed name and lifespan that we want
function makeBreedlist(tempBreed){
    for(let dog of tempBreed){
        dogBreeds.push({
            name: dog.name,
            lifespan: dog.life_span,
        });
    }
}

//get only the max lifespan
function getMaxLifespan(lifespan){
    
}

function draw() {
    background(220);
    text(myDogNames,100,100);
}

//makes sure the window is resize automatically
function windowResized (){
    resizeCanvas(windowWidth,windowHeight);
}