document.querySelector('.generate-btn').addEventListener('click', runFunction);
document.querySelector('#drinks').addEventListener('change', runInfoFunction);

let rumArrNames = ['Rum', 'Light rum', 'Spiced rum', 'Dark rum', 'Añejo rum'];
let ginArrNames = ['Gin', 'Sloe gin'];
let whiskeyArrNames = [
  'Whiskey',
  'Scotch',
  'Southern Comfort',
  'Blended whiskey',
  'Bourbon',
  'Irish whiskey',
  'Johnnie Walker',
];
let tequilaArrNames = ['Tequila'];
let vodkaArrNames = ['Vodka', 'Lemon vodka', 'Peach Vodka', 'Absolut Citron'];
let brandyArrNames = [
  'Brandy',
  'Apricot brandy',
  'Apple brandy',
  'Cherry brandy',
  'Coffee brandy',
  'Cognac',
  'Blackberry brandy',
];
let liqueurArrNames = ['Triple sec', 'Coffee liqueur', 'Kahlua'];
let drinkObjectsArr = {
  Rum: rumArrNames,
  Gin: ginArrNames,
  Whiskey: whiskeyArrNames,
  Tequila: tequilaArrNames,
  Vodka: vodkaArrNames,
  Brandy: brandyArrNames,
  Liqueur: liqueurArrNames,
};

let rumArr = [];
let ginArr = [];
let whiskeyArr = [];
let tequilaArr = [];
let vodkaArr = [];
let brandyArr = [];
let liqueurArr = [];

getAllDrinks(drinkObjectsArr);

