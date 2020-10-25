// JSON and API to load
let dogNames = []; 
let dogBreeds = [];
let lifeExpect = [];

//variables to changes after calculation
let numdogs = 0;
let myDogNames = [];
let lifeLeft = 0;

//dropdowns
let breedSelector;
let countrySelector;

//user input
let currentAge = 0;
let breed = "dog";
let country = "country";

function preload(){
    let dogNameURL = "https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dog_names.json";
        //JSON url for dog names
    let dogBreedURL = "https://api.thedogapi.com/v1/breeds?api_key=397d2dd2-8104-4b15-9587-3c9ed27b6a5c";
        //JSON url for list of dog breed information
    dogNames = loadJSON(dogNameURL);
        //Loads dog names
    let tempBreed = loadJSON(dogBreedURL,makeBreedlist);
        //Loads dog breeds with a callback function to create a new array for just the information we want
    let lifeExpectURL = "https://raw.githubusercontent.com/somlieng/Life-in-dogs/main/lifeExpectancy_2020.json";
    lifeExpect = loadJSON(lifeExpectURL);
}

function setup() {
    createCanvas(windowWidth, windowHeight); 
        //create canvas full window size
    background(255);
    numdogs = 5;
        //how dogs can you have until you die
    for(i = 0; i < numdogs; i++){
        let rand = dogNames.dog_names.length;
        let randName = random(0,rand-1);
        myDogNames.push(dogNames.dog_names[floor(randName)]);
    }
    createDropdown(10,10,dogBreeds,breedSelector,121,breed);
    createDropdown(10,50,lifeExpect,countrySelector,190,country);
//    countrySelector = createSelect();
//    countrySelector.position(10,50);
//    for(let i = 0; i < Object.keys(lifeExpect).length; i++){
//     countrySelector.option(lifeExpect[i].name);   
//    }
//    countrySelector.selected(lifeExpect[190].name);
//    print(countrySelector.value());
//    country = countrySelector.value();
//    breed = breedSelector.value();
//    country = countrySelector.value();
    print(breedSelector.value());
    print(countrySelector.value());
}

//callback function for JSON call to create a new array of dog breed name and lifespan that we want
function makeBreedlist(tempBreed){
    for(let dog of tempBreed){
        dogBreeds.push({
            name: dog.name,
            lifespan: getMaxLifespan(dog.life_span),
        });
    }
}

//get only the max lifespan.
function getMaxLifespan(lifespan){
    let temp = lifespan.split(" ");
        //Split up the string into an array based on the space.
    return (temp.length > 2) ? parseInt(temp[2]) : parseInt(temp[0]);
        // if the length of array is more than 2, take the 2 thing in the array, else take the 0th index. 
}

function draw() {
//    background(220);
//    text(myDogNames,100,100);
}

//makes sure the window is resize automatically
function windowResized (){
    resizeCanvas(windowWidth,windowHeight);
}

function createDropdown(x,y,data,dropdown,num,output){
    dropdown = createSelect();
    dropdown.position(x,y);
    for(let i = 0; i < Object.keys(data).length; i++){
     dropdown.option(data[i].name);   
    }
    dropdown.selected(data[num].name);
    print(dropdown.value());
    output = dropdown.value();
    return dropdown;
}