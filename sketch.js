// JSON and API to load
let dogNames = []; 
let dogBreeds = [];
let lifeExpect = [];

//variables to changes after calculation
let numdogs = 0;
let myDogNames = [];
let displayDog = [];
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
let breedLabel;
let countryLabel;
let ageLabel;
let lineMargin;
let country;
let expectancy;
let breed;
let summaryText;
let dogText;
let dogYears;

//measurements
let divHeight = 64;
let dogList;
let sidemargin = 80;
let summaryMargin;
let withinCanvas;
let line2Margin = 64;
let dogTextMargin;
let dogImg;
let dogPicSize = 100;

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
    createCanvas(windowWidth, windowHeight+80); 
        //create canvas full window size
    background(255);
        //make background color
    title = createElement('h1', 'How many more dogs can you have?');
        //make title
    subtitle = createElement('h3', 'Please enter the breed of dog your would like to have, your current age, country of birth and sex at birth:');
        //make subtitle
    buttonPanel = createDiv();
    buttonPanel.id('buttonPanel');
    //buttonPanel.size(windowWidth-(sidemargin*2),divHeight);
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
    ageLabel.size(100);
    ageLabel.parent(buttonPanel);
    ageLabel.class('labels');
        //make breed selector label
    countrySelector = createSelect();
    createDropdown(lifeExpect,countrySelector,190);
        //generate and customize country selector
    countryLabel = createP('Country of birth:');
    countryLabel.size(150);
    countryLabel.parent(buttonPanel);
    countryLabel.class('labels');
        //make breed selector label
    femaleButton = createButton('Female','female');
    femaleButton.style('background-color',blue);
    femaleButton.style('color','white');
    maleButton = createButton('Male','male');
    genderButton(maleButton,femaleButton);
        //make gender buttons
    calcButton = createButton('Calculate');
    calcButtonCustomize(calcButton);
        //generate the calculate button
    reposition();
    makeLine();
        //position elements
}

function reposition(){
    withinCanvas = windowWidth-160;
    title.position(sidemargin,sidemargin);
    title.size(withinCanvas);
    let titleSize = title.size().height;
    subtitle.position(sidemargin,titleSize+100);
    subtitle.size(withinCanvas);
    let subtitleBottom = subtitle.position().y+subtitle.size().height;
    
    buttonPanel.position(sidemargin,subtitleBottom+40);
    buttonPanel.size(windowWidth-sidemargin*2);
    
    inputRearrange();
    
    buttonPanel.size(AUTO,divHeight);
    let panelBottom = buttonPanel.position().y+buttonPanel.size().height;
    calcButton.position(sidemargin,panelBottom+40);
    makeLine();
    
    if(summaryText){
        //makeDogImages();
        summaryText.position(80,lineMargin+40);
        summaryText.size(windowWidth-sidemargin*2);
        makeLine2();
        dogText.position(80,line2Margin);
        dogText.size(windowWidth-sidemargin*2);
        dogTextMargin = dogText.position().y+dogText.size().height;
        dogListPosition();
    }
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
    divHeight = 64;
    
    if(windowWidth < 960 && windowWidth > 745){
       
       let line2 = breedSelector.size().height+breedLabel.size().height+36;
        
        femaleButton.position(0,line2);
        maleButton.position(femaleWidth-2,line2);
        divHeight = line2+femaleButton.size().height;
        
    }
    
    if(windowWidth < 745 && windowWidth > 525){
        
        let line2 = breedSelector.size().height+breedLabel.size().height+48;
        
        countryLabel.position(0,line2-24);
        countrySelector.position(0,line2);
        femaleButton.position(countryWidth+12,line2);
        maleButton.position(countryWidth+12+femaleWidth-2,line2);
        divHeight = line2+countrySelector.size().height+countryLabel.size().height;
        
    }
    
    if(windowWidth < 525 && windowWidth > 320){
        
        let line2 = breedSelector.size().height+breedLabel.size().height+48;
        let line3 = breedSelector.size().height+breedLabel.size().height+108;
        
        ageLabel.position(0,line2-24);
        currentAge.position(0,line2);
        countryLabel.position(ageWidth+12,line2-24);
        countrySelector.position(ageWidth+12,line2);
        femaleButton.position(0,line3);
        maleButton.position(femaleWidth-2,line3);
        divHeight = line3+femaleButton.size().height;
        
    } //this is not perfect, fix if you have time

}

