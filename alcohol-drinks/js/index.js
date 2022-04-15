document.querySelector('.generate-btn').addEventListener('click', runFunction);
document.querySelector('#drinks').addEventListener('change', runInfoFunction);

// Run Main Functions Here
async function runFunction() {
  const drinkChoice = document.getElementById('drinks');
  // This first if is used just for random drinks.
  if (drinkChoice.value == 'random-drink') {
    getDrinks('https://www.thecocktaildb.com/api/json/v1/1/random.php');

    // This else if statement only pertains to Tequilla since there are no other Tequilla variants, in the case statement
    // later on it breaks due to an arry being empty, this can be removed when new variations of tequila are found.
  } else if (drinkChoice.value == 'Tequila') {
    tequilaHelperFunc(drinkChoice.value);

    // This is used for Liqueur category since there is no actual value of Liqueur in the API,
    // I call the Drink category function straight and use the values here.
  } else if (drinkChoice.value == 'Liqueur') {
    let arrOfDrinks = await getAllDrinkCategories(drinkChoice.value);
    document.querySelector(
      '.drink-notice'
    ).innerText = `This drink category only contains ${arrOfDrinks.length} drinks`;
    let drinkId = arrOfDrinks[generateRandomNumberFromList(arrOfDrinks.length)];
    let drinkObj = await fetchDrinkById(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
    );
    randomDrinkGenerator(drinkObj.drinks[0]);

    // This else statement refers to just using the other selected values as needed.
  } else {
    getDrinks(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkChoice.value}`,
      drinkChoice.value
    );
  }

  // let url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178331';
  // testfetchFunction(url);
}

function runInfoFunction() {
  setTextForDrink(this.value);
}

// Helper Functions below here

// Function to help clean up run function that only pertains to Tequilla case until more Tequilla variations are added to the API
async function tequilaHelperFunc(drinkChoice) {
  let data = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkChoice}`
  );
  let drinkObj = await data.json();
  tempArr = [];
  for (item in drinkObj.drinks) {
    tempArr.push(drinkObj.drinks[item].idDrink);
  }

  document.querySelector(
    '.drink-notice'
  ).innerText = `This drink category only contains ${tempArr.length} drinks`;

  let drinkId = tempArr[generateRandomNumberFromList(tempArr.length)];
  let drinkObjRet = await fetchDrinkById(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
  );
  console.log(drinkObjRet.drinks[0]);
  randomDrinkGenerator(drinkObjRet.drinks[0]);
}

// Function to test api using only fetch, not much helping here only for debugging.
async function testfetchFunction(url) {
  let data = await fetch(url);
  let jsonData = await data.json();
  console.log(jsonData);
}

// Function to fetch data from API based on url and then putting it into an array and returning it.
async function fetchDrinkIdForArray(url) {
  let data = await fetch(url);
  let jsonData = await data.json();
  let temp = [];
  for (item in jsonData.drinks) {
    temp.push(jsonData.drinks[item].idDrink);
  }
  return temp;
}

// Function to fetch drink details like name, ingredients, etc... by Id
async function fetchDrinkById(url) {
  let data = await fetch(url);
  let jsonData = await data.json();
  return jsonData;
}

// Function for fetching list of drinks
async function getDrinks(url, alcoholChoice) {
  let res = await fetch(url);
  let data = await res.json();

  if (data.drinks.length == 1) {
    document.querySelector('.drink-notice').innerText = '';
    let drinksObj = data.drinks[0];
    randomDrinkGenerator(drinksObj);
  } else {
    arrOfDrinks = [];
    tempArr = [];

    for (item in data.drinks) {
      tempArr.push(data.drinks[item].idDrink);
    }

    arrOfDrinks = tempArr.concat(await getAllDrinkCategories(alcoholChoice));

    document.querySelector(
      '.drink-notice'
    ).innerText = `This drink category only contains ${arrOfDrinks.length} drinks`;
    let drinkId = arrOfDrinks[generateRandomNumberFromList(arrOfDrinks.length)];
    let drinkObj = await fetchDrinkById(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
    );

    randomDrinkGenerator(drinkObj.drinks[0]);
  }
}

