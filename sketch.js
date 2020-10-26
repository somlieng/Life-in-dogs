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
let currentAge;
let gender = "female"; 

//button
let calcButton;
let femaleButton;
let maleButton;

//color palette
let blue = "#0624F7";
let lightBlue = "#B2BBFD";
let darkBlue = "#00094A";

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
        //make background color
    femaleButton = createButton('Female','female');
    maleButton = createButton('Male','male');
    genderButton(maleButton,femaleButton,10,10);
        //make gender buttons
    currentAge = createInput(" ");
    createInputField(currentAge,10,50);
        //generate input field for age
    breedSelector = createSelect();
    countrySelector = createSelect();
        //generate dropdown for breed and country
        //generate gender buttons
    createDropdown(10,90,lifeExpect,countrySelector,190);
    createDropdown(10,130,dogBreeds,breedSelector,121);
        //customize the dropdown data
    calcButton = createButton('Calculate');
    calcButtonCustomize(calcButton,10,170);
        //generate the calculate button
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

//makes sure the window is resize automatically
function windowResized (){
    resizeCanvas(windowWidth,windowHeight);
}

//customize dropdown
function createDropdown(x,y,data,dropdown,num){
    dropdown.position(x,y);
    for(let i = 0; i < Object.keys(data).length; i++){
     dropdown.option(data[i].name);   
    }
    dropdown.selected(data[num].name);
}

//customize input field
function createInputField(name,x,y){  
    name.position(x,y);
}

//customize button
function calcButtonCustomize(button,x,y){
    button.position(x,y);
    button.mousePressed(calcDog);
}

function genderButton(male,female,x,y){
    female.position(x,y);
    male.position(x+60,y);
    female.mousePressed(whichGender);
    male.mousePressed(whichGender);
}

function whichGender(){
    gender = this.value();
    print(gender);
}

function calcDog(){
//    numdogs = 5;
//        //how dogs can you have until you die
//    for(i = 0; i < numdogs; i++){
//        let rand = dogNames.dog_names.length;
//        let randName = random(0,rand-1);
//        myDogNames.push(dogNames.dog_names[floor(randName)]);
//    }
//        //generate name of dogs you might have
    print("pressed");
}