function makeLine(){
    lineMargin = calcButton.size().height+calcButton.position().y+40;
    line1 = line(sidemargin, lineMargin, windowWidth-sidemargin, lineMargin);
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
    resizeCanvas(windowWidth,windowHeight*2);
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
    if(gender === 'female'){
        femaleButton.style('background-color',blue);
        femaleButton.style('color','white');
        maleButton.style('background-color','white');
        maleButton.style('color',darkBlue);
    }
    if(gender === 'male'){
        maleButton.style('background-color',blue);
        maleButton.style('color','white');
        femaleButton.style('background-color','white');
        femaleButton.style('color',darkBlue);
    }
}

function calcDog(){
    clear();
    if(summaryText){
        summaryText.remove();
        dogText.remove();
        
        for(let name of displayDog){
            name.remove();
        }
        
    }
    myDogNames = [];
    displayDog = [];
    makeLine();
    resizeCanvas(windowWidth,windowHeight*2);
    //reset old calculations
    
    country = lifeExpect[countrySelector.value()].name;
    expectancy = floor(lifeExpect[countrySelector.value()][gender]);
    breed = dogBreeds[breedSelector.value()].name;
    dogYears = dogBreeds[breedSelector.value()].lifespan;

    lifeLeft = floor(lifeExpect[countrySelector.value()][gender]) - currentAge.value();
        //calculate how much time you have left, statistically
//    
//    text('Statistically, you have '+lifeLeft+' years left',10,330);
    
    numdogs = floor(lifeLeft/(dogBreeds[breedSelector.value()].lifespan));
        //how many dogs you can have until you die
    dogPicSize = (withinCanvas-40)/numdogs;
        //size of dog pictures
    
//    text('Which means you can have '+numdogs+' more '+dogBreeds[breedSelector.value()].name+'s',10,370);
    
    for(i = 0; i < numdogs; i++){
        let rand = dogNames.dog_names.length;
        let randName = random(0,rand-1);
        myDogNames.push(dogNames.dog_names[floor(randName)]);
    }
        //generate name of dogs you might have
    
//    let dogpicmargin = dogPicSize+40;
//    makeDogImages();
    
    summaryText = createElement('h2', 'You can have '+numdogs+' more '+breed+'s! '+breed+'s live up to '+dogYears+' years. Your life expectancy as a born '+gender+' in '+country+' is '+expectancy+' years. Which means you have around '+lifeLeft+' years to play with your dogs. Enjoy!');
    summaryText.position(80,lineMargin+40);
    summaryText.size(windowWidth-sidemargin*2);
    //summary text
    
    summaryMargin = summaryText.position().y+summaryText.size().height+40;
    
    line2Margin = summaryText.position().y+summaryText.size().height+80;
    
     dogText = createElement('h3', 'Here are some ideas for dog names:');
     dogText.position(80,line2Margin);
     dogText.size(windowWidth-sidemargin*2);
    
    dogTextMargin = dogText.position().y+dogText.size().height;
    
    makeLine();
    makeLine2();
    //line separator
    
    for(i = 0; i < numdogs; i++){
        let temp = createElement('p',(i+1)+'. '+myDogNames[i]);
        //temp.parent('dogList');
        displayDog.push(temp);
    }
    
    dogListPosition();
    
//    text('Here are some ideas for dog names: '+myDogNames,10,410);
}

function dogListPosition(){
    
    for(i = 0; i < numdogs; i++){
        //displayDog[i].parent('dogList');
        displayDog[i].position(80,dogTextMargin+(40*i));
        print("what the fuck");
    }
}

function makeDogImages(){
    for(i = 0; i < numdogs; i++){
        square(80+(dogPicSize*i),lineMargin+40,dogPicSize);
    }
}

function makeLine2(){
    summaryMargin = summaryText.position().y+summaryText.size().height+40;
    line(sidemargin, summaryMargin, windowWidth-sidemargin, summaryMargin);
    line2Margin = summaryText.position().y+summaryText.size().height+80;
}