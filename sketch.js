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

//text and other stuff
let title;
let subtitle;
let buttonPanel;
let divHeight = 64;
let breedLabel;
let countryLabel;
let ageLabel;

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
    title = createElement('h1', 'How many more dogs can you have?');
        //make title
    subtitle = createElement('h3', 'Please enter the breed of dog your would like to have, your current age, country of birth and sex at birth:');
        //make subtitle
    buttonPanel = createDiv();
    buttonPanel.id('buttonPanel');
    buttonPanel.size(AUTO,divHeight);
        //make div
    breedLabel = createP('Dog breed:');
    breedLabel.parent(buttonPanel);
    breedLabel.class('labels');
        //make breed selector label
    breedSelector = createSelect();
    createDropdown(dogBreeds,breedSelector,121);
        //generate and customize breed selector
    currentAge = createInput(" ");
    createInputField(currentAge);
        //generate input field for age
    ageLabel = createP('Current Age:');
    ageLabel.parent(buttonPanel);
    ageLabel.class('labels');
        //make breed selector label
    countrySelector = createSelect();
    createDropdown(lifeExpect,countrySelector,190);
        //generate and customize country selector
    countryLabel = createP('Country of birth:');
    countryLabel.parent(buttonPanel);
    countryLabel.class('labels');
        //make breed selector label
    femaleButton = createButton('Female','female');
    maleButton = createButton('Male','male');
    genderButton(maleButton,femaleButton);
        //make gender buttons
    calcButton = createButton('Calculate');
    calcButtonCustomize(calcButton);
        //generate the calculate button
     reposition();
        //position elements
}

function reposition(){
    title.position(40,40);
    let titleSize = title.size().height;
    subtitle.position(40,titleSize+60);
    let subtitleBottom = subtitle.position().y+subtitle.size().height;
    buttonPanel.position(40,subtitleBottom+30);
    inputRearrange();
    let panelBottom = buttonPanel.position().y+buttonPanel.size().height;
    calcButton.position(40,panelBottom+30);
}

function inputRearrange(){
    
    breedLabel.position(0,0)
    breedSelector.position(0,24);
    
    let breedWidth = breedSelector.size().width;
    
    ageLabel.position(breedWidth+12,0);
    currentAge.position(breedWidth+12,24);
    
    let ageX = currentAge.position().x;
    let ageWidth = currentAge.size().width;
    
    countryLabel.position(ageX+ageWidth+12,0);
    countrySelector.position(ageX+ageWidth+12,24);
    
    let countryWidth = countrySelector.size().width;
    let countryX = countrySelector.position().x;
    
    let femaleWidth = femaleButton.size().width;
    
    femaleButton.position(countryX+countryWidth+12,24);
    maleButton.position(countryX+countryWidth+12+femaleWidth-2,24);

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
    reposition();
}

//customize dropdown
function createDropdown(data,dropdown,num){
    for(let i = 0; i < Object.keys(data).length; i++){
     dropdown.option(data[i].name,i);   
    }
    dropdown.selected(data[num].name,num);
    dropdown.parent(buttonPanel);
}

//customize input field
function createInputField(name){  
    name.parent(buttonPanel);
    name.size(100,34);
}

//customize button
function calcButtonCustomize(button,x,y){
    button.mousePressed(calcDog);
    button.id('calcButton');
}

function genderButton(male,female){
    female.mousePressed(whichGender);
    male.mousePressed(whichGender);
    male.class('genderButton');
    female.class('genderButton');
    female.parent(buttonPanel);
    male.parent(buttonPanel);
}

function titleCustom(title,x,y){
    title.position(x,y);
}

function whichGender(){
    gender = this.value();
}

function calcDog(){
    clear();
    myDogNames = [];
    //reset old calculations
    
//    text('Gender: '+gender+' Age: '+currentAge.value()+' Country: '+countrySelector.value()+' Dog Breed:'+breedSelector.value(),10,210);
//    
//    text('Max life span of a '+dogBreeds[breedSelector.value()].name+' is '+dogBreeds[breedSelector.value()].lifespan+' years',10,250);
//    
//    text('The life expectancy of a person born '+gender+' in '+lifeExpect[countrySelector.value()].name+' is '+floor(lifeExpect[countrySelector.value()][gender])+' years',10,290);
//    
//    lifeLeft = floor(lifeExpect[countrySelector.value()][gender]) - currentAge.value();
//        //calculate how much time you have left, statistically
//    
//    text('Statistically, you have '+lifeLeft+' years left',10,330);
    
    numdogs = floor(lifeLeft/(dogBreeds[breedSelector.value()].lifespan));
        //how many dogs you can have until you die
    
//    text('Which means you can have '+numdogs+' more '+dogBreeds[breedSelector.value()].name+'s',10,370);
    
    for(i = 0; i < numdogs; i++){
        let rand = dogNames.dog_names.length;
        let randName = random(0,rand-1);
        myDogNames.push(dogNames.dog_names[floor(randName)]);
    }
        //generate name of dogs you might have
    
//    text('Here are some ideas for dog names: '+myDogNames,10,410);
}