// Function for getting random Drink
function randomDrinkGenerator(drinksObj) {
  const drinkName = drinksObj.strDrink;
  const drinkImg = drinksObj.strDrinkThumb;
  const drinkInstructions = drinksObj.strInstructions;
  setTextInHtml(drinkName, drinkImg, drinkInstructions);
  const drinkInstructMeasure = addItemsToArrays(drinksObj);

  let ingredientClassName = '.drink-ingredients';

  createLiForList(drinkInstructMeasure, ingredientClassName);
}

// Random Number generator for length of data in drinks array.
function generateRandomNumberFromList(arrLength) {
  let number = Math.floor(Math.random() * arrLength);
  return number;
}

// This gets all the drinks in a category like rum gets rum and light rum and dark rum, etc...
async function getAllDrinkCategories(alcoholChoice) {
  switch (alcoholChoice) {
    case 'Rum':
      let arrOfRumDrinks = [];
      let rumArr = ['Light rum', 'Spiced rum', 'Dark rum', 'Añejo rum'];
      for (let i = 0; i < rumArr.length; i++) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${rumArr[i]}`;
        let rumDrinks = await fetchDrinkIdForArray(url);
        arrOfRumDrinks = [...arrOfRumDrinks, ...rumDrinks];
      }
      return arrOfRumDrinks;
      break;

    case 'Gin':
      let arrOfGinDrinks = [];
      let ginArr = ['Sloe gin'];
      for (let i = 0; i < ginArr.length; i++) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ginArr[i]}`;
        let ginDrinks = await fetchDrinkIdForArray(url);
        arrOfGinDrinks = [...arrOfGinDrinks, ...ginDrinks];
      }
      return arrOfGinDrinks;
      break;

    case 'Whiskey':
      let arrOfWhiskeyDrinks = [];
      let whiskeyArr = [
        'Scotch',
        'Southern Comfort',
        'Blended whiskey',
        'Bourbon',
        'Irish whiskey',
        'Johnnie Walker',
      ];
      for (let i = 0; i < whiskeyArr.length; i++) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${whiskeyArr[i]}`;
        let whiskeyDrinks = await fetchDrinkIdForArray(url);
        arrOfWhiskeyDrinks = [...arrOfWhiskeyDrinks, ...whiskeyDrinks];
      }
      return arrOfWhiskeyDrinks;
      break;

    case 'Tequila':
      let arrOfTequilaDrinks = [];
      let tequilaArr = [];
      for (let i = 0; i < tequilaArr.length; i++) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${tequilaArr[i]}`;
        let tequilaDrinks = await fetchDrinkIdForArray(url);
        arrOfTequilaDrinks = [...arrOfTequilaDrinks, ...tequilaDrinks];
      }
      return arrOfTequilaDrinks;
      break;

    case 'Vodka':
      let arrOfVodkaDrinks = [];
      let vodkaArr = ['Lemon vodka', 'Peach Vodka', 'Absolut Citron'];
      for (let i = 0; i < vodkaArr.length; i++) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${vodkaArr[i]}`;
        let vodkaDrinks = await fetchDrinkIdForArray(url);
        arrOfVodkaDrinks = [...arrOfVodkaDrinks, ...vodkaDrinks];
      }
      return arrOfVodkaDrinks;
      break;

    case 'Brandy':
      let arrOfBrandyDrinks = [];
      let brandyArr = [
        'Apricot brandy',
        'Apple brandy',
        'Cherry brandy',
        'Coffee brandy',
        'Cognac',
        'Blackberry brandy',
      ];
      for (let i = 0; i < brandyArr.length; i++) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${brandyArr[i]}`;
        let brandyDrinks = await fetchDrinkIdForArray(url);
        arrOfBrandyDrinks = [...arrOfBrandyDrinks, ...brandyDrinks];
      }
      return arrOfBrandyDrinks;
      break;

    case 'Liqueur':
      let arrOfLiqueurDrinks = [];
      let liqueurArr = ['Triple sec', 'Coffee liqueur', 'Kahlua'];
      for (let i = 0; i < liqueurArr.length; i++) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liqueurArr[i]}`;
        let liqueurDrinks = await fetchDrinkIdForArray(url);
        arrOfLiqueurDrinks = [...arrOfLiqueurDrinks, ...liqueurDrinks];
      }
      return arrOfLiqueurDrinks;
      break;

    default:
      document.querySelector('.description-box').innerText =
        'This option will return a random drink!';
  }
}

// Function for drink case choices
function setTextForDrink(text) {
  switch (text) {
    case 'random-drink':
      document.querySelector('.description-box').innerText =
        'This option will return a random drink!';
      break;

    case 'Rum':
      document.querySelector('.description-box').innerText =
        'This option will return rum related drinks like a Mai Tai, Piña Colada, Blue Hurricane, etc...';
      break;

    case 'Gin':
      document.querySelector('.description-box').innerText =
        'This option will return gin related drinks like a Tom Collins, Gin and Tonic, Negroni, etc...';
      break;

    case 'Whiskey':
      document.querySelector('.description-box').innerText =
        'This option will return whiskey related drinks like a Manhattan, Whiskey Sour, Old Fashioned, etc...';
      break;

    case 'Tequila':
      document.querySelector('.description-box').innerText =
        'This option will return tequila related drinks like a Tequila Sunrise, Paloma, Adam Bomb, etc...';
      break;

    case 'Vodka':
      document.querySelector('.description-box').innerText =
        'This option will return vodka related drinks like a Bloody Mary, Moscow Mule, Screwdriver, etc...';
      break;

    case 'Brandy':
      document.querySelector('.description-box').innerText =
        'This option will return brandy related drinks like a Singapore Sling, Angel Face, Boston Sidecar, etc...';
      break;

    case 'Liqueur':
      document.querySelector('.description-box').innerText =
        'This option will return liqueur/spirit related drinks like a Iced Coffee Fillip, Absolutly Screwed Up, Afternoon, etc...';
      break;

    default:
      document.querySelector('.description-box').innerText =
        'This option will return a random drink!';
  }
}

// Function to add items to arrays to use for later
function addItemsToArrays(drinksObj) {
  let drinkIngredients = [];
  let drinkMeasurements = [];
  for (let item in drinksObj) {
    if (item.startsWith('strIngredient') && drinksObj[item]) {
      drinkIngredients.push(drinksObj[item]);
    } else if (item.startsWith('strMeasure') && drinksObj[item]) {
      drinkMeasurements.push(drinksObj[item]);
    }
  }

  let drinkInstructMeasure = drinkIngredients.map((e, i) => {
    if (drinkMeasurements[i]) {
      return drinkMeasurements[i] + ' ' + e;
    } else {
      return e;
    }
  });
  return drinkInstructMeasure;
}

// Function to create li for list
function createLiForList(arrList, ulName) {
  let ul = document.querySelector(ulName);
  ul.innerHTML = '';
  for (let i = 0; i < arrList.length; i++) {
    let li = document.createElement('li');
    // console.log(ul);
    // console.log(li);
    li.appendChild(document.createTextNode(`${arrList[i]}`));
    // li.setAttribute('id', 'element4'); // added line
    ul.appendChild(li);
  }
}

// Function to set text in hmtl
function setTextInHtml(drinkName, drinkImg, drinkInstructions) {
  document.querySelector('.drink-name').innerText = drinkName;
  document.querySelector('.drink-img').src = drinkImg;
  document.querySelector('.drink-instructions').innerText = drinkInstructions;
  document.querySelector('.drink-instructions-header').innerText =
    'Instructions';
  document.querySelector('.drink-ingredients-header').innerText =
    'Ingredients:';
}