async function getAllDrinks(drinkObjectsArr) {
  for (let x in drinkObjectsArr) {
    for (let y in drinkObjectsArr[x]) {
      switch (drinkObjectsArr[x][0]) {
        case 'Rum':
          let rumUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkObjectsArr[x][y]}`;
          let rumDrinks = await fetchAllDrinks(rumUrl);
          for (item in rumDrinks) {
            rumArr.push(rumDrinks[item].idDrink);
          }
          break;
        case 'Gin':
          let ginUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkObjectsArr[x][y]}`;
          let ginDrinks = await fetchAllDrinks(ginUrl);
          for (item in ginDrinks) {
            ginArr.push(ginDrinks[item].idDrink);
          }
          break;
        case 'Whiskey':
          let whiskeyUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkObjectsArr[x][y]}`;
          let whiskeyDrinks = await fetchAllDrinks(whiskeyUrl);
          for (item in whiskeyDrinks) {
            whiskeyArr.push(whiskeyDrinks[item].idDrink);
          }
          break;
        case 'Tequila':
          let tequilaUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkObjectsArr[x][y]}`;
          let tequilaDrinks = await fetchAllDrinks(tequilaUrl);
          for (item in tequilaDrinks) {
            tequilaArr.push(tequilaDrinks[item].idDrink);
          }
          break;
        case 'Vodka':
          let vodkaUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkObjectsArr[x][y]}`;
          let vodkaDrinks = await fetchAllDrinks(vodkaUrl);
          for (item in vodkaDrinks) {
            vodkaArr.push(vodkaDrinks[item].idDrink);
          }
          break;
        case 'Brandy':
          let brandyUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkObjectsArr[x][y]}`;
          let brandyDrinks = await fetchAllDrinks(brandyUrl);
          for (item in brandyDrinks) {
            brandyArr.push(brandyDrinks[item].idDrink);
          }
          break;
        case 'Triple sec':
          let liqueurUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkObjectsArr[x][y]}`;
          let liqueurDrinks = await fetchAllDrinks(liqueurUrl);
          for (item in liqueurDrinks) {
            liqueurArr.push(liqueurDrinks[item].idDrink);
          }
          break;
        default:
      }
    }
  }
}

async function fetchAllDrinks(url) {
  let res = await fetch(url);
  let data = await res.json();
  return data.drinks;
}

async function runFunction() {
  const drinkChoice = document.getElementById('drinks');
  // This first if is used just for random drinks.
  if (drinkChoice.value == 'random-drink') {
    document.querySelector('.drink-notice').innerText = '';
    let drinksObj = await fetchDrinkById(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );
    randomDrinkGenerator(drinksObj.drinks[0]);
  } else {
    console.log(drinkChoice.value);
    getDrinks(drinkChoice.value);
  }
}

function runInfoFunction() {
  setTextForDrink(this.value);
}

async function getDrinks(drinkChoice) {
  switch (drinkChoice) {
    case 'Rum':
      document.querySelector(
        '.drink-notice'
      ).innerText = `This drink category only contains ${rumArr.length} drinks`;
      let rumDrinkId = rumArr[generateRandomNumberFromList(rumArr.length)];
      let rumDrinkObj = await fetchDrinkById(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${rumDrinkId}`
      );
      randomDrinkGenerator(rumDrinkObj.drinks[0]);
      break;
    case 'Gin':
      document.querySelector(
        '.drink-notice'
      ).innerText = `This drink category only contains ${ginArr.length} drinks`;
      let ginDrinkId = ginArr[generateRandomNumberFromList(ginArr.length)];
      let ginDrinkObj = await fetchDrinkById(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ginDrinkId}`
      );
      randomDrinkGenerator(ginDrinkObj.drinks[0]);
      break;
    case 'Whiskey':
      document.querySelector(
        '.drink-notice'
      ).innerText = `This drink category only contains ${whiskeyArr.length} drinks`;
      let whiskeyDrinkId =
        whiskeyArr[generateRandomNumberFromList(whiskeyArr.length)];
      let whiskeyDrinkObj = await fetchDrinkById(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${whiskeyDrinkId}`
      );
      randomDrinkGenerator(whiskeyDrinkObj.drinks[0]);
      break;
    case 'Tequila':
      document.querySelector(
        '.drink-notice'
      ).innerText = `This drink category only contains ${tequilaArr.length} drinks`;
      let tequilaDrinkId =
        tequilaArr[generateRandomNumberFromList(tequilaArr.length)];
      let tequilaDrinkObj = await fetchDrinkById(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${tequilaDrinkId}`
      );
      randomDrinkGenerator(tequilaDrinkObj.drinks[0]);
      break;
    case 'Vodka':
      document.querySelector(
        '.drink-notice'
      ).innerText = `This drink category only contains ${vodkaArr.length} drinks`;
      let vodkaDrinkId =
        vodkaArr[generateRandomNumberFromList(vodkaArr.length)];
      let vodkaDrinkObj = await fetchDrinkById(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${vodkaDrinkId}`
      );
      randomDrinkGenerator(vodkaDrinkObj.drinks[0]);
      break;
    case 'Brandy':
      document.querySelector(
        '.drink-notice'
      ).innerText = `This drink category only contains ${brandyArr.length} drinks`;
      let brandyDrinkId =
        brandyArr[generateRandomNumberFromList(brandyArr.length)];
      let brandyDrinkObj = await fetchDrinkById(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${brandyDrinkId}`
      );
      randomDrinkGenerator(brandyDrinkObj.drinks[0]);
      break;
    case 'Liqueur':
      document.querySelector(
        '.drink-notice'
      ).innerText = `This drink category only contains ${liqueurArr.length} drinks`;
      let liqueurDrinkId =
        liqueurArr[generateRandomNumberFromList(liqueurArr.length)];
      let liqueurDrinkObj = await fetchDrinkById(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${liqueurDrinkId}`
      );
      randomDrinkGenerator(liqueurDrinkObj.drinks[0]);
      break;
    default:
  }
}

async function fetchDrinkById(url) {
  let data = await fetch(url);
  let jsonData = await data.json();
  return jsonData;
}

// Random Number generator for length of data in drinks array.
function generateRandomNumberFromList(arrLength) {
  let number = Math.floor(Math.random() * arrLength);
  return number;
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
